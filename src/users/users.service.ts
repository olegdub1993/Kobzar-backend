/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
// import { Albom, AlbomDocument } from './../albom/schemas/albom.schema';
import { Model, ObjectId } from 'mongoose';
import * as uuid from "uuid"
import * as bcrypt from 'bcryptjs';
import { MailService } from './../mail/mail.service';
import { PlaylistService } from './../playlist/playlist.service';
import { FileService, FileType } from 'src/file/file.service';
import { Interval } from '@nestjs/schedule';
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private readonly playlistService: PlaylistService, private readonly mailService: MailService, private fileService: FileService) { }
    async findByEmail(email: string): Promise<any> {
        const user = await this.userModel.findOne({ email })
        if (user) { return Promise.resolve(user) }
        return undefined
    }
    async findOne(id: number): Promise<any | undefined> {
        const user = await this.userModel.findById(id)
        if (user) return user
        return undefined
    }
    async getUser(id): Promise<any | undefined> {
        const user = await this.userModel.findById(id).populate("subscriptions").populate('subscribers').populate('subscriptionsToArtists');
        let playlists = await this.playlistService.findSome(user.playlists)
        user.playlists = playlists
        return user
    }
    async create(email, password, username): Promise<any> {
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await this.userModel.create({ email, username, password: hashPassword, activationLink, isActivated: false, picture: "" })
        await this.mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`, `Активація акаунта на ${process.env.API_URL}`, "Для активації акаунта перейдіть по посиланню:")
        return user
    }
    async updateProfile(userId, dto, picture): Promise<any> {
        const user = await this.userModel.findById(userId)
        const playlists = user.playlists
        let picturePath = ""
        if (picture) {
            [picturePath] =await this.fileService.createFile(FileType.IMAGE, picture)
            if (user.picture) {
               await  this.fileService.removeFile(user.picture)
            }
        }
        await this.playlistService.updateUserDataForPlaylist(playlists, dto.username, picturePath)
        if (picturePath) { user.picture = picturePath }
        user.username = dto.username
        await user.save()
        return user
    }
    async activate(activationLink): Promise<any> {
        const user = await this.userModel.findOne({ activationLink })
        if (!user) {
            throw new HttpException(`Неправильне посилання`, 403);
        }
        user.isActivated = true
        await user.save()
    }
    async addToLiked(userId: ObjectId, type: string, itemId: any,) {
        const user = await this.userModel.findById(userId)
        if (type === "track") {
            user.liked.push(itemId)
        } else {
            await this.playlistService.addLikes(itemId)
            user.likedPlaylists.push(itemId)
        }
        await user.save()
        return itemId
    }
    async createSubscription(userId: any, userId2: any,) {
        const user = await this.userModel.findById(userId)
        user.subscriptions.push(userId2)
        await user.save()
        const user2 = await this.userModel.findById(userId2)
        user2.subscribers.push(userId)
        await user2.save()
        return user2._id
    }
    async deleteSubscription(userId: any, userId2: any) {
        const user = await this.userModel.findById(userId)
        user.subscriptions = user.subscriptions.filter((subscription) => subscription.toString() !== userId2.toString())
        await user.save()
        const user2 = await this.userModel.findById(userId2)
        user2.subscribers = user2.subscribers.filter((subscriber) => subscriber.toString() !== userId.toString())
        await user2.save()
        return user2._id
    }
    async removeFromLiked(userId, type, itemId) {
        const user = await this.userModel.findById(userId)
        if (type === "track") {
            user.liked = user.liked.filter((liked) => liked.toString() !== itemId)
        }
        else {
            await this.playlistService.removeLikes(itemId)
            user.likedPlaylists = user.likedPlaylists.filter((likedPlaylist) => likedPlaylist.toString() !== itemId)
        }
        await user.save()
        return itemId
    }
    async getLiked(userId: ObjectId, type: string) {
        if (type === "tracks") {
            let user = await this.userModel.findById(userId).populate({ 
                path: 'liked',
                populate: {
                  path: 'artists',
                } 
             })
            return user.liked
        } else {
            let user = await this.userModel.findById(userId).populate("likedPlaylists")
            let likedPlaylists = await this.playlistService.findSome(user.likedPlaylists)
            return likedPlaylists
        }
        //  console.log("use",user.liked)   
        // return user.liked
    }
    async getUserPlaylists(userId) {
        const user = await this.userModel.findById(userId).populate("playlists")
        return user.playlists
    }
    async getSearchedUsers(query) {
        const users = await this.userModel.find({
            username: { $regex: new RegExp(query, "i") }
        })
        return users
    }
}
/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as uuid from "uuid"
import * as bcrypt from 'bcrypt';
import { MailService } from './../mail/mail.service';
import { FileService, FileType } from 'src/file/file.service';
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private readonly mailService: MailService,private fileService: FileService) { }
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
    // async findOne(id: number): Promise<CreateUserDto | undefined> {
    //     const user = this.users.find((user) => user._id === id)
    //     if (user) { return Promise.resolve(user) }
    //     return undefined
    // }
    async create(email, password,username): Promise<any> {
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await this.userModel.create({ email, username, password: hashPassword, activationLink, isActivated: false, picture:"" })
        // await this.mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`)
        return user
    }
    async updateProfile(userId, dto, picture ): Promise<any> {
        const user = await this.userModel.findById(userId)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        if(user.picture){
            this.fileService.removeFile(user.picture)
        }
        user.picture = picturePath
        user.username=dto.username
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
    async  addToLiked(userId, trackId ){
        const user = await this.userModel.findById(userId)
        user.liked.push(trackId)
        await user.save()
        return trackId
    }
    async removeFromLiked(userId, trackId ){
        const user = await this.userModel.findById(userId)
        user.liked= user.liked.filter((liked)=>liked.toString() !== trackId)
        
        await user.save()
        return trackId
    }
    async getLiked(userId){
        const user = await this.userModel.findById(userId).populate("liked")
        return user.liked
    }
    async getUserAlboms(userId){
        const user = await this.userModel.findById(userId).populate("alboms")
        return user.alboms
    }
}
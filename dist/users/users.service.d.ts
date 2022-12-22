import { UserDocument } from './schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import { MailService } from './../mail/mail.service';
import { PlaylistService } from './../playlist/playlist.service';
import { FileService } from 'src/file/file.service';
export declare class UsersService {
    private userModel;
    private readonly playlistService;
    private readonly mailService;
    private fileService;
    constructor(userModel: Model<UserDocument>, playlistService: PlaylistService, mailService: MailService, fileService: FileService);
    findByEmail(email: string): Promise<any>;
    findOne(id: number): Promise<any | undefined>;
    getUser(id: any): Promise<any | undefined>;
    create(email: any, password: any, username: any): Promise<any>;
    updateProfile(userId: any, dto: any, picture: any): Promise<any>;
    activate(activationLink: any): Promise<any>;
    addToLiked(userId: ObjectId, type: string, itemId: any): Promise<any>;
    removeFromLiked(userId: any, type: any, itemId: any): Promise<any>;
    getLiked(userId: ObjectId, type: string): Promise<import("../track/schemas/track.schema").Track[] | Omit<import("../playlist/schemas/playlist.schema").Playlist & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    getUserPlaylists(userId: any): Promise<import("../playlist/schemas/playlist.schema").Playlist[]>;
}

import { Model } from 'mongoose';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { ObjectId } from 'mongoose';
import { FileService } from 'src/file/file.service';
import { UserDocument } from 'src/users/schemas/user.schema';
export declare class PlaylistService {
    private playlistModel;
    private userModel;
    private fileService;
    constructor(playlistModel: Model<PlaylistDocument>, userModel: Model<UserDocument>, fileService: FileService);
    create(userId: any, dto: CreatePlaylistDto, picture: any): Promise<Playlist>;
    updatePlaylist(dto: any, picture: any): Promise<Playlist>;
    updateUserDataForPlaylist(arrayOfId: any, username: any, userPicturePath: any): Promise<void>;
    getOne(id: ObjectId): Promise<Playlist>;
    getSearchedPlaylists(query: string): Promise<Playlist[]>;
    addTrackToPlaylist(userId: any, albomId: any, trackId: any): Promise<Playlist>;
    removeTrackFromPlaylist(userId: any, albomId: any, trackId: any): Promise<Playlist>;
    getAll(count?: number, offset?: number): Promise<Playlist[]>;
    findSome(arrayOfId: any): Promise<Omit<Playlist & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    addLikes(id: ObjectId): Promise<Playlist>;
    removeLikes(id: ObjectId): Promise<Playlist>;
    delete(userId: ObjectId, id: any): Promise<ObjectId>;
}

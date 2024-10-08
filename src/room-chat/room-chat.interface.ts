import {RoomChat} from "./entities/room-chat.entity";
import {User} from "../user/entities/user.entity";

export interface IRoomChatService {
    create(createdBy: User, recipient: User): Promise<RoomChat>;

    findOne(id: number): Promise<RoomChat>;

    save(roomChat: RoomChat): Promise<any>;

    findRoom(userId1:number, userId2:number): Promise<RoomChat>

    getByUser(userId: number, page: number): Promise<RoomChat[]>
}
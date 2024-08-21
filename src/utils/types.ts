import {User} from "../user/entities/user.entity";

export type CreateMessageParams = {
    content: string;
    receiverId:number;
    roomId:number;
    user: User
}
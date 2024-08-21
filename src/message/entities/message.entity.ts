import {Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {BaseMessage} from "./base_message.entity";
import {RoomChat} from "../../room-chat/entities/room-chat.entity";

@Entity()
export class Message extends BaseMessage{
    @ManyToOne(() => RoomChat, (roomChat) => roomChat.messages)
    roomChat: RoomChat;
}

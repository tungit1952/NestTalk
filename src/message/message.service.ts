import {Inject, Injectable} from '@nestjs/common';
import {CreateMessageDto} from './dto/create-message.dto';
import {UpdateMessageDto} from './dto/update-message.dto';
import {CreateMessageParams} from "../utils/types";
import {RoomChatService} from "../room-chat/room-chat.service";
import {User} from "../user/entities/user.entity";
import {Message} from "./entities/message.entity";
import {RoomChat} from "../room-chat/entities/room-chat.entity";
import {UserService} from "../user/user.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {IRoomChatService} from "../room-chat/room-chat.interface";
import {IMessageService} from "./message.interface";
import {RecipientNotFound} from "../user/exceptions/RecipientNotFound";
import {RoomChatNotFound} from "../room-chat/exceptions/RoomChatNotFound";

@Injectable()
export class MessageService implements IMessageService{
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @Inject(RoomChatService)
        private readonly roomChatService: IRoomChatService,
        private readonly userService: UserService
    ) {
    }

    async create(createMessageDto: CreateMessageDto, user: User) {
        const {content, receiverId, roomId} = createMessageDto
        console.log("receiverId: " + receiverId)
        const recipient = await this.userService.findOne(receiverId)
        if(!recipient) throw new RecipientNotFound

        //Nếu chưa có roomId thì case là lần đầu nhắn tin
        let roomChat: RoomChat;
        if (!roomId) roomChat = await this.roomChatService.create(user, recipient)
        else{
            roomChat = await this.roomChatService.findOne(roomId)
            if(roomChat) throw new RoomChatNotFound()
        }
        const message = this.messageRepository.create({
            content,
            createdBy: user,
            roomChat: roomChat
        })
        const newMessage = await this.messageRepository.save(message)
        roomChat.lastMessage = newMessage
        const newRoomChat = await this.roomChatService.save(roomChat)
        return { message: newMessage, roomChat: newRoomChat };
    }
}

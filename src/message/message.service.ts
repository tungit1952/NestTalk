import { BadRequestException, Inject, Injectable } from "@nestjs/common";
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
import { status } from "../config";

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
            if(!roomChat) throw new RoomChatNotFound()
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

    async findByRoom(id:number, user:User, page:number){
        try {
            const currentPage = page || 1;
            const limit = 30;
            const roomChat = await this.roomChatService.findOne(id)
            if(!roomChat) throw new RoomChatNotFound()
            const queryBuilder = this.messageRepository.createQueryBuilder('message')
              .innerJoinAndSelect('message.roomChat', 'roomChat')
              .innerJoin('message.createdBy', 'createdBy')
              .addSelect(['createdBy.id', 'createdBy.firstName', 'createdBy.lastName', 'createdBy.avatar', 'createdBy.username', 'createdBy.email']) // Chỉ chọn các trường cần thiết
              .where('roomChat.id = :roomId', { roomId: roomChat.id })
              .orderBy('message.createdAt', 'DESC')
              .skip((currentPage - 1) * limit)
              .take(limit);
            const [messages, total] = await queryBuilder.getManyAndCount();
            return {messages, total}
        }catch (e) {
            throw new BadRequestException('Failed to get list message.');
        }
    };
}

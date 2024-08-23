import { Injectable } from "@nestjs/common";
import { CreateRoomChatDto } from "./dto/create-room-chat.dto";
import { UpdateRoomChatDto } from "./dto/update-room-chat.dto";
import { RoomChat } from "./entities/room-chat.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { IRoomChatService } from "./room-chat.interface";
import { RecipientNotFound } from "../user/exceptions/RecipientNotFound";
import {RoomChatNotFound} from "./exceptions/RoomChatNotFound";

@Injectable()
export class RoomChatService implements IRoomChatService {
  @InjectRepository(RoomChat)
  private readonly roomChatRepository: Repository<RoomChat>;

  async create(createdBy: User, recipient: User) {
    const newRoomChat = this.roomChatRepository.create({ recipient, createdBy });
    return await this.roomChatRepository.save(newRoomChat);
  }

  async findOne(id: number) {
    return await this.roomChatRepository.findOneBy({ id });
  }

  async save(roomChat: RoomChat) {
    return await this.roomChatRepository.save(roomChat);
  }

  async findRoom(userId1: number, userId2: number) {
    if(!userId2) throw new RecipientNotFound
    return await this.roomChatRepository.createQueryBuilder("roomChat")
      .where(
        "(roomChat.createdById = :userId1 AND roomChat.recipientId = :userId2) OR (roomChat.createdById = :userId2 AND roomChat.recipientId = :userId1)",
        { userId1, userId2 }
      ).getOne();

  }

  async getByUser(userId: number, page: number = 1): Promise<RoomChat[]> {
    const limit  = 30
    const offset = (page - 1) * limit;
    try{
      return await this.roomChatRepository.createQueryBuilder('roomChat')
          .leftJoin('roomChat.createdBy', 'createdBy')
          .leftJoin('roomChat.recipient', 'recipient')
          .leftJoinAndSelect('roomChat.lastMessage', 'lastMessage')
          .addSelect([
            'createdBy.id','createdBy.avatar','createdBy.firstName','createdBy.lastName','createdBy.username',
            'recipient.id','recipient.avatar','recipient.firstName','recipient.lastName','recipient.username',
            'CASE WHEN roomChat.createdById = :userId THEN recipient.id ELSE createdBy.id END AS otherUserId'
          ])
          .where('roomChat.createdById = :userId OR roomChat.recipientId = :userId',{userId})
          .orderBy('roomChat.updatedAt','DESC')
          .skip(offset)
          .take(limit)
          .getMany()
    } catch (e){
      throw RoomChatNotFound
    }
  }
}

import {Injectable} from '@nestjs/common';
import {CreateRoomChatDto} from './dto/create-room-chat.dto';
import {UpdateRoomChatDto} from './dto/update-room-chat.dto';
import {RoomChat} from "./entities/room-chat.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../user/entities/user.entity";

@Injectable()
export class RoomChatService {
    @InjectRepository(RoomChat)
    private readonly roomChatRepository: Repository<RoomChat>

    async create(createdBy: User, recipient: User) {
        const newRoomChat = this.roomChatRepository.create({recipient, createdBy})
        return await this.roomChatRepository.save(newRoomChat)
    }

    async findOne(id: number) {
        return await this.roomChatRepository.findOneBy({id})
    }

    async save(roomChat: RoomChat) {
        return await this.roomChatRepository.save(roomChat)
    }
}

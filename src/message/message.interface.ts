import {CreateMessageParams} from "../utils/types";
import {CreateMessageDto} from "./dto/create-message.dto";
import {User} from "../user/entities/user.entity";
import { Message } from "./entities/message.entity";

export interface IMessageService {
    create(createMessageDto: CreateMessageDto, user:User): Promise<any>;
    findByRoom(id:number, user:User, page:number): Promise<any>;
}
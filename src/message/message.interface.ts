import {CreateMessageParams} from "../utils/types";
import {CreateMessageDto} from "./dto/create-message.dto";
import {User} from "../user/entities/user.entity";

export interface IMessageService {
    create(createMessageDto: CreateMessageDto, user:User): Promise<any>;
}
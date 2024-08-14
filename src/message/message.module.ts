import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import {RoomChatModule} from "../room-chat/room-chat.module";
import {UserModule} from "../user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "./entities/message.entity";

@Module({
  imports:[
    TypeOrmModule.forFeature([Message]),
    UserModule,
    RoomChatModule
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}

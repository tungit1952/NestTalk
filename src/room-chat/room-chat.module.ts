import { Module } from '@nestjs/common';
import { RoomChatService } from './room-chat.service';
import { RoomChatController } from './room-chat.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoomChat} from "./entities/room-chat.entity";

@Module({
  imports:[
    TypeOrmModule.forFeature([RoomChat]),
  ],
  controllers: [RoomChatController],
  providers: [RoomChatService],
  exports:[RoomChatService]
})
export class RoomChatModule {}

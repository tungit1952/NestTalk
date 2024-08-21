import { Module } from '@nestjs/common';
import { RoomChatService } from './room-chat.service';
import { RoomChatController } from './room-chat.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoomChat} from "./entities/room-chat.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports:[
    TypeOrmModule.forFeature([RoomChat]),
    UserModule,
  ],
  controllers: [RoomChatController],
  providers: [RoomChatService],
  exports:[RoomChatService]
})
export class RoomChatModule {}

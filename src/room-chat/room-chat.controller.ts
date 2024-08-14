import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { RoomChatService } from './room-chat.service';
import { CreateRoomChatDto } from './dto/create-room-chat.dto';
import { UpdateRoomChatDto } from './dto/update-room-chat.dto';
import {JwtGuard} from "../auth/guards/jwt.guard";

@Controller('room-chat')
export class RoomChatController {
  constructor(private readonly roomChatService: RoomChatService) {}


}

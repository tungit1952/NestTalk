import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import {AuthUser} from "../auth/decorators/auth-user.decorator";
import {EventEmitter2} from "@nestjs/event-emitter";
import {IMessageService} from "./message.interface";
import {User} from "../user/entities/user.entity";
import {JwtGuard} from "../auth/guards/jwt.guard";

function UserGuards(JwtGuard: JwtGuard) {

}

@Controller('message')
export class MessageController {
  constructor(
      @Inject(MessageService)
      private readonly messageService: IMessageService,
      private eventEmitter: EventEmitter2,
  ) {}

  @Post('create')
  @UseGuards(JwtGuard)
  async create(@Body() createMessageDto: CreateMessageDto, @AuthUser() user: User) {
    const response = await this.messageService.create(createMessageDto, user);
    this.eventEmitter.emit('message.create', response);
    return response;
  }

}

import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import {AuthUser} from "../auth/decorators/auth-user.decorator";
import {EventEmitter2} from "@nestjs/event-emitter";
import {IMessageService} from "./message.interface";
import {User} from "../user/entities/user.entity";
import {JwtGuard} from "../auth/guards/jwt.guard";


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
    return true;
  }

  @Get(':id/:page')
  @UseGuards(JwtGuard)
  async find(@Param('id') id: number, @AuthUser() user: any, @Param('page') page: number){
    const response = await this.messageService.findByRoom(id, user, page);
    if(response) return {
      message: 'Lấy message thành công',
      data:response
    }
  }
}

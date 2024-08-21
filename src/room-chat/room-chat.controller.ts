import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject } from "@nestjs/common";
import { RoomChatService } from "./room-chat.service";
import { CreateRoomChatDto } from "./dto/create-room-chat.dto";
import { UpdateRoomChatDto } from "./dto/update-room-chat.dto";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { IRoomChatService } from "./room-chat.interface";
import { AuthUser } from "../auth/decorators/auth-user.decorator";
import { User } from "../user/entities/user.entity";

@Controller("room-chat")
export class RoomChatController {
  constructor(
    @Inject(RoomChatService)
    private readonly roomChatService: IRoomChatService
  ) {
  }

  @Post("find")
  @UseGuards(JwtGuard)
  async find(@AuthUser() user: User, @Body() { id }: any) {
    const room = await this.roomChatService.findRoom(user.id, id);
    if (room) return {
      message: "Tìm thấy room",
      data: room
    };
    else return {
      message: "Không tìm thấy room",
      data: false
    };

  }

}

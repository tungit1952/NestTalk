import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {JwtGuard} from "../auth/guards/jwt.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('list')
  getList(@Query() query: any) {
    return this.userService.getList(query);
  }
}

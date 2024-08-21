import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Inject } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import {JwtGuard} from "../auth/guards/jwt.guard";
import { IUserService } from "./user.interface";

@Controller("user")
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: IUserService
  ) {}
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

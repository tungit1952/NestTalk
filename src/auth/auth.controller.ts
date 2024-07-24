import {Controller, Get, Post, Body, Patch, Param, Delete, UseFilters} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/create-user.dto";

@Controller('auth')
export class AuthController {
  constructor(
      private readonly authService: AuthService,
      private readonly userService: UserService
  ) {}
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}

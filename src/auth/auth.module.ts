import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  imports:[UserModule]
})
export class AuthModule {}

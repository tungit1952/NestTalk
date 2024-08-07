import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {UserService} from "../user/user.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import {  } from '../config';
import { ConfigModule, ConfigService } from "@nestjs/config";
import {JwtGuard} from "./guards/jwt.guard";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtGuard],
  imports:[
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('secret_jwt'),
        signOptions: {
          expiresIn: '7d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [JwtGuard, JwtModule, UserModule],
})
export class AuthModule {}

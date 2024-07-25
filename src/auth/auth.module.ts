import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {UserService} from "../user/user.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import {  } from '../config';
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('secret_jwt'),
        signOptions: {
          expiresIn: '7d',
        },
      }),
      inject: [ConfigService],
    }),
  ]
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { loggerParams } from './config';
import configuration from './config/configuration';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FriendModule } from './friend/friend.module';

@Module({
  imports: [
    LoggerModule.forRoot(loggerParams),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('db')
      }),
    }),
    UserModule,
    AuthModule,
    FriendModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

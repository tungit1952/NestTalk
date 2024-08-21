import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {LoggerModule} from 'nestjs-pino';
import {loggerParams} from './config';
import configuration from './config/configuration';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {FriendModule} from './friend/friend.module';
import {ProjectModule} from './project/project.module';
import {FormModule} from './form/form.module';
import {GroupModule} from './group/group.module';
import {ChatModule} from './chat/chat.module';
import {MessageModule} from './message/message.module';
import {RoomChatModule} from './room-chat/room-chat.module';
import {EventEmitterModule} from "@nestjs/event-emitter";
import {GatewayModule} from './gateway/gateway.module';
import {WSService} from "./gateway/gateway.gateway";
import {RedisModule} from './redis/redis.module';
import {RedisService} from "./redis/redis.service";
import {CacheModule} from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
@Module({
    imports: [
        CacheModule.register({
            isGlobal: true,
            store: redisStore,
            host: '127.0.0.1',
            port: 6379,
        }),
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
        ProjectModule,
        FormModule,
        GroupModule,
        ChatModule,
        MessageModule,
        RoomChatModule,
        EventEmitterModule.forRoot(),
        RedisModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        // WSService
    ],
})
export class AppModule {
}

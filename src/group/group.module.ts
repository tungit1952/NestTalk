import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Group} from "./entities/group.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([Group]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}

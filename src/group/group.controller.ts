import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import {JwtGuard} from "../auth/guards/jwt.guard";
import {AuthUser} from "../auth/decorators/auth-user.decorator";

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  create(@Body() createGroupDto: CreateGroupDto,@AuthUser() user: any) {
    console.log(user)
    return this.groupService.create(createGroupDto);
  }

}

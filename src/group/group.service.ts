import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Group} from "./entities/group.entity";

@Injectable()
export class GroupService {
  constructor(
      @InjectRepository(Group)
      private readonly groupRepository: Repository<Group>,
  ) {
  }
  async create(createGroupDto: CreateGroupDto) {
    const isUnique = await this.isUsernameUnique(createGroupDto.username);
    if (!isUnique) {
      throw new BadRequestException('Username đã tồn tại!');
    }
    const newGroup = this.groupRepository.create(createGroupDto);
    try {
      await this.groupRepository.save(newGroup);
      return {
        message: 'Tạo nhóm thành công',
        data: newGroup,
      };
    } catch (error) {
      throw new BadRequestException('Tạo nhóm thất bại.');
    }
  }

  private async isUsernameUnique(username: string) {
    const group = await this.groupRepository.findOneBy({username});
    return !group;
  }
}

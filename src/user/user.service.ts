import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { emailToUsername } from "../utils/helpers";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private readonly usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const isUnique = await this.isEmailUnique(createUserDto.email);
    if (!isUnique) {
      throw new BadRequestException('Email is already in use.');
    }
    if (!createUserDto.username) {
      createUserDto.username = emailToUsername(createUserDto.email)
    }
    createUserDto.password = await this.hashPassword(createUserDto.password)
    const newUser = this.usersRepository.create(createUserDto);
    try {
      await this.usersRepository.save(newUser);
      const { password, ...result } = newUser;
      return {
        message: 'User created successfully',
        user: result,
      };
    } catch (error) {
      throw new BadRequestException('Failed to create user.');
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findByEmail(email:string): Promise<User> {
    return this.usersRepository.findOneBy({email});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async isEmailUnique(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({email});
    return !user;
  }
}

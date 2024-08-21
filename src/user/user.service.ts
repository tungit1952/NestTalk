import {BadRequestException, Injectable} from "@nestjs/common";
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {emailToUsername} from "../utils/helpers";
import * as bcrypt from "bcrypt";
import {status} from '../config'
import { IUserService } from "./user.interface";

@Injectable()
export class UserService  implements IUserService{
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {
    }

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
            const {password, ...result} = newUser;
            return {
                message: 'User created successfully',
                user: result,
            };
        } catch (error) {
            throw new BadRequestException('Failed to create user.');
        }
    }

    async getList(query: any) {
        const {page = 1, limit = 0} = query
        try {
            const [users, total] = await this.usersRepository.findAndCount({
                select: ['id', 'username', 'firstName', 'lastName','avatar','email'],
                where: {
                    status: status.ACTIVE
                },
                skip: (page - 1) * limit,
                take: limit
            })
            return {
                message: 'Lấy danh sách thành công',
                data: users,
                total:total
            };
        }catch (e) {
            throw new BadRequestException('Failed to get list user.');
        }

    }

    findAll() {
        return `This action returns all user`;
    }

    findOne(id: number) {
        return this.usersRepository.findOneBy({id});
    }

    findByEmail(email: string): Promise<User> {
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

import { CreateUserDto } from "./dto/create-user.dto";

export interface IUserService {
    create(createUserDto: CreateUserDto) : Promise<any>;
    getList(query: any): Promise<any>;
}
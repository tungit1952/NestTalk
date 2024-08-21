import {IsNumber, IsOptional, IsString, Length} from "class-validator";
import {Column} from "typeorm";

export class CreateGroupDto {
    @IsString({ message: 'Tên phải là một chuỗi' })
    name?: string;

    @IsOptional()
    @Length(4, 20)
    username: string;

    @IsOptional()
    description:string

    @IsOptional()
    leader: number;

    @IsNumber()
    @IsOptional()
    status?: number;

    @IsNumber()
    @IsOptional()
    createdBy
}

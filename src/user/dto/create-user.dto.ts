import { IsBoolean, IsDate, IsEmail, IsNumber, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(4, 20)
    username: string;

    @IsString({ message: 'Password phải là một chuỗi' })
    @Length(8, 100)
    password: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString({ message: 'Tên phải là một chuỗi' })
    @IsOptional()
    lastName?: string;

    @IsDate()
    @IsOptional()
    dateOfBirth?: Date;

    @IsNumber()
    @IsOptional()
    gender?: number;

    @IsString()
    @IsOptional()
    avatar?: string;

    @IsEmail({}, { message: 'Email không đúng định dạng' })
    @IsOptional()
    email?: string;

    @IsString()
    @Matches(/^[0-9]+$/, { message: 'Số điện thoại không đúng định dạng' })
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsNumber()
    @IsOptional()
    status?: number;

    @IsBoolean()
    @IsOptional()
    isEmailVerified?: boolean;

    @IsBoolean()
    @IsOptional()
    isPhoneNumberVerified?: boolean;

    @IsString()
    @IsOptional()
    referralCode?: string;
}
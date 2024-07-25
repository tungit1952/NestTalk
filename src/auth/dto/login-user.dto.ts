import { IsNotEmpty } from 'class-validator';
export class LoginUserDto {
  @IsNotEmpty({ message: 'Vui lòng nhập email!' })
  readonly email: string;

  @IsNotEmpty({ message: 'Mật khẩu là bắt buộc' })
  password: string;
}

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class AuthService {
  constructor(
      private configService: ConfigService,
      private userService: UserService,
      private jwtService: JwtService
  ) {}
  async validateUser(email:string, password:string):Promise<any> {
    const user = await this.userService.findByEmail(email);
    if(user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto.email, loginUserDto.password)
    if(!user){
        throw new UnauthorizedException('User does not exists');
    }
    const token = this.jwtService.sign(
      { sub: user.id },
    );
    const { password, ...resultUser } = user;
    return {
      message:'Welcome! You have logged in successfully',
      data:{...resultUser, token}
    }
  }

  async register(user: any) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await this.userService.create({
      ...user,
      password: hashedPassword,
    });
  }
}

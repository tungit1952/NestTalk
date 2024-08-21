import {Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "./dto/login-user.dto";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";

@Injectable()
export class AuthService {
  constructor(
      @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
    await this.cacheManager.set('tung', 123, 600);
    const tung = await this.cacheManager.get('tung')
    console.log(tung)
    const user = await this.validateUser(loginUserDto.email, loginUserDto.password)
    if(!user){
        throw new UnauthorizedException('User does not exists');
    }
    const token = await this.jwtService.signAsync(
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

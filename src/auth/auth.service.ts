import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
      private configService: ConfigService,
      private userService: UserService,
      private jwtService: JwtService
  ) {}
  async validateUser(username:string, password:string):Promise<any> {
    const user = await this.userService.findByUserName(username);
    if(user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.userService.create({
      ...user,
      password: hashedPassword,
    });
    return newUser;
  }
}

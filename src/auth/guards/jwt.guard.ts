import {AuthGuard} from '@nestjs/passport';
import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from "../auth.service";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../../user/user.service";

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
        private userService: UserService
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authUser = await this.extractTokenFromHeader(request)
        if(!authUser){
            throw new UnauthorizedException('Token is missing');
        }else{
            request.authUser = authUser
            return true
        }
    }
    private async extractTokenFromHeader(request: any) {
        let token = request.headers.authorization
        if (token) {
            if (!token.startsWith('Bearer ')) {
                return false
            } else {
                token = token.substring(7, token.length);
                const payload = await this.jwtService.verifyAsync(token)
                const user = await this.userService.findOne(payload.sub)
                const {password, ...result} = user
                return result
            }
        } else {
            return false
        }
    }
}
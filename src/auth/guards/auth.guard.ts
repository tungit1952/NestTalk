import {AuthGuard} from '@nestjs/passport';
import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from "../auth.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        // console.log(request.headers.connection)
       return true
    }

    private extractTokenFromHeader(request: any): string | null {
        // console.log(request)
        const token = request.headers.authorization?.split(' ')[1];
        return token || null;
    }

}
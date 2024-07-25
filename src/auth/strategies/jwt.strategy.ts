import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport";
import { Injectable } from "@nestjs/common";
import { ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JsonWebTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('secret_jwt'),
    });
  }

}

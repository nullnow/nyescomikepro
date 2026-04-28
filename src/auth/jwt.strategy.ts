import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req?.cookies?.jwt;
        },
      ]),

      ignoreExpiration: false,

      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return {
      username: payload.sub,
    };
  }
}

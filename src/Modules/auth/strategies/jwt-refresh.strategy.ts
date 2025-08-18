import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
            ExtractJwt.fromAuthHeaderAsBearerToken(),
          
            (req:Request)=> {
            let token = null;
            if (req && req.cookies) {
            token = req.cookies['access_token']; // name of your cookie
          }
          return token;
        },
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_ACCESS_SECRET!,
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.email,role_id:payload.role_id };
    }
}

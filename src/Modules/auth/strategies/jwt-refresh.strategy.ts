import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { Auth_credentials } from '../entities/user_details.entity';
import { RefreshTokenEntity } from '../entities/refresh_token.entity';
@Injectable()
export class jwttoken extends PassportStrategy(Strategy, 'jwt-refresh-token')
{
    constructor(
        @InjectRepository(Auth_credentials)
        private readonly auth_Credentials: Repository<Auth_credentials>,
        @InjectRepository(RefreshTokenEntity)
        private readonly refresh_token_storage: Repository<RefreshTokenEntity>,
    ) {
        // Explicitly check for the secret and throw an error if it's not set.
        const secret = process.env.JWT_REFRESH_SECRET;
        if (!secret) {
            throw new Error('JWT_REFRESH_SECRET is not defined in the environment variables.');
        }

        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.body?.refresh_token;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: secret, // Now TypeScript knows this is definitely a string
            passReqToCallback: true,
        });
    }
    async validate(req: Request, payload: any) {
        const refreshToken = req.body.refresh_token;
        // First, check if the token is valid and not expired
        const tokenRecord = await this.refresh_token_storage.findOne({
            where: {
                user_id: payload.sub,
                refresh_token: refreshToken,
            },
        });

        if (!tokenRecord) {
            throw new UnauthorizedException('Refresh token is invalid or has been used');
        }

        // Now, find the user to attach to the request
        const user = await this.auth_Credentials.findOne({
            where: { user_id: payload.sub },
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return user;
    }

}
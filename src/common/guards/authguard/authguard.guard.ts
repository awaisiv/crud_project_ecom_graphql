import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshTokenEntity } from 'src/Modules/auth/entities/refresh_token.entity';
import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwt_service: JwtService,
        private reflector: Reflector,
        @InjectRepository(RefreshTokenEntity) private refresh_token_storage: Repository<RefreshTokenEntity>
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const authheader = request.headers['authorization'];

        console.log('Auth header:', authheader);
        console.log('Access secret in env:', process.env.JWT_ACCESS_SECRET);
        if (!authheader) {
            throw new UnauthorizedException("Missing Authorization Header");
        }

        const token = authheader.split(' ')[1];
        console.log(token)
        if (!token) {
            throw new UnauthorizedException('invalid authorization format');
        }

        try {
            const payload = this.jwt_service.verify(token, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            // Optional: only check refresh token existence if this is your design
            // BUT ideally don't check refresh token table for access token validation
            const tokenRecord = await this.refresh_token_storage.findOne({
                where: { user_id: payload.sub }
            });

            if (!tokenRecord) {
                throw new UnauthorizedException('No matching refresh token in DB');
            }

            request.user = payload;
            return true;

        } catch (err) {
            console.error('JWT verify error:', err.name, err.message);
            throw new UnauthorizedException(err.message);
        }
    }
}
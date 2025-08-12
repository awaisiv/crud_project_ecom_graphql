import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth_credentials } from './entities/user_details.entity';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenEntity } from './entities/refresh_token.entity';
import { Userdetails } from '../user/entities/user.entity';
import { jwttoken } from './strategies/jwt-refresh.strategy';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [TypeOrmModule.forFeature([Auth_credentials, RefreshTokenEntity, Userdetails]),
    JwtModule
  ],
  controllers: [AuthController],
  providers: [AuthService, jwttoken],
  exports: [jwttoken, TypeOrmModule]
})
export class AuthModule { }

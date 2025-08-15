import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth_credentials } from './entities/auth_credentials.entity';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenEntity } from './entities/refresh_token.entity';
import { UserDetails } from '../users/entities/user.entity';
import { JwtStrategy } from './strategies/jwt-refresh.strategy';
import { PassportModule } from '@nestjs/passport';
import { RolePermission } from './entities/roles-permission.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Auth_credentials, RefreshTokenEntity, UserDetails,RolePermission]),
    JwtModule, PassportModule
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, TypeOrmModule]
})
export class AuthModule { }

import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth_credentials } from './entities/auth_credentials.entity';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenEntity } from './entities/refresh_token.entity';
import { UserDetails } from '../users/entities/user.entity';
import { JwtStrategy } from './strategies/jwt-refresh.strategy';
import { PassportModule } from '@nestjs/passport';
import { RolePermission } from './entities/roles-permission.entity';
import { AuthResolver } from './resolver/auth.resolver';
@Module({
  imports: [TypeOrmModule.forFeature([Auth_credentials, RefreshTokenEntity, UserDetails, RolePermission]),
    JwtModule, PassportModule
  ],
  providers: [AuthService, JwtStrategy,AuthResolver],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule { }

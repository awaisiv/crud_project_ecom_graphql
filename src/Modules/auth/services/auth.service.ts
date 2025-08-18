import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth_credentials } from '../entities/auth_credentials.entity';
import { RefreshTokenEntity } from '../entities/refresh_token.entity';
import * as bcrypt from "bcrypt"
import * as crypto from "crypto";
import { Response } from 'express';
import { In, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { error } from 'console';
import { RegisterDto } from '../dto/register.dto';
import { UserDetails } from 'src/Modules/users/entities/user.entity';
import { RolePermission } from '../entities/roles-permission.entity';
import { access } from 'fs';
@Injectable()
export class AuthService {
  constructor(@InjectRepository(Auth_credentials) private readonly login_credentials: Repository<Auth_credentials>,
    @InjectRepository(RefreshTokenEntity) private readonly refresh_token_storage: Repository<RefreshTokenEntity>,
    @InjectRepository(RolePermission) private readonly role_permission: Repository<RolePermission>,
    @InjectRepository(UserDetails) private readonly userdetails: Repository<UserDetails>,
    private readonly jwt_service: JwtService) { }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
  // utility: hash refresh token
  async hashToken(token: string): Promise<string> {
    return bcrypt.hash(token, 10);
  }

  async authenticateSignin(loginDTO: LoginDto) {
    const { email, password } = loginDTO;
    const user = await this.login_credentials.findOne({ where: { email: email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    // 2. Directly check password (plaintext)
    await bcrypt.hash(password, 10);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid Passsowrd');
    const payload = {
      sub: user.user_id, email: user.email, role_id: user.role_id
    }

    const AccessToken = this.jwt_service.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m'
    })

    const RefreshToken = this.jwt_service.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d'
    })
    
    const HashedRefreshToken = await this.hashToken(RefreshToken)

    await this.refresh_token_storage.update({ user_id: user.user_id }, { refresh_token: HashedRefreshToken, expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) })

    return { access_token:AccessToken,refresh_token:RefreshToken };
  }

  async Register(Registerdto: RegisterDto) {
    const { email, password, ...otherDetails } = Registerdto;
    const emaillower = email.toLocaleLowerCase()
    const user = await this.login_credentials.findOne({ where: { email: emaillower } });
    if (user) throw new UnauthorizedException('User Already Exissts please login');
    // 2. Directly check password (plaintext)


    const hashed_password = await bcrypt.hash(password, 10);
    const newUser = this.login_credentials.create({
      email: emaillower,
      password: hashed_password,
      role_id: otherDetails.role_id
    });
    await this.login_credentials.save(newUser);
    const userDetails = this.userdetails.create({
      user_id: newUser.user_id,
      name: otherDetails.name,
      gender: otherDetails.gender,            // This should be one of gender_choice enum values like 'MALE'
      date_of_birth: otherDetails.date_of_birth,  // Date type or ISO string
      email: emaillower,
      phone_number: otherDetails.phone_number,
    });

    await this.userdetails.save(userDetails)
    const payload = {
      sub: newUser.user_id, email: emaillower, role_id: newUser.role_id
    }

    const AccessToken = this.jwt_service.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m'
    })

    const RefreshToken = this.jwt_service.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d'
    })

    const data = this.refresh_token_storage.create({ user_id: newUser.user_id, refresh_token: RefreshToken, expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) })
    await this.refresh_token_storage.save(data);
    return { access_token: AccessToken,  refresh_token:RefreshToken };
  }

  async refresh_token_verify(oldRefreshToken: string,context:{res:Response}) {

    let payload;
    try {
      payload = this.jwt_service.verify(oldRefreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
    
    const existing_token = await this.refresh_token_storage.findOne({
      where:{user_id:payload.sub},
    })
    if (!existing_token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const isValid = await bcrypt.compare(oldRefreshToken,existing_token.refresh_token);


   if(!isValid) {
    throw new UnauthorizedException('Invalid refresh token');
      }

     if (existing_token.expires_at.getTime() < Date.now()) {
      throw new UnauthorizedException('Refresh Token Expired');
    }
    
  const newPayload = { sub: payload.sub, username: payload.username };
    
    // 2. Generate a new JWT access token and a new refresh token.
    const newAccessToken = this.jwt_service.sign(newPayload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m'
    })
    const newRefreshToken = this.jwt_service.sign(newPayload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    })
    const hashedNewRefreshToken = await this.hashToken(newRefreshToken)

    await this.refresh_token_storage.update(
      {user_id:payload.sub},
      {
        refresh_token:hashedNewRefreshToken,
        expires_at: new Date(Date.now()+7*24*60*60*1000),
      }
    )
    context.res.cookie('refresh_token',newRefreshToken,{
      httpOnly:true,
      secure:process.env.NODE_ENV === 'Production',
      sameSite:'strict',
      maxAge:7*24*60*60*1000
    })

    return { access_token: newAccessToken }
  }

  async getUserPermissions(userId: number): Promise<string[]> {
    const user = await this.login_credentials.findOne({
      where: { user_id: userId },
      relations: ['roles'], // Assuming User has ManyToMany with Role
    });

     if (!user || !user.role_id) return [];

    const roleIds = user.roles.map(role => role.role_id);

      const rolePermissions = await this.role_permission.find({
        where: { role: { role_id: In(roleIds) } },
        relations: ['permission'], // So we can access rp.permission.name
      });

    const permissions = new Set<string>();
      rolePermissions.forEach(rp => {
        if (rp.allowed && rp.permission) {
          permissions.add(rp.permission.name);
        }
      });

    return Array.from(permissions);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

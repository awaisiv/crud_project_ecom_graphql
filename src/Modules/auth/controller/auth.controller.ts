import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenEntity } from '../entities/refresh_token.entity';
import { Repository } from 'typeorm';
import { JwtRefreshTokenGuard } from 'src/common/guards/authguard/authguard.guard';
import { readonly } from 'zod';
import { JwtService } from '@nestjs/jwt';
@Controller('auth')
export class AuthController {
  constructor(@InjectRepository(RefreshTokenEntity) private readonly refresh_token_storage: Repository<RefreshTokenEntity>,
    private readonly jwtService: JwtService, private readonly authService: AuthService) {

  }
  @Post('refresh')
  @UseGuards(JwtRefreshTokenGuard)
  async refreshtokens(@Req() req: any, @Body('refresh_token') oldrefreshToken: string) {
    const user = req.user

    // 1. Invalidate the old refresh token to prevent reuse.
    await this.refresh_token_storage.delete({ refresh_token: oldrefreshToken });

    // 2. Generate a new JWT access token and a new refresh token.
    const payload = {
      sub: user.user_id,
      email: user.email,
      role_id: user.role_id,
    };
    const newAccessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    })
    const newRefreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    })

    const savedata = this.refresh_token_storage.create({
      user_id: user.user_id,
      refresh_token: newRefreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })

    await this.refresh_token_storage.save(savedata);

    return { access_token: newAccessToken, refresh_token: newRefreshToken }
  }

  @Post('create')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @Post('login')
  LoginUser(@Body() Logindto: LoginDto) {
    return this.authService.authenticateSignin(Logindto);
  }
  @Post('register')
  RegisterUsser(@Body() registerdto: RegisterDto) {
    return this.authService.Register(registerdto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ControllerRoles, Roles } from 'src/common/decorators/Roles.decorator';
import { Role } from '../entities/roles.entity';
@Controller('auth')
@ControllerRoles('2')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwt_service: JwtService) {

  }
  @Post('refresh')
  async refreshtokens(@Req() req: any, @Body() body: { refresh_token: string }) {
    try {
      const payload = this.jwt_service.verify(body.refresh_token, {
        secret: process.env.JWT_REFRESH_SECRET,
      })
      return await this.authService.refresh_token_verify(body.refresh_token, payload);

    }
    catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  @Post('create')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @Post('login')
  LoginUser(@Body() Logindto: LoginDto) {
    return this.authService.authenticateSignin(Logindto);
  }
  @Roles('1')
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

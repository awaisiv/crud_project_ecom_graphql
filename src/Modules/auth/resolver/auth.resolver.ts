import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TokenModel } from '../model/tokens.model';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
@Resolver()
export class AuthResolver {
      constructor(private readonly authService: AuthService, private readonly jwt_service: JwtService) { }

      // @Mutation(() => Tokendto)
      // async refreshtokens(@Args('refresh_token') refresh_token: string) {
      //       return await this.authService.refresh_token_verify(refresh_token);
      // }

      @Mutation(() => TokenModel)
      LoginUser(@Args('login_credentails') logindto: LoginDto, @Context() context: { res: Response }) {
            const token = this.authService.create(logindto);


      }

      @Mutation(() => TokenModel)
      RegisterUser(@Args('registerDto') registerdto: RegisterDto) {
            return this.authService.Register(registerdto);
      }



}

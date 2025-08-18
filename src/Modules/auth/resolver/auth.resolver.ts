import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { TokenModel } from '../model/tokens.model';
import { Request ,Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { Public } from 'src/common/decorators/authskip.decorator';
@Resolver()
export class AuthResolver {
      constructor(private readonly authService: AuthService) { }

      @Public()
      @Mutation(() => TokenModel)
      async refreshtokens(@Context() context: {req:Request,res:Response}) {
            const refresh_token =  context.req.cookies['refresh_token'];
            return await this.authService.refresh_token_verify(refresh_token,context);
      }

      @Mutation(() => TokenModel)
      @Public()
      async LoginUser(@Args('login_credentails') logindto: LoginDto, @Context() context: {res: Response }) {
            const { access_token, refresh_token } = await this.authService.authenticateSignin(logindto);

            // Store refresh token in a secure cookie
            context.res.cookie('refresh_token', refresh_token, {
            httpOnly: true,   // JS cannot read
            secure: true,     // only sent over HTTPS
            sameSite: 'strict', // prevent CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
            // Return only the access token in GraphQL response
       return { access_token };
      }

      @Mutation(() => TokenModel)
      async RegisterUser(@Args('registerDto') registerdto: RegisterDto ,@Context() context :{res:Response} ) {
            const {access_token,refresh_token} = await this.authService.Register(registerdto);

            context.res.cookie('refresh_token', refresh_token, {
            httpOnly: true,   // JS cannot read
            secure: true,     // only sent over HTTPS
            sameSite: 'strict', // prevent CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
            
            return {access_token};
      }
}

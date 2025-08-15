import { Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
@Resolver()
export class AuthResolver {
      constructor(private readonly authService: AuthService, private readonly jwt_service: JwtService) {
    
      }
}

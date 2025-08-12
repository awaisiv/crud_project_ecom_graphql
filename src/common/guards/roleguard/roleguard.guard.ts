import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/common/decorators/Roles.decortor';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const required_role = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!required_role) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user || !required_role.includes(user.role_id)) {
      throw new ForbiddenException('You dont have the desired Permission')
    }
    return true;
  }

}

// role.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, CONTROLLER_ROLES_KEY } from '../../decorators/Roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    // Get roles from METHOD first, then CONTROLLER
    const methodRoles = this.reflector.get<number[]>(ROLES_KEY, context.getHandler());
    const controllerRoles = this.reflector.get<number[]>(CONTROLLER_ROLES_KEY, context.getClass());

    // Combine roles (method overrides controller)
    const requiredRoles = methodRoles || controllerRoles;
    if (!requiredRoles) return true; // No role restrictions

    // Check user role
    const { user } = context.switchToHttp().getRequest();
    if (!user || !requiredRoles.includes(user.role_id)) {
      throw new ForbiddenException(
        `Required roles: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
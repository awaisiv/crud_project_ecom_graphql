// role.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, CONTROLLER_ROLES_KEY } from '../../decorators/Roles.decorator';
import { DataSource } from 'typeorm';
import { Role } from 'src/Modules/auth/entities/roles.entity';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PERMISSION_KEY } from 'src/common/decorators/Permissions.decorator';
import { IS_PUBLIC_KEY } from 'src/common/decorators/authskip.decorator';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private dataSource: DataSource) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) return true;
    const user = (context.getType() as string) === 'graphql'
      ? GqlExecutionContext.create(context).getContext().req.user
      : context.switchToHttp().getRequest().user;

    if (!user) throw new ForbiddenException('No User Found');

    // Get roles from METHOD first, then CONTROLLER
    const methodRoles = this.reflector.get<number[]>(ROLES_KEY, context.getHandler());
    const controllerRoles = this.reflector.get<number[]>(CONTROLLER_ROLES_KEY, context.getClass());

    // Combine roles (method overrides controller)
    const requiredRoles = methodRoles || controllerRoles;
    if (!requiredRoles) return true; // No role restrictions
    // Fetch role name from DB dynamically
    const role = await this.dataSource.getRepository(Role).findOne({
      where: { role_id: user.role_id },
      select: ['role_id', 'rolePermissions'], // or select permissions if needed
    });
    if (!role || !requiredRoles.includes(role.role_id)) {
      throw new ForbiddenException(`Required roles: ${requiredRoles.join(', ')}`);
    }

    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSION_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions) return true;


    if (!user.permissions) {
      throw new ForbiddenException('No permissions found on user');
    }
    const hasPermission = requiredPermissions.every((p) => user.permissions.includes(p));

    if (!hasPermission) {
      throw new ForbiddenException(`Required permissions: ${requiredPermissions.join(', ')}`);
    }


    return true;
  }
}
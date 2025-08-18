// auth/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: number[]) => SetMetadata(ROLES_KEY, roles);

export const CONTROLLER_ROLES_KEY = 'controller_roles';
export const ControllerRoles = (...roles: number[]) =>
    SetMetadata(CONTROLLER_ROLES_KEY, roles);
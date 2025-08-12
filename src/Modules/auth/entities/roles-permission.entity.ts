import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Role } from "./roles.entity";
import { Permission } from "./permission.entity";

@Entity({ name: 'roles_permissions' })
export class RolePermission {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Role, (role) => role.rolePermissions)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @ManyToOne(() => Permission, (permission) => permission.rolePermissions)
    @JoinColumn({ name: 'permission_id' })
    permission: Permission;

    @Column({ default: true })
    allowed: boolean; // Optional: For granular allow/deny
}
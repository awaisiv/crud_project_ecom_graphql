import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { RolePermission } from "./roles-permission.entity";

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({ unique: true })
  role_name: string;

  @OneToMany(() => RolePermission, rp => rp.role)
  rolePermissions: RolePermission[];
}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RolePermission } from "./roles-permission.entity";

@Entity({ name: "permissions" })
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string; // e.g. 'create_order', 'delete_product'

    @OneToMany(() => RolePermission, (rp) => rp.permission)
    rolePermissions: RolePermission[];
}

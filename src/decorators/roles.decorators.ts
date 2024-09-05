import { SetMetadata } from "@nestjs/common";

export const ROLES = "roles";
export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES, roles);

export enum RolesEnum {
  Admin = "admin",
  User = "user",
}

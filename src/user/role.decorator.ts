import { SetMetadata } from '@nestjs/common';
import { Users } from './entity/user.entity';

export type AllowedRoles = keyof typeof Users | 'Any';

export const Role = (roles: AllowedRoles[]) => SetMetadata('roles', roles);

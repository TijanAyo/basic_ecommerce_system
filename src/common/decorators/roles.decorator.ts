import { SetMetadata } from '@nestjs/common';
import { roles } from '../interfaces';

export const Roles = (...roles: roles[]) => SetMetadata('roles', roles);

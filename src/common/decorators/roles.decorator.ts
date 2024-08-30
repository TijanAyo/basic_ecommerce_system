import { SetMetadata } from '@nestjs/common';
import { Roles } from '../interfaces';

export const roles = (args: Roles) => SetMetadata('roles', args);

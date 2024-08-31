import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { roles } from '../interfaces';
import { AppResponse, ErrorMessage } from '../helpers';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<roles>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.role) {
      throw new ForbiddenException(
        AppResponse.Error('User role not found.', ErrorMessage.FORBIDDEN),
      );
    }

    // Check if the role in this user request is included in the allowed role enum
    const hasRole = requiredRoles.includes(user.role);

    if (!hasRole) {
      throw new ForbiddenException(
        AppResponse.Error(
          'You are not authorized to make this request.',
          ErrorMessage.FORBIDDEN,
        ),
      );
    }

    return true;
  }
}

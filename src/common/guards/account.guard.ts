import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AppResponse, ErrorMessage } from '../helpers';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AccountGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const prisma = new PrismaClient();

    const { user } = context.switchToHttp().getRequest();

    if (!user || user.isAccountSuspended === undefined) {
      throw new ForbiddenException(
        AppResponse.Error(
          'User account status not specified.',
          ErrorMessage.FORBIDDEN,
        ),
      );
    }

    const userAccount = await prisma.user.findUnique({
      where: { id: user.sub },
    });

    if (userAccount.isAccountSuspended) {
      throw new ForbiddenException(
        AppResponse.Error(
          `This account has been suspended, kindly contact support for assitance`,
          ErrorMessage.FORBIDDEN,
        ),
      );
    }

    return true;
  }
}

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepositoryService } from '../repository/user-repository/user-repository.service';
import { updateUserRestrictionPayload } from '../common/interfaces';
import { AppResponse, ErrorMessage } from '../common/helpers';

@Injectable()
export class UserService {
  constructor(private readonly _userService: UserRepositoryService) {}

  async restrictUserAccount(
    payload: updateUserRestrictionPayload,
    userId: string,
    adminId: string,
  ) {
    try {
      const userExist = await this._userService.findUserById(userId);

      if (!userExist) {
        throw new NotFoundException(
          AppResponse.Error(
            `User with ID: #${userId} not found, check input and try again`,
            ErrorMessage.NOT_FOUND,
          ),
        );
      }

      if (userId === adminId) {
        throw new ConflictException(
          AppResponse.Error(
            `User can't perform this action on their account`,
            ErrorMessage.CONFLICT,
          ),
        );
      }

      if (payload.action === 'BAN' && userExist.isAccountSuspended === true) {
        throw new BadRequestException(
          AppResponse.Error(
            `The action '${payload.action}' has previously been initiated on this account`,
            ErrorMessage.BAD_REQUEST,
          ),
        );
      }

      await this._userService.modifyUserRestrictionStatus(payload, userId);

      return AppResponse.Ok(
        null,
        `This account has been ${payload.action}'ed successfully`,
      );
    } catch (e) {
      console.error(
        `Error in restrictUserAccount: Unable to perform required action`,
        e.message,
        e.stack,
      );
      throw e;
    }
  }
}

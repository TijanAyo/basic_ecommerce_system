import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { roles, updateUserRestrictionPayload } from '../../common/interfaces';
import { AppResponse, ErrorMessage } from 'src/common/helpers';
@Injectable()
export class UserRepositoryService {
  constructor(private _prismaService: PrismaService) {}

  async findUserByEmail(email: string) {
    try {
      const user = await this._prismaService.user.findUnique({
        where: { emailAddress: email },
      });

      return user;
    } catch (e) {
      console.error(
        `Error in findUserByEmail: Unable to find user with email ${email}`,
        e.message,
        e.stack,
      );
      throw new InternalServerErrorException(
        AppResponse.Error(
          `An unexpected error has occurred`,
          ErrorMessage.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  }

  async findUserById(userId: string) {
    try {
      return await this._prismaService.user.findUnique({
        where: { id: userId },
      });
    } catch (e) {
      console.error(
        `Error in findUserById: Unable to find with ID ${userId}`,
        e.message,
        e.stack,
      );
      throw new InternalServerErrorException(
        AppResponse.Error(
          `An unexpected error has occurred`,
          ErrorMessage.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  }

  async createUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ) {
    try {
      const newUser = await this._prismaService.user.create({
        data: {
          emailAddress: email,
          firstName,
          lastName,
          role: roles.user,
          password,
        },
      });

      return newUser;
    } catch (e) {
      console.error(
        `Error in createUser: Unable to create user`,
        e.message,
        e.stack,
      );
      throw new InternalServerErrorException(
        AppResponse.Error(
          `An unexpected error has occurred`,
          ErrorMessage.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  }

  async modifyUserRestrictionStatus(
    payload: updateUserRestrictionPayload,
    userId: string,
  ) {
    try {
      const action = payload.action === 'BAN' ? true : false;

      return await this._prismaService.user.update({
        where: { id: userId },
        data: {
          isAccountSuspended: action,
        },
      });
    } catch (e) {
      console.error(
        `Error in modifyUserRestrictionStatus: Unable to modify product status`,
        e.message,
        e.stack,
      );
      throw new InternalServerErrorException(
        AppResponse.Error(
          `An unexpected error has occurred`,
          ErrorMessage.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  }
}

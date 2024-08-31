import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { roles } from '../../common/interfaces';
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
}

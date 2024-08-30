import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepositoryService } from '../repository/user-repository/user-repository.service';
import { registerPayload } from '../common/interfaces';
import * as bcrypt from 'bcrypt';
import { constants } from './constants';
import { AppResponse, ErrorMessage } from '../common/helpers';

@Injectable()
export class AuthService {
  constructor(private readonly _userRepository: UserRepositoryService) {}

  async register(payload: registerPayload) {
    try {
      const userWithMailExist = await this._userRepository.findUserByEmail(
        payload.email,
      );

      if (userWithMailExist) {
        throw new BadRequestException(
          AppResponse.Error(
            `Email address is already associated with another user`,
            ErrorMessage.BAD_REQUEST,
          ),
        );
      }

      const hashedPassword = await bcrypt.hash(
        payload.password,
        constants.SALT_ROUNDS,
      );

      const createNewUser = await this._userRepository.createUser(
        payload.email,
        payload.firstName,
        payload.lastName,
        hashedPassword,
      );

      if (!createNewUser) {
        console.error(`Error creating user`);
        throw new BadRequestException(
          AppResponse.Error(
            `An unexpected error occurred while creating user`,
            ErrorMessage.BAD_REQUEST,
          ),
        );
      }

      return AppResponse.Ok(null, 'Account created successfully');
    } catch (e) {
      console.error(
        `Error in register: User was not created successfully`,
        e.message,
        e.stack,
      );
      throw e;
    }
  }

  async login() {}
}

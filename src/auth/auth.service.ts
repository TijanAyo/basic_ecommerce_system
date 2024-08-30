import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepositoryService } from '../repository/user-repository/user-repository.service';
import { loginPayload, registerPayload } from '../common/interfaces';
import * as bcrypt from 'bcrypt';
import { constants } from './constants';
import { AppResponse, ErrorMessage } from '../common/helpers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userRepository: UserRepositoryService,
    private readonly jwtService: JwtService,
  ) {}

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

  async login(payload: loginPayload) {
    try {
      const user = await this._userRepository.findUserByEmail(payload.email);
      if (!user) {
        throw new BadRequestException(
          AppResponse.Error(
            'Invalid email credentials, kindly check input and try again',
            ErrorMessage.BAD_REQUEST,
          ),
        );
      }

      const dehashPassword = await bcrypt.compare(
        payload.password,
        user.password,
      );

      if (!dehashPassword) {
        throw new BadRequestException(
          AppResponse.Error(
            'Invalid password credentials, kindly check input and try again',
            ErrorMessage.BAD_REQUEST,
          ),
        );
      }

      const access_token = await this.jwtService.signAsync({ sub: user.id });

      return AppResponse.Ok(access_token, 'User successfully authorized');
    } catch (e) {
      console.error(
        `Error in login: User was not authorized successfully`,
        e.message,
        e.stack,
      );
      throw e;
    }
  }
}

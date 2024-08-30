import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  createUserDto,
  LoginResponseDto,
  loginUserDto,
  RegisterResponseDto,
} from './dtos';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../common/helpers';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @ApiOperation({ summary: 'Onboard users into the application' })
  @ApiCreatedResponse({
    type: RegisterResponseDto,
    description: 'User successfully registered',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorResponseDto,
  })
  @Post('register')
  async register(@Body() payload: createUserDto) {
    return await this._authService.register(payload);
  }

  @ApiOperation({ summary: 'Authorize users into the application' })
  @ApiResponse({
    status: 200,
    type: LoginResponseDto,
    description: 'User authorized successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorResponseDto,
  })
  @Post('login')
  async login(@Body() payload: loginUserDto) {
    return await this._authService.login(payload);
  }
}

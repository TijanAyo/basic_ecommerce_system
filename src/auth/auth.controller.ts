import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('register')
  async register(@Body() payload: createUserDto) {
    return await this._authService.register(payload);
  }

  @Post('login')
  async login() {}
}

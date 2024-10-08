import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RepositoryModule } from '../repository/repository.module';
import { JwtModule } from '@nestjs/jwt';
import { constants } from './constants';

@Module({
  imports: [
    RepositoryModule,
    JwtModule.register({
      global: true,
      secret: constants.secret,
      signOptions: { expiresIn: constants.TTL },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

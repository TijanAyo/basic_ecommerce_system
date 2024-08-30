import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [AuthModule, PrismaModule, RepositoryModule],
})
export class AppModule {}

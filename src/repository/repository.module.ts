import { Module } from '@nestjs/common';
import { UserRepositoryService } from './user-repository/user-repository.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserRepositoryService],
  exports: [UserRepositoryService],
})
export class RepositoryModule {}

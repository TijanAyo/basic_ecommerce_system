import { Module } from '@nestjs/common';
import { UserRepositoryService } from './user-repository/user-repository.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductRepositoryService } from './product-repository/product-repository.service';

@Module({
  imports: [PrismaModule],
  providers: [UserRepositoryService, ProductRepositoryService],
  exports: [UserRepositoryService, ProductRepositoryService],
})
export class RepositoryModule {}

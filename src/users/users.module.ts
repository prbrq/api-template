import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email.use-case';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use-case';
import { USER_REPOSITORY } from './application/ports/user.repository';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    FindUserByEmailUseCase,
    FindUserByIdUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [FindUserByEmailUseCase, FindUserByIdUseCase],
})
export class UsersModule {}

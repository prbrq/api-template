import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../ports/user.repository';
import type { UserRepository } from '../ports/user.repository';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  execute(id: string) {
    return this.userRepository.findById(id);
  }
}

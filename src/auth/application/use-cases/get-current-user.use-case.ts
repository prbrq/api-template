import { Injectable, NotFoundException } from '@nestjs/common';
import { FindUserByIdUseCase } from '../../../users/application/use-cases/find-user-by-id.use-case';
import { UserRole } from '../../../users/domain/enums/user-role.enum';

export interface CurrentUserOutput {
  id: string;
  email: string;
  role: UserRole;
}

@Injectable()
export class GetCurrentUserUseCase {
  constructor(private readonly findUserByIdUseCase: FindUserByIdUseCase) {}

  async execute(userId: string): Promise<CurrentUserOutput> {
    const user = await this.findUserByIdUseCase.execute(userId);

    if (!user) {
      throw new NotFoundException('Usr not found');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}

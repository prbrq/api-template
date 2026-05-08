import { User as PrismaUser } from '../../../../generated/prisma/client';
import { User } from '../../domain/entities/user.entity';
import { UserRole } from '../../domain/enums/user-role.enum';

export class PrismaUserMapper {
  static toDomain(user: PrismaUser): User {
    return new User(
      user.id,
      user.email,
      user.passwordHash,
      user.role as UserRole,
      user.createdAt,
      user.updatedAt,
    );
  }
}

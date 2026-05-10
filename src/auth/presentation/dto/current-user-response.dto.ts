import { UserRole } from '../../../users/domain/enums/user-role.enum';

export class CurrentUserResponseDto {
  id!: string;
  email!: string;
  role!: UserRole;
}

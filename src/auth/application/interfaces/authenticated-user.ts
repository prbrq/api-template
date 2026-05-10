import { UserRole } from '../../../users/domain/enums/user-role.enum';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
}

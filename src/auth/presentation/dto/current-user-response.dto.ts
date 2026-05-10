import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../users/domain/enums/user-role.enum';

export class CurrentUserResponseDto {
  @ApiProperty({
    example: 'b5e4d9e4-0f1b-4f3f-9d2a-0f08e1fdb6e1',
  })
  id!: string;

  @ApiProperty({
    example: 'admin@example.com',
  })
  email!: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.Admin,
  })
  role!: UserRole;
}

import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    example: 'admin@example.com',
  })
  email!: string;

  @ApiProperty({
    example: 'admin',
  })
  password!: string;
}

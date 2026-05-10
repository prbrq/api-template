import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.loginUseCase.execute({
      email: dto.email,
      password: dto.password,
    });
  }
}

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { GetCurrentUserUseCase } from '../application/use-cases/get-current-user.use-case';
import type { AuthenticatedUser } from '../application/interfaces/authenticated-user';
import { CurrentUserResponseDto } from './dto/current-user-response.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtAuthGuard } from '../infrastructure/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
  ) {}

  @Post('login')
  login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.loginUseCase.execute({
      email: dto.email,
      password: dto.password,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: AuthenticatedUser): Promise<CurrentUserResponseDto> {
    return this.getCurrentUserUseCase.execute(user.id);
  }
}

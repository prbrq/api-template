import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../application/interfaces/jwt-payload';
import { TokenService } from '../../application/ports/token.service';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}

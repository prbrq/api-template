import { JwtPayload } from '../interfaces/jwt-payload';

export const TOKEN_SERVICE = Symbol('TOKEN_SERVICE');

export interface TokenService {
  sign(payload: JwtPayload): Promise<string>;
}

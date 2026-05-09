export const PASSWORD_HASHER = Symbol('PASSWORD_HASHER');

export interface PasswordHasher {
  compare(plainText: string, hash: string): Promise<boolean>;
}

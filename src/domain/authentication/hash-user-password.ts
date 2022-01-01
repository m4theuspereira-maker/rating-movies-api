export interface HashUserPassword {
  hashPassword(password: string): Promise<string>;
}

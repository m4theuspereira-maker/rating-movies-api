import { HashUserPassword } from "@/domain/authentication/hash-user-password";

export class Argon2Encrypter implements HashUserPassword {
  async hashPassword(password: string): Promise<any> {
    return "";
  }
}

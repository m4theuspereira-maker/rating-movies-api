import { HashUserPassword } from "@/domain/authentication/hash-user-password";
import * as argon2 from "argon2";
export class Argon2Encrypter implements HashUserPassword {
  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  }
}

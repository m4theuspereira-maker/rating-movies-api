import { HashUserPassword } from "@/domain/authentication/hash-user-password";
import * as argon2 from "argon2";
import { ServerError } from "../errors/server-error";
export class Argon2Encrypter implements HashUserPassword {
  async hashPassword(password: string): Promise<string> {
    try {
      const hashedPassword = await argon2.hash(password);
      return hashedPassword;
    } catch (error) {
      throw new ServerError();
    }
  }
}

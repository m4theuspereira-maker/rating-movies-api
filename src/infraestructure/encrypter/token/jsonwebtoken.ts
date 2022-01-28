import {
  GenerateTokenDto,
  TokenDecoder,
  TokenEncoder,
} from "@/domain/authentication/token";
import { AuthenticationError } from "@/infraestructure/errors/authentication-error";
import { verify } from "argon2";
import * as jwt from "jsonwebtoken";

export class Jsonwebtoken implements TokenDecoder, TokenEncoder {
  async generateToken({
    id,
    type,
    password,
    isActive,
  }: GenerateTokenDto): Promise<string> {
    try {
      const isPasswordValid = await verify("userPassword", password);
      let token = "";
      if (isPasswordValid) {
        token = jwt.sign({ id, type, isActive }, "api_secret", {
          expiresIn: "12h",
        });
      }

      if (token.length < 1) {
        throw new AuthenticationError();
      }

      return token;
    } catch (error) {
      throw new AuthenticationError();
    }
  }
  async decodeToken(token: string): Promise<any> {
    return "";
  }
}

import {
  GenerateTokenDto,
  TokenDecoder,
  TokenEncoder,
  UserAuthenticatedData,
} from "@/domain/authentication/token";
import { AuthenticationError } from "@/infraestructure/errors/authentication-error";
import { verify } from "argon2";
import * as jwt from "jsonwebtoken";

export class Jsonwebtoken implements TokenDecoder, TokenEncoder {
  async generateToken({
    id,
    role,
    password,
    isActive,
  }: GenerateTokenDto): Promise<string> {
    try {
      const isPasswordValid = await verify("userPassword", password);
      let token = "";
      if (isPasswordValid) {
        token = jwt.sign({ id, role, isActive }, "api_secret", {
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
  decodeToken(token: string): UserAuthenticatedData {
    try {
      const { id, role, isActive } = jwt.verify(
        token,
        "api_secret"
      ) as UserAuthenticatedData;

      const userVeryfiedData = {
        id,
        role,
        isActive,
      };

      return userVeryfiedData;
    } catch (error) {
      throw new AuthenticationError();
    }
  }
}

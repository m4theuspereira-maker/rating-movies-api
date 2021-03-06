import { ServerError } from "@/infraestructure/errors/server-error";

export interface GenerateTokenDto {
  id: string;
  role: string;
  password: string;
  isActive: boolean;
}

export interface UserAuthenticatedData {
  id: string;
  role: string;
  isActive: boolean;
}

export type TokenCreationResult = ServerError | string;
export interface TokenEncoder {
  generateToken(
    generateTokenDto: GenerateTokenDto
  ): Promise<TokenCreationResult>;
}
export interface TokenDecoder {
  decodeToken(token: string): UserAuthenticatedData;
}

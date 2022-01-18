export interface GenerateTokenDto {
  id: string;
  type: string;
  isActive: boolean;
}

export interface TokenEncoder {
  generateToken(generateTokenDto: GenerateTokenDto): Promise<string>;
}

export interface TokenDecoder {
  decodeToken(token: string): Promise<any>;
}

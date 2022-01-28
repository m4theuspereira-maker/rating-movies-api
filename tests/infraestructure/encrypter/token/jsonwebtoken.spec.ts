import { TokenDecoder, TokenEncoder } from "@/domain/authentication/token";
import { ServerError } from "@/infraestructure/errors/server-error";
import { mock, MockProxy } from "jest-mock-extended";
import { Jsonwebtoken } from "@/infraestructure/encrypter/token/jsonwebtoken";
import { AuthenticationError } from "@/infraestructure/errors/authentication-error";

describe("jsonwebtoken test", () => {
  let tokenEncoder: MockProxy<TokenEncoder>;
  let tokenDecoder: MockProxy<TokenDecoder>;
  let Jsonwebtoken: MockProxy<Jsonwebtoken>;
  let generateTokenTest: any;
  let tokenDecoded: any;
  const TOKEN_ENCODED = "any_token_encoded";
  const TOKEN_DECODED = {
    id: "any_id",
    role: "any_role",
    isActive: true,
  };

  const TOKEN_PAYLOAD = {
    id: "any_id",
    role: "any_role",
    password: "$any_password",
    isActive: true,
  };

  beforeAll(() => {
    tokenEncoder = mock();
    tokenDecoder = mock();
    Jsonwebtoken = mock();
  });

  beforeEach(() => {
    generateTokenTest = jest
      .spyOn(Jsonwebtoken, "generateToken")
      .mockResolvedValue(TOKEN_ENCODED);
    tokenDecoded = jest
      .spyOn(Jsonwebtoken, "decodeToken")
      .mockReturnValue(TOKEN_DECODED);
  });

  test("should call generate token", async () => {
    Jsonwebtoken.generateToken(TOKEN_PAYLOAD);
    expect(generateTokenTest).toHaveBeenCalled();
  });

  test("should call generate token with Dto", async () => {
    Jsonwebtoken.generateToken(TOKEN_PAYLOAD);
    expect(generateTokenTest).toHaveBeenCalledWith(TOKEN_PAYLOAD);
  });

  test("should return a encoded token", async () => {
    const tokenEncodedTest = await Jsonwebtoken.generateToken(TOKEN_PAYLOAD);
    expect(tokenEncodedTest).toEqual(TOKEN_ENCODED);
  });

  test("should throw a authentication error if JWT throws", async () => {
    Jsonwebtoken.generateToken.mockRejectedValueOnce(() => {
      throw new AuthenticationError();
    });

    const tokenEncodedTest = Jsonwebtoken.generateToken(TOKEN_PAYLOAD);

    await expect(tokenEncodedTest).rejects.toThrow(new AuthenticationError());
  });

  test("should call token decoder", async () => {
    Jsonwebtoken.decodeToken(TOKEN_ENCODED);
    expect(tokenDecoded).toHaveBeenCalled();
  });

  test("should call token decoder with token", async () => {
    Jsonwebtoken.decodeToken(TOKEN_ENCODED);
    expect(tokenDecoded).toHaveBeenCalledWith(TOKEN_ENCODED);
  });

  test("should call token decoder with token", async () => {
    const tokenDecodedTest = Jsonwebtoken.decodeToken(TOKEN_ENCODED);
    expect(tokenDecodedTest).toEqual(TOKEN_DECODED);
  });

  test("should throw a authentication error if JWT throws", () => {
    try {
      Jsonwebtoken.decodeToken.mockImplementationOnce(() => {
        throw new AuthenticationError();
      });
      const tokenEncodedTest = Jsonwebtoken.decodeToken(TOKEN_ENCODED);

      expect(tokenEncodedTest).toThrow(new AuthenticationError());
    } catch (error) {}
  });
});

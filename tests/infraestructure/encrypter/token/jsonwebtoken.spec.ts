import { TokenEncoder } from "@/domain/authentication/token";
import { ServerError } from "@/infraestructure/errors/server-error";
import { mock, MockProxy } from "jest-mock-extended";
import { Jsonwebtoken } from "@/infraestructure/encrypter/token/jsonwebtoken";
import { AuthenticationError } from "@/infraestructure/errors/authentication-error";

describe("jsonwebtoken test", () => {
  let tokenEncoder: MockProxy<TokenEncoder>;
  let Jsonwebtoken: MockProxy<Jsonwebtoken>;
  let generateTokenTest: any;
  const TOKEN_ENCODED = "any_token_encoded";

  const TOKEN_PAYLOAD = {
    id: "any_id",
    type: "any_type",
    password: "$any_password",
    isActive: true,
  };

  beforeAll(() => {
    tokenEncoder = mock();
    Jsonwebtoken = mock();
  });

  beforeEach(() => {
    generateTokenTest = jest
      .spyOn(Jsonwebtoken, "generateToken")
      .mockResolvedValue(TOKEN_ENCODED);
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

  test("should throw a server erro if JWT throws", async () => {
    Jsonwebtoken.generateToken.mockRejectedValueOnce(() => {
      throw new AuthenticationError();
    });

    const tokenEncodedTest = Jsonwebtoken.generateToken(TOKEN_PAYLOAD);

    await expect(tokenEncodedTest).rejects.toThrow(new AuthenticationError());
  });
});

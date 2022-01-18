import { mock, MockProxy } from "jest-mock-extended";
import { TokenDecoder, TokenEncoder } from "./token";

describe("hash-user-password", () => {
  let tokenDecoder: MockProxy<TokenDecoder>;
  let tokenEncoder: MockProxy<TokenEncoder>;

  const TOKEN_PAYLOAD = {};
  const token = "any_token";

  beforeAll(() => {
    tokenDecoder = mock();
    tokenEncoder = mock();
  });

  test("shoud call token encoder", () => {
    const tokenEncoderSpy = jest.spyOn(tokenEncoder, "generateToken");
    tokenEncoder.generateToken(TOKEN_PAYLOAD);
    expect(tokenEncoderSpy).toHaveBeenCalled();
  });

  test("shoud call token decoder", () => {
    const tokenDecoderSpy = jest.spyOn(tokenDecoder, "decodeToken");
    tokenDecoder.decodeToken("any_token");
    expect(tokenDecoderSpy).toHaveBeenCalled();
  });

  test("shoud call should call token encoder with payload", () => {
    const tokenDecoderSpy = jest.spyOn(tokenEncoder, "generateToken");
    tokenEncoder.generateToken(TOKEN_PAYLOAD);
    expect(tokenDecoderSpy).toHaveBeenCalledWith(TOKEN_PAYLOAD);
  });

  test("shoud call should call token decoder with token", () => {
    const tokenDecoderSpy = jest.spyOn(tokenDecoder, "decodeToken");
    tokenDecoder.decodeToken(token);
    expect(tokenDecoderSpy).toHaveBeenCalledWith(token);
  });
});

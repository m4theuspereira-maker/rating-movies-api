import { mock, MockProxy } from "jest-mock-extended";
import { TokenDecoder, TokenEncoder } from "./token";

describe("hash-user-password", () => {
  let tokenDecoder: MockProxy<TokenDecoder>;
  let tokenEncoder: MockProxy<TokenEncoder>;

  beforeAll(() => {
    tokenDecoder = mock();
    tokenEncoder = mock();
  });

  test("shoud call token encoder", () => {
    const tokenEncoderSpy = jest.spyOn(tokenEncoder, "generateToken");
    tokenEncoder.generateToken("any_data");
    expect(tokenEncoderSpy).toHaveBeenCalled();
  });

  test("shoud call token decoder", () => {
    const tokenDecoderSpy = jest.spyOn(tokenDecoder, "decodeToken");
    tokenDecoder.decodeToken("any_token");
    expect(tokenDecoderSpy).toHaveBeenCalled();
  });
});

import { mock, MockProxy } from "jest-mock-extended";
import { HashUserPassword } from "@/domain/authentication/hash-user-password";

describe("hash-user-password", () => {
  let hashUserPassword: MockProxy<HashUserPassword>;

  beforeAll(() => {
    hashUserPassword = mock();
  });
  test("should be called with a valid password", () => {
    const hashPasswordSpy = jest.spyOn(hashUserPassword, "hashPassword");
    hashUserPassword.hashPassword("any_password");
    expect(hashPasswordSpy).toHaveBeenCalled();
  });
});

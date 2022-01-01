import { mock, MockProxy } from "jest-mock-extended";
import { Argon2Encrypter } from "@/infraestructure/encrypter/argon2-encrypter";

describe("argon2 encrypter test", () => {
  let argonEncrypter: MockProxy<Argon2Encrypter>;

  beforeAll(() => {
    argonEncrypter = mock();
  });

  test("should call argon2 encrypter with password", () => {
    const argonEncrypterSpy = jest.spyOn(argonEncrypter, "hashPassword");
    argonEncrypter.hashPassword("any_password");
    expect(argonEncrypterSpy).toHaveBeenCalled();
  });
});

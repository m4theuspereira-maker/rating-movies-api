import { mock, MockProxy } from "jest-mock-extended";
import { Argon2Encrypter } from "@/infraestructure/encrypter/argon2-encrypter";

describe("argon2 encrypter test", () => {
  let argonEncrypter: MockProxy<Argon2Encrypter>;

  const password = "any_password";
  const hash = "any_hashed_password";

  beforeAll(() => {
    argonEncrypter = mock();
  });

  beforeEach(() => {
    argonEncrypter.hashPassword.mockResolvedValueOnce(hash);
  });

  test("should call argon2 encrypter with password", () => {
    const argonEncrypterSpy = jest.spyOn(argonEncrypter, "hashPassword");
    argonEncrypter.hashPassword("any_password");
    expect(argonEncrypterSpy).toHaveBeenCalled();
  });

  test("should return a hashed password", async () => {
    const hashedPassword = await argonEncrypter.hashPassword(password);

    expect(hashedPassword).toEqual(hash);
  });
});

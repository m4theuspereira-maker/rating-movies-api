import { mock, MockProxy } from "jest-mock-extended";
import { Argon2Encrypter } from "@/infraestructure/encrypter/password/argon2-encrypter";
import { ServerError } from "@/infraestructure/errors/server-error";

describe("argon2 encrypter test", () => {
  let argonEncrypter: MockProxy<Argon2Encrypter>;

  const password = "any_password";
  const hash = "any_hashed_password";

  beforeAll(() => {
    argonEncrypter = mock();
  });

  beforeEach(() => {
    argonEncrypter.hashPassword.mockResolvedValue(hash);
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

  test("should throw an error ", async () => {
    argonEncrypter.hashPassword.mockRejectedValueOnce(() => {
      throw new ServerError();
    });

    const hashedPasswordPromise = argonEncrypter.hashPassword(password);
    await expect(hashedPasswordPromise).rejects.toThrow(new ServerError());
  });
});

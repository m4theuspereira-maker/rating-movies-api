import { mock, MockProxy } from "jest-mock-extended";
import { USER_ROLES } from "@/domain/user/user";
import { ISaveUserRepository } from "@/domain/user/repository/user-repository-interface";

describe("SaveUserRepository", () => {
  const VALID_USER = {
    name: "any name",
    email: "any_email@mail.com",
    password: "hashed",
    role: USER_ROLES.USER,
    isActive: true
  };

  let saveUserRepositroryMock: MockProxy<ISaveUserRepository>;

  beforeAll(() => {
    saveUserRepositroryMock = mock();
  });

  it("should be called with a valid password", () => {
    const saveUserRepositorySpy = jest.spyOn(
      saveUserRepositroryMock,
      "saveUser"
    );
    saveUserRepositroryMock.saveUser(VALID_USER);
    expect(saveUserRepositorySpy).toHaveBeenCalled();
  });

});

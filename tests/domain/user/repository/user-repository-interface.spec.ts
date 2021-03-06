import { mock, MockProxy } from "jest-mock-extended";
import { USER_ROLES } from "@/domain/user/user";
import { ISaveUserRepository } from "@/domain/user/repository/user-repository-interface";

describe("SaveUserRepository", () => {
  const VALID_USER = {
    name: "any name",
    email: "any_email@mail.com",
    password: "hashed",
    role: USER_ROLES.USER,
    isActive: true, 
    createdAt: new Date()
  };

  let saveUserRepositroryMock: MockProxy<ISaveUserRepository>;

  beforeAll(() => {
    saveUserRepositroryMock = mock();
  });

  it("should be called", () => {
    const saveUserRepositorySpy = jest.spyOn(
      saveUserRepositroryMock,
      "saveUser"
    );
    saveUserRepositroryMock.saveUser(VALID_USER);
    expect(saveUserRepositorySpy).toHaveBeenCalled();
  });

  it("should be called with valid User", () => {
    const saveUserRepositorySpy = jest.spyOn(
      saveUserRepositroryMock,
      "saveUser"
    );
    saveUserRepositroryMock.saveUser(VALID_USER);
    expect(saveUserRepositorySpy).toHaveBeenLastCalledWith(VALID_USER);
  });

});

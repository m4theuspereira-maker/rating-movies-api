import { createUserDto, User } from "./user";
import { mock, MockProxy } from "jest-mock-extended";

describe("UserEntity", () => {
  let userEntity: MockProxy<UserEntity>;
  const USER_DATA: createUserDto = {
    name: "any name",
    email: "any_email@mail.com",
    password: "any_password",
    passowrdRepeat: "any_password",
  };

  it("should call the method to create user", () => {
    userEntity = mock();
    /// const userEntity = new UserEntity();

    const createUserSpy = jest.spyOn(userEntity, "createUser");
    userEntity.createUser(USER_DATA);
    expect(createUserSpy).toHaveBeenCalled();
    expect(userEntity.createUser).toBeCalledWith(USER_DATA);
  });
});

export class UserEntity {
  createUser(user: createUserDto): void {}
}

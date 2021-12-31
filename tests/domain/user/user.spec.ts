import {
  createUserDto,
  UserEntity,
  UserCreationResult,
  User,
} from "@/domain/user/user";
import { mock, MockProxy } from "jest-mock-extended";
import { BusinessError } from "@/domain/errors/business-error";

describe("UserEntity", () => {
  let userEntitySut: UserEntity;
  let userEntity: MockProxy<UserEntity>;
  const USER_DATA: createUserDto = {
    name: "any name",
    email: "any_email@mail.com",
    password: "any_password",
    passowrdRepeat: "any_password",
  };

  beforeAll(() => {
    (userEntitySut = new UserEntity()), (userEntity = mock());
  });

  it("should call the method to create user", () => {
    const createUserSpy = jest.spyOn(userEntity, "createUser");
    userEntity.createUser(USER_DATA);
    expect(createUserSpy).toHaveBeenCalled();
  });

  it("should call the method to create user with user DTO", () => {
    userEntity.createUser(USER_DATA);
    expect(userEntity.createUser).toBeCalledWith(USER_DATA);
  });

  it("should call with password and repeat", () => {
    userEntity.validatePassword("any_password", "any_password");
    expect(userEntity.validatePassword).toBeCalledWith(
      USER_DATA.password,
      USER_DATA.passowrdRepeat
    );
  });

  it("should return false if password and return is different", () => {
    const sut = new UserEntity();
    const isValidPassowrd = sut.validatePassword(
      "any_password",
      "some_password"
    );
    expect(isValidPassowrd).toEqual(false);
  });

  it("should return false if password and return is different", () => {
    const isValidPassowrd = userEntitySut.validatePassword(
      "any_password",
      "any_password"
    );
    expect(isValidPassowrd).toEqual(true);
  });

  it("should call the method to create user", () => {
    const userCreated = userEntitySut.createUser({
      name: "any name",
      email: "any_email@mail.com",
      password: "any_password",
      passowrdRepeat: "some_password",
    });

    expect(userCreated).toEqual(new BusinessError());
  });

  it("should return false with invalid email", () => {
    const invalidEmail = userEntitySut.validateEmail("wrongemail.com");

    expect(invalidEmail).toEqual(false);
  });

  it("should return true with valid email", () => {
    const validEmail = userEntitySut.validateEmail(USER_DATA.email);

    expect(validEmail).toEqual(true);
  });

  it("should return an error if invalid email", () => {
    const invalidUser = userEntitySut.createUser({
      name: "any name",
      email: "any_emaimail.com",
      password: "any_password",
      passowrdRepeat: "any_password",
    });

    expect(invalidUser).toEqual(new BusinessError());
  });
});

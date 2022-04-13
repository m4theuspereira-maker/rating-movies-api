import { createUserDto, UserEntity, USER_ROLES } from "@/domain/user/user";
import { mock, MockProxy } from "jest-mock-extended";
import { BusinessError } from "@/domain/errors/business-error";
import { HashUserPassword } from "@/domain/authentication/hash-user-password";

describe("UserEntity", () => {
  let userEntitySut: UserEntity;
  let hashUserPassword: MockProxy<HashUserPassword>;
  let userEntity: MockProxy<UserEntity>;
  const USER_DATA: createUserDto = {
    name: "any name",
    email: "any_email@mail.com",
    password: "any_password",
    passwordRepeat: "any_password"
  };
  const hashed = "any_password_hashed";

  beforeAll(() => {
    (hashUserPassword = mock()),
      hashUserPassword.hashPassword.mockImplementationOnce(async () => hashed),
      (userEntitySut = new UserEntity(hashUserPassword)),
      (userEntity = mock());
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
      USER_DATA.passwordRepeat
    );
  });

  it("should return false if password is invalid", () => {
    const isValidPassowrd = userEntitySut.validatePassword(
      "any_password",
      "some_password"
    );
    expect(isValidPassowrd).toEqual(false);
  });

  it("should return true if password is valid", () => {
    const isValidPassowrd = userEntitySut.validatePassword(
      "any_password",
      "any_password"
    );
    expect(isValidPassowrd).toEqual(true);
  });

  it("should call the method to create user", async () => {
    const userCreated = await userEntitySut.createUser({
      name: "any name",
      email: "any_email@mail.com",
      password: "any_password",
      passwordRepeat: "some_password"
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

  it("should return an error if invalid email", async () => {
    const invalidUser = await userEntitySut.createUser({
      name: "any name",
      email: "any_emaimail.com",
      password: "any_password",
      passwordRepeat: "any_password"
    });

    expect(invalidUser).toEqual(new BusinessError());
  });

  it("should return an user all params match", async () => {
    const validUser = await userEntitySut.createUser({
      name: "any name",
      email: "any_email@mail.com",
      password: "any_password",
      passwordRepeat: "any_password"
    });

    expect(validUser).toEqual({
      name: "any name",
      email: "any_email@mail.com",
      password: hashed,
      role: USER_ROLES.USER,
      isActive: true,
      createdAt: new Date()
    });
  });
});

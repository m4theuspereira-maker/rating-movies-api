import { BusinessError } from "../errors/business-error";

export interface User {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  role: string;
}

export interface createUserDto {
  name: string;
  email: string;
  password: string;
  passowrdRepeat: string;
}

export const USER_ROLES = {
  ADM: "adm",
  USER: "user",
};

export type UserCreationResult = BusinessError | User;

export class UserEntity {
  createUser(user: createUserDto): UserCreationResult {
    const isValidPassword = this.validatePassword(
      user.password,
      user.passowrdRepeat
    );

    const isEmailValid = this.validateEmail(user.email);

    if (!isValidPassword || !isEmailValid) {
      return new BusinessError();
    }

    const validUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      isActive: true,
      role: USER_ROLES.USER,
    };

    return validUser;
  }

  validatePassword(password: string, passowrdRepeat: string): boolean {
    let isValid = true;

    if (password !== passowrdRepeat) {
      isValid = false;
    }

    return isValid;
  }

  validateEmail(email: string): boolean {
    let isEmailValid = false;
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const validEmail: any = email.match(pattern);

    if (validEmail !== null) {
      isEmailValid = true;
    }

    return isEmailValid;
  }
}

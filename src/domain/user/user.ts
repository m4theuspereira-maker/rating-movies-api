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

export class UserEntity {
  createUser(user: createUserDto): void {}
}

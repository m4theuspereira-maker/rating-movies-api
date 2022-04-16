import { findUsersDto, User } from "../user";

export interface ISaveUserRepository {
  saveUser(user: User): Promise<void>;
}

export interface IFindAllUsersRepository {
  findUsers(): Promise<findUsersDto[]>;
}

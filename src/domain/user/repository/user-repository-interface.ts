import { findUsersDto, User } from "../user";

export interface IUpdateResultDto {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: any;
  upsertedCount: number;
  matchedCount: number;
}

export interface ISaveUserRepository {
  saveUser(user: User): Promise<void>;
}

export interface IFindAllUsersRepository {
  findUsers(): Promise<findUsersDto[]>;
}

export interface IEditUserRepository {
  editUser(userId: string, updatePayload: any): Promise<IUpdateResultDto>;
}

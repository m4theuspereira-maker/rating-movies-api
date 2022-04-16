import {
  IFindAllUsersRepository,
  ISaveUserRepository
} from "@/domain/user/repository/user-repository-interface";
import { findUsersDto, User } from "@/domain/user/user";
import { IModelUser } from "../../models/user-entity-model";
import mongoose from "mongoose";
import { ServerError } from "@/infraestructure/errors/server-error";

export class UserRepository
  implements ISaveUserRepository, IFindAllUsersRepository
{
  constructor(private readonly userModel: mongoose.Model<IModelUser>) {}
  async findUsers(): Promise<findUsersDto[]> {
    try {
      const users = (await this.userModel.find()) as unknown as findUsersDto[];
      return users;
    } catch (error) {
      throw new ServerError();
    }
  }
  async saveUser(user: User): Promise<void> {
    try {
      const userSaved = await this.userModel.create(user);
      await userSaved.save();
    } catch (error) {
      throw new ServerError();
    }
  }
}

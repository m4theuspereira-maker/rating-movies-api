import {
  IFindAllUsersRepository,
  ISaveUserRepository
} from "@/domain/user/repository/user-repository-interface";
import { findUsersDto, User, USER_ROLES } from "@/domain/user/user";
import { ServerError } from "@/infraestructure/errors/server-error";
import {
  dropDatabase,
  seedDatabase,
  startDatabase
} from "../../../../config/test-config/setupDatabaseTests";
import mongoose from "mongoose";
import {
  IModelUser,
  UserModel
} from "@/infraestructure/database/mongodb/models/user-entity-model";

export const VALID_ADM = {
  name: "any name",
  email: "any_email@mail.com",
  password: "any_hashed_password",
  role: USER_ROLES.ADM,
  isActive: true,
  createdAt: new Date()
};

export class UserRepository
  implements ISaveUserRepository, IFindAllUsersRepository
{
  constructor(private readonly userModel: mongoose.Model<IModelUser>) {}
  async findUsers(): Promise<findUsersDto[]> {
    try {
      const users = (await this.userModel.find()) as unknown as findUsersDto[];
      return users;
    } catch (error) {
      console.error(error);
      throw new ServerError();
    }
  }
  async saveUser(user: User): Promise<void> {
    try {
      const userSaved = await this.userModel.create(user);
      await userSaved.save();
    } catch (error) {
      console.error(error);
      throw new ServerError();
    }
  }
}

describe("User repository", () => {
  const userRepository = new UserRepository(UserModel);
  beforeAll(async () => {
    await startDatabase();
    await seedDatabase();
  });
  afterAll(async () => {
    await dropDatabase();
    setTimeout(() => process.exit(), 4000);
  });
  it("should insert an user into database and then verify it", async () => {
    const usersBeforeInsertion = await userRepository.findUsers();
    await userRepository.saveUser(VALID_ADM);
    const usersAfterInsertion = await userRepository.findUsers();

    expect(usersAfterInsertion.length > usersBeforeInsertion.length).toBe(true);
  });
});

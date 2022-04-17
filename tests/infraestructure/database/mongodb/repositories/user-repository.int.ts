import { USER_ROLES } from "@/domain/user/user";
import {
  dropDatabase,
  seedDatabase,
  startDatabase
} from "../../../../config/test-config/setupDatabaseTests";
import { UserRepository } from "@/infraestructure/database/mongodb/repositories/user/user-repository";
import { UserModel } from "@/infraestructure/database/mongodb/models/user-entity-model";
import { userRepositoryFactory } from "@/config/factories/user-repoistory.factory";
import { Types } from "mongoose";
import { ServerError } from "@/infraestructure/errors/server-error";

export const VALID_ADM = {
  name: "any name",
  email: "any_email@mail.com",
  password: "any_hashed_password",
  role: USER_ROLES.ADM,
  isActive: true,
  createdAt: new Date()
};

export const USER_TO_BE_EDITED = {
  _id: new Types.ObjectId("625c501560f7eee6b542a2b1"),
  name: "any name",
  email: "any_email@mail.com",
  password: "any_hashed_password",
  role: USER_ROLES.ADM,
  isActive: true,
  createdAt: new Date()
};

const INVALID_PAYLOAD = "INVALID PAYLOAD";

describe("User repository", () => {
  const userRepository = userRepositoryFactory();
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

  it("should edit user user according query", async () => {
    await userRepository.saveUser(USER_TO_BE_EDITED);
    const updateResult = await userRepository.editUser(
      String(USER_TO_BE_EDITED._id),
      { $set: { name: "name edited" } }
    );

    expect(updateResult.modifiedCount).toEqual(1);
  });

  it("should return ackowledge false", async () => {
    const userUpdated = await userRepository.editUser(
      String(USER_TO_BE_EDITED._id),
      INVALID_PAYLOAD
    );

    expect(userUpdated.acknowledged).toEqual(false);
  });
});

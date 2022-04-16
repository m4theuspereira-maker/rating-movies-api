import { USER_ROLES } from "@/domain/user/user";
import {
  dropDatabase,
  seedDatabase,
  startDatabase
} from "../../../../config/test-config/setupDatabaseTests";
import { UserRepository } from "@/infraestructure/database/mongodb/repositories/user/user-repository";
import { UserModel } from "@/infraestructure/database/mongodb/models/user-entity-model";

export const VALID_ADM = {
  name: "any name",
  email: "any_email@mail.com",
  password: "any_hashed_password",
  role: USER_ROLES.ADM,
  isActive: true,
  createdAt: new Date()
};

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

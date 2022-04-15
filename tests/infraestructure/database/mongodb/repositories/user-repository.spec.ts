import { USER_ROLES } from "@/domain/user/user";

import {
  dropDatabase,
  seedDatabase,
  startDatabase
} from "../../../../config/test-config/setupDatabaseTests";

describe("User repository", () => {
  beforeAll(async () => {
    await startDatabase();
    await seedDatabase();
  });
  afterAll(async () => {
    await dropDatabase();
    setTimeout(() => process.exit(), 4000);
  });
  it("should should insrt", () => {
    expect(1 + 1).toEqual(2);
  });
});

import { ISaveUserRepository } from "@/domain/user/repository/user-repository-interface";
import { User, USER_ROLES } from "@/domain/user/user";
import { ServerError } from "@/infraestructure/errors/server-error";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const VALID_USER = {
  name: "any name",
  email: "any_email@mail.com",
  password: "any_hashed_password",
  role: USER_ROLES.USER,
  isActive: true,
  createdAt: new Date()
};

async function startDatabase() {
  const mongooseDatabse = await MongoMemoryServer.create();

  const uri = mongooseDatabse.getUri();
  const { connection } = await mongoose.connect(uri);
  return connection;
}
async function seedDatabase() {
  const { db } = await startDatabase();
  const userCollection = db.collection("user");
  userCollection.insertMany([VALID_USER]);
}

async function dropDatabase() {
  const { db } = await startDatabase();
  db.dropCollection("user");
}
describe("User repository", () => {
  // beforeAll(async () => {
  //   await seedDatabase();
  // });
  // afterAll(async () => {
  //   await dropDatabase();
  // });
  it("should should insrt", () => {
    expect(1 + 1).toEqual(2);
  });
});

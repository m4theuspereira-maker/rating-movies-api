import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { VALID_USERS } from "../mock/user-mock";

let databaseConnection: any;

export async function startDatabase() {
  try {
    const mongooseDatabse = await MongoMemoryServer.create();
    const uri = mongooseDatabse.getUri();
    console.log(uri);
    const { connection } = await mongoose.connect(uri);
    databaseConnection = connection;
  } catch (error) {
    console.log(String(error));
  }
}

export async function seedDatabase() {
  const userCollection = databaseConnection.collection("user");
  await userCollection.insertMany(VALID_USERS);
}

export async function dropDatabase() {
  await databaseConnection.dropCollection("user");
}

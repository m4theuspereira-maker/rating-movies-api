import { ISaveUserRepository } from "@/domain/user/repository/user-repository-interface";
import { User, USER_ROLES } from "@/domain/user/user";
import { ServerError } from "@/infraestructure/errors/server-error";
import { connect, connection, disconnect } from "mongoose";

const VALID_USER = {
  name: "any name",
  email: "any_email@mail.com",
  password: "any_hashed_password",
  role: USER_ROLES.USER,
  isActive: true,
  createdAt: new Date()
};

describe("User repository", () => {
 
  it("should should insrt", async () => {
    expect(1 + 1).toEqual(2);
  });
});

// export class UserRepository implements ISaveUserRepository {
//   async saveUser(user: User): Promise<void> {
//     try {
//       const userCollection = getUserCollection();
//       userCollection.insertOne(user);
//     } catch (error) {
//       throw new ServerError();
//     }
//   }
// }

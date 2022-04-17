import { UserModel } from "@/infraestructure/database/mongodb/models/user-entity-model";
import { UserRepository } from "@/infraestructure/database/mongodb/repositories/user/user-repository";

export function userRepositoryFactory(): UserRepository {
  return new UserRepository(UserModel);
}

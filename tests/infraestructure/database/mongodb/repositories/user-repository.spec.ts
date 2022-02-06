import { ISaveUserRepository } from "@/domain/user/repository/user-repository-interface";
import { User } from "@/domain/user/user";

describe("User repository", () => {
    it('should test', () =>{
        expect(1 + 1).toEqual(2)
    })
});

export class UserRepository implements ISaveUserRepository {
  async saveUser(user: User): Promise<boolean> {
    return false;
  }
}

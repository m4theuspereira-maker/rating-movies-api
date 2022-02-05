import { User } from "../user";

export interface ISaveUserRepository {
    saveUser (user: User): Promise<boolean>
}

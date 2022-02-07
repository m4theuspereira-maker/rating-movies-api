import { User } from "../user";

export interface ISaveUserRepository {
    saveUser (user: User): Promise<void>
}

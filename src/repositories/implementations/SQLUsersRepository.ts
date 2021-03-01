import { User } from "../../entities/User";
import { IUserRepository } from "../IUsersRepository";

export class SqlUsersRepository implements IUserRepository {
    private users: User[] = [];

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email == email);
        console.log(user);
        return user;
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }

}
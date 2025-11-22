import type { User } from "../../domain/models/User";
import type { UserRepository } from "../../domain/repositories/UserRepository";

export class UserLoginCase {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(username: string, password: string): Promise<User> {
        return await this.userRepository.login(username, password);
    }
}
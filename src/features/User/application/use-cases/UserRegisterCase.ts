import type { User } from "../../domain/models/User";
import type { UserRepository } from "../../domain/repositories/UserRepository";

export class UserRegisterCase {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(user: User): Promise<User> {
        return await this.userRepository.register(user);
    }
}
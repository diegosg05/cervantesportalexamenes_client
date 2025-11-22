import type { UserRepository } from "../../domain/repositories/UserRepository";

export class UserLogoutCase {

    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute() {
        await this.userRepository.logout();
    }

}
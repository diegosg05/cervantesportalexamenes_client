import type { UserRepository } from "../../domain/repositories/UserRepository";

export class ResetPasswordCase {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(oldPassword: string, newPassword: string) {
        await this.userRepository.resetPassword(oldPassword, newPassword);
    }
}
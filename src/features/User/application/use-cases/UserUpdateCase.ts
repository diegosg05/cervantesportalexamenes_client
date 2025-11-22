import type { User } from "../../domain/models/User";
import type { UserRepository } from "../../domain/repositories/UserRepository";

type UpdateUser = {
    firstname: string
    lastname: string
    phone: string
    imageFile?: File
    image: string
}

export class UpdateUserCase {
    private readonly useRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.useRepository = userRepository;
    }

    async execute(userData: UpdateUser): Promise<User> {
        const { firstname, image, lastname, phone, imageFile } = userData;

        let imageUrl = image;

        if (imageFile) {
            imageUrl = await this.useRepository.uploadImage(imageFile);
        }

        return await this.useRepository.update(
            firstname, lastname, imageUrl, phone
        );

    }
}
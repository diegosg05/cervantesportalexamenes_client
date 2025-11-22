import type { Category } from "../../domain/models/Category";
import type { CategoryRepository } from "../../domain/repositories/CategoryRepository";

export class GetAllCategoriesCase {
    private readonly categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async execute(): Promise<Category[]> {
        return await this.categoryRepository.getAll();
    }
}
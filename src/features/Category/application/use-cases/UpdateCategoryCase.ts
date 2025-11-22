import type { Category } from "../../domain/models/Category";
import type { CategoryRepository } from "../../domain/repositories/CategoryRepository";

export class UpdateCategoryCase {
    private readonly categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async execute(category: Category): Promise<void> {
        await this.categoryRepository.update(category);
    }
}
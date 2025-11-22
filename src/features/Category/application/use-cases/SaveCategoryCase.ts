import type { Category } from "../../domain/models/Category";
import type { CategoryRepository } from "../../domain/repositories/CategoryRepository";

export class SaveCategoryCase {
    private readonly categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async execute(category: Category): Promise<Category> {
        return this.categoryRepository.save(category);
    }
}
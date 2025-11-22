import type { Category } from "../../domain/models/Category";
import type { CategoryRepository } from "../../domain/repositories/CategoryRepository";

export class GetCategoryCase {
    private readonly categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async execute(id: number): Promise<Category> {
        return await this.categoryRepository.get(id);
    }
}
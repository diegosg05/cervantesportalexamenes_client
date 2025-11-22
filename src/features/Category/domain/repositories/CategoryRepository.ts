import type { Category } from "../models/Category";

export interface CategoryRepository {
    save(category: Category): Promise<Category>
    update(category: Category): Promise<void>
    getAll(): Promise<Category[]>
    get(id: number): Promise<Category>
}
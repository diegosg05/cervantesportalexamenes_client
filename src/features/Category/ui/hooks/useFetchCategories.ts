import { useEffect, useState } from "react";
import { GetAllCategoriesCase } from "../../application/use-cases/GetAllCategoriesCase"
import { CategoryApiRepository } from "../../services/repositories/CategoryApiRepository";
import type { Category } from "../../domain/models/Category";

const getAllCategoriesCase = new GetAllCategoriesCase(new CategoryApiRepository());

export const useFetchCategories = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Category[] | null>(null);

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const categories = await getAllCategoriesCase.execute();
            setData(categories);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { fetchCategories, data, isLoading };
}
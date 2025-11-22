import { useState } from "react"
import { CategoryApiRepository } from "../../services/repositories/CategoryApiRepository";
import { UpdateCategoryCase } from "../../application/use-cases/UpdateCategoryCase";
import type { CategoryApi } from "../../services/dtos/CategoryApi";

const updateCategoryCase = new UpdateCategoryCase(new CategoryApiRepository());

export const useUpdateCategory = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateCategory = async (data: CategoryApi) => {
        setIsLoading(true);
        try {
            await updateCategoryCase.execute(data);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return { updateCategory, isLoading };

}
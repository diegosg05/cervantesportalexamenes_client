import { useState } from "react"
import { SaveCategoryCase } from "../../application/use-cases/SaveCategoryCase";
import { CategoryApiRepository } from "../../services/repositories/CategoryApiRepository";
import type { CategorySaveApi } from "../../services/dtos/CategorySaveApi";

const saveCategoryCase = new SaveCategoryCase(new CategoryApiRepository());

export const useSaveCategory = () => {
    const [isLoading, setIsLoading] = useState(false);

    const saveCategory = async (data: CategorySaveApi) => {
        setIsLoading(true);
        try {
            await saveCategoryCase.execute(data);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return { saveCategory, isLoading };

}
import { useState } from "react"
import { DeleteQuestionCase } from "../../application/use-cases";
import { QuestionApiRepository } from "../../services/repositories/QuestionApiRepository";
import { QuestionMapperImpl } from "../../services/mappers/implementation/QuestionMapperImpl";

const questionMapper = new QuestionMapperImpl();
const deleteQuestionCase = new DeleteQuestionCase(new QuestionApiRepository(questionMapper));

export const useDeleteQuestion = () => {
    const [isLoading, setIsLoading] = useState(false);

    const deleteQuestion = async (id: number) => {
        try {
            await deleteQuestionCase.execute(id);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return { deleteQuestion, isLoading }
}
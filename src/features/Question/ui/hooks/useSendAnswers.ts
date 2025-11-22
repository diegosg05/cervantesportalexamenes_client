import { useState } from "react"
import { SendAnswersCase } from "../../application/use-cases/SendAswersCase";
import { QuestionApiRepository } from "../../services/repositories/QuestionApiRepository";
import type { QuestionMapper } from "../../services/mappers/QuestionMapper";
import { QuestionMapperImpl } from "../../services/mappers/implementation/QuestionMapperImpl";

const questionMapper: QuestionMapper = new QuestionMapperImpl();
const sendAnswersCase = new SendAnswersCase(new QuestionApiRepository(questionMapper));

export const useSendAnswers = () => {
    const [isLoading, setIsLoading] = useState(false);

    const sendAnswers = async (data: { answers: { id: number, givenCorrect: string }[] }) => {
        setIsLoading(true);

        try {
            return await sendAnswersCase.execute(data.answers);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }

    }

    return { sendAnswers, isLoading }
}
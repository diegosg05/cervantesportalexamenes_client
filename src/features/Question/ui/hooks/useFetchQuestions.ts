import { useEffect, useState } from "react"
import type { Question } from "../../domain/models/Question";
import { GetQuestionsByExamCase } from "../../application/use-cases";
import { QuestionApiRepository } from "../../services/repositories/QuestionApiRepository";
import { QuestionMapperImpl } from "../../services/mappers/implementation/QuestionMapperImpl";

const questionMapper = new QuestionMapperImpl();
const getQuestionsByExamCase = new GetQuestionsByExamCase(new QuestionApiRepository(questionMapper));

export const useFetchQuestions = (id: number) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Question[] | null>(null);

    const fetchQuestions = async (id: number) => {
        setIsLoading(true);
        try {
            const questions = await getQuestionsByExamCase.execute(id);
            setData(questions);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchQuestions(id);
    }, [id]);

    return { fetchQuestions, data, isLoading };
}
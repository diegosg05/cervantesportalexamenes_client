import { useState } from "react";
import { GetExamCase } from "../../../Exam/application/use-cases";
import { ExamApiRepository } from "../../../Exam/services/repositories/ExamApiRepository";
import { UpdateQuestionCase } from "../../application/use-cases";
import type { UpdateQuestionAPi } from "../../services/dtos";
import { QuestionApiRepository } from "../../services/repositories/QuestionApiRepository";
import type { Question } from "../../domain/models/Question";
import { QuestionMapperImpl } from "../../services/mappers/implementation/QuestionMapperImpl";
import { ExamMapperImpl } from "../../../Exam/services/mappers/implementation/ExamMapperImpl";

const questionMapper = new QuestionMapperImpl();
const examMapper = new ExamMapperImpl();
const getExamCase = new GetExamCase(new ExamApiRepository(examMapper));
const updateQuestionCase = new UpdateQuestionCase(new QuestionApiRepository(questionMapper));

export const useUpdateQuestion = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateQuestion = async (questionApi: UpdateQuestionAPi) => {
        setIsLoading(true);
        try {
            const { id, content, correctAnswer, idExam, optionOne, optionTwo, image, optionFour, optionThree } = questionApi;

            const exam = await getExamCase.execute(idExam);

            const question: Question = {
                id: id,
                content: content,
                correctAnswer: correctAnswer,
                optionOne: optionOne,
                optionTwo: optionTwo,
                optionThree: optionThree,
                optionFour: optionFour,
                image: image,
                exam: exam
            }

            await updateQuestionCase.execute(question);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return { updateQuestion, isLoading };
}
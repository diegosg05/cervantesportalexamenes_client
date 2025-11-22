import { useState } from "react"
import { GetExamCase } from "../../../Exam/application/use-cases/GetExamCase";
import { ExamApiRepository } from "../../../Exam/services/repositories/ExamApiRepository";
import { CreateQuestionCase } from "../../application/use-cases/CreateQuestionCase";
import { QuestionApiRepository } from "../../services/repositories/QuestionApiRepository";
import type { CreateQuestionApi } from "../../services/dtos/CreateQuestionApi";
import type { Question } from "../../domain/models/Question";
import { QuestionMapperImpl } from "../../services/mappers/implementation/QuestionMapperImpl";
import { ExamMapperImpl } from "../../../Exam/services/mappers/implementation/ExamMapperImpl";

const questionMapper = new QuestionMapperImpl();
const examMapper = new ExamMapperImpl();
const getExamCase = new GetExamCase(new ExamApiRepository(examMapper));
const creationQuestionCase = new CreateQuestionCase(new QuestionApiRepository(questionMapper));

export const useSaveQuestion = () => {
    const [isLoading, setIsLoading] = useState(false);

    const saveQuestion = async (questionApi: CreateQuestionApi) => {
        setIsLoading(true);
        try {
            const { content, correctAnswer, idExam, optionOne, optionTwo, image, optionFour, optionThree } = questionApi;
            const exam = await getExamCase.execute(idExam);

            const newQuestion: Question = {
                content: content,
                correctAnswer: correctAnswer,
                optionOne: optionOne,
                optionTwo: optionTwo,
                optionThree: optionThree,
                optionFour: optionFour,
                image: image,
                exam: exam
            }

            await creationQuestionCase.execute(newQuestion);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return { saveQuestion, isLoading };
}
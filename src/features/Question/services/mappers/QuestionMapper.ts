import type { Question } from "../../domain/models/Question";
import type { CreateQuestionApi, QuestionApi, UpdateQuestionAPi } from "../dtos";

export interface QuestionMapper {
    fromQuestionApiToQuestion(questionApi: QuestionApi): Question;
    fromQuestionToCreateQuestionApi(question: Question): CreateQuestionApi
    fromQuestionToUpdateQuestionApi(question: Question): UpdateQuestionAPi
}
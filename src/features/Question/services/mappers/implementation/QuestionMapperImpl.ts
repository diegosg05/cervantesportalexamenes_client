import type { Category } from "../../../../Category/domain/models/Category";
import type { Exam } from "../../../../Exam/domain/models/Exam";
import type { Question } from "../../../domain/models/Question";
import type { CreateQuestionApi, QuestionApi, UpdateQuestionAPi } from "../../dtos";
import type { QuestionMapper } from "../QuestionMapper";

export class QuestionMapperImpl implements QuestionMapper {

    fromQuestionToCreateQuestionApi(question: Question): CreateQuestionApi {
        const { content, correctAnswer, optionOne, optionTwo, image, optionFour, optionThree, exam } = question;

        const { id } = exam;

        const questionApi: CreateQuestionApi = {
            content: content,
            correctAnswer: correctAnswer,
            optionOne: optionOne,
            optionTwo: optionTwo,
            optionThree: optionThree,
            optionFour: optionFour,
            image: image,
            idExam: id!
        }

        return questionApi;
    }

    fromQuestionToUpdateQuestionApi(question: Question): UpdateQuestionAPi {
        const { id, content, correctAnswer, optionOne, optionTwo, image, optionFour, optionThree, exam } = question;

        const { id: idExam } = exam;

        const questionApi: UpdateQuestionAPi = {
            id: id!,
            content: content,
            correctAnswer: correctAnswer,
            optionOne: optionOne,
            optionTwo: optionTwo,
            optionThree: optionThree,
            optionFour: optionFour,
            image: image,
            idExam: idExam!
        }

        return questionApi;
    }

    fromQuestionApiToQuestion(questionApi: QuestionApi): Question {
        const { id, image, optionOne, optionTwo, optionThree, optionFour, content, correctAnswer, exam: examApi } = questionApi;

        const { id: idExam, title: titleExam, description: decExam, maxPoints, quantityQuestions, enabled, category: catApi } = examApi;

        const { id: idCat, title: titleCat, description: decCat } = catApi;

        const category: Category = {
            id: idCat,
            title: titleCat,
            description: decCat,
        }

        const exam: Exam = {
            id: idExam,
            title: titleExam,
            description: decExam,
            maxPoints: maxPoints,
            quantityQuestions: quantityQuestions,
            enabled: enabled,
            category: category,
        }


        const question: Question = {
            id: id,
            image: image,
            content: content,
            correctAnswer: correctAnswer,
            optionOne: optionOne,
            optionTwo: optionTwo,
            optionThree: optionThree,
            optionFour: optionFour,
            exam: exam
        }

        return question;
    }

}
import type { Category } from "../../../../Category/domain/models/Category";
import type { Exam } from "../../../domain/models/Exam";
import type { CreateExamApi, ExamApi, UpdateExamApi } from "../../dtos";
import type { ExamMapper } from "../ExamMapper";

export class ExamMapperImpl implements ExamMapper {

    fromExamToCreateExamApi(exam: Exam): CreateExamApi {
        const { title, description, maxPoints, quantityQuestions, enabled, category } = exam;

        const { id: idCat } = category;

        const examApiSave: CreateExamApi = {
            title: title,
            description: description,
            enabled: enabled,
            idCategory: idCat!,
            maxPoints: maxPoints,
            quantityQuestions: quantityQuestions
        }

        return examApiSave;
    }

    fromExamToUpdateExamApi(exam: Exam): UpdateExamApi {
        const { id, title, description, maxPoints, quantityQuestions, enabled, category } = exam;

        const { id: idCat } = category;

        const examApiSave: UpdateExamApi = {
            id: id!,
            title: title,
            description: description,
            enabled: enabled,
            idCategory: idCat!,
            maxPoints: maxPoints,
            quantityQuestions: quantityQuestions
        }

        return examApiSave;
    }

    fromExamApiToExam(examApi: ExamApi): Exam {
        const { category, description, enabled, id, maxPoints, quantityQuestions, title } = examApi;

        const { id: idCat, title: titleCat, description: descriptionCat } = category;

        const categoryResp: Category = {
            id: idCat,
            title: titleCat,
            description: descriptionCat
        }

        const exam: Exam = {
            id: id,
            title: title,
            description: description,
            maxPoints: maxPoints,
            quantityQuestions: quantityQuestions,
            enabled: enabled,
            category: categoryResp
        }

        return exam;
    }

}
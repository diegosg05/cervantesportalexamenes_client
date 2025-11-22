import type { Exam } from "../../domain/models/Exam";
import type { CreateExamApi, ExamApi, UpdateExamApi } from "../dtos";

export interface ExamMapper {
    fromExamApiToExam(examApi: ExamApi): Exam
    fromExamToCreateExamApi(exam: Exam): CreateExamApi
    fromExamToUpdateExamApi(exam: Exam): UpdateExamApi
}
import { useState } from "react"
import { GetCategoryCase } from "../../../Category/application/use-cases";
import { CategoryApiRepository } from "../../../Category/services/repositories/CategoryApiRepository";
import { UpdateExamCase } from "../../application/use-cases/UpdateExamCase";
import { ExamApiRepository } from "../../services/repositories/ExamApiRepository";
import type { UpdateExamApi } from "../../services/dtos";
import type { Exam } from "../../domain/models/Exam";
import type { ExamMapper } from "../../services/mappers/ExamMapper";
import { ExamMapperImpl } from "../../services/mappers/implementation/ExamMapperImpl";

const examMapper: ExamMapper = new ExamMapperImpl();
const getCategoryCase = new GetCategoryCase(new CategoryApiRepository());
const updateExamCase = new UpdateExamCase(new ExamApiRepository(examMapper));

export const useUpdateExam = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateExam = async (examApi: UpdateExamApi) => {
        const { id, title, description, enabled, idCategory, maxPoints, quantityQuestions } = examApi;
        setIsLoading(true);

        try {
            const category = await getCategoryCase.execute(idCategory);

            const exam: Exam = {
                id: id,
                title: title,
                description: description,
                maxPoints: maxPoints,
                quantityQuestions: quantityQuestions,
                enabled: enabled,
                category: category
            }

            await updateExamCase.execute(exam);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return { updateExam, isLoading };
}
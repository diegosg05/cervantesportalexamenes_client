import { useState } from "react";
import { CategoryApiRepository } from "../../../Category/services/repositories/CategoryApiRepository";
import { SaveExamCase } from "../../application/use-cases/SaveExamCase";
import { ExamApiRepository } from "../../services/repositories/ExamApiRepository";
import type { CreateExamApi } from "../../services/dtos/CreateExamApi";
import type { ExamMapper } from "../../services/mappers/ExamMapper";
import { ExamMapperImpl } from "../../services/mappers/implementation/ExamMapperImpl";
import { GetCategoryCase } from "../../../Category/application/use-cases";
import type { Exam } from "../../domain/models/Exam";

const examMapper: ExamMapper = new ExamMapperImpl();
const getCategoryCase = new GetCategoryCase(new CategoryApiRepository());
const saveExamCase = new SaveExamCase(new ExamApiRepository(examMapper));

export const useSaveExam = () => {
    const [isLoading, setIsLoading] = useState(false);

    const saveExam = async (data: CreateExamApi) => {
        const { title, description, enabled, idCategory, maxPoints, quantityQuestions } = data;
        setIsLoading(true);

        try {
            const category = await getCategoryCase.execute(idCategory);

            const createExam: Exam = {
                title: title,
                description: description,
                maxPoints: maxPoints,
                quantityQuestions: quantityQuestions,
                enabled: enabled,
                category: category
            }

            await saveExamCase.execute(createExam);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }

    }

    return { saveExam, isLoading };
}
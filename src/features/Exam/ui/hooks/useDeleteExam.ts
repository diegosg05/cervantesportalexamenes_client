import { useState } from "react"
import { DeleteExamCase } from "../../application/use-cases/DeleteExamCase";
import { ExamApiRepository } from "../../services/repositories/ExamApiRepository";
import { ExamMapperImpl } from "../../services/mappers/implementation/ExamMapperImpl";
import type { ExamMapper } from "../../services/mappers/ExamMapper";

const examMapper: ExamMapper = new ExamMapperImpl()
const deleteExamCase = new DeleteExamCase(new ExamApiRepository(examMapper));

export const useDeleteExam = () => {
    const [isLoading, setIsLoading] = useState(false);

    const deleteExam = async (id: number) => {
        setIsLoading(true);

        try {
            await deleteExamCase.execute(id);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return { deleteExam, isLoading }
}
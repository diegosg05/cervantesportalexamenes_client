import { GetExamCase } from "../../application/use-cases";
import { ExamApiRepository } from "../../services/repositories/ExamApiRepository";
import type { ExamMapper } from "../../services/mappers/ExamMapper";
import { ExamMapperImpl } from "../../services/mappers/implementation/ExamMapperImpl";
import { useEffect, useState } from "react";
import type { Exam } from "../../domain/models/Exam";

const examMapper: ExamMapper = new ExamMapperImpl();
const getExamCase = new GetExamCase(new ExamApiRepository(examMapper));

export const useFetchExam = (idExam: number) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Exam | null>(null);

    const fetchExam = async (id: number) => {
        setIsLoading(true);
        try {
            const exam = await getExamCase.execute(id);
            setData(exam);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchExam(idExam);
    }, [idExam]);

    return { fetchExam, isLoading, data }
}
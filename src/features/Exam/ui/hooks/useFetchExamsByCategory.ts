import { useEffect, useState } from "react"
import type { Exam } from "../../domain/models/Exam";
import { ExamApiRepository } from "../../services/repositories/ExamApiRepository";
import type { ExamMapper } from "../../services/mappers/ExamMapper";
import { ExamMapperImpl } from "../../services/mappers/implementation/ExamMapperImpl";
import { GetExamsByCategoryCase } from "../../application/use-cases";

const examMapper: ExamMapper = new ExamMapperImpl();
const getExamsByCategoryCase = new GetExamsByCategoryCase(new ExamApiRepository(examMapper));

export const useFetchExamsByCategory = (idCategory: number) => {

    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState<Exam[] | null>(null);

    const fetchExamsByCategory = async (id: number) => {
        setIsLoading(true);

        try {
            const exams = await getExamsByCategoryCase.execute(id);
            setData(exams);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        fetchExamsByCategory(idCategory);
    }, [idCategory]);

    return { data, isLoading };
}
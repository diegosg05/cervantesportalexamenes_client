import { useEffect, useState } from "react"
import type { Exam } from "../../domain/models/Exam";
import { ExamApiRepository } from "../../services/repositories/ExamApiRepository";
import type { ExamMapper } from "../../services/mappers/ExamMapper";
import { ExamMapperImpl } from "../../services/mappers/implementation/ExamMapperImpl";
import { GetAllExamsCase } from "../../application/use-cases";

const examMapper: ExamMapper = new ExamMapperImpl();
const getAllExamsCase = new GetAllExamsCase(new ExamApiRepository(examMapper));

export const useFetchExams = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState<Exam[] | null>(null);

    const fetchExams = async () => {
        setIsLoading(true);

        try {
            const exams = await getAllExamsCase.execute();
            setData(exams);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        fetchExams();
    }, []);

    return { fetchExams, data, isLoading };
}
import { GetEnabledExamsCase } from './../../application/use-cases';
import { useEffect, useState } from "react"
import type { Exam } from "../../domain/models/Exam";
import { ExamApiRepository } from "../../services/repositories/ExamApiRepository";
import type { ExamMapper } from "../../services/mappers/ExamMapper";
import { ExamMapperImpl } from "../../services/mappers/implementation/ExamMapperImpl";

const examMapper: ExamMapper = new ExamMapperImpl();
const getEnabledExamsCase = new GetEnabledExamsCase(new ExamApiRepository(examMapper));

export const useFetchEnabledExams = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState<Exam[] | null>(null);

    const fetchEnabledExams = async () => {
        setIsLoading(true);

        try {
            const exams = await getEnabledExamsCase.execute();
            setData(exams);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        fetchEnabledExams();
    }, []);

    return { fetchEnabledExams, data, isLoading };
}
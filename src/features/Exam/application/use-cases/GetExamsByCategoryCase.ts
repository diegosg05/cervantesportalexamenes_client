import type { Exam } from "../../domain/models/Exam";
import type { ExamRepository } from "../../domain/repositories/ExamRepository";

export class GetExamsByCategoryCase {
    private readonly examRepository: ExamRepository;

    constructor(examRepository: ExamRepository) {
        this.examRepository = examRepository;
    }

    async execute(idCategory: number): Promise<Exam[]> {
        return await this.examRepository.getByCategory(idCategory);
    }
}
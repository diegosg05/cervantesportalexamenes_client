import type { Exam } from "../../domain/models/Exam";
import type { ExamRepository } from "../../domain/repositories/ExamRepository";

export class GetExamCase {
    private readonly examRepository: ExamRepository;

    constructor(examRepository: ExamRepository) {
        this.examRepository = examRepository;
    }

    async execute(id: number): Promise<Exam> {
        return await this.examRepository.get(id);
    }
}
import type { Exam } from "../../domain/models/Exam";
import type { ExamRepository } from "../../domain/repositories/ExamRepository";

export class UpdateExamCase {
    private readonly examRepository: ExamRepository;

    constructor(examRepository: ExamRepository) {
        this.examRepository = examRepository;
    }

    async execute(exam: Exam): Promise<void> {
        await this.examRepository.update(exam);
    }
}
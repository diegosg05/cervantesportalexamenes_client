import type { Exam } from "../../domain/models/Exam";
import type { ExamRepository } from "../../domain/repositories/ExamRepository";

export class SaveExamCase {
    private readonly examRepository: ExamRepository;

    constructor(examRepository: ExamRepository) {
        this.examRepository = examRepository;
    }

    async execute(exam: Exam): Promise<Exam> {
        return await this.examRepository.save(exam);
    }
}
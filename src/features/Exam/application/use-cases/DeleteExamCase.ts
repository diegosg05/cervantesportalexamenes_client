import type { ExamRepository } from "../../domain/repositories/ExamRepository";

export class DeleteExamCase {
    private readonly examRepository: ExamRepository;

    constructor(examRepository: ExamRepository) {
        this.examRepository = examRepository;
    }

    async execute(id: number): Promise<void> {
        await this.examRepository.delete(id);
    }

}
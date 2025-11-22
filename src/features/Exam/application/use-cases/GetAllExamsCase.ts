import type { Exam } from "../../domain/models/Exam";
import type { ExamRepository } from "../../domain/repositories/ExamRepository";

export class GetAllExamsCase {
    private readonly examRepository: ExamRepository;

    constructor(examRepository: ExamRepository) {
        this.examRepository = examRepository;
    }

    async execute(): Promise<Exam[]> {
        return this.examRepository.getAll();
    }
}
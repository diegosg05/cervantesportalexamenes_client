import type { Question } from "../../domain/models/Question";
import type { QuestionRepository } from "../../domain/repositories/QuestionRepository";

export class GetQuestionsByExamCase {
    private readonly questionRepository: QuestionRepository;

    constructor(questionRepository: QuestionRepository) {
        this.questionRepository = questionRepository;
    }

    async execute(idExam: number): Promise<Question[]> {
        return await this.questionRepository.GetQuestionsByExam(idExam);
    }
}
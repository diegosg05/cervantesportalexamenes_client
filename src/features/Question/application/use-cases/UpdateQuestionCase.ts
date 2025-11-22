import type { Question } from "../../domain/models/Question";
import type { QuestionRepository } from "../../domain/repositories/QuestionRepository";

export class UpdateQuestionCase {
    private readonly questionRepository: QuestionRepository;

    constructor(questionRepository: QuestionRepository) {
        this.questionRepository = questionRepository;
    }

    async execute(question: Question): Promise<void> {
        await this.questionRepository.updateQuestion(question);
    }
}
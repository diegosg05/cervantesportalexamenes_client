import type { QuestionRepository } from "../../domain/repositories/QuestionRepository";

export class DeleteQuestionCase {
    private readonly questionRepository: QuestionRepository;

    constructor(questionRepository: QuestionRepository) {
        this.questionRepository = questionRepository;
    }

    async execute(id: number): Promise<void> {
        await this.questionRepository.deleteQuestion(id);
    }
}
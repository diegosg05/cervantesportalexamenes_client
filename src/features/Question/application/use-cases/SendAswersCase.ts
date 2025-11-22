import type { QuestionRepository } from "../../domain/repositories/QuestionRepository";

export class SendAnswersCase {
    private readonly questionRepository: QuestionRepository;

    constructor(questionRepository: QuestionRepository) {
        this.questionRepository = questionRepository;
    }

    async execute(answers: { id: number; givenCorrect: string; }[]): Promise<{ maxPoints: number; correctAnswers: number; attempts: number; }> {
        return await this.questionRepository.sendAnswers(answers);
    }
}
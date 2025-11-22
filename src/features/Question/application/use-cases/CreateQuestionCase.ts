import type { Question } from "../../domain/models/Question";
import type { QuestionRepository } from "../../domain/repositories/QuestionRepository";

export class CreateQuestionCase {
    private readonly questionRepository: QuestionRepository;

    constructor(questionRepository: QuestionRepository) {
        this.questionRepository = questionRepository;
    }

    async execute(question: Question): Promise<Question> {
        return await this.questionRepository.saveQuestion(question);
    }
}
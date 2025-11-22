import type { Question } from "../models/Question";

export interface QuestionRepository {
    GetQuestionsByExam(idExam: number): Promise<Question[]>
    saveQuestion(question: Question): Promise<Question>
    updateQuestion(question: Question): Promise<void>
    deleteQuestion(id: number): Promise<void>
    sendAnswers(answers: { id: number, givenCorrect: string }[]): Promise<{ maxPoints: number, correctAnswers: number, attempts: number }>
}
import type { ExamApi } from "../../../Exam/services/dtos/ExamApi"

export type QuestionApi = {
    id: number
    content: string
    image?: string
    optionOne: string
    optionTwo: string
    optionThree?: string
    optionFour?: string
    correctAnswer: string
    exam: ExamApi
}
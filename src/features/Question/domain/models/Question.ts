import type { Exam } from "../../../Exam/domain/models/Exam"

export type Question = {
    id?: number
    content: string
    image?: string
    optionOne: string
    optionTwo: string
    optionThree?: string
    optionFour?: string
    correctAnswer: string
    exam: Exam
}
export type CreateQuestionApi = {
    content: string
    image?: string
    optionOne: string
    optionTwo: string
    optionThree?: string
    optionFour?: string
    correctAnswer: string
    idExam: number
}
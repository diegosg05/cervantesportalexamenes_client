import type { Exam } from "../../../Exam/domain/models/Exam"

export type Category = {
    id?: number
    title: string
    description: string
    exams?: Exam[]
}
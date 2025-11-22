import type { Category } from "../../../Category/domain/models/Category";
import type { Question } from "../../../Question/domain/models/Question";

export type Exam = {
    id?: number
    title: string
    description: string
    maxPoints: number
    quantityQuestions: number
    enabled: boolean
    category: Category
    questions?: Question[]
}
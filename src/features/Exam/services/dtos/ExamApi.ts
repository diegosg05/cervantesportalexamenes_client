import type { CategoryApi } from "../../../Category/services/dtos/CategoryApi"

export type ExamApi = {
    id: number
    title: string
    description: string
    maxPoints: number
    quantityQuestions: number
    enabled: boolean
    category: CategoryApi
}
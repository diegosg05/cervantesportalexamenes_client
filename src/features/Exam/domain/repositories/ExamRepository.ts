import type { Exam } from "../models/Exam";

export interface ExamRepository {
    getAll(): Promise<Exam[]>
    save(exam: Exam): Promise<Exam>
    get(id: number): Promise<Exam>
    update(exam: Exam): Promise<void>
    delete(id: number): Promise<void>
    getByCategory(idCategory: number): Promise<Exam[]>
    getEnabled(): Promise<Exam[]>
}
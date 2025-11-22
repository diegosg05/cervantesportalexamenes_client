import { AxiosError } from "axios";
import { Api } from "../../../../infrastructure/api/Api";
import type { ApiResponse } from "../../../../infrastructure/response/ApiResponse";
import type { Exam } from "../../domain/models/Exam";
import type { ExamRepository } from "../../domain/repositories/ExamRepository";
import type { ExamApi } from "../dtos/ExamApi";
import type { ExamMapper } from "../mappers/ExamMapper";

export class ExamApiRepository implements ExamRepository {

    private readonly examMapper: ExamMapper;

    constructor(examMapper: ExamMapper) {
        this.examMapper = examMapper;
    }

    async getEnabled(): Promise<Exam[]> {
        try {
            const response = await Api.get<ApiResponse<ExamApi[]>>("/exams/enabled");
            const apiResponse = response.data;

            if (response.status === 200 && apiResponse.data) {
                return apiResponse.data.map(examApi => this.examMapper.fromExamApiToExam(examApi));
            }

            throw new Error("No se envío la petición correctamente");
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const status = error.response.status;

                if (status >= 500) {
                    throw new Error("Ocurrió un error interno en el servidor. Intente más tarde");
                }

                throw new Error("Ocurrió un error desconocido");
            }

            throw new Error("No se pudo enviar la petición");
        }
    }

    async getByCategory(idCategory: number): Promise<Exam[]> {
        try {
            const response = await Api.get<ApiResponse<ExamApi[]>>(`/exams/enabled/categories/${idCategory}`);
            const apiResponse = response.data;

            if (response.status === 200 && apiResponse.data) {
                return apiResponse.data.map(examApi => this.examMapper.fromExamApiToExam(examApi));
            }

            throw new Error("No se envió correctamente la petición");

        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const status = error.response.status;

                if (status === 404) {
                    throw new Error("No se encontró la categoría");
                }

                if (status >= 500) {
                    throw new Error("Ocurrió un error interno en el servidor. Intente más tarde");
                }

                throw new Error("Ocurrió un error desconocido");
            }

            throw new Error("No se pudo enviar la petición");
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const response = await Api.delete(`/exams/${id}`);

            if (response.status === 204) {
                return;
            }

            throw new Error("No se envió correctamente la petición");

        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const status = error.response.status;

                if (status === 404) {
                    throw new Error("No se encontró el examen");
                }

                if (status >= 500) {
                    throw new Error("Ocurrió un error interno en el servidor. Intente más tarde");
                }

                throw new Error("Ocurrió un error desconocido");
            }

            throw new Error("No se pudo enviar la petición");
        }
    }

    async update(exam: Exam): Promise<void> {
        const examApiSave = this.examMapper.fromExamToUpdateExamApi(exam);

        try {
            const response = await Api.put("/exams", examApiSave);

            if (response.status === 204) {
                return;
            }

            throw new Error("No se envió correctamente la petición");

        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const status = error.response.status;

                if (status >= 500) {
                    throw new Error("Ocurrió un error interno en el servidor");
                }

                throw new Error("Ocurrió un error desconocido");
            }

            throw new Error("No se pudo enviar la petición");
        }
    }

    async get(id: number): Promise<Exam> {
        try {
            const response = await Api.get<ApiResponse<ExamApi>>(`/exams/${id}`, { withCredentials: true });
            const apiResponse = response.data;

            if (response.status === 200 && apiResponse.data) {
                return this.examMapper.fromExamApiToExam(apiResponse.data);
            }

            throw new Error("No se envío correctamente la peticición");
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const status = error.response.status;

                if (status === 404) {
                    throw new Error("No se encontró el examen");
                }

                if (status >= 500) {
                    throw new Error("Ocurrió un error interno en el servidor. Intente más tarde");
                }

                throw new Error("Ocurrió un error desconocido");
            }

            throw new Error("No se pudo enviar la petición");
        }
    }

    async getAll(): Promise<Exam[]> {
        try {
            const response = await Api.get<ApiResponse<ExamApi[]>>("/exams");
            const apiResponse = response.data;

            if (response.status === 200 && apiResponse.data) {
                return apiResponse.data.map(examApi => this.examMapper.fromExamApiToExam(examApi));
            }

            throw new Error("No se envío la petición correctamente");

        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const status = error.response.status;

                if (status >= 500) {
                    throw new Error("Ocurrió un error interno en el servidor. Intente más tarde");
                }

                throw new Error("Ocurrió un error desconocido");
            }

            throw new Error("No se pudo enviar la petición");
        }
    }

    async save(exam: Exam): Promise<Exam> {
        const examApiSave = this.examMapper.fromExamToCreateExamApi(exam);

        try {
            const response = await Api.post<ApiResponse<ExamApi>>("/exams", examApiSave);
            const apiResponse = response.data;

            if (response.status === 201 && apiResponse.data) {
                return this.examMapper.fromExamApiToExam(apiResponse.data);
            }

            throw new Error("No se envió correctamente la petición");

        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const status = error.response.status;

                if (status >= 500) {
                    throw new Error("Ocurrió un error interno en el servidor");
                }

                throw new Error("Ocurrió un error desconocido");
            }

            throw new Error("No se pudo enviar la petición");
        }
    }
}
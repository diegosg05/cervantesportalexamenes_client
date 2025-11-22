import { AxiosError } from "axios";

import type { Question } from "../../domain/models/Question";
import type { QuestionRepository } from "../../domain/repositories/QuestionRepository";
import { Api } from "../../../../infrastructure/api/Api";
import type { ApiResponse } from "../../../../infrastructure/response/ApiResponse";
import type { QuestionApi } from "../dtos/QuestionApi";
import type { QuestionMapper } from "../mappers/QuestionMapper";

export class QuestionApiRepository implements QuestionRepository {

    private readonly questionMapper: QuestionMapper;

    constructor(questionMapper: QuestionMapper) {
        this.questionMapper = questionMapper;
    }

    async sendAnswers(answers: { id: number; givenCorrect: string; }[]): Promise<{ maxPoints: number; correctAnswers: number; attempts: number; }> {

        try {

            const response = await Api.post<ApiResponse<{ maxPoints: number, correctAnswers: number, attempts: number }>>(
                "/questions/evaluate-exam", answers
            );

            const apiResponse = response.data;

            if (response.status === 200 && apiResponse.data) {
                return apiResponse.data;
            }

            throw new Error("No se envío correctamente la petición");

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

    async deleteQuestion(id: number): Promise<void> {
        try {
            const response = await Api.delete(`/questions/${id}`);

            if (response.status === 204) {
                return;
            }

            throw new Error("No se envío correctamente la petición");
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const status = error.response.status;

                if (status === 404) {
                    throw new Error("No se encontró la pregunta");
                }

                if (status >= 500) {
                    throw new Error("Ocurrió un error interno en el servidor. Intente más tarde");
                }

                throw new Error("Ocurrió un error desconocido");
            }

            throw new Error("No se pudo envíar la petición");
        }
    }

    async updateQuestion(question: Question): Promise<void> {
        const questionApi = this.questionMapper.fromQuestionToUpdateQuestionApi(question);

        try {
            const response = await Api.put<ApiResponse<QuestionApi>>("/questions", questionApi);

            if (response.status === 204) {
                return;
            }

            throw new Error("No se envío correctamente la petición");

        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const status = error.response.status;

                if (status === 404) {
                    throw new Error("No se encontró la pregunta");
                }

                if (status >= 500) {
                    throw new Error("Ocurrió un error interno en el servidor. Intente más tarde");
                }

                throw new Error("Ocurrió un error desconocido");
            }

            throw new Error("No se pudo envíar la petición");
        }
    }

    async saveQuestion(question: Question): Promise<Question> {
        const questionApi = this.questionMapper.fromQuestionToCreateQuestionApi(question);

        try {
            const response = await Api.post<ApiResponse<QuestionApi>>("/questions", questionApi);
            const apiResponse = response.data;

            if (response.status === 201 && apiResponse.data) {
                return this.questionMapper.fromQuestionApiToQuestion(apiResponse.data);
            }

            throw new Error("No se envío correctamente la petición");

        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const status = error.response.status;

                if (status >= 500) {
                    throw new Error("Ocurrió un error interno en el servidor. Intente más tarde");
                }

                throw new Error("Ocurrió un error desconocido");
            }

            throw new Error("No se pudo envíar la petición");
        }

    }

    async GetQuestionsByExam(idExam: number): Promise<Question[]> {
        try {
            const response = await Api.get(`/questions/exams/${idExam}`);
            const apiResponse: ApiResponse<QuestionApi[]> = response.data;

            if (response.status === 200 && apiResponse.data) {
                const questions = apiResponse.data;

                return questions.map(questionApi => this.questionMapper.fromQuestionApiToQuestion(questionApi));
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
}
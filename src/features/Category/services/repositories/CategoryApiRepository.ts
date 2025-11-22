import { AxiosError } from "axios";
import { Api } from "../../../../infrastructure/api/Api";
import type { ApiResponse } from "../../../../infrastructure/response/ApiResponse";
import type { Category } from "../../domain/models/Category";
import type { CategoryRepository } from "../../domain/repositories/CategoryRepository";
import type { CategoryApi, CategorySaveApi } from "../dtos";

export class CategoryApiRepository implements CategoryRepository {

    async save(category: Category): Promise<Category> {
        const { title, description } = category;

        const categorySave: CategorySaveApi = {
            title: title,
            description: description
        }

        try {
            const response = await Api.post<ApiResponse<CategoryApi>>("/categories", categorySave);
            const apiResponse = response.data;

            if (response.status === 201 && apiResponse.data) {
                const { id, title, description } = apiResponse.data;

                const categorySaved: Category = {
                    id: id,
                    title: title,
                    description: description,
                };

                return categorySaved;
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

    async update(category: Category): Promise<void> {
        const { id, title, description } = category;

        const categorySave: CategoryApi = {
            id: id,
            title: title,
            description: description
        }

        try {
            const response = await Api.put("/categories", categorySave);

            if (response.status === 204) {
                return;
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

    async getAll(): Promise<Category[]> {
        try {
            const response = await Api.get<ApiResponse<CategoryApi[]>>("/categories");
            const apiResponse = response.data;

            if (response.status === 200 && apiResponse.data) {
                const categories = apiResponse.data;
                return categories.map((categoryApi) => {
                    const { id, title, description } = categoryApi;

                    const category: Category = {
                        id: id,
                        title: title,
                        description: description
                    }
                    return category;
                });
            }

            throw new Error("No se envío la petición correctamente");
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const status = error.response.status;

                if (status >= 500) {
                    throw new Error("Ocurrio un error interno en el servidor. Intente más tarde");
                }

                throw new Error("Ocurrió un error desconocido");
            }

            throw new Error("Ocurrió un error en el envío de la petición");
        }
    }

    async get(id: number): Promise<Category> {
        try {
            const response = await Api.get<ApiResponse<CategoryApi>>(`/categories/${id}`);
            const apiResponse = response.data;

            if (response.status === 200 && apiResponse.data) {
                const category = apiResponse.data;
                return category;
            }

            throw new Error("No se envió la petición correctamente");

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

            throw new Error("Ocurrió un error en el envío de la petición");
        }
    }

}
import { Api } from "../../../../infrastructure/api/Api";
import type { User } from "../../domain/models/User";
import type { UserRepository } from "../../domain/repositories/UserRepository";
import type { UpdateUserApi } from "../dtos/UpdateUserApi";
import type { ResetPasswordApi } from "../dtos/ResetPasswordApi";
import type { ApiResponse } from "../../../../infrastructure/response/ApiResponse";
import type { LoginUserApi, ResponseUserApi } from "../dtos";
import type { UserMapper } from "../mappers/UserMapper";
import { AxiosError } from "axios";

const CLOUDINARY_NAME = `${import.meta.env.VITE_CLOUDINARY_NAME}`;
const CLOUDINARY_PRESET = `${import.meta.env.VITE_CLOUDINARY_PRESET}`;

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`;

export class UserApiRepository implements UserRepository {

    private readonly userMapper: UserMapper;

    constructor(userMapper: UserMapper) {
        this.userMapper = userMapper;
    }

    async resetPassword(oldPassword: string, newPassword: string): Promise<void> {
        const resetPasswordApi: ResetPasswordApi = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }

        try {
            const response = await Api.put("/users/reset-password", resetPasswordApi, { withCredentials: true });

            if (response.status === 204) {
                return;
            }

            throw new Error("No se envío la petición correctamente");

        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const status = error.response.status;

                if (status === 400) {
                    throw new Error("La contraseña es incorrecta");
                }

                if (status >= 500) {
                    throw new Error("Ocurrió un error interno en el servidor, por favor intente más tarde");
                }

                throw new Error("Ocurrió un error desconocido");
            }
            throw new Error("Hubo un error en el envío de la petición");
        }
    }

    async uploadImage(imageFile: File): Promise<string> {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', CLOUDINARY_PRESET);

        try {
            const cloudinaryResponse = await Api.post(CLOUDINARY_UPLOAD_URL, formData, {
                headers: { 'Content-Type': undefined },
            });

            return cloudinaryResponse.data.secure_url;

        } catch (error) {
            console.error('Error al subir a Cloudinary:', error);
            throw new Error("Fallo en la subida de imagen al servidor externo.");
        }
    }

    async update(firstname: string, lastname: string, image: string, phone: string): Promise<User> {
        const userUpdateApi: UpdateUserApi = {
            firstname: firstname,
            lastname: lastname,
            image: image,
            phone: phone
        }

        try {
            const response = await Api.put("/users", userUpdateApi, { withCredentials: true });

            const apiResponse: ApiResponse<ResponseUserApi> = response.data;

            if (response.status === 200 && apiResponse.data) {
                return this.userMapper.frormResponseUserApiToUser(apiResponse.data);
            }

            throw new Error("No se envío la petición correctamente");

        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const status = error.response.status;

                if (status >= 500) {
                    throw new Error("Ocurrio un error interno en el servidor, por favor intente más tarde");
                }

                throw new Error("Ocurrio un error desconocido");
            }

            throw new Error("Hubo un error en enviar la petición");
        }
    }

    async register(user: User): Promise<User> {

        const userRegisterApi = this.userMapper.fromUserToRegisterUserApi(user);

        try {
            const response = await Api.post<ApiResponse<ResponseUserApi>>("/auth/register", userRegisterApi);

            const apiResponse = response.data;

            if (response.status === 201 && apiResponse.data) {
                return this.userMapper.frormResponseUserApiToUser(apiResponse.data);
            }

            throw new Error("No se envío correctamente la petición");

        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const status = error.response.status;

                if (status === 400) {
                    throw new Error("El usuario y/o el correo ya se encuentra registrado");
                }

                if (status >= 500) {
                    throw new Error("Ocurrio un error interno en el servidor, por favor intente más tarde");
                }

                throw new Error("Ocurrio un error desconocido");
            }
            throw new Error("Hubo un error en la petición");
        }

    }

    async login(username: string, password: string): Promise<User> {

        const userLoginApi: LoginUserApi = {
            username: username,
            password: password
        }

        try {
            const response = await Api.post<ApiResponse<ResponseUserApi>>("/auth/login", userLoginApi);

            const apiResponse = response.data;

            if (response.status === 200 && apiResponse.data) {
                return this.userMapper.frormResponseUserApiToUser(apiResponse.data);
            }

            throw new Error("No se envío correctamente la petición");

        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const status = error.response.status;

                if (status === 404) {
                    throw new Error("El usuario no se encuentra registrado");
                }

                if (status === 400) {
                    throw new Error("La contraseña es incorrecta");
                }

                if (status >= 500) {
                    throw new Error("Ocurrió un error interno en el servidor, por favor intente más tarde");
                }

                throw new Error("Ocurrió un error desconocido");
            }

            throw new Error("Hubo un error en la petición");
        }
    }

    async logout(): Promise<void> {
        try {
            const response = await Api.post("/auth/logout", undefined);

            if (response.status === 204) {
                return;
            }

            throw new Error("No se envío correctamente la petición");

        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const status = error.response.status;

                if (status === 404) {
                    throw new Error("No se ha realizado correctamente la petición, intente más tarde");
                }

                if (status >= 500) {
                    throw new Error("Ocurrió un error interno en el servidor, por favor intente más tarde");
                }

                throw new Error("Ocurrió un error desconocido")
            }
            throw new Error("Hubo un error en la petición");
        }
    }

}
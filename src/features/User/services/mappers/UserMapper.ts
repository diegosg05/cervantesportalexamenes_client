import type { User } from "../../domain/models/User";
import type { RegisterUserApi, ResponseUserApi } from "../dtos";

export interface UserMapper {

    fromUserToRegisterUserApi(user: User): RegisterUserApi

    fromRegisterUserApiToUser(registerUserApi: RegisterUserApi): User

    frormResponseUserApiToUser(responseUserApi: ResponseUserApi): User

}
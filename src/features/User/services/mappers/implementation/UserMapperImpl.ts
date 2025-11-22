import type { User } from "../../../domain/models/User";
import type { RegisterUserApi, ResponseUserApi } from "../../dtos";
import type { UserMapper } from "../UserMapper";

export class UserMapperImpl implements UserMapper {

    fromRegisterUserApiToUser(registerUserApi: RegisterUserApi): User {
        const { email, firstname, lastname, password, phone, username } = registerUserApi;

        return {
            id: 0,
            email: email,
            enabled: true,
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            username: username,
            image: "/src/assets/profile-users/user-default-profile.png",
            password: password,
            role: {
                id: 2,
                name: "STUDENT"
            }
        }
    }

    fromUserToRegisterUserApi(user: User): RegisterUserApi {
        const { email, username, password, firstname, lastname, phone } = user;

        return {
            email: email,
            username: username,
            password: password!,
            firstname: firstname,
            lastname: lastname,
            phone: phone
        };
    }

    frormResponseUserApiToUser(responseUserApi: ResponseUserApi): User {
        const { id, email, username, enabled, firstname, lastname, image, phone, role } = responseUserApi;

        return {
            id: id,
            email: email,
            username: username,
            enabled: enabled,
            firstname: firstname,
            lastname: lastname,
            image: image,
            phone: phone,
            role: {
                id: role.id,
                name: role.name,
            }
        }
    }

}
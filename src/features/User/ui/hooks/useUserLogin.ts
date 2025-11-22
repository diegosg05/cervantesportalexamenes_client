import { useState } from "react";
import { UserApiRepository } from "../../services/repositories/UserApiRepository";
import { useDispatch } from "react-redux";
import { setAuth } from "../../slice/authSlice";
import { UserLoginCase } from "../../application/use-cases";

import type { LoginUserApi } from "../../services/dtos/LoginUserApi";
import { UserMapperImpl } from "../../services/mappers/implementation/UserMapperImpl";
import type { UserMapper } from "../../services/mappers/UserMapper";

const userMapper: UserMapper = new UserMapperImpl();
const userLoginCase = new UserLoginCase(new UserApiRepository(userMapper));

export const useLogin = () => {

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const login = async (credentials: LoginUserApi) => {

        const { username, password } = credentials;

        setIsLoading(true);

        try {

            const userAuthenticated = await userLoginCase.execute(username, password);
            dispatch(setAuth(userAuthenticated));

        } catch (e) {

            const errorMessage = e instanceof Error ? e.message : String(e);
            throw new Error(errorMessage);

        } finally {
            setIsLoading(false);
        }

    }

    return { login, isLoading }
}
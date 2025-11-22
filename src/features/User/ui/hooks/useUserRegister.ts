import { useState } from "react";
import { UserApiRepository } from "../../services/repositories/UserApiRepository";
import { useDispatch } from "react-redux";
import type { RegisterUserApi } from "../../services/dtos/RegisterUserApi";
import { setAuth } from "../../slice/authSlice";
import { UserRegisterCase } from "../../application/use-cases";
import type { UserMapper } from "../../services/mappers/UserMapper";
import { UserMapperImpl } from "../../services/mappers/implementation/UserMapperImpl";

const userMapper: UserMapper = new UserMapperImpl();
const userRegisterCase = new UserRegisterCase(new UserApiRepository(userMapper));

export const useUserRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispath = useDispatch();

    const register = async (data: RegisterUserApi) => {

        setIsLoading(true);
        try {
            const userAuthenticated = await userRegisterCase.execute(userMapper.fromRegisterUserApiToUser(data));
            dispath(setAuth(userAuthenticated));
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }

    }

    return { register, isLoading };
}
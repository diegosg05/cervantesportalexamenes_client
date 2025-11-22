import { useState } from "react"
import { UserApiRepository } from "../../services/repositories/UserApiRepository";
import { useDispatch } from "react-redux";
import { removeAuth } from "../../slice/authSlice";
import { UserLogoutCase } from "../../application/use-cases";
import type { UserMapper } from "../../services/mappers/UserMapper";
import { UserMapperImpl } from "../../services/mappers/implementation/UserMapperImpl";

const userMapper: UserMapper = new UserMapperImpl();
const userLogoutCase = new UserLogoutCase(new UserApiRepository(userMapper));

export const useLogout = () => {

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const logout = async () => {

        setIsLoading(true);
        try {
            await userLogoutCase.execute();
            dispatch(removeAuth());
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }

    }

    return { logout, isLoading };
}
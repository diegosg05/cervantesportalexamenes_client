import { type UpdateUserApi } from '../../services/dtos/UpdateUserApi';
import { UpdateUserCase } from "../../application/use-cases/UserUpdateCase"
import { UserApiRepository } from '../../services/repositories/UserApiRepository';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../slice/authSlice';
import type { UserMapper } from '../../services/mappers/UserMapper';
import { UserMapperImpl } from '../../services/mappers/implementation/UserMapperImpl';

const userMapper: UserMapper = new UserMapperImpl();
const updateUseCase = new UpdateUserCase(new UserApiRepository(userMapper));

export const useUserUpdate = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const updateUser = async (data: UpdateUserApi) => {
        setIsLoading(true);
        try {
            const user = await updateUseCase.execute(data);
            dispatch(setAuth(user));
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return { updateUser, isLoading };
}
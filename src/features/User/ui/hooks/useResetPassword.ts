import { useState } from "react"
import { ResetPasswordCase } from "../../application/use-cases/ResetPasswordCase";
import { UserApiRepository } from "../../services/repositories/UserApiRepository";
import type { ResetPasswordApi } from "../../services/dtos/ResetPasswordApi";
import type { UserMapper } from "../../services/mappers/UserMapper";
import { UserMapperImpl } from "../../services/mappers/implementation/UserMapperImpl";

const userMapper: UserMapper = new UserMapperImpl();
const resetPasswordCase = new ResetPasswordCase(new UserApiRepository(userMapper));

export const useResetPassword = () => {

    const [isLoading, setIsLoading] = useState(false);

    const resetPassword = async (data: ResetPasswordApi) => {

        setIsLoading(true);
        const { oldPassword, newPassword } = data;

        try {
            await resetPasswordCase.execute(oldPassword, newPassword);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }

    }

    return { resetPassword, isLoading };
}
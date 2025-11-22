import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassSchema } from "../../validations/resetPassSchema";
import type { ResetPasswordApi } from "../../../services/dtos/ResetPasswordApi";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { useResetPassword } from "../../hooks";

export const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(resetPassSchema),
    });
    const [showActualPassword, setShowActualPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { resetPassword, isLoading } = useResetPassword();

    const handleClickShowPassword = (name: string) => {
        if (name === "actualpass") {
            setShowActualPassword((show) => !show)
            return;
        }

        if (name === "newpass") {
            setShowNewPassword((show) => !show)
            return;
        }

        if (name === "againpass") {
            setShowConfirmPassword((show) => !show)
        }
    };

    const handleResetPasswordSubmit: SubmitHandler<ResetPasswordApi> = async (data) => {
        const resetPassApi: ResetPasswordApi = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }

        try {
            await resetPassword(resetPassApi);
            toast.success("Contraseña actualizada!");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            toast.error(errorMessage);
        }
    }

    return (
        <div>
            <div className="mb-4">
                <h1 className="text-3xl font-bold">Actualizar mi contraseña</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit(handleResetPasswordSubmit)}>
                    <div className="col columns-3">
                        <div>
                            <TextField
                                id="actualpass"
                                type={showActualPassword ? 'text' : 'password'}
                                label="Contraseña actual"
                                sx={{ width: "100%" }}
                                {...register("oldPassword")}
                                error={errors.oldPassword ? true : undefined}
                                helperText={errors.oldPassword ? errors.oldPassword.message?.toString() : undefined}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={
                                                        showActualPassword ? 'hide the password' : 'display the password'
                                                    }
                                                    onClick={() => handleClickShowPassword("actualpass")}
                                                    edge="end"
                                                >
                                                    {showActualPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>

                                        )
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                id="newpass"
                                type={showNewPassword ? 'text' : 'password'}
                                label="Nueva contraseña"
                                sx={{ width: "100%" }}
                                {...register("newPassword")}
                                error={errors.newPassword ? true : undefined}
                                helperText={errors.newPassword ? errors.newPassword.message?.toString() : undefined}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={
                                                        showNewPassword ? 'hide the password' : 'display the password'
                                                    }
                                                    onClick={() => handleClickShowPassword("newpass")}
                                                    edge="end"
                                                >
                                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>

                                        )
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                id="confirmpass"
                                type={showConfirmPassword ? 'text' : 'password'}
                                label="Confirmar contraseña"
                                sx={{ width: "100%" }}
                                {...register("confirmPassword")}
                                error={errors.confirmPassword ? true : undefined}
                                helperText={errors.confirmPassword ? errors.confirmPassword.message?.toString() : undefined}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={
                                                        showConfirmPassword ? 'hide the password' : 'display the password'
                                                    }
                                                    onClick={() => handleClickShowPassword("againpass")}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>

                                        )
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-8">
                        <Link to="/profile" className="w-full">
                            <Button variant="contained" disabled={isLoading} type="button" color="error" size="large" sx={{ marginRight: 4 }}>
                                Cancelar
                            </Button>
                        </Link>
                        <Button variant="contained" disabled={isLoading} type="submit" color="primary" size="large">Guardar cambios</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
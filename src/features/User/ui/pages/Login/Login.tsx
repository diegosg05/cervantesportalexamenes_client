import { Button, TextField } from "@mui/material"
import { Link, useNavigate } from "react-router"
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useLogin } from "../../hooks"

import type { LoginUserApi } from "../../../services/dtos/LoginUserApi"


export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginUserApi>();

    const { login, isLoading } = useLogin();

    const navigate = useNavigate();

    const handleLoginSubmit: SubmitHandler<LoginUserApi> = async (fields) => {

        try {
            await login(fields);
            toast.success("Login exitoso!");
            navigate("/");
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            toast.error(errorMessage);
        }

    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="p-10 min-w-md border border-gray-300 shadow-2xl rounded-2xl">
                <div className="mb-8">
                    <h1 className="text-4xl text-center mb-2">Login</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit(handleLoginSubmit)}>
                        <div className="mb-6">
                            <TextField
                                id="username"
                                error={errors.username ? true : undefined}
                                className="w-full" {...register("username", { required: { value: true, message: "El usuario es requerido" } })}
                                label="Username" variant="filled" helperText={errors.username ? errors.username?.message?.toString() : undefined} />
                        </div>
                        <div className="mb-6">
                            <TextField
                                id="password"
                                error={errors.password ? true : undefined}
                                className="w-full" {...register("password", { required: { value: true, message: "La constraseña es requerido" } })}
                                type="password" label="Contraseña" placeholder="***********"
                                helperText={errors.password ? errors.password?.message?.toString() : undefined}
                                variant="filled" />
                        </div>
                        <div>
                            <Button type="submit" variant="contained" size="large"
                                className="w-full" disabled={isLoading}
                                color="secondary">{isLoading ? "Cargando..." : "Iniciar Sesión"}</Button>
                        </div>
                    </form>
                </div>
                <div className="mt-10">
                    <p className="text-gray-500 text-center">¿No estás registrado? <Link to="/signup" className="hover:underline">regístrate aquí</Link></p>
                </div>
            </div>
        </div>
    )
}
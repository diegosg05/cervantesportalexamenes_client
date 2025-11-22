import { Button, TextField } from "@mui/material"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import type { RegisterUserApi } from "../../../services/dtos/RegisterUserApi";
import { toast } from "react-toastify";
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from "../../validations/registerSchema";
import { useUserRegister } from "../../hooks";

export const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const { isLoading, register: userRegister } = useUserRegister();

    const navigate = useNavigate();

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Tab') {
            return;
        }

        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    };

    const handleRegisterSubmit: SubmitHandler<RegisterUserApi> = async (data) => {
        try {
            await userRegister(data);
            toast.success("Bienvenido!");
            navigate("/");
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e)
            toast.error(errorMessage);
        }
    }


    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="p-10 min-w-xl border border-gray-300 shadow-2xl rounded-2xl">
                <div className="mb-8">
                    <h1 className="text-4xl text-center">Registrarse</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit(handleRegisterSubmit)}>
                        <div className="mb-6 col columns-2">
                            <div>
                                <TextField className="w-full" helperText={errors.username ? errors.username.message?.toString() : undefined} error={errors.username ? true : undefined} {...register("username")} id="username" label="Usuario" variant="filled" />
                            </div>
                            <div>
                                <TextField className="w-full" error={errors.password ? true : undefined} {...register("password")} type="password" id="password" label="Contraseña" placeholder="***********" variant="filled" helperText={errors.password ? errors.password?.message?.toString() : "Debe tener al menos 6 carácteres"} />
                            </div>
                        </div>
                        <div className="mb-6">
                            <TextField className="w-full" helperText={errors.email ? errors.email.message?.toString() : undefined} error={errors.email ? true : undefined} {...register("email")} type="email" id="email" label="Correo" variant="filled" />
                        </div>
                        <div className="mb-6 col columns-2">
                            <div>
                                <TextField className="w-full" helperText={errors.firstname ? errors.firstname.message?.toString() : undefined} error={errors.firstname ? true : undefined} {...register("firstname")} id="firstname" label="Nombre" variant="filled" />
                            </div>
                            <div>
                                <TextField className="w-full" helperText={errors.lastname ? errors.lastname.message?.toString() : undefined} error={errors.lastname ? true : undefined} {...register("lastname")} id="lastname" label="Apellido" variant="filled" />
                            </div>
                        </div>
                        <div className="mb-6">
                            <TextField className="w-full" slotProps={{ htmlInput: { maxLength: 9 } }} onKeyDown={handleKeyDown} helperText={errors.phone ? errors.phone.message?.toString() : undefined} error={errors.phone ? true : undefined} {...register("phone")} id="phone" label="Número de celular (+51)" variant="filled" />
                        </div>
                        <div>
                            <Button variant="contained" size="large" className="w-full" type="submit" color="secondary" disabled={isLoading}>{isLoading ? "Cargando..." : "Crear cuenta"}</Button>
                        </div>
                    </form>
                </div>
                <div className="mt-10">
                    <p className="text-gray-500 text-center">¿Ya estás registrado? <Link to="/login" className="hover:underline">Inicia sesión aquí</Link></p>
                </div>
            </div>
        </div>
    )
}
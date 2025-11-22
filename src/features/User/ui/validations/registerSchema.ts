import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string().min(1, "El usuario es requerido"),
    password: z.string().min(1, "La contraseña es requerida").min(6, "Debe tener al menos 6 carácteres"),
    email: z.email("El correo es inválido").min(1, "El correo es requerida"),
    firstname: z.string().min(1, "El nombre es requerido"),
    lastname: z.string().min(1, "El apellido es requerido"),
    phone: z.string().min(1, "El número de celular es requerido").max(9, "El número es inválido").regex(/^[0-9]{9}$/, "El número es inválido")
}).required();
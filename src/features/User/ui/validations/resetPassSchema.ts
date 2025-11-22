import z from "zod";

export const resetPassSchema = z.object({
    oldPassword: z.string().min(1, "Ingrese su contraseña"),
    newPassword: z.string().min(1, "Ingrese su nueva contraseña").min(6, "Debe tener al menos 6 carácteres"),
    confirmPassword: z.string().min(1, "Repita su contraseña")
}).refine((data) => data.confirmPassword === data.newPassword, {
    message: "La contraseñas no coinciden",
    path: ['confirmPassword'],
});
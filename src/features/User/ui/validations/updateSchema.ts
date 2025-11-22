import { z } from "zod";

const MAX_IMAGE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const fileSchema = z.custom<File>()
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Solo se aceptan archivos .jpg, .jpeg, .png y .webp")
    .refine((file) => file.size <= MAX_IMAGE_SIZE, `El tamaño máximo de archivo es de ${MAX_IMAGE_SIZE / 1000000}MB`)
    .optional();

export const updateSchema = z.object({
    imageFile: fileSchema,
    firstname: z.string().min(1, "El nombre es requerido"),
    lastname: z.string().min(1, "El apellido es requerido"),
    phone: z.string().min(1, "El número de celular es requerido").max(9, "El número es inválido").regex(/^[0-9]{9}$/, "El número es inválido")
})
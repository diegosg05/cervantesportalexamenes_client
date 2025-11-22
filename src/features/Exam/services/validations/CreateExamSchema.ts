import z from "zod";

export const CreateExamSchema = z.object({
    title: z.string().min(1, "Ingrese el título"),
    description: z.string().min(1, "Ingrese la descripción"),
    maxPoints: z.number().min(1, "Ingrese la puntuación máxima").max(20, "El límite de puntuación es 20"),
    quantityQuestions: z.number().min(1, "Ingrese la cantidad de preguntas"),
    enabled: z.boolean(),
    idCategory: z.number({ error: "Seleccione una categoría" }).min(1, "Seleccione una categoría")
}).required();
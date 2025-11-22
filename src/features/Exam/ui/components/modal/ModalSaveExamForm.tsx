import { useState } from 'react';
import { Backdrop, Box, Modal, Fade, Button, Typography, TextField, FormGroup, FormControlLabel, Switch, FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent, FormHelperText } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Controller, useForm, type FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSaveExam } from '../../hooks';
import type { CreateExamApi } from '../../../services/dtos';
import NumberField from '../../../../../components/numberfield/NumberField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFetchCategories } from '../../../../Category/ui/hooks';
import { CreateExamSchema } from '../../../services/validations/CreateExamSchema';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #E5E4E2',
    boxShadow: 30,
    zIndex: 1200,
    p: 4,
};

export const ModalSaveExamForm = ({ fetch }: { fetch: () => Promise<void> }) => {
    const [nameCategory, setNameCategory] = useState("");
    const [maxPoints, setMaxPoints] = useState(1);
    const [quantityQuestions, setQuantityQuestions] = useState(1);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, formState: { errors }, handleSubmit, setValue, control } = useForm({
        resolver: zodResolver(CreateExamSchema),
        defaultValues: {
            maxPoints: 1,
            quantityQuestions: 1
        }
    });
    const { saveExam, isLoading } = useSaveExam();
    const { data: dataCategories } = useFetchCategories();

    const handleChange = (event: SelectChangeEvent) => {
        setNameCategory(event.target.value as string);
    };

    const handleSaveCategorySubmit = async (data: FieldValues) => {
        const newExam: CreateExamApi = {
            title: data.title,
            description: data.description,
            enabled: data.enabled,
            idCategory: data.idCategory,
            maxPoints: data.maxPoints,
            quantityQuestions: data.quantityQuestions
        }

        try {
            await saveExam(newExam);
            toast.success("Cuestionario agregado!");
            await fetch();
            handleClose();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            toast.error(errorMessage);
        }
    }

    return (
        <div>
            <Button onClick={handleOpen} variant="contained" color="secondary" startIcon={<AddCircleOutlineIcon />} size="medium">Agregar Cuestionario</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h5" component="h2">
                            Nuevo cuestionario
                        </Typography>
                        <Box id="transition-modal-description" sx={{ mt: 2 }}>
                            <form onSubmit={handleSubmit(handleSaveCategorySubmit)}>
                                <div className='mb-4'>
                                    <TextField error={errors.title ? true : undefined} helperText={errors.title ? errors.title.message?.toString() : undefined} {...register("title")} label="Titulo" sx={{ width: '100%' }} variant="outlined" />
                                </div>
                                <div className='mb-4'>
                                    <TextField error={errors.description ? true : undefined} helperText={errors.description ? errors.description.message?.toString() : undefined} {...register("description")} label="Description" sx={{ width: '100%' }} variant="outlined" />
                                </div>
                                <div className='mb-4 flex gap-5'>
                                    <Controller
                                        name="maxPoints"
                                        control={control}
                                        render={({ field }) => (
                                            <NumberField
                                                label="Máximo puntaje"
                                                className="w-full"
                                                {...field}
                                                min={1}
                                                defaultValue={maxPoints}
                                                max={20}
                                                onValueChange={(e) => {
                                                    setValue("maxPoints", e ? e : 1);
                                                    setMaxPoints(e ? e : 1);
                                                }}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="quantityQuestions"
                                        control={control}
                                        render={({ field }) => (
                                            <NumberField
                                                label="Max. de preguntas"
                                                className="w-full"
                                                {...field}
                                                min={1}
                                                defaultValue={quantityQuestions}
                                                max={20}
                                                onValueChange={(e) => {
                                                    setValue("quantityQuestions", e ? e : 1);
                                                    setQuantityQuestions(e ? e : 1);
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <div className='mb-4'>
                                    <FormGroup sx={{ display: "inline-block" }}>
                                        <FormControlLabel control={<Switch defaultChecked {...register("enabled")} />} label="Estado de publicación" />
                                    </FormGroup>
                                </div>
                                <div>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" sx={errors.idCategory ? { color: "#d32f2f" } : undefined}>Seleccionar categoría</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={nameCategory}
                                            label="Seleccionar categoría"
                                            error={errors.idCategory ? true : undefined}

                                            {...register("idCategory", { onChange: handleChange })}
                                        >
                                            {
                                                dataCategories &&
                                                dataCategories.map(category =>
                                                    <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
                                                )
                                            }
                                        </Select>
                                        {
                                            errors.idCategory ? (
                                                <FormHelperText sx={{ color: "#d32f2f" }}>{errors.idCategory.message?.toString()}</FormHelperText>
                                            ) : ""
                                        }
                                    </FormControl>
                                </div>
                                <div className='mt-5'>
                                    <Button variant="contained" disabled={isLoading} sx={{ marginRight: 2 }} color="error" onClick={handleClose} >Cancelar</Button>
                                    <Button type='submit' variant="contained" disabled={isLoading} color="secondary" startIcon={<AddCircleOutlineIcon />} >Guardar</Button>
                                </div>
                            </form>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
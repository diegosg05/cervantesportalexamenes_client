import { useState, type ChangeEvent } from 'react';
import { Backdrop, Box, Modal, Fade, Button, Typography, TextField, FormControl, InputLabel, Select, FormHelperText, MenuItem, type SelectChangeEvent } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useForm, type FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSaveQuestion } from '../../hooks/useSaveQuestion';
import type { CreateQuestionApi } from '../../../services/dtos/CreateQuestionApi';

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

export const ModalCreateQuestionForm = ({ fetch, idExam }: { fetch: (id: number) => Promise<void>, idExam: number }) => {
    const [answer, setAnswer] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { saveQuestion, isLoading } = useSaveQuestion();
    const [options, setOptions] = useState<string[]>(["", "", "", ""]);

    const handleSaveQuestion = async (data: FieldValues) => {
        try {
            const newQuestion: CreateQuestionApi = {
                content: data.content,
                image: data.image,
                optionOne: data.optionOne,
                optionTwo: data.optionTwo,
                optionThree: data.optionThree,
                optionFour: data.optionFour,
                correctAnswer: data.correctAnswer,
                idExam: idExam!
            }

            await saveQuestion(newQuestion);
            toast.success("pregunta agregada!");
            await fetch(idExam);
            handleClose();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            toast.error(errorMessage);
        }
    }

    const handleAnswer = (event: SelectChangeEvent) => {
        setAnswer(event.target.value as string);
    }

    const handleOption = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = event.target.value;
        setOptions((options) => {
            options[index] = value;
            return [...options];
        });
        setAnswer("");
    }

    return (
        <div>
            <Button onClick={handleOpen} variant="contained" color="secondary" startIcon={<AddCircleOutlineIcon />} >Agregar Pregunta</Button>
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
                            Nueva pregunta
                        </Typography>
                        <Box id="transition-modal-description" sx={{ mt: 2 }}>
                            <form onSubmit={handleSubmit(handleSaveQuestion)}>
                                <div className='mb-4'>
                                    <TextField error={errors.content ? true : undefined} helperText={errors.content ? errors.content.message?.toString() : undefined} {...register("content", { required: { value: true, message: "Ingrese la pregunta" } })} label="Contenido de la pregunta" sx={{ width: '100%' }} variant="outlined" />
                                </div>
                                <div className='mb-4'>
                                    <TextField error={errors.optionOne ? true : undefined} helperText={errors.optionOne ? errors.optionOne.message?.toString() : undefined} {...register("optionOne", { required: { value: true, message: "Ingrese la opción" }, onChange: (e) => handleOption(e, 0) })} className='w-full' label="Opción 1 *" />
                                </div>
                                <div className='mb-4'>
                                    <TextField error={errors.optionTwo ? true : undefined} helperText={errors.optionTwo ? errors.optionTwo.message?.toString() : undefined} {...register("optionTwo", { required: { value: true, message: "Ingrese la opción" }, onChange: (e) => handleOption(e, 1) })} className='w-full' label="Opción 2 *" />
                                </div>
                                <div className='mb-4'>
                                    <TextField {...register("optionThree", { onChange: (e) => handleOption(e, 3) })} className='w-full' label="Opción 3" />
                                </div>
                                <div className='mb-4'>
                                    <TextField {...register("optionFour", { onChange: (e) => handleOption(e, 4) })} className='w-full' label="Opción 4" />
                                </div>
                                <div className='mb-4'>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" sx={errors.correctAnswer ? { color: "#d32f2f" } : undefined}>Seleccionar la opción correcta</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={answer}
                                            label="Seleccionar la opción correcta"
                                            error={errors.correctAnswer ? true : undefined}
                                            {...register("correctAnswer", { required: { value: true, message: "Selecciona la opción correcta" }, onChange: handleAnswer })}
                                        >
                                            {
                                                options &&
                                                options.map((option: string, index: number) =>
                                                    option ? <MenuItem key={index} value={option}>{option}</MenuItem> : undefined
                                                )
                                            }
                                        </Select>
                                        {
                                            errors.correctAnswer ? (
                                                <FormHelperText sx={{ color: "#d32f2f" }}>{errors.correctAnswer.message?.toString()}</FormHelperText>
                                            ) : undefined
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
import { useState, type ChangeEvent } from 'react';
import { Backdrop, Box, Modal, Fade, Button, Typography, TextField, FormControl, InputLabel, Select, FormHelperText, MenuItem, type SelectChangeEvent } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useForm, type FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { Question } from '../../../domain/models/Question';
import type { UpdateQuestionAPi } from '../../../services/dtos/UpdateQuestionApi';
import { useUpdateQuestion } from '../../hooks/useUpdateQuestion';

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

export const ModalEditQuestionForm = ({ fetch, question }: { fetch: (id: number) => Promise<void>, question: Question }) => {
    const { content, correctAnswer, exam, optionOne, optionTwo, id, optionFour, optionThree } = question;
    const [answer, setAnswer] = useState(correctAnswer);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            content: content,
            optionOne: optionOne,
            optionTwo: optionTwo,
            optionThree: optionThree,
            optionFour: optionFour,
            correctAnswer: correctAnswer,
        }
    });
    const { updateQuestion, isLoading } = useUpdateQuestion();
    const [options, setOptions] = useState<string[]>([optionOne, optionTwo, optionThree ? optionThree : "", optionFour ? optionFour : ""]);

    const handleSaveQuestion = async (data: FieldValues) => {
        try {
            const newQuestion: UpdateQuestionAPi = {
                id: id!,
                content: data.content,
                image: data.image,
                optionOne: data.optionOne,
                optionTwo: data.optionTwo,
                optionThree: data.optionThree,
                optionFour: data.optionFour,
                correctAnswer: data.correctAnswer,
                idExam: exam.id!
            }

            await updateQuestion(newQuestion);
            toast.success("Pregunta actualizada!");
            await fetch(exam.id!);
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
            <Button onClick={handleOpen} variant="contained" color="info" startIcon={<AddCircleOutlineIcon />} >Modificar pregunta</Button>
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
                            Actualizar pregunta
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
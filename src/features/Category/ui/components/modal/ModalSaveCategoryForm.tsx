import { useState } from 'react';
import { Backdrop, Box, Modal, Fade, Button, Typography, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useForm, type FieldValues } from 'react-hook-form';
import type { CategorySaveApi } from '../../../services/dtos/CategorySaveApi';
import { toast } from 'react-toastify';
import { useSaveCategory } from '../../hooks/useSaveCategory';

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

export const ModalSaveCategoryForm = ({ fetch }: { fetch: () => Promise<void> }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { saveCategory, isLoading } = useSaveCategory();

    const handleSaveCategorySubmit = async (data: FieldValues) => {
        const newCategory: CategorySaveApi = {
            title: data.title,
            description: data.description,
        }

        try {
            await saveCategory(newCategory);
            toast.success("Categoría agregada!");
            await fetch();
            handleClose();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            toast.error(errorMessage);
        }
    }

    return (
        <div>
            <Button onClick={handleOpen} variant="contained" color="secondary" startIcon={<AddCircleOutlineIcon />} size="medium">Agregar Categoría</Button>
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
                            Nueva categoría
                        </Typography>
                        <Box id="transition-modal-description" sx={{ mt: 2 }}>
                            <form onSubmit={handleSubmit(handleSaveCategorySubmit)}>
                                <div className='mb-4'>
                                    <TextField error={errors.title ? true : undefined} helperText={errors.title ? errors.title.message?.toString() : undefined} {...register("title", { required: { value: true, message: "Ingrese el título" } })} label="Titulo" sx={{ width: '100%' }} variant="outlined" />
                                </div>
                                <div className='mb-4'>
                                    <TextField error={errors.description ? true : undefined} helperText={errors.description ? errors.description.message?.toString() : undefined} {...register("description", { required: { value: true, message: "Ingrese la descripción" } })} label="Description" sx={{ width: '100%' }} variant="outlined" />
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
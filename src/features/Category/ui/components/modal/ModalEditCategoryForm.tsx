import { useState } from 'react';
import { Backdrop, Box, Modal, Fade, Button, Typography, TextField, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useForm, type FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { Category } from '../../../domain/models/Category';
import type { CategoryApi } from '../../../services/dtos/CategoryApi';
import { useUpdateCategory } from '../../hooks/useUpdateCategory';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

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

export const ModalEditCategoryForm = ({ fetch, category }: { fetch: () => Promise<void>, category: Category }) => {
    const { id, title, description } = category;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            title: title,
            description: description
        }
    });
    const { updateCategory, isLoading } = useUpdateCategory();

    const handleSaveCategorySubmit = async (data: FieldValues) => {
        const newCategory: CategoryApi = {
            id: id,
            title: data.title,
            description: data.description,
        }

        try {
            await updateCategory(newCategory);
            toast.success("Categoría actualizada!");
            await fetch();
            handleClose();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            toast.error(errorMessage);
        }
    }

    return (
        <div>
            <IconButton edge="end" onClick={handleOpen}>
                <EditDocumentIcon />
            </IconButton>
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
                            Editar categoría
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
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../app/store";
import { Button, Divider, styled, TextField } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { useUserUpdate } from "../../hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateSchema } from "../../validations/updateSchema";
import type { UpdateUserApi } from "../../../services/dtos/UpdateUserApi";
import { Link } from "react-router";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 100,
});

export const Profile = () => {
    const userState = useSelector((state: RootState) => state.auth);
    const auth = userState.value;
    const [editIsActive, setEditIsActive] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { register, formState: { errors }, handleSubmit, setValue } = useForm({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            firstname: auth?.firstname,
            lastname: auth?.lastname,
            phone: auth?.phone
        }
    });
    const { updateUser, isLoading } = useUserUpdate();

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Tab') {
            return;
        }

        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    };

    const handleEdit = () => {
        if (editIsActive) {
            setPreviewUrl(null);
        }
        setEditIsActive((editIsActive) => !editIsActive);
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        setValue("imageFile", file);

        if (!file) {
            setPreviewUrl(null);
            return;
        }

        if (!file.type.startsWith("image/")) {
            setPreviewUrl(null);
            toast.error("Por favor suba una imagen");
            return;
        }

        if (file.size > 1000000) {
            setPreviewUrl(null);
            toast.error("La imagen debe pesar menos de 1MB");
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    }

    const handleUpdateUser = async (data: FieldValues) => {

        const user: UpdateUserApi = {
            firstname: data.firstname,
            lastname: data.lastname,
            image: data.imageFile ? data.imageFile.name : auth?.image,
            imageFile: data.imageFile,
            phone: data.phone
        }

        try {
            await updateUser(user);
            handleEdit();
            toast.success("Datos actualizados!");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            toast.error(errorMessage);
        }
    }

    return (
        <div>
            <div className="mb-4">
                <h1 className="text-3xl font-bold">Información del usuario</h1>
            </div>
            <div>
                <div className="mb-4">
                    <div className="flex">
                        <img className="border-2 border-gray-400 size-40" src={previewUrl || `${auth?.image}`} alt={auth?.firstname} />
                        {
                            editIsActive ?
                                (
                                    <>
                                        <Button
                                            size="small"
                                            className="self-end"
                                            sx={{ ml: 1 }}
                                            component="label"
                                            role={undefined}
                                            variant="contained"
                                            color="secondary"
                                            tabIndex={-1}
                                        >
                                            Actualizar foto de perfil
                                            <VisuallyHiddenInput
                                                type="file"
                                                form="updateForm"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </Button>
                                    </>
                                ) :
                                <></>
                        }
                    </div>
                    <div>
                        <h2 className="text-2xl ml-4">{`${auth?.username}`}</h2>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl text-gray-500 uppercase">GENERAL</h3>
                </div>
                <Divider />
                <div className="mt-5">
                    {
                        editIsActive ?
                            (
                                <div>
                                    <form id="updateForm" onSubmit={handleSubmit(handleUpdateUser)}>
                                        <div className="mb-2">
                                            <p className="uppercase font-semibold mb-2 select-none">Nombre del usuario:</p>
                                            <TextField id="firstname" error={errors.firstname ? true : undefined} helperText={errors.firstname ? errors.firstname.message : undefined} {...register("firstname")} variant="outlined" className="w-md" size="small" />
                                        </div>
                                        <div className="mb-2">
                                            <p className="uppercase font-semibold mb-2 select-none">Apellido del usuario:</p>
                                            <TextField id="lastname" error={errors.lastname ? true : undefined} helperText={errors.lastname ? errors.lastname.message : undefined} {...register("lastname")} variant="outlined" className="w-md" size="small" />
                                        </div>
                                        <div className="mb-2">
                                            <p className="uppercase font-semibold mb-2 select-none">Número de celular del usuario:</p>
                                            <TextField id="phone" error={errors.phone ? true : undefined} helperText={errors.phone ? errors.phone.message : undefined} {...register("phone")} slotProps={{ htmlInput: { maxLength: 9 } }} onKeyDown={handleKeyDown} variant="outlined" className="w-md" size="small" />
                                        </div>
                                        <div className="mb-2">
                                            <p className="uppercase font-semibold mb-2 select-none">Email del usuario:</p>
                                            <p className="border inline-block w-md border-gray-300 py-1.5 px-4 rounded-md">{auth?.email}</p>
                                        </div>
                                    </form>
                                </div>
                            ) :
                            (
                                <div>
                                    <div className="mb-2">
                                        <p className="uppercase font-semibold mb-2 select-none">Nombre del usuario:</p>
                                        <p className="border inline-block w-md border-gray-300 py-1.5 px-4 rounded-md">{auth?.firstname}</p>
                                    </div>
                                    <div className="mb-2">
                                        <p className="uppercase font-semibold mb-2 select-none">Apellido del usuario:</p>
                                        <p className="border inline-block w-md border-gray-300 py-1.5 px-4 rounded-md">{auth?.lastname}</p>
                                    </div>
                                    <div className="mb-2">
                                        <p className="uppercase font-semibold mb-2 select-none">Número de celular del usuario:</p>
                                        <p className="border inline-block w-md border-gray-300 py-1.5 px-4 rounded-md">{auth?.phone}</p>
                                    </div>
                                    <div className="mb-2">
                                        <p className="uppercase font-semibold mb-2 select-none">Email del usuario:</p>
                                        <p className="border inline-block w-md border-gray-300 py-1.5 px-4 rounded-md">{auth?.email}</p>
                                    </div>
                                </div>
                            )
                    }
                </div>
                <div className="mt-4">
                    <div>
                        {
                            editIsActive ?
                                (
                                    <>
                                        <Button disabled={isLoading} type="button" onClick={handleEdit} size="large" sx={{ marginRight: 4 }} variant="contained" color="error">
                                            Cancelar
                                        </Button>
                                        <Button disabled={isLoading} type="submit" form="updateForm" size="large" variant="contained" color="success">
                                            Guardar Cambios
                                        </Button>
                                    </>
                                ) :
                                (
                                    <>
                                        <Button type="button" sx={{ marginRight: 4 }} onClick={handleEdit} size="large" variant="contained" color="primary">
                                            Editar
                                        </Button>
                                        <Link to={"/reset-password"}>
                                            <Button type="button" size="large" variant="contained" color="warning" >
                                                Cambiar contraseña
                                            </Button>
                                        </Link>
                                    </>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
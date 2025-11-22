import { Divider } from "@mui/material";

export const Welcome = () => {
    return (
        <div>
            <div className='mb-4'>
                <h1 className='text-3xl font-bold'>Bienvenido al dashboard del administrador de Cervantes</h1>
                <p className='mt-4 text-gray-400 text-xl'>Panel de administrador</p>
            </div>
            <Divider />
            <div className='mt-4'>
                <div className='mb-4'>
                    <h2 className='text-2xl'>Tus funciones</h2>
                </div>
                <div>
                    <ul className='list-disc ml-10'>
                        <li>Gestionar las categorías</li>
                        <li>Gestionar los exámenes</li>
                        <li>Asignar exámenes a distintas categorías</li>
                        <li>Gestionar las preguntas</li>
                        <li>Asignar preguntas a cada examen</li>
                    </ul>
                </div>
            </div>
        </div>
    );

}
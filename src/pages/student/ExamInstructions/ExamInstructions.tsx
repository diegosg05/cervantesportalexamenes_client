import { useNavigate, useParams } from "react-router";
import { useFetchExam } from "../../../features/Exam/ui/hooks/useFetchExam";
import { Button, Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import { setExam } from "../../../features/Exam/slices/examSlice";

export const ExamInstructions = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id: idExam } = useParams();

    const { data, isLoading } = useFetchExam(parseInt(idExam!));

    const handleStartExam = (id: number) => {
        dispatch(setExam());
        navigate(`/start-exam/exam/${id}`);
    }

    return (
        <div>
            <div className="mb-4 flex justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Lea las instrucciones de esta página correctamente</h2 >
                </div>
            </div >
            {
                isLoading || !data ?
                    (
                        <h2>Extrayendo datos...</h2>
                    ) :
                    (
                        <div className="my-4">
                            <div className="mb-4">
                                <div>
                                    <h2 className="text-2xl">{data.title}</h2>
                                    <p className="text-lg text-gray-400">{data.description}</p>
                                </div>
                            </div>
                            <Divider />
                            <div className="my-4">
                                <div className="mb-4">
                                    <h2 className="text-2xl">Instrucciones Importantes</h2>
                                </div>
                                <div>
                                    <ul className="list-disc ml-8">
                                        <li>Este cuestionario es solo fines de práctica</li>
                                        <li>Tienes que enviar el cuestionario en <span className="font-bold">20 minutos</span></li>
                                        <li>Puede intentar el cuestionario cualquier cantidad de veces</li>
                                    </ul>
                                </div>
                            </div>
                            <Divider />
                            <div className="my-4">
                                <div className="mb-4">
                                    <h2 className="text-2xl">Intentos de la prueba</h2>
                                </div>
                                <div>
                                    <ul className="list-disc ml-8">
                                        <li>Presione el botón Empezar para iniciar el examen</li>
                                        <li>El tiempo comenzará en el momento en que haga click en el botón de inicio</li>
                                        <li>No puede reanudar este cuestionario si se interrumpe por algún motivo</li>
                                        <li>Desplácese hacia abajo para pasar a la siguiente pregunta</li>
                                        <li>Haga click en el botón enviar cuestionario al finalizar el cuestionario</li>
                                        <li>El informe de la prueba se genera automáticamente en forma de copia PDF</li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <Button variant="contained" onClick={() => handleStartExam(data.id!)} color="primary">Iniciar prueba</Button>
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    );
}
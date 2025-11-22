import { Button, Divider } from "@mui/material";
import QuizIcon from '@mui/icons-material/Quiz';
import { ModalSaveExamForm } from "../components/modal/ModalSaveExamForm";
import { Link } from "react-router";
import { ModalEditExamForm } from "../components/modal/ModalEditExamForm";
import { useFetchExams } from "../hooks/useFetchExams";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useDeleteExam } from "../hooks";

export const ExamList = () => {
    const { fetchExams, data, isLoading } = useFetchExams();
    const { deleteExam, isLoading: deleteIsLoading } = useDeleteExam();

    const handleDeleteExam = (id: number) => {
        Swal.fire({
            title: "Eliminar cuestionario",
            text: "¿Está seguro de que quiere eliminar el cuestionario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Confirmar",
            topLayer: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteExam(id);
                    toast.success("Cuestionario eliminada!");
                    await fetchExams();
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    toast.error(errorMessage);
                }
            }
        });
    }

    return (
        <div>
            <div className="mb-4 flex justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Todos los cuestionarios</h1>
                </div>
                <div>
                    <ModalSaveExamForm fetch={fetchExams} />
                </div>
            </div>
            <div>
                {
                    isLoading || !data ?
                        (
                            <h2>Extrayendo datos...</h2>
                        )
                        :
                        (
                            <div className="py-4 px-6 border border-gray-300 shadow-xl rounded-2xl">
                                {
                                    data.map(exam =>
                                        <div key={exam.id} className="mb-4">
                                            <div className="mb-4">
                                                <div className="flex items-center mb-4">
                                                    <div className="mr-4">
                                                        <QuizIcon sx={{ fontSize: "4rem" }} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold">{exam.title}</h3>
                                                        <p>{exam.category?.title}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex items-center">
                                                        <div className="mr-4">
                                                            <Link to={`/quizzes/view-questions/${exam.id}/${exam.title}`} >
                                                                <Button variant="contained" color="primary" >Preguntas</Button>
                                                            </Link>
                                                        </div>
                                                        <div className="mr-4">
                                                            <Button variant="outlined" color="primary" >Puntos máximos: {exam.maxPoints}</Button>
                                                        </div>
                                                        <div className="mr-4">
                                                            <Button variant="outlined" color="primary" >Max de Preguntas: {exam.quantityQuestions}</Button>
                                                        </div>
                                                        <div className="mr-4">
                                                            <ModalEditExamForm fetch={fetchExams} exam={exam} />
                                                        </div>
                                                        <div>
                                                            <div>
                                                                <Button variant="contained" color="info" size="small" sx={{ marginRight: 2 }}>Intentos</Button>
                                                                <Button type="button" onClick={() => handleDeleteExam(exam.id!)} variant="contained" disabled={deleteIsLoading} color="error" size="small">Eliminar</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Divider />
                                        </div>
                                    )
                                }
                            </div>
                        )
                }
            </div>
        </div>
    );
}
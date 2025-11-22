import { useParams } from "react-router";
import { Button, Divider } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ModalCreateQuestionForm } from "../../components/modals/ModalCreateQuestionForm";
import { ModalEditQuestionForm } from "../../components/modals/ModalEditQuestionForm";
import { toast } from "react-toastify";
import { useDeleteQuestion, useFetchQuestions } from "../../hooks";
import Swal from "sweetalert2";

export const QuestionList = () => {
    const { id, title } = useParams();
    const { fetchQuestions, data, isLoading: fetchIsLoading } = useFetchQuestions(parseInt(id!));
    const { deleteQuestion, isLoading: deleteIsLoading } = useDeleteQuestion();

    const handleDeleteQuestion = (idQuestion: number) => {
        Swal.fire({
            title: "Eliminar pregunta",
            text: "¿Está seguro de que quiere eliminar la pregunta?",
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
                    await deleteQuestion(idQuestion);
                    toast.success("Pregunta eliminada!");
                    await fetchQuestions(parseInt(id!));
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
                    <h1 className="text-3xl font-bold">Preguntas de {title}</h1>
                </div>
                <div>
                    <ModalCreateQuestionForm fetch={fetchQuestions} idExam={parseInt(id!)} />
                </div>
            </div>
            <div>
                {
                    fetchIsLoading || !data ?
                        (
                            <h2>Extrayendo datos...</h2>
                        ) :
                        data.length > 0 ?
                            (
                                <div className="py-4 px-6 border border-gray-300 shadow-xl rounded-2xl">
                                    {
                                        data.map((question, index) =>
                                            <div key={question.id}>
                                                <div className="my-4">
                                                    <h3 className="text-xl"><span className="font-bold">{index + 1})</span> {question.content}</h3>
                                                </div>
                                                <div className="mb-3">
                                                    {
                                                        question.optionOne === question.correctAnswer ?
                                                            (
                                                                <div className="flex justify-between border border-green-700 text-green-700 shadow-lg rounded-2xl py-3 px-5 my-4">
                                                                    <p>
                                                                        {question.optionOne}
                                                                    </p>
                                                                    <div>
                                                                        <CheckCircleIcon color="success" />
                                                                    </div>
                                                                </div>
                                                            ) :
                                                            (
                                                                <div className="border border-gray-500 shadow-lg rounded-2xl py-3 px-5 my-4">
                                                                    <p>
                                                                        {question.optionOne}
                                                                    </p>
                                                                </div>
                                                            )
                                                    }
                                                    {
                                                        question.optionTwo === question.correctAnswer ?
                                                            (
                                                                <div className="flex justify-between border border-green-700 text-green-700 shadow-lg rounded-2xl py-3 px-5 my-4">
                                                                    <p>
                                                                        {question.optionTwo}
                                                                    </p>
                                                                    <div>
                                                                        <CheckCircleIcon color="success" />
                                                                    </div>
                                                                </div>
                                                            ) :
                                                            (
                                                                <div className="border border-gray-500 shadow-lg rounded-2xl py-3 px-5 my-4">
                                                                    <p>
                                                                        {question.optionTwo}
                                                                    </p>
                                                                </div>
                                                            )
                                                    }
                                                    {
                                                        question.optionThree ?
                                                            (
                                                                question.optionThree === question.correctAnswer ?
                                                                    (
                                                                        <div className="flex justify-between border border-green-700 text-green-700 shadow-lg rounded-2xl py-3 px-5 my-4">
                                                                            <p>
                                                                                {question.optionThree}
                                                                            </p>
                                                                            <div>
                                                                                <CheckCircleIcon color="success" />
                                                                            </div>
                                                                        </div>
                                                                    ) :
                                                                    (
                                                                        <div className="border border-gray-500 shadow-lg rounded-2xl py-3 px-5 my-4">
                                                                            <p>
                                                                                {question.optionThree}
                                                                            </p>
                                                                        </div>
                                                                    )
                                                            ) : undefined
                                                    }
                                                    {
                                                        question.optionFour ?
                                                            (
                                                                question.optionFour === question.correctAnswer ?
                                                                    (
                                                                        <div className="flex justify-between border border-green-700 text-green-700 shadow-lg rounded-2xl py-3 px-5 my-4">
                                                                            <p>
                                                                                {question.optionFour}
                                                                            </p>
                                                                            <div>
                                                                                <CheckCircleIcon color="success" />
                                                                            </div>
                                                                        </div>
                                                                    ) :
                                                                    (
                                                                        <div className="border border-gray-500 shadow-lg rounded-2xl py-3 px-5 my-4">
                                                                            <p>
                                                                                {question.optionFour}
                                                                            </p>
                                                                        </div>
                                                                    )
                                                            ) : undefined
                                                    }
                                                </div>
                                                <div className="my-4 flex">
                                                    <Button disabled={deleteIsLoading} variant="contained" onClick={() => handleDeleteQuestion(question.id!)} color="error" sx={{ marginRight: 2 }}>Eliminar</Button>
                                                    <ModalEditQuestionForm fetch={fetchQuestions} question={question} />
                                                </div>
                                                <Divider />
                                            </div>
                                        )
                                    }
                                </div>
                            ) :
                            (
                                <h3 className="text-xl">No hay preguntas en el cuestionario.</h3>
                            )
                }
            </div>
        </div>
    );
}
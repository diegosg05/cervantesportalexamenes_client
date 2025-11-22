import { Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Toolbar } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useFetchExam } from "../../../features/Exam/ui/hooks/useFetchExam";
import { useFetchQuestions } from "../../../features/Question/ui/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState, type ChangeEvent } from "react";
import { useSendAnswers } from "../../../features/Question/ui/hooks/useSendAnswers";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeExam } from "../../../features/Exam/slices/examSlice";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Results } from "../../../components/PDF/Results";

export const StartExam = () => {

    const formatNumber = (numero: number) => {
        return numero.toString().padStart(2, '0');
    }

    const { id: idExam } = useParams();

    const { data: exam, isLoading: examIsLoading } = useFetchExam(parseInt(idExam!));

    const [showExamResults, setShowExamResults] = useState(false);

    const { data: questions, isLoading: questionIsLoading } = useFetchQuestions(parseInt(idExam!));

    const [myAnswers, setMyAnswers] = useState<{ id: number, givenCorrect: string }[]>([]);

    const { handleSubmit, setValue } = useForm<{ answers: { id: number, givenCorrect: string }[] }>();

    const { sendAnswers } = useSendAnswers();

    const [examResults, setExamResults] = useState<{ maxPoints: number, correctAnswers: number, attempts: number } | null>(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleAnswers = (event: ChangeEvent<HTMLInputElement>, idQuestion: number, index: number) => {
        setMyAnswers((myAnswers) => {
            const answer = {
                id: idQuestion,
                givenCorrect: event.target.value
            }
            myAnswers[index] = answer;
            return [...myAnswers];
        })

        setValue("answers", myAnswers);
    }

    const handleSendExam: SubmitHandler<{ answers: { id: number, givenCorrect: string }[] }> = (data) => {

        const idQuestions = questions!.map((question) => question.id!);

        if (!data || !data.answers) {
            const newAnswers = idQuestions.map((idQuestion) => ({ id: idQuestion, givenCorrect: "" }));
            const newData: { answers: { id: number, givenCorrect: string }[] } = {
                answers: newAnswers
            }

            data = { ...newData };
        }


        idQuestions.forEach((idQuestion, index) => {
            if (!myAnswers[index]) {
                myAnswers[index] = { id: idQuestion, givenCorrect: "" };
            }
        });

        const newData: { answers: { id: number, givenCorrect: string }[] } = {
            answers: myAnswers
        }

        data = { ...newData };


        Swal.fire({
            title: "Enviar cuestionario",
            text: "¿Está seguro de que quiere enviar el cuestionario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
            confirmButtonText: "Enviar",
            topLayer: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const results = await sendAnswers(data);
                    toast.success("Examen enviado!");
                    setShowExamResults(true);
                    setExamResults(results);
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    toast.error(errorMessage);
                }
            }
        });
    }

    const handleAutoSend = () => {
        handleAutoSendExam();
    }

    const handleAutoSendExam = async () => {

        let data = {
            answers: myAnswers
        }

        const idQuestions = questions!.map((question) => question.id!);

        if (!data.answers) {
            const newAnswers = idQuestions.map((idQuestion) => ({ id: idQuestion, givenCorrect: "" }));
            const newData: { answers: { id: number, givenCorrect: string }[] } = {
                answers: newAnswers
            }

            data = { ...newData };
        }

        idQuestions.forEach((idQuestion, index) => {
            if (!myAnswers[index]) {
                myAnswers[index] = { id: idQuestion, givenCorrect: "" };
            }
        });

        const newData: { answers: { id: number, givenCorrect: string }[] } = {
            answers: myAnswers
        }

        data = { ...newData };

        try {
            const results = await sendAnswers(data);
            toast.success("Examen enviado!");
            setShowExamResults(true);
            setExamResults(results);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            toast.error(errorMessage);
        }
    }

    const handleNavigationPlatform = () => {
        dispatch(removeExam());
        navigate("/platform-exam");
    }

    return (
        !showExamResults ?
            <div>
                <Toolbar />
                <Toolbar />
                <div className="flex justify-evenly gap-20 mx-50">
                    <div className="flex-1">
                        <div>
                            <div className="px-10 py-5 pb-8 border border-gray-300">
                                <h3 className="text-lg font-semibold my-2">Instrucciones</h3>
                                <div>
                                    <ul className="list-disc ml-4">
                                        <li>No actualice la página</li>
                                        <li>No cambies de pestaña</li>
                                        <li>No minimices la ventana</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-2">
                        <div>
                            <form onSubmit={handleSubmit(handleSendExam)}>
                                {
                                    examIsLoading || !exam ?
                                        (
                                            <h2>Extrayendo examen...</h2>
                                        ) :
                                        (
                                            <div>
                                                <div>

                                                    <h2 className="text-3xl mb-8">En curso <span className="font-bold">{exam?.title}</span></h2>
                                                    {
                                                        questionIsLoading || !questions ?
                                                            (
                                                                <h2>Extrayendo preguntas del examen...</h2>
                                                            ) :
                                                            questions.map((question, index) =>
                                                                <div key={index} className="my-3 py-5 px-10 border border-gray-200 shadow-2xl rounded-2xl">
                                                                    <div className="mb-4">
                                                                        <p className="text-xl"><span className="font-bold">{index + 1})</span> {question.content}</p>
                                                                    </div>
                                                                    <Divider />
                                                                    <div className="mt-4">
                                                                        <FormControl>
                                                                            <FormLabel id="demo-radio-buttons-group-label">Seleccione la respuesta</FormLabel>
                                                                            <RadioGroup
                                                                                aria-labelledby="demo-radio-buttons-group-label"
                                                                                onChange={(e) => handleAnswers(e, question.id!, index)}
                                                                                name="radio-buttons-group"
                                                                            >
                                                                                <FormControlLabel value={question.optionOne} control={<Radio />} label={question.optionOne} />
                                                                                <FormControlLabel value={question.optionTwo} control={<Radio />} label={question.optionTwo} />
                                                                                {
                                                                                    question.optionThree ?
                                                                                        (
                                                                                            <FormControlLabel value={question.optionThree} control={<Radio />} label={question.optionThree} />
                                                                                        ) : undefined
                                                                                }
                                                                                {
                                                                                    question.optionFour ?
                                                                                        (
                                                                                            <FormControlLabel value={question.optionFour} control={<Radio />} label={question.optionFour} />
                                                                                        ) : undefined
                                                                                }
                                                                            </RadioGroup>
                                                                        </FormControl>
                                                                    </div>
                                                                </div>
                                                            )
                                                    }
                                                </div>
                                                <div className="text-center mt-10">
                                                    <Button type="submit" variant="contained" color="primary" >Enviar cuestionario</Button>
                                                </div>
                                            </div>
                                        )
                                }
                            </form>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="px-10 py-5 pb-8 border border-gray-300">
                            <div className="mb-4">
                                <p className="text-xl">Temporizador</p>
                            </div>
                            <div>
                                <p className="text-justify mb-4">El cuestionario se enviará automáticamente cuando el temporizador llegue a 0</p>
                                <div>
                                    <CountdownCircleTimer
                                        isPlaying
                                        duration={120}
                                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                        colorsTime={[7, 5, 2, 0]}
                                        onComplete={handleAutoSend}
                                    >
                                        {({ remainingTime }) => {
                                            const minutes = formatNumber(Math.floor(remainingTime / 60));
                                            const seconds = formatNumber(remainingTime % 60);
                                            const time = `${minutes}:${seconds}`;

                                            return (
                                                <div className="text-3xl text-blue-600">
                                                    {time}
                                                </div>
                                            )
                                        }}
                                    </CountdownCircleTimer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            :

            <div>
                <Toolbar />
                <Toolbar />
                <div className="flex justify-center">
                    <div className="px-10 py-5 pb-8 border min-w-xl border-gray-300 text-center">
                        <div className="mb-4">
                            <h2 className="text-3xl uppercase my-4">Resultados de la prueba</h2>
                        </div>
                        <div>
                            <Button variant="outlined" color="primary" size="large" sx={{ my: 2 }}>Nota final: {examResults?.maxPoints}</Button>
                        </div>
                        <div>
                            <Button variant="outlined" color="success" size="large" sx={{ mb: 4 }}>Respuestas correctas: {examResults?.correctAnswers}</Button>
                        </div>
                        <div>
                            <div>
                                <PDFDownloadLink document={<Results nota={examResults!.maxPoints} correctAnswers={examResults!.correctAnswers} titleExam={exam!.title} />} fileName="Resultados Prueba Examen.pdf">
                                    {
                                        ({ loading: load }) => load ?
                                            <Button variant="contained" color="primary" size="large" sx={{ mr: 4 }}>Cargando documento...</Button> :
                                            <Button variant="contained" color="primary" size="large" sx={{ mr: 4 }}>Descargar Resultados</Button>
                                    }
                                </PDFDownloadLink>
                                <Button variant="contained" onClick={handleNavigationPlatform} color="secondary" size="large" >Inicio</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    );
}
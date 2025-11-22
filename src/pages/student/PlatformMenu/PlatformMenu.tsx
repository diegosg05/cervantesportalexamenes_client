import { CardExam } from "../../../features/Exam/ui/components/card/CardExam";
import { useFetchEnabledExams } from "../../../features/Exam/ui/hooks/useFetchEnabledExams";

export const PlatformMenu = () => {
    const { data, isLoading } = useFetchEnabledExams();

    return (
        <div>
            <div className="mb-4 flex justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Cuestionarios</h1>
                </div>
            </div>
            <div>
                <div className="grid grid-cols-2 gap-4">
                    {
                        isLoading || !data ?
                            (
                                <h2>Extrayendo datos...</h2>
                            ) :
                            data.length > 0 ?
                                data.map((exam, index) =>
                                    <CardExam key={index} exam={exam} />
                                ) :
                                (
                                    <h2 className="text-xl">No hay cuestionarios aún</h2>
                                )
                    }
                </div>
            </div>
        </div>
    );
}
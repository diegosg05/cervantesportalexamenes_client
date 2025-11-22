import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Exam } from '../../../domain/models/Exam';
import QuizIcon from '@mui/icons-material/Quiz';
import { useNavigate } from 'react-router';

export const CardExam = ({ exam }: { exam: Exam }) => {

    const navigate = useNavigate();

    const handleViewExam = (id: number) => {
        navigate(`/platform-exam/exam/${id}/instructions`);
    }

    return (
        <Card sx={{ minWidth: 200, pb: 2, px: 3 }} >
            <CardContent>
                <div className='flex items-center mb-4'>
                    <div>
                        <QuizIcon sx={{ fontSize: '3.5rem', marginRight: 2 }} />
                    </div>
                    <div>
                        <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 23 }}>
                            {exam.title}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5, fontSize: 18 }}>{exam.category.title}</Typography>
                    </div>
                </div>
                <Typography variant="body1">
                    {exam.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant='contained' color='primary' onClick={() => handleViewExam(exam.id!)} size="small" sx={{ marginRight: 2 }}>Ver cuestionario</Button>
                <Button variant='outlined' color='success' size='small'>
                    <p>Puntaje máximo: {exam.maxPoints}</p>
                </Button>
            </CardActions>
        </Card>
    );
}

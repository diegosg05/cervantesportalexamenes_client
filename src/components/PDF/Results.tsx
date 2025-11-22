import { Page, Text, Document, StyleSheet, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: '2rem'
    },
    title: {
        textAlign: 'center',
        fontSize: '25px',
        padding: '10px',
        backgroundColor: '#1977dc',
        color: '#fff'
    },
    subtitle: {
        textAlign: 'center',
        padding: '10px',
        fontSize: '18px',
    },
    text: {
        textAlign: 'center',
        color: '#1977dc',
        fontSize: '15px',
        margin: '8px 0',
    },
    divResults: {
        border: '2px solid #1977dc',
        padding: '10px',
    }
});

export const Results = ({ nota, correctAnswers, titleExam }: { nota: number, correctAnswers: number, titleExam: string }) => {
    return (
        <Document>
            <Page>
                <View>
                    <Text style={styles.title}>Portal Examenes - Cervantes</Text>
                </View>
                <View>
                    <View>
                        <View>
                            <Text style={styles.subtitle}>Resultados de la prueba {titleExam}</Text>
                            <View style={styles.divResults}>
                                <Text style={styles.text} >Nota final: {nota}</Text>
                                <Text style={styles.text} >Respuestas correctas: {correctAnswers}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}
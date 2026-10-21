import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CardJogo from '../components/CardJogo';
import dados from '../src/dados';

export default function Home({ navigation }) {
    const jogosDestaque = dados.filter(jogo => jogo.destaque); {/*Acho que e o melhor jeito de separar o que e destaque do que nao e*/}
    const outrosJogos = dados.filter(jogo => !jogo.destaque);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.nomeLoja}>Best Games</Text>
            </View>
            <ScrollView style={styles.conteudo}>                   {/*Preferi usar ScrollView, espero que nao tenha problemas*/}
                <Text style={styles.destaquesText}>Em Destaque</Text>
                <View style={styles.destaques}>
                    {jogosDestaque.map(jogo => (
                        <CardJogo
                            key={jogo.id}
                            titulo={jogo.titulo}
                            descricao={jogo.descricao}
                            preco={jogo.preco}
                            imagem={jogo.imagemCapa}
                            destaque={jogo.destaque}
                            onPress={() => navigation.navigate('Jogo', { jogo })}
                        />
                    ))}
                </View>
                <Text style={styles.destaquesText}>Todos os jogos</Text>
                <View style={styles.grade}>
                    {outrosJogos.map(jogo => (
                        <View key={jogo.id} style={styles.itemGrade}>
                            <CardJogo
                                titulo={jogo.titulo}
                                preco={jogo.preco}
                                imagem={jogo.imagemCapa}
                                descricao={jogo.descricao}
                                destaque={jogo.destaque}
                                onPress={() => navigation.navigate('Jogo', { jogo })}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    header: {
        backgroundColor: '#1e293b',
        paddingHorizontal: 32,
        paddingVertical: 32,
    },
    nomeLoja: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '700',
    },
    conteudo: {
        padding: 24,
        paddingBottom: 0,
    },
    destaques: {
        alignItems: 'center',
    },
    destaquesText: {
        padding: 15,
        marginBottom: 20,
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
    },
    grade: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemGrade: {
        width: '50%',
        alignItems: 'center',
    },
});
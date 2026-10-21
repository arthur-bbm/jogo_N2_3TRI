import { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, Switch, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Pesquisei essa biblioteca para colocar o icone de lua que tem no exemplo
import { useFocusEffect } from '@react-navigation/native';
import CardJogo from '../components/CardJogo';
import { carregarConfiguracoesPerfil, carregarWishlist, salvarConfiguracoesPerfil } from '../src/dao/AsyncStorage';

export default function Perfil({ navigation }) {
    const [nickname, setNickname] = useState('');
    const [notificacoesAtivas, setNotificacoesAtivas] = useState(false);
    const [modoClaro, setModoClaro] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [carregandoWishlist, setCarregandoWishlist] = useState(true);

    useEffect(() => {
        carregarConfiguracoesPerfil()
            .then(configuracoes => {
                if (!configuracoes) return;

                if (typeof configuracoes.nickname === 'string') setNickname(configuracoes.nickname);
                if (typeof configuracoes.notificacoesAtivas === 'boolean') setNotificacoesAtivas(configuracoes.notificacoesAtivas);
                if (typeof configuracoes.modoClaro === 'boolean') setModoClaro(configuracoes.modoClaro);
            })
            .catch(() => {
                Alert.alert('Erro', 'Não foi possível carregar as configurações salvas.');
            });
    }, []);

    useFocusEffect(
        useCallback(() => {
            let ativo = true;
            setCarregandoWishlist(true);

            carregarWishlist()
                .then(jogos => {
                    if (ativo) setWishlist(jogos);
                })
                .catch(() => {
                    if (ativo) Alert.alert('Erro', 'Não foi possível carregar a wishlist.');
                })
                .finally(() => {
                    if (ativo) setCarregandoWishlist(false);
                });

            return () => {
                ativo = false;
            };
        }, [])
    );

    async function salvarConfiguracoes() {
        setSalvando(true);
        try {
            await salvarConfiguracoesPerfil({ nickname, notificacoesAtivas, modoClaro });
            Alert.alert('Configurações salvas', 'Suas alterações foram salvas com sucesso.');
        } catch {
            Alert.alert('Erro', 'Não foi possível salvar as configurações.');
        } finally {
            setSalvando(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.nomeLoja}>Best Games</Text>
            </View>
            <ScrollView style={styles.conteudo}>
                <Text style={styles.titulo}>Meu Perfil</Text>
                <View style={styles.card}>
                    <View style={styles.configuracoes}>
                        <Text style={styles.tituloCard}>CONFIGURACOES</Text>
                        <Text style={styles.tituloInput}>Nome do Jogador (Nickname)</Text>
                        {/*No placeholder, eu botei operador ternario para mostrar o nickname ja salvo se a pessoa ja tiver um*/}
                        <TextInput
                            style={styles.input}
                            placeholder={nickname ? nickname : 'Digite seu nickname'}
                            placeholderTextColor="#94a3b8"
                            value={nickname}
                            onChangeText={setNickname}
                            />
                        <View style={styles.opcao}>
                            <Text style={styles.textoOpcao}>Notificações</Text>
                            <Switch
                                value={notificacoesAtivas}
                                onValueChange={setNotificacoesAtivas}
                                trackColor={{ false: '#64748b', true: '#10af7b' }}
                                thumbColor="#fff"
                            />
                        </View>
                        <View style={styles.opcao}>
                            <View style={styles.rotuloModo}>
                                <Ionicons name="moon" size={20} color="#cbd5e1" />      {/*Icone de lua que eu achei legal*/}
                                <Text style={styles.textoOpcao}>Modo Escuro</Text>
                            </View>
                            <Switch
                                value={modoClaro}
                                onValueChange={setModoClaro}
                                trackColor={{ false: '#64748b', true: '#10af7b' }}
                                thumbColor="#fff"
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.botao}
                            onPress={salvarConfiguracoes}
                            disabled={salvando}
                        >
                            <Text style={styles.textoBotao}>Salvar Configurações</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.titulo}>Minha Wishlist</Text>
                    <View style={styles.grade}>
                        {wishlist.map(jogo => (
                            <View key={jogo.id} style={styles.itemGrade}>
                                <CardJogo
                                    titulo={jogo.titulo}
                                    preco={jogo.preco}
                                    imagem={jogo.imagemCapa}
                                    descricao={jogo.descricao}
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
        paddingBottom: 12,
    },
    titulo: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        padding: 30,
    },
    card: {
        alignItems: 'center',
    },
    configuracoes: {
        justifyContent: 'center',
        backgroundColor: '#1e293b',
        width: '80%',
        borderRadius: 8,
        padding: 20,
        
    },
    tituloCard: {
        color: '#10af7b',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tituloInput: {
        color: '#94a3b8',
        fontSize: 12,
        fontWeight: 'bold',
        padding: 6,
    },
    input: {
        alignSelf: 'stretch',
        height: 44,
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 12,
        color: '#fff',
    },
    opcao: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    textoOpcao: {
        color: '#fff',
        fontSize: 16,
        flexShrink: 1,
        marginRight: 12,
    },
    rotuloModo: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1,
        gap: 8,
    },
    botao: {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#10af7b',
        borderRadius: 5,
        padding: 14,
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
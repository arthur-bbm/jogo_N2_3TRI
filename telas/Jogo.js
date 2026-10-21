import { useEffect, useState } from 'react';
import { Alert, Image, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { adicionarWishlist, carregarWishlist, removerWishlist } from '../src/dao/AsyncStorage';

export default function Jogo({ route }) {
  const jogo = route.params.jogo;
  const { titulo, genero, preco, imagemCapa, descricao } = jogo;
  const [naWishlist, setNaWishlist] = useState(false);
  const [carregandoWishlist, setCarregandoWishlist] = useState(true);
  const [salvandoWishlist, setSalvandoWishlist] = useState(false);

  useEffect(() => {   //Carrega a wishlist toda vez que tem uma alteracao nela
    carregarWishlist() 
      .then(wishlist => {
        setNaWishlist(wishlist.some(jogoSalvo => jogoSalvo.id === jogo.id));
      })
      .catch(() => {
        Alert.alert('Erro', 'Nao foi possivel carregar a wishlist.');
      })
      .finally(() => {
        setCarregandoWishlist(false);
      });
  }, [jogo.id]);

  async function alternarWishlist() {
    setSalvandoWishlist(true);
    try {
      if (naWishlist) {
        await removerWishlist(jogo.id);
        setNaWishlist(false);
      } else {
        await adicionarWishlist(jogo);
        setNaWishlist(true);
      }
    } catch {
      Alert.alert('Erro', 'Nao foi possivel atualizar a wishlist.');
    } finally {
      setSalvandoWishlist(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: imagemCapa }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.genre}>{genero}</Text>
      <Text style={styles.description}>{descricao}</Text>
      <Text style={styles.price}>R${preco}</Text>
      <TouchableOpacity
        style={[ styles.wishlistButton, naWishlist && styles.removeWishlistButton ]}
        onPress={alternarWishlist}
        disabled={carregandoWishlist || salvandoWishlist}
      >
        <Text style={styles.wishlistButtonText}>
          {naWishlist? 'Remover da wishlist' : 'Adicionar à wishlist'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 24,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  genre: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 16,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  price: {
    color: '#10af7b',
    fontSize: 18,
    fontWeight: '700',
    paddingBottom: 40,
  },
  wishlistButton: {
    alignItems: 'center',
    backgroundColor: '#10af7b',
    borderRadius: 8,
    padding: 14,
  },
  removeWishlistButton: {
    backgroundColor: '#b91c1c',
  },
  disabledButton: {
    opacity: 0.6,
  },
  wishlistButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
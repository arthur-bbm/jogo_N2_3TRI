import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function CardJogo({ titulo, preco, imagem, descricao, destaque, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: imagem }} style={styles.image} resizeMode="cover" />
      <View style={styles.details}>
        <Text style={styles.text}>{titulo}</Text>
        {destaque && <Text style={styles.descricao}>{descricao}</Text>}
        <Text style={styles.preco}>R${preco}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    width: '90%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  details: {
    alignSelf: 'stretch',
    padding: 16,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  preco: {
    color: '#10af7b',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  descricao: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 8,
  },
});

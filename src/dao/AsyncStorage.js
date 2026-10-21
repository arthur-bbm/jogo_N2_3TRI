import AsyncStorage from '@react-native-async-storage/async-storage';

const CONFIGURACOES_KEY = '@best-games/configuracoes-perfil';
const WISHLIST_KEY = '@best-games/wishlist';

export async function carregarConfiguracoesPerfil() {
    const configuracoesSalvas = await AsyncStorage.getItem(CONFIGURACOES_KEY);
    if (!configuracoesSalvas) return null;

    const configuracoes = JSON.parse(configuracoesSalvas);
    if (!configuracoes || typeof configuracoes !== 'object' || Array.isArray(configuracoes)) { //Se as configs nao voltarem como objeto , forem nulas ou voltarem como array, manda erro
        throw new Error('As configuracoes salvas possuem formato invalido.');
    }

    return configuracoes;
}

export async function salvarConfiguracoesPerfil(configuracoes) {
    await AsyncStorage.setItem(CONFIGURACOES_KEY, JSON.stringify(configuracoes));
}

export async function carregarWishlist() {
    const wishlistSalva = await AsyncStorage.getItem(WISHLIST_KEY);
    if (!wishlistSalva) return [];

    const wishlist = JSON.parse(wishlistSalva);
    if (
        !Array.isArray(wishlist) || wishlist.some(jogo => !jogo || typeof jogo !== 'object' || jogo.id == null) //Se a wishlist nao for um array ou se algum jogo e null ou undefined ou algum jogo nao for um objeto ou nao tiver id, manda erro
    ) {
        throw new Error('A wishlist salva possui formato invalido.');
    }

    return wishlist;
}

export async function adicionarWishlist(jogo) {
    if (!jogo || typeof jogo !== 'object' || jogo.id == null) {
        throw new Error('O jogo informado e invalido.');
    }

    const wishlist = await carregarWishlist();
    if (wishlist.some(jogoSalvo => jogoSalvo.id === jogo.id)) return false;

    await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify([...wishlist, jogo]));
    return true;
}

export async function removerWishlist(idJogo) {
    const wishlist = await carregarWishlist();
    const wishlistAtualizada = wishlist.filter(jogo => jogo.id !== idJogo);

    if (wishlistAtualizada.length === wishlist.length) return false;

    await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistAtualizada));
    return true;
}
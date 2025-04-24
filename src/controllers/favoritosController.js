const { getCache, setCache } = require('../cache');
const { buscarMusicaNaApiMusicas } = require('../services/apiMusicasService');
const { salvarFavorito, buscarFavoritos } = require('../models/favoritosModel');

const adicionarFavorito = async (req, res) => {
  const { user_id, musica_id } = req.body;

  // 1. Busca música na API de Músicas (com cache)
  const musica = await buscarMusicaNaApiMusicas(musica_id);
  if (!musica) return res.status(404).json({ erro: 'Música não encontrada' });

  // 2. Salva no PostgreSQL
  await salvarFavorito(user_id, musica_id);

  // 3. Invalida cache de favoritos do usuário
  await setCache(`favoritos:${user_id}`, null);

  res.status(201).json({ mensagem: 'Música adicionada aos favoritos!' });
};

const listarFavoritos = async (req, res) => {
  const { user_id } = req.params;

  // 1. Verifica cache
  const cached = await getCache(`favoritos:${user_id}`);
  if (cached) return res.json(JSON.parse(cached));

  // 2. Busca no banco de dados
  const favoritos = await buscarFavoritos(user_id);

  // 3. Atualiza cache (expira em 1h)
  await setCache(`favoritos:${user_id}`, JSON.stringify(favoritos), 3600);

  res.json(favoritos);
};

module.exports = { adicionarFavorito, listarFavoritos };
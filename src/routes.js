const express = require('express');
const router = express.Router();
const { 
  adicionarFavorito, 
  listarFavoritos 
} = require('./controllers/favoritosController');

router.post('/favoritos', adicionarFavorito);
router.get('/favoritos/:user_id', listarFavoritos);

module.exports = router;
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`API Favoritos rodando na porta ${PORT}`);
});
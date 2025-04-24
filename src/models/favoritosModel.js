const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DB_PATH);

// Cria a tabela (se não existir)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS favoritos (
      user_id TEXT NOT NULL,
      musica_id TEXT NOT NULL,
      data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

const salvarFavorito = (user_id, musica_id) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO favoritos (user_id, musica_id) VALUES (?, ?)',
      [user_id, musica_id],
      (err) => (err ? reject(err) : resolve())
    );
  });
};

const buscarFavoritos = (user_id) => {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT musica_id FROM favoritos WHERE user_id = ? ORDER BY data_adicao DESC',
      [user_id],
      (err, rows) => (err ? reject(err) : resolve(rows))
    );
  });
};

module.exports = { salvarFavorito, buscarFavoritos };
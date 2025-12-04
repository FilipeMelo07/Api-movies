const express = require('express');
const { openDb } = require('./database'); 

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

async function getDbConnection() {
  return openDb(); 
}

app.get('/api/filmes', async (req, res) => {
  try {
    const db = await getDbConnection();
    const filmes = await db.all('SELECT * FROM filmes');
    await db.close();
    res.status(200).json(filmes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/filmes', async (req, res) => {
  const { titulo, ano } = req.body;

  if (!titulo || !ano) {
    return res.status(400).json({ error: 'Título e ano são obrigatórios' });
  }

  try {
    const db = await getDbConnection();
    const result = await db.run(
      'INSERT INTO filmes (titulo, ano) VALUES (?, ?)',
      [titulo, ano]
    );

    const novoFilme = { id: result.lastID, titulo, ano };
    await db.close();

    res.status(201).json(novoFilme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/filmes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const db = await getDbConnection();

    const filme = await db.get('SELECT * FROM filmes WHERE id = ?', [id]);

    if (!filme) {
      await db.close();
      return res.status(404).json({ error: 'Filme não encontrado' });
    }

    await db.run('DELETE FROM filmes WHERE id = ?', [id]);
    await db.close();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;

/* istanbul ignore next */
if (require.main === module) {
  // Inicializa o banco ANTES de subir o servidor
  setup()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
      });
    })
    .catch(err => {
      console.error('Erro ao inicializar banco:', err);
      process.exit(1);
    });
}

const { setup } = require('./database');

/* istanbul ignore next */
if (require.main === module) {
  setup()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
      });
    })
    .catch(err => {
      console.error('Erro ao inicializar banco:', err);
      process.exit(1);
    });
}


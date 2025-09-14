const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());


async function getDbConnection() {
    return open({
        filename: './database.db',
        driver: sqlite3.Database
    });
}

app.get('/api/filmes', async (req, res) => {
    try {
        const db = await getDbConnection();
        // Executa a query para selecionar todos os filmes
        const filmes = await db.all('SELECT * FROM filmes');
        await db.close();
        res.status(200).json(filmes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// NOVA ROTA: Rota POST para inserir um filme no banco de dados
app.post('/api/filmes', async (req, res) => {
    const { titulo, ano } = req.body; // Pega os dados do corpo da requisição

    if (!titulo || !ano) {
        return res.status(400).json({ error: 'Título e ano são obrigatórios' });
    }

    try {
        const db = await getDbConnection();
        // O '?' previne SQL Injection
        const result = await db.run('INSERT INTO filmes (titulo, ano) VALUES (?, ?)', [titulo, ano]);
        
        // Retorna o filme recém-criado
        const novoFilme = { id: result.lastID, titulo, ano };
        await db.close();
        
        res.status(201).json(novoFilme);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
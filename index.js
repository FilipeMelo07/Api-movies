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


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
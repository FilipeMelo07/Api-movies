const request = require('supertest');
const app = require('./index'); 
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

let db; // Variável para segurar a conexão do banco

// Abre a conexão com o banco ANTES de todos os testes
beforeAll(async () => {
    db = await open({
        filename: './database.db', // Garanta que é o mesmo banco
        driver: sqlite3.Database
    });
});

// Limpa a tabela ANTES DE CADA teste 'it()'
beforeEach(async () => {
    await db.exec('DELETE FROM filmes'); // Limpa a tabela
    await db.exec('DELETE FROM sqlite_sequence WHERE name="filmes"'); // Reseta o AUTOINCREMENT
});

// Fecha a conexão DEPOIS de todos os testes
afterAll(async () => {
    await db.close();
});

describe('Testes da API de Filmes', () => {

    // Teste para a rota GET
    it('GET /api/filmes - Deve retornar uma lista de filmes', async () => {
        const response = await request(app).get('/api/filmes');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    // Teste para a rota POST
    it('POST /api/filmes - Deve criar um novo filme', async () => {
        const filmeParaEnviar = {
            titulo: "Matrix",
            ano: 1999
        };

        const response = await request(app)
            .post('/api/filmes')
            .send(filmeParaEnviar);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.titulo).toBe(filmeParaEnviar.titulo);
        expect(response.body.ano).toBe(filmeParaEnviar.ano);
    });

    it('POST /api/filmes - Deve retornar 400 se o título ou ano estiverem faltando', async () => {
    const filmeIncompleto = {
        titulo: "Filme Sem Ano"
    };

    const response = await request(app)
        .post('/api/filmes')
        .send(filmeIncompleto);

    // Verifica se o status é 400
    expect(response.statusCode).toBe(400);
    // Verifica se a mensagem de erro está correta
    expect(response.body.error).toBe('Título e ano são obrigatórios');
});

    // ===================================
    // NOVOS TESTES PARA A ATIVIDADE 3
    // ===================================

    // Teste 1 (DELETE - Sucesso)
    it('DELETE /api/filmes/:id - Deve remover um filme e retornar 204', async () => {
        // 1. Criar um filme para poder deletar
        const filme = await db.run('INSERT INTO filmes (titulo, ano) VALUES (?, ?)', ['Interestelar', 2014]);
        const filmeId = filme.lastID;

        // 2. Tentar deletar o filme
        const response = await request(app).delete(`/api/filmes/${filmeId}`);

        // 3. Verificar a resposta
        expect(response.statusCode).toBe(204);

        // 4. (Opcional, mas bom) Verificar se o filme realmente sumiu do banco
        const filmeDeletado = await db.get('SELECT * FROM filmes WHERE id = ?', [filmeId]);
        expect(filmeDeletado).toBeUndefined();
    });

    // Teste 2 (DELETE - 404)
    it('DELETE /api/filmes/:id - Deve retornar 404 se o filme não existir', async () => {
        const idInexistente = 999;

        const response = await request(app).delete(`/api/filmes/${idInexistente}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Filme não encontrado');
    });
});
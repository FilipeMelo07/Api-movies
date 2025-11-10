
const request = require('supertest');
const app = require('./index'); 

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

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Título e ano são obrigatórios');
    });
});
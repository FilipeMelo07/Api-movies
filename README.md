# API de Filmes com Persistência em SQLite

Esta é uma API REST para gerenciar uma lista de filmes, desenvolvida com Node.js, Express e com persistência de dados em um banco de dados SQLite.

## Instruções de Execução

**Pré-requisitos:**
* Node.js
* npm

**1. Clone o repositório:**
```bash
git clone https://github.com/FilipeMelo07/Api-movies.git
cd Api-movies
```
**2. Instale as dependências:**
```bash
npm install
```

**3. Inicialize o Banco de Dados:**
Este comando criará o arquivo `database.db` com a tabela `filmes`. Execute-o apenas uma vez.
```bash
node database.js
```

**4. Inicie o servidor em modo de desenvolvimento:**
```bash
node index.js
```
A API estará disponível em [http://localhost:8080](http://localhost:8080).

## Endpoints da API

* **GET /api/filmes**: Retorna a lista de todos os filmes salvos no banco de dados.

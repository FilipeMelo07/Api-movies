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
* **POST /api/filmes**: Adiciona um novo filme ao banco de dados.
    * **Corpo da Requisição (JSON):**
        ```json
        {
            "titulo": "Interestelar",
            "ano": 2014
        }
        ```
    * **Resposta (201 Created):**
        ```json
        {
            "id": 1,
            "titulo": "Interestelar",
            "ano": 2014
        }
        ```

## Workflow de Desenvolvimento

O workflow de Git utilizado neste projeto foi o **GitHub Flow**.

**Motivo da escolha:**

O GitHub Flow é um workflow ágil e simplificado, ideal para projetos que buscam integração e entrega contínua. Ele foi escolhido por sua simplicidade e eficiência:

1.  **A branch `main` é sempre funcional:** Qualquer código na `main` está estável e pronto para produção.
2.  **Branches para cada tarefa:** Todo novo trabalho é feito em branches descritivas que partem da `main`.
3.  **Pull Requests para revisão:** As alterações são integradas à `main` através de Pull Requests, promovendo a revisão de código.
4.  **Deploy contínuo:** Após o merge na `main`, o código pode ser imediatamente enviado para produção.

Este fluxo garantiu que a adição da persistência com SQLite e a criação de cada rota fossem desenvolvidas de forma isolada, mantendo a `main` sempre estável.
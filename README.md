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

---

##  Imagem Docker

A imagem oficial deste projeto é construída e publicada automaticamente no Docker Hub.

[![Docker Pulls](https://badgen.net/docker/pulls/filipemelo07/api-movies?icon=docker&label=Pulls&color=blue)](https://hub.docker.com/r/filipemelo07/api-movies)

**Link do Repositório:** [https://hub.docker.com/r/filipemelo07/api-movies](https://hub.docker.com/r/filipemelo07/api-movies)


## Automação de deploy com Ansible

Esta atividade adiciona ao repositório um arquivo de configuração do Ansible e um playbook (`configura-node.yaml`) responsável por instalar e subir a API automaticamente em um ambiente Linux rodando em um container Docker.

### 1. Ambiente alvo (Docker)

- No Windows, foi criado um container Ubuntu com Docker Desktop, expondo:
  - Porta `2222` para SSH.
  - Porta `8080` para acesso HTTP à API.
- Dentro do container foram instalados:
  - `openssh-server`, `python3`, `curl`, `git`, `build-essential`.
  - Node.js 18 + npm.
  - PM2 para gerenciar o processo da API.
- O usuário `root` foi configurado com senha (`teste123`) e o SSH ajustado para permitir login por senha.

### 2. Configuração do Ansible (WSL)

- No WSL (Ubuntu), foi instalado o Ansible via `apt`.
- Foi criado o diretório `~/api-movies-ansible` para concentrar os arquivos de automação.
- Dentro desse diretório foram criados:
  - **`ansible.cfg`**  
    - Define o inventário padrão como `./hosts`.  
    - Desabilita `host_key_checking`.  
    - Configura `become` para uso de `sudo` nas tarefas.
  - **`hosts`**  
    - Define o host `local-docker` apontando para `localhost` na porta `2222`, com usuário `root` e senha `teste123`.  
    - Define variáveis, como:
      - `app_port=8080`
      - `node_version=18`
      - `app_env=development`.

### 3. Playbook `configura-node.yaml`

O playbook criado (`configura-node.yaml`) faz:

- Atualiza o cache do `apt` e instala pacotes básicos (`curl`, `git`, `build-essential`).
- Adiciona o repositório NodeSource e instala o Node.js 18.
- Instala o PM2 globalmente via `npm`.
- Cria o diretório da aplicação em `/app`.
- Clona o repositório da API (ex.: `Api-movies`) ou, se desejado, cria um `index.js` de exemplo com Express.
- Garante um `package.json` válido e instala as dependências da aplicação com `npm install`.
- Inicia a API com o PM2 sob o nome `minha-api` e salva o estado do PM2 para reinícios futuros.
- Tenta acessar a aplicação na porta configurada (8080) para validar o funcionamento.

### 4. Execução e testes

No WSL, dentro de `~/api-movies-ansible`, a automação é executada assim:

### Testa a conexão SSH com o container

ansible docker_servers -m ping

### Executa o playbook de instalação e deploy

ansible-playbook configura-node.yaml -v


Após a execução, a API pode ser acessada em:

- Linha de comando:

curl http://localhost:8080/

- Navegador:  
  `http://localhost:8080`

### 5. Integração ao repositório

Os arquivos relacionados ao Ansible (`ansible.cfg`, `hosts`, `configura-node.yaml` e eventuais templates) foram adicionados ao repositório seguindo o workflow Git definido no projeto, com um commit específico documentando a inclusão da automação de deploy com Ansible.

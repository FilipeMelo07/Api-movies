#!/bin/bash

# 1. Executa o script de setup para garantir que o banco de dados e a tabela 'filmes' existam.
# Se o 'database.db' já existir com a tabela, este comando apenas garantirá o setup.
echo "Executando setup do banco de dados..."
node database.js

# 2. Inicia a aplicação principal
echo "Iniciando o servidor Express..."
node index.js
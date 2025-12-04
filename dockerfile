# Use uma imagem base Node.js
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação para o diretório de trabalho
COPY . .

# Expõe a porta que a aplicação vai usar
EXPOSE 8080

# Torna o script de inicialização executável
RUN chmod +x ./start.sh

# Define o script de inicialização como o comando principal do container
CMD ["start.sh"]
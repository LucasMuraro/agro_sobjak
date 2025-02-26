# Usar a imagem base do Node.js
FROM node:14

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install
RUN npm install pg axios # Explicitly install pg and axios

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta usada pela aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "app.js"]
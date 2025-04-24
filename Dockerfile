FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Cria a pasta para o SQLite (se não existir)
RUN mkdir -p /var/lib/sqlite
VOLUME /var/lib/sqlite  # Persistência dos dados
EXPOSE 5002
CMD ["node", "src/app.js"]
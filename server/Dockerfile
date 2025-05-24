FROM node:23-alpine

WORKDIR /app

# Instalar dependencias sin compilar nativas
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

USER node

EXPOSE 5000
CMD ["node", "server.js"]

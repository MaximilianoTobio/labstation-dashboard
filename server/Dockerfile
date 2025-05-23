FROM node:23-alpine

WORKDIR /app

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --only=production

# Copiar el resto del código
COPY . .

# Cambiar al usuario no-root
USER nodejs

# Exponer puerto
EXPOSE 5000

# Comando para iniciar
CMD ["node", "server.js"]
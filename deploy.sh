#!/bin/bash

echo "🚀 Iniciando deployment de LabStation Dashboard..."

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar que estamos en producción
if [ "$1" != "production" ]; then
    echo -e "${RED}❌ Uso: ./deploy.sh production${NC}"
    exit 1
fi

echo "📦 Construyendo imágenes Docker..."
docker-compose build

echo "🛑 Deteniendo contenedores anteriores..."
docker-compose down

echo "🚀 Iniciando nuevos contenedores..."
docker-compose up -d

echo "🔄 Verificando estado de los servicios..."
sleep 5
docker-compose ps

echo -e "${GREEN}✅ Deployment completado!${NC}"
echo "🌐 Tu aplicación está disponible en: https://labstation.dev"
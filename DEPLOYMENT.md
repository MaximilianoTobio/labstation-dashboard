# Deployment de LabStation Dashboard

## Requisitos previos

- Docker y Docker Compose instalados
- Dominio apuntando al servidor
- PostgreSQL configurado

## Variables de entorno

1. Copiar `.env.example` a `.env.production` en la carpeta `server/`
2. Configurar todas las variables necesarias

## Deployment

```bash
# Clonar repositorio
git clone https://github.com/MaximilianoTobio/labstation-dashboard.git

# Ejecutar deployment
./deploy.sh production
```

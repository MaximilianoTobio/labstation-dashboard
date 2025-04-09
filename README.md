# LabStation Dashboard

**Panel de control elegante para acceder a todos los servicios auto-hosteados desde un solo lugar.**  
Desarrollado con React + Bootstrap, diseñado para ser minimalista, responsivo y escalable.

---

## 🚀 Objetivo

Centralizar los accesos a herramientas como n8n, Portainer, Redis Insight, PostgreSQL, etc., en una única interfaz web moderna y fácil de usar.

Ideal para administradores que manejan múltiples subdominios y desean una experiencia visual clara y estilizada.

---

## 🧱 Stack Tecnológico

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Docker (opcional)](https://www.docker.com/)
- [Traefik (para manejo de subdominios)](https://traefik.io/)

---

## ✨ Características (MVP)

- Vista en tarjetas de todos los servicios auto-hosteados
- Íconos e información descriptiva por servicio
- Enlaces rápidos a subdominios
- Diseño responsivo (desktop + mobile)
- UI moderna y minimalista

---

## 🧩 Servicios Integrados

La primera versión del dashboard incluirá accesos directos a los siguientes servicios auto-hosteados:

| Servicio     | Descripción breve                       |
| ------------ | --------------------------------------- |
| Chatwoot     | Plataforma de soporte multicanal        |
| EvolutionAPI | Gateway SMS para automatizaciones       |
| MinIO        | Almacenamiento S3 compatible            |
| n8n          | Automatización sin código               |
| Portainer    | Gestión visual de contenedores Docker   |
| PostgreSQL   | Base de datos relacional                |
| Qdrant       | Motor de búsqueda vectorial             |
| RabbitMQ     | Sistema de colas de mensajería          |
| Redis        | Almacenamiento clave-valor en memoria   |
| Traefik      | Proxy inverso y gestión de certificados |
| Typebot      | Creación de bots conversacionales       |

## 🖼️ Capturas (próximamente)

_Aquí se incluirán screenshots del dashboard una vez implementado._

---

## ⚙️ Instalación local

```bash
git clone https://github.com/tuusuario/labstation-dashboard.git
cd labstation-dashboard
npm install
npm run dev
```

---

## 🌐 Despliegue

Este proyecto puede ser desplegado fácilmente en un VPS usando Docker + Traefik.  
Pronto se incluirán instrucciones detalladas en la carpeta `deploy/`.

---

## ✅ Roadmap

- [ ] Añadir dark mode
- [ ] Autenticación simple (usuario/contraseña)
- [ ] Lectura de servicios desde JSON/YAML externo
- [ ] Monitoreo básico (servicio online/offline)
- [ ] Integración con WebSocket/API para estado en tiempo real

---

## 🧠 Autor

Desarrollado por [@Max](https://github.com/MaximilianoTobio) como parte de un laboratorio personal de infraestructura auto-gestionada.

---

## Licencia

MIT

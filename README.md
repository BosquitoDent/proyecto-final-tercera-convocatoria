# MoodSound 🎵

Aplicación fullstack para gestionar canciones asociadas a estados de ánimo. Permite crear, editar, eliminar y filtrar canciones por título, artista o mood.

## Tecnologías

- **Frontend**: React 19, Vite 7, React Router 7
- **Backend**: Express 5, Node.js
- **Base de datos**: MongoDB Atlas

## Estructura del proyecto

```
Proyecto-FullStack/
├── backend/           # API REST con Express
│   ├── src/
│   │   ├── config/    # Configuración (BD, rutas, mensajes)
│   │   ├── controllers/  # Lógica de negocio
│   │   ├── middleware/   # Middlewares (errores, auth)
│   │   ├── models/       # Schemas de Mongoose
│   │   └── routes/       # Definición de rutas
│   ├── .env
│   └── server.js
├── frontend/          # SPA con React + Vite
│   ├── src/
│   │   ├── components/   # Componentes de presentación
│   │   ├── config/       # Constantes y configuración
│   │   ├── context/      # Contextos de React
│   │   ├── hooks/        # Custom hooks
│   │   ├── pages/        # Páginas (componentes con lógica)
│   │   └── services/     # Llamadas a la API
│   └── .env
└── README.md
```

## Instalación

```bash
# Backend
cd backend
npm install
cp .env.example .env   # Configurar variables de entorno

# Frontend
cd frontend
npm install
cp .env.example .env
```

## Variables de entorno

### Backend (`backend/.env`)
```
MONGODB_URL=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/
PORT=3000
DB_NAME=app_zero
LOGIN_USER=<email>
LOGIN_PASS=<contraseña>
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:3000
```

## Scripts

### Backend
```bash
cd backend
npm start        # Arranca el servidor en el puerto 3000
npm run dev      # Arranca con nodemon (hot reload)
```

### Frontend
```bash
cd frontend
npm run dev      # Arranca Vite en el puerto 5173
npm run build    # Genera build de producción
npm run preview  # Previsualiza el build
```

## API REST

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/health` | Health check del servidor |
| GET | `/db/health` | Health check de MongoDB |
| POST | `/auth/login` | Iniciar sesión |
| GET | `/canciones` | Listar canciones (filtros: `titulo`, `artista`, `mood`, `desde`, `hasta`) |
| GET | `/canciones/:id` | Obtener una canción |
| POST | `/canciones` | Crear canción |
| PUT | `/canciones/:id` | Actualizar canción completa |
| PATCH | `/canciones/:id` | Actualizar campos parciales |
| DELETE | `/canciones/:id` | Eliminar canción |

## Uso

1. Arranca el backend: `cd backend && npm start`
2. Arranca el frontend: `cd frontend && npm run dev`
3. Abre http://localhost:5173
4. Inicia sesión con las credenciales configuradas en el `.env` del backend

# Elysia with Bun Auth API

### Antes de empezar

Debes crear un archivo `.env` en la raíz del proyecto con el Puerto que deseas, el secret para JWT y la URL de la base
de datos PostgreSQL.

```bash
PORT
JWT_SECRET
DATABASE_URL
```

Instala las dependencias con `bun install`.

Realiza la migración de la base de datos

```bash
bunx prisma migrate dev
```

## Ejecución
```bash
bun run dev
```

<hr>

### Peticiones de la API
Cambia el puerto si es necesario.

[Ejemplos de las peticiones HTTP](./api.http)
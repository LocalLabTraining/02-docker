# Instrucciones

## Crear archivo .env

```bash
PORT=3000
DB_HOST=db
DB_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_DB=todo_app
```

## Ejecutar iniciar proyecto

```bash
docker compose up -d # Esperar a que los contenedores se inicie
```

## Verificar que los contenedores esten funcionando

```bash
docker compose ps
```

## Parar y eliminar los contenedores y las imagenes

```bash
docker compose down --rmi all # Eliminar los contenedores y las imagenes
```
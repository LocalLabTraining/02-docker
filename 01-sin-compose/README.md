# Instrucciones

## Construir la imagenes de los contenedores

```bash
cd backend
docker build -t backend .
cd ..
cd frontend
docker build -t frontend .
cd ..
```

## Crear network

```bash
docker network create app-network
docker network inspect app-network
```

## Crear archivo .env

```bash
PORT=3000
BACKEND_URL=http://backend:3000/
```

## Ejecutar los contenedores

```bash
docker run -d --name backend --network app-network --env-file .env backend # Esperar a que el contenedor se inicie
docker run -d --name frontend --network app-network --env-file .env -p 8080:80 frontend # Esperar a que el contenedor se inicie
```

## Verificar que los contenedores esten funcionando

```bash
docker ps
```

## Parar los contenedores

```bash
docker rm -f backend frontend
```

## Eliminar la network

```bash
docker network rm app-network
```
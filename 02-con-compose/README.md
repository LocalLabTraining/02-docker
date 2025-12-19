# Instrucciones

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
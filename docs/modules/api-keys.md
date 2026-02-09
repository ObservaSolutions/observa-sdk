# Api Keys

## Objetivo
Emitir y validar API keys por organización para proteger endpoints y habilitar la ingesta del SDK.

## Rol en el negocio
La API key es la credencial primaria de una organización. Define el perímetro de acceso entre organizaciones y habilita operaciones administrativas y de ingesta.

## Entidades y propiedades
- ApiKey: id, organizationId, keyHash, isActive, createdAt, updatedAt.
- Una organización solo mantiene una key activa a la vez.

## Flujos principales
- Emisión de una nueva key activa al crear la organización.
- Rotación de key: al crear una nueva se desactiva la anterior.
- Validación de API key en el guard de autenticación.

## Reglas y validaciones
- La key plana solo se devuelve al momento de creación.
- La validación se realiza con header `x-api-key` y se deriva organizationId desde la key.
- Operaciones administrativas requieren JWT bearer y rol admin; listados aceptan member o admin.
- Endpoints web no usan `x-api-key`; usan JWT y el organizationId del token.

## Consumos y dependencias
- Usado por auth (guard de API key) para construir el contexto de request.
- Usado por ingest y uptime como autenticación primaria del SDK.

## Endpoints
- `POST /organizations/:organizationId/api-keys` crea una API key activa (JWT requerido).
- `GET /organizations/:organizationId/api-keys` lista API keys de la organización (JWT requerido).

## Casos de error
- `Missing authentication headers` cuando faltan headers de autenticación.
- `Invalid API key` cuando la key no es válida.
- `Forbidden` cuando el rol no tiene permisos para crear keys.

## Ejemplos de payloads
- Crear API key
  ```json
  {}
  ```

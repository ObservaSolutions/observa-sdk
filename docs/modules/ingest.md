# Ingest

## Objetivo
Registrar eventos de errores enviados por el SDK y asociarlos a un proyecto.

## Rol en el negocio
Es la puerta de entrada de la observabilidad. Cada evento alimenta la creación de incidentes y el histórico de fallas, por lo que este módulo valida el origen y persiste el payload completo para análisis posterior.

## Funcionamiento
- Requiere header `x-api-key`.
- El SDK envía `dsnKey` y el payload del evento.
- Se normaliza `event_id` (o se genera si falta) con tope de 128 caracteres.
- `timestamp` se parsea y se guarda solo si es válido.
- `level` se normaliza a `debug|info|warn|error|fatal`.
- Se valida el tamaño del payload antes de persistir.
- Si Redis está disponible, se encola el evento y se drena en background.

## Reglas y validaciones
- El `dsnKey` debe pertenecer a un proyecto activo.
- Si la organización del API key no coincide con el proyecto, se rechaza.
- El payload del evento se guarda íntegro para trazabilidad.
- Límite de tamaño de payload (64 KB por evento).
- Idempotencia por índice único `(projectId, eventId)`; reintentos no duplican.

## Flujos principales
- Ingesta inmediata a base de datos cuando no hay Redis.
- Ingesta con backpressure usando Redis como buffer.
- Retorno inmediato de `event_id` para soporte de reintentos del SDK.

## Consumos y dependencias
- Consume projects para resolver `dsnKey` a `projectId`.
- Consume auth para validar API key.
- Consume redis cuando está habilitado para buffering.

## Endpoints
- `POST /ingest/events` ingesta de eventos del SDK.

## Casos de error
- `Invalid event payload` cuando falta `dsnKey` o `event`.
- `Project not found` cuando el `dsnKey` no pertenece a ningún proyecto.
- `Organization mismatch` cuando la API key no coincide con la organización.
- `Payload too large` cuando supera 64 KB.
- `Ingest queue full` cuando la cola de Redis está saturada.

## Ejemplos de payloads
- Ingesta de evento
  ```json
  {
    "dsnKey": "dsn_123",
    "event": {
      "event_id": "evt_001",
      "timestamp": "2026-01-01T10:00:00.000Z",
      "level": "error",
      "message": "Null pointer",
      "payload": {
        "tags": {
          "env": "prod"
        }
      }
    }
  }
  ```

# Incidents

## Objetivo
Administrar incidentes por proyecto y exponer un historial público de estado.

## Rol en el negocio
Permite comunicar interrupciones, investigar errores y registrar el progreso de resolución. Cada incidente reúne cambios de estado que luego se publican como historial.

## Funcionamiento
- Los usuarios autenticados por JWT crean incidentes y publican updates.
- Cada update guarda un estado y un mensaje descriptivo.
- El historial público se consulta por fecha y agrupa updates del día.

## Entidades y propiedades
- Incident: id, projectId, title, status, message, startedAt, resolvedAt, createdAt, updatedAt.
- IncidentUpdate: id, incidentId, status, message, createdAt.

## Reglas y validaciones
- Solo usuarios de la organización del proyecto pueden crear o actualizar.
- Los estados se mantienen consistentes y actualizan el incidente principal.
- La consulta pública no requiere autenticación.

## Flujos principales
- Crear incidente con estado inicial y primer update.
- Agregar update que refleja cambios de estado y mensaje.
- Consultar historial público por fecha del proyecto.

## Consumos y dependencias
- Usa projects para validar pertenencia del proyecto.
- Usa auth-web para garantizar permisos por rol.

## Endpoints
- `GET /projects/:projectId/incidents/history?date=YYYY-MM-DD` historial público por fecha.
- `GET /projects/:projectId/incidents` lista incidentes del proyecto.
- `POST /projects/:projectId/incidents` crea un incidente.
- `POST /projects/:projectId/incidents/:incidentId/updates` agrega un update.

## Casos de error
- `Project not found` cuando el proyecto no existe.
- `Organization mismatch` cuando la organización no coincide.
- `Invalid status` cuando el estado es inválido.
- `Invalid incident data` cuando faltan campos requeridos.

## Ejemplos de payloads
- Crear incidente
  ```json
  {
    "title": "Interrupción parcial",
    "status": "investigating",
    "message": "Estamos investigando el problema",
    "startedAt": "2026-01-04T10:00:00.000Z"
  }
  ```
- Agregar update
  ```json
  {
    "status": "monitoring",
    "message": "Mitigación aplicada, monitoreando"
  }
  ```

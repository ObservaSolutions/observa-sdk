# Projects

## Objetivo
Crear y listar proyectos de una organización, generando el `dsnKey` que usa el SDK.

## Rol en el negocio
El proyecto es la unidad de monitoreo. Cada evento, incidente y heartbeat se asocia a un proyecto, lo que permite segmentar la observabilidad por servicio o producto.

## Funcionamiento
- Cada proyecto pertenece a una organización y se crea con un nombre.
- Se genera un `dsnKey` único al crear el proyecto.
- El `dsnKey` es el identificador del SDK para ingesta de eventos y uptime.

## Entidades y propiedades
- Project: id, organizationId, name, isActive, createdAt, updatedAt, dsnKey.

## Reglas y validaciones
- El nombre es obligatorio y se normaliza antes de guardar.
- Las operaciones requieren JWT bearer y rol válido.
- organizationId se toma del JWT; el path se valida contra el token.

## Consumos y dependencias
- Consumido por ingest y uptime para resolver `dsnKey`.
- Consumido por incidents para validar pertenencia del proyecto.

## Endpoints
- `POST /organizations/:organizationId/projects` crea un proyecto y devuelve el `dsnKey` (JWT requerido).
- `GET /organizations/:organizationId/projects` lista proyectos de la organización (JWT requerido).

## Casos de error
- `Invalid project data` cuando falta el nombre.
- `Organization mismatch` cuando el JWT no coincide con la organización.
- `Forbidden` cuando el rol no tiene permisos.

## Ejemplos de payloads
- Crear proyecto
  ```json
  {
    "name": "Observa Backend"
  }
  ```

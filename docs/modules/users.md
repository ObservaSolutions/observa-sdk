# Users

## Objetivo
Gestionar usuarios internos por organización, con credenciales seguras y roles coherentes para el acceso web.

## Rol en el negocio
Representa a las personas que operan la plataforma. Define el control de acceso por rol y el ciclo de vida de credenciales, habilitando administración de proyectos e incidentes.

## Entidades y propiedades
- Usuario: id, organizationId, name, username, email, passwordHash, passwordSalt, role, isActive, createdAt, updatedAt.
- Roles: admin y member (admin puede crear miembros y realizar acciones administrativas).

## Flujos principales
- Alta de admin inicial durante la creación de organización.
- Alta de miembros por un admin autenticado.
- Validación de credenciales para login web (auth-web).

## Reglas y validaciones
- name, username y email se normalizan antes de persistir.
- email debe tener formato válido y ser único.
- username es único dentro de la organización.
- Las credenciales se almacenan con hash y salt; no se guarda texto plano.
- Usuarios inactivos no pueden autenticarse.

## Consumos y dependencias
- Consumo desde auth-web para validar credenciales.
- Autenticación vía JWT bearer y roles para endpoints administrativos.
- organizationId se toma del JWT; el path se valida contra el token.

## Endpoints
- `POST /organizations/:organizationId/users` crea un miembro (rol admin, JWT requerido).
- `GET /organizations/:organizationId/users` lista usuarios de la organización (rol member o admin, JWT requerido).

## Casos de error
- `Invalid user data` cuando faltan name, username, email o password.
- `Invalid email` cuando el formato no es válido.
- `Email already in use` cuando el email ya existe.
- `Username already in use` cuando el username ya existe en la organización.

## Ejemplos de payloads
- Crear miembro
  ```json
  {
    "name": "Ada Lovelace",
    "username": "ada",
    "email": "ada@observa.com",
    "password": "secret123"
  }
  ```

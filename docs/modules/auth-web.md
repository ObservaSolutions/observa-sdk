# Auth Web

## Objetivo
Emitir y validar sesiones web con JWT para usuarios internos.

## Rol en el negocio
Habilita acceso seguro a funcionalidades administrativas, garantizando que cada acción esté asociada a un usuario y una organización.

## Flujo de autenticación
- Login: valida credenciales con users y firma un JWT con `sub`, `organizationId` y `role`.
- Sesión: el guard de JWT valida integridad y expiración en cada request.
- El userId y la organización se obtienen del bearer token en rutas con roles.
- Me: devuelve el usuario asociado al token vigente.

## Reglas y validaciones
- Credenciales inválidas no generan token.
- Usuarios inactivos no pueden iniciar sesión.
- Tokens expirados o manipulados se rechazan.

## Consumos y dependencias
- Depende de users para validar credenciales.
- Configuración de JWT via variables de entorno.

## Endpoints
- `POST /auth/login` inicia sesión y retorna token.
- `GET /auth/me` devuelve el usuario autenticado.

## Casos de error
- `Invalid credentials` cuando email o password no coinciden.
- `Invalid session` cuando el token es inválido o expiró.
- `Unauthorized` cuando el usuario no está activo.
- `Insufficient role` cuando el rol no alcanza lo requerido.

## Ejemplos de payloads
- Login
  ```json
  {
    "email": "admin@observa.com",
    "password": "secret123"
  }
  ```

# Organizations

## Objetivo
Centralizar el alta y la administración de organizaciones, que son el contenedor de usuarios, proyectos, API keys y eventos.

## Rol en el negocio
La organización representa al cliente del sistema. Desde aquí se gobierna todo lo demás: credenciales, usuarios con roles y proyectos que reportan errores. El flujo de onboarding nace en este módulo y habilita inmediatamente el uso del SDK y la web.

## Flujo principal
1. Alta pública de organización con datos del admin.
2. Creación del usuario admin inicial.
3. Emisión de una API key activa para integrar el SDK y operar la plataforma.

## Entidades y propiedades
- Organization: id, name, createdAt, updatedAt.
- Admin inicial: usuario con rol admin y credenciales válidas.
- ApiKey activa: entregada una sola vez en texto plano.

## Reglas y validaciones
- El nombre es obligatorio y se normaliza antes de persistir.
- El admin inicial requiere nombre, username, email válido y contraseña.
- La actualización de la organización requiere JWT bearer y rol al menos de miembro.
- organizationId se toma del JWT; el path se valida contra el token.
- La lectura pública permite mostrar información básica sin credenciales.

## Consumos y dependencias
- Consume users para crear el admin inicial.
- Consume api-keys para emitir la key activa.
- Expone datos públicos para páginas de estado o perfil público.

## Endpoints
- `POST /organizations` crea una organización, un admin inicial y la API key activa.
- `GET /organizations/:organizationId` obtiene datos públicos de la organización.
- `PATCH /organizations/:organizationId` actualiza el nombre de la organización (JWT requerido).

## Casos de error
- `Invalid organization data` cuando falta el nombre.
- `Invalid user data` cuando faltan datos del admin inicial.
- `Invalid email` cuando el email del admin no es válido.
- `Email already in use` si el email del admin ya existe.
- `Organization not found` cuando la organización no existe.
- `Organization mismatch` cuando el JWT no coincide con la organización.

## Ejemplos de payloads
- Crear organización
  ```json
  {
    "name": "Observa",
    "admin": {
      "name": "Admin",
      "username": "admin",
      "email": "admin@observa.com",
      "password": "secret123"
    }
  }
  ```
- Actualizar organización
  ```json
  {
    "name": "Observa Labs"
  }
  ```

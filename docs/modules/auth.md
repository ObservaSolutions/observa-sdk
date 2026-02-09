# Auth

## Objetivo
Aplicar autenticación por API key y control de roles para endpoints protegidos.

## Rol en el negocio
Define el perímetro de seguridad del backend, separando organizaciones y asegurando que las acciones sensibles respeten roles.

## Flujo de autenticación
- El guard valida `x-api-key`.
- Obtiene el organizationId desde la API key y lo inyecta en la request (organizationId, apiKeyId).
- Los endpoints web usan JWT (auth-web) y obtienen userId y rol desde el bearer token.

## Reglas y validaciones
- El header `x-api-key` es obligatorio en rutas protegidas por API key.
- Roles se evalúan por jerarquía (admin > member).
- `Public` permite rutas sin autenticación.

## Consumos y dependencias
- Usa api-keys para validar credenciales.
- El control de roles y usuario se realiza en auth-web.

## Endpoints
- No expone endpoints propios; actúa como infraestructura transversal.

## Casos de error
- `Missing authentication headers` cuando falta `x-api-key`.
- `Invalid API key` cuando la key no coincide o está inactiva.

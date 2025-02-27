# Autenticación de Demostración para Crypto-Fiat Wallet

Este documento explica los cambios realizados para implementar la autenticación de demostración en la aplicación Crypto-Fiat Wallet.

## Cambios Implementados

### 1. Página de Autenticación (`src/pages/Auth.tsx`)

- Se agregó soporte para usuarios de demostración
- Se implementaron botones específicos para cada tipo de usuario de demostración
- Se mejoró la interfaz de usuario para mostrar claramente las opciones de demostración

### 2. Ruta Protegida (`src/components/auth/ProtectedRoute.tsx`)

- Se modificó para reconocer usuarios de demostración almacenados en localStorage
- Se mantiene la compatibilidad con la autenticación normal de Supabase

### 3. Layout de la Aplicación (`src/components/layout/app-layout.tsx`)

- Se actualizó la función de cierre de sesión para manejar usuarios de demostración
- Se agregó lógica para eliminar la información de demostración de localStorage al cerrar sesión

### 4. Menú de Usuario (`src/components/layout/user-menu.tsx`)

- Se agregó soporte para mostrar información de usuarios de demostración
- Se implementó un indicador visual para usuarios de demostración
- Se agregaron iconos específicos según el rol del usuario

## Cómo Funciona

1. **Inicio de Sesión de Demostración**:
   - El usuario selecciona uno de los botones de demostración en la página de autenticación
   - La información del usuario de demostración se guarda en localStorage
   - El usuario es redirigido al dashboard correspondiente según su rol

2. **Verificación de Autenticación**:
   - El componente ProtectedRoute verifica si hay un usuario de demostración en localStorage
   - Si existe, permite el acceso a las rutas protegidas
   - Si no, verifica la autenticación normal con Supabase

3. **Cierre de Sesión**:
   - Al cerrar sesión, se elimina la información del usuario de demostración de localStorage
   - El usuario es redirigido a la página de autenticación

## Problema con Vite

Actualmente hay un problema al ejecutar la aplicación con Vite:

```
TypeError: crypto$2.getRandomValues is not a function
```

### Posibles Soluciones

1. **Actualizar Node.js**:
   - Asegúrate de usar Node.js v18 o superior
   - Ejecuta `nvm use 18` si tienes nvm instalado

2. **Configurar polyfill para crypto**:
   - Modifica `vite.config.ts` para incluir un polyfill para crypto

   ```typescript
   // vite.config.ts
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react-swc';
   import { resolve } from 'path';

   export default defineConfig({
     plugins: [react()],
     resolve: {
       alias: {
         '@': resolve(__dirname, './src'),
       },
     },
     define: {
       // Proporcionar polyfill para crypto
       global: {},
     },
   });
   ```

3. **Usar una versión específica de Vite**:
   - Ejecuta `npm install vite@4.5.0 --save-dev` para instalar una versión anterior de Vite

4. **Usar un entorno de desarrollo diferente**:
   - Considera usar Docker para proporcionar un entorno consistente

## Verificación de Cambios

Para verificar que los cambios de autenticación de demostración funcionan correctamente, se ha creado un script de prueba:

```bash
node scripts/test-auth.js
```

Este script simula el flujo de autenticación de demostración y muestra los resultados esperados.

## Próximos Pasos

1. Resolver el problema con Vite para poder ejecutar la aplicación completa
2. Implementar la creación de usuarios de demostración en Supabase (opcional)
3. Mejorar la experiencia de usuario para los usuarios de demostración

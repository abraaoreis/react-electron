# CanvasNode

CanvasNode es una aplicación de escritorio desarrollada con Electron, React, TypeScript y Vite.

## Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 2.21.1 o superior)
- npm

## Instalación

1. Clona el repositorio e ingresa al directorio:

   ```bash
   git clone <url-del-repositorio>
   cd <nombre-del-directorio>
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Reconstruye las dependencias nativas (necesario para `better-sqlite3` en Electron):

   ```bash
   npm run rebuild
   ```

## Ejecución del Proyecto

### Desarrollo (Frontend + Electron)

Para ejecutar el proyecto en modo de desarrollo (con recarga en caliente o _hot reload_):

```bash
npm run electron-dev
```

Esto iniciará el servidor de Vite y la ventana de Electron de forma simultánea.

### Solo el Frontend

Para ejecutar únicamente la interfaz gráfica en tu navegador web:

```bash
npm run dev
```

### Construcción y Empaquetado

Para construir únicamente el código fuente de la interfaz web (frontend):

```bash
npm run build
```

Para empaquetar la aplicación completa y generar los instaladores para distribución (ej. `.exe` para Windows):

```bash
npm run electron-build
```

### Ejecutar Electron con el Build de Producción

Para iniciar la aplicación de Electron utilizando la última compilación de producción generada:

```bash
npm run electron
```

### Pruebas

Para ejecutar las pruebas unitarias:

```bash
npm run test
```

Para ejecutar las pruebas unitarias una sola vez (modo Integración Continua o CI):

```bash
npm run test -- --run
```

## Estructura del Proyecto

- `src/`: Código fuente de React y TypeScript (Interfaz de usuario).
- `electron/`: Código del proceso principal de Electron (Backend local).
- `public/`: Archivos y recursos estáticos.
- `dist/`: Archivos de la compilación de producción web (Frontend).
- `dist-electron/`: Archivos de la compilación de producción de Electron.

## Tecnologías Utilizadas

- **Frontend:** React, TypeScript, Vite, Material-UI (@mui/material), Zustand (Estado Global), React Flow.
- **Escritorio:** Electron y Electron Builder.
- **Base de Datos Local:** Better SQLite3.
- **Pruebas:** Vitest, Testing Library.

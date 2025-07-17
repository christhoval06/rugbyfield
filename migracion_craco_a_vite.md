
# 🚀 Migración de CRA + CRACO a Vite con React, TypeScript y Zustand

Este documento te guía paso a paso para migrar una app React que usa **Create React App + CRACO** a **Vite**, aprovechando plugins modernos como `@vitejs/plugin-react-swc`, `vite-tsconfig-paths` y `vite-plugin-svgr`.

---

## ✅ Requisitos previos

- Node.js 18+ recomendado
- App React funcional con CRACO
- Git en rama nueva: `git checkout -b migrate-to-vite`

---

## 1. Inventario rápido del proyecto CRA

| Ítem                        | Migrar | Notas |
|----------------------------|--------|-------|
| Aliases (`@/`)             | ✅     | Usar `vite-tsconfig-paths` |
| SVGR (SVG → componente)    | ✅     | Usar `vite-plugin-svgr` |
| Tailwind / PostCSS         | ✅     | Vite los soporta |
| Env vars (`REACT_APP_...`) | ✅     | Cambiar a `VITE_...` |
| Proxy backend              | ✅     | Vite usa `server.proxy` |
| Testing                    | Opcional | Migrar de Jest a Vitest |

---

## 2. Instalar Vite y plugins

```bash
npm uninstall react-scripts @craco/craco

npm install --save-dev vite @vitejs/plugin-react-swc vite-tsconfig-paths vite-plugin-svgr
```

---

## 3. Reemplazar scripts en `package.json`

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "typecheck": "tsc --noEmit"
}
```

---

## 4. Estructura de archivos

- Mover `index.html` a la raíz
- Renombrar `src/index.tsx` → `src/main.tsx` (si aplica)

---

## 5. Configurar `vite.config.ts`

```ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tsconfigPaths(), svgr()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 5173,
      open: true,
    },
  };
});
```

---

## ✅ Listo

Tu proyecto ahora usará Vite. Asegúrate de revisar tus `env` y backend proxy si aplica. ¡Bienvenido a un bundler más rápido y moderno!

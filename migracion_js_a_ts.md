
# 🧩 Migración de JavaScript a TypeScript (React)

Esta guía te ayudará a migrar tu proyecto de **JavaScript** a **TypeScript** paso a paso.

---

## 1. 📦 Instalar TypeScript y tipos necesarios

```bash
npm install --save-dev typescript @types/node @types/react @types/react-dom
```

---

## 2. 🛠️ Crear archivo `tsconfig.json`

```bash
npx tsc --init
```

Edita el archivo `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "ESNext"],
    "module": "ESNext",
    "moduleResolution": "Node",
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "baseUrl": "./src",
    "allowJs": true,
    "checkJs": false
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

---

## 3. 🔄 Renombrar archivos

```bash
find src -name "*.js" -exec bash -c 'mv "$0" "${0%.js}.ts"' {} \;
find src -name "*.jsx" -exec bash -c 'mv "$0" "${0%.jsx}.tsx"' {} \;
```

> Revisa manualmente los archivos con JSX para asegurarte que estén usando `.tsx`.

---

## 4. 🧠 Agregar tipos

- Declara tipos para props, estados y funciones.
- Usa interfaces:

```ts
interface User {
  id: number;
  name: string;
}

const user: User = { id: 1, name: 'Chris' };
```

- Para librerías externas:

```bash
npm install @types/libreria
```

---

## 5. ✅ Validar el proyecto

Usa este comando para revisar errores sin compilar:

```bash
npx tsc --noEmit
```

---

## 🎯 Tip final

Integra TypeScript gradualmente, archivo por archivo, empezando por los más críticos del proyecto.

### Installing your first ever [vite react app](https://vite.dev/guide/#scaffolding-your-first-vite-project))

```bash
npm create vite@latest vite-react-app -- --template react-ts
```

### Integrating [ShadcnUI](https://ui.shadcn.com/docs/installation/vite)

**Step 1:** Change your working directory to the project you've just created

```
cd vite-react-app
```

**Step 2:** Add Tailwind CSS

```
npm install tailwindcss @tailwindcss/vite
```

`src/index.css`

```
@import "tailwindcss";
```

**Edit tsconfig.json file**

```json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  // add the below code inside your tsconfig.json
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Edit tsconfig.app.json file**

```json
{
  "compilerOptions": {
    // add the following code inside your tsconfig.app.json
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...
  }
}
```

**Update vite.config.ts**

```ts
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Step 3:** Add `shadcn`, this will configure `components.json`.

```
npx shadcn@latest init
```

**Add Components**

```
npx shadcn@latest add button
```

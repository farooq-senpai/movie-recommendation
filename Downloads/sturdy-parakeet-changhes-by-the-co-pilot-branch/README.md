# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },<img width="1920" height="957" alt="showcase_dashboard_1764003615050" src="https://github.com/user-attachments/assets/b672ddcc-f361-47e1-a6d9-70e4b0a0238c" />

  },
])<img width="1920" height="957" alt="showcase_solve_1764003741958" src="https://github.com/user-attachments/assets/8ccb3eb0-9956-431a-a20c-81595555f6f6" />

```
<img width="1920" height="957" alt="showcase_visualizer_1764003905623" src="https://github.com/user-attachments/assets/914f5cb3-82a3-4bdc-a20e-60613ce8550a" />
<img width="1920" height="957" alt="showcase_assign_1764003998580" src="https://github.com/user-attachments/assets/c8171155-8b1a-4391-8aa9-8f5052c72310" />
<img width="1920" height="957" alt="showcase_dashboard_1764003615050" src="https://github.com/user-attachments/assets/e39df11b-2b9f-4cda-ab68-5a1bbf4a731f" />
<img width="1920" height="957" alt="showcase_solve_1764003741958" src="https://github.com/user-attachments/assets/c06c1e6e-59a7-44cd-8ba3-d949d0c12f61" />

# AGENTS.md

## Cursor Cloud specific instructions

### Overview
Product Visualizer AI is a fully client-side React 19 SPA using Vite, TypeScript, and Google Gemini AI for image generation. There is no backend server — all AI calls go directly from the browser to the Gemini API.

### Running the dev server
- `pnpm run dev` starts Vite on `http://localhost:3000` (binds to `0.0.0.0`).
- `pnpm run build` produces a production build in `dist/`.
- `pnpm run preview` serves the production build locally.

### Environment variables
- The app requires `GEMINI_API_KEY` (not `VITE_GEMINI_API_KEY`) in `.env.local`. The Vite config uses `loadEnv(mode, '.', '')` which loads all env vars, and then accesses `env.GEMINI_API_KEY`. Despite `.env.example` showing `VITE_GEMINI_API_KEY`, the actual variable name used in `vite.config.ts` is `GEMINI_API_KEY`.
- Without a valid `GEMINI_API_KEY`, the app UI loads but all AI features (image generation, editing, background removal) will fail at runtime.

### Linting & Testing
- No ESLint, Prettier, or test framework is configured in this codebase.
- `npx tsc --noEmit` can be used for type checking but has a pre-existing error (`Cannot find namespace 'React'` in `types.ts`) due to missing `@types/react` in devDependencies. The Vite build succeeds regardless.

### Gotchas
- The `index.html` contains an importmap pointing to `aistudiocdn.com` CDN URLs for React and `@google/genai`. Vite overrides these during development/build, so they have no effect when using the dev server.
- Sample product images in `constants.ts` reference external Wikipedia URLs; they may fail to load due to network/CORS restrictions in sandboxed environments.
- Tailwind CSS is loaded via CDN (`cdn.tailwindcss.com`) in `index.html`, not as a local dependency.

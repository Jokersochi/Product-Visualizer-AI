# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Product Visualizer AI is a **client-side React SPA** (no backend) that uses Google Gemini AI to generate marketing visualizations. Built with React 19, TypeScript, and Vite 6. Tailwind CSS is loaded via CDN in `index.html`.

### Running the dev server

```bash
pnpm run dev   # Starts Vite on http://localhost:3000
```

### Building

```bash
pnpm run build   # Output in dist/
```

### Environment

- Requires `GEMINI_API_KEY` in `.env.local` (not `VITE_` prefixed). The Vite config (`vite.config.ts`) maps it to `process.env.API_KEY` and `process.env.GEMINI_API_KEY` via `define`.
- The service module (`services/geminiService.ts`) throws at module load time if `API_KEY` is missing — the app won't render without it. Use a placeholder value for UI-only development.

### Notes

- No lint or test scripts are defined in `package.json`. Only `dev`, `build`, and `preview` exist.
- No lockfile is committed; `pnpm install` resolves fresh each time.
- Sample product images reference external Wikipedia URLs that may fail in sandboxed environments — this is expected and does not indicate a bug.

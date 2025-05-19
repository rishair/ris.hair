# AGENTS Guide for ris.hair

This repository contains the source for **ris.hair**, a SvelteKit based personal website. Below are notes to help future agents navigate the project.

## Key Directories

- `src/` – SvelteKit application source
  - `routes/` – Svelte pages and API endpoints
    - `+layout.svelte` and `+page.*` files control page content
    - `api/` – server endpoints (currently posts only)
    - `posts/`, `projects/` – page collections for blog posts and projects
  - `posts/` – Markdown content for blog posts
  - `projects/` – YAML files describing projects shown on the site
  - `lib/` – helper modules used throughout the app
    - `projects.ts` – loads project YAML files
    - `utils.ts` – formatting helpers for markdown and dates
    - `config.ts` – site metadata
- `static/` – assets served as-is (favicons, images, robots.txt)
- `styles/` – Tailwind CSS setup

## Tooling

- Uses **SvelteKit** with mdsvex for `.md` content and Tailwind CSS for styling.
- `npm run dev` – start development server
- `npm run build` – create production build
- `npm run preview` – preview built site
- `npm run lint` – run Prettier and ESLint checks
- `npm run check` – run SvelteKit sync and TypeScript checks

## Tips

- Blog posts live in `src/posts/*.md` and expose metadata used by `src/routes/api/posts/+server.ts`.
- Projects are defined in YAML under `src/projects/` and loaded via `lib/projects.ts`.
- To add a new project or post, create a new YAML or Markdown file in the respective folder; slug names are derived from filenames.
- Global styles reside in `src/styles/app.css`, processed via Tailwind.
- Configurations for Tailwind, PostCSS, ESLint, and SvelteKit are in the project root.

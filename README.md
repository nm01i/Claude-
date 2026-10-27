# Anastasiia Trapeznikova — portfolio

React + TypeScript + Tailwind 3 + Framer Motion + Lucide + three.js (react-three-fiber). See `PLAN.md` for the structure.

```
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Editing content
Everything lives in `src/content/content.ts`: profile, about, projects, skills, contact links.

* **Project screens**: add `{ src, alt }` entries to a project's `images` (put files in `public/`). Until then a labelled "Placeholder" is shown.
* **Live URL**: set `liveUrl` on a project to show a "Visit project" link; leave it unset to hide it.
* **Contact links**: email and LinkedIn are pre-filled from the supplied profile PDF; Behance is empty and shows an "Add your Behance URL" placeholder.
* **Case studies**: routed by hash: `#project-triply`, `#project-lumie`, `#project-fellaz`.

## Modes
* Desktop (768px and up), motion allowed, WebGL available: cinematic scroll scene.
* Mobile, `prefers-reduced-motion`, or no WebGL: no canvas; static hero, plain stacked sections, no scroll-linked text reveal.

# Anastasiia Trapeznikova — portfolio

React + TypeScript + Tailwind 3 + Framer Motion + Lucide + three.js (react-three-fiber). See `PLAN.md` for the structure.

```
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Editing content
Everything lives in `src/content/content.ts`: profile, about, projects, skills, contact links.

* **Projects**: five entries in `projects`. Each has `id, slug, title, category, description, coverImage, images, caseStudy` (plus `highlights`, `kind`, optional `year`, `pending`). `coverImage` is the card preview; `images` fill the case-study gallery.
* **Case-study sections** (`caseStudy.overview|brief|audience|challenge|process|decisions|visual|reflection`): only defined sections render; the rest are listed under "Still to add".
* **Project screens**: add `{ src, alt }` entries to a project's `coverImage` / `images` (put files in `public/`). Until then (or if an image fails to load) a labelled "Placeholder image" is shown.
* **Live URL**: set `liveUrl` on a project to show a "Visit project" link; leave it unset to hide it.
* **Contact links**: email and LinkedIn are pre-filled from the supplied profile PDF; Behance is empty and shows an "Add your Behance URL" placeholder.
* **Case studies**: routed by hash: `#project-triply`, `#project-lumie`, `#project-muza`, `#project-saas`, `#project-gift-match` (`#/project/<slug>` also works).

## Modes
* Desktop (768px and up), motion allowed, WebGL available: cinematic scroll scene.
* Mobile or no WebGL: no canvas; the hero cross-fades the two poses on scroll (HTML only), then normal flow.
* `prefers-reduced-motion`: static greeting pose, no sticky hero, no scroll-linked text reveal.

## Character poses
`public/character/pose-a.webp` (greeting) and `pose-b.webp` (pointing) share one aligned frame. To replace them, run
`python3 tools/build-poses.py <poseA> <poseB>` (needs numpy, scipy, pillow; update the pupil coordinates in the script for new art).
The scroll timeline lives in `src/scene/timeline.ts`.

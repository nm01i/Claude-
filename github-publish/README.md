# Портфолио: Anastasiia Trapeznikova

Эта папка содержит всё нужное, чтобы опубликовать сайт на GitHub Pages.

## Что внутри
| Что | Зачем |
|---|---|
| `src/`, `public/`, `index.html` | Исходный код и ресурсы сайта (видео героя, скриншоты проектов) |
| `package.json`, `package-lock.json`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `tsconfig.json` | Конфигурация сборки |
| `.github/workflows/deploy.yml` | Автоматическая сборка и публикация на GitHub Pages при каждом push в `main` |
| `site/` | Уже собранный сайт (то же, что даёт `npm run build`). Можно загрузить как есть |
| `.gitignore`, `PLAN.md` | Служебные файлы |

Весь контент (тексты, проекты, ссылки) редактируется в одном файле: `src/content/content.ts`.

## Способ 1 (рекомендуется): GitHub Actions
1. Создайте репозиторий на GitHub (или используйте существующий) и загрузите **содержимое этой папки** в ветку `main`, включая скрытую папку `.github`.
2. В репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Сделайте push в `main` (или запустите workflow вручную во вкладке **Actions**). Через 1–2 минуты сайт откроется по адресу `https://<ваш-логин>.github.io/<репозиторий>/`.

## Способ 2: загрузить готовую сборку
1. Загрузите содержимое папки `site/` в корень отдельного репозитория (ветка `main`).
2. **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.

## Локальный запуск
```bash
npm ci
npm run dev        # разработка
npm run build      # проверка типов и сборка в dist/
npm run preview    # просмотр сборки
```

## Заметки
* Пути в сборке относительные (`base: './'`), а навигация по проектам идёт через `#project-<slug>`, поэтому сайт работает и в подпапке `…github.io/<репозиторий>/`, и на своём домене без дополнительной настройки.
* Свой домен: добавьте файл `CNAME` с доменом в `public/` и укажите домен в Settings → Pages.
* Нужен Node 18+ (в workflow используется Node 20).

---
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
* `prefers-reduced-motion`: poster frame only (no video download), no sticky hero, no scroll-linked text reveal.

## Character video
`public/character/character-desktop.mp4`, `character-mobile.mp4` and `character-poster.webp` come from one master clip (greeting → pointing).
The master had a generator watermark in the lower right; the encodes are cropped to exclude it (see `PLAN.md`). Re-encode example:
`ffmpeg -i master.mp4 -an -vf "crop=1000:720:136:0" -c:v libx264 -crf 20 -g 6 -keyint_min 6 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart character-desktop.mp4`
(keep the short GOP so scroll scrubbing stays instant). The scroll timeline lives in `src/scene/timeline.ts`.

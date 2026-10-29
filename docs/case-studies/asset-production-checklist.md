# Asset production checklist

Principle: **export real screens; do not generate or alter interfaces.** Mockup frames, backgrounds and device shells may be added around real captures only.
Nothing here overwrites existing files. Keep PNG masters outside `public/`; ship optimized WebP.

## Standard sizes

| Use | Aspect | Master size | Web file | Notes |
|---|---|---|---|---|
| Project card cover (portfolio) | 16:10 | 1600×1000 | WebP ≤ 200 KB | One strong screen or a framed key image. No tiny text |
| Case study hero | 21:9 | 2400×1030 | WebP ≤ 300 KB | Wide crop of the best screen |
| Overview image | 16:9 | 1920×1080 | WebP ≤ 250 KB | Device mockup or three-screen composition |
| Key-screen crops | 4:3 or 16:10 | 1600×1000 | WebP ≤ 200 KB | One idea per crop |
| Detail close-ups | 1:1 or 4:3 | 1200×1200 / 1200×900 | WebP ≤ 150 KB | Components, states, typography |
| Full-page desktop | width 1440 | 1440×(page height), also @2× | WebP, split into sections ≤ 2500 px tall | Do not publish one 12,000 px image |
| Full-page mobile | width 390 | 390×(page height) @2× = 780 wide | WebP | Show beside the desktop at the same scale |
| Design-system board | 16:9 or 4:3 | 1920×1080 | WebP ≤ 250 KB | Palette with HEX, type specimen, grid, components |
| Flow / wireframe diagram | 16:9 | 1920×1080 or wider | PNG or WebP | Readable at 1400 px display width |
| Behance cover | 808×632 (commonly used cover size; verify on upload) | 1616×1264 | JPG/PNG | Behance modules are usually 1400 px wide |

Naming: `<slug>/<slug>-cover.webp`, `-overview.webp`, `-desktop-01.webp`, `-mobile-01.webp`, `-system.webp`, `-flow.webp`. Always add real `alt` text in `content.ts`.

## Per project

### GIFT MATCH (source readable)
Export from Figma: [ ] `734:541` cover · [ ] `734:547` laptop + full page (card cover candidate) · [ ] `734:546` responsive mockups · [ ] `734:760` wireframe vs prototype · [ ] `304:82` final desktop in 4–5 sections · [ ] `464:115` mobile in 3 sections · [ ] hero close-up (`304:95`) · [ ] stage and advantage card sheet.
Rebuild: [ ] design-system board with the **confirmed** palette (the file has two). Draw: [ ] questionnaire user flow (missing).
Fix before export: copy typos and placeholders listed in `gift-match.md`; translate board text to English if the board is shown.

### TRIPLY, MUZA, LUMIÉ, SAAS (sources not readable yet)
Needed for each: [ ] cover candidate · [ ] 1 overview image · [ ] full-page desktop captures of every page · [ ] mobile captures of the same pages · [ ] 3–5 key-screen crops · [ ] 2–3 detail close-ups · [ ] design-system sheet (verified values only) · [ ] flow or wireframes **if they exist**.
Capture tip for live sites: Chrome DevTools → device toolbar at 1440 px and 390 px → "Capture full size screenshot".
For Framer or template-based work: also export the page tree, and keep a note of what is template and what is yours.

## Priority order
1. Cover + overview for all five (they unlock the card grid).
2. Key screens for GIFT MATCH, then for the sites that become readable.
3. Design-system sheets.
4. Responsive comparisons.
5. Flows and wireframes where they honestly exist.

# Source inventory

Checked: 2026-10-29. Method: Figma MCP (read access), WebFetch, curl through the session proxy, repository search.

| # | Source | Project (as far as evidence shows) | Access | Result |
|---|---|---|---|---|
| 1 | Figma `JP5UkqTqxeYwHRpm4VdSeR` ("подарки"), node `304:82` | **GIFT MATCH** [V]: the text is "Giftmatch" | **Read OK** | Whole file inspected: 1 page, 25 top-level frames, 173 image rectangles. See below |
| 2 | https://muza-ai-assisted-interior-design.vercel.app/ | MUZA [V]: URL and your profile PDF | **Blocked**: host is outside the session's allowed network domains (`ENOTFOUND` via WebFetch, `403` on proxy CONNECT via curl) | Not inspected |
| 3 | https://triply-travel-planner.netlify.app | TRIPLY [V]: URL | **Blocked**: same reason | Not inspected |
| 4 | https://framer.com/projects/Intuitive-Pumpkin--KLkhxqwPDeULPR3zjpZe | Unknown [C]: not named by you | **Blocked**: same reason | Not inspected. Note: `framer.com/projects/...` is the Framer *editor* link, which needs a login even when the network allows it. The published site URL (`*.framer.website` / `*.framer.app` / custom domain) is what can be inspected |
| 5 | https://framer.com/projects/Xtract-Template-copy--DGFhrOnWuNkzDWwVh8Tw | Unknown [C] | **Blocked**: same reason | Not inspected. The project name contains "Template copy" [V], which suggests a duplicate of a Framer template. [C] See `questions.md` |
| 6 | `/root/.claude/uploads/.../Profile.pdf` (LinkedIn profile) | All | Read OK | MUZA, LUMIÉ and "an AI automation SaaS landing page" are named as recent work |
| 7 | This repository | All | Read OK | **No project screenshots, exports or documents exist in the repo.** Only the character cut-outs (`public/character/`) |

## How to unlock the blocked sources

1. Environment settings → Network access: add `muza-ai-assisted-interior-design.vercel.app`, `triply-travel-planner.netlify.app` and the published Framer domains under *Allowed domains* (or choose a broader level). Steps: https://code.claude.com/docs/en/cloud-environments#network-access
2. Or send exports instead: full-page PNG screenshots (desktop + mobile) of every page, plus any PDFs. This is also the more reliable route for visuals, because the Figma and web assets cannot be downloaded from this sandbox anyway.
3. For Framer: send the **published** URLs, or a PDF/PNG export. The editor link cannot be read without your login.

## Anatomy of the Figma file (GIFT MATCH) [V]

One page ("Page 1"). Top-level frames, in order of the design process:

| Frame (id) | Size | What it is | Role in the process |
|---|---|---|---|
| 15 `screencapture-…` frames (`243:7` … `476:15`, `287:75`, `457:36`) | 1200 or 400 wide, 4,200–12,000 tall | Full-page screenshots of other websites (domain names are in the layer names, e.g. dental clinic, school, outdoor advertising, travel agency, roadmap, websoft) | Reference collection. No annotations found (these frames have no text layers) |
| `13:241` "Group 1" | 211×188 | Type-scale note: "Н1=50пк, н2=35пк, н3=22пк, текст 15пк" ("пк" = px) | Early type decision |
| `16:2` "работа" | 1200×4698 | Grey wireframe with placeholder copy ("Заголовок, в котором описываю выгоду…", "Пример подарка 1…", "Отзыв 6") | **Wireframe** |
| `58:9` "прототип" | 1200×4682 | Grey mid-fidelity page with real copy and a different hero line ("Подберём подарок от 20 €, с бесплатной доставкой по ЕС") | **Prototype** |
| `123:8` "лего", `252:20` "лего" | 1200×5882 / 5483 | Grey modular-card layout, copy close to final | Intermediate layout stage ("lego" = building from blocks) [I] |
| `304:82` and `495:43` "работа" | 1200×4994 each | **Final colour desktop design** (two copies, same size) | **High-fidelity UI** |
| `464:115` "iPhone 14 & 15 Pro - 2" | 320×5777 | Final mobile layout | **Responsive adaptation** |
| `714:11` "Frame 116" | 1920×16332 | Presentation board: cover, project idea, design concept, role, 12-column grid, fonts, palette, device mockups, wireframe + prototype | **Existing Behance-style presentation** |

Not found in the file: a written brief, user research notes, user flow diagram, component library, Figma variables (variable query returned `{}`),
prototype links, hover/active states, forms.
Not accessible through the connector: Figma prototype connections and Dev-mode annotations.

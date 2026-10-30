# Project images: what was added, what is still missing

Checked 2026-10-29. Every image under `public/projects/` is a real capture of the project. No stock photos, no mock-ups, no generated interfaces.

## Why the images were missing
The earlier build had `images: []` and no `coverImage` for all five projects, and no image folder existed. The `Media` component rendered a labelled placeholder whenever the image was undefined. The paths were not broken; there were none.

## Sources
| Project | Source | How it was captured |
|---|---|---|
| TRIPLY | Repo `nm01i/triply` (`TRIPLY-GitHub-Upload/index.html` + `assets/`) | The real app served locally and captured at 1440 and 390 px (device scale 2) |
| LUMIÉ | Framer project `KLkhxqwPDeULPR3zjpZe` | Full-page Framer screenshot (1200 px wide), cut into sections at native resolution |
| MUZA | Repo `nm01i/muza-ai-assisted-interior-design` (`index.html`) | Page rendered locally at 1440 px. Only sections without hosted media were captured |
| SAAS / FlowAutomate | Framer project `DGFhrOnWuNkzDWwVh8Tw` | Full-page Framer screenshot (1200 px wide), cut into sections. Branded "Flowcore", see below |
| GIFT MATCH | Figma `JP5UkqTqxeYwHRpm4VdSeR`, final frame `304:82` | Figma render at 1x (1200×4994), cut into sections |

## Genuinely missing
| Project | Image needed | Checked | Why it could not be retrieved | File to provide |
|---|---|---|---|---|
| MUZA | Hero (video background) and the before/after "Drag the line" slider | Repo `index.html`, local render | All room photos and videos are hosted on `res.cloudinary.com`, which the sandbox network blocks (request fails). Without them those areas render as empty grey boxes, so they were not used | PNG, 2880×1800: hero at the top of the page; PNG, 2880×1800: the before/after slider with the "after" state visible |
| MUZA | "Selected projects" cards (Rotterdam kitchen, Vienna bedroom, Lisbon studio) and the case panel | Same | Same reason | PNG, 2880×1800 each section |
| MUZA | Live-site check | `muza-ai-assisted-interior-design.vercel.app` | Host blocked | Full-page PNG of the live page |
| SAAS | Product-interface panels in "What You'll Learn" | Framer screenshot | The Framer capture shows those panels empty (lazy-loaded content). Panels are visible but mostly blank in the first step | PNG 2400 px wide of each step panel, scrolled into view |
| SAAS | Confirmation that this Framer project is the intended project | Framer project metadata | Root metadata still reads "Flowcore - AI automation agency framer template" and the product is named Flowcore, not FlowAutomate | A yes/no, or the correct project link |
| GIFT MATCH | Mobile screens | Figma frame `464:115` | Frame is only 320 px wide, so it is too small to show sharply | PNG export of frame `464:115` at 3x (960×17331) |
| LUMIÉ | Mobile and catalog page (`/catalog`) | Framer | The catalog page and breakpoint captures were not exported | Full-page PNG at 390 px and 1440 px of `/catalog` |

## Added later
Phone and tablet captures: LUMIÉ (4, from the 390 px Framer capture), GIFT MATCH (4, native 320 px Figma frame, shown at 1x), MUZA (1: process), SAAS (2 tablet-width captures). MUZA's mobile hero and pricing were left out: without the hosted media the hero is empty, and the pricing capture showed the sticky header mid-image. Still needed: MUZA hero and pricing on a phone, sharp GIFT MATCH mobile (3x export), a real phone capture for SAAS.

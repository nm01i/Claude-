# Implementation plan

The visual concept comes from the original "Jack — 3D Creator" prompt: near-black `#0C0C0C` page,
Kanit, giant gradient headings, a magnetic hero portrait, scroll-driven marquee rows,
character-by-character scroll reveal, a white numbered list section, and sticky stacking project cards.
All of that is kept. The portfolio content comes from the supplied profile and project descriptions.

## Scroll story
| Scroll range | What happens |
|---|---|
| Hero stage (300vh, sticky) | One normalized timeline (`src/scene/timeline.ts`). 0–0.08 greeting pose; 0.08–0.30 cross-fade to the pointing pose, "Scroll to explore" fades in; 0.30–0.42 hold; 0.42–0.97 camera dollies into the monitor while the HTML heading/bottom bar (0.44–0.62) and the character (0.50–0.70) fade out. The monitor screen is real HTML (drei `Html`) showing the project index. |
| Marquee → About → Skills → Projects | Normal-flow HTML on opaque backgrounds. Canvas is paused (`frameloop="never"`). |
| Case study | Hash route `#project-<slug>` (alias `#/project/<slug>`); dedicated layout, back link returns to `#projects`. |
| Contact stage (250vh, sticky) | Canvas wakes, camera orbits to a side view of the desk and the Contact card slides in. |

## Components
```
App
├─ Workstation3D (lazy, fixed canvas)        scene/
│   ├─ CameraRig        reads hero/contact progress MotionValues
│   ├─ Desk, Monitor (+ <Html> mini-site), Lamp, Plant
│   └─ Character        two aligned billboard planes (pose A greeting, pose B pointing)
├─ HeroStage            Navbar, heading, bottom bar, Magnet portrait (fallback)
├─ MarqueeSection       two scroll-driven rows
├─ AboutSection         AnimatedText + 4 decorative shapes
├─ SkillsSection        numbered design skills + tools
├─ ProjectsSection      editorial list, 5 projects, 5 layout variants (no fixed heights or counts)
├─ CaseStudy            per-project page; renders only sections that have content
├─ Media / Placeholder  real image with labelled fallback
├─ ContactStage         headline, CTA, editable links
└─ components/          FadeIn, Magnet, AnimatedText, ContactButton, CaseButton
content/content.ts      ALL copy, projects, links (single editable source)
```

## Fallbacks and performance
* `prefers-reduced-motion` or viewport < 768px: no WebGL. Static hero with the character image; sections render as plain stacked HTML.
* Three.js is a separate lazy chunk; DPR capped at 1.75; geometry is procedural (no model downloads); the render loop pauses off-stage.
* Character image is a ~120 KB WebP.

## Projects
TRIPLY, LUMIÉ, MUZA, FlowAutomate (route `saas`), GIFT MATCH. Source material is limited to the brief and the profile PDF
(MUZA: AI-assisted interior design platform; an AI automation SaaS landing page). GIFT MATCH has no source material yet.
No screenshots exist in the repo, so covers and screens are labelled placeholders. Missing text is marked "Editable".

## Hero layout and character (revision)
* **Layout regions** (HeroStage): navigation / heading / scene area / bottom bar, each its own flex row, so text cannot overlap other text.
* **Root cause of the old overlap**: the monitor's mini-site (`ScreenSite`) repeated the nav labels, the name and both CTA pills and was rendered as DOM *above* the canvas, so it layered with the hero overlay (3 copies of the name, 2 sets of nav labels). The screen now shows only the project index. The old heading was also 16vw, taller than the band it sat in.
* **Poses**: `public/character/pose-a.webp` and `pose-b.webp` are cut out of the two reference renders and aligned by pupil position (uniform scale 1.046, rotation 4.3°, no stretching) into one shared frame. Rebuild with `python3 tools/build-poses.py <A> <B>`.
* **Animation**: B fades in over A (double smoothstep, so ghosting is brief); idle motion is whole-figure breathing and a ≤0.5° tilt only. The arms, fingers and face are not animated, because the source art is flat.
* **Modes**: `cinematic` (desktop, WebGL, motion allowed), `lite` (mobile / no WebGL: same pose cross-fade, HTML only, 175vh), `static` (reduced motion: greeting pose, no sticky scroll).

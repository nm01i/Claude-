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
* **Character**: one video (`public/character/character-desktop.mp4` 1000×720, `character-mobile.mp4` 750×540, poster `character-poster.webp`), greeting → pointing. It never autoplays: its time follows the hero scroll progress (`T.poseStart`→`T.poseEnd`, linear, both directions) with frame-rate-independent smoothing. Encoded with a 6-frame GOP so seeking is instant, no audio.
* **Watermark**: the master (1280×720) carries a static generator sparkle at x 1136–1184, y 576–623 on every frame. The character never enters it (checked on all 144 frames), so the video is cropped to x 136–1135: nothing is painted over, scaled or blurred.
* **Compositing**: the video has a black background. 2D (mobile/no WebGL): `mix-blend-mode: lighten` over #0C0C0C inside an isolated wrapper. 3D: a `VideoTexture` on the billboard with MAX blending, i.e. max(video, scene). Both leave the figure's pixels untouched and need no keying.
* **Modes**: `cinematic` (desktop, WebGL, motion allowed), `lite` (mobile / no WebGL: same pose cross-fade, HTML only, 175vh), `static` (reduced motion: poster frame only, no video is downloaded, no sticky scroll).

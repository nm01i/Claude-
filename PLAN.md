# Implementation plan

The visual concept comes from the original "Jack — 3D Creator" prompt: near-black `#0C0C0C` page,
Kanit, giant gradient headings, a magnetic hero portrait, scroll-driven marquee rows,
character-by-character scroll reveal, a white numbered list section, and sticky stacking project cards.
All of that is kept. The portfolio content comes from the supplied profile and project descriptions.

## Scroll story
| Scroll range | What happens |
|---|---|
| Hero stage (300vh, sticky) | Fixed WebGL canvas: stylized workstation. The character cut-out (from the reference render) sits beside a monitor. Scroll pushes the camera from a wide shot to the monitor. The screen holds a live HTML mini-site (real DOM via drei `Html`). |
| Marquee → About → Skills → Projects | Normal-flow HTML on opaque backgrounds. Canvas is paused (`frameloop="never"`). |
| Case study | Hash route `#project-<slug>` (alias `#/project/<slug>`); dedicated layout, back link returns to `#projects`. |
| Contact stage (250vh, sticky) | Canvas wakes, camera orbits to a side view of the desk and the Contact card slides in. |

## Components
```
App
├─ Workstation3D (lazy, fixed canvas)        scene/
│   ├─ CameraRig        reads hero/contact progress MotionValues
│   ├─ Desk, Monitor (+ <Html> mini-site), Lamp, Plant
│   └─ Character        billboard of anastasiia-doll.webp
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

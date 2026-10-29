# MUZA: research report

**Status: researched from the project's own source code (GitHub repo `nm01i/muza-ai-assisted-interior-design`), not from the live site.**

## How this was recovered (and what could not be)

| Source | What it gave | Status |
|---|---|---|
| Repo `nm01i/muza-ai-assisted-interior-design` (private, 6 commits, 14–16 Jul 2026): `index.html` (89 KB, the whole site) and `muza-netlify-deploy.zip` (an earlier copy of the same page) | Full copy, structure, behaviour, design tokens, media URLs, TODO comments | **[S] Verified in source code** |
| Live site `muza-ai-assisted-interior-design.vercel.app` | Not reachable from this sandbox (host is outside the session's allowed domains) | **[L] Not verified live.** Everything below is what the code says the site does |
| Your profile PDF | "MUZA (an AI-assisted interior design platform)" | [U] user-supplied |
| Your earlier messages in this session | Category "Website Design / UI/UX" | [U] |
| Earlier conversations about MUZA | **No record is available to me.** The session list for this account contains only this session and an unrelated plugin-install session; no transcript, note or document about MUZA exists in the repos or on disk | Not recoverable. Where the brief, audience or intent are not visible in the code, they are listed as gaps |

Labels: **[S]** verified in source code, **[L]** verified on the live site (none yet), **[U]** stated by you, **[I]** interpretation, **[R]** recommendation, **[C]** needs your confirmation.

---
## A. Project overview

| Item | Finding |
|---|---|
| Name | **MUZA**; page title "MUZA — AI Interior Studio" [S] |
| Category | Website Design / UI/UX [U]; a marketing and lead-generation landing page for an AI-assisted interior design service [S] |
| Positioning (verbatim) | "AI-assisted interior design refined by professional designers. Upload a photo, get five AI concepts in minutes, and receive a build-ready project. Based in Europe." [S, meta description] |
| Platform | Single responsive web page, desktop to phone (breakpoints 1024 / 900 / 768 / 600 px) [S] |
| Status | **Front-end prototype / concept.** The request form has `action="#"` and a code comment "TODO: replace action with a real form endpoint"; GA4 and Meta Pixel are placeholders; `og:url` is `https://www.example.com/` with a TODO; social links are `#` with a TODO [S]. Nothing in the code generates AI concepts. Whether it is a client project or a personal concept is not in the repo [C] |
| Build | Hand-written single `index.html`, inline CSS and JS, no framework or build step, Google Fonts (Montserrat, Lora), media on Cloudinary [S]. Hosting: Vercel (your URL); the zip name suggests an earlier Netlify deploy [I] |
| Development timeline | Repo: upload 14 Jul 2026, five "Update index.html" commits 15–16 Jul 2026 [S] |
| Your role and tools | Not in the repo. Profile lists Figma, Framer, Tilda and AI tools (Claude, Higgsfield, Leonardo AI, ChatGPT) generally [U]; what was used for MUZA specifically is [C] |

## B. Goal and problem definition

**Documented in the page itself [S]**
* Goal: convert visitors into project requests: "Upload a photo, get concepts free" is the primary CTA; a modal collects name, email, notes and up to 10 room photos and promises a reply "within 24 hours".
* Problem the copy addresses: interior design is slow ("without the wait"), and AI-only tools produce attractive pictures that ignore real measurements and buildability (FAQ: "Are the AI designs actually buildable? Not on their own… a human designer checks every chosen concept against your real measurements"; review: "none of them told me my sofa wouldn't actually fit").
* Solution model: AI for speed, a human designer for feasibility ("Four steps. One of them is human.").

**Audience [I], inferred from copy, not documented:** homeowners and renters in Europe who want a designed, buildable interior for a single room without a long studio process. Copy mentions EU-only "Full Service", remote clients abroad, budgets of €4k–€19k.

**Constraints visible in code [S]:** accessibility and performance care (reduced-motion fallback that removes the scroll pinning; videos play only while in view; `prefers-reduced-motion` handled).

**Not available anywhere [C]:** original brief, client name, real target market, any user research. Do not claim research or testing.

## C. UX and information architecture

**Structure [S], top to bottom**
1. Header: logo, Work / Process / Pricing / FAQ, "Start your project"; burger menu on tablet and phone.
2. Hero (pinned while the next section slides over it): badge "AI Concept · Living room · Japandi · Generated in 11 min · AI-assisted · human-finished"; H1 "Interior design, without the wait."; sub-copy; CTAs "Upload a photo, get concepts free" and "See real projects"; reassurance line; "Featured in" strip (Wonderwall Mag, Domus Living, Nordic Interiors, Studio Weekly).
3. **Work** (`#work`): draggable before/after slider ("Drag the line. See the whole journey.") + three project cards (Kitchen Rotterdam, Scandinavian, 14 m², €12,400 · Bedroom Vienna, Warm minimal, 18 m², €9,200 · Studio Lisbon, Japandi, 32 m², €18,900).
4. **Process** (`#process`): "Four steps. One of them is human." (AI scans the space → AI drafts concepts, ~11 min → Designer refines → Final project) with a looping video.
5. **Case study** (`#case`): "One project, from photo to floor plan." Living room, 22 m², Amsterdam: timeline Day 1–Day 4, stats (4 days · 3 options · €4k budget kept), a client quote.
6. **Pricing** (`#pricing`): Concept €49 (3 AI directions, PDF moodboard, no designer review, under 1 hour) · **Project €349** (marked "Most booked": designer refinement, scaled floor plan and renders, materials list with suppliers, 4–6 days) · Full Service from €790 (contractor coordination, two check-ins).
7. Reviews "Clients, unscripted." (five-star cards) · CTA "Your future interior starts here" (Upload a photo / Book a call) · FAQ accordion (5 questions) · footer (links, contact, social).
8. Overlays: project request modal (form + drag-and-drop photo dropzone + thank-you state), legal modal (Privacy, Terms, Cookies, "How we use your photos").

**Navigation model:** single-page anchor navigation with smooth scroll; the same request modal opens from every CTA [S].
**Main tasks [I]:** understand the offer → see proof → choose a package → submit photos and contact details.
**Responsive behaviour [S]:** nav collapses to a slide-in panel at 768 px; grids go 3 → 2 → 1 columns; hero H1 drops from 60 px to 38 px; the logo strip and hero badge are hidden on phones; pinned-hero overlap is shortened to 38 dvh.

**Strongest decisions [I]**
1. The draggable before/after is the main proof of value, placed right after the hero.
2. "Four steps, one of them is human" states the AI/human split openly and matches the FAQ's honesty about buildability.
3. Flat per-room pricing with a "Most booked" middle tier makes the decision simple.
4. A low-friction request form: three required inputs and a 24-hour promise.
5. A restrained, warm dark palette with one copper accent gives the page a premium, calm feel appropriate to interiors.

**Observations / hypotheses [I], not documented problems**
* The primary CTA promises "concepts free" but the form only sends contact details; there is no concept generation in the code. A prototype must say so.
* The reviews block contains duplicates: two of the six cards are longer versions of two others (S. Hansen and L. Moreau appear twice) [S].
* The footer e-mail is `studio@maisonai.design` and the phone number is a UK-format placeholder; neither matches the MUZA name (probably left over from an earlier name) [S].
* The "Featured in" press names, review names, prices, project budgets and the Amsterdam case-study numbers are presented as facts. Unless they are real, they are sample content and must be labelled that way [C].

## D. Visual design system (verified from CSS [S])

**Colour**
| Token | HEX | Role |
|---|---|---|
| `--bg` | **#171616** | Page background |
| `--bg-soft` | **#1F1D1D** | Raised surfaces |
| `--ink` | **#F2EEE6** | Primary text |
| `--ink-dim` | **#C2BCA9** | Secondary text |
| `--ink-faint` | rgba(194,188,169,.55) | Tertiary text |
| `--copper` | **#B58A58** | Brand accent: eyebrows, highlights, selection |
| `--ice` | **#8FB4CC** | Cool secondary accent (ambient glow) |
| `--border` | rgba(255,255,255,.08) | Hairlines |
| `--panel` | rgba(31,29,29,.55) | Glass panels |
Other hexes in the CSS (roles not extracted): #C9A06C, #B9AD8E, #1A140C, #1c1812, #221807. Ambient background: radial glows in copper (5%) and ice (8%).

**Typography**
* **Montserrat** (400 / 500, italics available): headings. H1 60 px / 500 / line-height 1.3 / −0.01 em (38 px on phones); H2 34 px / 500 / 1.2 / −0.02 em; H3 20 px / 400 / 1.05 / −0.05 em.
* **Lora** (400 / 500, italics): body 16 px / 1.45; eyebrow labels 12 px, uppercase, 0.16 em tracking, copper, with a 22 px rule before the text.

**Layout and components**
* Content width 1240 px, side padding 32 px (26 px ≤1024, 20 px ≤768).
* Radii: 28 / 18 / 10 px (large / medium / small). Easing `cubic-bezier(.22,.9,.32,1)`.
* Components present [S]: pill buttons with magnet hover, pricing cards with cursor spotlight, FAQ accordion, before/after compare slider, modal with dropzone, slide-in mobile menu, review cards, logo strip.
* Not extracted: exact button paddings, card padding, shadows. [R] Extract from the live DOM once reachable.

## E. Design process: evidence

| Stage | Evidence | Status |
|---|---|---|
| Brief / discovery | none in repo or notes | **Missing** [C] |
| Research | none | **Missing** |
| Information architecture | visible in the final structure | Inferable only |
| Wireframes, visual exploration | none | **Missing** |
| Design system | tokens in CSS | Documented (as code) |
| High-fidelity UI | the page itself | Documented |
| Prototyping | working interactions (slider, modal, accordion, reveal, pinned hero) | Documented |
| Responsive adaptation | media queries | Documented |
| Testing / iteration | 5 update commits over 3 days | Iteration only; no tests |
[R] Do not claim research, wireframes or testing for MUZA unless you have artefacts. The honest story is "designed and built the landing page; AI-assisted visuals."

## F. Key design decisions (3–5)
1. **Make the AI/human split the story.** *Challenge:* AI-only interior tools look impressive but ignore real rooms. *Solution:* a four-step process where step 3 is a designer, plus an FAQ that says AI output is "not buildable on its own". *Benefit [I]:* sets honest expectations and justifies the price gap between Concept (€49) and Project (€349).
2. **Prove the claim with a before/after slider.** *Solution:* drag-to-compare with real-looking project cards and budgets underneath. *Benefit [I]:* shows the "distance" instead of describing it.
3. **One flat price per room, shown up front.** *Solution:* three tiers; middle tier highlighted "Most booked"; FAQ explains what the price depends on. *Benefit [I]:* removes the main objection to hiring a designer.
4. **A single, forgiving conversion path.** *Solution:* every CTA opens one modal asking only name, email and photos, with format limits (JPG/PNG/HEIC, 10 photos, 20 MB) and a 24-hour reply promise. *Benefit [I]:* low effort, clear expectation.
5. **Calm, cinematic atmosphere without hurting access.** *Solution:* warm dark palette with copper accent, a hero that stays pinned while content slides over it, videos that only play in view, and a no-motion fallback that stacks sections normally. *Benefit [I]:* premium feel with `prefers-reduced-motion` respected.

## G. Results and limitations
* **Delivered [S]:** one complete responsive landing page with real interactions.
* **Functional [S]:** navigation, slider, accordion, modal form UI with file selection, thank-you state, legal modal. **Not functional:** form submission, analytics, AI concept generation, social links.
* **Outcomes:** none documented. Do not publish metrics, conversions, press mentions, client reviews or prices as real results.
* **Known limitations [S/I]:** placeholders (og:url, analytics, social links, form endpoint); brand leftovers (`maisonai.design`); duplicated reviews; media are AI-generated (see assets).
* **Next steps [R]:** connect the form to a real endpoint, replace sample content or label it, unify the contact details, fix duplicates, add real project imagery or label it "AI concept".

---
## Asset inventory

No project files live in the repo besides `index.html` and a zip; all media are on Cloudinary and were **not** inspected visually from here.

| Asset (source) | What it shows | Supports | Status | Action |
|---|---|---|---|---|
| Hero video `hf_20260707_…mp4` (Cloudinary) | Hero background loop. The file name pattern suggests a Higgsfield export [I] | Cover / hero | Available, unverified | Capture a poster frame; confirm origin [C] |
| `AI_interior_design_presentation___202607071642…webp` | Hero poster and social image | Cover, overview | Available, unverified | Export 1600×1000 |
| `Bedroom_beforewebp_…` / `Bedroom_after_…` | Before/after pair for the slider | Key screens | Available, unverified | Capture the slider states |
| `Luxury_bedroom_Vienna_apartment_2K_…`, `Kitchen_with_Rotterdam_skyline_2K_…`, `Living_room_with_panoramic_windows_…` | Project card images | Work section | Available, unverified | Label as AI-generated concepts |
| Process video (file name is a text-to-video prompt: "Static camera. An empty modern concrete apartment is gradually scanned by an AI…") | Process loop | Process section | Available; **evidently AI-generated** [S: file name] | Disclose |
| CTA video `0714_cjpc6m.mp4` | CTA background | CTA | Available, unverified | Poster frame |
| Full-page desktop and mobile captures | n/a | Final presentation | **Missing** | Capture from the live site |
| Modal / form states, pricing, FAQ close-ups | n/a | Key screens | **Missing** | Capture |
| Design-system sheet (palette, type) | n/a | Design system | **Missing** | Build from the verified tokens above |
| Wireframes, flow | none | Process | **Missing** | Only if they exist |

## Behance-style outline (MUZA)

| # | Section | Final copy (EN; draft, [C] items need your OK) | Visuals | Notes |
|---|---|---|---|---|
| 1 | Cover | **MUZA.** AI-assisted interior design, finished by designers. | Hero capture | |
| 2 | Introduction | MUZA is a landing page for an interior design service that combines AI-generated concepts with a designer's review. The goal was to explain that split clearly and make it easy to start a project. | Hero + before/after | [C] concept or client work |
| 3 | Overview | **Type** Website design / UI/UX · **Status** Front-end prototype · **Role** [C] · **Tools** HTML/CSS/JS, Cloudinary, Google Fonts; AI tools for imagery [C] | none | |
| 4 | Challenge | AI interior tools produce beautiful pictures that ignore real rooms. The page had to sell speed without hiding the human step. | Process section | |
| 5 | Structure | Hero → proof (before/after) → process → case study → pricing → reviews → CTA → FAQ. | Full page | |
| 6 | Visual direction | A warm, dark palette with one copper accent; Montserrat for headings, Lora for text. | Palette + type sheet | |
| 7 | Key interactions | Before/after slider, pinned-hero overlap, request modal with photo upload. | Captures | |
| 8 | Responsive | One page from desktop to phone: grids collapse, navigation becomes a slide-in menu, motion is reduced on request. | Mobile captures | |
| 9 | Limitations | The form is a prototype and imagery is AI-generated. | note | **Must be stated** |

## Website copy (English) for the portfolio
* **Category:** Website Design / UI/UX
* **Status badge:** Prototype [C]
* **Card description:** MUZA is a landing page for an AI-assisted interior design service. It explains how AI concepts and a designer's review work together, shows the result with a before/after slider and makes starting a project a single step.
* **Highlights:** Before/after proof · Four-step process · Flat per-room pricing · Photo-upload request flow
* **Note on the page:** Imagery is AI-generated; prices, reviews and project figures are sample content. [C]

---
## Remaining gaps (only what the code and repos cannot answer)
1. Is MUZA a client project, a concept, or a personal build? (Determines the status badge.)
2. Your role and the tools you used, specifically for MUZA.
3. Which numbers and names are real? Prices, the three project budgets, the Amsterdam case study, review authors, the "Featured in" names. If none are real, they will be labelled sample content.
4. Origin of the imagery and videos (AI tool and licence). File names suggest AI generation.
5. Intended audience and market (EU only? English only?).
6. Any brief, Figma file or notes, if they exist outside the repos.
7. Live-site check: once `muza-ai-assisted-interior-design.vercel.app` is allowed in the network settings, I will verify that the deployed page matches the repo (the repo's latest commit is 16 Jul 2026) and capture real screenshots.

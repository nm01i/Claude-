# GIFT MATCH: research report

Source: Figma file `JP5UkqTqxeYwHRpm4VdSeR` (read via the Figma connector). Labels: [V] verified, [I] interpretation, [R] recommendation, [C] confirm, [E] estimated.

---
## A. Project overview

| Item | Finding |
|---|---|
| Name | **Giftmatch**. Written lowercase "giftmatch" as the wordmark, "Giftmatch" in layers [V]. The footer e-mail is `support@giftly.com` [V], so the product name is inconsistent [C] |
| Category | Online gift-selection service, landing page [V] ("концепция современного онлайн-сервиса по подбору подарков") |
| Purpose | A clear, emotional, intuitive interface that helps a visitor "quickly find *that* gift without a complicated search" [V, board text] |
| Platform | Responsive website. Desktop frame 1200 px, mobile frame 320 px, tablet and phone mockups on the board [V] |
| Status | **Concept** [V, board: "Этот проект — концепция…"]. The board's work list says "Брифинг, прототип, верстка" [V]. Whether a built (e.g. Tilda) version exists or is published is unknown [C] |
| Your role | UX research, site structure, UI design, responsive versions [V, your own board] |
| Tools | Figma [V]. Tilda is mentioned only as the target for layout ("Сетка удобна для дальнейшей верстки на TILDA") [V]; actual use [C] |
| Scope | One landing page: desktop, tablet and mobile adaptations; wireframe → prototype → modular layout → final UI → presentation board |
| Language | UI copy is Russian [V] while the offer is EU delivery in euros [V] [C: intended audience and language] |

## B. Goal and problem definition

**From your board [V]**
* Goal: a clear, emotional, intuitive interface for fast gift selection without complex searching.
* Core idea: "not just a product catalogue but selection scenarios": by occasion (birthday, anniversary, New Year), by recipient (for her, him, a colleague), by budget, by interests.

**Audience [I], not stated in the sources.** Derived from copy: people choosing a gift for someone else (girlfriend, gamer boyfriend, wife, colleague, an 8-year-old boy, a friend) in EU countries [V copy: "delivery across EU countries", "from €20"]. [C] Is this the intended audience?

**Needs and pain points [I], inferred from interface copy, not from research**
* Not knowing what to buy → short questionnaire, ideas "in 2 minutes".
* Lack of time → "5-minute checkout", "we save your time and effort".
* Fear of a bad gift → "100% guarantee, a new gift free if it misses".
* Effort of buying and sending → "packaging, card and delivery to the door".
* Wanting something personal → engraving, photo or card customization.
* Needing a human option → free consultation callback within 30 minutes.

**Usage scenarios [I]:** gift for a partner; a colleague at New Year; a child; "a friend with no occasion"; a budget-limited gift (from €20). These match the example gift sets in the design [V].

**Constraints [V]:** layout meant to be reproducible in Tilda (12-column grid, 40/20/75 px).

**Research honesty.** 15 reference-site screenshots exist in the file [V], but there are no interviews, surveys, competitor matrix or usability notes in the file. Do not claim user research or testing. [C] What did "UX-исследование" in your role list consist of?

## C. UX and information architecture

**Structure of the final page [V], top to bottom**
1. Header: logo, anchors *Gifts / Boxes / Reviews / FAQ*, phone, Telegram and WhatsApp icons.
2. Hero (lilac-purple panel): "Ready gift from €20, delivery across EU countries", one-sentence questionnaire promise, primary CTA **Gift selection**, illustration, oversized ghost wordmark.
3. "Choose the right option with gift search": six cards labelled "stage 1–6": questionnaire, surprise boxes, interests, age, customization, **consultation** (the only filled-colour card).
4. Film-strip photo band + CTA block "Ready to choose a gift?": leave details, a manager sends a questionnaire within 1 minute.
5. "Advantages of our services": six advantage cards + two illustrations.
6. "Gifts that already brought joy": carousel of example gift sets (with arrows).
7. Promo CTA: "Order now and get −15%" + referral line "Tell friends, get a bonus".
8. "Popular questions": four-item accordion.
9. "Reviews of our customers": carousel of four quote cards.
10. Footer: tagline "Your lifesaver for any occasion", address / contacts / socials, oversized wordmark.

**Navigation model:** single-page anchor navigation; conversion paths repeat at hero, mid-page, promo and footer [V]. Three contact channels (phone, Telegram, WhatsApp) [V].

**Main user tasks [I]:** (1) start the questionnaire, (2) pick a ready box or gift idea, (3) ask for a consultation, (4) order with the −15% offer.

**Responsive behaviour [V, board + mobile frame]:** two-column desktop grids become a single column on mobile; the header collapses to phone icon + burger; stage cards stack; carousels keep arrows; the film-strip is tilted and cropped.

**Evolution across stages [V]**
| Stage | Hero line | Section title |
|---|---|---|
| Wireframe | placeholder | "Поможем подобрать подарок… за 5 минут" |
| Prototype | "Подберём подарок от 20 €, с бесплатной доставкой по ЕС" | "6 способов, как подобрать идеальный подарок" |
| Final | "Готовый подарок от 20 €, доставка по странам ЕС" | "Выберите подходящий вариант с поиском подарка" |

**Strongest decisions [I]**
1. Scenario-based selection instead of a catalogue (the core idea, stated by you).
2. The hero states price floor, region and effort (€20, EU, 2 minutes) in one line, and has one primary CTA.
3. The consultation card is the only solid-colour card, so the human fallback is visible without competing with the five selection methods.
4. One card pattern (number chip + title + 12 px description) reused across stages, advantages, FAQ and reviews, which keeps the long page calm.
5. Emotional photography and line illustrations carry the "gift" feeling while the UI stays minimal.

**Observations / hypotheses (not documented problems) [I]**
* Cards are labelled "этап" ("stage") 1–6, but they are parallel *ways* to choose, not sequential steps. The prototype title said "6 ways". Consider "способ" / "way".
* Two advantage cards reuse the same description text ("Учитываем возраст, интересы…" appears under both "idea for a specific person" and "any budget from €20") [V].
* The "gifts that already brought joy" gallery and the four testimonials look like sample content; the gallery photos are layers named `unsplash:…` [V], i.e. stock photography. In a concept they must be labelled as sample content.
* Copy slips in the final frame [V]: "Подрок для жены" (typo), "в течении" (should be "в течение"), "свяжется с вами" (should be "свяжемся"), "комнатный растение" (gender), informal "скинем". The footer shows placeholders "(адрес)", "(контакты)", "(соцсети)" and a placeholder-style phone `+44 20 1234 5678`.

## D. Visual design system

### Colour: two palettes exist in the file [V]. Confirm which is final [C]

| Source | Token | HEX | Role |
|---|---|---|---|
| Board (`728:41`…) | Rich Grey | **#3C3C3C** | Text |
| Board | Bright Purple | **#9269F5** | Brand accent |
| Board | White | **#FFFFFF** | Surfaces |
| Board | Alice Blue | **#F4F6FF** | Page / card tint |
| Final UI frames (generated style values) | Deep purple | **#7553C7** | Hero panel, number chips |
| Final UI | Violet | **#916EE4** | Consultation card, ghost wordmark in hero |
| Final UI | Pale lilac | **#E3DDF4** | First phrase of the hero headline |
| Final UI | Cool white | **#F7F8FC** | Card, FAQ and review backgrounds |
| Final UI | Grey | **#3C3C3C** | Body and heading text (same as board) |
| Final UI | White | **#FFFFFF** | Buttons, chips, advantage cards |

Cover/board background is a light lilac and illustrations use a very dark indigo line [E]: not measured, do not publish hex values for them.
No status or error colours exist [V: no forms or states in the file].

### Typography [V]
* **RockStar**: display. Hero headline 54 px, leading 0.9, tracking −2.16 px; consultation title 35 px, leading 1, tracking −1.05 px; wordmark **170 px, ExtraBold, lowercase**, tracking −3.4 px.
* **Inter** (Light, Regular, Medium): UI and body. Card titles 23 px (leading 0.9, tracking −0.92 px on advantage cards); FAQ question 23 px, tracking −0.69 px; body 12 px Regular; chip labels 12 px Light; chip numbers 10 px Light.
* Early type note in the file: H1 50 / H2 35 / H3 22 / text 15 px [V]. The final UI uses 54 / 35 / 23 / 12 px. [C] Which is intended?
* Two-tone headlines: part of each section title is set in purple [V visual; exact colour [E]].

### Layout and components [V]
* Desktop frame 1200 px; page margin 40 px; content width 1120 px; **12-column grid: 40 px margins, 20 px gutters, 75 px columns** (12×75 + 11×20 = 1120).
* Spacing: card padding 20 px; internal gap 20 px; grid gap 20 px.
* Radii: cards 10 px; hero panel 15 px; pills 500 px (fully round).
* Buttons: white pill, 12 px Inter label, 24 px circular arrow icon at the right, padding 5 / 5 / 5 / 20 px, gap 20 px.
* Stage chip: pill with a 15 px purple number circle and a 12 px light label ("этап" / "преимущество").
* Cards: stage 550×187, advantage 265×198; FAQ row padding 15 / 10 / 15 / 20 px, 24 px plus icon; testimonial card with a 35×27 quote glyph.
* Icons: Telegram and WhatsApp in 31 px squares; arrow and plus icons are 24 px vector groups.
* Shadows: none found in the extracted nodes [V].
* Not documented: hover, focus and pressed states, form fields, motion.

## E. Design process: evidence per stage

| Stage | Evidence | Assets | Status |
|---|---|---|---|
| Brief / discovery | Board lists "Брифинг" | none; no brief document in the file | Claimed, **no artefact** [C] |
| Research | 15 reference-site screenshots; role text says "UX-исследование" | `243:*`, `287:75`, `457:36`, `476:15` | References only; no analysis [C] |
| Information architecture | Section order and wireframe | `16:2` | Documented |
| User flow | none (only the questionnaire/consultation CTAs imply one) | none | **Missing** |
| Wireframe | Grey low-fi with placeholder copy | `16:2` | Documented |
| Prototype / mid-fi | Grey page with real copy | `58:9`, `123:8`, `252:20` | Documented |
| Visual exploration | none (no moodboard, no alternative directions) | none | Missing |
| Design system | Grid, fonts, palette on the board; type note | `728:*`, `731:*`, `13:241` | Partial (two palettes) |
| High-fidelity UI | Final desktop (two copies) | `304:82`, `495:43` | Documented |
| Responsive | Mobile frame + tablet and phone mockups | `464:115`, board groups | Documented |
| Testing / iteration | Visible iteration across stages; no tests | stage frames | Iteration yes, testing no |

## F. Key design decisions (3–5)

1. **Selection scenarios instead of a catalogue.** *Challenge:* gift buyers do not know what they want, so a product grid fails them. *Solution:* occasion / recipient / budget / interest scenarios, entered through one short questionnaire. *Visible in:* hero CTA, six selection cards, example gift sets named by recipient ("for a cozy-loving girl", "for a gamer boyfriend"). *Benefit [I]:* the visitor answers questions instead of browsing.
2. **A hero that answers "what, how much, where, how fast".** *Solution:* one headline with price floor, region and delivery, a one-sentence questionnaire promise and a single primary button. *Benefit [I]:* qualifies the visitor in one screen.
3. **Consultation as a distinct fallback.** *Challenge:* some visitors still will not fill a questionnaire. *Solution:* the sixth card is the only solid-colour card, with a free 30-minute callback. *Benefit [I]:* a visible human path next to five self-serve ones.
4. **One modular card system.** *Solution:* the same pill chip, 10 px radius, 20 px padding and 12 px text across stages, advantages, FAQ and reviews, on a 12-column Tilda-friendly grid. *Benefit [I]:* a long page that stays consistent and is easy to build.
5. **Brand device and imagery.** *Solution:* oversized lowercase wordmark as a ghost element in the hero and a solid sign-off in the footer; line illustrations in brand colours; photo film-strips as section dividers. *Benefit [I]:* emotion without adding UI noise.

## G. Results and limitations
* **Delivered [V]:** wireframe, prototype, modular layout, final desktop UI, mobile layout, tablet/phone mockups, a presentation board.
* **Functional:** not applicable. It is a design concept. [C] Is there a built version?
* **Outcomes:** none documented. Do not publish metrics, conversion rates, testimonials-as-results or client feedback.
* **Known limitations [V/I]:** two palettes and two type scales in the same file; copy errors and placeholders listed above; sample testimonials and stock photos; Russian copy with an EU offer; no user flow, no states, no tested flows.
* **Possible next steps [R]:** unify palette and scale; fix copy; add a user flow of the questionnaire; design hover/focus/error states; design the questionnaire screens themselves; mark sample content explicitly; add an English version for the international audience.

---
## Asset inventory

Status key: **Available** = exists in the Figma file, needs export. **Needs improvement**. **Missing**.
Downloads from Figma's CDN are blocked in this sandbox, so no file could be exported here: exporting from Figma yourself is required for every item.

| Asset | Source (node) | Shows | Supports | Status | Action |
|---|---|---|---|---|---|
| Cover | `734:541` (1840×1077) | Lilac cover: name, work stages, "about", illustration, wordmark | Cover / intro | Available | Export @2× as PNG; crop to 16:10 for the card; text is Russian [C] |
| Idea / concept / role + phone | `734:542` (1920×1115) | Mobile hero with idea, concept, role text | Overview, role | Available | Export; consider an English version of the text |
| Design system board | `734:543` (1920×2253) | Wordmark, 12-col grid, RockStar/Inter, 4 swatches | Palette, type, grid | **Needs improvement** | Palette conflicts with the final UI [C]; update then export |
| Responsive mockups | `734:546` (1920×3476) | Two tablets + two phones | Responsive | Available | Export; check which palette is shown |
| Full page in laptop | `734:547` (1920×3983) | Laptop mockup + full desktop page | Final presentation | Available | Export; replace if copy is fixed |
| Wireframe vs prototype | `734:760` (1920×3690) | Side-by-side wireframe and prototype | Process | Available | Export |
| Wireframe | `16:2` (1200×4698) | Low-fi page | IA, wireframes | Available | Export full page |
| Prototype | `58:9` (1200×4682) | Mid-fi grey page | Process | Available | Export |
| Modular layout | `252:20` (1200×5483), `123:8` | Grey block layout | Process | Available | Export (optional) |
| Final desktop | `304:82` / `495:43` (1200×4994) | Final colour UI | Key screens | Available | Pick one copy; fix typos first |
| Final mobile | `464:115` (320×5777) | Final mobile page | Responsive | Available | Export; consider 390 px version |
| Hero close-up | inside `304:95` | Hero panel | Detail | Available | Export @2× |
| Stage and advantage cards | `304:113`, `409:25`, `508:29` | Card components | Components | Available | Export as a component sheet |
| Illustrations | `318:208`, `322:282`, `362:8`, `409:95`, `409:114`, `508:85` and others | Line-art spot illustrations | Visual direction | Available | [C] source and licence |
| Gift photos | 10 × `unsplash:…`, `Image` fills | Stock photos | Gallery | Available | [C] licence; label as sample |
| Reference screenshots | 15 × `screencapture-…` | Other sites | Research | Available | Internal only; do not publish third-party sites |
| User flow | none | n/a | Flow | **Missing** | Draw one (see Phase 6) |
| Component states | none | n/a | Components | **Missing** | Optional |
| Live / built version | none | n/a | Final | **Missing** [C] | Link or capture if it exists |

---
## Behance-style case study outline (GIFT MATCH)

Length: 10 sections. Sections for user flow, usability testing and results are intentionally omitted until evidence exists.

| # | Section | Purpose | Final copy (EN) | Visuals | Layout | Missing |
|---|---|---|---|---|---|---|
| 1 | Cover | Name and promise | **Giftmatch**. Gift selection, designed around people instead of products. *Concept project* | `734:541` | Full width, lilac | English cover text |
| 2 | Introduction | One-paragraph pitch | Giftmatch is a concept for an online gift-selection service. The goal was an interface that is clear, emotional and intuitive, so visitors can find the right gift quickly without a complicated search. | Hero close-up | Two columns, text left | none |
| 3 | Overview and role | Facts at a glance | **Type** Concept · **Role** UX research, site structure, UI design, responsive versions · **Tools** Figma [C: Tilda] · **Deliverables** wireframe, prototype, desktop / tablet / mobile UI | none | Meta row | Tools [C], year [C] |
| 4 | The idea | Core insight | The site is not a product catalogue. It is built around ways of choosing: by occasion, by recipient, by budget and by interest. | Six selection cards | Cards, one highlighted | none |
| 5 | Structure | IA | A single landing page: hero → six ways to choose → advantages → example gifts → offer → FAQ → reviews → contacts. | Wireframe `16:2` | Wireframe next to section list | User flow |
| 6 | From wireframe to prototype | Process | Wireframe → grey prototype with real copy → modular layout → final design. The hero line and section titles were rewritten at each step to state price, region and effort more directly. | `734:760`, `252:20` | Three-up strip | none |
| 7 | Visual direction | Concept | A light, minimal base, a soft purple palette with accent buttons, large cards and emotional imagery. | Hero, illustrations, film-strip | Image-led | Palette [C] |
| 8 | Design system | System | RockStar for display and Inter for UI. 12-column grid, 40 px margins, 20 px gutters. Palette: [final palette after confirmation]. | `734:543` rebuilt | Board | Palette [C] |
| 9 | Key screens | Show the work | Hero, the six ways to choose, the consultation card, example gifts, offer, FAQ. | Final desktop crops | Alternating full / half | Copy fixes |
| 10 | Responsive | Adaptation | The grid collapses to one column on mobile; the header becomes a phone icon and menu; cards stack and carousels keep their controls. | `734:546`, `464:115` | Device mockups | none |
| 11 | Reflection | Close | [Draft, confirm] The main lesson was to design for decisions instead of inventory. Next steps: unify the palette, design the questionnaire screens and add interaction states. | none | Text | [C] your voice |

## Website copy (English) for the portfolio

* **Card category:** Product Concept / UI/UX Design
* **Status badge:** Concept project
* **Card description:** Giftmatch is a concept for an online gift-selection service. Instead of a product catalogue it guides people by occasion, recipient, budget and interests, so they can find the right gift without a long search.
* **Highlights:** Selection scenarios · Responsive landing page · Modular card system · Wireframe to final UI
* **Overview:** as section 2 above.
* **Role and tools:** UX research, site structure, UI design, responsive versions. Figma. [C: Tilda]
* **Note for the page:** Sample photos, testimonials and contact details in the design are placeholder content.

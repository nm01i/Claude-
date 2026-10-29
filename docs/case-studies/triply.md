# TRIPLY: research report

**Status: researched from the project's own source code and assets (GitHub repo `nm01i/triply`), not from the live site.**

## How this was recovered (and what could not be)

| Source | What it gave | Status |
|---|---|---|
| Repo `nm01i/triply` (private, 10 commits, 11–13 Oct 2026): `TRIPLY-GitHub-Upload/index.html` (338 KB, the whole app, GSAP inlined), `_headers`, 25 images, 64 scrub frames + 8 sprite sheets, 2 scrub videos | Full UI copy, screens, flows, behaviour, data model, design tokens, real interface captures | **[S] Verified in source code and assets** |
| Live site `triply-travel-planner.netlify.app` | Not reachable from this sandbox (host outside the session's allowed domains) | **[L] Not verified live.** The Netlify-style `_headers` file in the repo supports the hosting claim [S] |
| Your first message in this session | Brief: a concept for a travel planning platform for travel designers; focus areas; "concept product, not a commercial SaaS" | [U]. Matches the code |
| Earlier conversations about TRIPLY | **No record is available to me.** Only this session and an unrelated plugin-install session exist on the account; the repo has no README, brief or notes | Not recoverable. Gaps are listed at the end |

Labels: **[S]** verified in source, **[L]** verified live (none yet), **[U]** stated by you, **[I]** interpretation, **[R]** recommendation, **[C]** needs your confirmation.

---
## A. Project overview

| Item | Finding |
|---|---|
| Name | **TRIPLY**; page title "TRIPLY — Dashboard" [S] |
| Category | Travel Planning Platform / Product Design [U] |
| Purpose | "A collaborative workspace for creating meaningful trips together." Tagline: "Design the journey. Not just the destination." [S, hero copy] |
| Users in the product | A **travel designer** (workspace owner, demo persona Camille Laurent) and **clients/travellers** (Emma Wilson as lead traveller; Alex, Mia, Leo) [S] |
| Platform | Responsive web app with a cinematic landing intro; desktop, tablet and phone layouts (breakpoints 640 / 720 / 860 / 980 / 1080 px); dedicated phone video and phone screenshots [S] |
| Status | **Concept front-end prototype.** Code comments: bookings and client sections are "local state only (no backend, no real bookings or payments)"; custom activities have "no backend, no route calculation"; state is stored only in the browser (`localStorage` key `triply-workspace-v1`) [S]. Not a commercial SaaS [U][S] |
| Build | One hand-written HTML file: vanilla JavaScript, CSS, **GSAP 3.12.5 + ScrollTrigger** inlined, Instrument Sans from Google Fonts. Hosting config: Netlify `_headers` (long cache for `/assets/img/*`) [S] |
| Timeline | Repo commits 11–13 Oct 2026; three large videos (horses, Prague, Venice) were added and then deleted, leaving only the Kyoto scrub clips [S] |
| Your role and tools | Not in the repo. Role: [C]. Whether AI tools were used for code, imagery or video: [C] |

## B. Goal and problem definition

**From your brief [U] and the product copy [S]**
* Goal: a workspace where a travel designer collects places, builds day-by-day itineraries, manages bookings and shares the plan with clients, who can review, suggest, vote and approve.
* The three pillars on the landing page: **Collect** ("Gather places and ideas. Trip details, route and progress live in one calm overview.") · **Organize** ("Shape every day. Day-by-day itineraries with real routes and travel time.") · **Collaborate** ("Plan it together. Clients view the plan, suggest places, vote and approve.").

**Audience [S/I]:** professional travel designers and their clients (the product models exactly these two roles).

**User needs, inferred from the feature set [I], not from research:** keep one source of truth per trip; plan by day with times and transit; track bookings and costs; give clients a clear way to give feedback without editing the plan.

**Constraints visible in code [S]:** heavy cinematic intro must still work on phones (separate portrait video, JPEG-sequence canvas on touch devices), with `prefers-reduced-motion` and Save-Data fallbacks; no backend, so all data is demo data.

**Not documented [C]:** original brief document, whether real travel designers were consulted, why these three trips. Do not claim research or testing.

## C. UX and information architecture

**Flow [S]**
1. **Cinematic intro** (scroll-driven): "Every journey begins as a feeling." → "Then it finds a street." → "And keeps moving." Scrolling scrubs a Kyoto video frame by frame; photo cards (Venice, Prague, Kyoto, Florence, mountain horses) fan out and tuck into a **Trip Folder**, which hands over to the product. Controls: "Open workspace", "Skip intro", "Play footage"; nav: Product / Case Study / Explore (the Case Study link is intentionally inert: code comment "no Case Study section exists yet").
2. **Dashboard:** greeting "Good morning, Camille", "Your trips": three folder cards (Japan / Autumn Escape, Amalfi / Summer Escape, Norway / Northern Light) with destinations, dates, status and progress bar, plus "New trip".
3. **Trip workspace** (opened by an animated folder → hero transition) with tabs **Overview · Itinerary · Bookings · Client**:
   * *Overview:* trip details (days, destinations, client, preferences), itinerary preview, route with transit times, trip progress (Itinerary, Bookings x/y, Client review, Overall %).
   * *Itinerary:* day pills (01…13 for Japan), per-day stops with time, place, tag, duration and transit minutes; a schematic map with pins; add a custom activity; an "optimize route" demo that shortens transit by ~40% and moves later stops earlier.
   * *Bookings:* seeded bookings by category (accommodation, transport, activity, other) with provider, date, cost, status confirmed/pending; add, edit, mark confirmed, total cost.
   * *Client:* switch between designer view and client view. Client: review, suggest places, vote on suggestions, request changes, approve the trip. Designer: review suggestions and decide what enters the itinerary; history log.
4. **Top navigation (persistent):** Dashboard · Trips · Clients · Templates (Clients and Templates are minimal sections), plus icon buttons for settings and messages and an account menu (avatar "CL").

**Main tasks [I]:** see all trips at a glance → open a trip → plan days → track bookings → share with the client → collect feedback and approval.

**Responsive behaviour [S]:** separate phone screenshots (390×844) and phone video; navigation and panels reflow below 720–860 px.

**Strongest decisions [I]**
1. A sticky, quiet top bar and a calm warm-grey/white canvas keep dense trip data readable.
2. The **Trip Folder** metaphor for the dashboard, with a folder-to-workspace transition, makes each trip feel like a physical object.
3. Overview and Itinerary share one data source ("same tab, same trip, same data"), so a change in one is reflected in the other.
4. Explicit two-role collaboration: the designer controls the final itinerary; clients can suggest, vote and approve but not edit it.
5. A reusable schematic-map component whose pin layout adapts to the number of stops, so every trip and day uses the same component.

**Observations / hypotheses [I], not documented problems**
* The landing copy promises "real routes and travel time", but the map is schematic and the code states there is no route calculation. Travel times are demo data.
* Demo data is not time-consistent: the Japan trip is dated 12–24 Oct 2026 with "12 days" in the header but 13 day pills; Japan is "Planning 72%" although its dates are before 29 Oct 2026; Norway (18–26 Nov 2026) is "Completed 100%"; Amalfi (Jul 2026) is "In planning 45%".
* The "Case Study" link in the intro navigation does nothing.
* The imagery of the intro (Kyoto, Prague, Venice, Florence, horses) looks AI-generated or heavily graded, and its origin is not stated in the repo [C].
* All people and e-mail addresses are demo (`example.com`).

## D. Visual design system (verified from CSS [S])

**Colour**
| Token | HEX | Role |
|---|---|---|
| `--bg` | **#F3F1EB** | Page background (warm off-white) |
| `--surface` | **#FFFFFF** | Cards, panels |
| `--text-primary` | **#18201F** | Text |
| `--text-secondary` | **#5C635F** | Secondary text |
| `--border` / `--track` | **#DDDCD5** | Borders, progress track |
| `--accent` | **#6B55FF** | Primary accent: buttons, active tab, links |
| `--accent-soft` / `--ai-surface` | **#EEE9FF** | Accent tint, highlighted surfaces |
| `--success` | **#4E6B64** | Positive state |
Other hexes in the CSS (roles not extracted, [I] guesses only): #5A44EE and #5C48EE (accent hover or pressed), #C55252 and #F4E4E4 (error or danger and its tint), #E3ECE9 (success tint), #FAF9F5 (alt surface), #1b1812 and #2a241b (dark overlays for the intro).

**Typography**
* **Instrument Sans** (400, 500, 600, 700, italic 400) is the only family.
* Logo 20 px / 700 / −0.01 em. Sizes used: 10–15 px (UI), 18–28 px (panel titles), 34–48 px (section titles, fluid), hero title `clamp(48px, 9vw, 150px)`.

**Layout and components**
* Top bar max-width 1220 px, padding 18 px 40 px; other containers 1080 / 980 / 860 / 720 / 640 px.
* Radii: 2, 4, 8, 10, 12, 14, 16, 18, 20 px, 999 px (pills), 50% (avatars).
* Shadows: soft elevation (`0 12px 24px -18px rgba(24,32,31,.14)`, `0 18px 40px rgba(24,32,31,.16)`) and accent glow on primary buttons (`0 14px 30px rgba(107,85,255,.35)`).
* Components [S]: sticky blurred top bar, trip folder cards with progress bars, glass chips, tabs row, panels, day pills, schematic map, booking forms, suggestion cards with votes, status pills, account menu.
* Not extracted: spacing scale values, icon set, state specs. [R] Extract once the live DOM is reachable.

## E. Design process: evidence

| Stage | Evidence | Status |
|---|---|---|
| Brief / discovery | your first message; no document | Stated only [U] |
| Research | none | **Missing** |
| Information architecture / flows | readable in the final product; no diagrams | Inferable only |
| Wireframes, visual exploration | none in repo | **Missing** |
| Design system | tokens in CSS | Documented (as code) |
| High-fidelity UI | working screens, plus four desktop and four phone captures | Documented |
| Prototyping | working interactions with persisted local state | Documented |
| Responsive adaptation | media queries, phone assets | Documented |
| Iteration | 10 commits over 3 days; removal of three videos | Iteration only; no testing |
[R] Honest framing: "designed and built an interactive concept prototype". Do not claim research, wireframes or usability tests.

## F. Key design decisions (3–5)
1. **Sell the idea before the tool.** *Challenge:* a planning dashboard is abstract. *Solution:* a scroll-driven intro whose video is scrubbed by scroll position, fading into photo cards and a Trip Folder. *Implementation:* GSAP ScrollTrigger; frame-accurate seeking on desktop; a pre-extracted JPEG sequence drawn on a canvas on touch devices (video seeking is unreliable there). *Benefit [I]:* the same smooth scrub on every device.
2. **One folder per trip.** *Solution:* dashboard cards are stylized folders (Japan, Amalfi, Norway art) with destinations, dates and progress; opening one animates the folder into the workspace hero. *Benefit [I]:* a memorable, tactile entry point.
3. **One source of truth per trip.** *Solution:* Overview and Itinerary read from the same trip data, and a tab shortcut moves from one to the other. *Benefit [I]:* no contradictions between summary and detail.
4. **Designer-controlled collaboration.** *Solution:* client view (review, suggest, vote, request changes, approve) vs designer view (decide what goes into the itinerary), with an activity history. *Benefit [I]:* clients participate without breaking the plan.
5. **Honest prototype behaviour with useful interactions.** *Solution:* local state with persistence, a reusable schematic map, custom activities, and a "route optimization" demo that visibly redraws the route and updates times. *Benefit [I]:* the flows can be demonstrated end to end without a backend.

## G. Results and limitations
* **Delivered [S]:** cinematic intro, dashboard, three fully populated trips (13, 8 and 9 days of itinerary), booking and client-review flows, mobile and reduced-motion handling.
* **Functional [S]:** navigation, tabs, itinerary rendering, adding/editing bookings and activities, voting, requesting changes, approving, persistence in the browser. **Not functional:** any backend, real routing, real bookings or payments, authentication, sharing links, the Case Study link.
* **Outcomes:** none documented. Do not publish metrics, users or feedback.
* **Known limitations [S/I]:** schematic map and demo times despite "real routes" copy; inconsistent demo dates and statuses; heavy media payload (≈14 MB of video plus 64 frames and sprite sheets) [S]; imagery origin unstated.
* **Next steps [R]:** align the copy with what the prototype does, fix demo data, add a real map and routing, add a client share link, test with real travel designers.

---
## Asset inventory (all in the repo under `TRIPLY-GitHub-Upload/assets/`)

| Asset | Shows | Supports | Status | Action |
|---|---|---|---|---|
| `ac3bf4dc23.jpg` (1440×900) / `aa4c52693e.jpg` (390×844) | **Dashboard** screen, desktop / phone | Key screens | Available | Use as the cover candidate; crop 16:10 |
| `4a35130696.jpg` / `dbf5caf7d6.jpg` | **Trip overview**, desktop / phone | Key screens | Available | Use |
| `08f4909246.jpg` / `b271e83689.jpg` | **Itinerary** with map, desktop / phone | Key screens | Available | Use |
| `f4b8fe555f.jpg` / `75e0996d36.jpg` | **Client** tab (suggestions, votes), desktop / phone | Key screens | Available | Use |
| `72e34e2857.webp`, `78d69d6df8.webp`, `330ad999af.webp` (900×720, alpha) | Trip folder artwork: Japan, Amalfi, Norway | Visual direction | Available | Use as detail images |
| `014c9841cc`, `cda4d63297`, `15dadfe606`, `ad3f2808fa`, `77b0aec5b5` (720×405 or 1280×720) | Photo cards: Venice, Kyoto, Prague, Florence, mountain horses | Intro story | Available | Label as concept imagery; origin [C] |
| `poster-kyoto.jpg`, `poster-kyoto-m.jpg`, `poster-venice.jpg`, `poster-prague.jpg` | Intro posters | Cover alternatives | Available | |
| `story/kyoto-scrub.mp4` (1280×720, 8 s, 6.9 MB), `kyoto-m-scrub.mp4` (720×1280, 8 s, 7.7 MB) | Scroll-scrubbed intro footage | Intro | Available | Record a screen capture for Behance |
| `seq/k001…k064.jpg` (960×540), `seq-sheets/d1–d4`, `m1–m4` (4×4 sprite sheets) | Frame sequence for touch devices | Technical | Available | Not for presentation |
| Unused files: `353187a4b7.jpg`, `54cd9ea84e.jpg`, `7ca250c60b.jpg`, `horses-portrait-poster.jpg`, `poster-horses.jpg` | Duplicates of used images | none | Available | Safe to ignore |
| Full-page captures of every tab, trip and state | n/a | Final presentation | **Missing** | Capture from the live site |
| Flow diagram, wireframes | none | Process | **Missing** | Only if they exist |
| Component / design-system sheet | n/a | Design system | **Missing** | Build from the verified tokens |
The four screen pairs are consistent with the app's DOM and layout [S]; I could not confirm whether they were exported from a design file or captured from the running app [C].

## Behance-style outline (TRIPLY)

| # | Section | Final copy (EN; draft, [C] needs your OK) | Visuals | Notes |
|---|---|---|---|---|
| 1 | Cover | **TRIPLY.** Design the journey, not just the destination. *Concept prototype* | Dashboard `ac3bf4dc23` + folder art | |
| 2 | Introduction | TRIPLY is a concept for a collaborative workspace where travel designers plan trips with their clients: collecting places, shaping each day, tracking bookings and getting feedback and approval in one place. | Overview screen | |
| 3 | Overview | **Type** Concept prototype · **Users** travel designers and their clients · **Role** [C] · **Tools** HTML, CSS, JavaScript, GSAP [C: AI tools] | none | |
| 4 | Challenge | Trip planning lives across documents, chats and spreadsheets. The concept puts the plan, the bookings and the client's feedback into one calm view. [I] | Dashboard | [C] confirm framing |
| 5 | Structure | Dashboard of trips → trip workspace with four tabs: Overview, Itinerary, Bookings, Client. | Screens strip | no flow diagram |
| 6 | The opening | A scroll-driven intro turns a video into photo cards and then into a trip folder. | Folder art + intro frames | |
| 7 | Itinerary | Day-by-day plans with times, transit, a map and a route optimisation demo. | `08f4909246` | map is schematic |
| 8 | Collaboration | Clients suggest places, vote, request changes and approve; the designer decides what enters the plan. | `f4b8fe555f` | |
| 9 | Visual system | Warm off-white canvas, white panels, one indigo accent; Instrument Sans throughout. | Palette + type sheet | |
| 10 | Responsive | The same product on phone, with a portrait intro and a sequence-based scrub for touch devices. | phone captures | |
| 11 | Limitations and next steps | Local data only, schematic map, demo trips. Next: real routing, sharing links, testing with travel designers. | note | |

## Website copy (English) for the portfolio
* **Category:** Travel Planning Platform / Product Design
* **Status badge:** Concept project
* **Card description:** TRIPLY is a concept for a collaborative travel planning workspace. Travel designers build day-by-day itineraries, track bookings and share the plan with clients, who can suggest places, vote and approve.
* **Highlights:** Trip dashboard · Day-by-day itinerary · Bookings · Client review and approval · Scroll-driven intro
* **Overview, role, tools:** as sections 2–3. Demo content only; no real users or bookings.

---
## Remaining gaps (only what the repo and code cannot answer)
1. Your role and tools for TRIPLY, including any AI tools for code, imagery or video.
2. Origin of the intro imagery and videos (tool and licence); the repo does not say.
3. Original brief or notes, if they exist outside the repo (no earlier-conversation record is available to me).
4. Whether the four screen pairs were exported from a design file or captured from the running app.
5. Is "Case Study" in the intro navigation meant to link to this portfolio page?
6. Live-site check: once `triply-travel-planner.netlify.app` is allowed in the network settings, I will confirm it matches the repo (latest commit 13 Oct 2026) and capture full-page screenshots.

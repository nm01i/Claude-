# Content model and implementation plan (proposal only)

No code has been changed. Approve or adjust, and I will implement.

## 1. What exists today
`src/content/content.ts` already holds `Project` with `id, slug, number, title, category, kind, description, highlights, coverImage, images, year, liveUrl, pending, caseStudy`.
`CaseStudy.tsx` renders the eight section blocks and a "Still to add" list.

## 2. Proposed additions (all optional, so existing entries keep working)

```ts
type Provenance = 'verified' | 'interpretation' | 'confirm';

type Project = {
  /* existing fields … */
  status: 'concept' | 'prototype' | 'live' | 'commissioned' | 'unconfirmed';
  role?: string[];                       // only from verified sources
  tools?: string[];
  sources?: { label: string; url: string }[];       // Figma / prototype / live links you provide
  palette?: { name: string; hex: string; role: string; verified: boolean }[];
  typography?: { family: string; use: string; sizes?: string; verified: boolean }[];
  grid?: string;                         // e.g. "12 columns · 40 px margins · 20 px gutters"
  assetChecklist?: { item: string; status: 'available' | 'needs-improvement' | 'missing'; note?: string }[];
  sections?: CaseSection[];              // richer, ordered case study (replaces fixed blocks where present)
};

type CaseSection = {
  id: string; title: string;
  kind: 'text' | 'image' | 'gallery' | 'palette' | 'type' | 'list' | 'compare' | 'note';
  body?: string; points?: string[];
  images?: ProjectImage[];
  confirm?: boolean;                     // renders an "Editable / to confirm" tag
};
```

## 3. Rendering changes (small)
* `CaseStudy.tsx`: if `sections` exists, render them in order (one renderer per `kind`); otherwise fall back to today's blocks.
* New small components: `PaletteBlock` (swatch + HEX + role, "verified" tick), `TypeBlock`, `MetaRow` (status · role · tools · year), `SourceLinks`.
* `ProjectsSection.tsx` needs no layout change; it already shows five entries. Status badge reads from `status`.
* The hero, monitor transition, navigation, reduced-motion behaviour and routes are untouched.

## 4. GIFT MATCH entry (ready to paste once you approve the data model)
```ts
{
  id: 'gift-match', slug: 'gift-match', number: '05', title: 'GIFT MATCH',
  category: 'Product Concept / UI/UX Design', kind: 'Concept project', status: 'concept',
  description: 'Giftmatch is a concept for an online gift-selection service. Instead of a product catalogue it guides people by occasion, recipient, budget and interests, so they can find the right gift without a long search.',
  highlights: ['Selection scenarios', 'Responsive landing page', 'Modular card system', 'Wireframe to final UI'],
  role: ['UX research', 'Site structure', 'UI design', 'Responsive versions'],
  tools: ['Figma'],                       // Tilda: confirm
  grid: '12 columns · 40 px margins · 20 px gutters · 75 px columns',
  palette: [
    { name: 'Rich Grey',     hex: '#3C3C3C', role: 'Text',            verified: true },
    { name: 'Bright Purple', hex: '#9269F5', role: 'Accent (board)',  verified: true },
    { name: 'Deep Purple',   hex: '#7553C7', role: 'Hero, chips (UI)',verified: true },
    { name: 'Violet',        hex: '#916EE4', role: 'Consultation card (UI)', verified: true },
    { name: 'Pale Lilac',    hex: '#E3DDF4', role: 'Headline tint (UI)', verified: true },
    { name: 'Cool White',    hex: '#F7F8FC', role: 'Cards (UI)',      verified: true },
    { name: 'Alice Blue',    hex: '#F4F6FF', role: 'Tint (board)',    verified: true },
    { name: 'White',         hex: '#FFFFFF', role: 'Surfaces',        verified: true },
  ],                                      // two palettes exist: confirm the final one, then drop the other
  typography: [
    { family: 'RockStar', use: 'Display: headline 54 px, wordmark 170 px ExtraBold', verified: true },
    { family: 'Inter',    use: 'UI and body: 23 px titles, 12 px text', verified: true },
  ],
  coverImage: undefined, images: [],      // exports pending (see asset-production-checklist.md)
  pending: { },
  caseStudy: { overview: { body: '…' } },
  sections: [ /* from the outline in gift-match.md; confirm items flagged */ ],
  assetChecklist: [ /* from gift-match.md inventory */ ],
}
```

## 5. Implementation plan
1. **You:** answer the P0 questions in `questions.md` and unlock or export the four other sources.
2. **Me (small, safe):** add the optional types and the four small components; keep the old rendering as the fallback. Build + overlap/overflow check + reduced-motion check.
3. **Me:** fill GIFT MATCH with the data above. Cover and screens stay labelled placeholders until you export them.
4. **Me, per project as sources arrive:** write the research report from the real source, then the entry, then publish.
5. **You:** drop exported WebP files into `public/projects/<slug>/` and give me the file list; I wire `coverImage` / `images`.
6. QA: five cards, five case routes, back navigation, mobile 375/390, desktop 1440/1920, reduced motion, hero animation unchanged.

## 6. Risks
* Two palettes in the GIFT MATCH file: publishing the wrong one misdescribes the design.
* A possible template base on SAAS: must be disclosed.
* Sample testimonials and stock photos in GIFT MATCH must be labelled as sample.
* Five case studies cannot be honestly "detailed" until sources 2–5 are readable; short and accurate beats long and invented.

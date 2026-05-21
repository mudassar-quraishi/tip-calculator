Frontend Assessment — Tip Calculator — ANSWERS

1) How to run

- Clone the repo and run:

```bash
npm install
npm run dev
```

- Open the URL printed by Vite (typically http://localhost:5173/).

2) Stack & design choices

- Stack: React + Vite. Chosen because it's fast to scaffold, beginner-friendly JSX, and easy to run locally with `npm run dev`.

- Two visual/interaction decisions:
  - Active tip selection: I show preset tip buttons and a separate `Custom` numeric input; clicking a preset clears the custom value so the active tip is always explicit (`src/App.jsx` tip selection section). This keeps intent clear and avoids ambiguity when both a preset and custom value exist.
  - Results panel on the right: I used a two-column layout (`.layout`) so inputs take the larger left column and the live results sit in a compact right column. On small screens it collapses to a single column (CSS `@media` rules in `src/styles.css`). This keeps the live totals visible at a glance on wide screens while keeping inputs first on mobile.

3) Responsive & accessibility

- Behavior: at 360px width the layout stacks vertically (inputs first, results below). At 1440px the layout uses a two-column grid with results fixed-width on the right for quick glanceability (`.layout` and `.results-panel` in `src/styles.css`).

- Accessibility handled: all form controls have labels (`label` + `htmlFor`), custom tip input has `aria-label`, preset buttons are plain `<button type="button">` so keyboard users can tab and activate them. Focus styles are visible (input border on focus). Error messages are inline next to offending fields. Color choices aim for sufficient contrast between background and text.

- Accessibility skipped (known gap): I didn't add full screen-reader-only descriptions or ARIA live regions for result updates; in a follow-up I'd add `aria-live="polite"` on the results panel so screen readers announce changes.

4) AI usage

- I used an AI coding assistant to help repair and scaffold files: to reconstruct a truncated `src/App.jsx`, to add `vite.config.js` and `index.html`, and to suggest CSS. For each use I provided prompts describing the needed behavior; the assistant produced code which I then reviewed and edited for clarity.

- One specific change to AI output: the assistant suggested base CSS that began with a malformed top-level block. I replaced that with a small reset plus `body` styles and explicit `.layout`/`.card` rules so the project is easier for beginners to read and the layout is responsive.

5) Honest gap

- One area not polished: no automated tests and no deploy setup. With another day I'd add simple unit tests (Jest + React Testing Library) for the calculation logic and add a GitHub Actions workflow that builds and deploys to GitHub Pages or Netlify.


Rounding policy

- Policy: Round up per-person to the nearest cent so the group never underpays. Implementation: the per-person value is calculated as `Math.ceil((total / people) * 100) / 100` and shown with two decimals.

- Rationale: This is simple to implement and avoids the scenario where rounding causes the group to pay less than the true total. The minor overpayment is acceptable for most casual splits. If precise splitting were required, I'd implement distributing the leftover cents across people.

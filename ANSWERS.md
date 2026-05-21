# Frontend Assessment — Tip Calculator — ANSWERS

## 1) How to run

### Requirements
- Node.js 18+
- npm

### Run locally

Clone the repository and install dependencies:

```bash
npm install
npm run dev
```

After starting the dev server, open the URL shown in the terminal (usually `http://localhost:5173/`).

---

## 2) Stack & design choices

### Stack

I used React with Vite for this project.

I picked it mainly because React makes handling live-updating UI straightforward, and Vite keeps the setup lightweight and fast to run locally. Since this app depends heavily on instant calculations and responsive input handling, React state management felt like a good fit.

---

### Design / interaction decisions

#### Active tip selection

I used preset tip buttons along with a separate custom tip input.

If the user selects a preset tip, the custom value gets cleared automatically so there’s never confusion about which tip value is currently active. I wanted the active state to always feel obvious instead of having both preset and custom values competing with each other.

This logic is handled in the tip selection section inside `src/App.jsx`.

---

#### Split layout for inputs and results

On larger screens, the app uses a two-column layout where the form stays on the left and the live calculation panel stays visible on the right.

I chose this because users can immediately see totals update while typing without needing to scroll or shift focus. On smaller screens the layout collapses into a single column so the input flow stays comfortable on mobile devices.

This is handled through the `.layout` media queries in `src/styles.css`.

---

## 3) Responsive & accessibility

### Responsive behavior

On smaller screens (around 360px wide), the layout stacks vertically with the inputs appearing first and the results section below them. Buttons and inputs resize naturally to avoid horizontal scrolling.

On larger screens (around 1440px wide), the app switches to a two-column layout so both the calculator and results stay visible at the same time.

---

### Accessibility considerations

I added proper labels for all form inputs using `label` and `htmlFor`.

The custom tip field includes an `aria-label`, and the preset tip options are regular `<button type="button">` elements so keyboard users can tab through and activate them normally.

I also added visible focus styles and kept the text/background contrast reasonably high for readability.

Validation errors appear inline near the related field instead of using alerts or browser tooltips.

I also made sure validation messages only appear after interaction and disappear immediately once the input becomes valid so the UI doesn’t feel jumpy while typing.

---

### Known accessibility gap

One thing I didn’t fully implement was screen-reader announcements for changing totals.

With more time, I would add something like `aria-live="polite"` to the results section so updates are announced automatically for screen reader users.

---

## 4) AI usage

I used ChatGPT as a coding assistant during development.

Mainly, I used it for:
- rebuilding a partially broken `src/App.jsx`
- scaffolding missing Vite files like `vite.config.js` and `index.html`
- generating an initial CSS structure
- reviewing validation edge cases

I didn’t directly copy everything as-is. I reviewed and adjusted the generated code before using it.

One specific change I made was replacing the original AI-generated layout CSS. The initial version used a more rigid structure that didn’t adapt well on smaller screens. I rewrote it using a simpler responsive grid and clearer `.layout` / `.card` sections so the code was easier to maintain and behaved better on mobile devices.

I also adjusted the validation behavior because the initial implementation showed errors too aggressively while typing.

---

## 5) Honest gap

One thing I’d improve with more time is the overall polish of the experience.

Right now the app works well for the main use cases, but there are still smaller details I’d like to refine — especially around edge-case handling and overall smoothness.

For example:
- adding automated tests for calculations and validation
- improving formatting for very large numbers
- adding subtle transitions/animations to make state changes feel smoother
- polishing mobile spacing a bit more on very small screens

I’d also like to deploy it properly with a production-ready setup instead of keeping it only as a local development project.

---

# Rounding policy

For per-person calculations, I decided to round up to the nearest cent using:

```js
Math.ceil((total / people) * 100) / 100
```

I chose this approach so the group never ends up underpaying because of rounding issues.

It does slightly overcharge by a cent in some cases, but I felt that was a better tradeoff than accidentally displaying a total that’s lower than the actual amount owed.

If this were a production finance app, I’d probably distribute leftover cents more precisely across users instead.

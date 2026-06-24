# 5 Minute Learning

Five minutes a day to think like an engineer in the AI era. One short lesson and one quiz a day, across the things that don't go out of date. Language-agnostic, judgment-first.

> The AI writes the code. You build the judgment.

## Tracks

Perpetual drip, organised into five tracks you can start on day one and read in order:

- **Fundamentals**: reading code, debugging, naming, abstraction, complexity
- **Patterns & Principles**: SOLID, DRY, the patterns worth knowing
- **Algorithms**: complexity you can feel, the core structures, the recurring patterns
- **Architecture & System Design**: boundaries, coupling, dependencies, state
- **Working With AI**: specs, prompting, reviewing generated code, when to say no

## How it works

- One lesson + one multiple-choice quiz per day (~5 min read).
- Progress and a daily streak are kept client-side in `localStorage`. No accounts, no backend.
- A lesson is one Markdown file in `src/content/lessons/` whose frontmatter carries its track, order, and quiz.

## Stack

[Astro](https://astro.build) static site, content collections, deployed to GitHub Pages.

```bash
npm install
npm run dev      # local dev at /5minute-learning
npm run build    # static build to dist/
npm run preview  # serve the build
```

## Authoring a lesson

Add `src/content/lessons/<track>-<NN>.md`:

```yaml
---
track: patterns          # fundamentals | patterns | algorithms | architecture | with-ai
order: 3                 # position within the track
title: Dependency Inversion Without the Jargon
summary: One sentence the card and the meta description both use.
publishedAt: 2026-06-25
readingMinutes: 5
prerequisites: [patterns-01, patterns-02]
quiz:
  - q: The question.
    options: [A, B, C, D]
    answer: 2              # zero-based index of the correct option
    why: Explanation shown after the reader answers.
---

800 to 1000 words of body. The 5-minute target keeps it honest.
```

Track outlines (the backlog the daily generator pulls from) live in `src/data/tracks.ts`.

## House style

No long dashes (em or en) anywhere in lesson copy or UI text. Use commas, colons, or full stops.

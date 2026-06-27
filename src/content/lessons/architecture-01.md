---
track: architecture
order: 1
title: Boundaries Are the Architecture Decision That Matters
summary: Frameworks change, databases get swapped, code gets rewritten. The lines you draw between parts of the system are what you actually live with for years.
publishedAt: 2026-06-27
readingMinutes: 5
prerequisites: []
quiz:
  - q: Why does the lesson call boundaries the decision that matters most?
    options:
      - Because they determine which programming language you must use
      - Because they are cheap to draw and cheap to move later
      - Because everything inside a boundary stays cheap to change, while the boundary itself is expensive to move
      - Because frameworks force a specific set of boundaries on you
    answer: 2
    why: A good boundary makes the code behind it freely changeable. The boundary itself, once other parts depend on it, is the thing that resists change, which is exactly why placing it well is the high-stakes decision.
  - q: What is the practical test for whether a boundary is in a good place?
    options:
      - Whether the two sides can be developed and changed without coordinating constantly
      - Whether the boundary is enforced by a separate network service
      - Whether each side has the same number of lines of code
      - Whether the boundary matches a folder in your repository
    answer: 0
    why: A boundary earns its keep when each side can evolve on its own. If every change forces both sides to move together, the line is decorative, not structural.
  - q: What is the warning about drawing boundaries too early?
    options:
      - Early boundaries are always wrong and should be avoided entirely
      - You freeze a guess into an interface before you understand the domain, and the wrong seam is costly to undo
      - Early boundaries make the code run slower in production
      - Tools cannot generate code across an early boundary
    answer: 1
    why: A boundary is a bet about where change will and will not cross. Made too early, before you understand the domain, it hardens a guess into a contract that others build on, and moving it later is the expensive part.
---

Most of what you argue about in a design review does not matter in five years. The framework will be replaced. The database will be swapped, or sharded, or moved to something that did not exist when you started. Whole files will be deleted and rewritten by people who never met you. Almost none of it is permanent.

What is permanent, or close to it, is where you drew the lines. The boundaries between parts of the system: what counts as the inside of a module and what counts as its outside, which piece is allowed to know about which other piece, where one team's responsibility ends and another's begins. Those lines outlive the code on either side of them. Get them right and everything else stays cheap. Get them wrong and you pay rent on that mistake every single time you try to change anything.

## Why boundaries are the expensive decision

Here is the asymmetry that drives everything. Code *inside* a well-placed boundary is cheap to change, because nothing outside depends on its details. You can rewrite the internals of a module over a weekend if its edge stays the same. But the boundary itself, the contract at the edge, gets expensive the moment other parts of the system start depending on it. Every caller, every team, every test that reaches across the line is now coupled to where you put it.

So the cost of a thing is not how hard it was to build. It is how hard it is to change later. By that measure, an internal function is almost free and a boundary is one of the most expensive objects in your system. That is the whole reason it deserves your best thinking up front: you are choosing what stays soft and what turns to concrete.

## What a good boundary actually does

A boundary is a promise: *this side and that side can change independently, as long as the contract between them holds.* That independence is the entire point, and it gives you a sharp test.

Can the two sides evolve without constant coordination? If you can rework the storage layer without the feature teams noticing, the boundary between them is doing real work. If every change to the storage layer drags six other teams into the conversation, the line on the diagram is decorative. The architecture you have is the one revealed by which changes ripple, not the one drawn in the wiki.

Good boundaries also hide the right things. Behind the line should sit the decisions most likely to change: a vendor, a data format, an algorithm, a third party API that will be deprecated the year after you adopt it. The boundary's job is to absorb that change so it does not leak outward. A boundary that exposes its volatile internals, that lets callers reach in and depend on a specific field or a specific order of operations, has failed even if it compiles.

## Where people put them wrong

Two failure modes dominate.

The first is drawing boundaries too early. A boundary is a bet about where change will cross and where it will not. Make that bet on day one, before you understand the domain, and you freeze a guess into an interface that other code is now built on. When reality disagrees, you cannot just edit one file. You have to renegotiate a contract that has dependents. The honest move early on is often to keep things together, in one module, with the messy seams visible, until you have seen enough change to know where the real fault lines are.

The second is drawing boundaries to match your org chart, your folders, or your nouns, instead of matching the way change actually flows. Things that change together belong together. Things that change for different reasons, on different schedules, for different stakeholders, belong on opposite sides of a line. A boundary that cuts straight through a single coherent decision means every change to that decision touches both sides, which is the precise opposite of what you wanted. The classic tell is a "shared" module that everyone edits and no one owns: that is a boundary placed against the grain of change.

## How to think about it on a real system

When you face a real design, do not start by asking what the components are. Start by asking what is most likely to change, who is most likely to change it, and on what schedule. Then put your boundaries between things that answer those questions differently. Stable things behind a line, volatile things behind their own line, fast-moving product code kept far from slow-moving infrastructure code so neither holds the other hostage.

You will not get every line right, and you do not have to. You have to get the *expensive* ones right: the few boundaries that many things depend on, the ones that would cost weeks to move. Spend your scarce judgment there. Let the cheap interior stay soft and rewritable, exactly as it should be.

Frameworks come and go. Languages come and go. The lines you draw are what you hand to the next person, and to yourself in two years. Draw them where change wants to break, not where the diagram looks tidy.

> **Takeaway**
> - Boundaries outlive the code on either side of them; they are the decision you actually live with.
> - A boundary is good when both sides can change without constant coordination, and it hides what is most likely to change.
> - Drawing them too early, or along your org chart instead of along the grain of change, is the common, costly mistake.
> - Spend your best judgment on the few expensive boundaries; let the cheap interior stay soft.

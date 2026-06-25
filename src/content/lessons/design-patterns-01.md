---
track: design-patterns
order: 1
title: "Strategy: Swap Behaviour at Runtime"
summary: When one job has many interchangeable ways to get done, make the way a thing you can pass in, not a branch you hard-code.
publishedAt: 2026-06-25
readingMinutes: 5
prerequisites: []
quiz:
  - q: What is the core intent of the Strategy pattern?
    options:
      - To create objects without naming their concrete class
      - To define a family of interchangeable algorithms and let the caller pick one
      - To make sure only one instance of a class ever exists
      - To add behaviour to an object without changing its class
    answer: 1
    why: Strategy captures a family of algorithms behind one interface so they become interchangeable and the choice can move to the caller, at runtime if needed.
  - q: Which situation is the strongest signal that Strategy fits?
    options:
      - A growing if/else or switch that selects between several ways of doing the same job
      - A class that has grown too many unrelated fields
      - Two modules that import each other in a cycle
      - A function that is called from many places
    answer: 0
    why: A branch that keeps growing to pick between interchangeable behaviours is the classic smell Strategy resolves by turning each branch into its own swappable object or function.
  - q: When is reaching for Strategy usually overkill?
    options:
      - When the behaviour must change while the program is running
      - When there is exactly one behaviour and no real sign a second is coming
      - When you want to test the behaviours in isolation
      - When different callers genuinely need different behaviours
    answer: 1
    why: With a single behaviour and no concrete second case, the interface and extra classes add indirection that buys nothing. Inline the logic until a real second variant appears.
---

You have a checkout. It needs to calculate shipping. Standard, express, store pickup, free over a threshold. The first version is a switch on a shipping code, and it is fine. Then a new method arrives, and another, and one of them needs the customer's region, and now the switch is forty lines and three people are afraid to touch it. The function that was supposed to *calculate shipping* has quietly become a function that *knows every way shipping can possibly be calculated*. Those are not the same job.

Strategy is the pattern that separates them.

## The intent

Strategy says: when one task can be done in several interchangeable ways, define each way behind a common interface, and let the part that uses it hold a reference to whichever one it needs. The using code stops asking *which kind is this* and starts saying *do your thing*. The decision about which algorithm to run moves out of the algorithm's caller and becomes data you can pass in, even swap while the program runs.

Concretely, instead of one `calculateShipping(order)` with a switch inside, you get a small interface, `ShippingCost`, with one method. You get a handful of tiny implementations: `StandardShipping`, `ExpressShipping`, `FreeOverThreshold`. And the checkout holds one of them: `checkout.shippingCost = new ExpressShipping()`. To add a fifth method tomorrow, you write a new class and change nothing that already works.

## Why it earns its place

The payoff is not cleverness, it is where change lands. A switch concentrates every variation in one spot, so every new case edits the same shared code and risks the cases already there. Strategy spreads the variations into separate units that do not know about each other. Adding a behaviour is additive: a new file, not a new branch in a tested one. This is the Open/Closed idea made physical, open to new strategies, closed to edits of the existing ones.

It also makes the behaviours testable on their own. `ExpressShipping` is a unit with an input and an output. You can test it without standing up a whole checkout. And because the choice is now a value, you can decide it late: from config, from a feature flag, from the user, from the order's own data. That "late and swappable" quality is the part a plain switch cannot give you, because a switch bakes the choice into the code at the call site.

A worked feel for it: a text editor's sort menu offers sort-by-name, sort-by-date, sort-by-size. Each is a comparison strategy. The list does not contain three sort routines, it holds one and you hand it the comparator. Most languages with first-class functions let you pass the comparator directly to `sort`. That is Strategy, stripped to its essence. The pattern predates the language feature, and in a functional style a strategy is often just a function, not a class.

## The honest tradeoffs

Strategy adds indirection. A reader who wants to know what actually runs has to find which implementation is wired in, and that can be one more hop than a switch they could read top to bottom. You also pay in surface area: an interface plus several small types where before there was one function. When the variations are few and stable, that tax buys little.

There is a subtler cost: the interface is a contract you now have to keep honest. If a new strategy needs an input the others do not, you are tempted to widen the interface for everyone, and the abstraction starts to leak. When strategies stop sharing a clean shape, that is a sign the thing you carved out was not really one job with many methods.

## When it is overkill

If there is exactly one way to do the task and no concrete sign of a second, do not build the pattern on speculation. A single strategy behind an interface is just a switch with extra steps and worse readability. Wait for the second real case; that is when the shape of the right interface actually becomes visible, drawn from two examples instead of guessed from one.

Equally, if the branches are not interchangeable, if each does a genuinely different job rather than the same job a different way, Strategy is the wrong tool. The pattern's whole premise is substitutability: any strategy can stand in for any other at that call site. If they cannot, you do not have strategies, you have unrelated functions wearing a shared coat.

The quiet rule: reach for Strategy when a *selection* between interchangeable behaviours starts to grow, not before. The growing switch is the signal. One branch is a branch. Four branches that keep gaining cases, and that you keep wanting to test and configure separately, are a family of algorithms asking to become objects.

> **Takeaway**
> - Strategy turns a family of interchangeable behaviours into objects you select, so the choice becomes data you can pass and swap at runtime.
> - It moves change off shared code: a new behaviour is a new unit, not an edit to a tested switch, and each unit tests in isolation.
> - It costs indirection and a contract you must keep clean; the interface is only worth it once strategies truly share one shape.
> - Wait for the second real, substitutable case. One behaviour, or branches that do different jobs, do not need it.

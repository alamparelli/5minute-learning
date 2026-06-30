---
track: patterns
order: 2
title: Single Responsibility, Concretely
summary: A class should have one reason to change, and the test is about who asks for the change, not how many methods it has.
publishedAt: 2026-06-30
readingMinutes: 5
prerequisites: []
quiz:
  - q: What does "one reason to change" actually mean in the Single Responsibility Principle?
    options:
      - The class should contain only one method
      - The class should answer to a single source of change, usually one role or stakeholder
      - The class should be shorter than fifty lines
      - The class should never call other classes
    answer: 1
    why: Responsibility here means a reason to change driven by a person or role. A class that serves two stakeholders has two reasons to change, and that is the coupling SRP warns about.
  - q: Why is a class that formats a report and also saves it to disk a likely SRP violation?
    options:
      - Because saving and formatting are slow operations
      - Because two different concerns, presentation and persistence, change for different reasons and will tug the class in two directions
      - Because a class should never touch the file system
      - Because it has more than one method
    answer: 1
    why: Presentation rules change when the business wants a different layout; persistence changes when storage or format requirements change. Two independent forces on one class is the smell.
  - q: What is the main risk of overapplying SRP?
    options:
      - The code runs measurably slower
      - You shatter cohesive logic into many tiny fragments, so following one behavior means hopping through ten files
      - The compiler rejects classes that are too small
      - You can no longer write unit tests
    answer: 1
    why: SRP taken to an extreme produces a cloud of one-method classes with no center of gravity. Cohesion is the other half of the rule, and splitting things that change together is its own kind of damage.
---

Single Responsibility is the most quoted of the SOLID principles and the most misread. The usual gloss, "a class should do one thing," sounds obvious and is nearly useless, because "one thing" has no fixed size. Is parsing a file one thing, or is it reading bytes, decoding them, and validating the result, which is three? You can argue either way and never settle it. The principle becomes actionable only when you replace "one thing" with the sharper version its author actually meant.

Robert Martin put it as: a class should have one reason to change. And the reason, crucially, is a *who*. A module should be responsible to one actor, one role or stakeholder who would ever ask for it to change. The test is not how many methods a class has or how many lines. The test is: when a change request arrives, how many different kinds of people could be the source of it? If the answer is more than one, the class is carrying more than one responsibility, and those responsibilities will eventually pull it apart.

## The classic example, sharpened

Imagine an `Employee` class with three methods: `calculatePay`, `reportHours`, and `save`. It looks cohesive. It is all about employees. But trace who asks for changes. `calculatePay` answers to the finance department, who own the rules about overtime and deductions. `reportHours` answers to operations or HR, who decide what a timesheet report contains. `save` answers to the database administrators and architects, who decide how persistence works. Three methods, three masters.

Now the failure mode. Suppose `calculatePay` and `reportHours` share a private helper, `regularHours`, that nobody remembers is shared. Finance asks for a change to how regular hours are computed for pay. A developer edits `regularHours`. Pay is now correct, and the operations report is now silently wrong, because it leaned on the same helper for a different purpose. Two actors got welded together through one piece of code, and a change for one quietly broke the other. That is the concrete harm SRP exists to prevent. It is not aesthetic tidiness. It is the fact that code serving two stakeholders becomes a place where their requirements collide.

## The smell is divergent change

You rarely need to reason about actors from scratch. The principle shows up as a pattern you can feel. Watch for a class where every feature touches a different cluster of its methods, where two teams keep filing tickets against the same file, where a one-line business tweak forces you to re-read persistence code to make sure you did not break it. These are the signs that several reasons to change are living under one roof. Presentation logic mixed with persistence. Business rules mixed with input parsing. A network client that also decides retry policy and also formats the response for the UI. Each of those is two or three forces pretending to be one.

The fix is usually to separate by the kind of change, then let a thin coordinator wire the pieces together. Pull formatting into its own type, persistence into its own type, the calculation into its own type, and have something above them orchestrate. Each piece now changes for one reason, and a change to one cannot reach into the others by accident.

## The trap on the other side

Here is where SRP turns dangerous in earnest hands. Because "one reason to change" can always be sliced thinner, a literal reading pushes you toward a class per method, then a class per line. You end up with `PayCalculator`, `PayCalculatorValidator`, `PayCalculatorValidatorFactory`, and to understand a single behavior you open eight files and hold a call graph in your head. That is not low coupling. That is shrapnel.

The missing half of the rule is cohesion. Things that change together belong together. SRP says separate what changes for different reasons; it does not say atomize what changes for the same reason. If two methods always change in the same ticket, for the same stakeholder, splitting them buys you nothing and costs you a jump. The principle is a knife for cutting along the real seams between stakeholders, not a mandate to mince everything as finely as possible.

So the working version of Single Responsibility is two questions held together. First: does this class serve more than one actor, so that two different people could send it conflicting change requests? If yes, split along that line. Second: am I about to separate two things that always change together for the same reason? If yes, leave them joined. The skill is finding the seam where responsibilities genuinely diverge, and refusing to cut anywhere else.

> **Takeaway**
> - Responsibility means a reason to change, and the reason is a person or role, not a count of methods.
> - The harm SRP prevents is concrete: code shared between two stakeholders is where their requirements silently collide.
> - Split along the seams where actors diverge, not along every line you could possibly separate.
> - Cohesion is the other half: things that change together for the same reason belong together.

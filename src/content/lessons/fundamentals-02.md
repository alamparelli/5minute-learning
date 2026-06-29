---
track: fundamentals
order: 2
title: Naming Is Design, Not Decoration
summary: A name is the smallest unit of design you ship, and a bad one quietly distorts every decision made on top of it.
publishedAt: 2026-06-29
readingMinutes: 5
prerequisites:
  - fundamentals-01
quiz:
  - q: Why does the lesson call naming a design decision rather than a cosmetic one?
    options:
      - Because long names compile slower and waste memory
      - Because a name is a public claim about what a thing is and does, and other code is written to trust that claim
      - Because naming conventions are enforced by most linters
      - Because readers judge your professionalism by your variable names
    answer: 1
    why: A name is an interface. Everyone downstream reasons about the thing through its name, so a wrong name sends every later decision slightly off course.
  - q: What is the strongest signal that a name is lying?
    options:
      - It is longer than fifteen characters
      - It uses an abbreviation
      - The thing it points at no longer matches what the name claims, so readers add comments or workarounds to compensate
      - It does not match the team's casing convention
    answer: 2
    why: Names drift as code changes. When people start writing comments or guards to explain that the name does not mean what it says, the name has become a tax on every reader.
  - q: The lesson says a name that needs a comment to be understood is usually what?
    options:
      - Fine, because the comment documents it
      - A naming problem wearing a comment as a bandage
      - Better than a long descriptive name
      - Required by most style guides
    answer: 1
    why: If the comment exists only to translate the name into plain meaning, the name should have carried that meaning itself. The comment is treating the symptom.
---

You can spend twenty minutes on an algorithm and four seconds on the name of the variable that holds its result. That ratio is backwards. The algorithm runs once and is forgotten. The name is read every single time anyone touches that code, for as long as the code lives. Naming is not the polish you apply after the design. It *is* the design, exposed at the smallest scale.

Here is the claim, stated plainly: a name is a promise. When you call something `activeUsers`, you are telling every future reader that this collection contains users, that they are active, and that "active" means something specific and stable. People will write code on top of that promise without checking. They will assume it does not contain deleted accounts, that it is not secretly a count, that "active" is not actually "logged in once last year". The name is an interface, and interfaces are exactly where design lives or dies.

## A name is a claim others build on

Think about how you read unfamiliar code. You do not open every function you encounter. You read the name, believe it, and move on. That trust is the whole point of a name: it lets a reader skip the body. A good name is one you can trust without verifying. A bad name forces the reader to stop, open the thing, and reconstruct what it actually does. Multiply that interruption across a team and a year and the cost is enormous, far larger than the keystrokes you saved by typing `data` instead of `pendingInvoices`.

This is why vague names are expensive even when they are technically correct. `data`, `info`, `manager`, `process`, `handle`, `temp`, `obj`, `value`: every one of them is accurate and tells you nothing. They are the naming equivalent of saying "thing". The reader still has to open the box. A name earns its place by letting the reader keep the box closed.

## The two failure modes

Names fail in two directions, and they fail differently.

The first is the **vague name**, which under-promises. It is safe in the sense that it rarely lies, because it barely says anything. But it transfers all the work to the reader. `result`, `temp`, `x`. You pay for these constantly, in small increments, forever.

The second is the **lying name**, which over-promises, and this one is genuinely dangerous. `validateEmail` that also, quietly, saves the user to the database. `getUser` that makes a network call and might throw. `isReady` that is true for two different reasons, only one of which the caller cares about. A lying name is worse than a vague one because the reader *trusts* it. They build on the promise, and the bug ships not where the code is wrong but where someone reasonably believed the name. The most expensive lying names are the ones that drift: `userCount` was a count, then someone made it a list, and now half the codebase is wrong about what it holds.

A reliable smell test: if a name needs a comment to explain what it really means, the name is the problem and the comment is a bandage. `// note: includes archived` next to `activeRecords` is not documentation. It is a confession that the name lies.

## Practical moves

Naming well is not talent, it is a set of habits.

**Name by role, not by type or implementation.** `customerList` tells you it is a list, which the type already says. `recipients` tells you what the thing is *for*. Roles survive refactoring; a list that becomes a set should still be `recipients`.

**Let the scope set the length.** A loop index that lives for two lines can be `i`. A value that lives across two hundred lines and three functions earns a full, descriptive name. Short names are fine when the context is small enough to hold in your head. The longer a name lives and the farther it travels, the more it must explain itself.

**Make booleans answer a yes or no question.** `isExpired`, `hasPermission`, `canRetry`. If you cannot phrase the name as a question with a clear true and false, you probably have two concepts fighting inside one variable.

**Watch for the name that wants to be a function.** When you find yourself naming something `userDataThatIsAlsoValidatedAndFormatted`, the name is telling you the thing does too much. A name straining to describe four responsibilities is a design smell, not a naming problem. Listen to it.

**Rename the moment a name stops being true.** Names rot because meaning shifts while the label stays. The discipline is cheap and the payoff compounds: when "active" no longer means what `active` says, fix the name in the same change. A name is only as good as the last time you checked it against reality.

The deeper point is that naming forces you to understand the thing before you can name it well. You cannot name what you cannot explain. So the struggle to find the right name is often the moment you discover the design is muddled. That struggle is not wasted time. It is the design review you did not know you needed, happening one word at a time.

> **Takeaway**
> - A name is an interface and a promise; readers build on it without checking, so a wrong name corrupts every decision above it.
> - Vague names tax every reader forever; lying names are worse because they are trusted, especially when they drift out of date.
> - Name by role not type, size the name to its scope, and rename the instant a name stops being true.

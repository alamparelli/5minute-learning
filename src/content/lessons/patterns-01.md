---
track: patterns
order: 1
title: What a Design Pattern Actually Is (and Is Not)
summary: A pattern is a named solution to a recurring problem, not a building block you import or a goal to chase.
publishedAt: 2026-06-24
readingMinutes: 5
prerequisites: []
quiz:
  - q: Which description of a design pattern is the most precise?
    options:
      - A reusable class or library you import to save time
      - A named, proven solution to a recurring design problem in a context, with known tradeoffs
      - A rule that, if you follow it, guarantees the code is good
      - A way of organizing files and folders in a project
    answer: 1
    why: A pattern is a description of a problem and a known-good shape of solution for it, plus the tradeoffs. It is vocabulary and design guidance, not code you install.
  - q: Why can a pattern that feels essential in one language be almost invisible in another?
    options:
      - Newer languages simply have fewer design problems to solve
      - Some patterns are workarounds for a missing language feature, so a language that provides it natively makes the pattern dissolve into ordinary code
      - Patterns only apply to object-oriented languages in the first place
      - The compiler silently rewrites patterns for you
    answer: 1
    why: Strategy is largely "pass a function" once functions are first-class. Iterator is built into the for-loop of many languages. The problem stays; the visible pattern disappears.
  - q: What is the main failure mode the lesson warns against?
    options:
      - Learning the names of too many patterns
      - Reaching for a pattern before you have the problem it solves, adding indirection you do not need
      - Ever using inheritance under any circumstances
      - Naming your classes after the patterns they use
    answer: 1
    why: Patterns are a response to a felt problem. Starting from the pattern and bending your code to fit it buys cost (indirection, ceremony) without the benefit.
---

Most people meet design patterns as a list to memorize. Singleton, Factory, Observer, Strategy, twenty-three names from a famous book, each with a diagram. So they learn the names, sprinkle them into code, and feel more professional. That is almost exactly backwards, and it is worth understanding why before you write another line.

A design pattern is not a thing you build. It is a name for a problem you keep running into, paired with a shape of solution that has worked before, plus the tradeoffs that come with it. The idea came from a building architect, Christopher Alexander, who noticed that good towns and rooms reused the same structural ideas: a window seat, a courtyard that catches light. Software people borrowed the framing. A pattern, in his words, describes a problem that occurs over and over, and then the core of a solution, in a way you can apply a million times without ever doing it the same way twice.

Hold on to that last part. A pattern is not a snippet. It is closer to a sentence in a shared language. When a colleague says "let's make this an Observer," they are not telling you which classes to type. They are compressing a paragraph: "several parts of the system need to react when this thing changes, we do not want this thing to know who they are, so it will publish and they will subscribe." That compression is most of the value. Patterns are, first and foremost, a vocabulary that lets engineers describe design at a useful altitude instead of reading every line.

## What patterns are not

They are not a library. You do not import the Strategy pattern; you arrange your own code into that shape. This trips up newcomers who go looking for the pattern in their language's standard library and find nothing.

They are not a goal. Code is not better because it contains more patterns. It is better when it is easy to read, change, and trust. A pattern is a means to that, and only sometimes the right one. Counting patterns in a codebase tells you as much about its quality as counting words tells you about an essay.

They are not universal truths. Every pattern is a trade. An Observer decouples the publisher from its subscribers, and in exchange you lose the ability to see, at a glance, what happens when the value changes. A Factory hides construction, and in exchange adds a layer you must step through to follow the code. The pattern is worth it only when the problem it solves outweighs the indirection it adds. If you cannot name the problem, you are paying the cost for nothing.

And here is the one that surprises people most: many patterns are symptoms of a missing language feature. The Strategy pattern, in a language with first-class functions, is mostly just "pass a function." The Iterator pattern is built into the for-each loop you already use. The Command pattern is, often, a closure. The classic book was written in C++ in the mid-nineties, and a good chunk of its catalog is the shape you carve when the language will not let you treat behavior as a value. Change the language and the pattern dissolves into ordinary code. The underlying *problem* is real and permanent. The visible *pattern* is contingent on your tools.

## How to actually use them

Recognize the problem first. You feel a pain: this class knows too much about how its collaborators are built, or this conditional has grown a new branch every sprint, or two modules are welded together when they should not be. The pain is the signal. Only then do you ask whether a known pattern names a clean way out. The pattern arrives as an answer to a question you already had, not as a question you go looking to ask.

This matters more now that an AI can generate a textbook Factory in seconds. It will happily wrap a one-line constructor in three layers of abstraction because the training data is full of pattern tutorials. Your job is the judgment the generator lacks: is there a recurring variation here that justifies the indirection, or is this ceremony around a problem you do not have? The engineer who knows what a pattern is *for* deletes the unneeded one. The engineer who only knows the name keeps it, because it looks like competence.

Learn the catalog, genuinely. Knowing the names makes you faster at reading other people's designs and at talking about your own. But learn them as named tradeoffs, not as trophies. The skill is not applying patterns. The skill is recognizing the problem clearly enough to know whether a pattern, or a plain function, or deleting some code entirely, is the honest answer.

> **Takeaway**
> - A pattern is a named problem plus a proven solution shape and its tradeoffs, not code you import.
> - Its first job is vocabulary: it lets engineers discuss design without reading every line.
> - Many patterns are workarounds for a missing language feature; better tools make them vanish.
> - Start from the problem you feel, never from the pattern you want to use.

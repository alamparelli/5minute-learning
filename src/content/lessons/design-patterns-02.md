---
track: design-patterns
order: 2
title: "Factory Method: Decouple Creation from Use"
summary: When the code that uses an object should not be the code that decides its concrete class, move the decision behind a creation step you can override.
publishedAt: 2026-07-01
readingMinutes: 5
prerequisites: []
quiz:
  - q: What is the core intent of the Factory Method pattern?
    options:
      - To guarantee a class has only one instance
      - To define a step for creating an object and let subclasses decide the concrete class
      - To add responsibilities to an object without changing its class
      - To provide a single interface to a set of interfaces in a subsystem
    answer: 1
    why: Factory Method defines a creation step in a base class and lets each subclass decide which concrete product to instantiate, so the code that uses the product never names its concrete class.
  - q: Which signal most strongly suggests Factory Method fits?
    options:
      - A single class has grown too many unrelated fields
      - The same broad workflow runs everywhere, but the exact object it builds must vary by subclass or context
      - Two modules import each other in a cycle
      - You need one shared instance across the whole program
    answer: 1
    why: When a shared workflow is fixed but the concrete object it needs differs by case, Factory Method isolates that one varying decision into an overridable creation step.
  - q: When is Factory Method usually overkill?
    options:
      - When there is one concrete product and no real sign a second is coming
      - When callers must not know the concrete class
      - When a framework needs to build objects it does not know in advance
      - When the creation logic is duplicated across many call sites
    answer: 0
    why: With a single product and no concrete second case, a plain constructor is clearer. The subclass and indirection only pay off once the creation decision genuinely varies.
---

You are building a document editor. Somewhere deep in the app, a method opens a document, checks it for changes, and lays it out on screen. That workflow is the same whether the document is a spreadsheet, a drawing, or plain text. But one line in the middle has to produce the *right kind* of document object, and that line does not belong to the workflow. The moment you write `new Spreadsheet()` inside the general open-and-lay-out code, you have welded a generic process to one specific product. Add a drawing type and you are back editing the code that was supposed to be done.

Factory Method is the pattern that unwelds them.

## The intent

Factory Method says: define the step that *creates* an object as its own method, and let that method be the point of variation. The base class writes the whole workflow and calls this creation step whenever it needs a product, but it does not decide which concrete product to build. Subclasses answer that question by overriding the step. The classic Gang of Four phrasing is precise: define an interface for creating an object, but let subclasses decide which class to instantiate.

Concretely, a base `Application` has a `createDocument()` method and a real `openDocument()` method that calls it. `openDocument` never says `new Spreadsheet()`. It says `document = createDocument()` and gets back something that honours the `Document` interface. A `SpreadsheetApp` subclass overrides `createDocument` to return a `Spreadsheet`; a `DrawingApp` returns a `Drawing`. The shared workflow lives in one place and stays untouched. Only the tiny creation step changes per case.

## Why it earns its place

The payoff is a clean split between *what happens* and *what gets made*. The using code depends only on the `Document` interface, never on any concrete document class. That inversion is the whole point: the general code stops naming the specific thing. Adding a fourth document type is a new subclass and a one-line override, not a hunt through the workflow for every place a concrete constructor leaked in.

This is why frameworks lean on it. A UI framework knows it will call `createButton()` at the right moment, but it cannot know your button. It defines the creation step and hands you the override. Your subclass supplies the concrete widget, and the framework's layout and event code, written years before your app existed, drives it without change. That is Factory Method carrying its weight: the caller of the object and the chooser of its class are deliberately different people, sometimes separated by a library boundary.

It also concentrates construction. If building a product takes three steps or a config lookup, that logic lives in one overridable method instead of being copied to every call site. When the recipe changes, you change it once.

## Factory Method versus a factory function

Be careful with the name. A plain function or static method that returns one of several classes based on an argument, often called a simple factory, is a useful thing, but it is not the Gang of Four Factory Method. The real pattern's variation comes from *subclassing*: the decision is bound to which subclass is running, not to an `if` inside a helper. In languages with first-class functions you can often get the same decoupling by passing a creator function instead of subclassing, and that is frequently the lighter choice. Know which one you actually need before you reach for inheritance.

## The honest tradeoffs

Factory Method buys flexibility with a class hierarchy. To vary one creation step you introduce a subclass, and if that subclass exists *only* to override the factory, you have added a type that carries no other meaning. A reader tracing the code has an extra hop: to learn what actually gets built, they must find which subclass is live, which is harder than reading a constructor named right there. You are trading a visible, local `new` for an indirection that pays off only when the creation decision truly moves around.

There is a subtler cost. The pattern assumes all products share one interface the workflow can rely on. If a new product needs the caller to treat it specially, the shared interface starts to leak and the abstraction frays, the same failure mode Strategy has when its variants stop sharing a shape.

## When it is overkill

If there is one concrete product and no concrete sign of a second, write the constructor and move on. A base class with a single overridable creation step and no one overriding it is just a `new` with ceremony. Wait for the real second case, because two examples show you the shape of the right creation interface where one only lets you guess.

And if your variation is better expressed as data or a passed-in function than as a subclass, prefer that. Factory Method is the right tool specifically when a fixed workflow must build a varying product and inheritance is already how your variation is organised.

> **Takeaway**
> - Factory Method isolates the one line that creates an object into an overridable step, so a shared workflow never names the concrete class it builds.
> - Its variation comes from subclassing, which is what makes frameworks able to run code that constructs objects they have never heard of.
> - It costs an extra class and a hop of indirection, and it assumes every product honours one shared interface.
> - Do not confuse it with a simple factory function, and do not build it for a single product that has no real second case yet.

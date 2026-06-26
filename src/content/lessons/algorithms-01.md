---
track: algorithms
order: 1
title: Big-O You Will Actually Use
summary: Forget the proofs. Big-O is a vocabulary for guessing how code behaves when the input gets big, and five shapes cover almost everything you meet.
publishedAt: 2026-06-26
readingMinutes: 5
prerequisites: []
quiz:
  - q: What does Big-O actually describe?
    options:
      - The exact number of seconds a function takes to run
      - How the work grows as the input gets larger, ignoring constants
      - How much memory a program uses on a specific machine
      - The number of lines of code in a function
    answer: 1
    why: Big-O is about growth rate, the shape of the curve as n increases. It deliberately drops constants and lower-order terms because those wash out at scale.
  - q: A loop inside a loop, each running over the whole input, is usually what complexity?
    options:
      - O(n), linear
      - O(log n), logarithmic
      - O(n^2), quadratic
      - O(1), constant
    answer: 2
    why: Two nested passes over n items means roughly n times n comparisons. That is O(n squared), the shape that quietly works on small test data and falls over in production.
  - q: Why does replacing a list search with a hash map lookup matter so much?
    options:
      - Hash maps use less memory than lists
      - It turns an O(n) lookup into an O(1) lookup, which collapses a hidden O(n^2) into O(n)
      - Hash maps keep the data sorted automatically
      - It makes the code shorter, which is the real goal
    answer: 1
    why: A linear scan inside a loop is the classic accidental quadratic. Swapping the scan for a constant-time lookup removes the inner n, taking the whole thing from O(n squared) to O(n).
---

You do not need the math. You need a way to answer one practical question: when the input gets ten times bigger, does my code get ten times slower, a hundred times slower, or barely slower at all? Big-O is the vocabulary for that answer, and most of the day-to-day value lives in about five shapes.

The core idea is growth, not speed. Big-O does not tell you a function takes 4 milliseconds. It tells you how that number changes as the input n grows. That is why it throws away constants and small terms. Code that does `3n + 50` steps is still O(n), because once n is large the 3 and the 50 stop mattering. This feels imprecise, and it is, on purpose. You are not measuring this run on this laptop. You are predicting the shape of the curve so you can spot the cliff before you drive off it.

Here are the shapes, fastest-growing last, in the order you will meet them.

## O(1), constant

The work does not depend on the input size at all. Looking up a key in a hash map, pushing onto a stack, reading an array by index. Ten items or ten million, same cost. When you can make an operation O(1), you usually should, because it removes a variable from every calculation built on top of it.

## O(log n), logarithmic

Each step throws away half the remaining work. Binary search is the picture: to find one name in a sorted list of a billion, you need about thirty comparisons, not a billion. Logarithmic growth is so flat that for any input you will realistically see, it behaves almost like a constant. When you find an algorithm that is O(log n), you have usually found a good one.

## O(n), linear

You touch each item a fixed number of times. Summing a list, filtering it, finding the max. Ten times the data, ten times the work. This is the honest baseline for anything that has to look at every element at least once, and most of the time it is exactly what you want. You cannot find the largest number in an unsorted list without looking at all of them.

## O(n log n), linearithmic

The speed limit for general-purpose sorting by comparison. Any decent sort, mergesort, heapsort, the hybrid your language ships with, lands here. It is close enough to linear that you should treat sorting as cheap, and reach for it freely when sorted order would simplify the rest of your logic.

## O(n^2), quadratic and worse

For each item, you do work proportional to all the items. A loop inside a loop, both ranging over the input. This is the one to watch, because it hides. With ten test rows it runs instantly and your tests pass. With a hundred thousand real rows it does ten billion operations and your service times out. Most performance fires in normal application code are an accidental quadratic, not an exotic one. Beyond this sit O(2^n) and O(n!), the combinatorial explosions you meet in brute-force permutation and subset problems, where even modest inputs are hopeless and you need a smarter approach entirely.

## The one move that pays for this whole lesson

The most common real bug is the hidden quadratic, and the most common fix is a hash map. Picture checking a list of orders against a list of known fraud cases by scanning the fraud list for each order. That inner scan is O(n), wrapped in an outer loop over orders, so the whole thing is O(n^2). Load the fraud cases into a hash set once, and each check becomes an O(1) lookup. The whole operation drops to O(n). Same result, but now it survives growth. Trading a little memory for a lower complexity class is one of the highest-leverage moves in everyday engineering.

A few honest caveats keep you from overusing this. Big-O ignores constants, so an O(n) algorithm with huge per-step cost can lose to an O(n log n) one on the inputs you actually have. For small n, the simple quadratic loop is often faster and clearer than the clever structure, and reaching for the clever structure too early is its own mistake. And Big-O describes worst or typical case, not the shape of your real data, which may never hit the bad path. Use it to spot cliffs and compare approaches, not to win arguments.

So the practical drill is small. When you write a loop, ask what is inside it. A second loop over the same data is a quadratic, and a flag to check. A lookup into a set or map is constant, and usually the way out. You are not computing anything. You are reading for the shape of the growth, and choosing the shape you can live with at scale.

> **Takeaway**
> - Big-O describes how work grows with input size, not raw speed. It drops constants on purpose.
> - Know five shapes: constant, log, linear, linearithmic, quadratic. The first three are cheap, the last hides.
> - The recurring bug is an accidental O(n^2) from a loop inside a loop. The recurring fix is a hash map lookup, trading memory to drop a complexity class.

---
title: "Prompt Engineering: How to Talk to AI"
date: "2026-04-28"
summary: "The difference between a useless AI response and a brilliant one is often just how you ask. Here's how to write better prompts."
tags: ["prompt engineering", "AI basics", "tips"]
---

# Prompt Engineering: How to Talk to AI

You've probably tried asking ChatGPT something and gotten a vague, unhelpful answer. Then you rephrased it and got exactly what you needed.

That's prompt engineering — the art of asking AI the right way.

## The Problem

AI models are like genies. They do exactly what you ask — not what you *mean*. A vague question gets a vague answer.

| Prompt | Result |
|--------|--------|
| "Write code" | Generic, useless code |
| "Write a Python function that validates email addresses using regex, with tests" | Exactly what you need |

## The Framework: CRISPE

A good prompt has structure. Try the **CRISPE** framework:

- **C**ontext — Background information the AI needs
- **R**ole — Who should the AI pretend to be
- **I**nstruction — What specifically to do
- **S**cope — What to include and exclude
- **P**ersonalization — Tone, format, audience
- **E**xamples — Show what good output looks like

## Before and After

### ❌ Bad Prompt
> "Explain databases"

### ✅ Good Prompt
> "Explain how relational databases work to a junior developer who knows Python but has never used SQL. Use a library analogy. Keep it under 200 words."

The difference? Context, audience, format, and constraints.

## Quick Tips

1. **Be specific** — "Add error handling" vs "Add try-catch for the API call that returns a 400 error message to the user"
2. **Give examples** — Show the AI what good output looks like
3. **Set constraints** — Word count, format, language, what to exclude
4. **Assign a role** — "You are a senior TypeScript developer" changes the output quality
5. **Iterate** — First response isn't great? Refine, don't restart

## The Meta Lesson

Prompt engineering isn't just about AI. It's about **clear communication**. The skills that make you good at prompting — being specific, giving context, setting expectations — make you better at writing emails, tickets, and documentation too.

The best prompt engineers are just good communicators.

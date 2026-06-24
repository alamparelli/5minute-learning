import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const quizItem = z.object({
  q: z.string(),
  options: z.array(z.string()).min(2),
  answer: z.number().int().nonnegative(),
  why: z.string(),
});

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lessons' }),
  schema: z.object({
    track: z.enum(['fundamentals', 'patterns', 'algorithms', 'architecture', 'with-ai']),
    order: z.number().int().positive(),
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    readingMinutes: z.number().int().positive().default(5),
    prerequisites: z.array(z.string()).default([]),
    quiz: z.array(quizItem).default([]),
  }),
});

export const collections = { lessons };

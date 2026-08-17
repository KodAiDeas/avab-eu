import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const imageSchema = z.object({
  src: z.string().startsWith("/"),
  alt: z.string().min(8),
  caption: z.string().optional(),
});

const referenceSchema = z.object({
  pageType: z.literal("reference"),
  status: z.enum(["draft", "published"]),
  slug: z.string().regex(/^\/referenser\/[a-z0-9-]+\/$/),
  title: z.string().min(3),
  shortTitle: z.string().min(2),
  eyebrow: z.string().default("Referens"),
  summary: z.string().min(20),
  featured: z.boolean().default(false),
  publishedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  completedYear: z.number().int().min(1990).max(2100).optional(),
  customer: z.object({ publicDisplay: z.string().min(2), publicationApproved: z.boolean() }),
  location: z.object({ publicDisplay: z.string().min(2) }),
  environments: z.array(z.string().min(1)).min(1),
  technologies: z.array(z.string().min(1)).min(1),
  role: z.string().min(3),
  scope: z.string().min(10),
  needs: z.string().min(20),
  responsibility: z.string().min(20),
  result: z.string().min(20),
  facts: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).min(3).max(8),
  heroImage: imageSchema,
  scopeItems: z.array(z.object({ label: z.string().optional(), title: z.string().min(2), text: z.string().min(10) })).default([]),
  detailSections: z.array(z.object({ eyebrow: z.string().optional(), title: z.string().min(3), text: z.string().min(20), bullets: z.array(z.string().min(3)).default([]) })).default([]),
  gallery: z.array(imageSchema).default([]),
  faq: z.array(z.object({ question: z.string().min(8), answer: z.string().min(20) })).default([]),
  relatedServices: z.array(z.object({ label: z.string().min(2), href: z.string().startsWith("/") })).default([]),
  relatedReferences: z.array(z.string().regex(/^\/referenser\/[a-z0-9-]+\/$/)).default([]),
  seo: z.object({ title: z.string().min(10), description: z.string().min(40), noindex: z.boolean().default(false) }),
});

const references = defineCollection({
  loader: glob({ pattern: "**/*.{json,yaml,yml,md}", base: "./src/content/references" }),
  schema: referenceSchema,
});

export const collections = { references };

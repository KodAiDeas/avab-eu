import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const imageSchema = z.object({
  src: z.string().startsWith("/"),
  alt: z.string().min(8),
  caption: z.string().optional(),
});

const cardSchema = z.object({
  label: z.string().optional(),
  title: z.string().min(2),
  text: z.string().min(3),
});

const snippetSchema = z.object({
  label: z.string().min(2),
  title: z.string().min(3),
  text: z.string().min(10),
});

const sectionHeadingFields = {
  id: z.string().regex(/^[a-z0-9-]+$/).optional(),
  tone: z.enum(["default", "light"]).default("default"),
  eyebrow: z.string().optional(),
  title: z.string().min(3),
  lead: z.string().min(10).optional(),
};

const referenceSectionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("intro"),
    ...sectionHeadingFields,
    body: z.array(z.string().min(10)).default([]),
    cards: z.array(cardSchema).min(1).max(6),
  }),
  z.object({
    type: z.literal("mediaText"),
    ...sectionHeadingFields,
    body: z.array(z.string().min(10)).default([]),
    bullets: z.array(z.string().min(3)).default([]),
    image: imageSchema.optional(),
    mediaSide: z.enum(["left", "right"]).default("right"),
    steps: z.array(cardSchema).default([]),
    snippet: snippetSchema.optional(),
  }),
  z.object({
    type: z.literal("metrics"),
    ...sectionHeadingFields,
    items: z.array(z.object({ value: z.string().min(1), label: z.string().min(3) })).min(2).max(8),
  }),
  z.object({
    type: z.literal("cards"),
    ...sectionHeadingFields,
    body: z.array(z.string().min(10)).default([]),
    cards: z.array(cardSchema).min(2).max(8),
    columns: z.number().int().min(2).max(4).default(3),
  }),
  z.object({
    type: z.literal("gallery"),
    ...sectionHeadingFields,
    images: z.array(imageSchema).min(1).max(8),
  }),
  z.object({
    type: z.literal("flow"),
    ...sectionHeadingFields,
    body: z.array(z.string().min(10)).default([]),
    nodes: z.array(z.string().min(2)).min(2).max(6),
  }),
  z.object({
    type: z.literal("proof"),
    ...sectionHeadingFields,
    items: z.array(z.object({ value: z.string().min(1), label: z.string().min(3) })).min(2).max(8),
  }),
]);

const referenceSchema = z.object({
  pageType: z.literal("reference"),
  status: z.enum(["draft", "published"]),
  slug: z.string().regex(/^\/referenser\/[a-z0-9-]+\/$/),
  title: z.string().min(3),
  shortTitle: z.string().min(2),
  eyebrow: z.string().default("Referens"),
  summary: z.string().min(20),
  featured: z.boolean().default(false),
  layout: z.enum(["summary", "case-study"]).default("summary"),
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
  heroActions: z.array(z.object({
    label: z.string().min(2),
    href: z.string().min(1),
    variant: z.enum(["primary", "secondary", "quiet"]).default("primary"),
  })).max(3).default([]),
  sections: z.array(referenceSectionSchema).default([]),
  scopeItems: z.array(z.object({ label: z.string().optional(), title: z.string().min(2), text: z.string().min(10) })).default([]),
  detailSections: z.array(z.object({ eyebrow: z.string().optional(), title: z.string().min(3), text: z.string().min(20), bullets: z.array(z.string().min(3)).default([]) })).default([]),
  gallery: z.array(imageSchema).default([]),
  faq: z.array(z.object({ question: z.string().min(8), answer: z.string().min(20) })).default([]),
  faqIntro: z.object({
    eyebrow: z.string().default("Vanliga frågor"),
    title: z.string().min(3),
    text: z.string().min(10).optional(),
  }).optional(),
  closingCta: z.object({
    eyebrow: z.string().optional(),
    title: z.string().min(3),
    text: z.string().min(10),
    actions: z.array(z.object({
      label: z.string().min(2),
      href: z.string().min(1),
      variant: z.enum(["primary", "secondary", "quiet"]).default("primary"),
    })).min(1).max(3),
    bullets: z.array(z.string().min(3)).default([]),
  }).optional(),
  relatedServices: z.array(z.object({ label: z.string().min(2), href: z.string().startsWith("/") })).default([]),
  relatedReferences: z.array(z.string().regex(/^\/referenser\/[a-z0-9-]+\/$/)).default([]),
  seo: z.object({ title: z.string().min(10), description: z.string().min(40), noindex: z.boolean().default(false) }),
});

const references = defineCollection({
  loader: glob({
    pattern: "**/*.{json,yaml,yml,md}",
    base: "./src/content/references",
    generateId: ({ entry }) => entry.replace(/\.(json|ya?ml|md)$/i, ""),
  }),
  schema: referenceSchema,
});

export const collections = { references };

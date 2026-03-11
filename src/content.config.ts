import { defineCollection } from "astro:content";

import { glob } from "astro/loaders";

import { z } from "astro/zod";

const webQuirks = defineCollection({
	loader: glob({ base: "./content/web_quirks", pattern: "**/*.mdx" }),
	schema: z.object({
		title: z.string(),
		author: z.string(),
		tags: z.array(z.string()),
		when: z.date(),
	}),
});

export const collections = { web_quirks: webQuirks };

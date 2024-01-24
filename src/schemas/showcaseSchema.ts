/**
 * Copyright (c) 2024 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { z } from "zod";

export const showcaseDescriptionSchema = z.object({
	nl: z.string(),
	en: z.string(),
});

export const showcaseSchema = z.object({
	videoId: z.string().optional(),
	image: z.string().optional(),
	title: z.string(),
	description: showcaseDescriptionSchema,
	url: z.string(),
});

export const showcasesSchema = z.array(showcaseSchema);

export type Showcase = z.infer<typeof showcaseSchema>;
export type Showcases = z.infer<typeof showcasesSchema>;

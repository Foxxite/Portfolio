/**
 * Copyright (c) 2024 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { z } from "zod";

export const testimonialTextSchema = z.object({
	en: z.string(),
	nl: z.string(),
});

export const testimonialSchema = z.object({
	text: testimonialTextSchema,
	author: z.string(),
});

export const testimonialsSchema = z.array(testimonialSchema);

export type Testimonial = z.infer<typeof testimonialSchema>;
export type Testimonials = z.infer<typeof testimonialsSchema>;

import { defineCollection, z } from "astro:content";

const views = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        blocks: z
            .array(
                z.object({
                    name: z.string(),
                    title: z.string(),
                    description: z.string(),
                })
            )
            .optional(), // <-- ini penting biar file yang tidak pakai blocks tetap lolos
    }),
});

const articles = defineCollection({
    schema: z.object({
        isDraft: z.boolean().default(false),
        isMainHeadline: z.boolean().default(false),
        isSubHeadline: z.boolean().default(false),
        title: z.string(),
        description: z.string(),
        cover: z.string().refine(val => val.startsWith('@assets/'), {
            message: "Cover image path must start with '@assets/'"
        }),
        category: z.string(), // Changed from array to single string
        authors: z.array(z.string()), // Keep as array
        publishedTime: z.string().datetime(), // ISO 8601 format
    })
});


export const collections = {
    views,
    articles,
};

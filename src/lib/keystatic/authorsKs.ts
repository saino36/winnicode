import { collection, fields } from "@keystatic/core";

export const authorsKs = collection({
  label: "Authors",
  slugField: "name",
  path: "src/content/authors/*/",
  format: { contentField: "content" },
  entryLayout: "form",
  schema: {
    name: fields.slug({ name: { label: "Name" } }),
    job: fields.text({ label: "Job" }),
    avatar: fields.image({
      label: "Avatar",
      directory: "src/assets/images/authors",
      publicPath: "@assets/images/authors",
    }),
    content: fields.mdx({
      label: "Content",
      options: {
        image: {
          directory: "src/assets/images/authors",
          publicPath: "@assets/images/authors",
        },
      },
    }),
  },
});

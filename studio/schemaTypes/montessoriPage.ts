import { defineField, defineType } from "sanity";

export default defineType({
  name: "montessoriPage",
  title: "What is Montessori Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "headingLine1", title: "Heading — line 1", type: "string" }),
    defineField({ name: "headingLine2", title: "Heading — line 2 (accent)", type: "string" }),
    defineField({ name: "bioText", title: "Maria Montessori bio", type: "text", rows: 6 }),
    defineField({ name: "portraitImage", title: "Portrait image", type: "image", options: { hotspot: true } }),
    defineField({ name: "programsHeading", title: "Programs section heading", type: "string" }),
    defineField({
      name: "features",
      title: "Program features",
      type: "array",
      of: [
        {
          type: "object",
          name: "feature",
          fields: [
            { name: "title", type: "string" },
            { name: "description", type: "text", rows: 4 },
            { name: "image", type: "image", options: { hotspot: true } },
          ],
          preview: { select: { title: "title", media: "image" } },
        },
      ],
    }),
    defineField({ name: "beliefHeading", title: "Closing belief heading", type: "string" }),
    defineField({ name: "beliefText", title: "Closing belief text", type: "text", rows: 4 }),
    defineField({ name: "quoteText", title: "Maria Montessori quote", type: "text", rows: 2 }),
  ],
  preview: { prepare: () => ({ title: "What is Montessori Page" }) },
});

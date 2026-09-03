import { defineField, defineType } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  description:
    "Questions live here once and are pulled onto pages by topic, so the same answer can appear in more than one place without being retyped.",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "topics",
      title: "Show on",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Admissions page", value: "admissions" },
          { title: "What is Montessori page", value: "montessori" },
          { title: "Tuition page", value: "tuition" },
        ],
      },
      description: "A question can appear on more than one page.",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      initialValue: 100,
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "question", subtitle: "topics" },
    prepare: ({ title, subtitle }: any) => ({
      title,
      subtitle: Array.isArray(subtitle) ? subtitle.join(", ") : "",
    }),
  },
});

import { defineField, defineType } from "sanity";

export default defineType({
  name: "program",
  title: "Program",
  type: "document",
  description:
    "Defined once and referenced by every campus that offers it — edit the description here and it updates everywhere.",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Shown wherever this program appears across the site.",
    }),
    defineField({
      name: "defaultAges",
      title: "Typical age range",
      type: "string",
      description: 'e.g. "6 Weeks – 16 Months". Campuses can override this.',
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lowest first — usually youngest to oldest.",
      initialValue: 100,
    }),
  ],
  orderings: [{ title: "Age order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "defaultAges" } },
});

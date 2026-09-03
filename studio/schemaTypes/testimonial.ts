import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  description:
    "First-party testimonials collected directly from families (with their permission). Do not paste Google reviews here — see the note on the quote field.",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 5,
      description:
        "Use testimonials families gave you directly. Copying reviews from Google Maps into your own site breaches Google's API terms, and Google does not allow review markup for reviews about your own business.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Attribution",
      type: "string",
      description: 'e.g. "Sarah M." or "Toddler parent". Use whatever the family consented to.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorRole",
      title: "Role / context",
      type: "string",
      description: 'e.g. "Parent, Children\'s House" or "Nido family since 2024"',
    }),
    defineField({
      name: "campus",
      title: "Campus",
      type: "reference",
      to: [{ type: "campus" }],
      description: "Leave blank for a testimonial that can appear anywhere on the site.",
    }),
    defineField({
      name: "featured",
      title: "Feature on the home page",
      type: "boolean",
      initialValue: false,
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
    select: { title: "authorName", subtitle: "quote", campus: "campus.name" },
    prepare: ({ title, subtitle, campus }: any) => ({
      title: [title, campus].filter(Boolean).join(" · "),
      subtitle: subtitle?.slice(0, 80),
    }),
  },
});

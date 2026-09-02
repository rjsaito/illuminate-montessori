import { defineField, defineType } from "sanity";

const iconOptions = [
  { title: "Message / chat", value: "message-circle" },
  { title: "Heart", value: "heart" },
  { title: "Person check", value: "user-check" },
  { title: "Check circle", value: "check-circle" },
  { title: "Calendar", value: "calendar" },
  { title: "Dollar sign", value: "dollar-sign" },
  { title: "People / family", value: "users" },
  { title: "Star", value: "star" },
  { title: "Home", value: "home" },
  { title: "Book", value: "book" },
];

export default defineType({
  name: "tuitionPage",
  title: "Tuition Page",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow label",
      type: "string",
      description: 'Small label above the headline, e.g. "TUITION"',
      initialValue: "TUITION",
    }),
    defineField({
      name: "headingLine1",
      title: "Headline — line 1",
      type: "string",
      initialValue: "Honest tuition,",
    }),
    defineField({
      name: "headingLine2",
      title: "Headline — line 2 (accent color)",
      type: "string",
      initialValue: "transparent process.",
    }),
    defineField({
      name: "steps",
      title: "Process steps",
      description: "The numbered step cards (e.g. Request a tour, Meet the Head of School...)",
      type: "array",
      of: [
        {
          type: "object",
          name: "step",
          fields: [
            defineField({ name: "icon", title: "Icon", type: "string", options: { list: iconOptions } }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: "factorsEyebrow",
      title: "Factors section eyebrow",
      type: "string",
      initialValue: "WHAT SETS YOUR TUITION",
    }),
    defineField({
      name: "factorsHeading",
      title: "Factors section heading",
      type: "string",
      initialValue: "Six factors, plain and simple",
    }),
    defineField({
      name: "factors",
      title: "Tuition factors",
      description: "The bullet grid (Age program, Schedule, Campus, ...)",
      type: "array",
      of: [
        {
          type: "object",
          name: "factor",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
    }),
    defineField({
      name: "ctaHeading",
      title: "CTA heading",
      type: "string",
      initialValue: "Request a tuition sheet",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "ctaButtonText",
      title: "CTA button text",
      type: "string",
      initialValue: "Request Tuition Info",
    }),
    defineField({
      name: "ctaButtonLink",
      title: "CTA button link",
      type: "string",
      initialValue: "/contact/",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Tuition Page" };
    },
  },
});

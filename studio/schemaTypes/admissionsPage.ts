import { defineField, defineType } from "sanity";

export default defineType({
  name: "admissionsPage",
  title: "Admissions Page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "intro", title: "Intro text", type: "text", rows: 3 }),
    defineField({
      name: "steps",
      title: "How to apply — steps",
      type: "array",
      of: [
        {
          type: "object",
          name: "step",
          fields: [
            { name: "title", type: "string" },
            { name: "description", type: "text", rows: 2 },
          ],
        },
      ],
    }),
    defineField({ name: "teamEmail", title: "Admissions team email", type: "string" }),
    defineField({ name: "toursHeading", title: "Tours section heading", type: "string" }),
    defineField({ name: "toursIntro", title: "Tours section intro", type: "text", rows: 2 }),
    defineField({
      name: "toursList",
      title: "What you'll experience on a tour",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "focusHeading", title: "Core focus section heading", type: "string" }),
    defineField({ name: "focusIntro", title: "Core focus section intro", type: "text", rows: 2 }),
    defineField({
      name: "focusItems",
      title: "Core focus areas",
      type: "array",
      of: [
        {
          type: "object",
          name: "focus",
          fields: [
            { name: "title", type: "string" },
            { name: "description", type: "text", rows: 3 },
          ],
        },
      ],
    }),
    defineField({ name: "referralHeading", title: "Referral program heading", type: "string" }),
    defineField({ name: "referralText", title: "Referral program text", type: "text", rows: 2 }),
    defineField({ name: "closingText", title: "Closing text", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Admissions Page" }) },
});

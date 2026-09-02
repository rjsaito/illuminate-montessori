import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({ name: "topBanner", title: "Top banner text", type: "string" }),
    defineField({ name: "heroLine1", title: "Hero — line 1", type: "string" }),
    defineField({ name: "heroLine2", title: "Hero — line 2 (accent)", type: "string" }),
    defineField({ name: "heroDescription", title: "Hero description", type: "text", rows: 3 }),
    defineField({ name: "primaryCtaText", title: "Primary button text", type: "string" }),
    defineField({ name: "primaryCtaHref", title: "Primary button link", type: "string" }),
    defineField({ name: "secondaryCtaText", title: "Secondary button text", type: "string" }),
    defineField({
      name: "benefits",
      title: "Benefits row",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g. Exceptional Educators, Purposefully Prepared Environments...",
    }),
    defineField({ name: "differenceEyebrow", title: "Difference section eyebrow", type: "string" }),
    defineField({ name: "differenceHeading", title: "Difference section heading", type: "string" }),
    defineField({
      name: "differenceItems",
      title: "Difference items",
      type: "array",
      of: [
        {
          type: "object",
          name: "item",
          fields: [
            { name: "title", type: "string" },
            { name: "description", type: "text", rows: 2 },
          ],
        },
      ],
    }),
    defineField({ name: "campusesEyebrow", title: "Campuses section eyebrow", type: "string" }),
    defineField({ name: "campusesHeading", title: "Campuses section heading", type: "string" }),
    defineField({ name: "campusesIntro", title: "Campuses section intro", type: "text", rows: 3 }),
    defineField({ name: "eventsHeading", title: "Events section heading", type: "string" }),
    defineField({ name: "eventsText", title: "Events section text", type: "text", rows: 2 }),
    defineField({ name: "closingHeading", title: "Closing heading", type: "string" }),
    defineField({ name: "closingText", title: "Closing text", type: "text", rows: 2 }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});

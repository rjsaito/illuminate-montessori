import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "subheading", title: "Subheading", type: "string" }),
    defineField({ name: "missionEyebrow", title: "Mission eyebrow", type: "string" }),
    defineField({ name: "missionText", title: "Mission text", type: "text", rows: 6 }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
    defineField({ name: "visionHeading", title: "Vision heading", type: "string" }),
    defineField({
      name: "visionItems",
      title: "Vision items",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "visionClosing", title: "Vision closing text", type: "text", rows: 2 }),
    defineField({ name: "valuesEyebrow", title: "Values eyebrow", type: "string" }),
    defineField({ name: "valuesHeading", title: "Values heading", type: "string" }),
    defineField({ name: "valuesIntro", title: "Values intro", type: "text", rows: 2 }),
    defineField({
      name: "values",
      title: "Core values",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "meansHeading", title: "\"What this means\" heading", type: "string" }),
    defineField({
      name: "meansItems",
      title: "\"What this means\" items",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "closingText", title: "Closing text", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});

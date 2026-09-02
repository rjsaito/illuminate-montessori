import { defineField, defineType } from "sanity";

export default defineType({
  name: "campus",
  title: "Campus",
  type: "document",
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
      name: "region",
      title: "Region",
      type: "string",
      options: { list: ["Virginia", "Massachusetts", "Texas"] },
    }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "hours", title: "Operating hours", type: "string" }),
    defineField({ name: "about", title: "About this campus", type: "text", rows: 8 }),
    defineField({ name: "heroImage", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({
      name: "bookingIframeUrl",
      title: "Tour booking widget URL",
      description: "The embed URL for this campus's scheduling widget",
      type: "url",
    }),
    defineField({
      name: "showOnFindCampus",
      title: "Show in main \"Find Your Campus\" nav & directory",
      description: "On for VA/MA campuses, off for Texas Schools (which get their own nav group)",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    { title: "Name", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "region" },
  },
});

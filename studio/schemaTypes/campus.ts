import { defineField, defineType } from "sanity";

export default defineType({
  name: "campus",
  title: "Campus",
  type: "document",
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "contact", title: "Contact & location" },
    { name: "programs", title: "Programs" },
    { name: "leadership", title: "Head of School" },
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "basics" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
      group: "basics",
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      options: { list: ["Virginia", "Massachusetts", "Texas"] },
      group: "basics",
    }),
    defineField({ name: "about", title: "About this campus", type: "text", rows: 8, group: "basics" }),
    defineField({
      name: "heroImage",
      title: "Campus photo",
      type: "image",
      options: { hotspot: true },
      description: "A photo of the school itself — not the Head of School.",
      group: "basics",
    }),
    defineField({
      name: "showOnFindCampus",
      title: 'Show in main "Find Your Campus" nav & directory',
      type: "boolean",
      initialValue: true,
      group: "basics",
    }),

    defineField({ name: "address", title: "Address", type: "string", group: "contact" }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      description: "Used for page titles and the location search.",
      group: "contact",
    }),
    defineField({ name: "postalCode", title: "ZIP code", type: "string", group: "contact" }),
    defineField({ name: "phone", title: "Phone", type: "string", group: "contact" }),
    defineField({ name: "email", title: "Email", type: "string", group: "contact" }),
    defineField({ name: "hours", title: "Operating hours", type: "string", group: "contact" }),
    defineField({
      name: "location",
      title: "Map location",
      type: "geopoint",
      description: "Drives the campus map and the “near me” distance search.",
      group: "contact",
    }),
    defineField({
      name: "bookingIframeUrl",
      title: "Tour booking widget URL",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "instagram",
      title: "Instagram handle",
      type: "string",
      description: 'Just the handle, without the @ — e.g. "illuminate_chantilly"',
      group: "contact",
    }),
    defineField({
      name: "facebook",
      title: "Facebook page URL",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "googleBusinessUrl",
      title: "Google Business Profile URL",
      type: "url",
      description:
        "Link families to this campus's Google reviews. Linking out is allowed; copying the review text onto this site is not.",
      group: "contact",
    }),

    defineField({
      name: "agesServed",
      title: "Ages served",
      type: "string",
      description: 'Overall range for this campus, e.g. "6 Weeks – 12 Years".',
      group: "programs",
    }),
    defineField({
      name: "programs",
      title: "Programs offered",
      type: "array",
      group: "programs",
      of: [
        {
          type: "object",
          name: "campusProgram",
          fields: [
            defineField({
              name: "program",
              title: "Program",
              type: "reference",
              to: [{ type: "program" }],
            }),
            defineField({
              name: "ages",
              title: "Age range at this campus",
              type: "string",
              description: "Leave blank to use the program's typical range.",
            }),
          ],
          preview: {
            select: { title: "program.name", subtitle: "ages" },
          },
        },
      ],
    }),
    defineField({
      name: "headOfSchool",
      title: "Head of School",
      type: "object",
      group: "leadership",
      fields: [
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string", initialValue: "Head of School" }),
        defineField({ name: "bio", title: "Bio", type: "text", rows: 12 }),
        defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
      ],
    }),
  ],
  orderings: [{ title: "Name", name: "nameAsc", by: [{ field: "name", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "region", media: "heroImage" },
  },
});

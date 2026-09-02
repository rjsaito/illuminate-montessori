import { defineField, defineType } from "sanity";

export default defineType({
  name: "ourSchoolsPage",
  title: "Our Schools Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "subheading", title: "Subheading", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Our Schools Page" }) },
});

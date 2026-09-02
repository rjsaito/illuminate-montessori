import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "subheading", title: "Subheading", type: "string" }),
    defineField({
      name: "formEndpoint",
      title: "Form submission endpoint (Formspree URL)",
      description: "Create a free form at formspree.io and paste its endpoint URL here, e.g. https://formspree.io/f/xxxxxxx",
      type: "url",
    }),
    defineField({
      name: "whatToExpect",
      title: "\"What to expect\" list",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "phoneNote", title: "\"Prefer to call?\" note", type: "text", rows: 2 }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});

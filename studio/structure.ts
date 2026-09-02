import type { StructureResolver } from "sanity/structure";

// Singleton editing experience: clicking "Tuition Page" opens the one
// document directly instead of a list you'd have to create an item in.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Tuition Page")
        .id("tuitionPage")
        .child(S.document().schemaType("tuitionPage").documentId("tuitionPage")),
    ]);

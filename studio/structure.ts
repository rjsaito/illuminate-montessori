import type { StructureResolver } from "sanity/structure";

const singleton = (S: any, id: string, title: string, type: string) =>
  S.listItem()
    .title(title)
    .id(id)
    .child(S.document().schemaType(type).documentId(id));

// Singleton pages open straight to their one document; Campuses is a normal
// list since editors add/remove campuses over time.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      singleton(S, "homePage", "Home Page", "homePage"),
      singleton(S, "aboutPage", "About Page", "aboutPage"),
      singleton(S, "admissionsPage", "Admissions Page", "admissionsPage"),
      singleton(S, "montessoriPage", "What is Montessori Page", "montessoriPage"),
      singleton(S, "tuitionPage", "Tuition Page", "tuitionPage"),
      singleton(S, "contactPage", "Contact Page", "contactPage"),
      singleton(S, "ourSchoolsPage", "Our Schools Page", "ourSchoolsPage"),
      S.divider(),
      S.listItem()
        .title("Campuses")
        .id("campus")
        .child(S.documentTypeList("campus").title("Campuses")),
      S.listItem()
        .title("Programs")
        .id("program")
        .child(S.documentTypeList("program").title("Programs")),
      S.listItem()
        .title("Testimonials")
        .id("testimonial")
        .child(S.documentTypeList("testimonial").title("Testimonials")),
    ]);

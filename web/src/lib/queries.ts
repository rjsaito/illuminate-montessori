export const HOME_PAGE_QUERY = /* groq */ `*[_type == "homePage"][0]`;
export const ABOUT_PAGE_QUERY = /* groq */ `*[_type == "aboutPage"][0]{..., heroImage}`;
export const ADMISSIONS_PAGE_QUERY = /* groq */ `*[_type == "admissionsPage"][0]`;
export const MONTESSORI_PAGE_QUERY = /* groq */ `*[_type == "montessoriPage"][0]{..., portraitImage}`;
export const CONTACT_PAGE_QUERY = /* groq */ `*[_type == "contactPage"][0]`;
export const OUR_SCHOOLS_PAGE_QUERY = /* groq */ `*[_type == "ourSchoolsPage"][0]`;

export const ALL_CAMPUSES_QUERY = /* groq */ `*[_type == "campus"] | order(name asc){
  name, "slug": slug.current, region, address, city, postalCode, phone, email, hours, about,
  heroImage, bookingIframeUrl, showOnFindCampus, agesServed, schoolAgeCare, location,
  "programs": programs[]{ ages, "name": program->name, "slug": program->slug.current, "order": program->order },
  "headOfSchool": headOfSchool{ name, title }
}`;

export const CAMPUS_BY_SLUG_QUERY = /* groq */ `*[_type == "campus" && slug.current == $slug][0]{
  name, "slug": slug.current, region, address, city, postalCode, phone, email, hours, about,
  heroImage, bookingIframeUrl, agesServed, schoolAgeCare, schoolAgeCareNote, location,
  "programs": programs[]{ ages, "name": program->name, "slug": program->slug.current,
                          "description": program->description, "defaultAges": program->defaultAges,
                          "order": program->order },
  headOfSchool
}`;

export const CAMPUS_SLUGS_QUERY = /* groq */ `*[_type == "campus"]{"slug": slug.current}`;

export const ALL_PROGRAMS_QUERY = /* groq */ `*[_type == "program"] | order(order asc){
  name, "slug": slug.current, description, defaultAges, order
}`;

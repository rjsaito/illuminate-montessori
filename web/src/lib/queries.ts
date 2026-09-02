export const HOME_PAGE_QUERY = /* groq */ `*[_type == "homePage"][0]`;
export const ABOUT_PAGE_QUERY = /* groq */ `*[_type == "aboutPage"][0]{..., heroImage}`;
export const ADMISSIONS_PAGE_QUERY = /* groq */ `*[_type == "admissionsPage"][0]`;
export const MONTESSORI_PAGE_QUERY = /* groq */ `*[_type == "montessoriPage"][0]{..., portraitImage}`;
export const CONTACT_PAGE_QUERY = /* groq */ `*[_type == "contactPage"][0]`;
export const OUR_SCHOOLS_PAGE_QUERY = /* groq */ `*[_type == "ourSchoolsPage"][0]`;

export const ALL_CAMPUSES_QUERY = /* groq */ `*[_type == "campus"] | order(name asc){
  name, "slug": slug.current, region, address, phone, email, hours, about, heroImage, bookingIframeUrl, showOnFindCampus
}`;

export const CAMPUS_BY_SLUG_QUERY = /* groq */ `*[_type == "campus" && slug.current == $slug][0]{
  name, "slug": slug.current, region, address, phone, email, hours, about, heroImage, bookingIframeUrl
}`;

export const CAMPUS_SLUGS_QUERY = /* groq */ `*[_type == "campus"]{"slug": slug.current}`;

export const TUITION_PAGE_QUERY = /* groq */ `*[_type == "tuitionPage"][0]{
  eyebrow,
  headingLine1,
  headingLine2,
  steps[]{ icon, title, description },
  factorsEyebrow,
  factorsHeading,
  factors[]{ title, description },
  ctaEyebrow,
  ctaHeading,
  ctaDescription,
  ctaButtonText,
  ctaButtonLink
}`;

export type TuitionStep = {
  icon: string;
  title: string;
  description: string;
};

export type TuitionFactor = {
  title: string;
  description: string;
};

export type TuitionPageData = {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  steps: TuitionStep[];
  factorsEyebrow: string;
  factorsHeading: string;
  factors: TuitionFactor[];
  ctaEyebrow?: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
};

// Used until the Sanity project is connected (PUBLIC_SANITY_PROJECT_ID unset),
// and as a safe default if a field is left empty in the Studio.
export const fallbackTuitionPage: TuitionPageData = {
  eyebrow: "TUITION",
  headingLine1: "Honest tuition,",
  headingLine2: "transparent process.",
  steps: [
    {
      icon: "message-circle",
      title: "Request a tour",
      description: "Tell us about your child via our contact form. We respond within one business day.",
    },
    {
      icon: "heart",
      title: "Meet the Head of School",
      description: "Visit your campus for a 45-minute weekday tour. See classrooms in session.",
    },
    {
      icon: "user-check",
      title: "Receive your tuition sheet",
      description: "Your admissions team shares a current rate sheet tailored to your age group and schedule.",
    },
    {
      icon: "check-circle",
      title: "Enroll",
      description: "Sign your enrollment agreement and welcome your child to the community.",
    },
  ],
  factorsEyebrow: "WHAT SETS YOUR TUITION",
  factorsHeading: "Six factors, plain and simple",
  factors: [
    { title: "Age program", description: "Nido, Toddler, Children's House, or Elementary" },
    { title: "Schedule", description: "Half-day, full-day, or extended-day (7 AM – 6 PM)" },
    { title: "Campus", description: "Campus tuition varies by location across our campuses" },
    { title: "Sibling tuition benefits", description: "Families with multiple children enrolled may be eligible for additional tuition benefits. Contact your campus admissions team to learn more." },
    { title: "Special programs", description: "Mandarin and Spanish immersion may carry a small program fee" },
    { title: "Enrollment timing", description: "Early-enrollment incentives available at select campuses" },
  ],
  ctaEyebrow: undefined,
  ctaHeading: "Request a tuition sheet",
  ctaDescription: "Tell us your campus and age group — we'll send current rates and any discounts you qualify for.",
  ctaButtonText: "Request Tuition Info",
  ctaButtonLink: "/contact/",
};

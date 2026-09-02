import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const config = JSON.parse(fs.readFileSync(path.join(os.homedir(), ".config/sanity/config.json"), "utf8"));
const token = config.authToken;

const client = createClient({
  projectId: "mp2n32ll",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const ROOT = path.resolve(import.meta.dirname, "..");
const campuses = JSON.parse(
  fs.readFileSync(
    "/private/tmp/claude-501/-Users-rjsaito/e3d0ea7e-cf2e-4509-bcbc-55a3d9ad4cf5/scratchpad/campuses.json",
    "utf8"
  )
);

const uploadedAssets = new Map();
async function uploadImage(filePath) {
  if (uploadedAssets.has(filePath)) return uploadedAssets.get(filePath);
  if (!fs.existsSync(filePath)) return null;
  const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
    filename: path.basename(filePath),
  });
  const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  uploadedAssets.set(filePath, ref);
  console.log("Uploaded", path.basename(filePath));
  return ref;
}

async function seedCampuses() {
  const imagesDir = path.join(ROOT, "public/images/campuses");
  const files = fs.readdirSync(imagesDir);
  for (const c of campuses) {
    const file = files.find((f) => f.startsWith(c.slug + "."));
    const heroImage = file ? await uploadImage(path.join(imagesDir, file)) : undefined;
    const doc = {
      _id: `campus-${c.slug}`,
      _type: "campus",
      name: c.name,
      slug: { _type: "slug", current: c.slug },
      region: c.region,
      address: c.address,
      phone: c.phone,
      email: c.email,
      hours: c.hours,
      about: c.about,
      bookingIframeUrl: c.bookingIframe,
      showOnFindCampus: c.region !== "Texas",
      ...(heroImage ? { heroImage } : {}),
    };
    await client.createOrReplace(doc);
    console.log("Seeded campus:", c.name);
  }
}

async function seedPages() {
  const coreImg = (name) => uploadImage(path.join(ROOT, "public/images/core", name));

  const homePage = {
    _id: "homePage",
    _type: "homePage",
    topBanner: "8 Campuses in Virginia, 8 Campuses in Texas & 2 Campuses in Massachusetts",
    heroLine1: "A Place Families Trust,",
    heroLine2: "and Children Love.",
    heroDescription:
      "Delivering the best Montessori education in America through inspiring environments, exceptional educators, and a proven approach that helps children grow into confident, capable, and curious learners.",
    primaryCtaText: "Schedule a Tour",
    primaryCtaHref: "/contact/",
    secondaryCtaText: "Watch Our Story",
    benefits: ["Exceptional Educators", "Purposefully Prepared Environments", "Authentic Montessori Education"],
    differenceEyebrow: "The Illuminate Montessori Difference",
    differenceHeading: "A childhood worth nourishing.",
    differenceItems: [
      {
        _key: "d1",
        title: "Authentic Montessori",
        description:
          "A thoughtfully designed educational approach that follows each child's natural development through hands-on learning, mixed-age classrooms, and uninterrupted work cycles.",
      },
      {
        _key: "d2",
        title: "Independence, on Purpose",
        description:
          "From the first time a toddler pours their own water to a third-grader running their own research project, every detail is designed for capable, confident children.",
      },
      {
        _key: "d3",
        title: "Joyful, Calm Days",
        description:
          "Mixed-age classrooms, three-hour uninterrupted work cycles, and the freedom to choose meaningful work make school a place children love.",
      },
    ],
    campusesEyebrow: "The Illuminate Montessori Difference",
    campusesHeading: "10 schools, one consistent standard.",
    campusesIntro:
      "Across every Illuminate Montessori campus, you'll experience the same trusted Montessori philosophy, exceptional academic standards, and personalized care, all designed to empower every child to reach their fullest potential.",
    eventsHeading: "Events Across Our Campuses",
    eventsText:
      "There's always something happening in our school community. Explore upcoming events across our campuses, meet educators and families, and discover opportunities to connect, learn, and celebrate together.",
    closingHeading: "Come see for yourself.",
    closingText: "Weekday tours are available at every Illuminate campus.",
  };

  const aboutPage = {
    _id: "aboutPage",
    _type: "aboutPage",
    eyebrow: "About Illuminate",
    heading: "A Place Families Trust, and Children Love.",
    subheading: "Why families choose Illuminate Montessori.",
    missionEyebrow: "Delivering the Best Montessori Education in America",
    missionText:
      "Illuminate Montessori's vision is to deliver the best Montessori education in America. We nurture the whole child through authentic Montessori principles while preparing children for the world of today and tomorrow. Through hands-on learning, independence, and respect for each child's natural development, we inspire curiosity, creativity, confidence, and responsibility. At the same time, we equip children with the skills needed to thrive in an increasingly connected and ever-changing world. Because we believe Montessori is more than an education for school. It is an education for life.",
    heroImage: await coreImg("about-classroom.webp"),
    visionHeading: "Our Vision.",
    visionItems: [
      "Independence & Self-Motivation",
      "Confidence Through Achievement",
      "Respect for Every Child",
      "Lifelong Love of Learning",
      "Strong Character & Responsibility",
      "Meaningful Family Partnerships",
    ],
    visionClosing:
      "When you step into one of our schools, you'll feel the warmth, the sense of purpose, and the delight that comes from a community built around children and their growth.",
    valuesEyebrow: "",
    valuesHeading: "Our core values.",
    valuesIntro:
      "At Illuminate Montessori, we believe children and families flourish when the right conditions are prepared. These values shape how we teach, how we lead, and how we welcome you into our community.",
    values: ["Trust", "Excellence", "Family Partnership", "Authentic Montessori Education", "Whole-child development", "Leadership and innovation"],
    meansHeading: "What this means for your family.",
    meansItems: [
      "Trusted partnership between school and family",
      "Children being known, valued, and supported",
      "Exceptional educators",
      "Authentic Montessori environments",
      "Confidence, independence, and lifelong learning",
      "Warm and welcoming communities",
    ],
    closingText: "At the center of it all is your child. Always.",
  };

  const admissionsPage = {
    _id: "admissionsPage",
    _type: "admissionsPage",
    heading: "Admissions.",
    intro:
      "At Illuminate Montessori, we believe the admissions journey should be clear, welcoming, and inspiring. Whether you're just beginning to explore Montessori or ready to secure your child's start date, our process is designed to be simple, transparent, and supportive so your family feels confident every step of the way.",
    steps: [
      { _key: "s1", title: "Schedule a Tour or Visit", description: "See our classrooms in action, meet our educators, and experience the Montessori environment firsthand." },
      { _key: "s2", title: "Confirm Placement", description: "Based on your child's age and stage of development, our admissions team will guide you into the right program: Nido (Infants), Toddler, or Children's House (Preschool & Kindergarten)." },
      { _key: "s3", title: "Complete Registration", description: "Submit the New Student Registration Form along with a one-time application fee and tuition deposit to secure your child's place." },
    ],
    teamEmail: "hello@illuminatemontessori.com",
    toursHeading: "Tours and Open Houses",
    toursIntro: "We host open houses, personal tours, and community events throughout the year, giving families the chance to:",
    toursList: [
      "Explore classrooms and outdoor learning spaces.",
      "Meet guides, staff, and current families.",
      "Learn how Montessori builds independence, focus, and joy.",
      "Ask questions about curriculum, routines, and school life.",
    ],
    focusHeading: "Our core focus in the admissions process.",
    focusIntro: "Enrolling at Illuminate Montessori means joining a partnership built on transparency, visibility, and progress.",
    focusItems: [
      { _key: "f1", title: "Stability", description: "Every placement is planned with care, ensuring a consistent environment where your child feels safe and supported. Families receive updates on transitions and milestones." },
      { _key: "f2", title: "Community", description: "From your first tour to your child's first day, you'll feel the warmth of our community. Updates give you a clear view of your child's social growth and independence." },
      { _key: "f3", title: "Staff", description: "Our Montessori-trained educators focus on outcomes that matter most: independence, concentration, and joy. You'll hear directly from them through notes and classroom highlights." },
      { _key: "f4", title: "Curriculum", description: "Our curriculum is hands-on, screen-free, and outcome-driven. Parents receive progress tracking aligned to developmental milestones, so you can celebrate growth step by step." },
      { _key: "f5", title: "Classrooms", description: "Every space is designed for independence. Through photos and updates, you'll see how your child engages with materials and routines in a carefully prepared environment." },
      { _key: "f6", title: "Visibility", description: "We believe parents deserve transparency. Our parent app provides updates, photos, and progress snapshots so you stay connected to your child's Montessori journey." },
    ],
    referralHeading: "Referral Program",
    referralText: "Our schools thrive on community. When you refer a family who enrolls, you'll receive a school specific tuition credit as our thank-you.",
    faqs: [
      { _key: "q1", question: "When do you accept new students?", answer: "We offer rolling enrollment year-round, with most placements happening for the fall start. Mid-year openings depend on availability at your chosen campus and age group." },
      { _key: "q2", question: "How much does tuition cost?", answer: "" },
      { _key: "q3", question: "What is the daily schedule?", answer: "" },
      { _key: "q4", question: "My child has never been in school before — is that OK?", answer: "" },
    ],
    closingText: "We look forward to welcoming your family into our community — one child, one classroom, one future at a time.",
  };

  const montessoriPage = {
    _id: "montessoriPage",
    _type: "montessoriPage",
    eyebrow: "The Innovator & Her Methods",
    headingLine1: "Maria",
    headingLine2: "Montessori.",
    bioText:
      "Maria Montessori was an Italian physician, anthropologist, scientist, and educator who dedicated her life to understanding how children learn. Rather than asking, “How should we teach children?” she asked, “What do children naturally need in order to learn?” Through years of careful scientific observation and research, she discovered that children thrive when they are trusted with purposeful work, given freedom within clear boundaries, and supported by an intentionally prepared environment.\n\nHer discoveries transformed education by revealing that children are naturally curious, capable, and eager to learn when their developmental needs are respected. Instead of relying on constant adult instruction or rewards, Montessori classrooms are intentionally designed to foster independence, confidence, concentration, problem-solving, and a lifelong love of learning. More than a century later, modern research continues to support many of Maria Montessori's observations, making her approach as relevant today as it was when it first inspired the world.",
    portraitImage: await coreImg("maria-montessori.webp"),
    programsHeading: "Illuminate Montessori's early-childhood programs provide:",
    features: [
      {
        _key: "ft1",
        title: "Intentionally-designed learning materials",
        description:
          "Each Illuminate Montessori classroom contains a sequence of captivating, hands-on learning materials that build on one another systematically. These materials offer foundational learning experiences in problem-solving, math, literacy, geography, and so much more.\n\nPictured: A preschooler working with the trinomial cube, a puzzle that builds problem-solving, spatial reasoning, and attention to detail, while preparing her for algebraic concepts learned in elementary.",
      },
      {
        _key: "ft2",
        title: "A curriculum for independence",
        description:
          "At Illuminate Montessori, we believe children are capable of far more than many adults realize. From an early age, we provide meaningful opportunities for children to care for themselves and participate in real-world activities that build genuine independence. Whether learning to drink from an open cup, prepare a snack, or care for their environment, children develop confidence, coordination, focus, and a strong sense of capability.",
      },
      {
        _key: "ft3",
        title: "One-on-one guidance and support",
        description:
          "Illuminate Montessori guides (teachers) form personal connections with each child and observe them closely to understand their individual needs and track their progress. Children receive personal lessons in each area of the curriculum, designed to meet them right where they are, inspire them, and provide just the right amount of challenge.\n\nPictured: A child receiving a personal lesson on the movable alphabet, a material that allows the child to compose words with wooden letters while he's still working on building the dexterity to write with a pencil.",
      },
      {
        _key: "ft4",
        title: "A supportive, mixed-age community",
        description:
          "Every Illuminate Montessori classroom is mixed-age by design. Younger children are inspired by the knowledge and abilities of those who are further along; older children delight in being a leader and sharing what they know; and every child gains a growth mindset, learns to collaborate, and makes progress without unhealthy competition or comparison.",
      },
    ],
    beliefHeading: "At Illuminate Montessori, we believe every child is tremendously capable.",
    beliefText:
      "Every day, our children accomplish big work, solve real problems, make choices, and experience the satisfaction of learning through their own effort. Children don't develop confidence because someone tells them what to do and when to do it — they develop it because they live it, experience it, and are an active participant in their learning every single day.\n\nThe independence, resilience, curiosity, and confidence they build here become a foundation they carry with them for the rest of their lives.",
    quoteText: "The education of even a small child does not aim at preparing him for school, but for life.",
    faqs: [
      { _key: "mq1", question: "How do you help babies adjust to being away from their parents?", answer: "The transition looks a little different for every child, and that's okay. We take time to build trust by following your baby's cues, maintaining consistent guides, and creating predictable routines. As your child begins to feel safe and secure, you'll often notice they naturally start exploring their environment with confidence. We also partner closely with families to make the transition as smooth as possible for everyone." },
      { _key: "mq2", question: "What does a typical day look like?", answer: "" },
      { _key: "mq3", question: "How do you handle tantrums or challenging behaviors?", answer: "" },
      { _key: "mq4", question: "When will my child learn to read, write, and do math?", answer: "" },
      { _key: "mq5", question: "Why is the kindergarten year so important?", answer: "" },
    ],
  };

  const contactPage = {
    _id: "contactPage",
    _type: "contactPage",
    eyebrow: "Visit",
    heading: "Come see for yourself.",
    subheading: "Weekday tours are available at every Illuminate Montessori campus.",
    formEndpoint: "",
    whatToExpect: [
      "We confirm your tour within one business day",
      "Tours run weekday (~45 minutes)",
      "You'll meet the Head of School and see classrooms in session",
      "No pressure — observe, ask questions, take your time",
    ],
    phoneNote: "Browse the campus locations below and select the school campus you are interested in. Each campus page includes a direct contact number, and our team would be happy to assist you.",
  };

  const ourSchoolsPage = {
    _id: "ourSchoolsPage",
    _type: "ourSchoolsPage",
    eyebrow: "Find Your Campus",
    heading: "A Place Families Trust, and Children Love",
    subheading: "Delivering the Best Montessori Education in America",
  };

  for (const doc of [homePage, aboutPage, admissionsPage, montessoriPage, contactPage, ourSchoolsPage]) {
    await client.createOrReplace(doc);
    console.log("Seeded:", doc._id);
  }
}

await seedCampuses();
await seedPages();
console.log("Done.");

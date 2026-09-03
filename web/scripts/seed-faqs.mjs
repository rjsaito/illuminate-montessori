import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const SCRATCH = "/private/tmp/claude-501/-Users-rjsaito/e3d0ea7e-cf2e-4509-bcbc-55a3d9ad4cf5/scratchpad";
const token = JSON.parse(fs.readFileSync(path.join(os.homedir(), ".config/sanity/config.json"), "utf8")).authToken;
const client = createClient({ projectId: "mp2n32ll", dataset: "production", apiVersion: "2024-01-01", token, useCdn: false });

// Recovered verbatim from the live WordPress accordions.
// "Why is the kindergarten year so important?" is deliberately omitted: on the
// source site it shows the read/write/math answer byte-for-byte, so there is no
// real answer to migrate.
const FAQS = [
  { id: "faq-when-accept", topics: ["admissions"], order: 10,
    question: "When do you accept new students?",
    answer: "We offer rolling enrollment year-round, with most placements happening for the fall start. Mid-year openings depend on availability at your chosen campus and age group." },
  { id: "faq-tuition-cost", topics: ["admissions", "tuition"], order: 20,
    question: "How much does tuition cost?",
    answer: "Tuition varies by campus, age group, and schedule. Once you reach out, your local admissions team will share a current rate sheet and any sibling, military, or referral incentives." },
  { id: "faq-daily-schedule", topics: ["admissions", "montessori"], order: 30,
    question: "What is the daily schedule?",
    answer: "Our school day begins at 7:00 AM, with a dedicated two-hour Montessori work cycle that encourages deep concentration, independence, and hands-on learning. Lunch, outdoor play, and afternoon enrichment follow, with extended care available until 6:00 PM. Additional program schedules are also available to accommodate your family's needs depending on campus." },
  { id: "faq-never-in-school", topics: ["admissions"], order: 40,
    question: "My child has never been in school before — is that OK?",
    answer: "Absolutely. Most of our students start in Nido or Toddler, and many families choose Montessori as their first school experience. We support the transition carefully." },
  { id: "faq-babies-adjust", topics: ["montessori"], order: 50,
    question: "How do you help babies adjust to being away from their parents?",
    answer: "The transition looks a little different for every child, and that's okay. We take time to build trust by following your baby's cues, maintaining consistent guides, and creating predictable routines. As your child begins to feel safe and secure, you'll often notice they naturally start exploring their environment with confidence. We also partner closely with families to make the transition as smooth as possible for everyone." },
  { id: "faq-typical-day", topics: ["montessori"], order: 60,
    question: "What does a typical day look like?",
    answer: "Rather than following a rigid schedule, we follow each baby's individual rhythms. Feeding, naps, diapering, movement, and play happen when your child is ready. For our youngest children, especially those under one year old, we honor their on-demand schedule and respond to their individual needs throughout the day.\n\nAs children grow and develop, it's natural to see longer periods of alertness, fewer naps, a gradual transition from bottles to solid foods, and an increasing interest in participating in the daily rhythm of the community. During this time, we gently introduce predictable routines such as snack time, outdoor play, and rest time, always following each child's developmental readiness.\n\nWe partner closely with families throughout this process to create consistency between home and school. By working together, we help children experience a reassuring sense of routine while still honoring their unique pace of growth and development." },
  { id: "faq-tantrums", topics: ["montessori"], order: 70,
    question: "How do you handle tantrums or challenging behaviors?",
    answer: "We see behavior as communication. We do not respond with timeouts, punishment, or rewards — we work to understand what a child is trying to tell us and to understand the “why” behind the behavior. We respond calmly, help children name their feelings, set clear and consistent limits, and guide them toward more appropriate ways of expressing themselves. This modeling and gentle guidance are forms of co-regulation, helping children feel safe and supported as they navigate big emotions. Over time, these experiences build the foundation for self-regulation, allowing children to gradually recognize, manage, and express their feelings with increasing confidence and independence." },
  { id: "faq-read-write-math", topics: ["montessori"], order: 80,
    question: "When will my child learn to read, write, and do math?",
    answer: "Children begin building these skills long before they formally read, write, or solve equations. Through carefully designed, didactic hands-on Montessori materials, they develop language, phonics, number sense, and problem-solving in ways that foster understanding rather than rote memorization. Because every child develops at their own pace, we don't expect everyone to reach milestones at the same time. Instead, we prepare the environment so learning unfolds naturally when each child is ready.\n\nWe also believe that learning is strongest when schools and families work together. Through our parent portal, you'll receive visibility on the lessons your child is receiving and their academic progress. Regular milestone meetings, parent-teacher conferences, and opportunities like “Watch Me Work” days give you a window into your child's classroom experience, allowing you to see their growth, independence, and love of learning firsthand." },
];

for (const f of FAQS) {
  await client.createOrReplace({
    _id: f.id, _type: "faq",
    question: f.question, answer: f.answer, topics: f.topics, order: f.order,
  });
  console.log(`faq: ${f.topics.join("+").padEnd(22)} ${f.question.slice(0, 58)}`);
}

// Retire the inline arrays now that the collection owns them.
for (const id of ["admissionsPage", "montessoriPage"]) {
  await client.patch(id).unset(["faqs"]).commit();
}
console.log("\nremoved inline faqs arrays from page singletons");

// Feature images for /what-is-montessori/
const IMAGES = {
  "Intentionally-designed learning materials": "binomial-cube.webp",
  "A curriculum for independence": "nido.webp",
  "One-on-one guidance and support": "personal-lesson.webp",
  "A supportive, mixed-age community": "mixed-age.webp",
};

const page = await client.fetch(`*[_id=="montessoriPage"][0]{features}`);
const features = [];
for (const f of page.features ?? []) {
  const file = IMAGES[f.title];
  let image;
  if (file) {
    const p = path.join(SCRATCH, "assets/pages", file);
    if (fs.existsSync(p)) {
      const asset = await client.assets.upload("image", fs.createReadStream(p), { filename: file });
      image = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
      console.log(`image: ${f.title.slice(0, 44).padEnd(46)} <- ${file}`);
    }
  }
  features.push({ ...f, ...(image ? { image } : {}) });
}
await client.patch("montessoriPage").set({ features }).commit();
console.log("\nDone.");

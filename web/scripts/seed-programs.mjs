import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const SCRATCH = "/private/tmp/claude-501/-Users-rjsaito/e3d0ea7e-cf2e-4509-bcbc-55a3d9ad4cf5/scratchpad";
const token = JSON.parse(fs.readFileSync(path.join(os.homedir(), ".config/sanity/config.json"), "utf8")).authToken;

const client = createClient({
  projectId: "mp2n32ll",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const campuses = JSON.parse(fs.readFileSync(`${SCRATCH}/campus-full.json`, "utf8"));
const geo = JSON.parse(fs.readFileSync(`${SCRATCH}/geocoded.json`, "utf8"));

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function upload(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
    filename: path.basename(filePath),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

function findAsset(dir, slug) {
  if (!fs.existsSync(dir)) return null;
  const f = fs.readdirSync(dir).find((x) => x.startsWith(slug + "."));
  return f ? path.join(dir, f) : null;
}

// ---- 1. Program documents (defined once, referenced by campuses) ----
const PROGRAMS = [
  { name: "Nido", order: 10, defaultAges: "6 Weeks – 16 Months",
    description: "A nurturing Montessori environment designed to support infants during the earliest stages of development as they build trust, independence, movement, and communication skills." },
  { name: "Toddler", order: 20, defaultAges: "16 Months – 3 Years",
    description: "A carefully prepared Montessori environment that encourages independence, language development, concentration, movement, and self-confidence through purposeful work and exploration." },
  { name: "Children's House", order: 30, defaultAges: "3 – 6 Years",
    description: "A multi-age Montessori classroom that supports academic, social, emotional, and practical life development while fostering curiosity, confidence, and a love of learning." },
  { name: "Kindergarten", order: 40, defaultAges: "5 – 6 Years",
    description: "A comprehensive Montessori kindergarten experience that builds leadership, independence, and advanced academic skills." },
  { name: "Elementary", order: 50, defaultAges: "6 – 12 Years",
    description: "An engaging elementary program serving children through age 12, encouraging critical thinking, collaboration, and a lifelong love of learning." },
  { name: "Spanish Immersion", order: 60, defaultAges: "3 – 6 Years",
    description: "A fully immersive Montessori environment where children naturally acquire Spanish language skills while engaging in meaningful Montessori learning experiences. Students develop confidence in communication while building cultural awareness and global understanding." },
  { name: "School-Age Care", order: 70, defaultAges: "5 – 12 Years",
    description: "Flexible care for elementary students, including before & after school care and drop-in care on select school holidays and closures when the campus remains open." },
];

const programIdBySlug = {};
for (const p of PROGRAMS) {
  const slug = slugify(p.name);
  const _id = `program-${slug}`;
  await client.createOrReplace({
    _id,
    _type: "program",
    name: p.name,
    slug: { _type: "slug", current: slug },
    description: p.description,
    defaultAges: p.defaultAges,
    order: p.order,
  });
  programIdBySlug[p.name] = _id;
  console.log("program:", p.name);
}

// ---- 2. Patch each campus ----
for (const c of campuses) {
  const g = geo[c.slug] || {};
  const hosPhotoPath = findAsset(`${SCRATCH}/assets/hos`, c.slug);
  const campusPhotoPath = findAsset(`${SCRATCH}/assets/campus`, c.slug);

  const hosPhoto = hosPhotoPath ? await upload(hosPhotoPath) : null;
  const campusPhoto = campusPhotoPath ? await upload(campusPhotoPath) : null;

  const programs = c.programs
    .filter((p) => programIdBySlug[p.name] || p.name.startsWith("School-Age Care"))
    .map((p, i) => {
      const key = p.name.startsWith("School-Age Care") ? "School-Age Care" : p.name;
      return {
        _key: `prog-${i}`,
        _type: "campusProgram",
        program: { _type: "reference", _ref: programIdBySlug[key] },
        ages: p.ages || "",
      };
    });

  const patch = {
    agesServed: c.agesServed || "",
    programs,
    schoolAgeCare: !!c.schoolAgeCare,
    city: g.city || "",
    postalCode: g.zip || "",
    headOfSchool: {
      _type: "object",
      name: c.headOfSchool.name || "",
      title: "Head of School",
      bio: c.headOfSchool.bio || "",
      ...(hosPhoto ? { photo: hosPhoto } : {}),
    },
    ...(g.lat != null ? { location: { _type: "geopoint", lat: g.lat, lng: g.lng } } : {}),
    // Only set a campus photo where a real, campus-specific one exists.
    ...(campusPhoto ? { heroImage: campusPhoto } : {}),
  };

  await client.patch(`campus-${c.slug}`).set(patch).commit();
  console.log(
    `campus: ${c.slug.padEnd(22)} programs:${String(programs.length).padStart(2)}  HoS:${(c.headOfSchool.name || "-").padEnd(26)}` +
      `${campusPhoto ? "photo" : "no-photo"}`
  );
}

console.log("\nDone.");

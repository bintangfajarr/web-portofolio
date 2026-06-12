import fs from "fs";
import path from "path";
import {
  defaultExperience,
  defaultEducation,
  defaultProjects,
  defaultSkills,
  defaultCertifications,
  defaultAwards,
  personalInfo,
  defaultVolunteer,
  defaultPublications,
  defaultReference,
} from "./data";

const DB_FILE = path.join(process.cwd(), "lib", "local_db.json");

interface LocalData {
  experience: any[];
  education: any[];
  projects: any[];
  skills: any[];
  certifications: any[];
  awards: any[];
  volunteer: any[];
  publications: any[];
  reference: any[];
  about: any;
}

const defaultAbout = {
  id: "1",
  name: personalInfo.name,
  short_name: personalInfo.shortName,
  title: personalInfo.title,
  bio: personalInfo.bio,
  email: personalInfo.email,
  phone: personalInfo.phone,
  linkedin: personalInfo.linkedin,
  github: personalInfo.github,
  languages: personalInfo.languages,
  cv_url: "/cv.pdf",
};

function initDb(): LocalData {
  // Check if directory exists, if not create it
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(content);
    } catch {
      // ignore and overwrite if corrupted
    }
  }

  const defaultDb: LocalData = {
    experience: defaultExperience.map((x, i) => ({ id: `exp-${i}`, ...x })),
    education: defaultEducation.map((x, i) => ({ id: `edu-${i}`, ...x })),
    projects: defaultProjects.map((x, i) => ({ id: `proj-${i}`, ...x })),
    skills: defaultSkills.map((x, i) => ({ id: `skill-${i}`, ...x })),
    certifications: defaultCertifications.map((x, i) => ({ id: `cert-${i}`, ...x })),
    awards: defaultAwards.map((x, i) => ({ id: `award-${i}`, ...x })),
    volunteer: defaultVolunteer.map((x, i) => ({ id: `vol-${i}`, ...x })),
    publications: defaultPublications.map((x, i) => ({ id: `pub-${i}`, ...x })),
    reference: defaultReference.map((x, i) => ({ id: `ref-${i}`, ...x })),
    about: defaultAbout,
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2), "utf-8");
  return defaultDb;
}

export function getLocalData(table: keyof LocalData): any {
  const db = initDb();
  return db[table];
}

export function saveLocalData(table: keyof LocalData, data: any) {
  const db = initDb();
  db[table] = data;
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
}

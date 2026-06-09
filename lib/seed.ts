import { createClient } from "@supabase/supabase-js";
import {
  defaultExperience,
  defaultEducation,
  defaultProjects,
  defaultSkills,
  defaultCertifications,
  defaultAwards,
} from "./data";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function seed() {
  if (!supabaseUrl || supabaseUrl === "your_supabase_project_url") {
    console.error("❌ Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  console.log("🌱 Seeding database...\n");

  const tables = [
    { name: "experience", data: defaultExperience },
    { name: "education", data: defaultEducation },
    { name: "projects", data: defaultProjects },
    { name: "skills", data: defaultSkills },
    { name: "certifications", data: defaultCertifications },
    { name: "awards", data: defaultAwards },
  ];

  for (const table of tables) {
    // Check if data already exists
    const { data: existing } = await supabase.from(table.name).select("id").limit(1);

    if (existing && existing.length > 0) {
      console.log(`⏭️  ${table.name} already has data, skipping...`);
      continue;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await supabase.from(table.name).insert(table.data as any);

    if (error) {
      console.error(`❌ Error seeding ${table.name}:`, error.message);
    } else {
      console.log(`✅ Seeded ${table.name} (${table.data.length} rows)`);
    }
  }

  console.log("\n🎉 Seeding complete!");
}

seed().catch(console.error);

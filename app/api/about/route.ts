import { NextRequest, NextResponse } from "next/server";
import { supabase, getServiceSupabase } from "@/lib/supabase";
import { personalInfo } from "@/lib/data";

function checkAdmin(request: NextRequest) {
  const adminToken = request.headers.get("x-admin-token");
  return adminToken === process.env.ADMIN_PASSWORD;
}

const defaultAbout = {
  id: 1,
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

export async function GET() {
  if (!supabase) {
    return NextResponse.json(defaultAbout);
  }

  const { data, error } = await supabase
    .from("about")
    .select("*")
    .eq("id", 1)
    .single();

  if (error || !data) {
    // If table doesn't exist or row is not found, return default seed data
    return NextResponse.json(defaultAbout);
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  if (!checkAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sb = getServiceSupabase();
  if (!sb) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const body = await request.json();
  // Ensure id is always 1
  const payload = {
    ...body,
    id: 1,
  };

  const { data, error } = await sb
    .from("about")
    .upsert(payload, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  return POST(request); // Put behaves same as POST upsert
}

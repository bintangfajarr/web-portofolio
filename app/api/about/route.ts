import { NextRequest, NextResponse } from "next/server";
import { dbGetAbout, dbSaveAbout } from "@/lib/db";

function checkAdmin(request: NextRequest) {
  const adminToken = request.headers.get("x-admin-token");
  return adminToken === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  try {
    const data = await dbGetAbout();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!checkAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = await dbSaveAbout(body);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  return POST(request);
}


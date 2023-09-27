import { connect } from "@/utils/mongo.config";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json(body, { status: 200 });
}

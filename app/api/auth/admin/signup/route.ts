import { connect } from "@/utils/mongo.config";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync("123126476", salt);

  await User.create({
    email: "admin@gmail.com",
    password: password,
    name: "Admin",
    role: "Admin",
  });

  return NextResponse.json({
    status: 200,
    message: "Admin Created Successfully",
  });
}

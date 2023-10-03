import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import cryptoRandomString from "crypto-random-string";
import Cryptr from "cryptr";
import Env from "@/mailconfig/env";

export async function POST(request: NextRequest) {
  const payload: ForgotPasswordPayload = await request.json();

  // Check user email first
  const user = await User.findOne({ email: payload.email });
  if (user == null) {
    return NextResponse.json(
      {
        message: "No user found with this email ",
      },
      { status: 400 }
    );
  }

  // Generate a random string & save user
  const random_str = cryptoRandomString({ length: 64, type: "alphanumeric" });
  user.password_reset_token = random_str;
  await user.save();

  // encrypt user email
  const cryptr = new Cryptr(Env.SECRET_KEY);
}

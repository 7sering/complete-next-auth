import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import cryptoRandomString from "crypto-random-string";
import Cryptr from "cryptr";
import Env from "@/mailconfig/env";

import { render } from "@react-email/render";
import ForgotPasswordEmail from "@/email/ForgotPasswordEmail";
import { sendEmail } from "@/mailconfig/mail";
import { connect } from "@/utils/mongo.config";

connect();

export async function POST(request: NextRequest) {
  const payload: ForgotPasswordPayload = await request.json();

  // * Check user email firsr
  const user = await User.findOne({ email: payload.email });
  if (user == null) {
    return NextResponse.json({
      status: 400,
      errors: {
        email: "No user found with this email.",
      },
    });
  }

  // Generate a random string & save user
  const random_str = cryptoRandomString({ length: 64, type: "alphanumeric" });
  user.password_reset_token = random_str;
  await user.save();

  // encrypt user email
  const crypt = new Cryptr(Env.SECRET_KEY);
  const encrypted_email = crypt.encrypt(user.email);

  // Generate Encrypted URL
  const url = `${Env.APP_URL}/reset-password/${encrypted_email}?signature=${random_str}`;

  // Send Email to user
  try {
    const html = render(
      ForgotPasswordEmail({
        params: {
          name: user.name,
          url: url,
        },
      })
    );

    await sendEmail(payload.email, "Reset Password", html);
    return NextResponse.json({
      status: 200,
      message: "Email sent successfully.please check your email.",
    });
  } catch (error) {
    console.log("EMAIL_ERROR", error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong.please try again!",
    });
  }
}

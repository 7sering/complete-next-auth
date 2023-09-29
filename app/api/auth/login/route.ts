import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcryptjs";

import { connect } from "@/utils/mongo.config";
import { loginSchema } from "@/validator/authSchema";
import ErrorReporter from "@/validator/errorReporter";
import { User } from "@/models/User";

connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validator = vine.compile(loginSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);

    //check if user exist
    const user = await User.findOne({ email: output.email });
    if (user) {
      const comparePassword = await bcrypt.compare(
        output.password!,
        user.password
      );
      if (comparePassword) {
        return NextResponse.json(
          { status: 200, message: "User Logged in successfully!" },
          { status: 200 }
        );
      }
      return NextResponse.json(
        {
          status: 400,
          errors: {
            email: "Please check your credentials.",
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: 400,
          errors: {
            email: "No User found in our system with above email.",
          },
        },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
  }
}

import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcryptjs";

import { connect } from "@/utils/mongo.config";
import { registerSchema } from "@/validator/authSchema";
import ErrorReporter from "@/validator/errorReporter";
import { User } from "@/models/User";

connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validator = vine.compile(registerSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);

    //Check User Email Already Exists
    const user = await User.findOne({ email: output.email });
    if (user) {
      return NextResponse.json(
        {
          status: 400,
          errors: {
            email: "Email Already Exists. Please User Another Email",
          },
        },
        { status: 200 }
      );
    } else {
      //encrypt password
      const salt = await bcrypt.genSalt(10);
      output.password = await bcrypt.hash(output.password, salt);
      await User.create(output);
      return NextResponse.json(
        { status: 200, message: "User Created Successfully!" },
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

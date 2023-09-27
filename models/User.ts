import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      required: [true, "Name is required"],
      type: Schema.Types.String,
    },
    email: {
      required: [true, "Email is required"],
      type: Schema.Types.String,
    },
    password: {
      required: [true, "Password is required"],
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
);
//If the User collection does not exist create a new one.
export const User = mongoose.models.User || mongoose.model("User", userSchema);

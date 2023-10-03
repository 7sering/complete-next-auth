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
      unique: true,
      trim: true,
    },
    password: {
      type: Schema.Types.String,
    },
    avatar: {
      required: false,
      type: Schema.Types.String,
    },
    role: {
      required: false,
      type: Schema.Types.String,
      default: "User",
    },
    password_reset_token: {
      required: false,
      type: Schema.Types.String,
      trim: true,
    },
  },
  { timestamps: true }
);
//If the User collection does not exist create a new one.
export const User = mongoose.models.User || mongoose.model("User", userSchema);

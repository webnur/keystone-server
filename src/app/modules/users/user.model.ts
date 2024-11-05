import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["vendor", "customer", "admin", "super_admin"],
      default: "customer",
      required: true,
    },
    isVerified: { type: Boolean, default: false },
    contactNumber: { type: String, required: false },
    address: { type: String, required: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const User = model<IUser, UserModel>("User", UserSchema);

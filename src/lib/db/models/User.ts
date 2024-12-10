import mongoose, { Schema, model, Document } from "mongoose";

// Define the User interface
export interface IUser extends Document {
  name: string;
  email: string;
  role: "admin" | "user";
  password: string;
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Define the User schema
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    password: { type: String, required: true },
    photo: { type: String, default: null },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Format timestamps in JSON output
UserSchema.set("toJSON", {
  transform: (_doc, ret) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    ret.createdAt = new Date(ret.createdAt).toLocaleString("en-US", options);
    ret.updatedAt = new Date(ret.updatedAt).toLocaleString("en-US", options);

    return ret;
  },
});


const User = mongoose.models.User || model<IUser>("User", UserSchema);
export default User;

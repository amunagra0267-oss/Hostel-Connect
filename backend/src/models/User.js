import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // hashed
    role: {
      type: String,
      required: true,
      enum: ["student", "warden", "worker", "security", "admin"],
    },
    // role-specific extra fields, kept flexible on purpose
    hostel: String,
    block: String,
    room: String,
    phone: String,
    gate: String,
    org: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

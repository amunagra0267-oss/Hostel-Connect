import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    important: { type: Boolean, default: false },
    // who posted it
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    postedByRole: { type: String, enum: ["warden", "admin"], required: true },
    postedByName: String,
    // which portals/roles should see this notice. Empty/["all"] = everyone.
    audience: {
      type: [String],
      default: ["all"], // any of: all, student, worker, security, warden, admin
    },
    // who has read it (per-user read receipts)
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Notice", noticeSchema);

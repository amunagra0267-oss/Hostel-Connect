import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true }, // "YYYY-MM-DD", one doc per student per day
    present: { type: Boolean, default: true },
    checkIn: String,
    checkOut: String,
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // warden/security who marked it
    markedByRole: { type: String, enum: ["warden", "security", "admin"] },
    source: { type: String, enum: ["warden", "security-gate"], default: "warden" },
  },
  { timestamps: true }
);

// one attendance record per student per day
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);

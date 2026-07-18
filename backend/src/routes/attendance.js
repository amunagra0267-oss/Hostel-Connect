import { Router } from "express";
import Attendance from "../models/Attendance.js";
import User from "../models/User.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

function today() {
  return new Date().toISOString().slice(0, 10);
}

// GET /api/attendance?date=YYYY-MM-DD
// - student: only their own record for that date
// - warden/security/admin: the full hostel list for that date
router.get("/", requireAuth, async (req, res) => {
  const date = req.query.date || today();

  if (req.user.role === "student") {
    const record = await Attendance.findOne({ student: req.user.id, date });
    return res.json(record ? [record] : []);
  }

  const records = await Attendance.find({ date }).populate("student", "name room block hostel");
  res.json(records);
});

// GET /api/attendance/history/:studentId -> a student's full attendance history
router.get("/history/:studentId", requireAuth, async (req, res) => {
  const records = await Attendance.find({ student: req.params.studentId }).sort({ date: -1 });
  res.json(records);
});

// POST /api/attendance/mark  { studentId, date?, present, checkIn?, checkOut? }
// only warden/security/admin can mark attendance; reflects instantly for the student
router.post("/mark", requireAuth, requireRole("warden", "security", "admin"), async (req, res) => {
  const { studentId, date = today(), present = true, checkIn, checkOut } = req.body;
  if (!studentId) return res.status(400).json({ message: "studentId is required" });

  const student = await User.findOne({ _id: studentId, role: "student" });
  if (!student) return res.status(404).json({ message: "Student not found" });

  const record = await Attendance.findOneAndUpdate(
    { student: studentId, date },
    {
      present,
      checkIn,
      checkOut,
      markedBy: req.user.id,
      markedByRole: req.user.role,
      source: req.user.role === "security" ? "security-gate" : "warden",
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.json(record);
});

// PATCH /api/attendance/:id/toggle -> quick present/absent flip (warden table "Mark present/absent" button)
router.patch("/:id/toggle", requireAuth, requireRole("warden", "security", "admin"), async (req, res) => {
  const record = await Attendance.findById(req.params.id);
  if (!record) return res.status(404).json({ message: "Attendance record not found" });

  record.present = !record.present;
  record.markedBy = req.user.id;
  record.markedByRole = req.user.role;
  await record.save();

  res.json(record);
});

export default router;

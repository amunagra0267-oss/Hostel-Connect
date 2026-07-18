import { Router } from "express";
import Notice from "../models/Notice.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

// GET /api/notices  -> notices visible to the logged-in user's role
router.get("/", requireAuth, async (req, res) => {
  const notices = await Notice.find({
    $or: [{ audience: "all" }, { audience: req.user.role }],
  }).sort({ createdAt: -1 });

  const withReadFlag = notices.map((n) => ({
    id: n._id,
    title: n.title,
    description: n.description,
    date: n.createdAt.toISOString().slice(0, 10),
    important: n.important,
    postedByRole: n.postedByRole,
    postedByName: n.postedByName,
    audience: n.audience,
    read: n.readBy.some((id) => id.toString() === req.user.id),
  }));

  res.json(withReadFlag);
});

// POST /api/notices  -> only warden/admin can post
router.post("/", requireAuth, requireRole("warden", "admin"), async (req, res) => {
  const { title, description = "", important = false, audience = ["all"] } = req.body;
  if (!title) return res.status(400).json({ message: "title is required" });

  const notice = await Notice.create({
    title: title.trim(),
    description: description.trim(),
    important,
    audience,
    postedBy: req.user.id,
    postedByRole: req.user.role,
    postedByName: req.user.name,
  });

  res.status(201).json(notice);
});

// PATCH /api/notices/:id/read  -> mark as read for the logged-in user
router.patch("/:id/read", requireAuth, async (req, res) => {
  const notice = await Notice.findById(req.params.id);
  if (!notice) return res.status(404).json({ message: "Notice not found" });

  if (!notice.readBy.some((id) => id.toString() === req.user.id)) {
    notice.readBy.push(req.user.id);
    await notice.save();
  }
  res.json({ ok: true });
});

export default router;

import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Notice from "./models/Notice.js";
import Attendance from "./models/Attendance.js";

const DOMAIN = "@geetauniversity.edu.in";

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected. Seeding...");

  await Promise.all([User.deleteMany({}), Notice.deleteMany({}), Attendance.deleteMany({})]);

  const password = await bcrypt.hash("password123", 10);

  const [student, warden, worker, security, admin] = await User.create([
    { name: "Aarav Sharma", email: `student${DOMAIN}`, password, role: "student", hostel: "Girls Hostel A", block: "A", room: "A-204", phone: "9876543210" },
    { name: "Priya Warden", email: `warden${DOMAIN}`, password, role: "warden", hostel: "Girls Hostel A" },
    { name: "Ramesh Worker", email: `worker${DOMAIN}`, password, role: "worker" },
    { name: "Suresh Guard", email: `security${DOMAIN}`, password, role: "security", gate: "Main Gate" },
    { name: "Anita Admin", email: `admin${DOMAIN}`, password, role: "admin", org: "Geeta University" },
  ]);

  await Notice.create({
    title: "Electricity Maintenance",
    description: "Electricity will be unavailable from 2 PM to 4 PM today.",
    important: true,
    audience: ["all"],
    postedBy: warden._id,
    postedByRole: "warden",
    postedByName: warden.name,
  });

  await Attendance.create({
    student: student._id,
    date: new Date().toISOString().slice(0, 10),
    present: true,
    checkIn: "7:45 PM",
    markedBy: warden._id,
    markedByRole: "warden",
  });

  console.log("Seeded users (password for all: password123):");
  console.log([student, warden, worker, security, admin].map((u) => `${u.role}: ${u.email}`).join("\n"));

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

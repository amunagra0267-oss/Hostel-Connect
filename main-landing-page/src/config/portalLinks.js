// URLs for each standalone portal app. In development these point at
// separate localhost ports (each portal's vite.config.js should set a
// distinct `server.port` so they can all run at once). In production,
// set the VITE_*_URL env vars to each portal's real deployed URL
// (e.g. subdomains like https://student.hostelconnect.in).

export const PORTAL_LINKS = [
  {
    role: "student",
    label: "Student",
    blurb: "Raise complaints, apply for leave, check mess menu & notices.",
    url: import.meta.env.VITE_STUDENT_URL || "http://localhost:5173",
  },
  {
    role: "warden",
    label: "Warden",
    blurb: "Review leave requests, manage residents and room allotments.",
    url: import.meta.env.VITE_WARDEN_URL || "http://localhost:5174",
  },
  {
    role: "security",
    label: "Security",
    blurb: "Log visitor passes, gate entries and night-round checks.",
    url: import.meta.env.VITE_SECURITY_URL || "http://localhost:5175",
  },
  {
    role: "worker",
    label: "Worker",
    blurb: "View assigned maintenance jobs and update task status.",
    url: import.meta.env.VITE_WORKER_URL || "http://localhost:5176",
  },
  {
    role: "admin",
    label: "Admin",
    blurb: "Oversee every hostel block, staff accounts and reports.",
    url: import.meta.env.VITE_ADMIN_URL || "http://localhost:5177",
  },
];

# HostelConnect — Security Portal

A complete, working Security guard portal for HostelConnect (Geeta University), built with **React + Vite + react-router-dom**, styled to match your black/gold login screen.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. Sign in with any email/password on the login screen (it's a UI-only demo login) — it drops you straight onto the Security dashboard.

## What's included

- **Dashboard** — live stats (currently inside, today's visitors, pending passes, total logged), a "currently checked in" list with one-tap check-out, pending leave passes with one-tap "mark returned," and a notices preview.
- **Notice** — every notice from Admin/Warden, unread dot + "mark all as read," tap a card to expand and read the full notice. The bell icon in the top bar (on every page) opens this page and shows the live unread count.
- **Attendance** — the guard marks **Present / Leave / Absent** for the day (flagged "Awaiting approval," simulating the request going to Admin & Warden). A monthly calendar colour-codes every marked day, with a month switcher and running totals.
- **Entry / Exit** — student leave passes. "New Entry" opens a form (student, room, reason, expected return) and creates a pass; "Mark Returned" closes it out. Filter by All / Currently Out / Returned.
- **Visitor Log** — "New Entry" checks in a visitor (name, relation, room, phone, purpose) with a timestamp; "Check Out" closes the visit. Filter by All / Checked In / Checked Out.
- **Lost & Found** — log a found or lost item with location and notes, then mark it claimed/resolved.
- **Profile** — guard's photo initial, ID, gate, contact info and shift, editable in place, plus quick stats (days present, visitors logged, passes issued) and log out.

## How the data works

Everything lives in `src/context/DataContext.jsx`, a single React Context that holds attendance, entries, visitors, notices, lost & found items and the guard's profile, and persists it to `localStorage` (key `hostelconnect_security_portal_v1`) so it survives refreshes. Every page reads/writes through this context, so actions genuinely propagate across the app — e.g. checking in a visitor on **Visitor Log** immediately updates the **Dashboard** counts and "currently checked in" list.

To wire this to your real backend (so attendance/entries actually reach the Admin and Warden portals), replace the body of each function in `DataContext.jsx` (`markAttendance`, `createLeavePass`, `checkInVisitor`, etc.) with your API calls, and swap the `useState`/`localStorage` pair for a fetch-on-load + mutation pattern (React Query, SWR, or plain `fetch`).

## Matching your other portals

- The colour tokens (`ink-*` for the near-black surfaces, `gold-*` for the accent) are defined in `tailwind.config.js` — reuse the same file across your Admin/Warden/Student/Worker portals to keep them visually consistent.
- `Sidebar.jsx` / `MobileNav.jsx` only know about this portal's 7 routes — if you're merging this into one app with the other portals, swap the nav items array for a role-based list and reuse `Topbar.jsx` and `components/UI.jsx` as-is; they're portal-agnostic.

## Project structure

```
src/
  context/DataContext.jsx   shared state (attendance, entries, visitors, notices, lost&found, guard profile)
  components/                Sidebar, Topbar, MobileNav, and shared UI primitives (Card, Button, Modal, Badge...)
  pages/                      Dashboard, Notice, Attendance, EntryExit, VisitorLog, LostFound, Profile, Login
  App.jsx                     route table
  main.jsx                    entry point, wraps app in BrowserRouter + DataProvider
```

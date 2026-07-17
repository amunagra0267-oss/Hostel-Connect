import PortalShell from "../components/PortalShell";

// TODO: replace this placeholder with your existing student
// portal component, e.g.:
//   import StudentDashboard from "../../my-student-portal";
//   <PortalShell ...><StudentDashboard /></PortalShell>
export default function StudentPortal() {
  return (
    <PortalShell title="Student Portal" accentLabel="Signed in as Student">
      <div className="portal-placeholder">
        Connect your existing student portal here. Import its root
        component into <code>src/pages/StudentPortal.jsx</code> and
        render it inside <code>&lt;PortalShell&gt;</code>.
      </div>
    </PortalShell>
  );
}
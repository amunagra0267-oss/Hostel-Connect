import PortalShell from "../components/PortalShell";

// TODO: replace this placeholder with your existing worker
// portal component, e.g.:
//   import WorkerDashboard from "../../my-worker-portal";
//   <PortalShell ...><WorkerDashboard /></PortalShell>
export default function WorkerPortal() {
  return (
    <PortalShell title="Worker Portal" accentLabel="Signed in as Worker">
      <div className="portal-placeholder">
        Connect your existing worker portal here. Import its root
        component into <code>src/pages/WorkerPortal.jsx</code> and
        render it inside <code>&lt;PortalShell&gt;</code>.
      </div>
    </PortalShell>
  );
}
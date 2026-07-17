import PortalShell from "../components/PortalShell";

export default function AdminPortal() {
  return (
    <PortalShell title="Admin Portal" accentLabel="Signed in as Admin">
      <div className="portal-placeholder">
        Connect your existing admin portal here. Import its root
        component into <code>src/pages/AdminPortal.jsx</code> and
        render it inside <code>&lt;PortalShell&gt;</code>.
      </div>
    </PortalShell>
  );
}
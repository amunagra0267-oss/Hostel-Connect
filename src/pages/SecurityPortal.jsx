import PortalShell from "../components/PortalShell";

export default function SecurityPortal() {
  return (
    <PortalShell title="Security Portal" accentLabel="Signed in as Security">
      <div className="portal-placeholder">
        Connect your existing security portal here. Import its root
        component into <code>src/pages/SecurityPortal.jsx</code> and
        render it inside <code>&lt;PortalShell&gt;</code>.
      </div>
    </PortalShell>
  );
}
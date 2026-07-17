import PortalShell from "../components/PortalShell";

export default function WardenPortal() {
  return (
    <PortalShell title="Warden Portal" accentLabel="Signed in as Warden">
      <div className="portal-placeholder">
        Connect your existing warden portal here. Import its root
        component into <code>src/pages/WardenPortal.jsx</code> and
        render it inside <code>&lt;PortalShell&gt;</code>.
      </div>
    </PortalShell>
  );
}
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./PortalShell.css";

export default function PortalShell({ title, accentLabel, children }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="portal-shell">
      <header className="portal-shell__header">
        <div>
          <p className="portal-shell__eyebrow">{accentLabel}</p>
          <h1 className="portal-shell__title">{title}</h1>
        </div>
        <button type="button" className="portal-shell__logout" onClick={handleLogout}>
          Log out
        </button>
      </header>
      <main className="portal-shell__content">{children}</main>
    </div>
  );
}
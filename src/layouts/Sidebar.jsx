import React, { useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Icon from "../components/icons/Icon";

const Sidebar = ({ mobileOpen = false, onClose = () => {} }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menu = useMemo(
    () => [
      { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
      { name: "My Profile", path: "/profile", icon: "person" },
      { name: "My Room", path: "/my-room", icon: "meeting_room" },
      { name: "Complaints", path: "/complaints", icon: "report_problem" },
      { name: "Attendance", path: "/attendance", icon: "fact_check" },
      { name: "Leave", path: "/leave", icon: "event_available" },
      { name: "Visitor Pass", path: "/visitor", icon: "badge" },
      { name: "Mess Menu", path: "/mess", icon: "restaurant" },
      { name: "Meetings", path: "/meetings", icon: "groups" },
      { name: "Notices", path: "/notices", icon: "campaign" },
      { name: "Notifications", path: "/notifications", icon: "notifications" },
      { name: "Digital ID", path: "/digital-id", icon: "id_card" },
      { name: "Emergency Contacts", path: "/emergency", icon: "emergency" },
      { name: "FAQ", path: "/faq", icon: "help" },
      { name: "Feedback", path: "/feedback", icon: "rate_review" },
      { name: "Settings", path: "/settings", icon: "settings" },
    ],
    []
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-full transition-colors font-body-md text-body-md ${
      isActive
        ? "bg-primary/10 text-primary font-semibold"
        : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
    }`;

  const content = (
    <>
      <div className="px-6 mb-8">
        <h1 className="font-headline-sm text-headline-sm font-bold text-primary">
          HostelConnect
        </h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant opacity-70">
          Student Portal
        </p>
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-3 overflow-y-auto custom-scrollbar">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={linkClass}
            onClick={onClose}
          >
            <Icon name={item.icon} size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pt-4 mt-4 border-t border-outline-variant">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-full text-danger hover:bg-danger/10 transition-colors font-body-md text-body-md"
        >
          <Icon name="logout" size={20} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-sidebar-width flex-col bg-surface-container-low border-r border-outline-variant py-6 z-40">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />
          <aside className="relative w-64 h-full flex flex-col bg-surface-container-low border-r border-outline-variant py-6 z-10">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-on-surface-variant"
            >
              <Icon name="close" />
            </button>
            {content}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;

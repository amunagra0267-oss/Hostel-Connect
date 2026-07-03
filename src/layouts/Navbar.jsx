import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import Icon from "../components/icons/Icon";

const Navbar = ({ onMenuClick = () => {} }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notifications } = useNotification();

  const unread = notifications?.filter((n) => !n.read).length ?? 0;

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const initials = (user?.name ?? "S")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-6 py-4 bg-surface-container-low/95 backdrop-blur border-b border-outline-variant">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-on-surface-variant hover:text-primary"
        >
          <Icon name="menu" />
        </button>
        <div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface hidden sm:block">
            Hostel Student Portal
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {today}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/notifications")}
          className="relative w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
        >
          <Icon name="notifications" size={20} />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md font-bold">
            {initials}
          </div>
          <span className="font-label-md text-label-md text-on-surface hidden sm:block">
            {user?.name}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;

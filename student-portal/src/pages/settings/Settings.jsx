import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Icon from "../../components/icons/Icon";

const Settings = () => {
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();

  const { logout } = useAuth();

  const [language, setLanguage] = useState("English");

  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <PageHeader
        eyebrow="PREFERENCES"
        title="Settings"
        description="Manage your account and preferences"
      />

      {/* Appearance Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <h3 className="text-xl font-bold text-on-surface mb-4">Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-on-surface-variant mb-1">Current Theme</p>
            <p className="text-lg font-semibold text-on-surface capitalize">{theme}</p>
          </div>
          <Button variant="secondary" onClick={toggleTheme}>
            Switch Theme
          </Button>
        </div>
      </div>

      {/* Language Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <h3 className="text-xl font-bold text-on-surface mb-4">Language</h3>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
        >
          <option>English</option>
          <option>Hindi</option>
        </select>
      </div>

      {/* Notifications Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <h3 className="text-xl font-bold text-on-surface mb-4">Notifications</h3>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="w-5 h-5 rounded cursor-pointer"
          />
          <label className="font-body-md text-body-md text-on-surface cursor-pointer">
            Enable Notifications
          </label>
        </div>
      </div>

      {/* Logout Card */}
      <div className="bg-surface border border-red-500/30 rounded-lg p-unit-lg">
        <h3 className="text-xl font-bold text-on-surface mb-4">Account</h3>
        <Button 
          onClick={handleLogout} 
          className="w-full justify-center bg-red-500/20 hover:bg-red-500/30 text-red-500 border border-red-500/50"
        >
          <Icon name="logout" size={18} />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Settings;
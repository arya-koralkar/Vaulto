import React from "react";
import "../styles/SettingsPage.css"; // adjust path if your CSS lives elsewhere
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="settings-page">
      <h2 className="settings-title">Settings</h2>

      <div className="settings-card">
        <div className="setting-item">
          <span>Change Password</span>
          <button onClick={() => navigate("/change-password")}>Edit</button>
        </div>

        <div className="setting-item">
          <span>Notification Preferences</span>
          <button>Edit</button>
        </div>

        <div className="setting-item">
          <span>Theme</span>
          <button onClick={() => navigate("/theme")}>Open</button>
        </div>

        <div className="setting-item logout">
          <span>Logout</span>
          <button style={{ background: "#ff1744" }}>Logout</button>
        </div>
      </div>
    </div>
  );
}

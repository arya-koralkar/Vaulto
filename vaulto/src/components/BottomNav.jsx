// src/components/BottomNav.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Search, Scan } from "lucide-react";
import "../styles/BottomNav.css";

export default function BottomNav({ setIsAddMenuOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Keep tab in sync with route
  const [activeTab, setActiveTab] = useState(() => {
    const p = window.location.pathname;
    if (p.startsWith("/dashboard")) return "Home";
    if (p.startsWith("/search")) return "Search";
    return "Home";
  });

  useEffect(() => {
    // update active tab when route changes
    const p = location.pathname;
    if (p.startsWith("/dashboard") || p === "/") setActiveTab("Home");
    else if (p.startsWith("/search")) setActiveTab("Search");
    else setActiveTab(""); // none
  }, [location.pathname]);

  // Helper to decide where "Home" should go
  const getHomePath = () => {
    // check common storage keys (adjust to your auth storage)
    const signedIn = !!localStorage.getItem("authToken") || !!localStorage.getItem("vaulto_user");
    return signedIn ? "/dashboard" : "/";
  };

  const handleNav = (path, tab) => {
    // If user clicked Home, choose the correct landing
    if (tab === "Home") {
      navigate(getHomePath());
      setActiveTab("Home");
      return;
    }

    // default navigation
    navigate(path);
    setActiveTab(tab);
  };

  return (
    <nav className="navbar">
      {/* Home */}
      <div
        className={`nav-link ${activeTab === "Home" ? "active" : ""}`}
        onClick={() => handleNav("/", "Home")}
        role="button"
        aria-label="Go home"
      >
        <Home size={20} />
        <span>Home</span>
      </div>

      {/* Scan Button (central action) */}
      <div
        className="scan-action-btn"
        onClick={() => {
          if (typeof setIsAddMenuOpen === "function") {
            setIsAddMenuOpen(true);
          } else {
            // fallback: navigate to scan page
            navigate("/scan");
          }
        }}
        role="button"
        aria-label="Open scan"
      >
        <Scan size={22} />
      </div>

      {/* Search */}
      <div
        className={`nav-link ${activeTab === "Search" ? "active" : ""}`}
        onClick={(e) => { e.stopPropagation(); navigate("/search"); setActiveTab("Search"); }}
        role="button"
        aria-label="Search"
      >
        <Search size={20} />
        <span>Search</span>
      </div>
    </nav>
  );
}

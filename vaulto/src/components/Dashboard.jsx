// src/components/Dashboard.jsx
import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import "../App.css";
import "../styles/Dashboard.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home, Search, Scan, Plus, QrCode, Bell, User, Camera, Keyboard, LogOut,
  FileText, HelpCircle, Settings, Gift, ArrowRightLeft, Utensils, ShoppingBag, Car,
  Apple, Smartphone, Plane, SprayCan, Heart, Clapperboard, X,
  Underline
} from "lucide-react";

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("Home");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [greeting, setGreeting] = useState("Good morning");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // listen to a global event to open add-sheet (used by central + button)
  useEffect(() => {
    const handler = (e) => {
      if (e?.detail === "open") setIsAddMenuOpen(true);
    };
    window.addEventListener("vaulto:toggleAdd", handler);
    return () => window.removeEventListener("vaulto:toggleAdd", handler);
  }, []);

  // greeting logic
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // load username
  useEffect(() => {
    const stored = localStorage.getItem("vaulto_username") || "";
    setUsername(stored);
  }, []);

  const getDisplayName = (name) => {
    if (!name) return "User";
    const first = name.trim().split(" ")[0];
    return first.charAt(0).toUpperCase() + first.slice(1);
  };
  const displayName = getDisplayName(username);

  const toggleFaq = (i) => setOpenFaqIndex(openFaqIndex === i ? null : i);

  const handleLogout = () => {
    localStorage.removeItem("vaulto_user");
    localStorage.removeItem("vaulto_username");
    navigate("/");
  };

  // sample data (you already had these)
  const expiringCoupons = [
    { id: 1, brand: "Dominos", offer: "50% OFF", time: "2h left", icon: <Utensils size={18} />, accent: "#ef4444" },
    { id: 2, brand: "H&M", offer: "20% OFF", time: "5h left", icon: <ShoppingBag size={18} />, accent: "#eab308" },
    { id: 3, brand: "Uber", offer: "Free Ride", time: "8h left", icon: <Car size={18} />, accent: "#22c55e" },
  ];

  const myCards = [
    { id: 1, name: "Gold Member", provider: "Starbucks", number: "**** 4582", color: "linear-gradient(135deg, #006241 0%, #1e3c72 100%)" },
    { id: 2, name: "Platinum", provider: "Amazon Pay", number: "**** 9921", color: "linear-gradient(135deg, #232F3E 0%, #FF9900 100%)" },
    { id: 3, name: "Club Card", provider: "Tesco", number: "**** 8832", color: "linear-gradient(135deg, #00539F 0%, #E11C2B 100%)" },
  ];

  const categories = [
    { id: 1, name: "All", icon: <ShoppingBag size={28} /> },
    { id: 2, name: "Groceries", icon: <Apple size={28} /> },
    { id: 3, name: "Dining", icon: <Utensils size={28} /> },
    { id: 4, name: "Electronics", icon: <Smartphone size={28} /> },
    { id: 5, name: "Travel", icon: <Plane size={28} /> },
    { id: 6, name: "Beauty", icon: <SprayCan size={28} /> },
    { id: 7, name: "Health", icon: <Heart size={28} /> },
    { id: 8, name: "Entertainment", icon: <Clapperboard size={28} /> },
  ];

  const faqs = [
    { question: "How does Vaulto help me save?", answer: "We aggregate the best coupons and cashback offers." },
    { question: "Is my data secure?", answer: "Yes, we use bank-grade encryption to protect your personal information." },
    { question: "How do I add a card?", answer: "Tap the central '+' button and choose 'Manual Entry' or 'Scan'." },
    { question: "Where can I use these?", answer: "Coupons can be used both online and in-store via the generated QR codes." },
  ];

  // Portal nodes
  const Overlay = useCallback(() => (
    <div
      className={`overlay ${isProfileMenuOpen || isAddMenuOpen ? "open" : ""}`}
      onClick={() => { setIsProfileMenuOpen(false); setIsAddMenuOpen(false); }}
      aria-hidden="true"
    />
  ), [isProfileMenuOpen, isAddMenuOpen]);

  const ActionSheet = useCallback(() => (
    <div className={`action-sheet ${isAddMenuOpen ? "open" : ""}`} role="dialog" aria-hidden={!isAddMenuOpen}>
      <div style={{ textAlign: "center", marginBottom: 12, color: "white", fontSize: 16, fontWeight: 700 }}>
        Add New Item
      </div>

      <div className="action-option" onClick={() => { setIsAddMenuOpen(false); navigate("/scan"); }}>
        <Camera size={18} color="white" />
        <span className="scan-text">Scan QR Code</span>
      </div>

      <div className="action-option" onClick={() => { setIsAddMenuOpen(false); navigate("/manual-entry"); }}>
        <Keyboard size={18} color="white" />
        <span className="scan-text">Enter Code Manually</span>
      </div>

      <div style={{ marginTop: 12, textAlign: "center" }}>
        <button
          className="sheet-close-btn"
          onClick={() => setIsAddMenuOpen(false)}
          aria-label="Close add menu"
        >
          Close
        </button>
      </div>
    </div>
  ), [isAddMenuOpen, navigate]);

  // keyboard navigation helper for category click
  const handleCategoryAction = (catName) => {
    setActiveCategory(catName);
    navigate(`/all-coupons?category=${encodeURIComponent(catName)}`);
  };

  // Show portals only in the browser
  const canUseDOM = typeof document !== "undefined" && !!document.body;

  return (
    <>
      {canUseDOM && createPortal(<Overlay />, document.body)}
      {canUseDOM && createPortal(<ActionSheet />, document.body)}

      <div className="app-container dashboard-page">
        {/* Sidebar */}
        <div className={`profile-sidebar ${isProfileMenuOpen ? "open" : ""}`}>
          <div className="menu-header" style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div className="avatar" style={{ width: 48, height: 48 }}>
              <User size={24} color="white" />
            </div>

           <div>
  <div className="name">{displayName}</div>

  <div
    className="view"
    onClick={() => navigate("/profile")}
    style={{ cursor: "pointer" }}
  >
    View Profile
  </div>
            </div>
          </div>

          <NavLink 
  to="/notifications" 
  className="menu-item"
>
  <Bell size={18} /> Notifications
</NavLink>
          <div className="menu-item" onClick={() => navigate("/settings")}>
        <Settings size={18} />
        <span>Settings</span>
      </div>
          <div className="menu-item" onClick={() => navigate("/legal")}>
  <span>Legal</span>
</div>

          <NavLink to="/support" className="menu-item">Support</NavLink>

          <div style={{ marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 18 }}>
            <div className="menu-item" style={{ color: "#ef4444" }} onClick={handleLogout}><LogOut size={18} /> Log Out</div>
          </div>
        </div>

        {/* Header */}
        <header className="header">
          <div className="profile-row" onClick={() => setIsProfileMenuOpen(true)} role="button" tabIndex={0}>
            <div className="avatar"><User size={22} color="white" /></div>
            <div className="greetings">
              <span className="brand-name">VAULTO</span>
              <h1>{greeting}, {displayName}</h1>
              <p>Ready to save today?</p>
            </div>
          </div>

          <div
            className="icon-btn"
            onClick={() => window.dispatchEvent(new CustomEvent('vaulto:toggleAdd', { detail: 'open' }))}
            style={{ cursor: "pointer" }}
            role="button"
            aria-label="Open add menu"
            tabIndex={0}
          >
            <Plus size={22} color="white" />
          </div>
        </header>

        {/* Main */}
        <main className="main-content">
          {/* My Coupons */}
          <section>
            <div className="section-header">
              <span className="section">My Coupons</span>
            </div>

            <div className="coupon-scroll no-scroll" role="list">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  role="listitem"
                  className={`coupon-card ${activeCategory === cat.name ? "active" : ""}`}
                  onClick={() => handleCategoryAction(cat.name)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleCategoryAction(cat.name);
                  }}
                  aria-pressed={activeCategory === cat.name}
                >
                  <div className="coupon-icon-box" aria-hidden="true">{cat.icon}</div>
                  <span className="coupon-name">{cat.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Expiring Soon */}
          <section>
            <div className="section-header"><span className="section-title">Expiring Soon</span></div>
            <div className="expiring-scroll no-scroll">
              {expiringCoupons.map((c) => (
                <div key={c.id} className="expiring-card">
                  <div className="expiring-top">
                    <div className="brand-icon-box">{c.icon}</div>
                    <div className="time-badge">{c.time}</div>
                  </div>
                  <div>
                    <div className="offer-text">{c.offer}</div>
                    <div className="brand-name-text">{c.brand}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cards */}
          <section>
            <div className="section-header">
              <span className="section-title">My Cards</span>
              <div className="add-btn" onClick={() => setIsAddMenuOpen(true)}>+ Add</div>
            </div>

            <div className="wallet-scroll no-scroll">
              {myCards.map((card) => (
                <div key={card.id} className="card-item" style={{ background: card.color }}>
                  <div className="card-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="card-chip" />
                    <QrCode size={20} color="rgba(255,255,255,0.9)" />
                  </div>
                  <div className="card-details">
                    <h3>{card.provider}</h3>
                    <p>{card.name}</p>
                  </div>
                  <div className="card-number">{card.number}</div>
                </div>
              ))}

              <div className="add-placeholder" onClick={() => setIsAddMenuOpen(true)} role="button" tabIndex={0}>
                <Plus size={22} />
              </div>
            </div>
          </section>

          {/* Community */}
          <section>
            <div className="section-header"><span className="section-title">Community & Trade</span></div>
            <div className="social-grid">
              <div className="social-card">
                <div className="social-icon gift"><Gift size={18} /></div>
                <div className="social-text"><h3>Gift a Friend</h3><p>Send coupons easily</p></div>
              </div>

              <div className="social-card">
                <div className="social-icon trade"><ArrowRightLeft size={18} /></div>
                <div className="social-text"><h3>Trade Coupons</h3><p>Swap unused deals</p></div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="faq-container">
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Help & Support</h2>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <div className="faq-question" onClick={() => toggleFaq(i)} role="button" tabIndex={0}>
                  {faq.question}
                  {openFaqIndex === i ? <X size={16} /> : <Plus size={16} />}
                </div>

                {openFaqIndex === i && (
                  <div className="faq-answer">{faq.answer}</div>
                )}
              </div>
            ))}
          </section>
        </main>

        {/* Navbar */}
        <nav className="navbar">
          <div className={`nav-link ${activeTab === "Home" ? "active" : ""}`} onClick={() => setActiveTab("Home")}>
            <Home size={20} />
            <span>Home</span>
          </div>

          <div
            className="scan-action-btn"
            onClick={() => window.dispatchEvent(new CustomEvent('vaulto:toggleAdd', { detail: 'open' }))}
            role="button"
            aria-label="Open add"
            tabIndex={0}
          >
            <Scan size={22} />
          </div>

          <div className={`nav-link ${activeTab === "Search" ? "active" : ""}`} onClick={() => setActiveTab("Search")}>
            <Search size={20} />
            <span>Search</span>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Dashboard;

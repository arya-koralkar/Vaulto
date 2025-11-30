import React, { useState } from "react";
import "../styles/ViewProfile.css";
import {
  User,
  Settings,
  LogOut,
  MapPin,
  Calendar,
  ChevronRight,
  Home,
  Scan,
  Search,
  Phone,
  Mail,
  CreditCard,
  Ticket,
  HelpCircle,
  Share2,
  AtSign,
  X
} from "lucide-react";

export default function ViewProfile() {
  const [activeTab, setActiveTab] = useState("profile");

  // Profile Data State
  const [profile, setProfile] = useState({
    username: "@aryakoralkar",
    phone: "+91 98765 43210",
    email: "arya@example.com",
    gender: "Female",
    dob: "1995-09-14",
    location: "Mumbai, India"
  });

  const [editingItem, setEditingItem] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const openEditModal = (key, label, type = "text") => {
    setEditingItem({ key, label, type });
    setTempValue(profile[key] ?? "");
  };

  const saveEdit = () => {
    if (!editingItem) return;
    if (editingItem.type === "tel" && tempValue.trim().length < 6) {
      alert("Please enter a valid phone number.");
      return;
    }
    if (editingItem.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(tempValue)) {
      alert("Please enter a valid email address.");
      return;
    }
    setProfile((prev) => ({ ...prev, [editingItem.key]: tempValue }));
    setEditingItem(null);
  };

  const displayDob = (dob) => {
    try {
      const d = new Date(dob);
      if (!isNaN(d)) return d.toLocaleDateString();
    } catch (e) {}
    return dob;
  };

  return (
    <div className="view-profile-root" aria-live="polite">
      <header className="profile-header">
        <div className="avatar-wrapper">
          <div className="avatar-circle" aria-hidden>
            A
          </div>
          <div className="status-dot" aria-hidden></div>
        </div>
        <h1 className="user-name">Arya Koralkar</h1>
        <p className="user-handle">{profile.username}</p>
      </header>

      <main className="content-scroll" id="main-content">
        <div className="profile-stack">
          {/* PERSONAL INFO */}
          <section aria-labelledby="personal-info" className="section">
            <h2 id="personal-info" className="section-label">Personal Info</h2>
            <div className="menu-group">
              <button className="menu-item" onClick={() => openEditModal("username", "Username")} aria-label="Edit username">
                <div className="icon-box at"><AtSign /></div>
                <div className="item-text">
                  <span className="item-title">Username</span>
                  <span className="item-sub">{profile.username}</span>
                </div>
                <ChevronRight size={18} className="chevron" />
              </button>

              <button className="menu-item" onClick={() => openEditModal("phone", "Phone Number", "tel")} aria-label="Edit phone">
                <div className="icon-box phone"><Phone /></div>
                <div className="item-text">
                  <span className="item-title">Phone</span>
                  <span className="item-sub">{profile.phone}</span>
                </div>
                <ChevronRight size={18} className="chevron" />
              </button>

              <button className="menu-item" onClick={() => openEditModal("email", "Email Address", "email")} aria-label="Edit email">
                <div className="icon-box mail"><Mail /></div>
                <div className="item-text">
                  <span className="item-title">Email</span>
                  <span className="item-sub">{profile.email}</span>
                </div>
                <ChevronRight size={18} className="chevron" />
              </button>

              <button className="menu-item" onClick={() => openEditModal("gender", "Gender")} aria-label="Edit gender">
                <div className="icon-box user"><User /></div>
                <div className="item-text">
                  <span className="item-title">Gender</span>
                  <span className="item-sub">{profile.gender}</span>
                </div>
                <ChevronRight size={18} className="chevron" />
              </button>

              <button className="menu-item" onClick={() => openEditModal("dob", "Date of Birth", "date")} aria-label="Edit dob">
                <div className="icon-box dob"><Calendar /></div>
                <div className="item-text">
                  <span className="item-title">Date of Birth</span>
                  <span className="item-sub">{displayDob(profile.dob)}</span>
                </div>
                <ChevronRight size={18} className="chevron" />
              </button>

              <button className="menu-item" onClick={() => openEditModal("location", "Location")} aria-label="Edit location">
                <div className="icon-box loc"><MapPin /></div>
                <div className="item-text">
                  <span className="item-title">Location</span>
                  <span className="item-sub">{profile.location}</span>
                </div>
                <ChevronRight size={18} className="chevron" />
              </button>
            </div>
          </section>

          {/* FINANCE & ACTIVITY */}
          <section aria-labelledby="finance" className="section">
            <h2 id="finance" className="section-label">Finance & Activity</h2>
            <div className="menu-group">
              <div className="menu-item">
                <div className="icon-box wallet"><CreditCard /></div>
                <div className="item-text">
                  <span className="item-title">My Wallet</span>
                  <span className="item-sub">Manage saved cards</span>
                </div>
                <ChevronRight size={18} className="chevron" />
              </div>

              <div className="menu-item">
                <div className="icon-box coupon"><Ticket /></div>
                <div className="item-text">
                  <span className="item-title">My Coupons</span>
                  <span className="item-sub">View active rewards</span>
                </div>
                <ChevronRight size={18} className="chevron" />
              </div>
            </div>
          </section>

          {/* APP SETTINGS */}
          <section aria-labelledby="settings" className="section">
            <h2 id="settings" className="section-label">App Settings</h2>
            <div className="menu-group">
              <div className="menu-item">
                <div className="icon-box gen"><Settings /></div>
                <div className="item-text">
                  <span className="item-title">General Settings</span>
                  <span className="item-sub">Preferences & Security</span>
                </div>
                <ChevronRight size={18} className="chevron" />
              </div>

              <div className="menu-item">
                <div className="icon-box share"><Share2 /></div>
                <div className="item-text">
                  <span className="item-title">Invite Friends</span>
                  <span className="item-sub">Get referral rewards</span>
                </div>
                <ChevronRight size={18} className="chevron" />
              </div>

              <div className="menu-item">
                <div className="icon-box help"><HelpCircle /></div>
                <div className="item-text">
                  <span className="item-title">Help & Support</span>
                  <span className="item-sub">FAQs, Contact Us</span>
                </div>
                <ChevronRight size={18} className="chevron" />
              </div>
            </div>
          </section>

          <div className="logout-container">
            <button className="logout-btn" onClick={() => alert("Logged out (demo)")}>
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
            <p className="version-text">Vaulto App v2.4.2</p>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      {editingItem && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={() => setEditingItem(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 id="modal-title" className="modal-title">Edit {editingItem.label}</h3>
              <button className="close-btn" onClick={() => setEditingItem(null)} aria-label="Close"><X /></button>
            </div>
            <div className="input-group">
              <input type={editingItem.type} className="modal-input" value={tempValue} onChange={(e) => setTempValue(e.target.value)} autoFocus />
            </div>
            <button className="save-btn" onClick={saveEdit}>Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
} 

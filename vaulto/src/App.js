// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { createPortal } from 'react-dom';
import SignupLanding from "./components/SignupLanding";
import EmailPage from "./components/EmailPage";
import PasswordPage from "./components/PasswordPage";
import { SignupProvider } from "./context/SignupContext";
import SignupDOB from "./components/SignupDOB";
import SignupGender from "./components/SignupGender";
import SignupUsername from "./components/SignupUsername";
import PhoneLogin from "./components/PhoneLogin";
import PhoneOTP from "./components/PhoneOTP";
import Dashboard from "./components/Dashboard";
import ScanCoupon from "./components/ScanCoupon";
import CameraScanner from "./components/CameraScanner.jsx";
import UploadScanner from "./components/UploadScanner";
import SearchPage from "./components/SearchPage";
import AddCoupon from "./components/AddCoupon";
import BottomNav from "./components/BottomNav";
import AllCoupons from "./components/AllCoupons";
import ViewProfile from "./components/ViewProfile";
import LegalPage from "./components/LegalPage";
import ExpiringSoon from './components/ExpiringSoon.jsx'; 
import ManualEntry from './components/ManualEntry.jsx';

import "./App.css";

function AppContent() {
  const location = useLocation();

  const hideBottomNavOn = [
    "/", "/email", "/password", "/signup/dob", "/signup/gender",
    "/signup/username", "/login/phone", "/login/phone-otp"
  ];

  const shouldShowBottomNav = !hideBottomNavOn.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<SignupLanding />} />
        <Route path="/email" element={<EmailPage />} />
        <Route path="/password" element={<PasswordPage />} />
        <Route path="/signup/dob" element={<SignupDOB />} />
        <Route path="/signup/gender" element={<SignupGender />} />
        <Route path="/signup/username" element={<SignupUsername />} />
        <Route path="/login/phone" element={<PhoneLogin />} />
        <Route path="/login/phone-otp" element={<PhoneOTP />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scan" element={<ScanCoupon />} />
        <Route path="/scan/camera" element={<CameraScanner />} />
        <Route path="/scan/upload" element={<UploadScanner />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/add-coupon" element={<AddCoupon />} />
        <Route path="/all-coupons" element={<AllCoupons />} />
        <Route path="/profile" element={<ViewProfile />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/manual-entry" element={<ManualEntry />} />
        <Route path="/expiring-soon" element={<ExpiringSoon />} />
        {/* add any other routes here */}
      </Routes>

      {shouldShowBottomNav && <BottomNav />}
    </>
  );
}

export default function App() {

  const [isAddMenuOpenGlobal, setIsAddMenuOpenGlobal] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e?.detail === "open") setIsAddMenuOpenGlobal(true);
      else if (e?.detail === "close") setIsAddMenuOpenGlobal(false);
      else setIsAddMenuOpenGlobal(v => !v);
    };
    window.addEventListener("vaulto:toggleAdd", handler);
    return () => window.removeEventListener("vaulto:toggleAdd", handler);
  }, []);

  return (
    <SignupProvider>

      {/* ✅ PORTALS MUST BE HERE — OUTSIDE Router */}
      {createPortal(
        <div
          className={`overlay ${isAddMenuOpenGlobal ? "open" : ""}`}
          onClick={() => setIsAddMenuOpenGlobal(false)}
        />,
        document.body
      )}

      {createPortal(
        <div className={`action-sheet ${isAddMenuOpenGlobal ? "open" : ""}`}>
          <div style={{ textAlign:'center', marginBottom:12, color:'white', fontSize:16, fontWeight:700 }}>
            Add New Item
          </div>

          <div className="action-option" onClick={() => {
            setIsAddMenuOpenGlobal(false);
            window.history.pushState({}, '', '/scan');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}>
            <span>Scan QR Code</span>
          </div>

          <div className="action-option" onClick={() => {
            setIsAddMenuOpenGlobal(false);
            window.history.pushState({}, '', '/manual-entry');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}>
            <span>Enter Code Manually</span>
          </div>
        </div>,
        document.body
      )}

      {/* Router comes AFTER portals and wraps the whole app content */}
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>

    </SignupProvider>
  );
}

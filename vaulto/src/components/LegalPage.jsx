import React, { useState, useRef, useLayoutEffect } from "react";
import {
  Scale,
  Shield,
  Cookie,
  AlertTriangle,
  Mail,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import "../styles/LegalPage.css"; // keep exactly this path

const ITEMS = [
  {
    id: 1,
    title: "Terms of Service",
    icon: <Scale size={18} />,
    content: `Welcome to Vaulto (the "Service"). By using the Service you agree to these Terms.
You must be at least 13 years old to use the Service. Do not use the Service for any unlawful purpose.
We may suspend or terminate accounts that violate these Terms. Continued use after updates means you accept them.`,
  },
  {
    id: 2,
    title: "Privacy Policy",
    icon: <Shield size={18} />,
    content: `We collect data necessary to provide and improve the Service — this may include account information,
usage data, and device identifiers. We do not sell your personal information. You can request data export or deletion.`,
  },
  {
    id: 3,
    title: "Cookies",
    icon: <Cookie size={18} />,
    content: `We use cookies and similar technologies for login sessions, preferences, and analytics.
You can control cookies via browser settings, though disabling them may affect functionality.`,
  },
  {
    id: 4,
    title: "Disclaimer",
    icon: <AlertTriangle size={18} />,
    content: `The Service is provided "as-is" without warranties. We are not liable for indirect, incidental, or consequential damages.
Use of the Service is at your own risk.`,
  },
];

export default function LegalPage() {
  const [openId, setOpenId] = useState(null);
  const contentRefs = useRef({});

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  // Smooth height animation
  useLayoutEffect(() => {
    ITEMS.forEach((it) => {
      const el = contentRefs.current[it.id];
      if (!el) return;
      el.style.maxHeight = openId === it.id ? `${el.scrollHeight}px` : "0px";
    });
  }, [openId]);

  return (
    <div className="legal-wrap">
      <div className="legal-center">
        
        <header className="legal-top">
          <h1>Legal & Policies</h1>
          <p className="muted">Terms, Privacy & User Rights</p>
        </header>

        <div className="accordion">
          {ITEMS.map((it) => {
            const isOpen = openId === it.id;
            return (
              <div className="card" key={it.id}>
                <button
                  className={`card-btn ${isOpen ? "active" : ""}`}
                  onClick={() => toggle(it.id)}
                  aria-expanded={isOpen}
                >
                  <span className="icon-box">{it.icon}</span>
                  <span className="title">{it.title}</span>
                  <span className="chev">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>

                <div
                  className="card-panel"
                  ref={(el) => (contentRefs.current[it.id] = el)}
                >
                  <div className="card-panel-inner">
                    {it.content.split("\n").map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="contact-row">
          <button
            className="contact-btn"
            onClick={() =>
              (window.location.href = "mailto:legal@vaulto.com")
            }
          >
            <Mail size={16} /> <span>Contact Legal Team</span>
          </button>
        </div>
      </div>
    </div>
  );
}

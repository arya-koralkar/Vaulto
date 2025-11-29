import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/SupportPage.css";

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Opens default mail client as a simple ticket mechanism
  const openMailClient = (e) => {
    e.preventDefault();
    const to = "support@example.com";
    const mailSubject = encodeURIComponent(subject || "Support request");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${to}?subject=${mailSubject}&body=${body}`;
  };

  return (
    <div className="support-page">
      <div className="support-container">
        <h1 className="support-title">Support</h1>

        <div className="support-grid">
          <div className="support-card">
            <h2>Contact Support</h2>
            <p className="muted">
              Have an issue or a question? Fill the form below and we’ll get
              back to you. For urgent matters, email{" "}
              <a href="mailto:support@example.com">support@example.com</a>.
            </p>

            <form className="support-form" onSubmit={openMailClient}>
              <label>
                Your name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </label>

              <label>
                Your email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                />
              </label>

              <label>
                Subject
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Short summary"
                />
              </label>

              <label>
                Message
                <textarea
                  rows="6"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe the issue and any steps to reproduce..."
                  required
                />
              </label>

              <div className="form-actions">
                <button className="btn" type="submit">Open in mail app</button>
                <NavLink to="/legal" className="link-btn">Privacy & Terms</NavLink>
              </div>
            </form>
          </div>

          <div className="support-card faq">
            <h2>FAQ & Troubleshooting</h2>

            <details>
              <summary>App won't open / crashes</summary>
              <p className="muted">Try updating the app, clearing cache or reinstalling. If problem persists, share logs and device details via the form above.</p>
            </details>

            <details>
              <summary>Can't scan QR / camera not accessible</summary>
              <p className="muted">Make sure the app has camera permissions and no other app is using the camera. Try the Upload option as a fallback.</p>
            </details>

            <details>
              <summary>Payment / coupons not applying</summary>
              <p className="muted">Check coupon expiry and store terms. If the issue persists, send a screenshot and exact steps in your message.</p>
            </details>

            <div className="support-info">
              <div><strong>Support email</strong><div className="muted">support@example.com</div></div>
              <div style={{marginTop:12}}>
                <strong>Phone (optional)</strong>
                <div className="muted">+1 (555) 555-5555</div>
              </div>
            </div>

            <div className="support-note muted">
              For privacy or data deletion requests, see <NavLink to="/legal">Legal & Policies</NavLink>.
            </div>
          </div>
        </div>

        <div className="footnote muted" style={{marginTop:18, textAlign:"right"}}>
          Last updated: November 30, 2025
        </div>
      </div>
    </div>
  );
}

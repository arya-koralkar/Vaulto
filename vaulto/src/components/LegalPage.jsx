import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/LegalPage.css";

export default function LegalPage() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1 className="legal-title">Legal & Policies</h1>

        <nav className="legal-toc">
          <a href="#terms">Terms of Service</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#cookies">Cookies</a>
          <a href="#disclaimer">Disclaimer</a>
          <a href="#contact">Contact</a>
        </nav>

        <section id="terms" className="legal-section">
          <h2>Terms of Service</h2>
          <p>
            Welcome to Vaulto (the “Service”). By using the Service you agree to these Terms.
            You must be at least 13 years old to use the Service. Do not use the Service for any unlawful purpose.
            We may suspend or terminate accounts that violate these Terms.
          </p>
          <p>
            We may update these Terms from time to time; continued use after updates means you accept them.
          </p>
        </section>

        <section id="privacy" className="legal-section">
          <h2>Privacy Policy</h2>
          <p>
            We collect data necessary to provide and improve the Service — this may include account information,
            usage data, and device identifiers. We do not sell your personal information.
            We use industry standard measures to protect your data but cannot guarantee absolute security.
          </p>
          <p>
            For details on data retention, third-party services, or data deletion requests, contact us (see below).
          </p>
        </section>

        <section id="cookies" className="legal-section">
          <h2>Cookies</h2>
          <p>
            We use cookies and similar technologies to operate the Service, remember preferences and analyze usage.
            You can control cookies through browser settings, though disabling them may affect functionality.
          </p>
        </section>

        <section id="disclaimer" className="legal-section">
          <h2>Disclaimer</h2>
          <p>
            The Service is provided “as-is” without warranties of any kind. We are not liable for indirect,
            special, incidental or consequential damages. Your use of the Service is at your own risk.
          </p>
        </section>

        <section id="contact" className="legal-section">
          <h2>Contact</h2>
          <p>
            Questions or requests (data deletion, privacy inquiries, etc.) — email us at
            <a className="email-link" href="mailto:legal@example.com"> legal@example.com</a>.
          </p>
        </section>

        <div className="legal-actions">
          <NavLink to="/" className="btn">Back to Home</NavLink>
        </div>

        <div className="legal-footnote">
          <small>Last updated: November 30, 2025</small>
        </div>
      </div>
    </div>
  );
}

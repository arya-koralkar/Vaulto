import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Signup.css";

export default function SignupUsername() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { email, password, dob, gender } = location.state || {};

  const handleCreate = () => {
    if (!username) {
      alert("Please enter a username");
      return;
    }

    // Here you will call your backend API later
    console.log("Final Signup Data:", {
      email,
      password,
      dob,
      gender,
      username
    });

    console.log("Account created successfully!");
    navigate("/dashboard");
  };

  return (
<div className="screen">
      <h2 className="heading">Create account</h2>

      <label className="title" htmlFor="username">
        What should we call you?
      </label>

      <input
        id="username"
        type="text"
        className="input-field"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <p className="subtext">This is how your name will appear in Vaulto.</p>

      <button className="create-btn" onClick={handleCreate}>
        Create account
      </button>

      <div className="terms-box">
        <p>
          To understand how Vaulto collects, uses, and protects your personal
          information, please review our <a href="#">Privacy Policy</a>.
        </p>
        <p>
          By tapping on <strong>Create account</strong>, you agree to Vaulto&apos;s{" "}
          <a href="#">Terms of Use</a>.
        </p>
      </div>
    </div>

  );
}

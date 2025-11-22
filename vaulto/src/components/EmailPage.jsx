// src/components/EmailPage.jsx
import { useContext } from "react";
import { SignupContext } from "../context/SignupContext";
import { useNavigate } from "react-router-dom";

export default function EmailPage() {
  const { email, setEmail } = useContext(SignupContext);
  const navigate = useNavigate();

  const handleNext = () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    navigate("/password");
  };

  return (
    <>

      <div className="page-container">
        <h1>Enter your email</h1>

        <input
          type="email"
          placeholder="Email address"
          className="input-box"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p style={{ color: "#b3b3b3", marginTop: "10px" }}>
          You’ll need to verify this email later.
        </p>

        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>
    </>
  );
}

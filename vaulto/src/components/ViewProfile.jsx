import React from "react";
import "../styles/ViewProfile.css";

export default function ViewProfile() {

  // later you can replace static data with user data from backend
  const user = {
    name: "Arya Koralkar",
    email: "arya@example.com",
    role: "Admin",
    joined: "12 July 2024",
  };

  return (
    <div className="profile-page">
      <h2 className="profile-title">My Profile</h2>

      <div className="profile-card">
        <div className="avatar-circle">
          {user.name.charAt(0)}
        </div>

        <h3 className="profile-name">{user.name}</h3>

        <div className="profile-info">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Joined:</strong> {user.joined}</p>
        </div>

        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
  );
}

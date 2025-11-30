import React, { useState } from "react";
import "../styles/AllCoupons.css";

export default function AllCoupons() {
  const categories = [
    "All",
    "Dining",
    "Groceries",
    "Electronics",
    "Clothing",
    "Movies",
    "Entertainment",
    "Travel"
  ];

  const [activeFilter, setActiveFilter] = useState("All");

  const handleFilterClick = (category) => {
    setActiveFilter(category);

    // Bubble filtered value to parent (optional)
    // props.onFilterChange(category);
  };

  return (
    <div className="ac-shell">

      <div className="ac-container">

        <h1 className="ac-title">All Coupons</h1>
        <p className="ac-sub">Filter coupons by category</p>

        <div className="ac-filter-box">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`ac-filter-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => handleFilterClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}

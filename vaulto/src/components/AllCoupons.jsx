// src/pages/AllCoupons.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function AllCoupons() {
  const query = useQuery();
  const navigate = useNavigate();
  const selectedCategory = query.get("category") || "All";

  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace this with your actual API call. Example:
    // fetch(`/api/coupons?category=${encodeURIComponent(selectedCategory)}`)
    //   .then(r => r.json()).then(setCoupons).finally(() => setLoading(false));

    // Mock data for now
    const mock = [
      { id: 1, title: "50% off Dominos", category: "Dining" },
      { id: 2, title: "20% off Groceries", category: "Groceries" },
      { id: 3, title: "10% off Electronics", category: "Electronics" },
      { id: 4, title: "Buy 1 Get 1 - Movies", category: "Entertainment" },
    ];

    // simulate filter
    const filtered = selectedCategory === "All"
      ? mock
      : mock.filter(c => c.category === selectedCategory);

    setTimeout(() => {
      setCoupons(filtered);
      setLoading(false);
    }, 300);
  }, [selectedCategory]);

  return (
    <div className="all-coupons-page" style={{ padding: 20 }}>
      <h2>All Coupons — {selectedCategory}</h2>

      {loading ? (
        <p>Loading…</p>
      ) : coupons.length === 0 ? (
        <p>No coupons found for this category.</p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {coupons.map(c => (
            <div key={c.id} className="coupon-card" style={{
              padding: 12, borderRadius: 10, background: "var(--card, #0b1220)"
            }}>
              <h3 style={{ margin: 0 }}>{c.title}</h3>
              <small style={{ opacity: .7 }}>{c.category}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

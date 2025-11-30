// src/components/ExpiringSoon.jsx
import React, { useEffect, useState, useRef } from "react";
import "../styles/ExpiringSoon.css";

/*
  Example usage:
  <ExpiringSoon />
  
  Notes:
  - Notifications depend on browser permission (will prompt).
  - Scheduled in-session notifications use setTimeout and will be cleared when the page unloads.
  - Replace `sampleCoupons` with your API data and persist user notify-preferences as needed.
*/

const sampleCoupons = [
  { id: 1, title: "50% off Dominos", category: "Dining", expiry: "2025-12-03T12:00:00Z" },
  { id: 2, title: "20% off Groceries", category: "Groceries", expiry: "2025-11-30T23:59:59Z" },
  { id: 3, title: "10% off Electronics", category: "Electronics", expiry: "2025-12-08T08:00:00Z" },
  { id: 4, title: "Buy 1 Get 1 - Movies", category: "Entertainment", expiry: "2025-11-28T09:00:00Z" },
];

function daysBetween(now, then) {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.ceil((then - now) / msPerDay);
}

function formatDateISO(iso) {
  const d = new Date(iso);
  return d.toLocaleString();
}

export default function ExpiringSoon() {
  // threshold to mark "expiring soon" (days)
  const SOON_DAYS = 5;

  const [coupons, setCoupons] = useState([]);
  const [notifyPrefs, setNotifyPrefs] = useState({}); // id -> boolean
  const [alerts, setAlerts] = useState([]); // in-app immediate alerts
  const timersRef = useRef({}); // store active timeouts to clear on unmount

  useEffect(() => {
    // In real app replace with fetch(...) for server data
    setCoupons(sampleCoupons.map(c => ({ ...c, expiryDate: new Date(c.expiry) })));
  }, []);

  // Request Notification permission once user opens page
  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  // On coupons load or notifyPrefs change, schedule notifications for those opted-in
  useEffect(() => {
    // clear previous timers
    Object.values(timersRef.current).forEach(id => clearTimeout(id));
    timersRef.current = {};

    const now = new Date();

    coupons.forEach(c => {
      const id = c.id;
      const pref = notifyPrefs[id];

      if (!pref) return; // user not opted in

      const diffMs = c.expiryDate - now;
      if (diffMs <= 0) {
        // already expired
        pushAlert(`Coupon "${c.title}" already expired.`);
        // show immediate notification
        triggerNotification(`Expired: ${c.title}`, `Coupon expired on ${formatDateISO(c.expiry)}`);
      } else {
        const daysLeft = daysBetween(now, c.expiryDate);
        // If within SOON_DAYS, notify immediately and optionally schedule final expiry notify
        if (daysLeft <= SOON_DAYS) {
          pushAlert(`"${c.title}" expires in ${daysLeft} day(s).`);
          triggerNotification(`${c.title} expiring soon`, `Expires in ${daysLeft} day(s) — ${formatDateISO(c.expiry)}`);
        }
        // Schedule notification at expiry time (only works in-session)
        const timer = setTimeout(() => {
          pushAlert(`"${c.title}" has expired.`);
          triggerNotification(`Expired: ${c.title}`, `Coupon expired.`);
        }, diffMs);
        timersRef.current[id] = timer;
      }
    });

    // cleanup on dependency change
    return () => {
      Object.values(timersRef.current).forEach(id => clearTimeout(id));
      timersRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coupons, notifyPrefs]);

  useEffect(() => {
    // cleanup on unmount
    return () => {
      Object.values(timersRef.current).forEach(id => clearTimeout(id));
      timersRef.current = {};
    };
  }, []);

  function pushAlert(message) {
    setAlerts(prev => [message, ...prev].slice(0, 5)); // keep last 5 alerts
    // optionally auto-dismiss alerts after some time
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a !== message));
    }, 8_000);
  }

  function triggerNotification(title, body) {
    if (!("Notification" in window)) {
      // fallback: push in-app alert
      pushAlert(`${title} — ${body}`);
      return;
    }
    if (Notification.permission === "granted") {
      try {
        new Notification(title, { body });
      } catch (e) {
        pushAlert(`${title} — ${body}`);
      }
    } else {
      // not granted -> push in-app
      pushAlert(`${title} — ${body}`);
    }
  }

  function toggleNotify(id) {
    setNotifyPrefs(prev => {
      const next = { ...prev, [id]: !prev[id] };
      return next;
    });
  }

  function markAsSeen(id) {
    // simple UI operation - you can persist in backend
    setAlerts(prev => prev.filter(a => !a.includes(`"${coupons.find(c => c.id === id)?.title}"`)));
  }

  // render helper: compute days left and status
  function getStatus(c) {
    const now = new Date();
    const diff = c.expiryDate - now;
    if (diff <= 0) return { label: "Expired", danger: true, days: 0 };
    const d = daysBetween(now, c.expiryDate);
    if (d <= SOON_DAYS) return { label: `Expires in ${d}d`, danger: true, days: d };
    return { label: `Expires in ${d}d`, danger: false, days: d };
  }

  return (
    <div className="es-shell">
      <div className="es-container">
        <header className="es-header">
          <h1>Expiring Soon</h1>
          <p>Coupons that are approaching their expiry. Turn on notifications to be reminded.</p>
        </header>

        <div className="es-alerts">
          {alerts.map((a, i) => (
            <div key={i} className="es-alert">
              {a}
            </div>
          ))}
        </div>

        <main className="es-main">
          {coupons.length === 0 ? (
            <div className="es-empty">No coupons available.</div>
          ) : (
            <div className="es-list">
              {coupons.map(c => {
                const status = getStatus(c);
                const isSoon = status.days <= SOON_DAYS && status.days > 0;
                return (
                  <article key={c.id} className={`es-card ${status.danger ? "danger" : ""}`}>
                    <div className="es-left">
                      <div className="es-title">{c.title}</div>
                      <div className="es-meta">
                        <span className="es-cat">{c.category}</span>
                        <span className="es-exp">Expires: {formatDateISO(c.expiry)}</span>
                      </div>
                    </div>

                    <div className="es-right">
                      <div className={`es-status ${isSoon ? "soon" : ""}`}>{status.label}</div>
                      <div className="es-actions">
                        <label className="es-toggle">
                          <input
                            type="checkbox"
                            checked={!!notifyPrefs[c.id]}
                            onChange={() => toggleNotify(c.id)}
                          />
                          <span>Notify me</span>
                        </label>
                        <button className="es-btn" onClick={() => { pushAlert(`Saved coupon "${c.title}" for later.`); }}>
                          Save
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

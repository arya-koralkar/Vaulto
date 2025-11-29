import React, { useState, useMemo } from 'react';
import '../styles/NotificationPage.css';
import { Bell, X, Check } from "lucide-react";

export default function NotificationsPage() {
  // sample notifications data — replace with API data when ready
  const initial = [
    {
      id: 1,
      title: 'Low stock alert',
      body: 'Product "Blue Hoodie" is below reorder level (qty: 3).',
      time: '2 hours ago',
      unread: true,
      type: 'alert'
    },
    {
      id: 2,
      title: 'New user signup',
      body: 'Priya Singh created an account.',
      time: '8 hours ago',
      unread: true,
      type: 'info'
    },
    {
      id: 3,
      title: 'Monthly report ready',
      body: 'Your inventory report for Nov 2025 is ready to download.',
      time: '1 day ago',
      unread: false,
      type: 'report'
    }
  ];

  const [notifications, setNotifications] = useState(initial);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const unreadCount = useMemo(() => notifications.filter(n => n.unread).length, [notifications]);

  function markAsRead(id) {
    setNotifications(curr => curr.map(n => n.id === id ? { ...n, unread: false } : n));
  }

  function markAllRead() {
    setNotifications(curr => curr.map(n => ({ ...n, unread: false })));
  }

  function clearAll() {
    setNotifications([]);
  }

  function toggleUnreadFilter() {
    setShowUnreadOnly(v => !v);
  }

  const visible = showUnreadOnly ? notifications.filter(n => n.unread) : notifications;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-r from-start to-end p-3 text-white shadow-lg">
            <Bell style={{width: 20, height: 20}} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Notifications</h1>
            <p className="text-sm text-muted">You have <span className="font-medium">{unreadCount}</span> unread notifications</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleUnreadFilter} className={`px-3 py-2 rounded-md border ${showUnreadOnly ? 'bg-accent text-white' : 'bg-white/5 text-muted'}`}>
            {showUnreadOnly ? 'Showing: Unread' : 'Filter: All'}
          </button>
          <button onClick={markAllRead} className="px-3 py-2 rounded-md bg-white/5">Mark all read</button>
          <button onClick={clearAll} className="px-3 py-2 rounded-md bg-red-600 text-white">Clear</button>
        </div>
      </div>

      <div className="space-y-3">
        {visible.length === 0 ? (
          <div className="text-center py-12 text-muted">
            No notifications.
          </div>
        ) : (
          visible.map(n => (
            <div key={n.id} className={`flex items-start gap-4 p-4 rounded-2xl border ${n.unread ? 'bg-gradient-to-r from-white/5 to-white/2 border-white/5' : 'bg-card'} shadow-sm` }>
              <div className="flex-shrink-0 mt-1">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${n.unread ? 'ring-2 ring-accent' : 'bg-white/5'}`}>
                  {/* simple type badge */}
                  {n.type === 'alert' && <span className="text-sm font-bold">!</span>}
                  {n.type === 'info' && <span className="text-sm">i</span>}
                  {n.type === 'report' && <span className="text-sm">R</span>}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold">{n.title}</div>
                    <div className="text-xs text-muted mt-1">{n.body}</div>
                  </div>

                  <div className="text-xs text-muted text-right ml-4">
                    <div>{n.time}</div>
                    <div className="mt-2 flex gap-2">
                      {n.unread && (
                        <button onClick={() => markAsRead(n.id)} className="text-xs px-2 py-1 rounded-md border">Mark read</button>
                      )}
                      <button onClick={() => setNotifications(curr => curr.filter(x => x.id !== n.id))} className="text-xs px-2 py-1 rounded-md border">Dismiss</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* small help footnote */}
      <div className="mt-6 text-xs text-muted">
        Tip: replace the `initial` array with API data. When fetching from backend, set `unread` based on server state and call endpoints to update read/dismiss state.
      </div>
    </div>
  );
}

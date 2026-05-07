import React, { useEffect, useState } from 'react';
import { getNotifications, sendNotification, deleteNotification } from '../api/api';
import Navbar from '../components/Navbar';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '', message: '', sentTo: 'ALL'
  });

  const loadNotifications = async () => {
    const res = await getNotifications();
    setNotifications(res.data);
  };

  useEffect(() => { loadNotifications(); }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    await sendNotification(form);
    setForm({ title: '', message: '', sentTo: 'ALL' });
    setShowForm(false);
    loadNotifications();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this notification?')) {
      await deleteNotification(id);
      loadNotifications();
    }
  };

  const getTargetColor = (target) => {
    if (target === 'ALL') return { bg: '#e8f0fe', color: '#1a73e8' };
    if (target === 'Shop Owners') return { bg: '#fce8e6', color: '#d93025' };
    return { bg: '#e6f4ea', color: '#137333' };
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.pageHeader}>
          <div>
            <h1 style={styles.pageTitle}>🔔 Notifications</h1>
            <p style={styles.pageSubtitle}>
              {notifications.length} notifications sent
            </p>
          </div>
          <button
            style={styles.addBtn}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Close' : '+ Send Notification'}
          </button>
        </div>

        {/* Send Notification Form */}
        {showForm && (
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>📢 Send New Notification</h3>
            <form onSubmit={handleSend}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Title</label>
                  <input style={styles.formInput}
                    placeholder="e.g. Mall Timing Change"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Send To</label>
                  <select style={styles.formInput}
                    value={form.sentTo}
                    onChange={(e) => setForm({ ...form, sentTo: e.target.value })}>
                    <option value="ALL">All</option>
                    <option value="Shop Owners">Shop Owners</option>
                    <option value="Employees">Employees</option>
                    <option value="Visitors">Visitors</option>
                  </select>
                </div>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Message</label>
                <textarea
                  style={styles.textarea}
                  placeholder="Type your notification message here..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  required
                />
              </div>
              <button style={styles.submitBtn} type="submit">
                🔔 Send Notification
              </button>
            </form>
          </div>
        )}

        {/* Notifications List */}
        <div style={styles.notifList}>
          {notifications.map((n) => (
            <div key={n.id} style={styles.notifCard}>
              <div style={styles.notifIcon}>🔔</div>
              <div style={styles.notifContent}>
                <div style={styles.notifHeader}>
                  <h3 style={styles.notifTitle}>{n.title}</h3>
                  <div style={styles.notifRight}>
                    <span style={{
                      ...styles.targetBadge,
                      backgroundColor: getTargetColor(n.sentTo).bg,
                      color: getTargetColor(n.sentTo).color,
                    }}>
                      📨 {n.sentTo}
                    </span>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(n.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <p style={styles.notifMessage}>{n.message}</p>
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div style={styles.empty}>No notifications sent yet</div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { backgroundColor: '#f0f2f5', minHeight: '100vh' },
  container: { padding: '30px', maxWidth: '1200px', margin: '0 auto' },
  pageHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '25px',
  },
  pageTitle: { fontSize: '24px', fontWeight: '700', color: '#1a1a2e' },
  pageSubtitle: { color: '#888', fontSize: '14px', marginTop: '4px' },
  addBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #f7971e, #ffd200)',
    color: '#333', border: 'none', borderRadius: '10px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '600',
  },
  formCard: {
    backgroundColor: 'white', borderRadius: '16px',
    padding: '25px', marginBottom: '25px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  },
  formTitle: {
    fontSize: '16px', fontWeight: '700',
    marginBottom: '20px', color: '#1a1a2e',
  },
  formGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px', marginBottom: '15px',
  },
  formGroup: { display: 'flex', flexDirection: 'column', marginBottom: '15px' },
  formLabel: {
    fontSize: '13px', fontWeight: '600',
    marginBottom: '6px', color: '#555',
  },
  formInput: {
    padding: '10px 12px', borderRadius: '8px',
    border: '2px solid #e2e8f0', fontSize: '14px', outline: 'none',
  },
  textarea: {
    padding: '10px 12px', borderRadius: '8px',
    border: '2px solid #e2e8f0', fontSize: '14px',
    outline: 'none', resize: 'vertical', fontFamily: 'inherit',
  },
  submitBtn: {
    padding: '10px 25px',
    background: 'linear-gradient(135deg, #f7971e, #ffd200)',
    color: '#333', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '600',
  },
  notifList: { display: 'flex', flexDirection: 'column', gap: '15px' },
  notifCard: {
    backgroundColor: 'white', borderRadius: '14px',
    padding: '20px', display: 'flex', gap: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    alignItems: 'flex-start',
  },
  notifIcon: {
    fontSize: '28px', width: '50px', height: '50px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #f7971e, #ffd200)',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', flexShrink: 0,
  },
  notifContent: { flex: 1 },
  notifHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '8px',
  },
  notifTitle: { fontSize: '16px', fontWeight: '700', color: '#1a1a2e' },
  notifRight: { display: 'flex', alignItems: 'center', gap: '10px' },
  targetBadge: {
    padding: '3px 10px', borderRadius: '20px',
    fontSize: '12px', fontWeight: '600',
  },
  deleteBtn: {
    backgroundColor: '#fff5f5', border: '1px solid #fed7d7',
    borderRadius: '8px', padding: '5px 8px',
    cursor: 'pointer', fontSize: '14px',
  },
  notifMessage: { fontSize: '14px', color: '#666', lineHeight: '1.6' },
  empty: {
    textAlign: 'center', padding: '60px',
    color: '#aaa', fontSize: '15px',
  },
};

export default Notifications;
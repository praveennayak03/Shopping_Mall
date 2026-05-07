import React, { useEffect, useState } from 'react';
import { getGuestBook, addGuest } from '../api/api';
import Navbar from '../components/Navbar';

function GuestBook() {
  const [guests, setGuests] = useState([]);
  const [form, setForm] = useState({
    visitorName: '', phone: '', purpose: ''
  });
  const [showForm, setShowForm] = useState(false);

  const loadGuests = async () => {
    const res = await getGuestBook();
    setGuests(res.data);
  };

  useEffect(() => { loadGuests(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await addGuest(form);
    setForm({ visitorName: '', phone: '', purpose: '' });
    setShowForm(false);
    loadGuests();
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.pageHeader}>
          <div>
            <h1 style={styles.pageTitle}>📖 Guest Book</h1>
            <p style={styles.pageSubtitle}>
              {guests.length} total visitors recorded
            </p>
          </div>
          <button
            style={styles.addBtn}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Close' : '+ Add New Guest'}
          </button>
        </div>

        {/* Add Guest Form */}
        {showForm && (
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>Register New Visitor</h3>
            <form onSubmit={handleAdd} style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Visitor Name</label>
                <input style={styles.formInput}
                  placeholder="Full name"
                  value={form.visitorName}
                  onChange={(e) => setForm({ ...form, visitorName: e.target.value })}
                  required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Phone Number</label>
                <input style={styles.formInput}
                  placeholder="e.g. 9999999999"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Purpose of Visit</label>
                <input style={styles.formInput}
                  placeholder="e.g. Shopping, Meeting"
                  value={form.purpose}
                  onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                  required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>&nbsp;</label>
                <button style={styles.submitBtn} type="submit">
                  ✅ Register Guest
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Guest Cards */}
        <div style={styles.guestGrid}>
          {guests.map((g) => (
            <div key={g.id} style={styles.guestCard}>
              <div style={styles.guestAvatar}>
                {g.visitorName.charAt(0).toUpperCase()}
              </div>
              <div style={styles.guestInfo}>
                <h3 style={styles.guestName}>{g.visitorName}</h3>
                <p style={styles.guestDetail}>📞 {g.phone}</p>
                <p style={styles.guestDetail}>🎯 {g.purpose}</p>
              </div>
              <div style={styles.guestId}>#{g.id}</div>
            </div>
          ))}
        </div>

        {guests.length === 0 && (
          <div style={styles.empty}>No guests recorded yet</div>
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
    background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    color: 'white', border: 'none', borderRadius: '10px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '600',
  },
  formCard: {
    backgroundColor: 'white', borderRadius: '16px',
    padding: '25px', marginBottom: '25px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  },
  formTitle: { fontSize: '16px', fontWeight: '700', marginBottom: '20px', color: '#1a1a2e' },
  formGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px',
  },
  formGroup: { display: 'flex', flexDirection: 'column' },
  formLabel: { fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#555' },
  formInput: {
    padding: '10px 12px', borderRadius: '8px',
    border: '2px solid #e2e8f0', fontSize: '14px', outline: 'none',
  },
  submitBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #11998e, #38ef7d)',
    color: 'white', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '600',
    marginTop: '2px',
  },
  guestGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '15px',
  },
  guestCard: {
    backgroundColor: 'white', borderRadius: '14px',
    padding: '20px', display: 'flex',
    alignItems: 'center', gap: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  },
  guestAvatar: {
    width: '50px', height: '50px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    color: 'white', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '20px', fontWeight: '700',
    flexShrink: 0,
  },
  guestInfo: { flex: 1 },
  guestName: { fontSize: '15px', fontWeight: '700', color: '#1a1a2e', marginBottom: '4px' },
  guestDetail: { fontSize: '13px', color: '#666', padding: '2px 0' },
  guestId: {
    fontSize: '18px', fontWeight: '800',
    color: '#e2e8f0',
  },
  empty: { textAlign: 'center', padding: '60px', color: '#aaa', fontSize: '15px' },
};

export default GuestBook;
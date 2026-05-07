import React, { useEffect, useState } from 'react';
import { getShops, approveShop, rejectShop, addShop } from '../api/api';
import Navbar from '../components/Navbar';

function Shops() {
  const [shops, setShops] = useState([]);
  const [form, setForm] = useState({
    shopName: '', ownerName: '', category: '', floorNumber: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('ALL');

  const loadShops = async () => {
    const res = await getShops();
    setShops(res.data);
  };

  useEffect(() => { loadShops(); }, []);

  const handleApprove = async (id) => {
    await approveShop(id);
    loadShops();
  };

  const handleReject = async (id) => {
    await rejectShop(id);
    loadShops();
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await addShop(form);
    setForm({ shopName: '', ownerName: '', category: '', floorNumber: '' });
    setShowForm(false);
    loadShops();
  };

  const filteredShops = filter === 'ALL'
    ? shops
    : shops.filter(s => s.status === filter);

  const getStatusStyle = (status) => {
    if (status === 'APPROVED') return styles.badgeApproved;
    if (status === 'REJECTED') return styles.badgeRejected;
    return styles.badgePending;
  };

  const counts = {
    ALL: shops.length,
    PENDING: shops.filter(s => s.status === 'PENDING').length,
    APPROVED: shops.filter(s => s.status === 'APPROVED').length,
    REJECTED: shops.filter(s => s.status === 'REJECTED').length,
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.pageHeader}>
          <div>
            <h1 style={styles.pageTitle}>🏪 Shop Management</h1>
            <p style={styles.pageSubtitle}>
              Manage all shops — approve or reject applications
            </p>
          </div>
          <button
            style={styles.addBtn}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Close' : '+ Add New Shop'}
          </button>
        </div>

        {/* Stats Row */}
        <div style={styles.statsRow}>
          {Object.entries(counts).map(([key, val]) => (
            <div
              key={key}
              style={filter === key ? { ...styles.statCard, ...styles.statCardActive } : styles.statCard}
              onClick={() => setFilter(key)}
            >
              <div style={styles.statNum}>{val}</div>
              <div style={styles.statLabel}>{key}</div>
            </div>
          ))}
        </div>

        {/* Add Shop Form */}
        {showForm && (
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>Add New Shop</h3>
            <form onSubmit={handleAdd} style={styles.form}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Shop Name</label>
                  <input style={styles.formInput}
                    placeholder="e.g. Nike Store"
                    value={form.shopName}
                    onChange={(e) => setForm({ ...form, shopName: e.target.value })}
                    required />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Owner Name</label>
                  <input style={styles.formInput}
                    placeholder="e.g. Rahul Sharma"
                    value={form.ownerName}
                    onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                    required />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Category</label>
                  <input style={styles.formInput}
                    placeholder="e.g. Footwear"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    required />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Floor Number</label>
                  <input style={styles.formInput}
                    placeholder="e.g. 1"
                    type="number"
                    value={form.floorNumber}
                    onChange={(e) => setForm({ ...form, floorNumber: e.target.value })}
                    required />
                </div>
              </div>
              <button style={styles.submitBtn} type="submit">
                ✅ Submit Shop
              </button>
            </form>
          </div>
        )}

        {/* Table */}
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHead}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Shop Name</th>
                <th style={styles.th}>Owner</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Floor</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredShops.map((shop) => (
                <tr key={shop.id} style={styles.tr}>
                  <td style={styles.td}>#{shop.id}</td>
                  <td style={styles.td}>
                    <strong>{shop.shopName}</strong>
                  </td>
                  <td style={styles.td}>{shop.ownerName}</td>
                  <td style={styles.td}>
                    <span style={styles.categoryBadge}>{shop.category}</span>
                  </td>
                  <td style={styles.td}>Floor {shop.floorNumber}</td>
                  <td style={styles.td}>
                    <span style={getStatusStyle(shop.status)}>
                      {shop.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={styles.approveBtn}
                      onClick={() => handleApprove(shop.id)}
                    >
                      ✅ Approve
                    </button>
                    <button
                      style={styles.rejectBtn}
                      onClick={() => handleReject(shop.id)}
                    >
                      ❌ Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredShops.length === 0 && (
            <div style={styles.empty}>No shops found</div>
          )}
        </div>
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
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white', border: 'none', borderRadius: '10px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '600',
  },
  statsRow: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '15px', marginBottom: '25px',
  },
  statCard: {
    backgroundColor: 'white', borderRadius: '12px',
    padding: '20px', textAlign: 'center',
    cursor: 'pointer', border: '2px solid transparent',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    transition: 'all 0.2s',
  },
  statCardActive: {
    border: '2px solid #667eea',
    backgroundColor: '#f0f0ff',
  },
  statNum: { fontSize: '28px', fontWeight: '800', color: '#1a1a2e' },
  statLabel: { fontSize: '13px', color: '#888', marginTop: '4px' },
  formCard: {
    backgroundColor: 'white', borderRadius: '16px',
    padding: '25px', marginBottom: '25px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  },
  formTitle: { fontSize: '16px', fontWeight: '700', marginBottom: '20px', color: '#1a1a2e' },
  form: {},
  formGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '15px', marginBottom: '15px',
  },
  formGroup: { display: 'flex', flexDirection: 'column' },
  formLabel: { fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#555' },
  formInput: {
    padding: '10px 12px', borderRadius: '8px',
    border: '2px solid #e2e8f0', fontSize: '14px', outline: 'none',
  },
  submitBtn: {
    padding: '10px 25px',
    background: 'linear-gradient(135deg, #11998e, #38ef7d)',
    color: 'white', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '600',
  },
  tableCard: {
    backgroundColor: 'white', borderRadius: '16px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)', overflow: 'hidden',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHead: { background: 'linear-gradient(135deg, #1a1a2e, #0f3460)' },
  th: { padding: '14px 16px', color: 'white', fontSize: '13px', textAlign: 'left' },
  tr: { borderBottom: '1px solid #f0f2f5', transition: 'background 0.2s' },
  td: { padding: '14px 16px', fontSize: '14px', color: '#444' },
  badgeApproved: {
    padding: '4px 12px', borderRadius: '20px', fontSize: '12px',
    fontWeight: '600', backgroundColor: '#d4edda', color: '#155724',
  },
  badgeRejected: {
    padding: '4px 12px', borderRadius: '20px', fontSize: '12px',
    fontWeight: '600', backgroundColor: '#f8d7da', color: '#721c24',
  },
  badgePending: {
    padding: '4px 12px', borderRadius: '20px', fontSize: '12px',
    fontWeight: '600', backgroundColor: '#fff3cd', color: '#856404',
  },
  categoryBadge: {
    padding: '3px 10px', borderRadius: '20px', fontSize: '12px',
    backgroundColor: '#e8f0fe', color: '#1a73e8',
  },
  approveBtn: {
    marginRight: '6px', padding: '6px 12px',
    backgroundColor: '#d4edda', color: '#155724',
    border: '1px solid #c3e6cb', borderRadius: '6px',
    cursor: 'pointer', fontSize: '12px', fontWeight: '600',
  },
  rejectBtn: {
    padding: '6px 12px', backgroundColor: '#f8d7da',
    color: '#721c24', border: '1px solid #f5c6cb',
    borderRadius: '6px', cursor: 'pointer',
    fontSize: '12px', fontWeight: '600',
  },
  empty: { textAlign: 'center', padding: '40px', color: '#aaa', fontSize: '15px' },
};

export default Shops;
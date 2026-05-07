import React, { useEffect, useState } from 'react';
import { getEmployees, addEmployee, deleteEmployee } from '../api/api';
import Navbar from '../components/Navbar';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '', role: '', shopId: '', phone: '', email: ''
  });

  const loadEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => { loadEmployees(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await addEmployee(form);
    setForm({ name: '', role: '', shopId: '', phone: '', email: '' });
    setShowForm(false);
    loadEmployees();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this employee?')) {
      await deleteEmployee(id);
      loadEmployees();
    }
  };

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.role.toLowerCase().includes(search.toLowerCase())
  );

  const roleColor = (role) => {
    const colors = {
      'Manager': { bg: '#e8f0fe', color: '#1a73e8' },
      'Cashier': { bg: '#fce8e6', color: '#d93025' },
      'Security': { bg: '#e6f4ea', color: '#137333' },
    };
    return colors[role] || { bg: '#f1f3f4', color: '#5f6368' };
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.pageHeader}>
          <div>
            <h1 style={styles.pageTitle}>👨‍💼 Employee Management</h1>
            <p style={styles.pageSubtitle}>
              {employees.length} total employees
            </p>
          </div>
          <div style={styles.headerRight}>
            <input
              style={styles.search}
              placeholder="🔍 Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              style={styles.addBtn}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? '✕ Close' : '+ Add Employee'}
            </button>
          </div>
        </div>

        {/* Add Employee Form */}
        {showForm && (
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>Add New Employee</h3>
            <form onSubmit={handleAdd} style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Full Name</label>
                <input style={styles.formInput}
                  placeholder="e.g. Rahul Kumar"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Role</label>
                <select style={styles.formInput}
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  required>
                  <option value="">Select Role</option>
                  <option value="Manager">Manager</option>
                  <option value="Cashier">Cashier</option>
                  <option value="Security">Security</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Supervisor">Supervisor</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Shop ID</label>
                <input style={styles.formInput}
                  placeholder="e.g. 1"
                  type="number"
                  value={form.shopId}
                  onChange={(e) => setForm({ ...form, shopId: e.target.value })}
                  required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Phone</label>
                <input style={styles.formInput}
                  placeholder="e.g. 9999999999"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Email</label>
                <input style={styles.formInput}
                  placeholder="e.g. rahul@mall.com"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>&nbsp;</label>
                <button style={styles.submitBtn} type="submit">
                  ✅ Add Employee
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Employee Cards */}
        <div style={styles.cardGrid}>
          {filtered.map((emp) => (
            <div key={emp.id} style={styles.empCard}>
              <div style={styles.empHeader}>
                <div style={styles.empAvatar}>
                  {emp.name.charAt(0).toUpperCase()}
                </div>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(emp.id)}
                >
                  🗑️
                </button>
              </div>
              <h3 style={styles.empName}>{emp.name}</h3>
              <span style={{
                ...styles.roleBadge,
                backgroundColor: roleColor(emp.role).bg,
                color: roleColor(emp.role).color,
              }}>
                {emp.role}
              </span>
              <div style={styles.empDetails}>
                <p>🏪 Shop ID: {emp.shopId}</p>
                <p>📞 {emp.phone}</p>
                <p>📧 {emp.email}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={styles.empty}>No employees found</div>
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
  headerRight: { display: 'flex', gap: '12px', alignItems: 'center' },
  search: {
    padding: '10px 16px', borderRadius: '10px',
    border: '2px solid #e2e8f0', fontSize: '14px',
    outline: 'none', width: '220px',
  },
  addBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #f093fb, #f5576c)',
    color: 'white', border: 'none', borderRadius: '10px',
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
    display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '15px',
  },
  formGroup: { display: 'flex', flexDirection: 'column' },
  formLabel: {
    fontSize: '13px', fontWeight: '600',
    marginBottom: '6px', color: '#555',
  },
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
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  empCard: {
    backgroundColor: 'white', borderRadius: '16px',
    padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  },
  empHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '12px',
  },
  empAvatar: {
    width: '55px', height: '55px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #f093fb, #f5576c)',
    color: 'white', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '22px', fontWeight: '700',
  },
  deleteBtn: {
    backgroundColor: '#fff5f5', border: '1px solid #fed7d7',
    borderRadius: '8px', padding: '6px 10px',
    cursor: 'pointer', fontSize: '16px',
  },
  empName: {
    fontSize: '16px', fontWeight: '700',
    color: '#1a1a2e', marginBottom: '6px',
  },
  roleBadge: {
    padding: '3px 10px', borderRadius: '20px',
    fontSize: '12px', fontWeight: '600',
    display: 'inline-block', marginBottom: '12px',
  },
  empDetails: { fontSize: '13px', color: '#666', lineHeight: '1.8' },
  empty: {
    textAlign: 'center', padding: '60px',
    color: '#aaa', fontSize: '15px',
  },
};

export default Employees;
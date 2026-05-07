import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const admin = JSON.parse(localStorage.getItem('admin'));

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: '🏠 Dashboard' },
    { path: '/shops', label: '🏪 Shops' },
    { path: '/employees', label: '👨‍💼 Employees' },
    { path: '/guestbook', label: '📖 Guest Book' },
    { path: '/notifications', label: '🔔 Notifications' },
  ];

  return (
    <div style={styles.navbar}>
      <div style={styles.brand} onClick={() => navigate('/dashboard')}>
        🛍️ <span style={styles.brandText}>Shopping Mall Admin</span>
      </div>
      <div style={styles.navItems}>
        {navItems.map((item) => (
          <button
            key={item.path}
            style={
              location.pathname === item.path
                ? { ...styles.navBtn, ...styles.navBtnActive }
                : styles.navBtn
            }
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div style={styles.userSection}>
        <div style={styles.avatar}>
          {admin?.username?.charAt(0).toUpperCase()}
        </div>
        <span style={styles.username}>{admin?.username}</span>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', padding: '0 30px',
    height: '65px',
    background: 'linear-gradient(135deg, #0f3057, #ff6b35)',
    boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
    position: 'sticky', top: 0, zIndex: 1000,
  },
  brand: {
    color: 'white', fontSize: '22px', fontWeight: '800',
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
  },
  brandText: {
    background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  },
  navItems: { display: 'flex', gap: '5px' },
  navBtn: {
    padding: '8px 14px', backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.7)', border: 'none',
    borderRadius: '8px', cursor: 'pointer',
    fontSize: '13px', fontWeight: '500',
  },
  navBtnActive: {
    backgroundColor: 'rgba(255,255,255,0.2)', color: 'white',
  },
  userSection: { display: 'flex', alignItems: 'center', gap: '12px' },
  avatar: {
    width: '36px', height: '36px', borderRadius: '50%',
    backgroundColor: '#e94560', color: 'white',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontWeight: '700', fontSize: '16px',
  },
  username: { color: 'white', fontSize: '14px', fontWeight: '500' },
  logoutBtn: {
    padding: '7px 14px', backgroundColor: 'rgba(255,255,255,0.25)',
    color: 'white', border: '1px solid rgba(255,255,255,0.5)',
    borderRadius: '8px', cursor: 'pointer',
    fontSize: '13px', fontWeight: '600',
  },
};

export default Navbar;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Dashboard() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('admin'));

 const cards = [
    {
      icon: '🏪',
      title: 'Shop Management',
      desc: 'Approve, reject and manage all shops',
      color: 'linear-gradient(135deg, #0f9b8e, #1bc5bd)',
      path: '/shops',
      stat: 'Manage Shops →'
    },
    {
      icon: '👨‍💼',
      title: 'Employees',
      desc: 'Add and manage all mall employees',
      color: 'linear-gradient(135deg, #ff6b6b, #ffca3a)',
      path: '/employees',
      stat: 'View Employees →'
    },
    {
      icon: '📖',
      title: 'Guest Book',
      desc: 'Track visitor entries and manage guests',
      color: 'linear-gradient(135deg, #7f00ff, #e100ff)',
      path: '/guestbook',
      stat: 'View Guests →'
    },
    {
      icon: '🔔',
      title: 'Notifications',
      desc: 'Send notifications to shops and staff',
      color: 'linear-gradient(135deg, #00b4db, #0083b0)',
      path: '/notifications',
      stat: 'Send Now →'
    },
  ];

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        {/* Welcome Banner */}
        <div style={styles.banner}>
          <div>
            <h1 style={styles.welcomeTitle}>
              👋 Welcome back, {admin?.username}!
            </h1>
            <p style={styles.welcomeSubtitle}>
              Here's what's happening at your mall today.
            </p>
          </div>
          <div style={styles.bannerIcon}>🛍️</div>
        </div>

        {/* Cards */}
        <h2 style={styles.sectionTitle}>Quick Access</h2>
        <div style={styles.cardGrid}>
          {cards.map((card, index) => (
            <div
              key={index}
              style={{ ...styles.card, background: card.color }}
              onClick={() => navigate(card.path)}
            >
              <div style={styles.cardIcon}>{card.icon}</div>
              <h3 style={styles.cardTitle}>{card.title}</h3>
              <p style={styles.cardDesc}>{card.desc}</p>
              <div style={styles.cardLink}>{card.stat}</div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>🕐 System Info</h3>
            <p style={styles.infoText}>Backend: localhost:8080</p>
            <p style={styles.infoText}>Frontend: localhost:3000</p>
            <p style={styles.infoText}>Database: PostgreSQL</p>
            <p style={styles.infoText}>Status: 🟢 All Systems Online</p>
          </div>
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>📋 Quick Guide</h3>
            <p style={styles.infoText}>• Click Shops to approve/reject</p>
            <p style={styles.infoText}>• View all employees details</p>
            <p style={styles.infoText}>• Add visitors in Guest Book</p>
            <p style={styles.infoText}>• Use navbar for navigation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { backgroundColor: '#f0f2f5', minHeight: '100vh' },
  container: { padding: '30px', maxWidth: '1200px', margin: '0 auto' },
  banner: {
    background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
    borderRadius: '16px',
    padding: '30px 40px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    boxShadow: '0 10px 30px rgba(15,52,96,0.3)',
  },
  welcomeTitle: { fontSize: '26px', fontWeight: '700', marginBottom: '8px' },
  welcomeSubtitle: { opacity: '0.8', fontSize: '15px' },
  bannerIcon: { fontSize: '60px' },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '16px',
  },
 cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '30px',
  },
  card: {
    borderRadius: '16px',
    padding: '30px',
    color: 'white',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
  },
  cardIcon: { fontSize: '40px', marginBottom: '15px' },
  cardTitle: { fontSize: '20px', fontWeight: '700', marginBottom: '8px' },
  cardDesc: { fontSize: '13px', opacity: '0.85', marginBottom: '20px', lineHeight: '1.5' },
  cardLink: {
    fontSize: '13px',
    fontWeight: '600',
    backgroundColor: 'rgba(255,255,255,0.2)',
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: '20px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '25px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  },
  infoTitle: {
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '15px',
    color: '#1a1a2e',
    borderBottom: '2px solid #f0f2f5',
    paddingBottom: '10px',
  },
  infoText: {
    fontSize: '14px',
    color: '#666',
    padding: '5px 0',
  },
};

export default Dashboard;
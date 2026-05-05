import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const bookings = [
    { id: 'HANU-38291', seva: 'Tailabhishekam', date: '2026-05-10', status: 'Confirmed' },
    { id: 'HANU-44512', seva: 'Vada Mala Seva', date: '2026-05-14', status: 'Pending' },
  ];

  const donations = [
    { id: 'DON-1021', purpose: 'Annadanam', amount: '₹1,000', date: '2026-05-01' },
    { id: 'DON-0982', purpose: 'Temple Development', amount: '₹2,500', date: '2026-04-21' },
  ];

  const tabs = [
    { id: 'overview', label: '🏠 Overview' },
    { id: 'bookings', label: '📅 My Bookings' },
    { id: 'donations', label: '💝 My Donations' },
    { id: 'profile', label: '👤 Profile' },
  ];

  return (
    <div className="dashboard-page animate-fade-in">
      {/* Sidebar */}
      <aside className="dashboard-sidebar glass-card">
        <div className="sidebar-user">
          <div className="user-avatar">🧑‍🦱</div>
          <h4>{user?.name}</h4>
          <span className="user-role-badge">Devotee</span>
        </div>
        <nav className="sidebar-nav">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`sidebar-link ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
          <Link to="/seva" className="sidebar-link">🛕 Book New Seva</Link>
          <Link to="/donate" className="sidebar-link">💰 Make Donation</Link>
          <Link to="/japa" className="sidebar-link">📿 Japa Mala</Link>
        </nav>
        <button className="sidebar-logout" onClick={handleLogout}>🚪 Logout</button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {activeTab === 'overview' && (
          <div>
            <h2 className="dash-title">Welcome, {user?.name}! 🙏</h2>
            <div className="overview-stats">
              <div className="stat-tile glass-card">
                <span className="stat-tile-icon">📅</span>
                <div>
                  <h4>{bookings.length}</h4>
                  <p>Active Bookings</p>
                </div>
              </div>
              <div className="stat-tile glass-card">
                <span className="stat-tile-icon">💝</span>
                <div>
                  <h4>{donations.length}</h4>
                  <p>Donations Made</p>
                </div>
              </div>
              <div className="stat-tile glass-card">
                <span className="stat-tile-icon">📿</span>
                <div>
                  <h4>{localStorage.getItem('totalChants') || 0}</h4>
                  <p>Chants Completed</p>
                </div>
              </div>
            </div>
            <div className="upcoming-seva glass-card">
              <h3>📅 Upcoming Sevas</h3>
              {bookings.filter(b => b.status === 'Confirmed').map(b => (
                <div key={b.id} className="upcoming-item">
                  <strong>{b.seva}</strong>
                  <span>{b.date}</span>
                  <span className="status confirmed">{b.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            <h2 className="dash-title">📅 My Seva Bookings</h2>
            <div className="data-table glass-card">
              <table>
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Seva</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id}>
                      <td><code>{b.id}</code></td>
                      <td>{b.seva}</td>
                      <td>{b.date}</td>
                      <td><span className={`status ${b.status.toLowerCase()}`}>{b.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'donations' && (
          <div>
            <h2 className="dash-title">💝 My Donation History</h2>
            <div className="data-table glass-card">
              <table>
                <thead>
                  <tr>
                    <th>Receipt ID</th>
                    <th>Purpose</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map(d => (
                    <tr key={d.id}>
                      <td><code>{d.id}</code></td>
                      <td>{d.purpose}</td>
                      <td><strong className="amount">{d.amount}</strong></td>
                      <td>{d.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 className="dash-title">👤 My Profile</h2>
            <div className="profile-card glass-card">
              <div className="profile-avatar">🧑‍🦱</div>
              <div className="profile-info">
                <div className="profile-row"><label>Name</label><span>{user?.name}</span></div>
                <div className="profile-row"><label>Username</label><span>{user?.username}</span></div>
                <div className="profile-row"><label>Role</label><span>Devotee</span></div>
                <div className="profile-row"><label>Member Since</label><span>May 2026</span></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;

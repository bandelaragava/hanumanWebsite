import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './UserDashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const bookings = [
    { id: 'HANU-38291', devotee: 'Ravi Kumar', seva: 'Tailabhishekam', date: '2026-05-10', status: 'Confirmed' },
    { id: 'HANU-44512', devotee: 'Priya Sharma', seva: 'Vada Mala Seva', date: '2026-05-14', status: 'Pending' },
    { id: 'HANU-51023', devotee: 'Suresh Rao', seva: 'Deepa Seva', date: '2026-05-08', status: 'Confirmed' },
  ];

  const donations = [
    { id: 'DON-1021', name: 'Ravi Kumar', purpose: 'Annadanam', amount: '₹1,000', date: '2026-05-01' },
    { id: 'DON-0982', name: 'Lakshmi Devi', purpose: 'Temple Development', amount: '₹25,000', date: '2026-04-21' },
    { id: 'DON-0951', name: 'Anonymous', purpose: 'Cow Protection', amount: '₹500', date: '2026-04-15' },
  ];

  const stats = {
    totalBookings: 48,
    totalDonations: '₹3.2L',
    devotees: 512,
    pendingApprovals: 3,
  };

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'bookings', label: '📅 All Bookings' },
    { id: 'donations', label: '💝 Donations' },
    { id: 'events', label: '🎉 Events' },
    { id: 'announcements', label: '📢 Announcements' },
  ];

  const [allBookings, setAllBookings] = useState(bookings);

  const handleApprove = (id) => {
    setAllBookings(allBookings.map(b => b.id === id ? { ...b, status: 'Confirmed' } : b));
    alert(`Booking ${id} Approved!`);
  };

  const handleReject = (id) => {
    setAllBookings(allBookings.map(b => b.id === id ? { ...b, status: 'Rejected' } : b));
    alert(`Booking ${id} Rejected!`);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    alert('Event added successfully!');
  };

  const handlePublishAnnouncement = (e) => {
    e.preventDefault();
    alert('Announcement published successfully!');
  };

  return (
    <div className="dashboard-page animate-fade-in">
      {/* Sidebar */}
      <aside className="dashboard-sidebar glass-card admin-sidebar">
        <div className="sidebar-user">
          <div className="user-avatar admin-avatar">🛕</div>
          <h4>{user?.name}</h4>
          <span className="user-role-badge admin-badge">Temple Admin</span>
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
        </nav>
        <button className="sidebar-logout" onClick={handleLogout}>🚪 Logout</button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {activeTab === 'overview' && (
          <div>
            <h2 className="dash-title">Admin Overview 🛕</h2>
            <div className="overview-stats">
              <div className="stat-tile glass-card">
                <span className="stat-tile-icon">📅</span>
                <div><h4>{stats.totalBookings}</h4><p>Total Bookings</p></div>
              </div>
              <div className="stat-tile glass-card">
                <span className="stat-tile-icon">💰</span>
                <div><h4>{stats.totalDonations}</h4><p>Donations Received</p></div>
              </div>
              <div className="stat-tile glass-card">
                <span className="stat-tile-icon">🧑‍🤝‍🧑</span>
                <div><h4>{stats.devotees}</h4><p>Registered Devotees</p></div>
              </div>
              <div className="stat-tile glass-card pending-tile">
                <span className="stat-tile-icon">⏳</span>
                <div><h4>{stats.pendingApprovals}</h4><p>Pending Approvals</p></div>
              </div>
            </div>
            <div className="upcoming-seva glass-card">
              <h3>⏳ Pending Approvals</h3>
              {allBookings.filter(b => b.status === 'Pending').map(b => (
                <div key={b.id} className="upcoming-item">
                  <strong>{b.devotee}</strong>
                  <span>{b.seva}</span>
                  <span>{b.date}</span>
                  <span className="status pending">{b.status}</span>
                  <div className="admin-actions">
                    <button className="btn-approve" onClick={() => handleApprove(b.id)}>✔ Approve</button>
                    <button className="btn-reject" onClick={() => handleReject(b.id)}>✘ Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            <h2 className="dash-title">📅 All Seva Bookings</h2>
            <div className="data-table glass-card">
              <table>
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Devotee</th>
                    <th>Seva</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allBookings.map(b => (
                    <tr key={b.id}>
                      <td><code>{b.id}</code></td>
                      <td>{b.devotee}</td>
                      <td>{b.seva}</td>
                      <td>{b.date}</td>
                      <td><span className={`status ${b.status.toLowerCase()}`}>{b.status}</span></td>
                      <td>
                        {b.status === 'Pending' && (
                          <div className="admin-actions">
                            <button className="btn-approve" onClick={() => handleApprove(b.id)}>✔</button>
                            <button className="btn-reject" onClick={() => handleReject(b.id)}>✘</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'donations' && (
          <div>
            <h2 className="dash-title">💝 Donation Records</h2>
            <div className="data-table glass-card">
              <table>
                <thead>
                  <tr>
                    <th>Receipt ID</th>
                    <th>Donor</th>
                    <th>Purpose</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map(d => (
                    <tr key={d.id}>
                      <td><code>{d.id}</code></td>
                      <td>{d.name}</td>
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

        {activeTab === 'events' && (
          <div>
            <h2 className="dash-title">🎉 Manage Events</h2>
            <div className="admin-form-card glass-card">
              <h3>Add New Event</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Event Name</label>
                  <input type="text" placeholder="e.g., Hanuman Jayanti" />
                </div>
                <div className="form-group">
                  <label>Event Date</label>
                  <input type="date" />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows="3" placeholder="Event details..." />
              </div>
              <button className="btn-primary" onClick={handleAddEvent}>Add Event</button>
            </div>
          </div>
        )}

        {activeTab === 'announcements' && (
          <div>
            <h2 className="dash-title">📢 Manage Announcements</h2>
            <div className="admin-form-card glass-card">
              <h3>Post New Announcement</h3>
              <div className="form-group">
                <label>Title</label>
                <input type="text" placeholder="Announcement title..." />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="4" placeholder="Write your announcement..." />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select>
                    <option>Normal</option>
                    <option>Important</option>
                    <option>Urgent</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Expires On</label>
                  <input type="date" />
                </div>
              </div>
              <button className="btn-primary" onClick={handlePublishAnnouncement}>Publish</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

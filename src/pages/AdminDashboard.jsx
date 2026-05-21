import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { usePanchangam } from '../utils/usePanchangam';
import './UserDashboard.css';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { 
    sevas, addSeva, deleteSeva, updateSeva,
    products, setProducts,
    timings, setTimings,
    events, setEvents,
    announcements, setAnnouncements,
    heroContent, setHeroContent,
    bookings, approveBooking, rejectBooking,
    donations,
    devotionalContent, setDevotionalContent,
    japaMantras, setJapaMantras,
    darshanSlots, setDarshanSlots,
    liveVideoUrl, setLiveVideoUrl,
  } = useData();
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'hero', label: '🏠 Home Hero' },
    { id: 'available-sevas', label: '🪔 Available Sevas' },
    { id: 'sevas', label: '📿 Manage Sevas' },
    { id: 'store', label: '🛒 Temple Store' },
    { id: 'timings', label: '⏰ Temple Timings' },
    { id: 'darshan-slots', label: '🕉️ Darshan Slots' },
    { id: 'panchangam', label: '📜 Panchangam' },
    { id: 'energy', label: '🔱 Live Energy' },
    { id: 'upcoming', label: '🗓️ Upcoming Events' },
    { id: 'events', label: '🎉 Manage Events' },
    { id: 'announcements', label: '📢 Announcements' },
    { id: 'bookings', label: '📅 Bookings' },
    { id: 'donations', label: '💝 Donations' },
    { id: 'devotion', label: '🎼 Devotion' },
    { id: 'japa', label: '📿 Japa Mantras' },
  ];

  // --- Panchangam: live data hook + optional admin overrides ---
  const today = new Date();
  const { data: livePanchang, loading: liveLoading, error: liveError, refresh: refreshLive } = usePanchangam();
  const [panchangam, setPanchangam] = React.useState({
    tithi: '',
    vara: '',
    nakshatra: '',
    yoga: '',
    karana: '',
    rahuKala: '',
    yamaghanda: '',
    abhijitMuhurta: '',
    sunrise: '',
    sunset: '',
    moonSign: '',
    paksha: '',
    masa: '',
    specialNote: ''
  });

  // Sync admin form whenever live data loads (only if fields are empty)
  useEffect(() => {
    if (livePanchang && !panchangam.tithi) {
      setPanchangam(prev => ({
        ...prev,
        tithi:          livePanchang.tithi          || prev.tithi,
        vara:           livePanchang.vara           || prev.vara,
        nakshatra:      livePanchang.nakshatra      || prev.nakshatra,
        yoga:           livePanchang.yoga           || prev.yoga,
        karana:         livePanchang.karana         || prev.karana,
        rahuKala:       livePanchang.rahuKala       || prev.rahuKala,
        yamaghanda:     livePanchang.yamaghanda     || prev.yamaghanda,
        abhijitMuhurta: livePanchang.abhijitMuhurta || prev.abhijitMuhurta,
        sunrise:        livePanchang.sunrise        || prev.sunrise,
        sunset:         livePanchang.sunset         || prev.sunset,
        moonSign:       livePanchang.moonSign       || prev.moonSign,
        paksha:         livePanchang.paksha         || prev.paksha,
        masa:           livePanchang.masa           || prev.masa,
        specialNote:    livePanchang.specialNote    || prev.specialNote,
      }));
    }
  }, [livePanchang]);

  /** Reset form to the latest live-calculated values */
  const syncFromLive = () => {
    if (!livePanchang) return;
    setPanchangam({
      tithi:          livePanchang.tithi,
      vara:           livePanchang.vara,
      nakshatra:      livePanchang.nakshatra,
      yoga:           livePanchang.yoga,
      karana:         livePanchang.karana,
      rahuKala:       livePanchang.rahuKala,
      yamaghanda:     livePanchang.yamaghanda,
      abhijitMuhurta: livePanchang.abhijitMuhurta,
      sunrise:        livePanchang.sunrise,
      sunset:         livePanchang.sunset,
      moonSign:       livePanchang.moonSign,
      paksha:         livePanchang.paksha,
      masa:           livePanchang.masa,
      specialNote:    livePanchang.specialNote,
    });
    toast.success('Synced with live astronomical data! 🕉️');
  };

  // --- Live Energy state ---
  const [energyData, setEnergyData] = React.useState({
    activeDarshanCount: 142,
    todaySevaCount: 8,
    todayDonationTotal: '₹24,500',
    liveChantingActive: true,
    specialPujaToday: 'Sundarkand Path',
    crowdLevel: 'Moderate',
    templeStatus: 'Open',
    lastUpdated: '12:00 PM'
  });

  const crowdColors = { Low: '#2e7d32', Moderate: '#e65100', High: '#c62828' };
  const statusColors = { Open: '#2e7d32', Closed: '#c62828', 'Temporarily Closed': '#e65100' };

  // Helper for adding new items
  const [newItem, setNewItem] = useState({});

  const handleAddSeva = (e) => {
    e.preventDefault();
    if (!newItem.title || !newItem.price) return toast.error('Please fill mandatory fields');
    addSeva({ ...newItem, icon: '✨' });
    setNewItem({});
    toast.success('Seva offering added!');
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return toast.error('Please fill mandatory fields');
    setProducts([...products, { ...newItem, id: Date.now() }]);
    setNewItem({});
    toast.success('Product added to inventory!');
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newItem.title || !newItem.date) return toast.error('Please fill mandatory fields');
    const dateObj = new Date(newItem.date);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    setEvents([...events, { 
      id: Date.now(), 
      title: newItem.title, 
      date: dateObj.getDate().toString(), 
      month: months[dateObj.getMonth()],
      desc: newItem.desc || ''
    }]);
    setNewItem({});
    toast.success('New event scheduled!');
  };

  const handleAddMantra = (e) => {
    e.preventDefault();
    if (!newItem.mantraText) return toast.error('Please enter mantra text');
    const text = newItem.mantraText.trim();
    if (japaMantras.includes(text)) return toast.error('Mantra already exists');
    setJapaMantras([...japaMantras, text]);
    setNewItem({});
    toast.success('New Japa Mantra added!');
  };

  const handleExportDonations = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(donations));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "donations_report.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    toast.success('Donation report exported!');
  };

  return (
    <div className="dashboard-page animate-fade-in">
      <aside className="dashboard-sidebar glass-card admin-sidebar">
        {/* Brand */}
        <div className="dashboard-brand">
          <span className="dashboard-brand-icon">🕉️</span>
          <span className="dashboard-brand-name">HanumanTemple</span>
        </div>

        {/* Back to Home */}
        <Link to="/" className="dashboard-home-btn">
          <span>←</span>
          <span>Back to Home</span>
        </Link>

        {/* Hamburger toggle — only visible on mobile/tablet */}
        <button
          className={`dash-nav-toggle ${isNavOpen ? 'open' : ''}`}
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* User info — desktop only */}
        <div className="sidebar-user">
          <div className="user-avatar admin-avatar">🛕</div>
          <h4>{user?.name}</h4>
          <span className="user-role-badge admin-badge">Temple Admin</span>
        </div>

        {/* Nav links */}
        <nav className={`sidebar-nav ${isNavOpen ? 'nav-open' : ''}`}>
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`sidebar-link ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(t.id);
                setNewItem({});
                setIsNavOpen(false);
              }}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <button className="sidebar-logout" onClick={handleLogout}>🚪 Logout</button>
      </aside>

      <main className="dashboard-main">
        {activeTab === 'overview' && (
          <div className="admin-overview">
            <h2 className="dash-title">Master Control Center 🛕</h2>
            <div className="overview-stats">
              <div className="stat-tile glass-card"><h4>{sevas.length}</h4><p>Active Sevas</p></div>
              <div className="stat-tile glass-card"><h4>{products.length}</h4><p>Store Items</p></div>
              <div className="stat-tile glass-card"><h4>{events.length}</h4><p>Live Events</p></div>
              <div className="stat-tile glass-card"><h4>{bookings.filter(b => b.status === 'Pending').length}</h4><p>New Bookings</p></div>
            </div>
            
            <div className="upcoming-seva glass-card">
              <h3>⏳ Urgent Pending Approvals</h3>
              {bookings.filter(b => b.status === 'Pending').length > 0 ? (
                bookings.filter(b => b.status === 'Pending').map(b => (
                  <div key={b.id} className="upcoming-item">
                    <strong>{b.devotee}</strong>
                    <span>{b.seva}</span>
                    <span>{b.date}</span>
                    <div className="admin-actions">
                      <button className="btn-approve" onClick={() => {
                        approveBooking(b.id);
                        toast.success('Booking Approved!');
                      }}>✔ Approve</button>
                      <button className="btn-reject" onClick={() => {
                        rejectBooking(b.id);
                        toast.error('Booking Rejected');
                      }}>✘ Reject</button>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{opacity: 0.6, fontStyle: 'italic'}}>All clear! No pending approvals.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'hero' && (
          <div className="admin-hero-edit">
            <h2 className="dash-title">🏠 Edit Homepage Hero</h2>
            <div className="admin-form-card glass-card">
              <div className="form-group">
                <label>Main Title (Use \n for new line)</label>
                <textarea 
                  rows="2"
                  value={heroContent.title} 
                  onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Subtitle / Description</label>
                <textarea 
                  rows="3" 
                  value={heroContent.subtitle} 
                  onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                />
              </div>
              <button className="btn-primary" onClick={() => toast.success('Hero content updated!')}>Save Changes</button>
            </div>
          </div>
        )}

        {activeTab === 'available-sevas' && (
          <div className="admin-available-sevas">
            <h2 className="dash-title">🪔 Available Sevas</h2>
            <p style={{opacity:0.7, marginBottom:'2rem'}}>Live preview of all sevas currently visible to devotees on the Booking page. Manage offerings from the <strong>Manage Sevas</strong> tab.</p>

            {sevas.length === 0 ? (
              <div className="glass-card" style={{padding:'3rem', textAlign:'center', opacity:0.7}}>
                <div style={{fontSize:'3rem', marginBottom:'1rem'}}>🪔</div>
                <p>No sevas available. Add offerings from the <strong>Manage Sevas</strong> tab.</p>
              </div>
            ) : (
              <div className="available-sevas-grid">
                {sevas.map((seva) => (
                  <div key={seva.id} className="available-seva-card glass-card">
                    <div className="as-header">
                      <span className="as-icon">{seva.icon}</span>
                      <span className="as-price">{seva.price}</span>
                    </div>
                    <h3 className="as-title">{seva.title}</h3>
                    <p className="as-desc">{seva.desc}</p>
                    <div className="as-benefits">
                      <span className="as-benefits-label">✨ Benefits:</span> {seva.benefits}
                    </div>
                    <div className="as-actions">
                      <span className="status confirmed">● Live</span>
                      <button className="btn-reject" onClick={() => { deleteSeva(seva.id); toast.success(`${seva.title} removed`); }}>🗑 Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="admin-form-card glass-card" style={{marginTop:'2rem'}}>
              <h3>✨ Quick Add Seva</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Seva Title</label>
                  <input type="text" placeholder="e.g. Tailabhishekam" value={newItem.title || ''} onChange={(e) => setNewItem({...newItem, title: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input type="text" placeholder="e.g. ₹501" value={newItem.price || ''} onChange={(e) => setNewItem({...newItem, price: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Briefly describe the seva..." value={newItem.desc || ''} rows="2" onChange={(e) => setNewItem({...newItem, desc: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Benefits</label>
                <input type="text" placeholder="e.g. Health, relief from debt..." value={newItem.benefits || ''} onChange={(e) => setNewItem({...newItem, benefits: e.target.value})} />
              </div>
              <button className="btn-primary" onClick={handleAddSeva}>Add Seva Offering</button>
            </div>
          </div>
        )}

        {activeTab === 'sevas' && (
          <div className="admin-sevas">
            <h2 className="dash-title">📿 Manage Sevas</h2>
            <div className="admin-form-card glass-card" style={{marginBottom: '2rem'}}>
              <h3>✨ Add New Seva Offering</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Seva Title</label>
                  <input type="text" placeholder="e.g. Tailabhishekam" value={newItem.title || ''} onChange={(e) => setNewItem({...newItem, title: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input type="text" placeholder="e.g. ₹501" value={newItem.price || ''} onChange={(e) => setNewItem({...newItem, price: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Briefly describe the benefits..." value={newItem.desc || ''} rows="2" onChange={(e) => setNewItem({...newItem, desc: e.target.value})} />
              </div>
              <button className="btn-primary" onClick={handleAddSeva}>Add Seva Offering</button>
            </div>
            
            <div className="data-table glass-card">
              <table>
                <thead>
                  <tr><th>Icon</th><th>Title</th><th>Price</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {sevas.map(s => (
                    <tr key={s.id}>
                      <td>{s.icon}</td>
                      <td>{s.title}</td>
                      <td>{s.price}</td>
                      <td><button className="btn-reject" onClick={() => deleteSeva(s.id)}>Remove</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'store' && (
          <div className="admin-store">
            <h2 className="dash-title">🛒 Temple Store Inventory</h2>
            <div className="admin-form-card glass-card" style={{marginBottom: '2rem'}}>
              <h3>📦 Add Product to Store</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name</label>
                  <input type="text" placeholder="e.g. Bronze Idol" value={newItem.name || ''} onChange={(e) => setNewItem({...newItem, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input type="text" placeholder="e.g. ₹4,999" value={newItem.price || ''} onChange={(e) => setNewItem({...newItem, price: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={newItem.category || ''} onChange={(e) => setNewItem({...newItem, category: e.target.value})}>
                  <option value="">Select Category</option>
                  <option value="Idols">Idols</option>
                  <option value="Mala">Mala</option>
                  <option value="Books">Books</option>
                  <option value="Pooja Items">Pooja Items</option>
                </select>
              </div>
              <button className="btn-primary" onClick={handleAddProduct}>Add to Store</button>
            </div>

            <div className="data-table glass-card">
              <table>
                <thead>
                  <tr><th>ID</th><th>Product Name</th><th>Price</th><th>Category</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td><code>{p.id.toString().slice(-5)}</code></td>
                      <td>{p.name}</td>
                      <td>{p.price}</td>
                      <td><span className="user-role-badge">{p.category}</span></td>
                      <td><button className="btn-reject" onClick={() => setProducts(products.filter(pr => pr.id !== p.id))}>Remove</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'timings' && (
          <div className="admin-timings">
            <h2 className="dash-title">⏰ Temple Timings</h2>
            {timings.map((t, idx) => (
              <div key={t.id} className="admin-form-card glass-card" style={{marginBottom: '1rem', padding: '1.5rem 2.5rem'}}>
                <div className="form-row" style={{alignItems: 'center'}}>
                  <div className="form-group" style={{marginBottom: 0}}>
                    <label>Timing Name</label>
                    <input 
                      type="text" 
                      value={t.name} 
                      onChange={(e) => {
                        const newTimings = [...timings];
                        newTimings[idx].name = e.target.value;
                        setTimings(newTimings);
                      }} 
                    />
                  </div>
                  <div className="form-group" style={{marginBottom: 0}}>
                    <label>Duration / Value</label>
                    <input 
                      type="text" 
                      value={t.value} 
                      onChange={(e) => {
                        const newTimings = [...timings];
                        newTimings[idx].value = e.target.value;
                        setTimings(newTimings);
                      }} 
                    />
                  </div>
                </div>
              </div>
            ))}
            <div style={{marginTop: '2rem'}}>
              <button className="btn-primary" onClick={() => toast.success('Temple Timings updated successfully!')}>Update All Timings</button>
            </div>
          </div>
        )}

        {activeTab === 'darshan-slots' && (
          <div className="admin-darshan-slots">
            <h2 className="dash-title">🕉️ Manage Darshan Slots</h2>
            <p style={{opacity:0.7, marginBottom:'2rem'}}>
              Configure which time slots appear on the Darshan booking page. Toggle slots on/off, mark as Quota Full, adjust capacity, or reset booked counts.
            </p>

            {/* Add New Slot */}
            <div className="admin-form-card glass-card" style={{marginBottom:'2rem'}}>
              <h3>➕ Add New Time Slot</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Slot Time (e.g. 09:00 AM - 11:00 AM)</label>
                  <input
                    type="text"
                    placeholder="HH:MM AM - HH:MM AM"
                    value={newItem.slotTime || ''}
                    onChange={(e) => setNewItem({...newItem, slotTime: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Total Capacity (Tickets)</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 150"
                    value={newItem.slotCapacity || ''}
                    onChange={(e) => setNewItem({...newItem, slotCapacity: e.target.value})}
                  />
                </div>
              </div>
              <button
                className="btn-primary"
                onClick={() => {
                  if (!newItem.slotTime || !newItem.slotCapacity) return toast.error('Please fill slot time and capacity.');
                  const cap = parseInt(newItem.slotCapacity);
                  if (isNaN(cap) || cap < 1) return toast.error('Capacity must be a positive number.');
                  setDarshanSlots(prev => [...prev, {
                    id: `ds${Date.now()}`,
                    time: newItem.slotTime.trim(),
                    totalCapacity: cap,
                    bookedCount: 0,
                    isActive: true,
                    isFull: false,
                  }]);
                  setNewItem({});
                  toast.success('New Darshan slot added!');
                }}
              >
                Add Slot
              </button>
            </div>

            {/* Slots Table */}
            <div className="data-table glass-card">
              {darshanSlots.length === 0 ? (
                <div style={{padding:'3rem', textAlign:'center', opacity:0.6}}>
                  <div style={{fontSize:'2.5rem', marginBottom:'1rem'}}>🕉️</div>
                  <p>No slots configured yet. Add a slot above.</p>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Time Slot</th>
                      <th>Capacity</th>
                      <th>Booked</th>
                      <th>Remaining</th>
                      <th>Visible</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {darshanSlots.map((slot, idx) => {
                      const remaining = slot.totalCapacity - slot.bookedCount;
                      const effectivelyFull = slot.isFull;  // Only admin-controlled
                      return (
                        <tr key={slot.id} style={{opacity: slot.isActive ? 1 : 0.5}}>
                          <td><strong>{slot.time}</strong></td>
                          <td>
                            <input
                              type="number"
                              min="1"
                              value={slot.totalCapacity}
                              style={{width:'80px', padding:'6px', borderRadius:'8px', border:'1px solid var(--glass-border)', textAlign:'center'}}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (isNaN(val) || val < 1) return;
                                setDarshanSlots(prev => prev.map((s, i) => i === idx ? {...s, totalCapacity: val} : s));
                              }}
                            />
                          </td>
                          <td>
                            <span style={{fontWeight:600}}>{slot.bookedCount}</span>
                          </td>
                          <td>
                            <span style={{
                              fontWeight: 700,
                              color: remaining <= 0 ? '#c62828' : remaining <= 20 ? '#e65100' : '#2e7d32'
                            }}>
                              {Math.max(0, remaining)}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                setDarshanSlots(prev => prev.map((s, i) => i === idx ? {...s, isActive: !s.isActive} : s));
                                toast.success(`Slot ${slot.isActive ? 'hidden from' : 'shown on'} booking page.`);
                              }}
                              style={{
                                padding:'5px 14px', borderRadius:'20px', border:'none', cursor:'pointer',
                                fontWeight:700, fontSize:'0.8rem',
                                background: slot.isActive ? 'rgba(46,125,50,0.15)' : 'rgba(150,150,150,0.15)',
                                color: slot.isActive ? '#2e7d32' : '#888'
                              }}
                            >
                              {slot.isActive ? '● Visible' : '○ Hidden'}
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                setDarshanSlots(prev => prev.map((s, i) => i === idx ? {...s, isFull: !s.isFull} : s));
                                toast.success(`Quota Full ${slot.isFull ? 'removed' : 'set'} for this slot.`);
                              }}
                              style={{
                                padding:'5px 14px', borderRadius:'20px', border:'none', cursor:'pointer',
                                fontWeight:700, fontSize:'0.8rem',
                                background: effectivelyFull ? 'rgba(198,40,40,0.12)' : 'rgba(255,153,51,0.12)',
                                color: effectivelyFull ? '#c62828' : '#e65100'
                              }}
                            >
                              {effectivelyFull ? '🚫 Quota Full' : '✅ Open'}
                            </button>
                          </td>
                          <td>
                            <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
                              <button
                                className="btn-approve"
                                style={{fontSize:'0.78rem', padding:'5px 10px'}}
                                onClick={() => {
                                  setDarshanSlots(prev => prev.map((s, i) => i === idx ? {...s, bookedCount: 0, isFull: false} : s));
                                  toast.success('Slot reset: booked count cleared.');
                                }}
                              >
                                🔄 Reset
                              </button>
                              <button
                                className="btn-reject"
                                onClick={() => {
                                  setDarshanSlots(prev => prev.filter((_, i) => i !== idx));
                                  toast.success('Slot deleted.');
                                }}
                              >
                                🗑 Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="admin-events">
            <h2 className="dash-title">🎉 Manage Events</h2>
            <div className="admin-form-card glass-card" style={{marginBottom: '2rem'}}>
              <h3>📅 Schedule New Event</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Event Title</label>
                  <input type="text" value={newItem.title || ''} placeholder="e.g. Hanuman Jayanti" onChange={(e) => setNewItem({...newItem, title: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" value={newItem.date || ''} onChange={(e) => setNewItem({...newItem, date: e.target.value})} />
                </div>
              </div>
              <button className="btn-primary" onClick={handleAddEvent}>Add Event</button>
            </div>

            <div className="data-table glass-card">
              <table>
                <thead><tr><th>Date</th><th>Month</th><th>Title</th><th>Action</th></tr></thead>
                <tbody>
                  {events.map(e => (
                    <tr key={e.id}><td>{e.date}</td><td>{e.month}</td><td>{e.title}</td><td><button className="btn-reject" onClick={() => setEvents(events.filter(ev => ev.id !== e.id))}>Delete</button></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="admin-announcements">
            <h2 className="dash-title">📢 Active Announcements</h2>
            <div className="admin-form-card glass-card" style={{marginBottom: '2rem'}}>
              <h3>📢 Post New Alert</h3>
              <div className="form-group">
                <label>Announcement Title</label>
                <input type="text" placeholder="e.g. Temple Renovation Update" value={newItem.title || ''} onChange={(e) => setNewItem({...newItem, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Detailed Message</label>
                <textarea placeholder="Provide details for the devotees..." value={newItem.message || ''} rows="3" onChange={(e) => setNewItem({...newItem, message: e.target.value})} />
              </div>
              <button className="btn-primary" onClick={() => {
                if(!newItem.title || !newItem.message) return toast.error('Please fill all fields');
                setAnnouncements([{...newItem, id: Date.now(), priority: 'Normal'}, ...announcements]);
                setNewItem({});
                toast.success('Announcement Published!');
              }}>Publish Announcement</button>
            </div>
            
            <div className="announcement-list">
              {announcements.map(a => (
                <div key={a.id} className="upcoming-item glass-card" style={{padding: '1rem', marginBottom: '10px'}}>
                  <strong>{a.title}</strong>
                  <p style={{fontSize: '0.9rem', opacity: 0.8}}>{a.message}</p>
                  <button className="btn-reject" style={{marginTop: '10px'}} onClick={() => setAnnouncements(announcements.filter(an => an.id !== a.id))}>Remove Alert</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'panchangam' && (
          <div className="admin-panchangam">
            <h2 className="dash-title">📜 Today's Panchangam</h2>
            <p style={{opacity:0.7, marginBottom:'1.5rem'}}>Live astronomical data is auto-computed and shown below. You may review and override any field before publishing. Devotees see this on the home page.</p>

            {/* Live data status banner */}
            {liveLoading && (
              <div style={{background:'rgba(255,153,51,0.1)', border:'1px solid rgba(255,153,51,0.3)', borderRadius:'12px', padding:'14px 20px', marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'10px'}}>
                <span style={{fontSize:'1.3rem'}}>🔄</span>
                <span>Computing live Panchangam from astronomical engine…</span>
              </div>
            )}
            {liveError && (
              <div style={{background:'rgba(220,50,50,0.1)', border:'1px solid rgba(220,50,50,0.3)', borderRadius:'12px', padding:'14px 20px', marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'10px'}}>
                <span style={{fontSize:'1.3rem'}}>⚠️</span>
                <span>{liveError}</span>
                <button onClick={refreshLive} style={{marginLeft:'auto', padding:'6px 14px', borderRadius:'20px', border:'1px solid rgba(220,50,50,0.4)', background:'transparent', cursor:'pointer', fontWeight:600}}>Retry</button>
              </div>
            )}
            {!liveLoading && !liveError && livePanchang && (
              <div style={{background:'rgba(46,125,50,0.1)', border:'1px solid rgba(46,125,50,0.3)', borderRadius:'12px', padding:'14px 20px', marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap'}}>
                <span style={{fontSize:'1.3rem'}}>✅</span>
                <span><strong>Live data loaded</strong> — {livePanchang.date}</span>
                {livePanchang.festivals && <span style={{marginLeft:'8px', fontStyle:'italic'}}>🎉 {livePanchang.festivals}</span>}
              </div>
            )}

            <div className="panchangam-grid">
              {[
                { label: '🌙 Tithi', key: 'tithi', help: 'Lunar day (1-30) — auto-calculated' },
                { label: '📅 Vara (Day)', key: 'vara', help: 'Day of the week in Sanskrit' },
                { label: '⭐ Nakshatra', key: 'nakshatra', help: 'Current lunar mansion' },
                { label: '🧘 Yoga', key: 'yoga', help: 'Solar-lunar Yoga name' },
                { label: '🔑 Karana', key: 'karana', help: 'Half of a Tithi period' },
                { label: '🌕 Paksha', key: 'paksha', help: 'Shukla (waxing) or Krishna (waning)' },
                { label: '📆 Masa (Month)', key: 'masa', help: 'Hindu lunar month name' },
                { label: '🌅 Sunrise', key: 'sunrise', help: 'Today\'s sunrise time (IST)' },
                { label: '🌇 Sunset', key: 'sunset', help: 'Today\'s sunset time (IST)' },
                { label: '🌙 Moon Sign', key: 'moonSign', help: 'Current moon zodiac (Rashi)' },
                { label: '⚠️ Rahu Kala', key: 'rahuKala', help: 'Inauspicious Rahu period' },
                { label: '⏰ Yamaghanda', key: 'yamaghanda', help: 'Inauspicious Yama period' },
                { label: '✅ Abhijit Muhurta', key: 'abhijitMuhurta', help: 'Most auspicious noon time window' },
              ].map(({ label, key, help }) => (
                <div key={key} className="admin-form-card glass-card panchangam-field">
                  <label>{label}</label>
                  <small style={{opacity:0.6, display:'block', marginBottom:'6px'}}>{help}</small>
                  <input
                    type="text"
                    value={panchangam[key] || ''}
                    onChange={(e) => setPanchangam({...panchangam, [key]: e.target.value})}
                    placeholder={liveLoading ? 'Loading…' : ''}
                  />
                </div>
              ))}
            </div>

            <div className="admin-form-card glass-card" style={{marginTop:'1.5rem'}}>
              <label>📝 Special Note for Devotees</label>
              <small style={{opacity:0.6, display:'block', marginBottom:'6px'}}>Displayed as a highlighted banner to all visitors</small>
              <textarea
                rows="3"
                value={panchangam.specialNote || ''}
                onChange={(e) => setPanchangam({...panchangam, specialNote: e.target.value})}
                placeholder={liveLoading ? 'Loading…' : 'Enter a special note for devotees…'}
              />
            </div>

            <div style={{marginTop:'2rem', display:'flex', gap:'15px', flexWrap:'wrap'}}>
              <button className="btn-primary" onClick={() => toast.success('Panchangam published for today! ✨')}>Publish Today's Panchangam</button>
              <button
                style={{padding:'12px 24px', borderRadius:'50px', border:'1px solid var(--glass-border)', background:'transparent', cursor:'pointer', fontWeight:600, display:'flex', alignItems:'center', gap:'8px'}}
                onClick={syncFromLive}
                disabled={liveLoading || !!liveError}
              >
                🔄 Sync from Live Data
              </button>
            </div>
          </div>
        )}

        {activeTab === 'energy' && (
          <div className="admin-energy">
            <h2 className="dash-title">🔱 Live Hanuman Energy Dashboard</h2>
            <p style={{opacity:0.7, marginBottom:'2rem'}}>Real-time temple status updates. Edit and publish live metrics visible to devotees.</p>

            <div className="energy-stats-grid">
              <div className="energy-stat-card glass-card">
                <div className="energy-icon">🙏</div>
                <div className="energy-value">{energyData.activeDarshanCount}</div>
                <div className="energy-label">Active Darshan Count</div>
                <input type="number" value={energyData.activeDarshanCount} onChange={(e) => setEnergyData({...energyData, activeDarshanCount: e.target.value})} style={{marginTop:'10px', width:'100%', padding:'8px', borderRadius:'8px', border:'1px solid var(--glass-border)', textAlign:'center', fontSize:'1rem'}} />
              </div>
              <div className="energy-stat-card glass-card">
                <div className="energy-icon">📿</div>
                <div className="energy-value">{energyData.todaySevaCount}</div>
                <div className="energy-label">Sevas Completed Today</div>
                <input type="number" value={energyData.todaySevaCount} onChange={(e) => setEnergyData({...energyData, todaySevaCount: e.target.value})} style={{marginTop:'10px', width:'100%', padding:'8px', borderRadius:'8px', border:'1px solid var(--glass-border)', textAlign:'center', fontSize:'1rem'}} />
              </div>
              <div className="energy-stat-card glass-card">
                <div className="energy-icon">💰</div>
                <div className="energy-value">{energyData.todayDonationTotal}</div>
                <div className="energy-label">Today's Donation Total</div>
                <input type="text" value={energyData.todayDonationTotal} onChange={(e) => setEnergyData({...energyData, todayDonationTotal: e.target.value})} style={{marginTop:'10px', width:'100%', padding:'8px', borderRadius:'8px', border:'1px solid var(--glass-border)', textAlign:'center', fontSize:'1rem'}} />
              </div>
            </div>

            <div className="energy-controls-grid">
              <div className="admin-form-card glass-card">
                <label>🛕 Temple Status</label>
                <select value={energyData.templeStatus} onChange={(e) => setEnergyData({...energyData, templeStatus: e.target.value})} style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid var(--glass-border)', fontSize:'1rem', marginTop:'8px'}}>
                  <option>Open</option>
                  <option>Closed</option>
                  <option>Temporarily Closed</option>
                </select>
                <div style={{marginTop:'10px', padding:'8px 14px', borderRadius:'20px', display:'inline-block', background: statusColors[energyData.templeStatus] + '20', color: statusColors[energyData.templeStatus], fontWeight:700, fontSize:'0.85rem'}}>
                  ● {energyData.templeStatus}
                </div>
              </div>

              <div className="admin-form-card glass-card">
                <label>👥 Current Crowd Level</label>
                <select value={energyData.crowdLevel} onChange={(e) => setEnergyData({...energyData, crowdLevel: e.target.value})} style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid var(--glass-border)', fontSize:'1rem', marginTop:'8px'}}>
                  <option>Low</option>
                  <option>Moderate</option>
                  <option>High</option>
                </select>
                <div style={{marginTop:'10px', padding:'8px 14px', borderRadius:'20px', display:'inline-block', background: crowdColors[energyData.crowdLevel] + '20', color: crowdColors[energyData.crowdLevel], fontWeight:700, fontSize:'0.85rem'}}>
                  ● {energyData.crowdLevel} Crowd
                </div>
              </div>

              <div className="admin-form-card glass-card">
                <label>🎵 Live Chanting Status</label>
                <div style={{marginTop:'12px', display:'flex', alignItems:'center', gap:'15px'}}>
                  <button
                    onClick={() => setEnergyData({...energyData, liveChantingActive: !energyData.liveChantingActive})}
                    style={{padding:'10px 20px', borderRadius:'30px', border:'none', cursor:'pointer', fontWeight:700, background: energyData.liveChantingActive ? 'linear-gradient(135deg, #2e7d32, #388e3c)' : '#ccc', color:'white', transition:'all 0.3s ease'}}
                  >
                    {energyData.liveChantingActive ? '🔊 Live — Click to Stop' : '🔇 Off — Click to Start'}
                  </button>
                </div>
              </div>

              <div className="admin-form-card glass-card">
                <label>🪔 Special Puja Today</label>
                <input type="text" value={energyData.specialPujaToday} onChange={(e) => setEnergyData({...energyData, specialPujaToday: e.target.value})} style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid var(--glass-border)', fontSize:'1rem', marginTop:'8px'}} />
              </div>

              <div className="admin-form-card glass-card">
                <label>🕐 Last Updated</label>
                <input type="text" value={energyData.lastUpdated} onChange={(e) => setEnergyData({...energyData, lastUpdated: e.target.value})} style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid var(--glass-border)', fontSize:'1rem', marginTop:'8px'}} placeholder="e.g. 12:00 PM" />
              </div>

              <div className="admin-form-card glass-card" style={{gridColumn: '1 / -1'}}>
                <label>📺 Live Video Stream URL</label>
                <input 
                  type="text" 
                  value={liveVideoUrl || ''} 
                  onChange={(e) => setLiveVideoUrl(e.target.value)} 
                  style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid var(--glass-border)', fontSize:'1rem', marginTop:'8px'}} 
                  placeholder="e.g. https://www.youtube.com/watch?v=xxx or direct video URL" 
                />
                <span style={{fontSize:'0.85rem', opacity:0.6, marginTop:'6px', display:'block'}}>
                  Supports standard YouTube watch links, shorts, vimeo embed links, or direct MP4 stream URLs.
                </span>
              </div>
            </div>

            <div style={{marginTop:'2rem'}}>
              <button className="btn-primary" onClick={() => toast.success('Live energy status published! 🔱')}>🔱 Publish Live Status</button>
            </div>
          </div>
        )}

        {activeTab === 'upcoming' && (
          <div className="admin-upcoming">
            <h2 className="dash-title">🗓️ Upcoming Events Calendar</h2>
            <p style={{opacity:0.7, marginBottom:'2rem'}}>A read-only calendar view of all scheduled events. Add or remove events from the Manage Events tab.</p>

            {events.length === 0 ? (
              <div className="glass-card" style={{padding:'3rem', textAlign:'center', opacity:0.7}}>
                <div style={{fontSize:'3rem', marginBottom:'1rem'}}>📅</div>
                <p>No upcoming events scheduled. Add events from the <strong>Manage Events</strong> tab.</p>
              </div>
            ) : (
              <div className="upcoming-events-timeline">
                {[...events].sort((a, b) => parseInt(a.date) - parseInt(b.date)).map((ev, idx) => (
                  <div key={ev.id} className="timeline-event glass-card">
                    <div className="timeline-date-badge">
                      <span className="tl-day">{ev.date}</span>
                      <span className="tl-month">{ev.month}</span>
                    </div>
                    <div className="timeline-body">
                      <h4>{ev.title}</h4>
                      <p>{ev.desc || 'No description provided.'}</p>
                    </div>
                    <div className="timeline-actions">
                      <button className="btn-reject" onClick={() => { setEvents(events.filter(e => e.id !== ev.id)); toast.success('Event removed'); }}>🗑 Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="admin-form-card glass-card" style={{marginTop:'2rem'}}>
              <h3>📅 Quick Add Event</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Event Title</label>
                  <input type="text" value={newItem.title || ''} placeholder="e.g. Hanuman Jayanti" onChange={(e) => setNewItem({...newItem, title: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" value={newItem.date || ''} onChange={(e) => setNewItem({...newItem, date: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <input type="text" value={newItem.desc || ''} placeholder="Brief description for devotees..." onChange={(e) => setNewItem({...newItem, desc: e.target.value})} />
              </div>
              <button className="btn-primary" onClick={handleAddEvent}>Add to Calendar</button>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="admin-bookings">
            <h2 className="dash-title">📅 All Bookings</h2>
            <div className="data-table glass-card">
              <table>
                <thead>
                  <tr><th>ID</th><th>Devotee</th><th>Seva</th><th>Date</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id}>
                      <td><code>{b.id}</code></td>
                      <td>{b.devotee}</td>
                      <td>{b.seva}</td>
                      <td>{b.date}</td>
                      <td><span className={`status ${b.status.toLowerCase()}`}>{b.status}</span></td>
                      <td>
                        {b.status === 'Pending' && (
                          <div className="admin-actions">
                            <button className="btn-approve" onClick={() => {
                              approveBooking(b.id);
                              toast.success('Approved!');
                            }}>✔</button>
                            <button className="btn-reject" onClick={() => {
                              rejectBooking(b.id);
                              toast.error('Rejected');
                            }}>✘</button>
                          </div>
                        )}
                        {b.status !== 'Pending' && <span style={{opacity: 0.5}}>No Action</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="admin-donations">
            <h2 className="dash-title">💝 Donation Records</h2>
            <button className="btn-primary" style={{marginBottom: '1.5rem'}} onClick={handleExportDonations}>⬇ Export Report (JSON)</button>
            <div className="data-table glass-card">
              <table>
                <thead>
                  <tr><th>Receipt</th><th>Donor</th><th>Purpose</th><th>Amount</th><th>Date</th></tr>
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

        {activeTab === 'devotion' && (
          <div className="admin-devotion">
            <h2 className="dash-title">🎼 Manage Devotional Content</h2>
            <div className="admin-form-card glass-card">
              <div className="form-group">
                <label>Select Section to Edit</label>
                <select 
                  value={newItem.devotionId || 'chalisa'} 
                  onChange={(e) => {
                    const id = e.target.value;
                    setNewItem({
                      ...devotionalContent[id],
                      devotionId: id
                    });
                  }}
                >
                  {Object.keys(devotionalContent).map(key => (
                    <option key={key} value={key}>{devotionalContent[key].title}</option>
                  ))}
                </select>
              </div>

              {newItem.title && (
                <div className="animate-fade-in">
                  <div className="form-group">
                    <label>Title</label>
                    <input 
                      type="text" 
                      value={newItem.title} 
                      onChange={(e) => setNewItem({...newItem, title: e.target.value})} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle</label>
                    <input 
                      type="text" 
                      value={newItem.subtitle} 
                      onChange={(e) => setNewItem({...newItem, subtitle: e.target.value})} 
                    />
                  </div>
                  <div className="form-group">
                    <label>YouTube Video URL (Embed Link)</label>
                    <input 
                      type="text" 
                      value={newItem.videoUrl} 
                      onChange={(e) => setNewItem({...newItem, videoUrl: e.target.value})} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Audio URL (.mp3)</label>
                    <input 
                      type="text" 
                      value={newItem.audioUrl} 
                      onChange={(e) => setNewItem({...newItem, audioUrl: e.target.value})} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Scripture Text</label>
                    <textarea 
                      rows="8" 
                      value={newItem.text} 
                      onChange={(e) => setNewItem({...newItem, text: e.target.value})} 
                    />
                  </div>
                  <button className="btn-primary" onClick={() => {
                    setDevotionalContent({
                      ...devotionalContent,
                      [newItem.devotionId]: {
                        title: newItem.title,
                        subtitle: newItem.subtitle,
                        text: newItem.text,
                        videoUrl: newItem.videoUrl,
                        audioUrl: newItem.audioUrl
                      }
                    });
                    toast.success(`${newItem.title} updated successfully!`);
                  }}>Update Devotional Content</button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'japa' && (
          <div className="admin-japa">
            <h2 className="dash-title">📿 Manage Japa Mantras</h2>
            <p style={{ opacity: 0.7, marginBottom: '2rem' }}>
              Add or remove mantras available for devotees in the <strong>Digital Japa Counter</strong>.
            </p>

            <div className="admin-form-card glass-card" style={{ marginBottom: '2rem' }}>
              <h3>✨ Add New Japa Mantra</h3>
              <div className="form-row" style={{ alignItems: 'flex-end' }}>
                <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                  <label>Mantra Text</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Om Namo Bhagavate Vasudevaya" 
                    value={newItem.mantraText || ''} 
                    onChange={(e) => setNewItem({ ...newItem, mantraText: e.target.value })} 
                  />
                </div>
                <button className="btn-primary" style={{ height: '48px', padding: '0 30px' }} onClick={handleAddMantra}>Add Mantra</button>
              </div>
            </div>

            <div className="data-table glass-card">
              <table>
                <thead>
                  <tr>
                    <th>Mantra</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {japaMantras.map(m => (
                    <tr key={m}>
                      <td><strong>{m}</strong></td>
                      <td>
                        <button 
                          className="btn-reject" 
                          onClick={() => {
                            if (japaMantras.length <= 1) {
                              toast.error('You must keep at least one mantra!');
                              return;
                            }
                            setJapaMantras(japaMantras.filter(mantra => mantra !== m));
                            toast.success('Mantra removed successfully!');
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

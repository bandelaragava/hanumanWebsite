import React, { useState } from 'react';
import './SevaBooking.css';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

const SevaBooking = () => {
  const { sevas, bookings, setBookings, darshanSlots, setDarshanSlots } = useData();
  const [activeSection, setActiveSection] = useState('SEVA'); // SEVA, DARSHAN, ACCOMMODATION
  const [step, setStep] = useState('LIST'); // LIST, FORM, SUCCESS
  
  // Seva States
  const [selectedSeva, setSelectedSeva] = useState(null);
  
  // Darshan States
  const [darshanType, setDarshanType] = useState('VIP'); // GENERAL, VIP
  const [selectedSlot, setSelectedSlot] = useState('');
  const [ticketsCount, setTicketsCount] = useState(1);
  
  // Accommodation States
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [nightsCount, setNightsCount] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    gothram: '',
    nakshatram: '',
    date: '',
    email: '',
    phone: '',
    idType: 'Aadhar Card',
    idNumber: '',
    guestsCount: 1,
    checkInDate: '',
    checkOutDate: '',
    specialRequest: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'
  const [generatedBookingId, setGeneratedBookingId] = useState('');

  // Darshan slots come from DataContext (managed by admin)
  // Only show active slots; derive remaining count and full status
  const activeDarshanSlots = darshanSlots
    .filter(s => s.isActive)
    .map(s => ({
      ...s,
      remaining: s.totalCapacity - s.bookedCount,
      effectivelyFull: s.isFull,  // Only admin-controlled — never auto-triggers
    }));

  // Mock Room Accommodations
  const roomTypes = [
    {
      id: 'standard-nonac',
      title: 'Standard Non-AC Room',
      desc: 'Clean and simple non-AC accommodation with twin beds and attached bathroom.',
      price: '₹600',
      priceVal: 600,
      icon: '🛏️',
      features: ['Twin Beds', 'Attached Bathroom', 'Hot Water Geyser', 'Ceiling Fan'],
      capacity: '2 Adults'
    },
    {
      id: 'deluxe-ac',
      title: 'Deluxe AC Room',
      desc: 'Comfortable air-conditioned room with king bed, LED TV, and tea maker.',
      price: '₹1,500',
      priceVal: 1500,
      icon: '🏨',
      features: ['King Bed', 'Split AC', 'LED TV', 'Free Wi-Fi', 'Tea/Coffee Maker'],
      capacity: '3 Adults'
    },
    {
      id: 'vip-suite',
      title: 'VIP Family Suite',
      desc: 'Spacious air-conditioned suite with living room, dining table, and sofa set.',
      price: '₹3,500',
      priceVal: 3500,
      icon: '🌟',
      features: ['King Bed + Sofa Bed', 'AC', 'Mini Fridge', 'Living Area', 'Premium Toiletries'],
      capacity: '4-5 Family Members'
    }
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto-calculate nights if check-in/out dates change
      if (name === 'checkInDate' || name === 'checkOutDate') {
        const checkIn = name === 'checkInDate' ? value : prev.checkInDate;
        const checkOut = name === 'checkOutDate' ? value : prev.checkOutDate;
        if (checkIn && checkOut) {
          const diffTime = Math.abs(new Date(checkOut) - new Date(checkIn));
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
          setNightsCount(diffDays);
        }
      }
      
      return updated;
    });
  };

  const startBookingSeva = (seva) => {
    setSelectedSeva(seva);
    setStep('FORM');
    window.scrollTo(0, 0);
  };

  const startBookingDarshan = (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      toast.error('Please select a Darshan time slot!');
      return;
    }
    setStep('FORM');
    window.scrollTo(0, 0);
  };

  const startBookingRoom = (room) => {
    setSelectedRoom(room);
    setStep('FORM');
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      const isSuccess = Math.random() > 0.03; // 97% success rate
      
      if (isSuccess) {
        const bookingId = `HANU-${Math.floor(Math.random() * 90000) + 10000}`;
        setGeneratedBookingId(bookingId);
        
        // Define title/seva description based on section
        let bookingTitle = '';
        let bookingDate = '';
        if (activeSection === 'SEVA') {
          bookingTitle = `Seva: ${selectedSeva?.title}`;
          bookingDate = formData.date;
        } else if (activeSection === 'DARSHAN') {
          bookingTitle = `${darshanType === 'VIP' ? 'VIP' : 'General'} Darshan Slot: ${selectedSlot}`;
          bookingDate = formData.date;
        } else if (activeSection === 'ACCOMMODATION') {
          bookingTitle = `Room: ${selectedRoom?.title} (${nightsCount} Night${nightsCount > 1 ? 's' : ''})`;
          bookingDate = formData.checkInDate;
        }

        // Save new booking to global DataContext state
        const newBooking = {
          id: bookingId,
          devotee: formData.name,
          seva: bookingTitle,
          date: bookingDate,
          status: 'Confirmed'
        };
        
        setBookings([newBooking, ...bookings]);

        // Increment bookedCount for the chosen darshan slot
        if (activeSection === 'DARSHAN' && selectedSlot) {
          setDarshanSlots(prev => prev.map(s =>
            s.time === selectedSlot
              ? { ...s, bookedCount: s.bookedCount + ticketsCount }
              : s
          ));
        }
        setStep('SUCCESS');
        setStatus('success');
        toast.success('Sacred booking confirmed successfully!');
      } else {
        setStatus('error');
        toast.error('Booking failed. Please try again.');
      }
      window.scrollTo(0, 0);
    }, 1500);
  };

  // Helper to calculate total price
  const calculateTotalPrice = () => {
    if (activeSection === 'SEVA') {
      return selectedSeva?.price || '';
    } else if (activeSection === 'DARSHAN') {
      return darshanType === 'VIP' ? `₹${ticketsCount * 100}` : 'Free';
    } else if (activeSection === 'ACCOMMODATION') {
      if (!selectedRoom) return '';
      const priceVal = selectedRoom.priceVal;
      return `₹${priceVal * nightsCount}`;
    }
    return '';
  };

  return (
    <div className="seva-booking-page animate-fade-in">
      <div className="seva-hero">
        <div className="container">
          <h1>Sacred Temple Bookings</h1>
          <p>Seek the divine blessings of Lord Hanuman by reserving your Sevas, Darshan slots, or temple guest house accommodation.</p>
        </div>
      </div>

      {/* Modern Tabs Navigation */}
      {step === 'LIST' && (
        <div className="container tab-navigation">
          <div className="booking-tabs glass-card">
            <button 
              className={`tab-btn ${activeSection === 'SEVA' ? 'active' : ''}`}
              onClick={() => setActiveSection('SEVA')}
            >
              🪔 Pujas & Sevas
            </button>
            <button 
              className={`tab-btn ${activeSection === 'DARSHAN' ? 'active' : ''}`}
              onClick={() => setActiveSection('DARSHAN')}
            >
              🕉️ Special Darshan
            </button>
            <button 
              className={`tab-btn ${activeSection === 'ACCOMMODATION' ? 'active' : ''}`}
              onClick={() => setActiveSection('ACCOMMODATION')}
            >
              🏨 Accommodation
            </button>
          </div>
        </div>
      )}

      <div className="container seva-container">
        {step === 'LIST' && (
          <div className="booking-list-wrapper">
            
            {/* 1. SEVA BOOKING SELECTION */}
            {activeSection === 'SEVA' && (
              <div className="seva-selection">
                <h2 className="section-title">Available Sevas</h2>
                <p className="section-subtitle">Book sacred rituals conducted by Vedic priests to appease Lord Hanuman.</p>
                <div className="seva-grid">
                  {sevas.map((seva) => (
                    <div key={seva.id} className="seva-card glass-card">
                      <div className="seva-icon">{seva.icon}</div>
                      <h3>{seva.title}</h3>
                      <p className="seva-desc">{seva.desc}</p>
                      <div className="seva-benefits">
                        <strong>Benefits:</strong> {seva.benefits}
                      </div>
                      <div className="seva-footer">
                        <span className="price">{seva.price}</span>
                        <button className="btn-primary" onClick={() => startBookingSeva(seva)}>Book Now</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. DARSHAN BOOKING SELECTION */}
            {activeSection === 'DARSHAN' && (
              <div className="darshan-selection-wrapper glass-card">
                <h2 className="section-title">Book Darshan Slot</h2>
                <p className="section-subtitle">Reserve a specific date and time slot to visit the temple and seek fast-track entry.</p>
                
                <form onSubmit={startBookingDarshan} className="darshan-selection-form">
                  <div className="darshan-options-row">
                    <div className="form-group">
                      <label>Darshan Entry Type</label>
                      <div className="darshan-type-selector">
                        <label className={`type-card ${darshanType === 'GENERAL' ? 'active' : ''}`}>
                          <input 
                            type="radio" 
                            name="darshanType" 
                            checked={darshanType === 'GENERAL'} 
                            onChange={() => setDarshanType('GENERAL')} 
                          />
                          <div className="type-info">
                            <span className="t-title">General Darshan</span>
                            <span className="t-price">Free Entry</span>
                          </div>
                        </label>
                        <label className={`type-card ${darshanType === 'VIP' ? 'active' : ''}`}>
                          <input 
                            type="radio" 
                            name="darshanType" 
                            checked={darshanType === 'VIP'} 
                            onChange={() => setDarshanType('VIP')} 
                          />
                          <div className="type-info">
                            <span className="t-title">VIP Special Darshan</span>
                            <span className="t-price">₹100 / Devotee</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Select Darshan Date</label>
                      <input 
                        type="date" 
                        name="date" 
                        required 
                        min={new Date().toISOString().split('T')[0]}
                        onChange={handleFormChange} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Number of Devotees</label>
                      <select 
                        name="guestsCount" 
                        value={ticketsCount} 
                        onChange={(e) => setTicketsCount(parseInt(e.target.value))}
                        className="form-select-input"
                      >
                        <option value="1">1 Devotee</option>
                        <option value="2">2 Devotees</option>
                        <option value="3">3 Devotees</option>
                        <option value="4">4 Devotees</option>
                        <option value="5">5 Devotees</option>
                      </select>
                    </div>
                  </div>

                   <div className="form-group">
                    <label>Select Time Slot</label>
                    {activeDarshanSlots.length === 0 ? (
                      <div style={{padding:'1.5rem', textAlign:'center', opacity:0.6, border:'1px dashed var(--glass-border)', borderRadius:'12px'}}>
                        🕉️ No time slots are currently available. Please check back later.
                      </div>
                    ) : (
                      <div className="slots-grid">
                        {activeDarshanSlots.map((slot) => {
                          const isSelected = selectedSlot === slot.time;
                          const isFull = slot.effectivelyFull;
                          const isLimited = !isFull && slot.remaining <= 20;
                          return (
                            <button
                              key={slot.id}
                              type="button"
                              className={`slot-card ${
                                isSelected ? 'selected' : ''
                              } ${
                                isFull ? 'full' : isLimited ? 'limited' : ''
                              }`}
                              disabled={isFull}
                              onClick={() => setSelectedSlot(slot.time)}
                            >
                              <span className="slot-time">{slot.time}</span>
                              <span className={`slot-status ${
                                isFull ? 'full' : isLimited ? 'limited' : 'available'
                              }`}>
                                {isFull
                                  ? '🚫 Quota Full'
                                  : isLimited
                                  ? `⚠️ ${slot.remaining} left`
                                  : `✅ ${slot.remaining} tickets left`}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="darshan-submit-row">
                    {darshanType === 'VIP' && (
                      <div className="total-tickets-price">
                        Total Ticket Amount: <strong>₹{ticketsCount * 100}</strong>
                      </div>
                    )}
                    <button type="submit" className="btn-primary">Proceed to Devotee Details</button>
                  </div>
                </form>
              </div>
            )}

            {/* 3. ACCOMMODATION BOOKING SELECTION */}
            {activeSection === 'ACCOMMODATION' && (
              <div className="accommodation-selection">
                <h2 className="section-title">Temple Accommodation</h2>
                <p className="section-subtitle">Comfortable guest house rooms available within the temple premises for peaceful overnight stays.</p>
                <div className="seva-grid">
                  {roomTypes.map((room) => (
                    <div key={room.id} className="seva-card glass-card">
                      <div className="seva-icon">{room.icon}</div>
                      <h3>{room.title}</h3>
                      <p className="seva-desc">{room.desc}</p>
                      
                      <div className="room-features">
                        <strong>Room Features:</strong>
                        <div className="features-tags">
                          {room.features.map((f, i) => <span key={i} className="feature-tag">{f}</span>)}
                        </div>
                      </div>

                      <div className="room-capacity">
                        👤 Max Capacity: <strong>{room.capacity}</strong>
                      </div>

                      <div className="seva-footer">
                        <div className="room-price-box">
                          <span className="price">{room.price}</span>
                          <span className="price-unit">/ Night</span>
                        </div>
                        <button className="btn-primary" onClick={() => startBookingRoom(room)}>Book Room</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* --- BOOKING DETAIL REGISTRATION FORM --- */}
        {step === 'FORM' && (
          <div className="booking-form-wrapper glass-card">
            <button className="btn-back" onClick={() => setStep('LIST')}>← Back to Selection</button>
            <div className="booking-layout">
              <div className="form-section">
                <h3>Devotee & Contact Information</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Primary Devotee Name</label>
                      <input type="text" name="name" required placeholder="Full Name" onChange={handleFormChange} />
                    </div>
                    <div className="form-group">
                      <label>Gothram</label>
                      <input type="text" name="gothram" placeholder="Srivatsa / Bharadwaja (Optional)" onChange={handleFormChange} />
                    </div>
                  </div>

                  {activeSection === 'SEVA' && (
                    <div className="form-row">
                      <div className="form-group">
                        <label>Nakshatram</label>
                        <input type="text" name="nakshatram" placeholder="Rohini / Ashwini (Optional)" onChange={handleFormChange} />
                      </div>
                      <div className="form-group">
                        <label>Ritual Date</label>
                        <input type="date" name="date" required min={new Date().toISOString().split('T')[0]} onChange={handleFormChange} />
                      </div>
                    </div>
                  )}

                  {activeSection === 'ACCOMMODATION' && (
                    <div className="form-row">
                      <div className="form-group">
                        <label>Check-in Date</label>
                        <input type="date" name="checkInDate" required min={new Date().toISOString().split('T')[0]} onChange={handleFormChange} />
                      </div>
                      <div className="form-group">
                        <label>Check-out Date</label>
                        <input type="date" name="checkOutDate" required min={formData.checkInDate || new Date().toISOString().split('T')[0]} onChange={handleFormChange} />
                      </div>
                    </div>
                  )}

                  {activeSection === 'DARSHAN' && (
                    <div className="form-row">
                      <div className="form-group">
                        <label>Identity Proof Type</label>
                        <select name="idType" className="form-select-input" onChange={handleFormChange}>
                          <option value="Aadhar Card">Aadhar Card</option>
                          <option value="Voter ID">Voter ID Card</option>
                          <option value="PAN Card">PAN Card</option>
                          <option value="Passport">Passport</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>ID Proof Document Number</label>
                        <input type="text" name="idNumber" required placeholder="XXXX XXXX XXXX" onChange={handleFormChange} />
                      </div>
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" name="email" required placeholder="email@example.com" onChange={handleFormChange} />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="tel" name="phone" required placeholder="+91 00000 00000" onChange={handleFormChange} />
                    </div>
                  </div>

                  {activeSection === 'ACCOMMODATION' && (
                    <div className="form-group">
                      <label>Special Guest Requests</label>
                      <input type="text" name="specialRequest" placeholder="Ground floor room, extra mattress, etc. (Optional)" onChange={handleFormChange} />
                    </div>
                  )}

                  <div className="payment-notice">
                    <p>✨ Total Booking Amount: <strong>{calculateTotalPrice()}</strong></p>
                    <span>By clicking confirm, you agree to abide by the temple sanctity regulations and traditions.</span>
                  </div>
                  
                  <button type="submit" className="btn-primary w-full" disabled={isProcessing}>
                    {isProcessing ? 'Processing Sacred Booking...' : 'Confirm & Reserve'}
                  </button>
                </form>
                
                {isProcessing && (
                  <div className="form-processing-overlay">
                    <div className="spinner"></div>
                  </div>
                )}
              </div>
              
              <div className="summary-sidebar">
                <div className="selected-seva-summary glass-card">
                  {activeSection === 'SEVA' && (
                    <>
                      <h4>Selected Seva</h4>
                      <div className="s-summary-icon">{selectedSeva?.icon}</div>
                      <h5>{selectedSeva?.title}</h5>
                      <p>{selectedSeva?.desc}</p>
                    </>
                  )}
                  {activeSection === 'DARSHAN' && (
                    <>
                      <h4>Darshan Details</h4>
                      <div className="s-summary-icon">🕉️</div>
                      <h5>{darshanType === 'VIP' ? 'VIP Special Darshan' : 'General Entry Darshan'}</h5>
                      <p className="summary-slot-info">Slot: <strong>{selectedSlot}</strong></p>
                      <p className="summary-slot-info">Tickets: <strong>{ticketsCount} Devotee(s)</strong></p>
                      {formData.date && <p className="summary-slot-info">Date: <strong>{formData.date}</strong></p>}
                    </>
                  )}
                  {activeSection === 'ACCOMMODATION' && (
                    <>
                      <h4>Room Selection</h4>
                      <div className="s-summary-icon">{selectedRoom?.icon}</div>
                      <h5>{selectedRoom?.title}</h5>
                      <p>{selectedRoom?.desc}</p>
                      {nightsCount > 0 && <p className="summary-slot-info">Duration: <strong>{nightsCount} Night(s)</strong></p>}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- BOOKING SUCCESS STATUS MODULE --- */}
        {step === 'SUCCESS' && (
          <div className="booking-status glass-card animate-fade-in">
            {status === 'success' ? (
              <div className="status-success">
                <div className="success-icon">✅</div>
                <h2>Booking Successfully Confirmed!</h2>
                <p>Your booking has been registered in the temple system. A digital confirmation voucher and receipt have been generated for your record.</p>
                <div className="booking-summary-box">
                  {activeSection === 'SEVA' && (
                    <>
                      <p><strong>Sacred Seva:</strong> {selectedSeva?.title}</p>
                      <p><strong>Devotee Gothram:</strong> {formData.gothram || 'N/A'}</p>
                      <p><strong>Ritual Date:</strong> {formData.date}</p>
                    </>
                  )}
                  {activeSection === 'DARSHAN' && (
                    <>
                      <p><strong>Darshan Entry:</strong> {darshanType === 'VIP' ? 'VIP Quick Darshan' : 'General entry'}</p>
                      <p><strong>Time Slot:</strong> {selectedSlot}</p>
                      <p><strong>Total Devotees:</strong> {ticketsCount} Ticket(s)</p>
                      <p><strong>Darshan Date:</strong> {formData.date}</p>
                    </>
                  )}
                  {activeSection === 'ACCOMMODATION' && (
                    <>
                      <p><strong>Room Category:</strong> {selectedRoom?.title}</p>
                      <p><strong>Check-in Date:</strong> {formData.checkInDate}</p>
                      <p><strong>Check-out Date:</strong> {formData.checkOutDate}</p>
                      <p><strong>Total Duration:</strong> {nightsCount} Night(s)</p>
                    </>
                  )}
                  <p><strong>Primary Devotee:</strong> {formData.name}</p>
                  <p><strong>Booking ID:</strong> <span className="highlight-booking-id">{generatedBookingId}</span></p>
                  <p><strong>Status:</strong> <span className="status-badge-confirmed">Confirmed</span></p>
                </div>
                <button className="btn-primary" onClick={() => setStep('LIST')}>Book Another Service</button>
              </div>
            ) : (
              <div className="status-error">
                <div className="error-icon">⚠️</div>
                <h2>Booking Process Issue</h2>
                <p>We encountered an issue while booking your selected services. No amount was charged. Please check availability and try again.</p>
                <button className="btn-primary" onClick={() => setStep('FORM')}>Try Again</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SevaBooking;

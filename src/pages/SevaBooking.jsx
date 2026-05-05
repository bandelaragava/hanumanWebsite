import React, { useState } from 'react';
import './SevaBooking.css';

const SevaBooking = () => {
  const [step, setStep] = useState('LIST'); // LIST, FORM, SUCCESS
  const [selectedSeva, setSelectedSeva] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    gothram: '',
    nakshatram: '',
    date: '',
    email: '',
    phone: ''
  });

  const sevas = [
    { 
      id: 1, 
      title: 'Tailabhishekam', 
      desc: 'Oil abhishekam to Lord Hanuman to remove Shani Dosha.', 
      price: '₹501', 
      icon: '🛢️',
      benefits: 'Health, relief from debt, protection from negative energies.'
    },
    { 
      id: 2, 
      title: 'Vada Mala Seva', 
      desc: 'Garland made of Vadas offered to appease the Lord.', 
      price: '₹1116', 
      icon: '🌿',
      benefits: 'Success in ventures, courage, and family well-being.'
    },
    { 
      id: 3, 
      title: 'Deepa Seva', 
      desc: 'Lighting lamps in the temple premises.', 
      price: '₹101', 
      icon: '🪔',
      benefits: 'Mental peace, clarity of thought, and enlightenment.'
    },
    { 
      id: 4, 
      title: 'Sindoor Seva', 
      desc: 'Offering Sindoor (vermilion) to the Lord.', 
      price: '₹251', 
      icon: '🧂',
      benefits: 'Long life for spouse, marital harmony, and prosperity.'
    },
  ];

  const handleBookNow = (seva) => {
    setSelectedSeva(seva);
    setStep('FORM');
    window.scrollTo(0, 0);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('SUCCESS');
    window.scrollTo(0, 0);
  };

  return (
    <div className="seva-booking-page animate-fade-in">
      <div className="seva-hero">
        <div className="container">
          <h1>Sacred Seva Booking</h1>
          <p>Book your rituals and pujas to seek divine blessings of Lord Hanuman.</p>
        </div>
      </div>

      <div className="container seva-container">
        {step === 'LIST' && (
          <div className="seva-selection">
            <h2 className="section-title">Available Sevas</h2>
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
                    <button className="btn-primary" onClick={() => handleBookNow(seva)}>Book Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'FORM' && (
          <div className="booking-form-wrapper glass-card">
            <button className="btn-back" onClick={() => setStep('LIST')}>← Back to Sevas</button>
            <div className="booking-layout">
              <div className="form-section">
                <h3>Devotee Details</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Primary Name</label>
                      <input type="text" name="name" required placeholder="Full Name" onChange={handleFormChange} />
                    </div>
                    <div className="form-group">
                      <label>Gothram</label>
                      <input type="text" name="gothram" required placeholder="Srivatsa / Bharadwaja..." onChange={handleFormChange} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nakshatram</label>
                      <input type="text" name="nakshatram" placeholder="Rohini / Ashwini..." onChange={handleFormChange} />
                    </div>
                    <div className="form-group">
                      <label>Preferred Date</label>
                      <input type="date" name="date" required onChange={handleFormChange} />
                    </div>
                  </div>
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
                  <div className="payment-notice">
                    <p>✨ Total Amount: <strong>{selectedSeva?.price}</strong></p>
                    <span>By clicking confirm, you agree to follow temple traditions during the Seva.</span>
                  </div>
                  <button type="submit" className="btn-primary w-full">Confirm & Pay</button>
                </form>
              </div>
              <div className="summary-sidebar">
                <div className="selected-seva-summary glass-card">
                  <h4>Selected Seva</h4>
                  <div className="s-summary-icon">{selectedSeva?.icon}</div>
                  <h5>{selectedSeva?.title}</h5>
                  <p>{selectedSeva?.desc}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'SUCCESS' && (
          <div className="booking-success glass-card">
            <div className="success-icon">✅</div>
            <h2>Booking Confirmed!</h2>
            <p>Your Seva has been successfully booked. A confirmation and e-receipt have been sent to your email.</p>
            <div className="booking-summary-box">
              <p><strong>Seva:</strong> {selectedSeva?.title}</p>
              <p><strong>Devotee:</strong> {formData.name}</p>
              <p><strong>Date:</strong> {formData.date}</p>
              <p><strong>Booking ID:</strong> HANU-{Math.floor(Math.random() * 90000) + 10000}</p>
            </div>
            <button className="btn-primary" onClick={() => setStep('LIST')}>Book Another Seva</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SevaBooking;

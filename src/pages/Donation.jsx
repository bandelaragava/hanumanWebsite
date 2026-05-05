import React, { useState } from 'react';
import './Donation.css';

const Donation = () => {
  const [amount, setAmount] = useState('');
  const [selectedTier, setSelectedTier] = useState(null);
  const [step, setStep] = useState(1); // 1: Amount, 2: Details, 3: Payment Mock

  const tiers = [
    { label: 'Basic Seva', amount: 501, icon: '🙏' },
    { label: 'Annadanam', amount: 1116, icon: '🍲' },
    { label: 'Deepa Seva', amount: 2100, icon: '🪔' },
    { label: 'Kalyanotsavam', amount: 5001, icon: '💍' },
    { label: 'Temple Dev', amount: 11000, icon: '🧱' },
    { label: 'Main Patron', amount: 25000, icon: '🔱' },
  ];

  const handleTierClick = (tier) => {
    setSelectedTier(tier.amount);
    setAmount(tier.amount);
  };

  const handleNext = () => {
    if (amount) setStep(step + 1);
  };

  return (
    <div className="donation-page animate-fade-in">
      <div className="donation-hero">
        <div className="container">
          <h1>Support Your <span>Sacred Temple</span></h1>
          <p>Your contribution helps us preserve our heritage and serve the community through spiritual and social activities.</p>
        </div>
      </div>

      <div className="container donation-container">
        <div className="donation-card glass-card">
          <div className="donation-progress">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1. Amount</div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2. Info</div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3. Payment</div>
          </div>

          {step === 1 && (
            <div className="step-content">
              <h3>Select Donation Amount</h3>
              <div className="donation-tiers">
                {tiers.map((tier) => (
                  <div 
                    key={tier.label}
                    className={`tier-card ${selectedTier === tier.amount ? 'selected' : ''}`}
                    onClick={() => handleTierClick(tier)}
                  >
                    <span className="tier-icon">{tier.icon}</span>
                    <span className="tier-amount">₹{tier.amount}</span>
                    <span className="tier-label">{tier.label}</span>
                  </div>
                ))}
              </div>
              <div className="custom-amount">
                <label>Or Enter Custom Amount (₹)</label>
                <input 
                  type="number" 
                  placeholder="Enter amount" 
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setSelectedTier(null);
                  }}
                />
              </div>
              <button className="btn-primary btn-full" onClick={handleNext}>Continue</button>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h3>Donor Information</h3>
              <form className="donation-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Full Name (for Receipt)</label>
                  <input type="text" placeholder="Lord Hanuman's Devotee" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="devotee@temple.com" required />
                </div>
                <div className="form-group">
                  <label>Donation Purpose</label>
                  <select>
                    <option>General Donation</option>
                    <option>Annadanam (Food Service)</option>
                    <option>Temple Construction</option>
                    <option>Goshala (Cow Protection)</option>
                    <option>Festival Fund</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button className="btn-outline" onClick={() => setStep(1)}>Back</button>
                  <button className="btn-primary" onClick={handleNext}>Proceed to Pay ₹{amount}</button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="step-content payment-mock">
              <h3>Secure Payment Gateway</h3>
              <div className="qr-section">
                <div className="qr-placeholder">
                  <span className="qr-icon">📱</span>
                  <p>Scan to Pay with UPI</p>
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=HanumanTempleUPI" alt="QR Code" />
                </div>
                <div className="payment-options">
                  <p>Or use other methods:</p>
                  <div className="payment-icons">
                    <span>💳 Card</span>
                    <span>🏦 Net Banking</span>
                    <span>💰 Wallet</span>
                  </div>
                </div>
              </div>
              <div className="trust-badges">
                <span>🔒 SSL Secured</span>
                <span>✅ Tax Benefit (80G)</span>
              </div>
              <button className="btn-primary btn-full" onClick={() => alert('Jai Shri Ram! Donation Successful.')}>Confirm Payment</button>
            </div>
          )}
        </div>

        <div className="donation-info-sidebar">
          <div className="info-card glass-card">
            <h4>🙏 Why Your Support Matters</h4>
            <ul>
              <li>Daily rituals and upkeep of the sacred deity.</li>
              <li>Free meals (Annadanam) for over 500 pilgrims daily.</li>
              <li>Preservation of ancient Vedic traditions and scriptures.</li>
              <li>Support for local orphanages and spiritual education.</li>
            </ul>
          </div>
          <div className="info-card glass-card">
            <h4>📜 Tax Benefits</h4>
            <p>Donations to our temple trust are eligible for tax exemption under Section 80G of the Income Tax Act.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;

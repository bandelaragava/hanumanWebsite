import React from 'react';
import './Contact.css';
import toast from 'react-hot-toast';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you for your message! We will get back to you soon.');
    e.target.reset();
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We are here to assist you in your spiritual journey.</p>
        </div>
      </section>

      <section className="contact-content container">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-item glass-card">
              <span className="icon">📍</span>
              <div>
                <h3>Our Location</h3>
                <p>Divine Path, Spiritual Nagar, Hyderabad, Telangana 500001</p>
              </div>
            </div>
            <div className="info-item glass-card">
              <span className="icon">📞</span>
              <div>
                <h3>Phone Numbers</h3>
                <p>General: +91 98765 43210</p>
                <p>Seva Booking: +91 98765 43211</p>
              </div>
            </div>
            <div className="info-item glass-card">
              <span className="icon">✉️</span>
              <div>
                <h3>Email Address</h3>
                <p>blessings@hanumantemple.com</p>
                <p>support@hanumantemple.com</p>
              </div>
            </div>
            <div className="info-item glass-card">
              <span className="icon">⏰</span>
              <div>
                <h3>Office Hours</h3>
                <p>Daily: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container glass-card">
            <h3>Send us a Message</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select>
                  <option>General Inquiry</option>
                  <option>Seva Booking Help</option>
                  <option>Donation Query</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <section className="map-section container">
        <div className="map-placeholder glass-card">
          <span className="icon">🗺️</span>
          <p>Google Maps Integration Placeholder</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Devotion from './pages/Devotion';
import JapaCounter from './pages/JapaCounter';
import SevaBooking from './pages/SevaBooking';
import YouthSection from './pages/YouthSection';
import Donation from './pages/Donation';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { Store, LiveExperience } from './pages/AdditionalSections';
import ScrollToTop from './components/ScrollToTop';
import AIGuide from './components/AIGuide';

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="app">
        <ScrollToTop />
        <Navbar />
        <AIGuide />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/devotion" element={<Devotion />} />
            <Route path="/seva" element={<SevaBooking />} />
            <Route path="/youth" element={<YouthSection />} />
            <Route path="/store" element={<Store />} />
            <Route path="/donate" element={<Donation />} />
            <Route path="/live" element={<LiveExperience />} />
            <Route path="/japa" element={<JapaCounter />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>

          {/* Footer */}
          <footer className="footer">
            <div className="container footer-content">
              <div className="footer-brand">
                <h2>Hanuman Temple</h2>
                <p>The symbol of Shakti, Bhakti, and Mukti. Dedicated to serving devotees since 1945.</p>
                <div className="social-links">
                  <span className="social-icon">📹</span>
                  <span className="social-icon">📸</span>
                  <span className="social-icon">📘</span>
                  <span className="social-icon">✖️</span>
                </div>
              </div>
              <div className="footer-links">
                <h4>Quick Links</h4>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About Temple</Link></li>
                  <li><Link to="/devotion">Devotion Center</Link></li>
                  <li><Link to="/japa">Japa Mala</Link></li>
                </ul>
              </div>
              <div className="footer-links">
                <h4>Devotee Services</h4>
                <ul>
                  <li><Link to="/seva">Book Seva</Link></li>
                  <li><Link to="/store">Temple Shop</Link></li>
                  <li><Link to="/live">Live Darshan</Link></li>
                  <li><Link to="/contact">Contact Support</Link></li>
                </ul>
              </div>
              <div className="footer-contact">
                <h4>Visit Us</h4>
                <p>📍 Divine Path, Spiritual Nagar, Hyderabad</p>
                <p>📞 +91 98765 43210</p>
                <p>✉️ blessings@hanumantemple.com</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 Hanuman Temple Digital Presence. All Rights Reserved.</p>
              <div className="legal-links">
                <span>Privacy Policy</span> | <span>Terms of Use</span> | <span>80G Info</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;


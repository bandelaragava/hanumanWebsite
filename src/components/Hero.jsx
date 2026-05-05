import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = ({ heroImage }) => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-overlay"></div>
      <img src={heroImage} alt="Majestic Hanuman" className="hero-bg-image" />
      
      <div className="container hero-content animate-fade-in">
        <h1 className="hero-title">
          Divine Strength <br />
          <span>Infinite Protection</span>
        </h1>
        <p className="hero-subtitle">
          Experience the spiritual energy of Lord Hanuman, the ultimate symbol of devotion, courage, and selfless service.
        </p>
        <div className="hero-actions">
          <Link to="/devotion" className="btn-primary">Explore Devotion</Link>
          <Link to="/live" className="btn-outline">Watch Live Aarti</Link>
        </div>
        
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-value">12.4M+</span>
            <span className="stat-label">Global Japams</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">50K+</span>
            <span className="stat-label">Daily Devotees</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">100+</span>
            <span className="stat-label">Temple Sevas</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

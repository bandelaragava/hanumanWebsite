import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import './Hero.css';

const Hero = ({ heroImage }) => {
  const { heroContent } = useData();

  return (
    <section className="hero-section" id="home">
      <div className="hero-overlay"></div>
      <img src={heroImage} alt="Majestic Hanuman" className="hero-bg-image" />
      
      <div className="container hero-content animate-fade-in">
        <div className="hero-top-row">
          <div className="hero-text-side">
            <h1 className="hero-title" style={{ whiteSpace: 'pre-line' }}>
              {heroContent.title}
            </h1>
            <p className="hero-subtitle">
              {heroContent.subtitle}
            </p>
          </div>
          <div className="hero-actions-side">
            <div className="hero-actions">
              <Link to="/devotion" className="btn-primary">Explore Devotion</Link>
              <Link to="/live" className="btn-outline">Watch Live Aarti</Link>
            </div>
          </div>
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import heroImg from '../assets/hero.png';
import legendImg from '../assets/hanuman_legend.png';
import { useData } from '../context/DataContext';
import './Home.css';

const Home = () => {
  const { timings, events } = useData();
  const [selectedProblem, setSelectedProblem] = useState(null);

  const problems = [
    { id: 'health', icon: '🙏', label: 'Health', mantra: 'Om Ham Hanumate Namaha', pooja: 'Tailabhishekam', day: 'Tuesday' },
    { id: 'job', icon: '💼', label: 'Job/Career', mantra: 'Sakal Mangal Mangalye...', pooja: 'Vada Mala Seva', day: 'Saturday' },
    { id: 'fear', icon: '😟', label: 'Fear/Anxiety', mantra: 'Hanuman Chalisa Path', pooja: 'Deepa Seva', day: 'Everyday' },
    { id: 'court', icon: '⚖️', label: 'Court Cases', mantra: 'Sankat Mochan Ashtak', pooja: 'Sindoor Seva', day: 'Tuesday' },
  ];

  const selection = problems.find(p => p.id === selectedProblem);

  return (
    <div className="home-page">
      <Hero heroImage={heroImg} />
      
      <section className="divine-story container">
        <div className="story-grid">
          <div className="story-image-container">
            <img src={legendImg} alt="Lord Hanuman Legend" className="story-img" />
            <div className="img-caption">“Manojavam Maruta Tulya Vegam...”</div>
          </div>
          <div className="story-content">
            <h2 className="section-title" style={{textAlign: 'left'}}>The Divine Legend</h2>
            <p className="story-text">
              Lord Hanuman, the son of Anjana and Kesari, and the spiritual child of the Wind God (Vayu), 
              is the quintessential symbol of <strong>strength, devotion, and humility</strong>. 
              Known as the 'Sankat Mochan', he is the one who dispels all sorrows and protects his 
              devotees from every obstacle. 
            </p>
            <p className="story-text">
              Our temple stands on a ground sanctified by centuries of prayers. Legend says that the 
              main idol was self-manifested (Swayambhu) and was discovered by a sage during deep 
              meditation. Today, it serves as a beacon of hope and spiritual power for thousands 
              who visit daily to seek the blessings of the 'Bajrangbali'.
            </p>
            <div className="temple-brief">
              <div className="brief-item">
                <strong>📍 Sacred Location:</strong>
                <span>Seated in the heart of the spiritual valley, radiating peace.</span>
              </div>
              <div className="brief-item">
                <strong>🕉️ Spiritual Power:</strong>
                <span>A powerful center for Hanuman Chalisa and Sundarkand recitations.</span>
              </div>
            </div>
            <Link to="/about" className="btn-primary" style={{marginTop: '1.5rem', display: 'inline-block'}}>Read Full History</Link>
          </div>
        </div>
      </section>

      <section className="sankat-mochan container">
        <h2 className="section-title">Sankat Mochan Solutions</h2>
        <p className="section-subtitle">Find divine solutions to your life problems through specific Hanuman Sevas and Mantras.</p>

        <div className="problem-selector">
          <div className="problem-grid">
            {problems.map((p) => (
              <div 
                key={p.id}
                className={`problem-card glass-card ${selectedProblem === p.id ? 'active' : ''}`}
                onClick={() => setSelectedProblem(p.id)}
              >
                <span className="problem-icon">{p.icon}</span>
                <span className="problem-label">{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        {selection && (
          <div className="solution-display glass-card animate-fade-in">
            <div className="solution-content">
              <h3>Divine Solution for {selection.label}</h3>
              <div className="solution-details">
                <div className="detail-item">
                  <span>Mantra:</span>
                  <strong>{selection.mantra}</strong>
                </div>
                <div className="detail-item">
                  <span>Pooja:</span>
                  <strong>{selection.pooja}</strong>
                </div>
                <div className="detail-item">
                  <span>Day:</span>
                  <strong>{selection.day}</strong>
                </div>
              </div>
              <Link to="/seva" className="btn-primary">Book Seva Now</Link>
            </div>
          </div>
        )}
      </section>

      <section className="welcome-section container">
        <div className="welcome-content">
          <h2 className="section-title">Explore Our Temple</h2>
          <p className="section-subtitle">
            Immerse yourself in the various services and spiritual offerings designed to 
            enrich your soul and strengthen your faith.
          </p>
          <div className="home-features">
            <div className="feature-card">
              <span className="feature-icon">🕉️</span>
              <h3>Daily Darshan</h3>
              <p>Experience the divine energy through our daily rituals and darshan.</p>
              <Link to="/devotion" className="text-link">Learn More →</Link>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🙏</span>
              <h3>Seva Opportunities</h3>
              <p>Participate in various sevas and contribute to the temple community.</p>
              <Link to="/seva" className="text-link">Book Now →</Link>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📖</span>
              <h3>Spiritual Wisdom</h3>
              <p>Explore our library of mantras, chalisa, and spiritual teachings.</p>
              <Link to="/devotion" className="text-link">Explore →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="timings-section">
        <div className="container">
          <div className="timings-grid">
            <div className="timings-info">
              <h2 className="section-title" style={{textAlign: 'left'}}>Temple Timings</h2>
              <p>Join us for daily rituals and experience the divine energy.</p>
              <div className="timing-list">
                {timings.map((t) => (
                  <div key={t.id} className={`timing-item ${t.highlighting ? 'highlighting' : ''}`}>
                    <span className="timing-name">{t.name}</span>
                    <span className="timing-value">{t.value}</span>
                  </div>
                ))}
              </div>
              <Link to="/live" className="btn-primary" style={{marginTop: '2rem', display: 'inline-block'}}>Watch Live Aarti</Link>
            </div>
            <div className="panchangam-card glass-card">
              <h3>Today's Panchangam</h3>
              <div className="panchang-details">
                <div className="p-item"><span>Tithi:</span> <strong>Ekadashi</strong></div>
                <div className="p-item"><span>Nakshatram:</span> <strong>Rohini</strong></div>
                <div className="p-item"><span>Yogam:</span> <strong>Sadhya</strong></div>
                <div className="p-item"><span>Karanam:</span> <strong>Bava</strong></div>
              </div>
              <div className="sun-timings">
                <div className="sun-item">🌅 Sunrise: 6:05 AM</div>
                <div className="sun-item">🌇 Sunset: 6:32 PM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="events-section container">
        <h2 className="section-title">Upcoming Events</h2>
        <p className="section-subtitle">Stay updated with the latest celebrations and spiritual gatherings.</p>
        <div className="events-grid">
          {events.map((e) => (
            <div key={e.id} className="event-card glass-card">
              <div className="event-date">
                <span className="day">{e.date}</span>
                <span className="month">{e.month}</span>
              </div>
              <div className="event-content">
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

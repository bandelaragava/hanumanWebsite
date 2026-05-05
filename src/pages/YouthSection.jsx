import React from 'react';
import './YouthSection.css';

const YouthSection = () => {
  return (
    <section className="youth-section" id="youth">
      <div className="container">
        <h2 className="section-title">Youth, Strength & Power</h2>
        <p className="section-subtitle">Hanuman is the ultimate role model for discipline, focus, and physical fitness.</p>

        <div className="youth-grid">
          <div className="youth-content glass-card animate-fade-in">
            <div className="content-badge">Role Model</div>
            <h3>Fitness Inspiration</h3>
            <p>Embody the strength of Bajrangbali. Learn how to combine physical training with spiritual discipline.</p>
            <ul className="tips-list">
              <li>💪 <strong>Strength:</strong> Hanuman as the master of bodybuilding and wrestlers.</li>
              <li>🧘 <strong>Discipline:</strong> The power of Brahmacharya (celibacy) for focus.</li>
              <li>🧠 <strong>Mental Focus:</strong> Chanting for concentration during training.</li>
            </ul>
            <button className="btn-primary" onClick={() => window.location.href = '#contact'}>Join Fitness Program</button>
          </div>

          <div className="youth-image-container">
            <div className="image-overlay-text">
              "Focus is the key to Infinite Power"
            </div>
            {/* Image placeholder or actual generated image */}
            <div className="fitness-stats glass-card">
              <div className="stat">
                <span>Core Power</span>
                <div className="bar"><div className="fill" style={{width: '95%'}}></div></div>
              </div>
              <div className="stat">
                <span>Mental Clarity</span>
                <div className="bar"><div className="fill" style={{width: '100%'}}></div></div>
              </div>
              <div className="stat">
                <span>Devotion</span>
                <div className="bar"><div className="fill" style={{width: '100%'}}></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouthSection;

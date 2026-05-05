import React from 'react';
import './AdditionalSections.css';
import storeImg from '../assets/store.png';
import altarImg from '../assets/altar.png';

export const Store = () => {
  const products = [
    { name: 'Bronze Hanuman Idol', price: '₹4,999', img: storeImg },
    { name: 'Siddha Rudraksha Mala', price: '₹1,250', img: storeImg },
    { name: 'Hanuman Chalisa Gold Edition', price: '₹850', img: storeImg },
  ];

  return (
    <section className="store-section" id="store">
      <div className="container">
        <h2 className="section-title">Hanuman Divine Store</h2>
        <p className="section-subtitle">Take home a symbol of strength and protection.</p>
        
        <div className="product-grid">
          {products.map((p, i) => (
            <div key={i} className="product-card glass-card">
              <div className="product-image">
                <img src={p.img} alt={p.name} />
              </div>
              <h4>{p.name}</h4>
              <p className="price">{p.price}</p>
              <button className="btn-primary" onClick={() => alert(`${p.name} added to cart!`)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const LiveExperience = () => {
  return (
    <section className="live-section" id="live">
      <div className="container">
        <h2 className="section-title">Live Hanuman Energy</h2>
        <p className="section-subtitle">Connect with the temple spirit from anywhere in the world.</p>
        
        <div className="live-grid">
          <div className="video-stream glass-card">
            <div className="live-tag">LIVE</div>
            <img src={altarImg} alt="Live Stream" className="stream-placeholder" />
            <div className="stream-overlay">
              <button className="play-icon" onClick={() => alert('Starting live stream...')}>▶</button>
              <span>Evening Aarti starting in 2h 15m</span>
            </div>
          </div>
          
          <div className="meditation-box glass-card">
            <h3>Meditate with Hanuman</h3>
            <p>Background chants and spiritual frequencies to help you focus.</p>
            <div className="audio-player">
              <div className="track-info">
                <strong>Ram Naam Loop</strong>
                <span>Continuous Chanting</span>
              </div>
              <button className="btn-outline" onClick={() => alert('Meditation session started. Jai Shri Ram!')}>Start Meditation</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

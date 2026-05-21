import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import './Devotion.css';

const Devotion = () => {
  const { devotionalContent: content } = useData();
  const [activeTab, setActiveTab] = useState('chalisa');
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    const audio = document.getElementById('devotional-audio');
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!content || !content[activeTab]) return <div className="loader">Loading Devotion...</div>;

  return (
    <section className="devotion-section" id="devotion">
      <div className="container">
        <h2 className="section-title">Hanuman Special Devotion</h2>
        <p className="section-subtitle">Immerse yourself in the divine chants and prayers of Bajrangbali.</p>
        
        <div className="devotion-tabs">
          {Object.keys(content).map((tab) => (
            <button 
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab);
                setIsPlaying(false);
              }}
            >
              {content[tab].title}
            </button>
          ))}
        </div>

        <div className="devotion-layout grid">
          <div className="devotion-content glass-card animate-fade-in">
            <div className="content-header">
              <h3>{content[activeTab].title}</h3>
              <p>{content[activeTab].subtitle}</p>
            </div>
            <div className="content-body">
              <pre className="scripture-text">{content[activeTab].text}</pre>
            </div>
            
            <div className="audio-player-container">
              <audio id="devotional-audio" src={content[activeTab].audioUrl}></audio>
              <div className="audio-player-placeholder">
                <span>🎵 Listen to {content[activeTab].title} Chants</span>
                <div className="mock-audio-controls">
                  <button className="play-circle" onClick={handlePlayAudio}>
                    {isPlaying ? '⏸' : '▶'}
                  </button>
                  <div className="progress-bar"><div className="progress" style={{width: isPlaying ? '60%' : '0%'}}></div></div>
                  <span className="time">{isPlaying ? '02:15' : '00:00'} / 05:40</span>
                </div>
              </div>
            </div>
          </div>

          <div className="video-container glass-card">
            <div className="video-header">
              <h4>🎥 Watch Video Devotion</h4>
            </div>
            <div className="video-wrapper">
              <iframe 
                key={activeTab}
                src={content[activeTab].videoUrl} 
                title={content[activeTab].title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-info">
              <p>Experience the divine energy through visual devotion and collective chanting.</p>
            </div>
            <div className="devotion-info-below">
              <div className="info-card glass-card">
                <h4>💪 Why Worship Hanuman?</h4>
                <p>Worshipping Hanuman provides health, courage, and success. He is the destroyer of obstacles and the symbol of supreme devotion.</p>
              </div>
              <div className="info-card glass-card">
                <h4>⏰ Best Days to Visit</h4>
                <p><strong>Tuesday &amp; Saturday</strong> are most auspicious for Hanuman puja. Devotees often fast and recite Chalisa on these days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Devotion;

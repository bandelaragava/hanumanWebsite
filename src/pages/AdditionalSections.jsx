import React, { useState, useRef, useEffect } from 'react';
import './AdditionalSections.css';
import storeImg from '../assets/store.png';
import altarImg from '../assets/altar.png';
import toast from 'react-hot-toast';
import { useData } from '../context/DataContext';

export const Store = () => {
  const { products, addToCart } = useData();

  return (
    <section className="store-section" id="store">
      <div className="container">
        <h2 className="section-title">Hanuman Divine Store</h2>
        <p className="section-subtitle">Take home a symbol of strength and protection.</p>
        
        <div className="product-grid">
          {products.map((p) => (
            <div key={p.id} className="product-card glass-card">
              <div className="product-image">
                <img 
                  src={p.img || storeImg} 
                  alt={p.name} 
                  onError={(e) => {
                    e.target.src = storeImg;
                    e.target.onerror = null;
                  }}
                />
              </div>
              <h4>{p.name}</h4>
              <p className="price">{p.price}</p>
              <button className="btn-primary" onClick={() => addToCart(p)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const LiveExperience = () => {
  const { liveVideoUrl } = useData();
  const [isMeditating, setIsMeditating] = useState(false);
  const [timer, setTimer] = useState(0);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isMeditating) {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.log('Audio autoplay blocked or failed:', err);
        });
      }
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      toast.success('Divine chanting started. Focus your mind on Hanuman. 🕉️', {
        duration: 4000,
        icon: '🕉️',
      });
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isMeditating]);

  const handleResetMeditation = () => {
    setIsMeditating(false);
    setTimer(0);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Convert standard YouTube watch/short URLs into secure embed links
  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('/embed/')) return url;

    // Standard watch URL
    if (url.includes('youtube.com/watch')) {
      try {
        const urlObj = new URL(url);
        const v = urlObj.searchParams.get('v');
        if (v) return `https://www.youtube.com/embed/${v}?autoplay=1&mute=1&enablejsapi=1`;
      } catch (e) {}
    }

    // Youtu.be short links
    if (url.includes('youtu.be/')) {
      const parts = url.split('youtu.be/');
      const id = parts[parts.length - 1].split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&enablejsapi=1`;
    }

    // YouTube Shorts
    if (url.includes('youtube.com/shorts/')) {
      const parts = url.split('youtube.com/shorts/');
      const id = parts[parts.length - 1].split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&enablejsapi=1`;
    }

    return url;
  };

  const embedUrl = getEmbedUrl(liveVideoUrl);
  const isIframe = embedUrl.includes('youtube.com') || embedUrl.includes('vimeo.com') || embedUrl.includes('embed');

  return (
    <section className="live-section" id="live">
      <div className="container">
        <h2 className="section-title">Live Hanuman Energy</h2>
        <p className="section-subtitle">Connect with the temple spirit from anywhere in the world.</p>
        
        <div className="live-grid">
          {/* Live Video Stream Card */}
          <div className="video-stream glass-card">
            <div className="live-tag">LIVE</div>
            {liveVideoUrl ? (
              isIframe ? (
                <iframe
                  src={embedUrl}
                  title="Live Hanuman stream"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none' }}
                ></iframe>
              ) : (
                <video
                  src={liveVideoUrl}
                  controls
                  autoPlay
                  muted
                  loop
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                ></video>
              )
            ) : (
              <>
                <img src={altarImg} alt="Live Stream" className="stream-placeholder" />
                <div className="stream-overlay">
                  <span>No live video stream configured currently.</span>
                </div>
              </>
            )}
          </div>
          
          {/* Meditation Box */}
          <div className={`meditation-box glass-card ${isMeditating ? 'active' : ''}`}>
            <h3>Meditate with Hanuman</h3>
            <p>Background chants and spiritual frequencies to help you focus.</p>
            
            <div className={`meditation-indicator ${isMeditating ? 'pulsing' : ''}`}>
              <div className="indicator-core">🕉️</div>
            </div>

            <div className="audio-player">
              <div className="track-info">
                <strong>Ram Naam Chant</strong>
                <span>{isMeditating ? `Meditating: ${formatTime(timer)}` : 'Continuous Loop'}</span>
              </div>
              
              <div className="meditation-actions" style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '1rem' }}>
                <button 
                  className={`btn-primary ${isMeditating ? 'meditating-btn' : ''}`}
                  onClick={() => setIsMeditating(!isMeditating)}
                >
                  {isMeditating ? '⏸️ Pause Meditation' : '🕉️ Start Meditation'}
                </button>
                {timer > 0 && (
                  <button className="btn-outline" onClick={handleResetMeditation}>
                    🔄 Reset
                  </button>
                )}
              </div>
            </div>

            {/* Hidden Audio loop element */}
            <audio 
              ref={audioRef} 
              src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" 
              loop 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

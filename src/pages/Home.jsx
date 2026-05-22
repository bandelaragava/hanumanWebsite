import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import Hero from '../components/Hero';
import heroImg from '../assets/hero.jpg';
import legendImg from '../assets/main_deity.png';
import { useData } from '../context/DataContext';
import { usePanchangam } from '../utils/usePanchangam';
import './Home.css';

const Home = () => {
  const { timings, events } = useData();
  const [selectedProblem, setSelectedProblem] = useState(null);
  const { data: panchang, loading: panchangLoading, error: panchangError, refresh: refreshPanchang } = usePanchangam();

  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (showShareModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showShareModal]);

  const getShareText = () => {
    if (!panchang) return '';
    return `🕉️ Today's Panchangam - Hanuman Temple 🕉️\n` +
           `📅 Date: ${panchang.date}\n\n` +
           `🌙 Tithi: ${panchang.tithi}\n` +
           `⭐ Nakshatra: ${panchang.nakshatra}\n` +
           `🧘 Yoga: ${panchang.yoga}\n` +
           `🔑 Karana: ${panchang.karana}\n` +
           `📅 Vara: ${panchang.vara}\n` +
           `🌕 Paksha: ${panchang.paksha}\n` +
           `📆 Masa: ${panchang.masa}\n` +
           `🌙 Moon Sign: ${panchang.moonSign}\n\n` +
           `🌅 Sunrise: ${panchang.sunrise} | 🌇 Sunset: ${panchang.sunset}\n` +
           `✅ Abhijit Muhurta: ${panchang.abhijitMuhurta}\n` +
           `⚠️ Rahu Kala: ${panchang.rahuKala}\n` +
           `${panchang.festivals ? `🎉 Festival: ${panchang.festivals}\n` : ''}` +
           `${panchang.specialNote ? `📝 Note: ${panchang.specialNote}\n` : ''}\n` +
           `👉 Get daily Panchangam: ${window.location.origin}`;
  };

  const shareWhatsApp = () => {
    const text = getShareText();
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareTelegram = () => {
    const text = getShareText();
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareTwitter = () => {
    const text = getShareText();
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const copyToClipboard = () => {
    const text = getShareText();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success('Panchangam details copied to clipboard! 🙏');
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast.error('Failed to copy to clipboard.');
    });
  };

  const shareSystem = () => {
    const text = getShareText();
    if (navigator.share) {
      navigator.share({
        title: "Today's Panchangam",
        text: text,
        url: window.location.origin
      }).catch(err => console.log('Error sharing', err));
    }
  };

  const [generatingImage, setGeneratingImage] = useState(false);

  const generateCardImageBlob = async () => {
    const cardEl = document.getElementById('panchang-preview-card');
    if (!cardEl) return null;
    
    try {
      const canvas = await html2canvas(cardEl, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#fffdfb',
        logging: false
      });
      
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png', 1.0);
      });
    } catch (error) {
      console.error('Error generating card image:', error);
      toast.error('Failed to generate card image.');
      return null;
    }
  };

  const downloadCardImage = async () => {
    setGeneratingImage(true);
    const toastId = toast.loading('Generating high-resolution image...');
    try {
      const blob = await generateCardImageBlob();
      if (!blob) {
        toast.dismiss(toastId);
        setGeneratingImage(false);
        return;
      }
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Panchangam_${panchang.date.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Card image downloaded successfully! 🕉️', { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error('Download failed.', { id: toastId });
    } finally {
      setGeneratingImage(false);
    }
  };

  const copyCardImage = async () => {
    if (!navigator.clipboard || !window.ClipboardItem) {
      toast.error('Clipboard image copy is not supported in this browser.');
      return;
    }
    
    setGeneratingImage(true);
    const toastId = toast.loading('Generating image...');
    try {
      const blob = await generateCardImageBlob();
      if (!blob) {
        toast.dismiss(toastId);
        setGeneratingImage(false);
        return;
      }
      
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      
      toast.success('Card image copied to clipboard! Paste it directly in WhatsApp/Telegram. 📋', { id: toastId });
    } catch (err) {
      console.error('Copy image failed:', err);
      toast.error('Copy to clipboard failed. Try downloading instead.', { id: toastId });
    } finally {
      setGeneratingImage(false);
    }
  };

  const shareCardImage = async () => {
    if (!navigator.share) {
      toast.error('Web share is not supported in this browser.');
      return;
    }
    
    setGeneratingImage(true);
    const toastId = toast.loading('Preparing image for sharing...');
    try {
      const blob = await generateCardImageBlob();
      if (!blob) {
        toast.dismiss(toastId);
        setGeneratingImage(false);
        return;
      }
      
      const file = new File([blob], `Panchangam_${panchang.date.replace(/[^a-zA-Z0-9]/g, '_')}.png`, { type: blob.type });
      
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        toast.dismiss(toastId);
        await navigator.share({
          files: [file],
          title: "Today's Panchangam",
          text: `Today's Panchangam (${panchang.date}) from Hanuman Temple.`
        });
      } else {
        toast.error('This browser does not support sharing image files.', { id: toastId });
      }
    } catch (err) {
      console.error('Share failed:', err);
      toast.error('Sharing failed.', { id: toastId });
    } finally {
      setGeneratingImage(false);
    }
  };

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
              <div className="panchang-header">
                <h3>Today's Panchangam</h3>
                {!panchangLoading && panchang && (
                  <div className="panchang-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <span className="panchang-date-badge">{panchang.date}</span>
                    <button 
                      className="panchang-share-trigger" 
                      onClick={() => setShowShareModal(true)} 
                      title="Share Panchangam"
                      aria-label="Share Today's Panchangam"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="share-icon-svg">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                      </svg>
                      <span>Share</span>
                    </button>
                  </div>
                )}
              </div>

              {panchangLoading && (
                <div className="panchang-loading">
                  <div className="panchang-skeleton"></div>
                  <div className="panchang-skeleton short"></div>
                  <div className="panchang-skeleton"></div>
                  <div className="panchang-skeleton short"></div>
                  <p className="panchang-loading-text">🕉️ Computing today's almanac…</p>
                </div>
              )}

              {panchangError && (
                <div className="panchang-error">
                  <p>⚠️ {panchangError}</p>
                  <button onClick={refreshPanchang} className="panchang-retry-btn">🔄 Retry</button>
                </div>
              )}

              {!panchangLoading && !panchangError && panchang && (
                <>
                  {panchang.festivals && (
                    <div className="panchang-festival-banner">
                      🎉 {panchang.festivals}
                    </div>
                  )}

                  <div className="panchang-details">
                    <div className="p-item">
                      <span>🌙 Tithi</span>
                      <strong>{panchang.tithi}</strong>
                    </div>
                    <div className="p-item">
                      <span>⭐ Nakshatra</span>
                      <strong>{panchang.nakshatra}</strong>
                    </div>
                    <div className="p-item">
                      <span>🧘 Yoga</span>
                      <strong>{panchang.yoga}</strong>
                    </div>
                    <div className="p-item">
                      <span>🔑 Karana</span>
                      <strong>{panchang.karana}</strong>
                    </div>
                    <div className="p-item">
                      <span>📅 Vara</span>
                      <strong>{panchang.vara}</strong>
                    </div>
                    <div className="p-item">
                      <span>🌕 Paksha</span>
                      <strong>{panchang.paksha}</strong>
                    </div>
                    <div className="p-item">
                      <span>📆 Masa</span>
                      <strong>{panchang.masa}</strong>
                    </div>
                    <div className="p-item">
                      <span>🌙 Moon Sign</span>
                      <strong>{panchang.moonSign}</strong>
                    </div>
                  </div>

                  <div className="sun-timings">
                    <div className="sun-item">🌅 Sunrise: {panchang.sunrise}</div>
                    <div className="sun-item">🌇 Sunset: {panchang.sunset}</div>
                  </div>

                  <div className="panchang-muhurta">
                    <div className="muhurta-item good">
                      <span>✅ Abhijit Muhurta</span>
                      <strong>{panchang.abhijitMuhurta}</strong>
                    </div>
                    <div className="muhurta-item bad">
                      <span>⚠️ Rahu Kala</span>
                      <strong>{panchang.rahuKala}</strong>
                    </div>
                    <div className="muhurta-item bad">
                      <span>🚫 Yamaghanda</span>
                      <strong>{panchang.yamaghanda}</strong>
                    </div>
                  </div>

                  {panchang.specialNote && (
                    <div className="panchang-note">
                      📝 {panchang.specialNote}
                    </div>
                  )}
                </>
              )}
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

      {showShareModal && panchang && (
        <div className="panchang-modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="panchang-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="panchang-modal-close" onClick={() => setShowShareModal(false)} aria-label="Close modal">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="panchang-modal-card-preview" id="panchang-preview-card">
              <div className="panchang-card-banner">
                <div className="panchang-card-logo">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="34" height="34" className="panchang-logo-svg">
                    <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6"/>
                    <circle cx="24" cy="24" r="18" fill="white" opacity="0.15"/>
                    <circle cx="24" cy="24" r="18" stroke="white" strokeWidth="1.8"/>
                    <text x="24" y="29" textAnchor="middle" fontSize="16" fontFamily="serif" fill="white" fontWeight="bold">ॐ</text>
                    <path d="M12 10 Q24 4 36 10" stroke="white" strokeWidth="1.2" fill="none" opacity="0.7"/>
                    <path d="M12 38 Q24 44 36 38" stroke="white" strokeWidth="1.2" fill="none" opacity="0.7"/>
                  </svg>
                  <div className="panchang-logo-wordmark">
                    <span className="panchang-logo-main">HANUMAN TEMPLE</span>
                    <span className="panchang-logo-sub">DAILY ALMANAC</span>
                  </div>
                </div>
                <div className="panchang-card-banner-title">
                  <h2>Today's Panchangam</h2>
                  <span className="panchang-card-date">{panchang.date}</span>
                </div>
              </div>

              <div className="panchang-card-body">
                {panchang.festivals && (
                  <div className="panchang-card-festival">
                    🎉 {panchang.festivals}
                  </div>
                )}

                <div className="panchang-card-grid">
                  <div className="p-card-item">
                    <span className="label">🌙 Tithi</span>
                    <strong className="value">{panchang.tithi}</strong>
                  </div>
                  <div className="p-card-item">
                    <span className="label">⭐ Nakshatra</span>
                    <strong className="value">{panchang.nakshatra}</strong>
                  </div>
                  <div className="p-card-item">
                    <span className="label">🧘 Yoga</span>
                    <strong className="value">{panchang.yoga}</strong>
                  </div>
                  <div className="p-card-item">
                    <span className="label">🔑 Karana</span>
                    <strong className="value">{panchang.karana}</strong>
                  </div>
                  <div className="p-card-item">
                    <span className="label">📅 Vara</span>
                    <strong className="value">{panchang.vara}</strong>
                  </div>
                  <div className="p-card-item">
                    <span className="label">🌕 Paksha</span>
                    <strong className="value">{panchang.paksha}</strong>
                  </div>
                  <div className="p-card-item">
                    <span className="label">📆 Masa</span>
                    <strong className="value">{panchang.masa}</strong>
                  </div>
                  <div className="p-card-item">
                    <span className="label">🌙 Moon Sign</span>
                    <strong className="value">{panchang.moonSign}</strong>
                  </div>
                </div>

                <div className="panchang-card-sun">
                  <span>🌅 Sunrise: <strong>{panchang.sunrise}</strong></span>
                  <span>🌇 Sunset: <strong>{panchang.sunset}</strong></span>
                </div>

                <div className="panchang-card-muhurta">
                  <div className="muhurta-pill good">
                    <span>✅ Abhijit:</span>
                    <strong>{panchang.abhijitMuhurta}</strong>
                  </div>
                  <div className="muhurta-pill bad">
                    <span>⚠️ Rahu Kala:</span>
                    <strong>{panchang.rahuKala}</strong>
                  </div>
                </div>

                {panchang.specialNote && (
                  <div className="panchang-card-note">
                    📝 {panchang.specialNote}
                  </div>
                )}
                
                <div className="panchang-card-footer">
                  <span>May Lord Hanuman bless you with health and prosperity.</span>
                  <strong>www.hanumantemple.org</strong>
                </div>
              </div>
            </div>

            <div className="panchang-share-options">
              <div className="share-section">
                <h4>🖼️ Share Image Card</h4>
                <div className="share-buttons-grid primary-actions">
                  <button className="share-opt-btn copy-img" onClick={copyCardImage} disabled={generatingImage}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>Copy Image</span>
                  </button>
                  
                  <button className="share-opt-btn download-img" onClick={downloadCardImage} disabled={generatingImage}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span>Download PNG</span>
                  </button>

                  {navigator.share && (
                    <button className="share-opt-btn system-share" onClick={shareCardImage} disabled={generatingImage}>
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                      </svg>
                      <span>Share Image</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="share-section" style={{ marginTop: '16px' }}>
                <h4>✍️ Share Text Version</h4>
                <div className="share-buttons-grid secondary-actions">
                  <button className="share-opt-btn whatsapp" onClick={shareWhatsApp} disabled={generatingImage}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.978L2 22l5.197-1.362a9.93 9.93 0 0 0 4.814 1.248h.004c5.505 0 9.99-4.478 9.99-9.984 0-2.667-1.037-5.176-2.922-7.062C17.199 3.037 14.686 2 12.012 2zm5.727 14.153c-.314.887-1.8 1.627-2.484 1.706-.684.08-1.547.04-2.52-.279a11.233 11.233 0 0 1-5.32-3.834 10.37 10.37 0 0 1-1.637-2.65c-.475-.794-.972-2.11-.274-2.812.32-.32.699-.452.923-.559.223-.106.376-.08.455.08.079.16.794 1.936.86 2.07.067.132.067.291-.04.452-.106.16-.226.319-.346.452-.12.133-.252.279-.106.531.146.252.651 1.077 1.396 1.742a7.6 7.6 0 0 0 2.014 1.248c.252.12.399.093.545-.08.146-.173.651-.758.824-1.01.173-.253.346-.213.572-.12.226.093 1.436.678 1.682.811.246.133.412.2.478.306.066.12.066.678-.248 1.565z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </button>
                  <button className="share-opt-btn telegram" onClick={shareTelegram} disabled={generatingImage}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    <span>Telegram</span>
                  </button>
                  <button className="share-opt-btn twitter" onClick={shareTwitter} disabled={generatingImage}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>Twitter</span>
                  </button>
                  <button className={`share-opt-btn copy ${copied ? 'copied' : ''}`} onClick={copyToClipboard} disabled={generatingImage}>
                    {copied ? (
                      <>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

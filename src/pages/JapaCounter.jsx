import React, { useState, useEffect } from 'react';
import './JapaCounter.css';

const JapaCounter = () => {
  const [count, setCount] = useState(0);
  const [totalChants, setTotalChants] = useState(parseInt(localStorage.getItem('totalChants') || '0'));
  const [target, setTarget] = useState(108);
  const [selectedMantra, setSelectedMantra] = useState('Jai Shri Ram');
  const [malasCompleted, setMalasCompleted] = useState(0);

  const mantras = [
    'Jai Shri Ram',
    'Om Ham Hanumate Namaha',
    'Jai Bajrangbali',
    'Sankat Mochan Hanumate Namaha'
  ];

  useEffect(() => {
    localStorage.setItem('totalChants', totalChants);
  }, [totalChants]);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    setTotalChants(totalChants + 1);

    if (newCount >= target) {
      setMalasCompleted(malasCompleted + 1);
      setCount(0);
      alert('Congratulations! One Mala completed. 🙏');
    }

    // Play a subtle sound or vibrate if supported
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const resetCounter = () => {
    if (window.confirm('Reset current count?')) {
      setCount(0);
    }
  };

  const progressPercentage = (count / target) * 100;

  return (
    <div className="japa-page animate-fade-in">
      <div className="japa-hero">
        <div className="container">
          <h1>Digital Japa Mala</h1>
          <p>Focus your mind and count your chants with our interactive digital beads.</p>
        </div>
      </div>

      <div className="container japa-container">
        <div className="japa-main glass-card">
          <div className="mantra-selector">
            <label>Select Mantra:</label>
            <select value={selectedMantra} onChange={(e) => setSelectedMantra(e.target.value)}>
              {mantras.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="counter-display">
            <div className="progress-circle">
              <svg viewBox="0 0 100 100">
                <circle className="bg" cx="50" cy="50" r="45" />
                <circle 
                  className="progress" 
                  cx="50" cy="50" r="45" 
                  style={{ strokeDashoffset: 283 - (283 * progressPercentage) / 100 }}
                />
              </svg>
              <div className="count-numbers">
                <span className="current-count">{count}</span>
                <span className="target-label">/ {target}</span>
              </div>
            </div>
            <p className="active-mantra">"{selectedMantra}"</p>
          </div>

          <div className="japa-controls">
            <button className="tap-button" onClick={handleIncrement}>
              <div className="bead-inner">TAP</div>
            </button>
            <div className="alt-controls">
              <button className="btn-outline" onClick={resetCounter}>Reset</button>
              <div className="target-input">
                <span>Goal:</span>
                <input 
                  type="number" 
                  value={target} 
                  onChange={(e) => setTarget(parseInt(e.target.value) || 1)} 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="japa-stats-sidebar">
          <div className="stat-card glass-card">
            <h4>Total Lifetime Chants</h4>
            <div className="stat-number">{totalChants.toLocaleString()}</div>
          </div>
          <div className="stat-card glass-card">
            <h4>Malas Completed</h4>
            <div className="stat-number">{malasCompleted}</div>
          </div>
          <div className="japa-info glass-card">
            <h4>🙏 Significance of 108</h4>
            <p>In Vedic tradition, 108 is a sacred number. There are 108 Upanishads, and the average distance between the Sun, Moon, and Earth is 108 times their respective diameters.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JapaCounter;

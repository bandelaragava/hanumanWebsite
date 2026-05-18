import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProblemSolver.css';

const ProblemSolver = () => {
  const navigate = useNavigate();
  const [selectedProblem, setSelectedProblem] = useState(null);

  const problems = [
    { id: 'health', icon: '🙏', label: 'Health', mantra: 'Om Ham Hanumate Namaha', pooja: 'Tailabhishekam', day: 'Tuesday' },
    { id: 'job', icon: '💼', label: 'Job/Career', mantra: 'Sakal Mangal Mangalye...', pooja: 'Vada Mala Seva', day: 'Saturday' },
    { id: 'fear', icon: '😟', label: 'Fear/Anxiety', mantra: 'Hanuman Chalisa Path', pooja: 'Deepa Seva', day: 'Everyday' },
    { id: 'court', icon: '⚖️', label: 'Court Cases', mantra: 'Sankat Mochan Ashtak', pooja: 'Sindoor Seva', day: 'Tuesday' },
  ];

  const selection = problems.find(p => p.id === selectedProblem);

  return (
    <section className="problem-solver" id="problem-solver">
      <div className="container">
        <h2 className="section-title">Sankat Mochan</h2>
        <p className="section-subtitle">Find divine solutions to your life problems through specific Hanuman Sevas and Mantras.</p>

        <div className="problem-selector">
          <h3>Select your concern:</h3>
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
            <div className="solution-header">
              <h3>Divine Solution for {selection.label}</h3>
            </div>
            <div className="solution-details">
              <div className="detail-item">
                <span>Suggested Mantra:</span>
                <strong>{selection.mantra}</strong>
              </div>
              <div className="detail-item">
                <span>Recommended Pooja:</span>
                <strong>{selection.pooja}</strong>
              </div>
              <div className="detail-item">
                <span>Best Day:</span>
                <strong>{selection.day}</strong>
              </div>
            </div>
            <button className="btn-primary" onClick={() => navigate('/seva')}>Book this Seva Now</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProblemSolver;


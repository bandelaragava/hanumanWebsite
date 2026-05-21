import React from 'react';
import './About.css';
import legendImg from '../assets/hanumanMeditationimg.jpeg';
import babyHanumanImg from '../assets/BabyHanumanLeapingSun.png';
import sanjeevaniImg from '../assets/HanumanCarryingSanjeevaniMountain.png';
import ramaSitaImg from '../assets/LordHanumanwithLordRamaSit.png';

const About = () => {
  return (
    <div className="about-page animate-fade-in">
      <section className="about-hero">
        <div className="container">
          <h1>🔱 About Lord Hanuman</h1>
          <p>The symbol of unwavering devotion, immense strength, and selfless service.</p>
        </div>
      </section>

      <section className="about-intro container">
        <div className="intro-grid">
          <div className="intro-text">
            <h2 className="section-title" style={{textAlign: 'left'}}>✨ The Essence of Lord Hanuman</h2>
            <p className="highlight-text">
              Lord Hanuman is one of the most revered deities in Hinduism, known for his unwavering devotion, 
              immense strength, courage, and humility. He is a central figure in the epic Ramayana 
              and is considered the greatest devotee of Lord Rama.
            </p>
            <p>
              Hanuman symbolizes <strong>bhakti (devotion), shakti (strength), and seva (service)</strong>. 
              Devotees worship him for protection, courage, and removal of obstacles.
            </p>
          </div>
          <div className="intro-image-wrapper">
             <img src={legendImg} alt="Lord Hanuman" className="about-main-img" />
          </div>
        </div>
      </section>

      <section className="birth-story container">
        <div className="story-row">
          <div className="story-img-container glass-card">
            <img src={babyHanumanImg} alt="Baby Hanuman Leaping for the Sun" className="story-image-main" />
          </div>
          <div className="story-info">
            <h2 className="section-title" style={{textAlign: 'left'}}>🌼 Birth of Lord Hanuman</h2>
            <p>
              Lord Hanuman was born to <strong>Anjana Devi and Kesari</strong>, and is also known as the son of 
              <strong> Vayu (the Wind God)</strong>. According to legend, Anjana was a celestial being who was 
              cursed to be born on earth. Through divine blessings and the grace of Lord Shiva, 
              she gave birth to Hanuman.
            </p>
            <p>
              As a child, Hanuman mistook the sun for a ripe fruit and leaped into the sky to catch it. 
              This act demonstrated his extraordinary powers even at a young age.
            </p>
            <div className="divine-names">
              <h4>Because of his divine origin, Hanuman is also known as:</h4>
              <div className="name-tags">
                <span>Anjaneya</span>
                <span>Maruti</span>
                <span>Pavan Putra</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ramayana-role container">
        <div className="story-row reverse">
          <div className="story-img-container glass-card">
            <img src={sanjeevaniImg} alt="Hanuman carrying Sanjeevani Mountain" className="story-image-main" />
          </div>
          <div className="story-info">
            <h2 className="section-title" style={{textAlign: 'left'}}>🔥 Role in Ramayana</h2>
            <p>
              Hanuman played a crucial role in helping Lord Rama rescue Sita from Lanka. 
              His bravery, intelligence, and devotion made him an indispensable part of Rama’s journey.
            </p>
            <div className="key-deeds">
              <div className="deed-card glass-card">
                <span className="deed-icon">🌊</span>
                <p>Crossing the ocean to Lanka</p>
              </div>
              <div className="deed-card glass-card">
                <span className="deed-icon">🔥</span>
                <p>Burning Lanka</p>
              </div>
              <div className="deed-card glass-card">
                <span className="deed-icon">🏔️</span>
                <p>Bringing Sanjeevani mountain to save Lakshmana</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="spiritual-significance container">
        <div className="significance-card glass-card">
          <h2 className="section-title">🙏 Spiritual Significance</h2>
          <div className="sig-grid">
            <div className="sig-item">
              <h3>Remover of fear and evil</h3>
              <p>Lord Hanuman is the ultimate protector against negative energies and fears.</p>
            </div>
            <div className="sig-item">
              <h3>Protector from negative energies</h3>
              <p>His presence dispels darkness and brings spiritual light to the heart.</p>
            </div>
            <div className="sig-item">
              <h3>Symbol of devotion and discipline</h3>
              <p>He teaches us that true power comes from surrender and service to the Divine.</p>
            </div>
          </div>
          <div className="chalisa-callout">
             <p>“Chanting Hanuman Chalisa is believed to bring peace, strength, and success.”</p>
          </div>
          <div className="final-image-container">
             <img src={ramaSitaImg} alt="Lord Hanuman with Lord Rama and Sita" className="about-final-img" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;


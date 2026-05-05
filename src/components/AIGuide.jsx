import React, { useState, useRef, useEffect } from 'react';
import './AIGuide.css';

const AIGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Namaste! I am your Divine Guide. How can I assist you with your spiritual journey today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulated AI response logic
    setTimeout(() => {
      let response = "That is a wonderful question. Lord Hanuman symbolizes strength and devotion. How else can I help?";
      
      const lowInput = input.toLowerCase();
      if (lowInput.includes('timing') || lowInput.includes('open')) {
        response = "The temple is open from 6:00 AM to 9:00 PM daily. Special Aarti is at 7:00 PM.";
      } else if (lowInput.includes('seva') || lowInput.includes('book')) {
        response = "You can book various Sevas like Tailabhishekam and Vada Mala through our Seva Booking page.";
      } else if (lowInput.includes('birth') || lowInput.includes('story')) {
        response = "Lord Hanuman was born to Anjana Devi and Kesari. He is the incarnation of Lord Shiva and son of Vayu.";
      } else if (lowInput.includes('chalisa')) {
        response = "Chanting the Hanuman Chalisa 100 times is said to release one from all bonds and bring great joy.";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={`ai-guide-container ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <button className="ai-toggle-btn" onClick={() => setIsOpen(true)}>
          <span className="ai-icon">🕉️</span>
          <span className="ai-label">Ask Guide</span>
        </button>
      )}

      {isOpen && (
        <div className="ai-chat-window glass-card">
          <div className="ai-header">
            <div className="ai-header-info">
              <span className="ai-status-dot"></span>
              <h4>Divine AI Guide</h4>
            </div>
            <button className="ai-close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="ai-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <div className="message-content">
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message assistant typing">
                <div className="typing-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-input-area">
            <input 
              type="text" 
              placeholder="Ask about rituals, stories, or timings..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="ai-send-btn" onClick={handleSend}>➔</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIGuide;

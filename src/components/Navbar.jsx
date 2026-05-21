import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart } = useData();

  const cartCount = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDashboard = location.pathname.includes('/dashboard') || location.pathname.includes('/admin');

  if (isDashboard) {
    return null;
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Devotion', path: '/devotion' },
    { name: 'Booking', path: '/seva' },
    { name: 'Store', path: '/store' },
    { name: 'Japa Mala', path: '/japa' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !isScrolled;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const dashboardPath = user?.role === 'admin' ? '/admin' : '/dashboard';

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isTransparent ? 'transparent' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          <div className="logo-emblem">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-svg">
              {/* Outer decorative ring */}
              <circle cx="24" cy="24" r="22" stroke="url(#logoGrad)" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6"/>
              {/* Main filled circle */}
              <circle cx="24" cy="24" r="18" fill="url(#logoGrad)" opacity="0.12"/>
              <circle cx="24" cy="24" r="18" stroke="url(#logoGrad)" strokeWidth="1.8"/>
              {/* Om symbol path */}
              <text x="24" y="29" textAnchor="middle" fontSize="16" fontFamily="serif" fill="url(#logoGrad)" fontWeight="bold">ॐ</text>
              {/* Top arc accent */}
              <path d="M12 10 Q24 4 36 10" stroke="url(#logoGrad)" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"/>
              {/* Bottom arc accent */}
              <path d="M12 38 Q24 44 36 38" stroke="url(#logoGrad)" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"/>
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ff9933"/>
                  <stop offset="50%" stopColor="#ff6600"/>
                  <stop offset="100%" stopColor="#ffcc44"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="logo-wordmark">
            <span className="logo-word-main">HANUMAN</span>
            <span className="logo-word-sub">TEMPLE</span>
          </div>
        </Link>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/donate" className="nav-simple-btn" onClick={() => setIsMenuOpen(false)}>Donate</Link>
          </li>
          <li>
            <Link to="/cart" className="nav-cart-btn" onClick={() => setIsMenuOpen(false)}>
              <span>🛒</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>
          {user ? (
            <li>
              <Link to={dashboardPath} className="nav-simple-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }} onClick={() => setIsMenuOpen(false)}>
                <span>🧑‍🦱</span> <span>{user.name.split(' ')[0]}</span>
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" className="nav-simple-btn" onClick={() => setIsMenuOpen(false)}>Login</Link>
            </li>
          )}
        </ul>

        <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

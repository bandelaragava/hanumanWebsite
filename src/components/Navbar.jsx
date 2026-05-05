import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Devotion', path: '/devotion' },
    { name: 'Seva', path: '/seva' },
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
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isTransparent ? 'transparent' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          <span className="logo-icon">🕉️</span>
          <span className="logo-text">Hanuman<span>Temple</span></span>
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
            <Link to="/donate" className="btn-primary" onClick={() => setIsMenuOpen(false)}>Donate</Link>
          </li>
          {user ? (
            <li className="nav-user-menu">
              <Link to={dashboardPath} className="nav-avatar-btn" onClick={() => setIsMenuOpen(false)}>
                🧑‍🦱 {user.name.split(' ')[0]}
              </Link>
              <button className="nav-logout-btn" onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="nav-login-btn" onClick={() => setIsMenuOpen(false)}>Login</Link>
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

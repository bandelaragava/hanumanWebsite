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

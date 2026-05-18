import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Devotion from './pages/Devotion';
import JapaCounter from './pages/JapaCounter';
import SevaBooking from './pages/SevaBooking';
import YouthSection from './pages/YouthSection';
import Donation from './pages/Donation';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { Store, LiveExperience } from './pages/AdditionalSections';
import Cart from './pages/Cart';
import ScrollToTop from './components/ScrollToTop';
import AIGuide from './components/AIGuide';

import { Toaster } from 'react-hot-toast';

import { DataProvider } from './context/DataContext';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="app">
        <ScrollToTop />
        <Navbar />
        <AIGuide />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/devotion" element={<Devotion />} />
            <Route path="/seva" element={<SevaBooking />} />
            <Route path="/youth" element={<YouthSection />} />
            <Route path="/store" element={<Store />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/donate" element={<Donation />} />
            <Route path="/live" element={<LiveExperience />} />
            <Route path="/japa" element={<JapaCounter />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </main>
      </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;


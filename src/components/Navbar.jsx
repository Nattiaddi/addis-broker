import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-black tracking-tighter uppercase">
          Addis<span className="text-addis-gold">Broker</span>
        </Link>

        {/* LINKS */}
        <div className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest">
          <Link to="/" className="hover:text-addis-gold transition-colors">Home</Link>
          <Link to="/about" className="hover:text-addis-gold transition-colors">About Us</Link>
          <Link to="/contact" className="hover:text-addis-gold transition-colors">Contact</Link>
        </div>

        {/* AUTH BUTTONS */}
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-xs font-bold uppercase hover:text-addis-gold">Log In</Link>
          <Link to="/signup" className="bg-addis-gold text-black px-5 py-2 rounded-full text-xs font-black uppercase hover:bg-yellow-500 transition-all">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
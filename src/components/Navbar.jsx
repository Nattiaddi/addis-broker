import React from 'react';

const Navbar = () => (
  <nav className="bg-addis-black border-b border-addis-gold/20 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
    <div className="text-addis-gold font-bold text-2xl tracking-tighter uppercase">
      Addis<span className="text-white">Broker</span>
    </div>
    <div className="hidden md:flex space-x-8 text-xs font-bold uppercase tracking-widest text-gray-300">
      <a href="/" className="hover:text-addis-gold transition">Home</a>
      <a href="/about" className="hover:text-addis-gold transition">About Us</a>
      <a href="/contact" className="hover:text-addis-gold transition">Contact</a>
    </div>
    <div className="flex gap-4">
      <button className="text-white text-xs font-bold px-4 py-2 hover:text-addis-gold">Login</button>
      <button className="bg-addis-gold text-black px-6 py-2 text-xs font-black uppercase rounded-sm">Sign Up</button>
    </div>
  </nav>
);

export default Navbar;
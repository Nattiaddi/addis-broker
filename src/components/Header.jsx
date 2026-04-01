import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ lang, setLang }) => (
  <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-900 px-8 py-4 flex justify-between items-center">
    <Link to="/" className="text-xl font-black text-[#f7d774] italic">ADDIS BROKER</Link>
    
    <div className="flex items-center gap-6">
      <nav className="hidden md:flex gap-6 text-xs uppercase font-bold tracking-widest">
        <Link to="/" className="hover:text-[#f7d774] transition-colors">Home</Link>
        <Link to="/admin" className="hover:text-[#f7d774] transition-colors opacity-50">Admin</Link>
      </nav>

      {/* Language Switcher */}
      <select 
        value={lang} 
        onChange={(e) => setLang(e.target.value)}
        className="bg-gray-900 text-white text-[10px] px-2 py-1 rounded border border-gray-700 outline-none"
      >
        <option value="en">EN</option>
        <option value="am">አማ</option>
      </select>
    </div>
  </header>
);

export default Header;
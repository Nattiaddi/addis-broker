import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <Link to="/" className="text-xl font-bold text-white">
      ADDIS<span className="text-[#f7d774]">BROKER</span>
    </Link>
    
    <nav className="nav-links flex items-center">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      {/* ADDED ADMIN BUTTON HERE */}
      <Link to="/admin" className="opacity-50 hover:opacity-100 ml-6 text-[10px] border border-gray-700 px-2 py-1 rounded">
        Admin
      </Link>
    </nav>
  </header>
);

export default Header;
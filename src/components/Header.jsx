import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <Link to="/" className="text-2xl font-black text-white uppercase italic">
      Addis<span className="text-[#f7d774]">Broker</span>
    </Link>
    <nav className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup" className="border border-[#f7d774] px-4 py-2 rounded-full hover:bg-[#f7d774] hover:text-black">Sign Up</Link>
    </nav>
  </header>
);

export default Header;
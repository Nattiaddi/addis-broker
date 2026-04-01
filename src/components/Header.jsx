import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Header = ({ lang, setLang, session }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-900 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-[#f7d774] font-black text-2xl tracking-tighter italic hover:opacity-80 transition-opacity">
          ADDIS BROKER
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          
          {/* Language Toggle */}
          <button 
            onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
            className="text-[10px] font-bold uppercase tracking-widest border border-gray-800 px-4 py-2 rounded-xl hover:border-[#f7d774] transition-all text-gray-400 hover:text-[#f7d774]"
          >
            {lang === 'en' ? 'አማርኛ' : 'English'}
          </button>

          {/* Authentication Section */}
          {session ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/admin" 
                className="hidden md:block text-[#f7d774] text-[10px] font-black uppercase tracking-[2px] border-b border-[#f7d774] pb-1"
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-950/20 text-red-500 text-[10px] font-black uppercase px-5 py-2.5 rounded-xl border border-red-900/20 hover:bg-red-600 hover:text-white transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-[#f7d774] text-black text-[10px] font-black uppercase px-6 py-2.5 rounded-xl hover:bg-white transition-all shadow-lg shadow-[#f7d774]/10"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
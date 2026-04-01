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
        <Link to="/" className="text-[#f7d774] font-black text-2xl tracking-tighter italic">
          ADDIS BROKER
        </Link>

        <div className="flex items-center gap-6">
          {/* ቋንቋ መቀያየሪያ */}
          <button 
            onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
            className="text-[10px] font-black uppercase tracking-widest border border-gray-800 px-3 py-1 rounded-lg hover:border-[#f7d774] transition-all"
          >
            {lang === 'en' ? 'አማ' : 'EN'}
          </button>

          {/* መውጫ ቁልፍ (ከገባ ብቻ ይታያል) */}
          {session ? (
            <button 
              onClick={handleLogout}
              className="bg-red-900/20 text-red-500 text-[10px] font-black uppercase px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition-all"
            >
              Logout
            </button>
          ) : (
            <Link to="/admin" className="text-gray-500 text-[10px] font-black uppercase hover:text-[#f7d774]">
              Admin
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
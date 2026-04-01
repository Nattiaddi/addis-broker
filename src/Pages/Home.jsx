import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 
import { translations } from '../translations';

const Home = ({ lang = 'en' }) => {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Safety check for translations
  const t = translations[lang] || translations['en'];

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setListings(data || []);
      } catch (err) {
        console.error("Supabase Error:", err.message);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = listings.filter(item => {
    const titleMatch = item.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const locationMatch = item.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const typeMatch = filter === 'all' || item.type === filter;
    return (titleMatch || locationMatch) && typeMatch;
  });

  return (
    <div className="bg-black text-white min-h-screen pb-20">
      
      {/* HERO SECTION */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-[#f7d774] text-4xl md:text-7xl font-black uppercase tracking-tighter italic mb-12">
          {t?.welcome || "Addis Broker"}
        </h1>
        
        <div className="flex justify-center gap-6 overflow-hidden py-10">
           <div className="w-40 h-60 rounded-2xl border border-gray-800 rotate-[-6deg] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=400" className="w-full h-full object-cover opacity-60" alt="v" />
           </div>
           <div className="w-40 h-60 rounded-2xl border border-[#f7d774]/40 scale-110 z-10 overflow-hidden shadow-2xl shadow-[#f7d774]/10">
              <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=400" className="w-full h-full object-cover" alt="c" />
           </div>
           <div className="w-40 h-60 rounded-2xl border border-gray-800 rotate-[6deg] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400" className="w-full h-full object-cover opacity-60" alt="a" />
           </div>
        </div>
      </section>

      {/* SEARCH & FILTER */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-[#0a0a0a] p-6 rounded-[2rem] border border-gray-900">
          <input 
            type="text"
            placeholder={t?.search_placeholder}
            className="w-full bg-black border border-gray-800 p-4 rounded-xl text-white focus:border-[#f7d774] outline-none mb-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-2">
            {['all', 'house', 'car'].map(type => (
              <button 
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2 rounded-lg uppercase text-[10px] font-black tracking-widest border transition-all ${
                  filter === type ? 'bg-[#f7d774] text-black border-[#f7d774]' : 'border-gray-800 text-gray-500'
                }`}
              >
                {t ? t[type] : type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LISTINGS GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredListings.map((item) => (
          <Link to={`/details/${item.id}`} key={item.id} className="group">
            <div className="bg-[#080808] border border-gray-900 p-4 rounded-[2rem] hover:border-[#f7d774]/30 transition-all">
              <div className="h-64 w-full overflow-hidden rounded-[1.5rem] mb-4">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
              </div>
              <h3 className="text-white font-black text-xl uppercase italic group-hover:text-[#f7d774] transition-colors">{item.title}</h3>
              <p className="text-gray-600 text-xs mt-1">📍 {item.location}</p>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-900">
                <span className="text-[#f7d774] font-black text-lg italic">{item.price}</span>
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-[#f7d774] group-hover:text-black transition-all">
                   <span className="text-xs font-bold uppercase">{t?.inquiry || "View"}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
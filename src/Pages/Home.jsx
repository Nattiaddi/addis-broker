import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 
import { translations } from '../translations';

const Home = ({ lang }) => {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  const t = translations[lang] || translations['en'];

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) console.error(error);
      else setListings(data);
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
    <div className="bg-black text-white min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-[#f7d774] text-5xl md:text-8xl font-black uppercase tracking-tighter italic mb-8 animate-pulse">
            {t.welcome}
          </h1>
          
          {/* Floating Luxury Images */}
          <div className="flex justify-center gap-4 md:gap-8 mt-12 perspective-1000">
            <div className="w-32 h-48 md:w-56 md:h-80 rounded-3xl border border-[#f7d774]/30 overflow-hidden rotate-[-5deg] hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-[#f7d774]/10">
              <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=400" className="w-full h-full object-cover opacity-80 hover:opacity-100" alt="Villa" />
            </div>
            <div className="w-32 h-48 md:w-56 md:h-80 rounded-3xl border border-[#f7d774]/30 overflow-hidden translate-y-8 hover:translate-y-0 transition-transform duration-500 shadow-2xl shadow-[#f7d774]/10">
              <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=400" className="w-full h-full object-cover opacity-80 hover:opacity-100" alt="Car" />
            </div>
            <div className="w-32 h-48 md:w-56 md:h-80 rounded-3xl border border-[#f7d774]/30 overflow-hidden rotate-[5deg] hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-[#f7d774]/10">
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400" className="w-full h-full object-cover opacity-80 hover:opacity-100" alt="Apartment" />
            </div>
          </div>
        </div>
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#f7d774] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>
      </section>

      {/* --- SEARCH & FILTER SECTION --- */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 -mt-12 mb-20">
        <div className="bg-[#0a0a0a] p-6 md:p-10 rounded-[2.5rem] border border-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="relative mb-6">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
            <input 
              type="text"
              placeholder={t.search_placeholder}
              className="w-full bg-black border border-gray-800 p-5 pl-14 rounded-2xl text-white focus:border-[#f7d774] outline-none transition-all placeholder:text-gray-700 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            {['all', 'house', 'car'].map(type => (
              <button 
                key={type}
                onClick={() => setFilter(type)}
                className={`px-8 py-3 rounded-xl uppercase text-[10px] font-black tracking-[3px] border transition-all duration-300 ${
                  filter === type 
                  ? 'bg-[#f7d774] text-black border-[#f7d774] shadow-[0_5px_15px_rgba(247,215,116,0.3)]' 
                  : 'border-gray-800 text-gray-500 hover:border-gray-600'
                }`}
              >
                {t[type]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- LISTINGS GRID --- */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-40">
        {filteredListings.length > 0 ? (
          filteredListings.map((item) => (
            <Link 
              to={`/details/${item.id}`} 
              key={item.id} 
              className="group block"
            >
              <div className="bg-[#080808] border border-gray-900 p-5 rounded-[2.5rem] hover:border-[#f7d774]/40 transition-all duration-500 relative overflow-hidden">
                
                {/* Image Holder */}
                <div className="relative h-80 w-full overflow-hidden rounded-[2rem] mb-6">
                  <img 
                    src={item.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out" 
                    alt={item.title} 
                  />
                  {/* Luxury Badge */}
                  <div className="absolute top-5 right-5 bg-black/70 backdrop-blur-md text-[#f7d774] text-[8px] font-black uppercase tracking-[4px] px-4 py-2 rounded-full border border-[#f7d774]/20 shadow-xl">
                    Verified
                  </div>
                </div>

                {/* Content Details */}
                <div className="px-2">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-white font-black text-2xl uppercase tracking-tighter group-hover:text-[#f7d774] transition-colors italic leading-none">
                      {item.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-500 text-xs mb-8 flex items-center gap-2">
                    <span className="text-[#f7d774] text-base">📍</span> {item.location}
                  </p>

                  <div className="flex justify-between items-center pt-6 border-t border-gray-900">
                    <div>
                      <p className="text-gray-700 text-[8px] uppercase font-black tracking-widest mb-1">Price / ዋጋ</p>
                      <span className="text-white font-black text-2xl italic tracking-tight group-hover:text-[#f7d774] transition-colors">
                        {item.price}
                      </span>
                    </div>
                    
                    {/* Floating Action Button */}
                    <div className="w-12 h-12 rounded-2xl border border-gray-800 flex items-center justify-center group-hover:bg-[#f7d774] group-hover:border-[#f7d774] group-hover:rotate-45 transition-all duration-500 shadow-xl">
                      <span className="text-white group-hover:text-black text-xl group-hover:-rotate-45 transition-all">→</span>
                    </div>
                  </div>
                </div>

                {/* Aesthetic Glow Effect */}
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#f7d774] opacity-0 group-hover:opacity-5 blur-[100px] transition-opacity duration-700"></div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-32">
            <p className="text-gray-700 uppercase tracking-[10px] text-[10px] font-black animate-pulse">
              No Listings Found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
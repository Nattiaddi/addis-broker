import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; 
import { translations } from '../translations'; // ትርጉሙን እናስገባለን

const Home = ({ lang }) => {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  const t = translations[lang]; // አሁን ያለውን ቋንቋ እንመርጣለን

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase.from('listings').select('*');
      if (error) console.error(error);
      else setListings(data);
    };
    fetchListings();
  }, []);

  const filteredListings = listings.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || item.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-black text-white">
      <section className="hero py-20 text-center">
        <h1 className="text-[#f7d774] text-4xl md:text-6xl font-black uppercase mb-10 tracking-tighter">
          {t.welcome}
        </h1>
        {/* የቆዩት 3D ምስሎች እዚህ ይቀጥላሉ... */}
      </section>

      <div className="max-w-5xl mx-auto px-6 -mt-10 mb-16">
        <div className="bg-[#111] p-6 rounded-3xl border border-gray-900 shadow-2xl">
          <input 
            type="text"
            placeholder={t.search_placeholder}
            className="w-full bg-black border border-gray-800 p-4 rounded-xl text-white outline-none mb-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-3">
            {['all', 'house', 'car'].map(type => (
              <button 
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2 rounded-full uppercase text-[10px] font-bold tracking-widest border transition-all ${
                  filter === type ? 'bg-[#f7d774] text-black border-[#f7d774]' : 'border-gray-800 text-gray-500'
                }`}
              >
                {t[type]} {/* እዚህ ጋር ትርጉሙን ይጠቀማል */}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 pb-32">
        {filteredListings.map(item => (
          <div key={item.id} className="bg-[#0c0c0c] border border-gray-900 p-4 rounded-3xl hover:border-[#f7d774]/50 transition-all">
            <img src={item.image} className="w-full h-64 object-cover rounded-2xl mb-5" alt={item.title} />
            <h3 className="text-[#f7d774] font-black text-xl uppercase italic">{item.title}</h3>
            <p className="text-gray-500 text-xs mt-1 mb-4">📍 {item.location}</p>
            <div className="flex justify-between items-center pt-4 border-t border-gray-900">
               <span className="text-white font-black text-xl">{item.price}</span>
               <a href={`https://wa.me/251900000000`} className="bg-[#f7d774] text-black px-5 py-2 rounded-xl text-[10px] font-bold uppercase">
                 {t.inquiry}
               </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
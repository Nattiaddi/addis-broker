import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; 

const Home = () => {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

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
      {/* 1. HERO SECTION - Header እዚህ ጋር ጠፍቷል ምክንያቱም App.jsx ላይ ስላለ */}
      <section className="hero py-20 text-center">
        <h1 className="text-[#f7d774] text-5xl font-black uppercase tracking-tighter mb-10">
          Addis Broker
        </h1>
        
        {/* 3D Floating Images */}
        <div className="image-container flex justify-center gap-6 perspective-1000">
          <div className="floating-placeholder w-48 h-64 border border-[#f7d774] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(247,215,116,0.2)]">
             <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=400" className="w-full h-full object-cover" alt="Villa" />
          </div>
          <div className="floating-placeholder w-48 h-64 border border-[#f7d774] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(247,215,116,0.2)] mt-10">
             <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=400" className="w-full h-full object-cover" alt="Car" />
          </div>
          <div className="floating-placeholder w-48 h-64 border border-[#f7d774] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(247,215,116,0.2)]">
             <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400" className="w-full h-full object-cover" alt="Luxury" />
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 -mt-10 mb-16">
        <div className="bg-[#111] p-6 rounded-3xl border border-gray-900 shadow-2xl">
          <input 
            type="text"
            placeholder="Search villas, apartments, or cars..."
            className="w-full bg-black border border-gray-800 p-4 rounded-xl text-white focus:border-[#f7d774] outline-none mb-4"
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
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. LISTINGS GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-32">
        {filteredListings.length > 0 ? (
          filteredListings.map(item => (
            <div key={item.id} className="bg-[#0c0c0c] border border-gray-900 p-4 rounded-3xl hover:border-[#f7d774]/50 transition-all group">
              <div className="relative h-64 w-full overflow-hidden rounded-2xl mb-5">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.title} />
              </div>
              <h3 className="text-[#f7d774] font-black text-xl uppercase italic">{item.title}</h3>
              <p className="text-gray-500 text-xs mt-1 mb-4 flex items-center">📍 {item.location}</p>
              <div className="flex justify-between items-center pt-4 border-t border-gray-900">
                 <span className="text-white font-black text-xl">{item.price}</span>
                 <a href={`https://wa.me/251912274917?text=I'm interested in ${item.title}`} className="bg-[#f7d774] text-black px-5 py-2 rounded-xl text-[10px] font-bold uppercase hover:bg-white transition-colors">
                   Inquiry
                 </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600 py-20">No properties found matching your search.</div>
        )}
      </div>
    </div>
  );
};

export default Home;
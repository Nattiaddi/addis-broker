import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { supabase } from '../supabaseClient'; // Ensure this path is correct

const Home = () => {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  // Load data from Supabase
  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase.from('listings').select('*');
      if (error) console.error(error);
      else setListings(data);
    };
    fetchListings();
  }, []);

  const filteredListings = listings.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || item.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      
      {/* HERO SECTION */}
      <section className="hero">
        <h1 className="text-[#f7d774]">Addis Broker</h1>
        <div className="image-container">
          <div className="floating-placeholder">
             <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=400" className="w-full h-full object-cover" alt="Hero 1" />
          </div>
          <div className="floating-placeholder">
             <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=400" className="w-full h-full object-cover" alt="Hero 2" />
          </div>
          <div className="floating-placeholder">
             <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400" className="w-full h-full object-cover" alt="Hero 3" />
          </div>
        </div>
      </section>

      {/* SEARCH & FILTER */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 -mt-10 mb-12">
        <div className="bg-[#111] p-8 rounded-3xl border border-gray-900 shadow-2xl">
          <input 
            type="text"
            placeholder="Search villas, apartments, or cars..."
            className="w-full bg-black border border-gray-800 p-5 rounded-2xl text-white focus:border-[#f7d774] outline-none mb-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-4">
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

      {/* LISTINGS GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
        {filteredListings.map(item => (
          <div key={item.id} className="bg-[#111] border border-gray-900 p-4 rounded-2xl hover:border-[#f7d774] transition-all group">
            <img src={item.image} className="w-full h-64 object-cover rounded-xl mb-4" alt={item.title} />
            <h3 className="text-[#f7d774] font-bold text-xl uppercase tracking-tighter">{item.title}</h3>
            <p className="text-gray-500 text-xs mt-1">{item.location}</p>
            <div className="flex justify-between items-center mt-6">
               <span className="text-white font-black text-lg">{item.price}</span>
               <a href={`https://wa.me/251900000000?text=I'm interested in ${item.title}`} className="bg-white/5 hover:bg-[#f7d774] hover:text-black px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all">
                 Contact
               </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
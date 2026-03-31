import React, { useState } from 'react';
import { listings } from '../data/listings';
import ListingCard from '../components/ListingCard';

const Home = () => {
  // 1. Setup "State" to remember what the user selects
  const [category, setCategory] = useState('ALL');
  const [location, setLocation] = useState('ALL');
  const [type, setType] = useState('ALL');

  // 2. The Filter Logic
  const filteredListings = listings.filter((item) => {
    const matchCategory = category === 'ALL' || item.category === category;
    const matchLocation = location === 'ALL' || item.location.includes(location);
    const matchType = type === 'ALL' || item.status === type;
    return matchCategory && matchLocation && matchType;
  });

  return (
    <div className="bg-addis-black min-h-screen text-white">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 text-center">
        <h1 className="text-6xl font-serif mb-8 italic">Find Excellence in <span className="text-addis-gold">Addis</span></h1>
        
        {/* THE SEARCH ENGINE BAR */}
        <div className="bg-addis-dark p-6 rounded-sm border border-addis-gold/20 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 shadow-2xl">
          
          {/* Category Filter */}
          <div className="text-left">
            <label className="text-[10px] text-addis-gold uppercase font-bold tracking-widest ml-1">Category</label>
            <select 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-black border border-white/10 p-3 mt-1 outline-none focus:border-addis-gold text-sm"
            >
              <option value="ALL">All Categories</option>
              <option value="CAR">Cars</option>
              <option value="APARTMENT">Apartments</option>
              <option value="VILLA">Villas</option>
              <option value="GUEST HOUSE">Guest Houses</option>
            </select>
          </div>

          {/* Location Filter */}
          <div className="text-left">
            <label className="text-[10px] text-addis-gold uppercase font-bold tracking-widest ml-1">Sub-City</label>
            <select 
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-black border border-white/10 p-3 mt-1 outline-none focus:border-addis-gold text-sm"
            >
              <option value="ALL">All of Addis</option>
              <option value="Bole">Bole</option>
              <option value="Kirkos">Kirkos / Kazanchis</option>
              <option value="Yeka">Yeka / CMC</option>
              <option value="Lemi Kura">Lemi Kura / Ayat</option>
            </select>
          </div>

          {/* Buy/Rent Filter */}
          <div className="text-left">
            <label className="text-[10px] text-addis-gold uppercase font-bold tracking-widest ml-1">Service</label>
            <select 
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-black border border-white/10 p-3 mt-1 outline-none focus:border-addis-gold text-sm"
            >
              <option value="ALL">Buy & Rent</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>

          {/* Search Button (Visual Only since filtering is live) */}
          <div className="flex items-end">
            <button className="w-full bg-addis-gold text-black font-black py-3 hover:bg-addis-gold-light transition shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              SEARCH
            </button>
          </div>
        </div>
      </section>

      {/* RESULTS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8 flex justify-between items-center">
          <p className="text-gray-500 text-sm">Showing {filteredListings.length} premium results</p>
          {filteredListings.length === 0 && (
            <p className="text-addis-gold font-bold italic">No results found. Try a different filter.</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredListings.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;      
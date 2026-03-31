import React, { useState } from 'react';
import ListingCard from '../components/ListingCard.jsx';

const listings = [
  { id: 1, type: 'house', title: 'Luxury Villa in Bole', price: '45,000,000 ETB', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800', location: 'Bole, Addis Ababa' },
  { id: 2, type: 'car', title: 'Mercedes-Benz G-Wagon', price: '32,000,000 ETB', image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800', location: 'Showroom, Addis' },
  { id: 3, type: 'house', title: 'Modern Apartment', price: '12,500,000 ETB', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800', location: 'Old Airport, Addis' },
  { id: 4, type: 'car', title: 'Toyota Land Cruiser V8', price: '28,500,000 ETB', image: 'https://images.unsplash.com/photo-1594568284297-7c64464062b1?auto=format&fit=crop&q=80&w=800', location: 'Gerji, Addis' },
];

const Home = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Combined Filtering Logic
  const filteredListings = listings.filter((item) => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
            Addis <span className="text-addis-gold text-outline">Broker</span>
          </h1>
          
          {/* SEARCH BAR COMPONENT */}
          <div className="max-w-xl mx-auto relative mb-8">
            <input 
              type="text"
              placeholder="Search by location, title, or property type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111] border border-gray-800 text-white px-6 py-4 rounded-2xl focus:outline-none focus:border-addis-gold transition-all pl-14 shadow-2xl"
            />
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center space-x-4 mb-12">
          {['all', 'house', 'car'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-8 py-2 rounded-full border-2 transition-all duration-300 uppercase font-bold tracking-widest text-[10px] ${
                filter === type 
                ? 'border-addis-gold bg-addis-gold text-black' 
                : 'border-gray-900 text-gray-500 hover:border-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-gray-600 text-xs mb-8 uppercase tracking-widest font-bold">
          Showing {filteredListings.length} Premium Listings
        </p>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredListings.length > 0 ? (
            filteredListings.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-gray-800 rounded-3xl">
              <p className="text-gray-500 italic">No listings found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
        
      </div> 
    </div>
  );
};

export default Home;
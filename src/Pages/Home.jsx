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

  const filteredListings = filter === 'all' 
    ? listings 
    : listings.filter(item => item.type === filter);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            FIND YOUR <span className="text-addis-gold">LEGACY</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            The premier marketplace for Ethiopia's most exclusive real estate and vehicles.
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-12">
          {['all', 'house', 'car'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-8 py-2 rounded-full border-2 transition-all duration-300 uppercase font-bold tracking-widest text-xs ${
                filter === type 
                ? 'border-addis-gold bg-addis-gold text-black' 
                : 'border-gray-800 text-gray-500 hover:border-gray-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredListings.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
        
      </div> 
    </div>
  );
};

export default Home;
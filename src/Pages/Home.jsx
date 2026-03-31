import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Import the client
import ListingCard from '../components/ListingCard.jsx';

const Home = () => {
  const [listings, setListings] = useState([]); // Start with empty array
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // FETCH DATA FROM SUPABASE
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching listings:', error);
      } else {
        setListings(data);
      }
      setLoading(false);
    };

    fetchListings();
  }, []);

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
        
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
            Addis <span className="text-addis-gold">Broker</span>
          </h1>
          
          <div className="max-w-xl mx-auto relative mb-8">
            <input 
              type="text"
              placeholder="Search live listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111] border border-gray-800 text-white px-6 py-4 rounded-2xl focus:border-addis-gold outline-none pl-14 transition-all"
            />
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex justify-center space-x-4 mb-12">
          {['all', 'house', 'car'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-8 py-2 rounded-full border-2 transition-all duration-300 uppercase font-bold tracking-widest text-[10px] ${
                filter === type ? 'border-addis-gold bg-addis-gold text-black' : 'border-gray-900 text-gray-500'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20 text-addis-gold animate-pulse">Loading Premium Assets...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredListings.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div> 
    </div>
  );
};

export default Home;
import React from 'react';

const ListingCard = ({ item }) => {
  return (
    <div className="group bg-addis-dark border border-white/10 hover:border-addis-gold/50 transition-all duration-500 rounded-sm overflow-hidden shadow-xl">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-addis-gold text-black text-[10px] font-black px-3 py-1 uppercase tracking-tighter">
          {item.status}
        </div>
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] px-3 py-1 border border-white/20 uppercase">
          {item.category}
        </div>
      </div>

      {/* Details Container */}
      <div className="p-6">
        <p className="text-addis-gold text-[10px] uppercase tracking-[0.2em] mb-2">{item.location}</p>
        <h3 className="text-xl font-serif text-white mb-2 group-hover:text-addis-gold transition-colors">{item.title}</h3>
        <p className="text-gray-500 text-sm mb-4">{item.specs}</p>
        
        <div className="flex justify-between items-center pt-4 border-t border-white/5">
          <span className="text-xl font-mono text-white font-bold">{item.price}</span>
          <button className="text-addis-gold text-xs font-bold border-b border-addis-gold hover:text-white hover:border-white transition-all">
            DETAILS
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
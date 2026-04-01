return (
  <div className="bg-black min-h-screen text-white">
    <Header />
    
    {/* 1. HERO SECTION */}
    <section className="hero">
      <h1 className="text-addis-gold">Addis Broker</h1>
      <div className="image-container">
        <div className="floating-placeholder">
           <img src="your-image-url" className="w-full h-full object-cover" />
        </div>
        {/* ... other placeholders ... */}
      </div>
    </section>

    {/* 2. SEARCH & FILTER SECTION (Now with high z-index and padding) */}
    <div className="relative z-20 max-w-7xl mx-auto px-6 -mt-10 mb-12">
      <div className="bg-[#111] p-8 rounded-3xl border border-gray-900 shadow-2xl">
        <input 
          type="text"
          placeholder="Search villas, apartments, or cars..."
          className="w-full bg-black border border-gray-800 p-5 rounded-2xl text-white focus:border-addis-gold outline-none mb-6"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <div className="flex gap-4">
          {['all', 'house', 'car'].map(type => (
            <button 
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-full uppercase text-[10px] font-bold tracking-widest border ${
                filter === type ? 'bg-addis-gold text-black border-addis-gold' : 'border-gray-800 text-gray-500'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* 3. LISTINGS GRID */}
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
      {filteredListings.map(item => (
        <div key={item.id} className="tool-card group">
          <img src={item.image} className="w-full h-64 object-cover rounded-xl mb-4" />
          <h3 className="text-addis-gold font-bold text-xl">{item.title}</h3>
          {/* DESCRIPTION ADDED HERE */}
          <p className="text-gray-400 text-sm mt-2">{item.location}</p>
          <div className="flex justify-between items-center mt-4">
             <span className="text-white font-black">{item.price}</span>
             <button className="text-[#f7d774] text-xs font-bold uppercase tracking-tighter">View Details</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
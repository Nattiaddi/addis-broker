import React from 'react';

const ListingCard = ({ item }) => {
  // Your professional broker number (Format: 2519...)
  const brokerPhone = "251911223344"; 
  
  // Custom message for the broker
  const message = `Hello AddisBroker, I am interested in the ${item.title} located in ${item.location} listed for ${item.price}. Is it still available?`;
  
  // Encodes the message for the URL
  const whatsappUrl = `https://wa.me/${brokerPhone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-addis-gold transition-all duration-500 group">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-addis-gold uppercase tracking-widest">
          {item.type}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
        </div>
        <p className="text-gray-400 text-sm mb-4 flex items-center">
          <span className="mr-1">📍</span> {item.location}
        </p>
        
        <div className="flex items-center justify-between mt-6">
          <div>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Price</p>
            <p className="text-addis-gold font-black text-lg">{item.price}</p>
          </div>
          
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer" 
            className="bg-white text-black hover:bg-addis-gold px-4 py-2 rounded-lg font-bold text-sm transition-colors duration-300 flex items-center"
          >
            Contact Broker
          </a>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
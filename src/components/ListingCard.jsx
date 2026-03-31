import React from 'react';

const ListingCard = ({ item }) => {
  // CONFIGURATION: Replace with your actual contact info
  const brokerPhone = "251911223344"; // Format: 251...
  const telegramUsername = "AddisBroker_Official"; // Your Telegram @username
  
  // MESSAGE TEMPLATE
  const message = `Hello, I'm interested in the ${item.title} (${item.type}) in ${item.location} listed for ${item.price}. Is this still available?`;
  const encodedMsg = encodeURIComponent(message);

  // CONTACT URLS
  const whatsappUrl = `https://wa.me/${brokerPhone}?text=${encodedMsg}`;
  const telegramUrl = `https://t.me/${telegramUsername}?text=${encodedMsg}`;

  return (
    <div className="bg-[#111] rounded-2xl overflow-hidden border border-gray-800 hover:border-addis-gold transition-all duration-500 group flex flex-col h-full">
      
      {/* IMAGE SECTION */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-addis-gold uppercase tracking-widest border border-addis-gold/30">
          {item.type}
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white tracking-tight mb-1 group-hover:text-addis-gold transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-500 text-sm flex items-center">
            <span className="text-addis-gold mr-2">📍</span> {item.location}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-gray-600 text-[10px] uppercase font-black tracking-tighter">Investment</p>
              <p className="text-2xl font-black text-white">{item.price}</p>
            </div>
          </div>

          {/* DUAL CONTACT BUTTONS */}
          <div className="grid grid-cols-2 gap-3">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white py-3 rounded-xl text-xs font-bold transition-all duration-300"
            >
              WHATSAPP
            </a>
            <a 
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#0088cc]/10 text-[#0088cc] border border-[#0088cc]/30 hover:bg-[#0088cc] hover:text-white py-3 rounded-xl text-xs font-bold transition-all duration-300"
            >
              TELEGRAM
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
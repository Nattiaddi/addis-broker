const Footer = () => (
  <footer className="bg-[#080808] border-t border-gray-900 pt-16 pb-8 px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
      
      {/* BRAND */}
      <div>
        <h2 className="text-[#f7d774] font-black text-2xl mb-4 italic">ADDIS BROKER</h2>
        <p className="text-gray-500 text-sm">The most trusted luxury real estate and automotive marketplace in Ethiopia.</p>
      </div>

      {/* CONTACT */}
      <div>
        <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-4">Contact Us</h4>
        <p className="text-gray-400 text-sm mb-2">Phone: +251 900 000 000</p>
        <p className="text-gray-400 text-sm">Email: info@addisbroker.com</p>
      </div>

      {/* ADDRESS */}
      <div>
        <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-4">Office Address</h4>
        <p className="text-gray-400 text-sm">Bole, Behind Edna Mall</p>
        <p className="text-gray-400 text-sm">Addis Ababa, Ethiopia</p>
      </div>
      
    </div>

    <div className="text-center pt-8 border-t border-gray-900 text-[10px] text-gray-600 uppercase tracking-widest">
      © 2026 Addis Broker. All Rights Reserved.
    </div>
  </footer>
);

export default Footer;
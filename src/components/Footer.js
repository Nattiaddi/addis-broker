const Footer = () => (
  <footer className="bg-addis-black border-t border-addis-gold/20 text-white p-12 mt-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      <div>
        <h3 className="text-addis-gold font-bold mb-4">ADDISBROKER</h3>
        <p className="text-gray-500 text-sm">The gold standard for real estate and premium vehicles in Ethiopia.</p>
      </div>
      <div>
        <h4 className="text-xs font-black uppercase mb-4 tracking-widest text-gray-400">Headquarters</h4>
        <p className="text-sm">Bole, 22, Addis Ababa, Ethiopia</p>
        <p className="text-addis-gold text-lg mt-2 font-mono">+251 912 27 49 17</p>
      </div>
      <div>
        <h4 className="text-xs font-black uppercase mb-4 tracking-widest text-gray-400">Categories</h4>
        <div className="text-sm text-gray-500 grid grid-cols-2 gap-2">
          <span>Cars</span><span>Apartments</span><span>Villas</span><span>Guest Houses</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
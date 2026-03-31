const About = () => (
  <div className="bg-addis-black min-h-screen text-white">
    <Navbar />
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-serif text-addis-gold mb-8">Pioneering Ethiopian Brokerage</h2>
      <p className="text-gray-400 leading-relaxed mb-6">
        Based in the vibrant 22 area of Bole, AddisBroker is Ethiopia's premier luxury marketplace. 
        In 2026, as Addis Ababa transforms into a global financial hub, we bridge the gap between 
        elite property owners and discerning buyers.
      </p>
      <div className="grid grid-cols-2 gap-8 mt-12">
        <div className="border-l-2 border-addis-gold pl-6">
          <h4 className="text-2xl font-bold">100%</h4>
          <p className="text-gray-500 text-xs uppercase">Verified Listings</p>
        </div>
        <div className="border-l-2 border-addis-gold pl-6">
          <h4 className="text-2xl font-bold">Addis Ababa</h4>
          <p className="text-gray-500 text-xs uppercase">Local Expertise</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);
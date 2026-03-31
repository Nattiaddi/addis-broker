const Contact = () => (
  <div className="bg-addis-black min-h-screen text-white">
    <Navbar />
    <div className="max-w-6xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
      <div>
        <h2 className="text-4xl font-serif text-addis-gold mb-6">Get In Touch</h2>
        <p className="text-gray-400 mb-10">Visit our office for a private consultation regarding your property or vehicle needs.</p>
        
        <div className="space-y-6">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Office Address</p>
            <p className="text-xl">Bole, 22, Addis Ababa, Ethiopia</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Direct Line</p>
            <p className="text-2xl text-addis-gold font-mono">+251 912 27 49 17</p>
          </div>
        </div>
      </div>
      
      <form className="bg-addis-dark p-8 border border-addis-gold/10 rounded">
        <input type="text" placeholder="Your Name" className="w-full bg-black border border-gray-800 p-4 mb-4 rounded outline-none focus:border-addis-gold" />
        <input type="email" placeholder="Email Address" className="w-full bg-black border border-gray-800 p-4 mb-4 rounded outline-none focus:border-addis-gold" />
        <textarea placeholder="How can we help you?" rows="4" className="w-full bg-black border border-gray-800 p-4 mb-6 rounded outline-none focus:border-addis-gold"></textarea>
        <button className="w-full bg-addis-gold text-black font-bold py-4 rounded">SEND MESSAGE</button>
      </form>
    </div>
    <Footer />
  </div>
);
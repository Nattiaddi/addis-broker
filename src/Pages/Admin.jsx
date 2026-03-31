import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Admin = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'house',
    price: '',
    location: '',
    image: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Uploading...');

    const { data, error } = await supabase
      .from('listings')
      .insert([formData]);

    if (error) {
      setStatus('Error: ' + error.message);
    } else {
      setStatus('Success! Listing added to AddisBroker.');
      setFormData({ title: '', type: 'house', price: '', location: '', image: '' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-4">
      <div className="max-w-xl mx-auto bg-[#111] p-8 rounded-3xl border border-gray-800">
        <h2 className="text-3xl font-black mb-8 text-addis-gold uppercase tracking-tighter">Add New Asset</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="text" placeholder="Property/Car Title" required
            className="w-full bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-addis-gold"
            value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          
          <select 
            className="w-full bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-addis-gold"
            value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}
          >
            <option value="house">House / Villa</option>
            <option value="car">Vehicle</option>
          </select>

          <input 
            type="text" placeholder="Price (e.g. 12,000,000 ETB)" required
            className="w-full bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-addis-gold"
            value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
          />

          <input 
            type="text" placeholder="Location (e.g. Bole, Addis)" required
            className="w-full bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-addis-gold"
            value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})}
          />

          <input 
            type="text" placeholder="Image URL (Unsplash or direct link)" required
            className="w-full bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-addis-gold"
            value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})}
          />

          <button 
            type="submit" 
            className="w-full bg-addis-gold text-black font-black py-4 rounded-xl uppercase tracking-widest hover:bg-yellow-500 transition-all"
          >
            Publish Listing
          </button>
        </form>
        {status && <p className="mt-6 text-center text-sm font-bold text-gray-400">{status}</p>}
      </div>
    </div>
  );
};

export default Admin;
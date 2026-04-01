import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Admin = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    image: '',
    type: 'house' // Default type
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('በመላክ ላይ...');

    const { data, error } = await supabase
      .from('listings')
      .insert([formData]);

    if (error) {
      console.error(error);
      setStatus('ስህተት ተፈጥሯል፡ ' + error.message);
    } else {
      setStatus('በስኬት ተጨምሯል! ✅');
      setFormData({ title: '', price: '', location: '', image: '', type: 'house' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#0a0a0a] rounded-3xl border border-gray-900 my-10">
      <h2 className="text-[#f7d774] text-3xl font-black mb-8 uppercase italic">Add New Listing</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="text" placeholder="ንብረት ስም (Title)" 
            className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#f7d774]"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          <input 
            type="text" placeholder="ዋጋ (Price) - ምሳሌ፡ 5,000,000 ETB" 
            className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#f7d774]"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="text" placeholder="አድራሻ (Location)" 
            className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#f7d774]"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            required
          />
          <select 
            className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#f7d774]"
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
          >
            <option value="house">ቤት (House)</option>
            <option value="car">መኪና (Car)</option>
          </select>
        </div>

        <input 
          type="text" placeholder="የምስል ሊንክ (Image URL)" 
          className="w-full bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#f7d774]"
          value={formData.image}
          onChange={(e) => setFormData({...formData, image: e.target.value})}
          required
        />

        <button 
          type="submit" 
          className="w-full bg-[#f7d774] text-black font-bold py-4 rounded-xl uppercase hover:bg-white transition-all"
        >
          መረጃውን መዝግብ
        </button>
      </form>

      {status && <p className="mt-6 text-center text-[#f7d774] font-bold">{status}</p>}
    </div>
  );
};

export default Admin;
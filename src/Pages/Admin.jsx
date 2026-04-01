import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Admin = () => {
  const [formData, setFormData] = useState({ title: '', price: '', location: '', type: 'house' });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleUpload = async () => {
    if (!file) return null;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('listings-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('listings-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('በመጫን ላይ... ⏳');

    try {
      const imageUrl = await handleUpload();
      if (!imageUrl) throw new Error("እባክህ ፎቶ ምረጥ");

      const { error } = await supabase
        .from('listings')
        .insert([{ ...formData, image: imageUrl }]);

      if (error) throw error;

      setStatus('በስኬት ተመዝግቧል! ✅');
      setFormData({ title: '', price: '', location: '', type: 'house' });
      setFile(null);
    } catch (err) {
      setStatus('ስህተት፡ ' + err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#0a0a0a] rounded-3xl border border-gray-900 my-10">
      <h2 className="text-[#f7d774] text-3xl font-black mb-8 uppercase italic">Add New Property</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="ርዕስ (Title)" className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#f7d774]" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
          <input type="text" placeholder="ዋጋ (Price)" className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#f7d774]" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="አድራሻ (Location)" className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#f7d774]" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
          <select className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#f7d774]" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
            <option value="house">ቤት (House)</option>
            <option value="car">መኪና (Car)</option>
          </select>
        </div>

        <div className="border-2 border-dashed border-gray-800 p-10 rounded-xl text-center hover:border-[#f7d774] transition-all">
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="cursor-pointer text-gray-500">
            {file ? `ተመርጧል: ${file.name}` : "ፎቶ እዚህ ጋር ይጫኑ (Click to upload)"}
          </label>
        </div>

        <button type="submit" className="w-full bg-[#f7d774] text-black font-bold py-4 rounded-xl uppercase hover:bg-white transition-all shadow-lg shadow-[#f7d774]/10">
          መረጃውን መዝግብ
        </button>
      </form>
      {status && <p className="mt-6 text-center text-[#f7d774] font-bold">{status}</p>}
    </div>
  );
};

export default Admin;
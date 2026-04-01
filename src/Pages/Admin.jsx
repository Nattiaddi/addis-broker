import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { translations } from '../translations'; // ይህ መኖሩን አረጋግጥ

const Admin = ({ lang = 'en' }) => { // lang ከ App.jsx በ Props በኩል ይመጣል
  const [formData, setFormData] = useState({ title: '', price: '', location: '', type: 'house' });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  // የቋንቋ ትርጉሙን እንይዛለን
  const t = translations[lang] || translations['en'];

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
    
    // በመጫን ላይ መሆኑን በቋንቋው ያሳያል
    setStatus(lang === 'am' ? 'በመጫን ላይ... ⏳' : 'Uploading... ⏳');

    try {
      const imageUrl = await handleUpload();
      if (!imageUrl) throw new Error(lang === 'am' ? "እባክህ ፎቶ ምረጥ" : "Please select an image");

      const { error } = await supabase
        .from('listings')
        .insert([{ ...formData, image: imageUrl }]);

      if (error) throw error;

      // በስኬት ሲጠናቀቅ
      setStatus(lang === 'am' ? 'በስኬት ተመዝግቧል! ✅' : 'Successfully Registered! ✅');
      
      // ፎርሙን ባዶ ማድረግ
      setFormData({ title: '', price: '', location: '', type: 'house' });
      setFile(null);
      
      // ከ 3 ሰከንድ በኋላ የ "Success" መልዕክቱን ማጥፋት
      setTimeout(() => setStatus(''), 3000);

    } catch (err) {
      setStatus(lang === 'am' ? 'ስህተት፡ ' : 'Error: ' + err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#0a0a0a] rounded-3xl border border-gray-900 my-10 shadow-2xl">
      <h2 className="text-[#f7d774] text-3xl font-black mb-8 uppercase italic tracking-tighter">
        {lang === 'am' ? 'አዲስ ንብረት መመዝገቢያ' : 'Add New Property'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="text" 
            placeholder={lang === 'am' ? 'ርዕስ (ለምሳሌ፡ ዘመናዊ ቪላ)' : 'Title (e.g. Modern Villa)'} 
            className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#f7d774] transition-all" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            required 
          />
          <input 
            type="text" 
            placeholder={lang === 'am' ? 'ዋጋ (ለምሳሌ፡ 10M ETB)' : 'Price (e.g. 10M ETB)'} 
            className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#f7d774] transition-all" 
            value={formData.price} 
            onChange={(e) => setFormData({...formData, price: e.target.value})} 
            required 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="text" 
            placeholder={lang === 'am' ? 'አድራሻ (ለምሳሌ፡ ቦሌ)' : 'Location (e.g. Bole)'} 
            className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#f7d774] transition-all" 
            value={formData.location} 
            onChange={(e) => setFormData({...formData, location: e.target.value})} 
            required 
          />
          <select 
            className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#f7d774] transition-all" 
            value={formData.type} 
            onChange={(e) => setFormData({...formData, type: e.target.value})}
          >
            <option value="house">{t.house}</option>
            <option value="car">{t.car}</option>
          </select>
        </div>

        {/* File Upload Box */}
        <div className="border-2 border-dashed border-gray-800 p-10 rounded-2xl text-center hover:border-[#f7d774] transition-all bg-black/50 group cursor-pointer relative">
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setFile(e.target.files[0])} 
            className="absolute inset-0 opacity-0 cursor-pointer" 
            id="file-upload" 
          />
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl group-hover:scale-125 transition-transform">📸</span>
            <p className="text-gray-500 font-medium">
              {file ? `${file.name}` : (lang === 'am' ? "ፎቶ እዚህ ጋር ይጫኑ" : "Click to upload photo")}
            </p>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#f7d774] text-black font-black py-5 rounded-2xl uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-[#f7d774]/10 active:scale-95"
        >
          {lang === 'am' ? 'መረጃውን መዝግብ' : 'Register Listing'}
        </button>
      </form>

      {status && (
        <div className="mt-8 p-4 bg-gray-900/50 rounded-xl border border-gray-800 animate-fade-in">
           <p className="text-center text-[#f7d774] font-black italic uppercase text-sm tracking-widest">
             {status}
           </p>
        </div>
      )}
    </div>
  );
};

export default Admin;
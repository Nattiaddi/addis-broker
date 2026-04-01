import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { translations } from '../translations';

const Admin = ({ lang = 'en' }) => {
  const [formData, setFormData] = useState({ title: '', price: '', location: '', type: 'house' });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [items, setItems] = useState([]);

  const t = translations[lang] || translations['en'];

  // --- 1. ዳታውን ከ Supabase መሳብ ---
  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // --- 2. ፎቶውን ወደ Storage መጫን ---
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

  // --- 3. አዲስ ንብረት መመዝገብ ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(lang === 'am' ? 'በመጫን ላይ... ⏳' : 'Uploading... ⏳');

    try {
      const imageUrl = await handleUpload();
      if (!imageUrl) throw new Error(lang === 'am' ? "እባክህ ፎቶ ምረጥ" : "Please select an image");

      const { error } = await supabase
        .from('listings')
        .insert([{ ...formData, image: imageUrl }]);

      if (error) throw error;

      setStatus(lang === 'am' ? 'በስኬት ተመዝግቧል! ✅' : 'Successfully Registered! ✅');
      setFormData({ title: '', price: '', location: '', type: 'house' });
      setFile(null);
      fetchItems(); // ዝርዝሩን ወዲያውኑ አድስ
      
      setTimeout(() => setStatus(''), 4000);
    } catch (err) {
      setStatus((lang === 'am' ? 'ስህተት፡ ' : 'Error: ') + err.message);
    }
  };

  // --- 4. ንብረትን ማጥፋት (Delete) ---
  const handleDelete = async (id) => {
    const confirmMsg = lang === 'am' ? "እርግጠኛ ነህ ይጥፋ?" : "Are you sure you want to delete this?";
    if (window.confirm(confirmMsg)) {
      try {
        const { error } = await supabase.from('listings').delete().eq('id', id);
        if (error) throw error;
        
        setStatus(lang === 'am' ? "ተሰርዟል! 🗑️" : "Deleted! 🗑️");
        fetchItems();
        setTimeout(() => setStatus(''), 3000);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 pb-40">
      
      {/* መመዝገቢያ ፎርም */}
      <div className="bg-[#0a0a0a] p-8 md:p-12 rounded-[2.5rem] border border-gray-900 shadow-2xl mb-20">
        <h2 className="text-[#f7d774] text-3xl font-black mb-10 uppercase italic tracking-tighter">
          {lang === 'am' ? 'አዲስ ንብረት መመዝገቢያ' : 'Add New Property'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" 
              placeholder={lang === 'am' ? 'ርዕስ (ለምሳሌ፡ ዘመናዊ ቪላ)' : 'Title (e.g. Modern Villa)'} 
              className="bg-black border border-gray-800 p-5 rounded-2xl text-white outline-none focus:border-[#f7d774] transition-all" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              required 
            />
            <input 
              type="text" 
              placeholder={lang === 'am' ? 'ዋጋ (ለምሳሌ፡ 10M ETB)' : 'Price (e.g. 10M ETB)'} 
              className="bg-black border border-gray-800 p-5 rounded-2xl text-white outline-none focus:border-[#f7d774] transition-all" 
              value={formData.price} 
              onChange={(e) => setFormData({...formData, price: e.target.value})} 
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" 
              placeholder={lang === 'am' ? 'አድራሻ (ለምሳሌ፡ ቦሌ)' : 'Location (e.g. Bole)'} 
              className="bg-black border border-gray-800 p-5 rounded-2xl text-white outline-none focus:border-[#f7d774] transition-all" 
              value={formData.location} 
              onChange={(e) => setFormData({...formData, location: e.target.value})} 
              required 
            />
            <select 
              className="bg-black border border-gray-800 p-5 rounded-2xl text-white outline-none focus:border-[#f7d774] transition-all appearance-none" 
              value={formData.type} 
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="house">{t.house || "House"}</option>
              <option value="car">{t.car || "Car"}</option>
            </select>
          </div>

          {/* Image Upload Box */}
          <div className="border-2 border-dashed border-gray-800 p-12 rounded-[2rem] text-center hover:border-[#f7d774]/50 transition-all bg-black/30 group relative">
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setFile(e.target.files[0])} 
              className="absolute inset-0 opacity-0 cursor-pointer z-10" 
            />
            <div className="flex flex-col items-center gap-3">
              <span className="text-4xl group-hover:scale-110 transition-transform duration-500">📸</span>
              <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                {file ? file.name : (lang === 'am' ? "ፎቶ ለመምረጥ እዚህ ጋር ይጫኑ" : "Click to upload image")}
              </p>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#f7d774] text-black font-black py-6 rounded-2xl uppercase tracking-[4px] hover:bg-white transition-all shadow-xl shadow-[#f7d774]/10 active:scale-[0.98]"
          >
            {lang === 'am' ? 'መረጃውን መዝግብ' : 'Register Listing'}
          </button>
        </form>

        {status && (
          <div className="mt-8 text-center animate-pulse">
            <p className="text-[#f7d774] font-black italic uppercase text-xs tracking-[2px]">{status}</p>
          </div>
        )}
      </div>

      {/* ማስተዳደሪያ ዝርዝር (Manage Section) */}
      <div className="border-t border-gray-900 pt-16">
        <h3 className="text-white text-2xl font-black mb-10 uppercase italic tracking-[6px]">
          {lang === 'am' ? 'የተመዘገቡ ንብረቶች' : 'Manage Inventory'}
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-[#050505] border border-gray-900 p-5 rounded-3xl hover:border-red-900/50 transition-all group">
              <div className="flex items-center gap-6">
                <img src={item.image} className="w-16 h-16 object-cover rounded-xl border border-gray-800" alt="" />
                <div>
                  <p className="text-white font-black text-sm uppercase tracking-tight group-hover:text-[#f7d774] transition-colors">{item.title}</p>
                  <p className="text-gray-600 text-[10px] font-bold uppercase mt-1 tracking-widest">{item.price} — {item.location}</p>
                </div>
              </div>
              
              <button 
                onClick={() => handleDelete(item.id)}
                className="bg-red-950/20 text-red-600 px-6 py-3 rounded-xl hover:bg-red-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest border border-red-900/20"
              >
                {lang === 'am' ? 'አጥፋ' : 'Delete'}
              </button>
            </div>
          ))}
          
          {items.length === 0 && (
            <p className="text-gray-800 text-center py-10 uppercase text-[10px] font-black tracking-[10px]">Empty Inventory</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
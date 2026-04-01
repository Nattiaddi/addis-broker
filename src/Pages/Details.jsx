import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { translations } from '../translations';

const Details = ({ lang }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const t = translations[lang];

  useEffect(() => {
    const fetchItem = async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(error);
        navigate('/'); // ስህተት ካለ ወደ መነሻ ገጽ ይመልሰው
      } else {
        setItem(data);
      }
    };
    fetchItem();
  }, [id, navigate]);

  if (!item) return <div className="text-center py-20 text-white italic">Loading...</div>;

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-8 text-[#f7d774] text-xs uppercase font-bold tracking-widest flex items-center gap-2">
          ← Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* IMAGE SIDE */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#f7d774] to-transparent rounded-3xl blur opacity-20"></div>
            <img 
              src={item.image} 
              className="relative w-full h-[500px] object-cover rounded-3xl border border-gray-900 shadow-2xl" 
              alt={item.title} 
            />
          </div>

          {/* INFO SIDE */}
          <div className="flex flex-col justify-center">
            <span className="text-[#f7d774] uppercase text-[10px] font-black tracking-[5px] mb-4 block italic">
              Luxury {item.type}
            </span>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-6 italic leading-none">
              {item.title}
            </h1>
            <p className="text-gray-400 text-lg mb-8 flex items-center gap-2">
              📍 {item.location}
            </p>

            <div className="bg-[#080808] border border-gray-900 p-8 rounded-3xl mb-10">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-gray-600 text-[10px] uppercase font-bold mb-1">Price</p>
                  <p className="text-3xl font-black text-white italic">{item.price}</p>
                </div>
                <a 
                  href={`https://wa.me/251900000000?text=I'm interested in ${item.title}`}
                  className="bg-[#f7d774] text-black px-8 py-4 rounded-2xl font-black uppercase text-xs hover:bg-white transition-all shadow-[0_10px_20px_rgba(247,215,116,0.2)]"
                >
                  {t.inquiry}
                </a>
              </div>
            </div>

            {/* ADDITIONAL SPECS (ለወደፊቱ የሚጨመሩ) */}
            <div className="grid grid-cols-2 gap-4">
               <div className="border border-gray-900 p-4 rounded-2xl">
                  <p className="text-gray-600 text-[10px] uppercase font-bold">Status</p>
                  <p className="text-white text-sm font-bold uppercase">Available</p>
               </div>
               <div className="border border-gray-900 p-4 rounded-2xl">
                  <p className="text-gray-600 text-[10px] uppercase font-bold">Verification</p>
                  <p className="text-[#f7d774] text-sm font-bold uppercase italic">Verified</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
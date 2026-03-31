import React, { useState } from 'react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false); // Defaulting to Signup for this view
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSignup = (e) => {
    e.preventDefault();
    // Logic: Check if all fields exist
    if(!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      alert("All fields are mandatory for AddisBroker registration.");
      return;
    }
    console.log("Registering User:", formData);
  };

  return (
    <div className="min-h-screen bg-addis-black flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-addis-dark border border-addis-gold/20 p-8 rounded-sm shadow-2xl">
        
        <h2 className="text-2xl font-serif text-white text-center mb-2">Create Account</h2>
        <p className="text-addis-gold text-[10px] text-center uppercase tracking-widest mb-8">Mandatory Registration</p>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* 1. FULL NAME */}
          <div>
            <label className="text-[10px] text-gray-500 uppercase font-black mb-1 block">Full Name *</label>
            <input 
              required
              type="text" 
              className="w-full bg-black border border-white/10 p-3 text-white text-sm outline-none focus:border-addis-gold transition"
              placeholder="e.g. Elias Tesfaye"
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          {/* 2. EMAIL */}
          <div>
            <label className="text-[10px] text-gray-500 uppercase font-black mb-1 block">Email Address *</label>
            <input 
              required
              type="email" 
              className="w-full bg-black border border-white/10 p-3 text-white text-sm outline-none focus:border-addis-gold transition font-mono"
              placeholder="name@company.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* 3. PHONE NUMBER */}
          <div>
            <label className="text-[10px] text-gray-500 uppercase font-black mb-1 block">Phone Number (+251) *</label>
            <div className="flex">
              <span className="bg-white/5 border border-white/10 border-r-0 px-3 flex items-center text-gray-500 text-sm">+251</span>
              <input 
                required
                type="tel" 
                className="w-full bg-black border border-white/10 p-3 text-white text-sm outline-none focus:border-addis-gold transition font-mono"
                placeholder="912274917"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          {/* 4. PASSWORD */}
          <div>
            <label className="text-[10px] text-gray-500 uppercase font-black mb-1 block">Password *</label>
            <input 
              required
              type="password" 
              className="w-full bg-black border border-white/10 p-3 text-white text-sm outline-none focus:border-addis-gold transition"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="pt-4">
            <button className="w-full bg-addis-gold text-black font-black py-4 uppercase tracking-widest text-xs hover:bg-addis-gold-light transition-all shadow-lg">
              Secure Register
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-600 text-[10px]">
          By signing up, you agree to the AddisBroker Terms of Service.
        </p>
      </div>
    </div>
  );
};

export default Auth;
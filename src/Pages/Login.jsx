import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin'); // ከገባ በኋላ ወደ አድሚን ይወስደዋል
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-[#0a0a0a] border border-gray-900 p-10 rounded-[2.5rem] shadow-2xl">
        <h2 className="text-[#f7d774] text-3xl font-black mb-2 uppercase italic tracking-tighter">Admin Login</h2>
        <p className="text-gray-600 text-xs uppercase tracking-widest mb-8 font-bold">Authorized Access Only</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full bg-black border border-gray-800 p-5 rounded-2xl text-white outline-none focus:border-[#f7d774] transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-black border border-gray-800 p-5 rounded-2xl text-white outline-none focus:border-[#f7d774] transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {error && <p className="text-red-500 text-xs font-bold uppercase">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#f7d774] text-black font-black py-5 rounded-2xl uppercase tracking-[4px] hover:bg-white transition-all shadow-xl shadow-[#f7d774]/10 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
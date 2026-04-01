import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (isSignUp) {
        // --- SIGN UP ---
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: { emailRedirectTo: window.location.origin }
        });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Account created! Now you can Sign In.' });
        setIsSignUp(false);
      } else {
        // --- SIGN IN ---
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/admin');
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 bg-black">
      <div className="max-w-md w-full bg-[#0a0a0a] border border-gray-900 p-10 rounded-[2.5rem] shadow-2xl relative">
        
        <h2 className="text-[#f7d774] text-4xl font-black mb-2 uppercase italic tracking-tighter">
          {isSignUp ? 'Create Account' : 'Admin Login'}
        </h2>
        <p className="text-gray-600 text-[10px] uppercase tracking-[4px] mb-10 font-bold border-b border-gray-900 pb-4">
          {isSignUp ? 'New to Addis Broker?' : 'Authorized Access Only'}
        </p>
        
        <form onSubmit={handleAuth} className="space-y-6">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full bg-black border border-gray-800 p-5 rounded-2xl text-white outline-none focus:border-[#f7d774] transition-all placeholder:text-gray-700 font-bold"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-black border border-gray-800 p-5 rounded-2xl text-white outline-none focus:border-[#f7d774] transition-all placeholder:text-gray-700 font-bold"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {message.text && (
            <div className={`text-[10px] font-black uppercase text-center p-4 rounded-xl border animate-pulse ${
              message.type === 'error' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'
            }`}>
              {message.text}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#f7d774] text-black font-black py-5 rounded-2xl uppercase tracking-[4px] hover:bg-white transition-all shadow-xl shadow-[#f7d774]/10 disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-gray-900 pt-6">
          <p className="text-gray-600 text-[10px] uppercase mb-2 font-bold tracking-widest">
            {isSignUp ? "Already have an account?" : "Need an account?"}
          </p>
          <button 
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage({ type: '', text: '' });
            }}
            className="text-[#f7d774] text-[11px] font-black uppercase tracking-[3px] hover:underline transition-all"
          >
            {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
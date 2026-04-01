import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false); // ለመቀያየር
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (isSignUp) {
      // አዲስ አካውንት ለመፍጠር (Sign Up)
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'success', text: 'Account created! You can now sign in.' });
        setIsSignUp(false); // ወደ Login ይመልሰው
      }
    } else {
      // ለመግባት (Sign In)
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        navigate('/admin');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-[#0a0a0a] border border-gray-900 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        
        {/* Luxury Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#f7d774] opacity-5 blur-[100px]"></div>

        <h2 className="text-[#f7d774] text-4xl font-black mb-2 uppercase italic tracking-tighter">
          {isSignUp ? 'Create Account' : 'Admin Login'}
        </h2>
        <p className="text-gray-600 text-[10px] uppercase tracking-[4px] mb-10 font-bold border-b border-gray-900 pb-4">
          {isSignUp ? 'Join Addis Broker' : 'Authorized Access Only'}
        </p>
        
        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-black border border-gray-800 p-5 rounded-2xl text-white outline-none focus:border-[#f7d774] transition-all placeholder:text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-black border border-gray-800 p-5 rounded-2xl text-white outline-none focus:border-[#f7d774] transition-all placeholder:text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {message.text && (
            <p className={`text-[10px] font-black uppercase text-center p-4 rounded-xl border ${
              message.type === 'error' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'
            }`}>
              {message.text}
            </p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#f7d774] text-black font-black py-5 rounded-2xl uppercase tracking-[4px] hover:bg-white transition-all shadow-xl shadow-[#f7d774]/10 disabled:opacity-50 active:scale-95"
          >
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up Now' : 'Sign In')}
          </button>
        </form>

        {/* Toggle between Login and Signup */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-[#f7d774] transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

// Components & Pages
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import Details from './Pages/Details';
import Login from './Pages/Login';

function App() {
  const [lang, setLang] = useState('en');
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. መጀመሪያ ያለውን የሎጊን ሁኔታ (Session) ቼክ ያደርጋል
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. በማንኛውም ሰዓት መግባት ወይም መውጣት ሲኖር ሁኔታውን ይከታተላል
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ፔጁ ሪፍሬሽ ሲሆን ሰሽኑ እስኪመጣ ትንሽ ይጠብቃል
  if (loading) {
    return <div className="bg-black min-h-screen flex items-center justify-center text-[#f7d774] italic uppercase tracking-[5px] text-xs">Loading...</div>;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-white selection:bg-[#f7d774] selection:text-black">
        
        {/* Header - ቋንቋውን እና የሰሽኑን ዳታ ይወስዳል */}
        <Header lang={lang} setLang={setLang} session={session} />
        
        {/* Main Content Area */}
        <div className="flex flex-1 w-full max-w-[1600px] mx-auto pt-24">
          
          {/* LEFT AD SPACE */}
          <aside className="hidden xl:flex w-48 p-4 justify-center border-r border-gray-900/50">
            <div className="w-full h-[600px] flex items-center justify-center text-[10px] text-gray-800 uppercase [writing-mode:vertical-lr] tracking-[10px] font-black opacity-30">
              Advertisement Space
            </div>
          </aside>

          {/* ROUTES SECTION */}
          <main className="flex-1 px-4 md:px-10">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home lang={lang} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/details/:id" element={<Details lang={lang} />} />
              
              {/* Protected Admin Route - ካልገባ ወደ /login ይልከዋል */}
              <Route 
                path="/admin" 
                element={session ? <Admin lang={lang} /> : <Navigate to="/login" />} 
              />

              {/* ማንኛውም ያልተመዘገበ ሊንክ ቢመጣ ወደ Home ይመልሰዋል */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            
            {/* BOTTOM AD SPACE */}
            <div className="w-full h-28 border border-gray-900/50 my-20 flex items-center justify-center text-[10px] text-gray-800 uppercase tracking-[15px] font-black opacity-30 bg-[#050505] rounded-3xl">
              Banner Ad Area
            </div>
          </main>

          {/* RIGHT AD SPACE */}
          <aside className="hidden xl:flex w-48 p-4 justify-center border-l border-gray-900/50">
            <div className="w-full h-[600px] flex items-center justify-center text-[10px] text-gray-800 uppercase [writing-mode:vertical-lr] tracking-[10px] font-black opacity-30 rotate-180">
              Advertisement Space
            </div>
          </aside>
          
        </div>

        {/* Footer */}
        <Footer lang={lang} />
      </div>
    </Router>
  );
}

export default App;
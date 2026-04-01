import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import Details from './Pages/Details'; // ይህ መኖሩን አረጋግጥ

function App() {
  // ቋንቋውን እዚህ ጋር እንገልጻለን
  const [lang, setLang] = useState('en');

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* ለ Header ቋንቋውን እና መቀያየሪያውን እንሰጠዋለን */}
        <Header lang={lang} setLang={setLang} />
        
        <div className="flex flex-1 w-full max-w-[1600px] mx-auto pt-24">
          
          {/* LEFT AD */}
          <aside className="hidden xl:flex w-48 p-4 justify-center">
            <div className="w-full border border-gray-900 h-[600px] flex items-center justify-center text-[10px] text-gray-700 uppercase vertical-text">
              Ads Space
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 px-4">
            <Routes>
              {/* ለሁሉም ገጾች lang የሚለውን ዳታ እናስተላልፋለን */}
              <Route path="/" element={<Home lang={lang} />} />
              <Route path="/admin" element={<Admin lang={lang} />} />
              <Route path="/details/:id" element={<Details lang={lang} />} />
            </Routes>
            
            {/* BOTTOM AD */}
            <div className="w-full h-24 border border-gray-900 my-10 flex items-center justify-center text-[10px] text-gray-700 uppercase">
              Bottom Ad Space
            </div>
          </main>

          {/* RIGHT AD */}
          <aside className="hidden xl:flex w-48 p-4 justify-center">
            <div className="w-full border border-gray-900 h-[600px] flex items-center justify-center text-[10px] text-gray-700 uppercase vertical-text">
              Ads Space
            </div>
          </aside>
          
        </div>

        {/* ለ Footer ቋንቋውን እንሰጠዋለን */}
        <Footer lang={lang} />
      </div>
    </Router>
  );
}

export default App;
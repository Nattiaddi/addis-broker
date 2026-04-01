import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Admin from './Pages/Admin';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Header />
        
        {/* Main Content Area */}
        <div className="flex flex-1 w-full max-w-[1600px] mx-auto pt-24">
          
          {/* LEFT AD SIDEBAR */}
          <aside className="hidden xl:flex w-48 p-4 justify-center">
            <div className="w-full border border-gray-800 h-[600px] flex items-center justify-center text-[10px] text-gray-600 uppercase tracking-widest">
              Advertisement
            </div>
          </aside>

          {/* CENTER FEED */}
          <main className="flex-1 px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
            
            {/* BOTTOM AD */}
            <div className="w-full h-24 border border-gray-800 my-10 flex items-center justify-center text-[10px] text-gray-600 uppercase">
              Bottom Ad Space
            </div>
          </main>

          {/* RIGHT AD SIDEBAR */}
          <aside className="hidden xl:flex w-48 p-4 justify-center">
            <div className="w-full border border-gray-800 h-[600px] flex items-center justify-center text-[10px] text-gray-600 uppercase tracking-widest">
              Advertisement
            </div>
          </aside>
          
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Admin from './Pages/Admin';

function App() {
  return (
    <Router>
      {/* We add 'min-h-screen' and 'flex-col' to ensure the black covers everything */}
      <div className="bg-black min-h-screen text-white flex flex-col">
        <Header />
        
        <div className="flex flex-1 pt-24 max-w-[1400px] mx-auto w-full">
          {/* Left Ad Space */}
          <aside className="hidden lg:block w-32 p-2">
            <div className="border border-gray-800 h-[600px] flex items-center justify-center text-[10px] text-gray-700">ADS</div>
          </aside>

          <main className="flex-1 px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<div className="text-center pt-20">Page Not Found</div>} />
            </Routes>
          </main>

          {/* Right Ad Space */}
          <aside className="hidden lg:block w-32 p-2">
            <div className="border border-gray-800 h-[600px] flex items-center justify-center text-[10px] text-gray-700">ADS</div>
          </aside>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
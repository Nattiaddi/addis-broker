import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer'; // We will create this next

function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white flex flex-col">
        <Header />
        
        {/* MAIN CONTENT WRAPPER WITH SIDEBARS */}
        <div className="flex flex-1 pt-20 max-w-[1600px] mx-auto w-full">
          
          {/* LEFT AD SIDEBAR */}
          <aside className="hidden xl:block w-40 p-4">
             <div className="ad-box-vertical">AD SPACE (LEFT)</div>
          </aside>

          {/* CENTER CONTENT */}
          <main className="flex-1 px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
            
            {/* BOTTOM AD SLOT */}
            <div className="ad-box-horizontal my-10">AD SPACE (BOTTOM)</div>
          </main>

          {/* RIGHT AD SIDEBAR */}
          <aside className="hidden xl:block w-40 p-4">
             <div className="ad-box-vertical">AD SPACE (RIGHT)</div>
          </aside>

        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
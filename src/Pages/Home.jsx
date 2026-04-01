import React from 'react';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="bg-black">
      <Header />
      
      <section className="hero">
        <h1 className="animate-pulse">Premium Assets</h1>
        <div className="ad-box">ADVERTISING SPACE</div>
        
        <div className="image-container">
          {/* We use the 3D boxes to showcase featured properties */}
          <div className="floating-placeholder">
             <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=400" alt="Villa" className="object-cover h-full w-full opacity-60 hover:opacity-100 transition-opacity" />
          </div>
          <div className="floating-placeholder">
             <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=400" alt="Car" className="object-cover h-full w-full" />
          </div>
          <div className="floating-placeholder">
             <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400" alt="Luxury" className="object-cover h-full w-full opacity-60" />
          </div>
        </div>
      </section>

      {/* Your existing Search and Listings Grid go here */}
    </div>
  );
};


export default Home; 
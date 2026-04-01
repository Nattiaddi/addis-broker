import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';   // Add the .jsx extension explicitly
import Admin from './Pages/Admin.jsx'; // Add the .jsx extension explicitly

function App() {
  return (
    <Router>
      <Routes>
        {/* The "/" must be exactly this for the home page */}
        <Route path="/" element={<Home />} />
        
        {/* Ensure there are no typos in "admin" */}
        <Route path="/admin" element={<Admin />} />
        
        {/* If the page is blank, this 'Catch-all' will tell us if the router is working */}
        <Route path="*" element={
          <div className="pt-32 text-center text-white">
            <h1 className="text-4xl">404</h1>
            <p>Router is working, but this path doesn't exist.</p>
            <a href="/" className="text-addis-gold underline">Go Home</a>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
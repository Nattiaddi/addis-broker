import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import Contact from './Pages/Contact.jsx';
import Auth from './Pages/Auth.jsx';
import Navbar from './components/Navbar.jsx'; // Added .jsx
import Footer from './components/Footer.jsx'; // Added .jsx

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
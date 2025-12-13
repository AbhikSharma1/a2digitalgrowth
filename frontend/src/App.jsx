import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIChatbot from "./components/AIChatbot";

// Import your real home page
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Career from "./pages/Career";
import CareerDetail from "./pages/CareerDetail";
import CareerApplication from "./pages/CareerApplication";
import ServiceDetail from "./pages/ServiceDetail";
import ServiceRequest from "./pages/ServiceRequest";
import Admin from "./pages/Admin";
import EmployeePortal from "./pages/EmployeePortal";

function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <Router>
        {/* Navbar always visible */}
        <Navbar />

        {/* Page Routing */}
        <Routes>
        {/* Home Page Route (WORKS when clicking Home in navbar) */}
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/career" element={<Career />} />
        <Route path="/careers/:id" element={<CareerDetail />} />
        <Route path="/careers/:id/apply" element={<CareerApplication />} />
        <Route path="/services/:slug/request" element={<ServiceRequest />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/employee" element={<EmployeePortal />} />
        </Routes>

        {/* Footer always visible */}
        <Footer />
        
        {/* AI Chatbot always visible */}
        <AIChatbot />
      </Router>
    </div>
  );
}

export default App;

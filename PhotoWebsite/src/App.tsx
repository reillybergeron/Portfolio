import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Various from "./components/Various";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render Header if not on the Home page */}
      {location.pathname !== "/" && <Header />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/various" element={<Various />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

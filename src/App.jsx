import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AllSpeakers from "./components/AllSpeakers";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/NavBar";
import SpeakerDetail from "./components/SpeakerDetails"
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfuse from "./components/TermsOfuse";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AllSpeakers" element={<AllSpeakers />} />
        <Route path="/speaker/:slug" element={<SpeakerDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfuse />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

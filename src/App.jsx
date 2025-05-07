import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AllSpeakers from "./components/AllSpeakers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SpeakerDetail from "./components/SpeakerDetails"
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AllSpeakers" element={<AllSpeakers />} />
        <Route path="/speaker/:slug" element={<SpeakerDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

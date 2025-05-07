import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AllSpeakers from "./components/AllSpeakers";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/NavBar";
import SpeakerDetail from "./components/SpeakerDetails"

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

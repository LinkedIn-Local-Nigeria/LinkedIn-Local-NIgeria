import "./App.css";
import Navbar from "./components/NavBar";
import About from "./pages/About";
import FAQs from "./pages/FAQs";
import Speakers from "./pages/Speakers";
import Teams from "./pages/Teams";

function App() {
  return (
    <>
      <Navbar />
      <div
        id="about"
        className="bg-[#fdfdfd] border-t border-gray-300 min-h-screen"
      >
        <About />
      </div>

      <div
        id="speakers"
        className="bg-[#fdfdfd] border-t border-gray-300 min-h-screen"
      >
        <Speakers />
      </div>

      <div
        id="teams"
        className="bg-[#fdfdfd] border-t border-gray-300 min-h-screen"
      >
        <Teams />
      </div>

      <div
        id="faqs"
        className="bg-[#fdfdfd] border-t border-gray-300 min-h-screen"
      >
        <FAQs />
      </div>
    </>
  );
}

export default App;

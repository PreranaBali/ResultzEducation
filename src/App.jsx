import { Routes, Route } from "react-router-dom";
import AuroraNavbar from "./components/navbar/AuroraNavbar";
import HolographicCubeHero from "./pages/utils/HolographicCubeHero";
import CustomCursor from "./pages/utils/CustomCursor";
import ScrollTo from "./pages/utils/ScrollTo";


// Pages
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import Chat from "./components/Chat";

export default function App() {
  return (
    <div className="min-h-screen bg-[#05070c] text-white">
      <AuroraNavbar />
      <ScrollTo/>
      <CustomCursor />
      <Routes>
        <Route
          path="/"
          element={<HomePage hero={<HolographicCubeHero />} />}
        />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/Chat" element={<Chat/>}/>
        <Route path="*" element={<NotFound />} />
       
      </Routes>
    </div>
  );
}

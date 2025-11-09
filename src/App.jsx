import { Routes, Route } from "react-router-dom";
import AuroraNavbar from "./components/navbar/AuroraNavbar";
import HolographicCubeHero from "./pages/utils/HolographicCubeHero";

// Pages
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CoursePage from "./pages/CoursePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen bg-[#05070c] text-white">
      <AuroraNavbar />
      <Routes>
        <Route
          path="/"
          element={<HomePage hero={<HolographicCubeHero />} />}
        />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:coursename" element={<CoursePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

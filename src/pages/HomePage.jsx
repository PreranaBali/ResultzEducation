import HolographicCubeHero from "./utils/HolographicCubeHero";
import SidewaysScroller from "./utils/SidewaysScroller";
import AboutUs from "./utils/AboutUs";
import TeamSection from "./utils/TeamSection";
import Footer from "./utils/Footer";
export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden bg-[#050505] text-white">
      {/* HERO */}
      < HolographicCubeHero/>

      {/* SIDEWAYS SCROLL */}
      <AboutUs/>
      <SidewaysScroller />
      {/* Image burst */}
      {/* <ImageBurst/> */}
      
      <TeamSection/>

      <Footer/>
    </main>
  );
}

import HolographicCubeHero from "./utils/HolographicCubeHero";
import SidewaysScroller from "./utils/SidewaysScroller";
import ImageBurst from "./utils/ImageBurst";
export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden bg-slate-950 text-white">
      {/* HERO */}
      < HolographicCubeHero/>

      {/* SIDEWAYS SCROLL */}
      <SidewaysScroller />

      {/* Image burst */}
      <ImageBurst/>
      <div className="h-[1000px] w-full"></div>
    </main>
  );
}

import Hero from "@/components/Hero";
import TheRoots from "@/components/TheRoots";
import TheNumbers from "@/components/TheNumbers";
import TheMachine from "@/components/TheMachine";
import FilmGrain from "@/components/FilmGrain";
import SideRail from "@/components/SideRail";

export default function Home() {
  return (
    <main>
      <Hero />
      <TheRoots />
      <TheNumbers />
      <TheMachine />
      {/* Remaining placeholder sections */}
      <div id="the-moments" className="h-screen bg-bg flex items-center justify-center">
        <p className="font-mono text-accent text-sm tracking-widest">04 — THE MOMENTS</p>
      </div>
      <div id="the-partners" className="h-screen bg-bg flex items-center justify-center">
        <p className="font-mono text-accent text-sm tracking-widest">05 — THE PARTNERS</p>
      </div>
      <SideRail />
      <FilmGrain />
    </main>
  );
}

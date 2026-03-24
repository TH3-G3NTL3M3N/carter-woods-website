import Hero from "@/components/Hero";
import FilmGrain from "@/components/FilmGrain";
import SideRail from "@/components/SideRail";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Placeholder sections for scroll testing */}
      <div id="the-roots" className="h-screen bg-bg flex items-center justify-center">
        <p className="font-mono text-accent text-sm tracking-widest">01 — THE ROOTS</p>
      </div>
      <div id="the-numbers" className="h-screen bg-bg flex items-center justify-center">
        <p className="font-mono text-accent text-sm tracking-widest">02 — THE NUMBERS</p>
      </div>
      <div id="the-machine" className="h-screen bg-bg flex items-center justify-center">
        <p className="font-mono text-accent text-sm tracking-widest">03 — THE MACHINE</p>
      </div>
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

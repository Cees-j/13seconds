import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function LovableLandingPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <Hero />
      {/* <Features /> */}
      {/* <CTA /> */}
      <Footer />
    </main>
  );
}

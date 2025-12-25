
import LovableLandingPage from "./lovable-landing-page/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "13Seconds - Taylor Swift Edition",
  description: "A quiz game about Taylor Swift",
};

export default function Home() {

  return (
   <LovableLandingPage />
  );
}

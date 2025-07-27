import React from "react";
import Hero from "../../components/home/Hero";
import HowWork from "../../components/home/HowWork";
import Partners from "../../components/home/Partners";
import Stats from "../../components/home/Stats";

export default function Home() {
  return (
    <main className="space-y-10 select-none py-10">
      <Hero />
      <HowWork />
      <Partners />
      <Stats />
    </main>
  );
}

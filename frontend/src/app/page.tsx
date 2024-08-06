import { Appbar } from "@/components/home/app-bar";
import { Hero } from "@/components/home/hero";
import { HeroVideo } from "@/components/home/hero-video";
import React from "react";


export default function Home() {
  return (
    <main className="pb-48">
        <Appbar />
        <Hero />
        <div className="pt-8">
          <HeroVideo />
        </div>
    </main>
  );
}
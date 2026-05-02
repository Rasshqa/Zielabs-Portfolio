"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center bg-zinc-100 dark:bg-[#050505]">
      {/* Simple elegant spinner */}
      <div className="relative flex items-center justify-center">
        <div className="absolute size-16 rounded-full border-2 border-zinc-200 dark:border-white/5" />
        <div className="size-16 rounded-full border-2 border-[#50C878] border-t-transparent animate-spin" />
      </div>
      <span className="mt-4 text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600 animate-pulse">
        Initializing 3D Engine
      </span>
    </div>
  ),
});

export default function HeroSceneWrapper() {
  return <HeroScene />;
}

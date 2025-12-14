"use client";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Link from "next/link";

export default function HeroSection() {
  const words = [
    {
      text: "Impact",
    },
    {
      text: "Visible",
    },
    {
      text: "Tunisia",
      className: "text-primary-600 dark:text-primary-500",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <p className="text-neutral-600 dark:text-neutral-200 text-base sm:text-lg md:text-xl">
        Rendre l&apos;impact social et environnemental visible, mesurable et crédible
      </p>
      <TypewriterEffectSmooth words={words} />
      <p className="text-primary-600 font-semibold text-lg md:text-xl max-w-2xl text-center">
        Alternative aux réseaux sociaux pour valoriser l&apos;engagement réel
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
        <Link
          href="/register"
          className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg shadow-lg"
        >
          Rejoindre la plateforme
        </Link>
        <Link
          href="/missions"
          className="px-8 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg shadow-lg border-2 border-primary-600"
        >
          Découvrir les missions
        </Link>
      </div>
    </div>
  );
}


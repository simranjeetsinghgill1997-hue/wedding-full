import React, { useRef, useEffect } from 'react';
import { WEDDING_DETAILS } from '../data/weddingData';
import { ChevronDown } from 'lucide-react';
import heroVideo from '../assets/images/hf_20260908_152425_90839a05-e7f6-45a0-83df-cf2d1aec7da8.mp4';

interface HeroSectionProps {
  onScrollNext?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollNext }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <section className="snap-panel relative w-screen h-[100svh] overflow-hidden bg-[#0B1A3A] flex flex-col justify-between">
      {/* Background Video (Looping, muted) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle royal darkening overlay for optimal typography legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1A3A]/45 via-transparent to-[#0B1A3A]/60 pointer-events-none" />
      </div>

      {/* Top Section — Names Lockup */}
      <div className="relative z-10 flex flex-col items-center justify-start px-3 text-center pt-[13svh] sm:pt-[15svh] w-full max-w-[440px] mx-auto">
        {/* Groom's Full Name */}
        <h1
          style={{ fontFamily: "'Great Vibes', cursive", width: '401px' }}
          className="font-normal text-5xl sm:text-6xl tracking-wide leading-[1.2] gold-foil-text max-w-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          {WEDDING_DETAILS.groomName}
        </h1>

        {/* "weds" */}
        <div className="my-1.5 flex items-center justify-center gap-3">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#F8CC4F] to-transparent drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
          <span className="font-serif italic font-normal text-sm sm:text-base text-[#F8CC4F] tracking-[0.25em] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            weds
          </span>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent via-[#F8CC4F] to-transparent drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
        </div>

        {/* Bride's Full Name */}
        <h2
          style={{ fontFamily: "'Great Vibes', cursive" }}
          className="font-normal text-5xl sm:text-6xl tracking-wide leading-[1.2] gold-foil-text max-w-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          {WEDDING_DETAILS.brideName}
        </h2>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 w-full flex flex-col items-center pb-6">
        <button
          onClick={onScrollNext}
          aria-label="Scroll to invitation details"
          className="flex flex-col items-center text-[#ECC880] focus:outline-none group mb-2 active:scale-95 transition-transform"
        >
          <div className="w-9 h-9 rounded-full bg-[#0B1A3A]/70 border border-[#C9A24B]/70 flex items-center justify-center shadow-lg animate-bounce backdrop-blur-md">
            <ChevronDown className="w-5 h-5 text-[#ECC880]" />
          </div>
        </button>
      </div>
    </section>
  );
};

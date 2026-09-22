import React, { useRef, useEffect, useState } from 'react';
import { WEDDING_DETAILS } from '../data/weddingData';
import { ChevronDown } from 'lucide-react';
import { HeroBackgroundAnimation } from './HeroBackgroundAnimation';

interface HeroSectionProps {
  onScrollNext?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollNext }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Ensure video is strictly muted and auto-plays on mobile touch browsers
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.play().then(() => {
        setVideoLoaded(true);
      }).catch(() => {
        // Autoplay policy or 403 error fallback
      });
    }
  }, []);

  return (
    <section className="snap-panel relative w-screen h-[100svh] overflow-hidden bg-[#0B1A3A] flex flex-col justify-between">
      {/* High-fidelity Canvas Starry & Golden Bokeh Animation */}
      <HeroBackgroundAnimation />

      {/* Video Layer (Smoothly fades in if video successfully streams) */}
      <div
        className={`absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <video
          ref={videoRef}
          src={WEDDING_DETAILS.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
          onError={() => setVideoLoaded(false)}
          className="w-full h-full object-cover object-center"
        />
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

import { useRef, useEffect, useState, useCallback } from 'react';
import { HeroSection } from './components/HeroSection';
import { BlessingSection } from './components/BlessingSection';
import { CountdownBanner } from './components/CountdownBanner';
import { AudioPlayer, AudioPlayerRef } from './components/AudioPlayer';
import { GoldSparkleOverlay } from './components/GoldSparkleOverlay';
import { CurtainOpeningAnimation } from './components/CurtainOpeningAnimation';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioPlayerRef = useRef<AudioPlayerRef>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const totalSections = 3;

  const scrollToSection = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const height = container.clientHeight || window.innerHeight;
    container.scrollTo({
      top: index * height,
      behavior: 'smooth',
    });
  };

  // Trigger curtain raise and audio playback on user interaction
  const handleTapToBegin = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.startAudio();
    }
  }, [hasStarted]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isLocked = false;
    let lockTimeout: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 18) return;

      const target = e.target as HTMLElement | null;
      const innerScroll = target?.closest('#invitation-inner-scroll') as HTMLElement | null;
      if (innerScroll) {
        const atBottom = innerScroll.scrollTop + innerScroll.clientHeight >= innerScroll.scrollHeight - 8;
        const atTop = innerScroll.scrollTop <= 8;
        if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
          return;
        }
      }

      e.preventDefault();

      if (isLocked) return;

      const height = container.clientHeight || window.innerHeight;
      const currentIdx = Math.round(container.scrollTop / height);

      if (e.deltaY > 0 && currentIdx < totalSections - 1) {
        isLocked = true;
        scrollToSection(currentIdx + 1);
      } else if (e.deltaY < 0 && currentIdx > 0) {
        isLocked = true;
        scrollToSection(currentIdx - 1);
      }

      if (lockTimeout) clearTimeout(lockTimeout);
      lockTimeout = setTimeout(() => {
        isLocked = false;
      }, 550);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const height = container.clientHeight || window.innerHeight;
      const currentIdx = Math.round(container.scrollTop / height);

      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        if (currentIdx < totalSections - 1) {
          e.preventDefault();
          scrollToSection(currentIdx + 1);
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        if (currentIdx > 0) {
          e.preventDefault();
          scrollToSection(currentIdx - 1);
        }
      }
    };

    const handleScroll = () => {
      const height = container.clientHeight || window.innerHeight;
      const idx = Math.round(container.scrollTop / height);
      setCurrentSectionIndex(idx);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      if (lockTimeout) clearTimeout(lockTimeout);
    };
  }, [totalSections]);

  return (
    <main className="relative w-screen h-[100svh] overflow-hidden bg-[#0B1A3A] select-none text-[#FDFBF6]">
      {/* "Tap to Begin" Initial Curtain Overlay */}
      {!hasStarted && (
        <div
          onClick={handleTapToBegin}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleTapToBegin();
            }
          }}
          aria-label="Tap to begin wedding invitation"
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center cursor-pointer bg-[#050B16]/80 backdrop-blur-xs select-none transition-all duration-300"
        >
          {/* Elegant Pulsing "Tap to begin" Button */}
          <div className="flex flex-col items-center gap-3.5 px-6 py-4 rounded-2xl bg-[#0B1A3A]/90 border border-[#C9A24B]/70 shadow-[0_8px_32px_rgba(201,162,75,0.35)] backdrop-blur-md transform transition-transform hover:scale-105 active:scale-95 animate-pulse">
            <span
              style={{ fontFamily: "'Noto Serif Gurmukhi', serif" }}
              className="text-2xl text-[#ECC880] drop-shadow-sm leading-none"
            >
              ੴ
            </span>
            <span className="font-serif text-sm sm:text-base font-semibold tracking-[0.25em] text-[#FFE8A3] uppercase">
              Tap to Begin
            </span>
            <div className="flex items-center gap-2 text-[#C9A24B] text-[10px]">
              <span className="h-[1px] w-6 bg-[#C9A24B]/50" />
              <span className="italic tracking-widest text-[#E8D196]">Royal Invitation</span>
              <span className="h-[1px] w-6 bg-[#C9A24B]/50" />
            </div>
          </div>
        </div>
      )}

      {/* Grand Opening Red Velvet Theater Curtain Mask Animation */}
      <CurtainOpeningAnimation isOpenTriggered={hasStarted} />

      {/* Subtle Festive Gold Starry & Glitter Sparkle Overlay Mask (Hidden on Hero Section) */}
      <GoldSparkleOverlay visible={currentSectionIndex > 0} />

      {/* Background Wedding Music Player & On-Screen Toggle */}
      <AudioPlayer ref={audioPlayerRef} autoStartOnMount={false} />

      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="w-full h-full snap-container overflow-y-auto no-scrollbar relative"
      >
        {/* Section 1 — Hero */}
        <HeroSection onScrollNext={() => scrollToSection(1)} />

        {/* Section 2 — Invitation / Blessing Card */}
        <BlessingSection
          onScrollNext={() => scrollToSection(2)}
          onScrollPrev={() => scrollToSection(0)}
        />

        {/* Section 3 — Countdown Banner (Footer) */}
        <CountdownBanner onScrollTop={() => scrollToSection(0)} />
      </div>
    </main>
  );
}

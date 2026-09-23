import { useRef, useEffect, useState, useCallback } from 'react';
import { HeroSection } from './components/HeroSection';
import { BlessingSection } from './components/BlessingSection';
import { CountdownBanner } from './components/CountdownBanner';
import { AudioPlayer, AudioPlayerRef } from './components/AudioPlayer';
import { GoldSparkleOverlay } from './components/GoldSparkleOverlay';
import { CurtainOpeningAnimation } from './components/CurtainOpeningAnimation';

// Total unified steps in the single-scroll timeline:
// Step 0: Hero Section (Section index 0)
// Step 1: Invitation Details - Subsection 0 (Gurbani Quote) (Section index 1)
// Step 2: Invitation Details - Subsection 1 (Marriage Ceremony & RSVP) (Section index 1)
// Step 3: Invitation Details - Subsection 2 (Sagan and Ring Ceremony) (Section index 1)
// Step 4: Invitation Details - Subsection 3 (Mehendi & Jaggo) (Section index 1)
// Step 5: Invitation Details - Subsection 4 (Wedding Ceremony Programme) (Section index 1)
// Step 6: Countdown Banner & Footer (Section index 2)
const TOTAL_STEPS = 7;

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioPlayerRef = useRef<AudioPlayerRef>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const isLockedRef = useRef(false);
  const lockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to map 7 steps to the 3 full-height section containers
  const getSectionForStep = (step: number) => {
    if (step === 0) return 0;
    if (step === 6) return 2;
    return 1;
  };

  // Helper to map 7 steps to the 5 card subsections (0 through 4)
  const getSubsectionForStep = (step: number) => {
    if (step <= 0) return 0;
    if (step >= 6) return 4;
    return step - 1;
  };

  // Scroll the outer full-height section container
  const scrollToSection = useCallback((sectionIndex: number, behavior: ScrollBehavior = 'smooth') => {
    const container = containerRef.current;
    if (!container) return;
    const height = container.clientHeight || window.innerHeight;
    container.scrollTo({
      top: sectionIndex * height,
      behavior,
    });
  }, []);

  // Trigger curtain raise and audio playback on user interaction
  const handleTapToBegin = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.startAudio();
    }
  }, [hasStarted]);

  // Step advancement / retreat with rate-limiting lock
  const triggerStep = useCallback((direction: 1 | -1) => {
    if (isLockedRef.current) return;

    setCurrentStep((prev) => {
      const next = prev + direction;
      if (next < 0 || next >= TOTAL_STEPS) {
        return prev;
      }

      isLockedRef.current = true;
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
      lockTimeoutRef.current = setTimeout(() => {
        isLockedRef.current = false;
      }, 500);

      return next;
    });
  }, []);

  const goToStep = useCallback((step: number) => {
    const clamped = Math.max(0, Math.min(step, TOTAL_STEPS - 1));
    setCurrentStep(clamped);
  }, []);

  // Synchronize outer container scroll whenever currentStep changes
  useEffect(() => {
    const targetSection = getSectionForStep(currentStep);
    scrollToSection(targetSection, 'smooth');
  }, [currentStep, scrollToSection]);

  // Handle window resizing / mobile rotation to stay perfectly aligned
  useEffect(() => {
    const handleResize = () => {
      const targetSection = getSectionForStep(currentStep);
      scrollToSection(targetSection, 'auto');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentStep, scrollToSection]);

  // Global unified event listeners for wheel, touch, and keyboard
  useEffect(() => {
    // 1. Wheel (Desktop mouse wheel & Laptop trackpad)
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 14) return;
      e.preventDefault();

      if (e.deltaY > 0) {
        triggerStep(1);
      } else {
        triggerStep(-1);
      }
    };

    // 2. Touch (Mobile phone & Tablet swipe gestures)
    let touchStartY: number | null = null;
    let touchStartX: number | null = null;
    let touchTriggered = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) return;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      touchTriggered = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY === null || touchStartX === null) return;
      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const diffY = touchStartY - currentY;
      const diffX = touchStartX - currentX;

      // Prevent native browser rubber-banding/scroll if gesture is mostly vertical
      if (Math.abs(diffY) > 6 && Math.abs(diffY) > Math.abs(diffX)) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }

      // Trigger one step when threshold reached
      if (!touchTriggered && Math.abs(diffY) > 34) {
        touchTriggered = true;
        if (diffY > 0) {
          triggerStep(1); // Swiped up -> next step
        } else {
          triggerStep(-1); // Swiped down -> previous step
        }
      }
    };

    const handleTouchEnd = () => {
      touchStartY = null;
      touchStartX = null;
      touchTriggered = false;
    };

    // 3. Keyboard (Arrow keys, Spacebar, Page Up/Down, Home, End)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        triggerStep(1);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        triggerStep(-1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToStep(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToStep(TOTAL_STEPS - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    };
  }, [triggerStep, goToStep]);

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
      <GoldSparkleOverlay visible={currentStep > 0} />

      {/* Background Wedding Music Player & On-Screen Toggle */}
      <AudioPlayer ref={audioPlayerRef} autoStartOnMount={false} />

      {/* Unified Scroll Container */}
      <div
        ref={containerRef}
        className="w-full h-full snap-container overflow-y-auto no-scrollbar relative overscroll-none"
      >
        {/* Section 0 — Hero */}
        <HeroSection onScrollNext={() => triggerStep(1)} />

        {/* Section 1 — Invitation / Blessing Card with 5 controlled subsections */}
        <BlessingSection
          activeSubsection={getSubsectionForStep(currentStep)}
          onSubsectionChange={(idx) => goToStep(idx + 1)}
        />

        {/* Section 2 — Countdown Banner & Footer */}
        <CountdownBanner onScrollTop={() => goToStep(0)} />
      </div>
    </main>
  );
}

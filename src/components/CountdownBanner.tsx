import React, { useState, useEffect } from 'react';
import { GoldFloralDivider } from './Ornaments';
import { ChevronUp, Share2, Check } from 'lucide-react';

interface CountdownBannerProps {
  onScrollTop?: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({ onScrollTop }) => {
  // Target wedding date: October 31, 2026
  const targetDate = new Date(2026, 9, 31, 10, 30, 0); // Month 9 is October (0-indexed)

  const calculateTime = (): TimeRemaining => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTime);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "Simranjeet & Ravneet's Wedding Invitation",
      text: "You are cordially invited to celebrate the wedding ceremony of Simranjeet Singh Gill and Ravneet Kaur. View the wedding card & ceremonies here:",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User dismissed share dialog
      }
    } else {
      // Fallback: Copy link to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Fallback for restricted clipboard contexts
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'Mins', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'Secs', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <footer
      id="wedding-countdown-banner"
      className="snap-panel relative w-screen h-[100svh] min-h-[100svh] py-6 px-4 bg-gradient-to-b from-[#081226] via-[#0B1A3A] to-[#050C1A] border-t border-[#C9A24B]/35 flex flex-col items-center justify-center text-center overflow-hidden z-20 shadow-2xl"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-48 bg-[#C9A24B]/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center">
        {/* Top Auspicious Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#071126]/90 border border-[#C9A24B]/40 mb-3 shadow-inner">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#F8CC4F] font-serif font-medium">
            ✦ Counting Down To Forever ✦
          </span>
        </div>

        {/* Wedding Date Title */}
        <h3 className="font-serif text-2xl sm:text-3xl text-[#FDFBF6] tracking-wide font-normal mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Saturday, October 31, 2026
        </h3>

        <p className="text-xs sm:text-sm font-sans tracking-[0.18em] uppercase text-[#ECC880]/85 mb-5">
          Simranjeet & Ravneet's Wedding
        </p>

        {/* Counter Grid */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-md mx-auto mb-5">
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="flex flex-col items-center justify-center py-3 sm:py-4 px-2 rounded-xl bg-[#061024]/85 border border-[#C9A24B]/40 shadow-[0_4px_16px_rgba(0,0,0,0.6)] backdrop-blur-md"
            >
              <span className="font-serif text-3xl sm:text-4xl text-[#F8CC4F] font-normal leading-none tabular-nums drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]">
                {unit.value}
              </span>
              <span className="text-[9px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#E8D196] font-medium mt-1.5 opacity-90">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <GoldFloralDivider className="my-2 opacity-75 scale-90" />

        <p className="text-xs sm:text-sm font-serif italic text-[#FDFBF6]/80 tracking-wide mt-1 mb-4">
          Looking forward to celebrating our auspicious day with you
        </p>

        {/* Share Invitation Button using Web Share API */}
        <button
          id="share-invitation-btn"
          type="button"
          onClick={handleShare}
          aria-label="Share Wedding Invitation"
          className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C9A24B]/25 via-[#F8CC4F]/35 to-[#C9A24B]/25 border border-[#F8CC4F] text-[#F8CC4F] hover:bg-[#F8CC4F]/25 shadow-[0_4px_18px_rgba(248,204,79,0.3)] hover:shadow-[0_4px_24px_rgba(248,204,79,0.5)] transition-all duration-300 font-serif text-xs sm:text-sm font-semibold tracking-widest uppercase active:scale-95 cursor-pointer mb-5 backdrop-blur-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#F8CC4F]" />
              <span>Link Copied To Clipboard!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-[#F8CC4F]" />
              <span>Share Invitation</span>
            </>
          )}
        </button>

        {/* Back to top scroll button */}
        {onScrollTop && (
          <button
            onClick={onScrollTop}
            aria-label="Scroll back to top"
            className="flex flex-col items-center text-[#ECC880] focus:outline-none group active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#071126]/90 border border-[#C9A24B]/50 shadow-md group-hover:border-[#F8CC4F] transition-colors">
              <ChevronUp className="w-3.5 h-3.5 text-[#F8CC4F] group-hover:-translate-y-0.5 transition-transform" />
              <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.2em] text-[#F8CC4F]">
                Back To Top
              </span>
            </div>
          </button>
        )}

        <div className="mt-6 pt-4 border-t border-[#C9A24B]/20 w-full text-center">
          <p className="text-[11px] font-serif text-[#ECC880]/60 tracking-wider">
            With warmest blessings & gratitude • Gill Family
          </p>
        </div>
      </div>
    </footer>
  );
};

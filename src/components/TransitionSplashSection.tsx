import React from 'react';
import { PersianBorderBand, IkOnkar, KhandaGlyph, GoldFloralDivider } from './Ornaments';
import { WEDDING_DETAILS } from '../data/weddingData';
import { ChevronDown } from 'lucide-react';

interface TransitionSplashProps {
  onScrollNext?: () => void;
}

export const TransitionSplashSection: React.FC<TransitionSplashProps> = ({ onScrollNext }) => {
  return (
    <section className="snap-panel relative w-screen h-[100svh] overflow-hidden bg-[#0B1A3A] flex flex-col justify-between py-2 px-3">
      {/* Top Persian Rug Floral Border */}
      <PersianBorderBand position="top" className="flex-shrink-0" />

      {/* Ornate Navy Center Card with Double Gold Fillet */}
      <div className="relative w-full max-w-[420px] mx-auto my-auto flex-1 max-h-[86svh] bg-[#071126] rounded-[24px] border-2 border-[#C9A24B]/70 shadow-2xl flex flex-col justify-between p-6 text-center">
        {/* Fine inner border */}
        <div className="absolute inset-2 border border-[#C9A24B]/30 rounded-[18px] pointer-events-none" />

        {/* Top Sacred Crest */}
        <div className="relative z-10 flex flex-col items-center pt-2">
          <div className="flex items-center gap-3 mb-1">
            <KhandaGlyph size={24} />
            <IkOnkar size={30} />
            <KhandaGlyph size={24} />
          </div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#ECC880] font-serif font-medium">
            Two Souls &middot; One Destiny
          </span>
          <GoldFloralDivider className="my-2 scale-90" />
        </div>

        {/* Couple Name Lockup in Gold Calligraphy */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center">
          <h2 className="font-script text-5xl sm:text-6xl text-[#F3E0B5] gold-text-gradient leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {WEDDING_DETAILS.groomShortName}
          </h2>

          <div className="my-2 flex items-center justify-center gap-3">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent" />
            <span className="font-serif italic text-base text-[#ECC880] tracking-[0.25em] uppercase font-light">
              weds
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent via-[#C9A24B] to-transparent" />
          </div>

          <h3 className="font-script text-5xl sm:text-6xl text-[#F3E0B5] gold-text-gradient leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {WEDDING_DETAILS.brideShortName}
          </h3>

          <div className="mt-5 pt-3 border-t border-[#C9A24B]/40 max-w-[240px]">
            <p className="font-serif text-lg tracking-[0.2em] text-[#FDFBF6] font-medium">
              31 . 10 . 2026
            </p>
            <p className="font-serif italic text-xs text-[#E8D196]/90 mt-1">
              "See you there!"
            </p>
          </div>
        </div>

        {/* Bottom Line & Scroll Cue */}
        <div className="relative z-10 flex flex-col items-center pb-2">
          <p className="font-serif text-xs text-[#FDFBF6]/80 max-w-[280px] leading-relaxed mb-3">
            With eternal blessings of Waheguru Ji and love in our hearts, we eagerly await your presence.
          </p>

          <button
            onClick={onScrollNext}
            aria-label="Scroll to bride and groom profile"
            className="flex flex-col items-center text-[#ECC880] active:scale-95 transition-transform"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#ECC880]/80 font-serif mb-1">
              Meet the Couple
            </span>
            <div className="w-6 h-6 rounded-full bg-[#0B1A3A] border border-[#C9A24B]/50 flex items-center justify-center animate-bounce">
              <ChevronDown className="w-3.5 h-3.5 text-[#ECC880]" />
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Persian Border Band */}
      <PersianBorderBand position="bottom" className="flex-shrink-0" />
    </section>
  );
};

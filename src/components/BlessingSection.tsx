import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { KhandaEmblemSvg } from './Ornaments';

interface BlessingSectionProps {
  activeSubsection?: number;
  onSubsectionChange?: (index: number) => void;
}

const LOCAL_CARD_PATH = '/assets/invitation_card_higgsfield.webp';
const HIGGSFIELD_CDN_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_39pXjLcmPadwlBMctX1yshQ5O5N/hf_20260908_232837_7f8e44d0-aa2f-4a46-a247-12b004b2aa05_min.webp';

// Authentic Ornate Gold Floral Divider
const OrnateCardDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-1.5 my-2 ${className}`}>
    <div className="h-[1px] w-10 sm:w-14 bg-gradient-to-r from-transparent via-[#C9A24B] to-[#936B1B]" />
    <div className="flex items-center gap-0.5 text-[#936B1B]">
      <span className="text-[8px] text-[#C9A24B]">✦</span>
      <div className="w-1.5 h-1.5 rounded-full bg-[#7A1F2B] border border-[#C9A24B]" />
      <span className="text-[8px] text-[#C9A24B]">✦</span>
    </div>
    <div className="h-[1px] w-10 sm:w-14 bg-gradient-to-l from-transparent via-[#C9A24B] to-[#936B1B]" />
  </div>
);

export const BlessingSection: React.FC<BlessingSectionProps> = ({
  activeSubsection = 0,
  onSubsectionChange,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 5 subsections in Invitation Details:
  // 0: Gurbani Quote
  // 1: Marriage Ceremony & RSVP
  // 2: Sagan and Ring Ceremony
  // 3: Mehendi & Jaggo (Compiled into one page)
  // 4: Wedding Ceremony Programme
  const totalSubsections = 5;
  const [visitedSubsections, setVisitedSubsections] = useState<Set<number>>(() => new Set([0]));

  const markVisited = useCallback((index: number) => {
    setVisitedSubsections((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  // Sync scroll position when activeSubsection changes
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const clampedIndex = Math.max(0, Math.min(activeSubsection, totalSubsections - 1));
    const targetTop = clampedIndex * el.clientHeight;
    
    el.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });
    markVisited(clampedIndex);
  }, [activeSubsection, totalSubsections, markVisited]);

  // Keep pixel-perfect alignment on resize / orientation change
  useEffect(() => {
    const handleResize = () => {
      const el = scrollRef.current;
      if (!el) return;
      const clampedIndex = Math.max(0, Math.min(activeSubsection, totalSubsections - 1));
      el.scrollTo({
        top: clampedIndex * el.clientHeight,
        behavior: 'auto',
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSubsection, totalSubsections]);

  return (
    <section
      id="invitation-card-section"
      className="snap-panel relative w-screen h-[100svh] overflow-hidden bg-[#071124] flex items-center justify-center select-none"
    >
      {/* Ambient background blur for wider viewports */}
      <div
        className="absolute inset-0 bg-center bg-cover scale-110 blur-2xl opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url(${LOCAL_CARD_PATH}), url('${HIGGSFIELD_CDN_URL}')`,
        }}
      />

      {/* Main Card Container */}
      <div className="relative z-10 h-full max-h-[100svh] aspect-[3032/5504] max-w-full mx-auto flex items-center justify-center overflow-hidden shadow-2xl">
        {/* Background Card Image with Persian Blue Floral Border & Cusped Gold Arch */}
        <img
          src={LOCAL_CARD_PATH}
          alt="Wedding Invitation Card"
          className="w-full h-full max-h-[100svh] aspect-[3032/5504] object-contain select-none m-0 p-0 pointer-events-none"
          loading="eager"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== HIGGSFIELD_CDN_URL) {
              target.src = HIGGSFIELD_CDN_URL;
            }
          }}
        />

        {/* 
          OVERLAY CONTAINER:
          Positioned strictly inside the parchment area of the background image
        */}
        <div className="absolute top-[10.5%] bottom-[16%] left-[12%] right-[12%] z-20 flex flex-col overflow-hidden">
          {/* 
            RIGID INNER SCROLL CONTAINER
          */}
          <div
            id="invitation-inner-scroll"
            ref={scrollRef}
            data-visited-all={visitedSubsections.size >= totalSubsections ? 'true' : 'false'}
            style={{
              paddingBottom: '0px',
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingTop: '0px',
            }}
            className="w-full flex-1 overflow-hidden text-center text-[#1E293B] select-text no-scrollbar"
          >
            {/* ========================================================= */}
            {/* SUBSECTION 1: GURBANI QUOTE (Font size increased by 10%)  */}
            {/* ========================================================= */}
            <div className="w-full h-full min-h-full max-h-full shrink-0 snap-start flex flex-col justify-center items-center px-2 py-3 text-center select-text">
              {/* Top Ik Onkar calligraphic emblem (+10%) */}
              <div className="mb-2">
                <span
                  style={{ fontFamily: "'Noto Serif Gurmukhi', serif", fontSize: '3.6rem' }}
                  className="font-bold text-[#B38728] drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)] select-none leading-none inline-block"
                >
                  ੴ
                </span>
              </div>

              {/* Exact Horizontal Lockup (+10% font size) */}
              <div className="flex items-center justify-center gap-3 my-2 text-[#855B14]">
                <KhandaEmblemSvg size={26} className="text-[#C9A24B]" />
                <span
                  style={{ fontFamily: "'Noto Serif Gurmukhi', serif", fontSize: '21px' }}
                  className="font-bold text-[#7A5010] tracking-wider leading-snug"
                >
                  ੴ ਸਤਿਗੁਰੂ ਪ੍ਰਸਾਦਿ ॥
                </span>
                <KhandaEmblemSvg size={26} className="text-[#C9A24B]" />
              </div>

              {/* Ornate Gold Divider */}
              <OrnateCardDivider className="my-2.5" />

              {/* Exact Unaltered Gurbani Quote (+10% font size from 13px -> 14.3px) */}
              <div
                style={{
                  fontFamily: "'Noto Serif Gurmukhi', serif",
                  fontSize: '14.3px',
                  fontWeight: 'bold',
                  lineHeight: '22.8px',
                }}
                className="w-full max-w-[370px] text-[#1E293B] space-y-2.5 my-2"
              >
                <p className="whitespace-nowrap tracking-tight">ਸਤਿਗੁਰ ਦਾਤੇ ਕਾਜ ਰਚਾਇਆ ਆਪਣੀ ਮੇਹਰ ਕਰਾਈ ॥</p>
                <p className="whitespace-nowrap tracking-tight">ਦਾਸਾਂ ਕਾਰਜ ਆਪ ਸਵਾਰੇ ਇਹ ਉਸਦੀ ਵਡਿਆਈ ॥</p>
              </div>

              {/* Next step prompt */}
              <button
                onClick={() => onSubsectionChange?.(1)}
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-serif font-semibold tracking-widest text-[#855B14] hover:text-[#0B1A3A] transition-colors py-1 px-3 cursor-pointer"
              >
                <span>Marriage Ceremony</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>

            {/* ========================================================= */}
            {/* SUBSECTION 2: MARRIAGE CEREMONY & R.S.V.P. (UNTOUCHED)    */}
            {/* ========================================================= */}
            <div
              style={{ paddingTop: '22px' }}
              className="w-full h-full min-h-full max-h-full shrink-0 snap-start flex flex-col justify-center items-center px-2 pb-2 text-center select-text"
            >
              {/* Grandparents Hosts */}
              <p className="font-serif font-bold text-xs sm:text-sm text-[#1E293B] tracking-wide leading-relaxed">
                Sdn. Jasmail Kaur &amp; S. Jagir Singh Gill
              </p>

              {/* Invitation note */}
              <p className="font-serif text-[11px] sm:text-xs text-[#475569] italic my-1 leading-relaxed">
                Request the honour of your presence at the
                <br />
                auspicious occasion of the
              </p>

              {/* Ceremony Title */}
              <h2
                style={{ fontFamily: "'Great Vibes', cursive" }}
                className="text-3xl sm:text-4xl text-[#7A1F2B] tracking-wide my-1 leading-tight drop-shadow-sm font-medium"
              >
                Marriage Ceremony
              </h2>

              {/* Relationship */}
              <p className="font-serif italic text-[11px] sm:text-xs text-[#475569] my-0.5">
                of their beloved grandson
              </p>

              {/* Groom */}
              <div className="mt-0.5">
                <h3
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                  className="text-2xl sm:text-[28px] text-[#0B1A3A] tracking-wide leading-tight drop-shadow-sm font-medium"
                >
                  Simranjeet Singh Gill
                </h3>
                <p className="font-serif text-[9.5px] sm:text-[10px] text-[#556477] -mt-0.5 leading-tight">
                  (S/o Sdn. Narinder kaur &amp; S. Gurpreet Singh Gill)
                </p>
              </div>

              {/* "with" */}
              <p className="font-serif italic text-xs text-[#B38728] my-0.5">
                with
              </p>

              {/* Bride */}
              <div>
                <h3
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                  className="text-2xl sm:text-[28px] text-[#0B1A3A] tracking-wide leading-tight drop-shadow-sm font-medium"
                >
                  Ravneet Kaur
                </h3>
                <p className="font-serif text-[9.5px] sm:text-[10px] text-[#556477] -mt-0.5 leading-tight">
                  (S/o Sdn. Narinder kaur &amp; S. Lakhwinder Singh Chopra)
                </p>
              </div>

              {/* Date */}
              <p className="font-serif font-bold text-xs sm:text-[13px] text-[#7A1F2B] tracking-wide mt-1.5 mb-1 leading-snug">
                On Saturday, 31ˢᵗ October, 2026
              </p>

              {/* Thin Elegant Gold Line Divider */}
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C9A24B]/70 to-transparent my-1 mx-auto" />

              {/* R.S.V.P. Heading */}
              <h4 className="font-serif font-bold text-xs sm:text-[13px] text-[#0B1A3A] tracking-[0.25em] uppercase mb-1">
                R.S.V.P.
              </h4>

              {/* 2-column balanced RSVP names list */}
              <div className="grid grid-cols-2 gap-x-5 gap-y-1 text-left font-serif text-[10.5px] sm:text-[11.5px] text-[#1E293B] max-w-[260px] mx-auto leading-relaxed">
                <div className="space-y-0.5 text-right pr-2.5 border-r border-[#C9A24B]/35">
                  <p>Sarabpreet Singh</p>
                  <p>Paramjit Singh</p>
                  <p>Devinder Singh</p>
                </div>
                <div className="space-y-0.5 text-left pl-2.5">
                  <p>Gurmukh Singh</p>
                  <p>Gurbachan Singh</p>
                  <p>Baldev Singh</p>
                </div>
              </div>

              {/* Thin Elegant Gold Line Divider */}
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C9A24B]/70 to-transparent my-1 mx-auto" />

              {/* Awaiting Nanke and Dadke */}
              <div className="mt-1">
                <span className="inline-block font-serif font-bold text-[11px] sm:text-xs tracking-wider text-[#7A1F2B] bg-[#FDF6E2] px-3.5 py-0.5 rounded-full border border-[#D4AF37]/60 shadow-xs">
                  awaiting Nanke and Dadke
                </span>
              </div>
            </div>

            {/* ========================================================= */}
            {/* SUBSECTION 3: SAGAN AND RING CEREMONY (+10% Font Size)    */}
            {/* ========================================================= */}
            <div className="w-full h-full min-h-full max-h-full shrink-0 snap-start flex flex-col justify-center items-center px-4 py-4 text-center select-text">
              {/* Event Title (+10%) */}
              <h2
                style={{ fontFamily: "'Great Vibes', cursive" }}
                className="text-[33px] sm:text-[44px] text-[#7A1F2B] tracking-wide my-1 leading-tight drop-shadow-sm font-medium"
              >
                Sagan and Ring Ceremony
              </h2>

              {/* Subtle Gold Line Accent */}
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#C9A24B]/70 to-transparent my-2" />

              {/* Date (+10%) */}
              <p className="font-serif font-bold text-[13.5px] sm:text-[15.5px] text-[#0B1A3A] tracking-wide">
                on Thursday, 29ᵗʰ October, 2026
              </p>

              {/* Time (+10%) */}
              <span className="inline-block mt-2.5 text-[13.5px] sm:text-[14.5px] font-bold px-4 py-1 rounded-full bg-[#FAF5EB] text-[#7A1F2B] border border-[#C9A24B]/60 shadow-xs">
                11:00 am
              </span>

              {/* Venue details (+10%) */}
              <div className="mt-5 max-w-[300px] mx-auto text-center space-y-1.5">
                <p className="font-serif font-bold text-[13.5px] sm:text-[15.5px] text-[#1E293B]">
                  venue: Majestic Crown - Luxury Banquet
                </p>
                <p className="font-serif text-[12px] sm:text-[13.5px] text-[#526071] leading-relaxed">
                  24, Shivaji Marg, Najafgarh Rd, Delhi - 110015
                </p>

                {/* Google Maps link (+10%) */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Majestic+Crown+Luxury+Banquet+24+Shivaji+Marg+Najafgarh+Rd+Delhi+110015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-serif font-semibold text-[#875512] hover:text-[#0B1A3A] mt-2.5 underline underline-offset-4 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#875512]" />
                  <span>View on Google Maps</span>
                </a>
              </div>
            </div>

            {/* ========================================================= */}
            {/* SUBSECTION 4: MEHENDI & JAGGO (+10% Font Size)            */}
            {/* ========================================================= */}
            <div className="w-full h-full min-h-full max-h-full shrink-0 snap-start flex flex-col justify-center items-center px-3 py-3 text-center select-text">
              {/* Part A: Mehendi Ceremony (+10%) */}
              <div className="w-full max-w-[340px] flex flex-col items-center">
                <h2
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                  className="text-[26px] sm:text-[33px] text-[#7A1F2B] tracking-wide leading-tight drop-shadow-sm font-medium"
                >
                  Mehendi Ceremony
                </h2>

                <p className="font-serif font-bold text-[13px] sm:text-[14px] text-[#0B1A3A] mt-1 tracking-wide">
                  on Thursday, 29ᵗʰ October, 2026
                </p>

                <div className="mt-1 flex items-center justify-center gap-2">
                  <span className="text-[13px] font-bold px-3 py-0.5 rounded-full bg-[#FAF5EB] text-[#7A1F2B] border border-[#C9A24B]/60 shadow-xs">
                    7:00 pm
                  </span>
                  <span className="font-serif text-[13px] text-[#1E293B]">
                    venue: <span className="font-bold">Gill Residence</span>
                  </span>
                </div>

                <a
                  href="https://maps.app.goo.gl/aGf1FZjs1Bc1Z2kaA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-serif font-semibold text-[#875512] hover:text-[#0B1A3A] mt-1 underline underline-offset-4 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#875512]" />
                  <span>View on Google Maps</span>
                </a>
              </div>

              {/* Ornate Gold Floral Divider Between Mehendi and Jaggo */}
              <div className="my-5 w-full flex items-center justify-center">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent" />
                <div className="mx-2 text-[#936B1B] text-[8px] flex items-center gap-1">
                  <span>✦</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7A1F2B] border border-[#C9A24B]" />
                  <span>✦</span>
                </div>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-[#C9A24B] to-transparent" />
              </div>

              {/* Part B: Jaggo and Cocktail (+10%) */}
              <div className="w-full max-w-[340px] flex flex-col items-center">
                <h2
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                  className="text-[26px] sm:text-[33px] text-[#7A1F2B] tracking-wide leading-tight drop-shadow-sm font-medium"
                >
                  Jaggo and Cocktail
                </h2>

                <p className="font-serif font-bold text-[13px] sm:text-[14px] text-[#0B1A3A] mt-1 tracking-wide">
                  on Friday, 30ᵗʰ October, 2026
                </p>

                <div className="mt-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                  <span className="text-[13px] font-bold px-3 py-0.5 rounded-full bg-[#FAF5EB] text-[#7A1F2B] border border-[#C9A24B]/60 shadow-xs">
                    7:00 pm
                  </span>
                  <span className="font-serif text-[13px] text-[#1E293B]">
                    venue: <span className="font-bold">KK residency, Yamunanagar</span>
                  </span>
                </div>

                <a
                  href="https://maps.app.goo.gl/SRHrG74Y61UiKgqw7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-serif font-semibold text-[#875512] hover:text-[#0B1A3A] mt-1 underline underline-offset-4 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#875512]" />
                  <span>View on Google Maps</span>
                </a>
              </div>
            </div>

            {/* ========================================================= */}
            {/* SUBSECTION 5: WEDDING CEREMONY PROGRAMME (+10% Font Size) */}
            {/* ========================================================= */}
            <div className="w-full h-full min-h-full max-h-full shrink-0 snap-start flex flex-col justify-center items-center px-4 py-3 text-center select-text">
              {/* Ceremony Title (+10%) */}
              <h2
                style={{ fontFamily: "'Great Vibes', cursive" }}
                className="text-[33px] sm:text-[44px] text-[#7A1F2B] tracking-wide leading-tight my-1 drop-shadow-sm font-medium"
              >
                Wedding Ceremony
              </h2>

              {/* Subtle Gold Line Accent */}
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#C9A24B]/70 to-transparent my-1.5" />

              {/* Date (+10%) */}
              <p className="font-serif font-bold text-[13px] sm:text-[15.5px] text-[#0B1A3A] mb-3 tracking-wide">
                On Saturday, 31ˢᵗ October, 2026
              </p>

              {/* Timeline Items - Spaced & Airy (+10%) */}
              <div className="w-full max-w-[300px] space-y-3 text-center text-[#1E293B]">
                {/* 1. Sehra Bandi & Barat */}
                <div className="leading-snug space-y-0.5">
                  <p className="font-serif font-bold text-[13px] sm:text-[14.5px] text-[#0F1E36]">
                    Sehra bandi: 8:00am &bull; Departure of Barat: 9:30am
                  </p>
                  <p className="font-serif text-[11px] sm:text-[12px] text-[#556477]">
                    at KK residence, Yamunanagar
                  </p>
                  <a
                    href="https://maps.app.goo.gl/SRHrG74Y61UiKgqw7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11.5px] font-serif font-semibold text-[#875512] hover:text-[#0B1A3A] underline underline-offset-4 transition-colors"
                  >
                    <MapPin className="w-3 h-3 text-[#875512]" /> Map Location
                  </a>
                </div>

                {/* 2. Anand Karaj */}
                <div className="leading-snug pt-1 space-y-0.5">
                  <p className="font-serif font-bold text-[13px] sm:text-[14.5px] text-[#7A1F2B]">
                    Anand karaj: 10:30am
                  </p>
                  <p className="font-serif text-[11px] sm:text-[12px] text-[#556477]">
                    at Gurudwara Buria Sahib, Jagadhri, yamunanagar
                  </p>
                  <a
                    href="https://maps.app.goo.gl/geGbUJPRXewe28Zv9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11.5px] font-serif font-semibold text-[#875512] hover:text-[#0B1A3A] underline underline-offset-4 transition-colors"
                  >
                    <MapPin className="w-3 h-3 text-[#875512]" /> Map Location
                  </a>
                </div>

                {/* 3. Lunch */}
                <div className="leading-snug pt-1 space-y-0.5">
                  <p className="font-serif font-bold text-[13px] sm:text-[14.5px] text-[#0F1E36]">
                    Lunch: 1:00pm &bull; Venue: Ambience Resort
                  </p>
                  <a
                    href="https://maps.app.goo.gl/3YTLBFNrsap4dx1M7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11.5px] font-serif font-semibold text-[#875512] hover:text-[#0B1A3A] underline underline-offset-4 transition-colors"
                  >
                    <MapPin className="w-3 h-3 text-[#875512]" /> Map Location
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Page Navigation Dots & Status */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 pointer-events-auto">
          {Array.from({ length: totalSubsections }).map((_, i) => {
            const isVisited = visitedSubsections.has(i);
            const isActive = activeSubsection === i;
            return (
              <button
                key={i}
                onClick={() => onSubsectionChange?.(i)}
                title={`Page ${i + 1} of ${totalSubsections}${isVisited ? ' (viewed)' : ''}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-[#D4AF37] ring-2 ring-[#7A1F2B]'
                    : isVisited
                    ? 'bg-[#C9A24B]/70 hover:bg-[#D4AF37]'
                    : 'bg-[#C9A24B]/25 hover:bg-[#C9A24B]/50'
                }`}
                aria-label={`Go to invitation page ${i + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

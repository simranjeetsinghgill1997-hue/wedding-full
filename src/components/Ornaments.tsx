import React from 'react';

/**
 * Ik Onkar (ੴ) Sacred Sikh Glyph in luxury gold styling
 */
export const IkOnkar: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = ''
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      aria-label="Ik Onkar"
    >
      <span
        style={{ fontSize: `${size}px`, lineHeight: 1 }}
        className="font-serif font-bold text-[#C9A24B] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
      >
        ੴ
      </span>
    </div>
  );
};

/**
 * Sacred Khanda (☬) Emblem
 */
export const KhandaGlyph: React.FC<{ size?: number; className?: string }> = ({
  size = 28,
  className = ''
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      aria-label="Khanda"
    >
      <span
        style={{ fontSize: `${size}px`, lineHeight: 1 }}
        className="text-[#C9A24B] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
      >
        ☬
      </span>
    </div>
  );
};

export const KhandaEmblemSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 28,
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none text-[#C9A24B] drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] ${className}`}
      aria-label="Sikh Khanda Emblem"
    >
      {/* Central Double-edged sword */}
      <path d="M48 5 L52 5 L53 58 L55 64 L50 67 L45 64 L47 58 Z" />
      <path d="M48 68 L52 68 L52 88 L48 88 Z" />
      <path d="M46 88 L54 88 L54 92 L46 92 Z" />
      <path d="M43 67 L57 67 L57 69 L43 69 Z" />
      {/* Chakkar (Circle) */}
      <path
        d="M50 24 A 20 20 0 1 0 50 64 A 20 20 0 1 0 50 24 Z M50 31 A 13 13 0 1 1 50 57 A 13 13 0 1 1 50 31 Z"
      />
      {/* Left Kirpan (Curved sword) */}
      <path
        d="M26 28 C20 40 18 56 26 70 C31 79 40 85 45 88 C43 85 36 78 33 71 C28 60 29 45 36 34 C38 31 40 28 42 26 C37 24 31 25 26 28 Z"
      />
      {/* Right Kirpan (Curved sword) */}
      <path
        d="M74 28 C80 40 82 56 74 70 C69 79 60 85 55 88 C57 85 64 78 67 71 C72 60 71 45 64 34 C62 31 60 28 58 26 C63 24 69 25 74 28 Z"
      />
    </svg>
  );
};

/**
 * Persian-Rug Floral Border Band (Top or Bottom horizontal border)
 * Features navy ground, intricate gold vine scrollwork, and subtle crimson/ruby floral centers
 */
export const PersianBorderBand: React.FC<{ position?: 'top' | 'bottom'; className?: string }> = ({
  position = 'top',
  className = ''
}) => {
  return (
    <div
      className={`w-full overflow-hidden flex flex-col pointer-events-none ${className}`}
      style={{ transform: position === 'bottom' ? 'rotate(180deg)' : 'none' }}
    >
      {/* Outer gold fillet line */}
      <div className="w-full h-[1.5px] bg-gradient-to-r from-[#8C6923] via-[#ECC880] to-[#8C6923]" />
      
      {/* Persian floral pattern repeat */}
      <div className="w-full h-4 bg-[#0B1A3A] relative flex items-center justify-center border-y border-[#C9A24B]/40">
        <svg
          className="w-full h-full opacity-90"
          preserveAspectRatio="none"
          viewBox="0 0 400 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="persianVine" width="50" height="16" patternUnits="userSpaceOnUse">
              {/* Central connecting stem */}
              <path
                d="M 0 8 Q 12.5 3 25 8 T 50 8"
                fill="none"
                stroke="#C9A24B"
                strokeWidth="0.8"
              />
              {/* Floral leaf curling top */}
              <path
                d="M 12 6 C 10 3, 16 1, 19 4 C 17 6, 14 6, 12 6 Z"
                fill="#C9A24B"
                opacity="0.85"
              />
              {/* Floral leaf curling bottom */}
              <path
                d="M 37 10 C 35 13, 41 15, 44 12 C 42 10, 39 10, 37 10 Z"
                fill="#C9A24B"
                opacity="0.85"
              />
              {/* Crimson rosette blossom center */}
              <circle cx="25" cy="8" r="2.8" fill="#7A1F2B" stroke="#ECC880" strokeWidth="0.6" />
              {/* Gold dots */}
              <circle cx="6" cy="8" r="1" fill="#ECC880" />
              <circle cx="44" cy="8" r="1" fill="#ECC880" />
            </pattern>
          </defs>
          <rect width="100%" height="16" fill="url(#persianVine)" />
        </svg>
      </div>

      {/* Inner fine double gold line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-[#C9A24B]/20 via-[#ECC880] to-[#C9A24B]/20" />
    </div>
  );
};

/**
 * Ornate Persian Rug Outer Frame (Full-Screen Mobile Border)
 * Wraps around the mobile viewport like the couple's physical card
 */
export const PersianFrame: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`relative w-full h-full p-2.5 sm:p-3 box-border flex flex-col ${className}`}>
      {/* 4 Corner Ornaments */}
      <div className="absolute top-1 left-1 w-6 h-6 pointer-events-none z-20 text-[#C9A24B]">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M2 22 V6 C2 3.79 3.79 2 6 2 H22" stroke="#C9A24B" strokeWidth="1.5" />
          <path d="M5 19 V7 C5 5.895 5.895 5 7 5 H19" stroke="#E8D196" strokeWidth="0.75" />
          <circle cx="8" cy="8" r="2" fill="#7A1F2B" stroke="#ECC880" strokeWidth="0.5" />
          <circle cx="3" cy="3" r="1" fill="#ECC880" />
        </svg>
      </div>

      <div className="absolute top-1 right-1 w-6 h-6 pointer-events-none z-20 text-[#C9A24B] rotate-90">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M2 22 V6 C2 3.79 3.79 2 6 2 H22" stroke="#C9A24B" strokeWidth="1.5" />
          <path d="M5 19 V7 C5 5.895 5.895 5 7 5 H19" stroke="#E8D196" strokeWidth="0.75" />
          <circle cx="8" cy="8" r="2" fill="#7A1F2B" stroke="#ECC880" strokeWidth="0.5" />
          <circle cx="3" cy="3" r="1" fill="#ECC880" />
        </svg>
      </div>

      <div className="absolute bottom-1 left-1 w-6 h-6 pointer-events-none z-20 text-[#C9A24B] -rotate-90">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M2 22 V6 C2 3.79 3.79 2 6 2 H22" stroke="#C9A24B" strokeWidth="1.5" />
          <path d="M5 19 V7 C5 5.895 5.895 5 7 5 H19" stroke="#E8D196" strokeWidth="0.75" />
          <circle cx="8" cy="8" r="2" fill="#7A1F2B" stroke="#ECC880" strokeWidth="0.5" />
          <circle cx="3" cy="3" r="1" fill="#ECC880" />
        </svg>
      </div>

      <div className="absolute bottom-1 right-1 w-6 h-6 pointer-events-none z-20 text-[#C9A24B] rotate-180">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M2 22 V6 C2 3.79 3.79 2 6 2 H22" stroke="#C9A24B" strokeWidth="1.5" />
          <path d="M5 19 V7 C5 5.895 5.895 5 7 5 H19" stroke="#E8D196" strokeWidth="0.75" />
          <circle cx="8" cy="8" r="2" fill="#7A1F2B" stroke="#ECC880" strokeWidth="0.5" />
          <circle cx="3" cy="3" r="1" fill="#ECC880" />
        </svg>
      </div>

      {/* Frame borders */}
      <div className="relative w-full h-full border border-[#C9A24B]/50 rounded-[4px] flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
};

/**
 * Royal Cusped Arch Header (Like traditional Sikh/Mughal card arch)
 */
export const RoyalArchedTop: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full flex justify-center items-center pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 260 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-48 sm:w-56 h-auto text-[#C9A24B]"
      >
        {/* Scalloped arch curve */}
        <path
          d="M 10 38 Q 60 38 85 24 Q 105 12 120 4 Q 130 0 130 0 Q 130 0 140 4 Q 155 12 175 24 Q 200 38 250 38"
          stroke="#C9A24B"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 25 38 Q 70 38 92 26 Q 110 16 122 8 Q 130 4 130 4 Q 130 4 138 8 Q 150 16 168 26 Q 190 38 235 38"
          stroke="#ECC880"
          strokeWidth="0.75"
          fill="none"
        />
        {/* Crown finial */}
        <circle cx="130" cy="1" r="2" fill="#C9A24B" />
        <circle cx="130" cy="8" r="1.5" fill="#7A1F2B" />
      </svg>
    </div>
  );
};

/**
 * Ornate Gold Floral Divider
 */
export const GoldFloralDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-2 my-2.5 ${className}`}>
      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C9A24B]" />
      <div className="flex items-center gap-1 text-[#C9A24B]">
        <span className="text-[10px] text-[#ECC880]">✦</span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#7A1F2B] border border-[#ECC880]" />
        <span className="text-[10px] text-[#ECC880]">✦</span>
      </div>
      <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C9A24B]" />
    </div>
  );
};

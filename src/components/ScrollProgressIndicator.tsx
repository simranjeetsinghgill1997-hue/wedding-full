import React from 'react';

interface ScrollProgressIndicatorProps {
  currentSection: number;
  totalSections: number;
  onSelectSection: (index: number) => void;
}

export const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  currentSection,
  totalSections,
  onSelectSection,
}) => {
  return (
    <div
      className="fixed right-2 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2 py-2 px-1 bg-[#0B1A3A]/60 backdrop-blur-xs rounded-full border border-[#C9A24B]/30 shadow-lg pointer-events-auto"
      aria-label="Section navigation"
    >
      {Array.from({ length: totalSections }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onSelectSection(idx)}
          aria-label={`Go to section ${idx + 1}`}
          className={`group relative flex items-center justify-center transition-all ${
            currentSection === idx ? 'scale-125' : 'scale-100 opacity-60 hover:opacity-100'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              currentSection === idx
                ? 'bg-[#ECC880] ring-2 ring-[#C9A24B] shadow-[0_0_8px_#C9A24B]'
                : 'bg-[#C9A24B]/60'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

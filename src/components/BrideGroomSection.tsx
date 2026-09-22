import React, { useState } from 'react';
import { PersianBorderBand, RoyalArchedTop, GoldFloralDivider, IkOnkar } from './Ornaments';
import { BRIDE_AND_GROOM } from '../data/weddingData';
import { ArrowUp, Camera } from 'lucide-react';

interface BrideGroomSectionProps {
  onScrollToTop?: () => void;
}

export const BrideGroomSection: React.FC<BrideGroomSectionProps> = ({ onScrollToTop }) => {
  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');
  const [groomImage, setGroomImage] = useState<string>(BRIDE_AND_GROOM.groom.defaultImage);
  const [brideImage, setBrideImage] = useState<string>(BRIDE_AND_GROOM.bride.defaultImage);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, role: 'groom' | 'bride') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (role === 'groom') setGroomImage(url);
      else setBrideImage(url);
    }
  };

  const currentProfile = activeTab === 'groom' ? BRIDE_AND_GROOM.groom : BRIDE_AND_GROOM.bride;
  const currentImage = activeTab === 'groom' ? groomImage : brideImage;

  return (
    <section className="snap-panel relative w-screen h-[100svh] overflow-hidden bg-[#0B1A3A] flex flex-col justify-between py-2 px-3">
      {/* Top Persian Rug Floral Border */}
      <PersianBorderBand position="top" className="flex-shrink-0" />

      {/* Main Container */}
      <div className="relative w-full max-w-[420px] mx-auto my-auto flex-1 max-h-[88svh] flex flex-col justify-between">
        {/* Section Header & Tab Switcher */}
        <div className="text-center pt-1 mb-1.5 flex-shrink-0">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#C9A24B]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#ECC880] font-serif font-semibold">
              Meet the Bride & Groom
            </span>
            <div className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#C9A24B]" />
          </div>

          {/* Groom / Bride Toggle Tabs */}
          <div className="flex items-center justify-center gap-2 mt-1.5">
            <button
              onClick={() => setActiveTab('groom')}
              className={`px-3.5 py-1 text-xs font-serif tracking-wider rounded-full border transition-all ${
                activeTab === 'groom'
                  ? 'bg-[#C9A24B] text-[#0B1A3A] font-bold border-[#ECC880] shadow-md scale-105'
                  : 'bg-[#0B1A3A]/85 text-[#E8D196] border-[#C9A24B]/40 hover:bg-[#122854]'
              }`}
            >
              Simranjeet (The Groom)
            </button>
            <button
              onClick={() => setActiveTab('bride')}
              className={`px-3.5 py-1 text-xs font-serif tracking-wider rounded-full border transition-all ${
                activeTab === 'bride'
                  ? 'bg-[#C9A24B] text-[#0B1A3A] font-bold border-[#ECC880] shadow-md scale-105'
                  : 'bg-[#0B1A3A]/85 text-[#E8D196] border-[#C9A24B]/40 hover:bg-[#122854]'
              }`}
            >
              Ravneet (The Bride)
            </button>
          </div>
        </div>

        {/* Ivory Card for Couple Profile */}
        <div className="relative flex-1 bg-[#FDFBF6] rounded-t-[32px] rounded-b-[14px] shadow-2xl border-2 border-[#C9A24B]/70 overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 text-[#0F1E36]">
          {/* Inner fine border */}
          <div className="absolute inset-1.5 border border-[#C9A24B]/35 rounded-t-[28px] rounded-b-[10px] pointer-events-none" />

          {/* Arch Top & Label */}
          <div className="relative z-10 flex flex-col items-center text-center pt-0.5">
            <RoyalArchedTop className="mb-0.5 scale-90" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A1F2B] font-bold font-serif">
              {currentProfile.role === 'Groom' ? '✦ The Royal Groom ✦' : '✦ The Graceful Bride ✦'}
            </span>
          </div>

          {/* Profile Card Body */}
          <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar py-1 flex flex-col items-center justify-center text-center">
            {/* Arched Portrait Photo Frame */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl p-1 bg-gradient-to-b from-[#ECC880] via-[#C9A24B] to-[#9C7426] shadow-lg mb-2 group">
              <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#0B1A3A] relative">
                <img
                  src={currentImage}
                  alt={currentProfile.name}
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Custom Photo Upload Hint */}
                <label className="absolute bottom-1 right-1 p-1.5 bg-[#0B1A3A]/85 hover:bg-[#0B1A3A] text-[#ECC880] rounded-full border border-[#C9A24B]/60 shadow cursor-pointer active:scale-95 transition-transform">
                  <Camera className="w-3.5 h-3.5" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, activeTab)}
                  />
                </label>
              </div>
            </div>

            {/* Name in Script Font */}
            <h3 className="font-script text-3xl sm:text-[34px] text-[#9C7426] tracking-wide leading-tight">
              {currentProfile.name}
            </h3>

            {/* Parentage */}
            <p className="font-serif text-xs text-[#7A1F2B] font-semibold tracking-wide mt-0.5">
              {currentProfile.parentage}
            </p>

            <GoldFloralDivider className="my-1.5 scale-80" />

            {/* Bio Line */}
            <div className="bg-[#FAF6EC] border border-[#C9A24B]/30 rounded-lg p-2.5 max-w-[92%] shadow-xs">
              <p className="font-serif italic text-xs leading-relaxed text-[#0F1E36]/90">
                "{currentProfile.bio}"
              </p>
            </div>
          </div>

          {/* Closing Blessing & Back to Top (Final section of the site) */}
          <div className="relative z-10 pt-2 border-t border-[#C9A24B]/30 flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className="flex items-center gap-2 text-center">
              <IkOnkar size={20} />
              <span className="font-serif font-bold text-xs text-[#7A1F2B] tracking-wide">
                ਜੋੜੀ ਸਦਾ ਸਲਾਮਤ ਰਹੇ
              </span>
              <IkOnkar size={20} />
            </div>

            <p className="text-[10px] uppercase tracking-[0.2em] text-[#0F1E36]/75 font-serif text-center">
              Seeking your heartfelt presence and prayers
            </p>

            <button
              onClick={onScrollToTop}
              className="mt-1 py-1.5 px-3 rounded-full bg-[#0B1A3A] text-[#ECC880] border border-[#C9A24B]/60 flex items-center gap-1 text-[11px] font-serif uppercase tracking-wider active:scale-95 transition-transform"
            >
              <ArrowUp className="w-3 h-3 text-[#ECC880]" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

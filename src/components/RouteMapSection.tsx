import React, { useState } from 'react';
import { PersianBorderBand, RoyalArchedTop, GoldFloralDivider } from './Ornaments';
import { MapPin, Navigation, Copy, ExternalLink, Check, Car } from 'lucide-react';

interface VenueLocation {
  id: string;
  tag: string;
  name: string;
  city: string;
  address: string;
  mapsQuery: string;
  travelNote: string;
  coordinates: { lat: number; lng: number };
}

const VENUES: VenueLocation[] = [
  {
    id: 'delhi-venue',
    tag: 'Sagan & Ring (29 Oct)',
    name: 'Majestic Crown – Luxury Banquet',
    city: 'New Delhi',
    address: '24 Shivaji Marg, Najafgarh Rd, Moti Nagar, Delhi 110015',
    mapsQuery: 'Majestic Crown Banquet Shivaji Marg Najafgarh Road Delhi 110015',
    travelNote: 'Valet parking available at venue entrance. Nearest metro: Moti Nagar (Blue Line).',
    coordinates: { lat: 28.6538, lng: 77.1428 }
  },
  {
    id: 'gurudwara-venue',
    tag: 'Anand Karaj (31 Oct)',
    name: 'Gurudwara Buria Sahib',
    city: 'Jagadhri / Yamunanagar',
    address: 'Buria Road, Near Buria Gate, Jagadhri, Yamunanagar, Haryana 135003',
    mapsQuery: 'Gurudwara Buria Sahib Jagadhri Yamunanagar Haryana',
    travelNote: 'Sacred historical Gurudwara Sahib. Please keep head covered. Dedicated parking inside.',
    coordinates: { lat: 30.1627, lng: 77.3512 }
  },
  {
    id: 'resort-venue',
    tag: 'Wedding Lunch & Reception (31 Oct)',
    name: 'Ambience Resort',
    city: 'Jagadhri / Yamunanagar',
    address: 'Agarsen Chowk, National Highway 73A, near JK Filling Station, Indira Colony, Jagadhri, Haryana 135003',
    mapsQuery: 'Ambience Resort Agarsen Chowk Jagadhri Haryana 135003',
    travelNote: 'Located conveniently on NH 73A. Spacious valet and open parking for all guests.',
    coordinates: { lat: 30.1581, lng: 77.3015 }
  }
];

export const RouteMapSection: React.FC = () => {
  const [selectedVenue, setSelectedVenue] = useState<VenueLocation>(VENUES[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    selectedVenue.name + ' ' + selectedVenue.address
  )}`;

  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(
    selectedVenue.name
  )}&address=${encodeURIComponent(selectedVenue.address)}`;

  return (
    <section className="snap-panel relative w-screen h-[100svh] overflow-hidden bg-[#0B1A3A] flex flex-col justify-between py-2 px-3">
      {/* Top Border Band */}
      <PersianBorderBand position="top" className="flex-shrink-0" />

      {/* Main Container */}
      <div className="relative w-full max-w-[420px] mx-auto my-auto flex-1 max-h-[88svh] flex flex-col justify-between">
        {/* Header */}
        <div className="text-center pt-1 mb-1 flex-shrink-0">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#C9A24B]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#ECC880] font-serif font-semibold">
              Venue & Directions
            </span>
            <div className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#C9A24B]" />
          </div>

          {/* Venue Switcher Tabs */}
          <div className="flex items-center justify-center gap-1.5 mt-1.5 overflow-x-auto no-scrollbar px-1">
            {VENUES.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVenue(v)}
                className={`px-2.5 py-1 text-[11px] font-serif tracking-wider rounded-full border transition-all whitespace-nowrap ${
                  selectedVenue.id === v.id
                    ? 'bg-[#C9A24B] text-[#0B1A3A] font-bold border-[#ECC880] shadow-md'
                    : 'bg-[#0B1A3A]/90 text-[#E8D196] border-[#C9A24B]/40 hover:bg-[#122854]'
                }`}
              >
                {v.city.split('/')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Ivory Card for Route & Directions */}
        <div className="relative flex-1 bg-[#FDFBF6] rounded-t-[32px] rounded-b-[14px] shadow-2xl border-2 border-[#C9A24B]/70 overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 text-[#0F1E36]">
          {/* Inner fine border */}
          <div className="absolute inset-1.5 border border-[#C9A24B]/35 rounded-t-[28px] rounded-b-[10px] pointer-events-none" />

          {/* Arch & Venue Title */}
          <div className="relative z-10 flex flex-col items-center text-center pt-0.5">
            <RoyalArchedTop className="mb-0.5 scale-90" />
            
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A1F2B] font-bold font-serif">
              {selectedVenue.tag}
            </span>

            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#0B1A3A] leading-tight mt-0.5 px-2">
              {selectedVenue.name}
            </h3>

            <GoldFloralDivider className="my-1 scale-90" />
          </div>

          {/* Map Preview & Details */}
          <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar py-1 space-y-2 flex flex-col justify-center">
            {/* Visual Route Frame */}
            <div className="relative w-full h-32 rounded-xl overflow-hidden border border-[#C9A24B]/50 bg-[#0B1A3A] shadow-inner flex flex-col items-center justify-center p-3 text-center">
              {/* Stylized ornamental map backdrop */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C9A24B_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A3A] via-transparent to-[#0B1A3A]/60" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#C9A24B] border-2 border-[#FDFBF6] flex items-center justify-center shadow-lg animate-pulse mb-1">
                  <MapPin className="w-5 h-5 text-[#0B1A3A]" />
                </div>
                <span className="text-xs font-serif font-semibold text-[#ECC880] tracking-wide">
                  {selectedVenue.name}
                </span>
                <span className="text-[10px] text-[#FDFBF6]/80 tracking-wider uppercase mt-0.5">
                  Tap below to launch live GPS
                </span>
              </div>
            </div>

            {/* Address Box with 1-tap Copy */}
            <div className="bg-[#FAF6EC] border border-[#C9A24B]/35 rounded-lg p-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 text-left">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#7A1F2B] font-bold block font-serif">
                    Address
                  </span>
                  <p className="text-xs text-[#0F1E36] font-medium leading-relaxed mt-0.5">
                    {selectedVenue.address}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(selectedVenue.address)}
                  aria-label="Copy address"
                  className="flex-shrink-0 p-1.5 rounded-md bg-[#FDFBF6] border border-[#C9A24B]/40 hover:bg-[#FAF6EC] text-[#9C7426] active:scale-95 transition-transform"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Travel Note */}
              <div className="mt-2 pt-1.5 border-t border-[#C9A24B]/20 flex items-center gap-1.5 text-[10.5px] text-[#0F1E36]/80 text-left">
                <Car className="w-3 h-3 text-[#C9A24B] flex-shrink-0" />
                <span>{selectedVenue.travelNote}</span>
              </div>
            </div>
          </div>

          {/* Action GPS Navigation Buttons */}
          <div className="relative z-10 pt-2 border-t border-[#C9A24B]/30 flex flex-col gap-1.5 flex-shrink-0">
            <div className="grid grid-cols-2 gap-2">
              {/* Google Maps Button */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-2.5 bg-[#0B1A3A] hover:bg-[#122854] text-[#ECC880] border border-[#C9A24B] rounded-lg shadow-sm flex items-center justify-center gap-1.5 font-serif text-[11px] uppercase tracking-wider font-semibold active:scale-[0.98] transition-transform"
              >
                <Navigation className="w-3.5 h-3.5 text-[#ECC880]" />
                <span>Google Maps</span>
              </a>

              {/* Apple Maps Button */}
              <a
                href={appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-2.5 bg-[#FAF6EC] hover:bg-[#F4ECE0] text-[#0B1A3A] border border-[#C9A24B]/60 rounded-lg shadow-xs flex items-center justify-center gap-1.5 font-serif text-[11px] uppercase tracking-wider font-semibold active:scale-[0.98] transition-transform"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#7A1F2B]" />
                <span>Apple Maps</span>
              </a>
            </div>

            {/* Quick Route Context (Delhi to Yamunanagar) */}
            <p className="text-[10px] text-center text-[#7A1F2B] font-serif italic">
              ✦ Approx. 3.5 hrs scenic drive from Delhi via NH 44 / GT Road ✦
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Border Band */}
      <PersianBorderBand position="bottom" className="flex-shrink-0" />
    </section>
  );
};

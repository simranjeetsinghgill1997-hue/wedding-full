import React, { useState } from 'react';
import { PersianBorderBand, RoyalArchedTop, GoldFloralDivider } from './Ornaments';
import { CEREMONIES } from '../data/weddingData';
import { MapPin, Calendar, Clock, Navigation, CheckCircle2 } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const [activeEventIndex, setActiveEventIndex] = useState<number>(0);
  const activeEvent = CEREMONIES[activeEventIndex];

  // Function to create Google Calendar event link
  const createGoogleCalendarLink = (ceremony: typeof CEREMONIES[0]) => {
    const title = encodeURIComponent(ceremony.calendarTitle);
    const details = encodeURIComponent(
      `Wedding celebrations of Simranjeet Singh Gill & Ravneet Kaur.\nVenue: ${ceremony.venueName}, ${ceremony.venueAddress}`
    );
    const location = encodeURIComponent(`${ceremony.venueName}, ${ceremony.venueAddress}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${ceremony.calendarDateStart}/${ceremony.calendarDateEnd}&details=${details}&location=${location}`;
  };

  return (
    <section className="snap-panel relative w-screen h-[100svh] overflow-hidden bg-[#0B1A3A] flex flex-col justify-between py-2 px-3">
      {/* Top Border */}
      <PersianBorderBand position="top" className="flex-shrink-0" />

      {/* Main Container */}
      <div className="relative w-full max-w-[420px] mx-auto my-auto flex-1 max-h-[88svh] flex flex-col justify-between">
        {/* Section Header & Ceremony Switcher */}
        <div className="text-center pt-1 mb-1.5 flex-shrink-0">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#C9A24B]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#ECC880] font-serif font-semibold">
              Sacred Itinerary
            </span>
            <div className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#C9A24B]" />
          </div>

          {/* Event Toggle Pills */}
          <div className="flex items-center justify-center gap-2 mt-1.5">
            {CEREMONIES.map((event, idx) => (
              <button
                key={event.id}
                onClick={() => setActiveEventIndex(idx)}
                className={`px-3 py-1 text-xs font-serif tracking-wider rounded-full border transition-all duration-200 ${
                  activeEventIndex === idx
                    ? 'bg-[#C9A24B] text-[#0B1A3A] font-bold border-[#ECC880] shadow-md scale-105'
                    : 'bg-[#0B1A3A]/80 text-[#E8D196] border-[#C9A24B]/40 hover:bg-[#0B1A3A]'
                }`}
              >
                {idx === 0 ? '1. Sagan & Ring' : '2. Wedding Day'}
              </button>
            ))}
          </div>
        </div>

        {/* The Event Card (Ivory arched design) */}
        <div className="relative flex-1 bg-[#FDFBF6] rounded-t-[32px] rounded-b-[14px] shadow-2xl border-2 border-[#C9A24B]/70 overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 text-[#0F1E36]">
          {/* Inner border line */}
          <div className="absolute inset-1.5 border border-[#C9A24B]/35 rounded-t-[28px] rounded-b-[10px] pointer-events-none" />

          {/* Arch Top & Ceremony Title */}
          <div className="relative z-10 flex flex-col items-center text-center pt-0.5">
            <RoyalArchedTop className="mb-0.5 scale-90" />
            
            <h3 className="font-script text-3xl sm:text-[34px] text-[#9C7426] tracking-wide leading-tight mt-0.5">
              {activeEvent.title}
            </h3>

            {activeEvent.hosts && (
              <p className="font-serif text-[11px] text-[#7A1F2B] font-semibold tracking-wide uppercase mt-0.5">
                Hosted by: {activeEvent.hosts}
              </p>
            )}

            <GoldFloralDivider className="my-1 scale-90" />
          </div>

          {/* Card Body - Content scrollable if needed */}
          <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar py-1 space-y-2 text-center flex flex-col justify-center">
            {/* Date & Time */}
            <div className="bg-[#FAF6EC] border border-[#C9A24B]/30 rounded-lg p-2 shadow-xs">
              <div className="flex items-center justify-center gap-1.5 text-[#7A1F2B] font-bold text-xs sm:text-[13px] uppercase tracking-wider font-serif">
                <Calendar className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>{activeEvent.dateLabel}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-[#0F1E36] font-medium text-xs mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>{activeEvent.timeLabel}</span>
              </div>
            </div>

            {/* Timeline for Wedding Day */}
            {activeEvent.timeline && activeEvent.timeline.length > 0 && (
              <div className="bg-[#FAF6EC]/70 border border-[#C9A24B]/25 rounded-lg p-2 text-left space-y-1.5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A1F2B] font-bold block text-center border-b border-[#C9A24B]/20 pb-1 font-serif">
                  Auspicious Sequence
                </span>
                <div className="space-y-1 text-xs">
                  {activeEvent.timeline.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="flex items-center gap-1 flex-shrink-0 w-16 text-[#9C7426] font-semibold text-[11px]">
                        <CheckCircle2 className="w-2.5 h-2.5 text-[#7A1F2B]" />
                        <span>{item.time}</span>
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-[#0B1A3A] text-[11.5px] block leading-tight">
                          {item.title}
                        </span>
                        {item.location && (
                          <span className="text-[10px] text-[#0F1E36]/75 block leading-tight">
                            {item.location}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Venue Box */}
            <div className="bg-[#FAF6EC] border border-[#C9A24B]/30 rounded-lg p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-[#7A1F2B] font-bold text-xs uppercase tracking-wider font-serif">
                <MapPin className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>Venue</span>
              </div>
              <p className="font-serif font-bold text-sm text-[#0B1A3A] mt-0.5 leading-tight">
                {activeEvent.venueName}
              </p>
              <p className="text-[11px] text-[#0F1E36]/80 mt-0.5 leading-snug px-2">
                {activeEvent.venueAddress}
              </p>
            </div>
          </div>

          {/* Action Buttons: "See the route" and "Add to Calendar" */}
          <div className="relative z-10 pt-2 border-t border-[#C9A24B]/30 flex flex-col gap-1.5 flex-shrink-0">
            <div className="flex items-center gap-2">
              {/* See the route button */}
              <a
                href={activeEvent.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 bg-[#0B1A3A] hover:bg-[#122854] text-[#ECC880] border border-[#C9A24B] rounded-lg shadow-sm flex items-center justify-center gap-1.5 font-serif text-xs uppercase tracking-wider font-semibold active:scale-[0.98] transition-transform"
              >
                <Navigation className="w-3.5 h-3.5 text-[#ECC880]" />
                <span>See the route</span>
              </a>

              {/* Add to calendar */}
              <a
                href={createGoogleCalendarLink(activeEvent)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 bg-[#FDFBF6] hover:bg-[#FAF6EC] text-[#7A1F2B] border border-[#C9A24B]/60 rounded-lg shadow-xs flex items-center justify-center gap-1 font-serif text-xs font-semibold uppercase tracking-wider active:scale-[0.98] transition-transform"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>Calendar</span>
              </a>
            </div>

            {/* Pagination dots for cards */}
            <div className="flex items-center justify-center gap-1.5 pt-0.5">
              {CEREMONIES.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveEventIndex(dotIdx)}
                  aria-label={`View ceremony ${dotIdx + 1}`}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeEventIndex === dotIdx
                      ? 'w-5 bg-[#C9A24B]'
                      : 'bg-[#C9A24B]/35'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <PersianBorderBand position="bottom" className="flex-shrink-0" />
    </section>
  );
};

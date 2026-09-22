import React, { useState, useEffect, useRef } from 'react';

interface CurtainOpeningAnimationProps {
  isOpenTriggered: boolean;
  onOpened?: () => void;
}

export const CurtainOpeningAnimation: React.FC<CurtainOpeningAnimationProps> = ({
  isOpenTriggered,
  onOpened,
}) => {
  const [isFinished, setIsFinished] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!isOpenTriggered || hasStartedRef.current) return;
    hasStartedRef.current = true;

    const video = videoRef.current;
    if (!video) return;

    // Strictly muted, no audio imported
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    // Play video upon trigger
    video.play().catch((err) => {
      console.warn('Curtain play error:', err);
    });

    const handleEnded = () => {
      setFadeOut(true);
      if (onOpened) onOpened();
      setTimeout(() => {
        setIsFinished(true);
      }, 500);
    };

    // Begin fading out into the hero background near end
    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 0.4) {
        setFadeOut(true);
      }
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Fallback timer so page never gets blocked if video fails to report ended
    const safetyTimer = setTimeout(() => {
      setFadeOut(true);
      if (onOpened) onOpened();
      setTimeout(() => {
        setIsFinished(true);
      }, 500);
    }, 3200);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      clearTimeout(safetyTimer);
    };
  }, [isOpenTriggered, onOpened]);

  if (isFinished) return null;

  return (
    <div
      id="curtain-stage-container"
      aria-label="Wedding curtain draw opening animation"
      className={`fixed inset-0 z-50 overflow-hidden select-none pointer-events-none transition-opacity duration-500 ease-out ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-center"
      >
        <source src="/assets/curtain_draw_final.webm" type="video/webm" />
        <source src="/assets/curtain_draw_alpha.webm" type="video/webm" />
        <source src="/assets/curtain_draw.webm" type="video/webm" />
        <source src="/assets/curtain_draw.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

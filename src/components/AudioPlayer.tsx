import React, { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: any;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
  }
}

export interface AudioPlayerRef {
  startAudio: () => void;
}

interface AudioPlayerProps {
  className?: string;
  autoStartOnMount?: boolean;
}

export const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(
  ({ className = '', autoStartOnMount = false }, ref) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPlayerReady, setIsPlayerReady] = useState(false);

    const playerRef = useRef<any>(null);
    const isMutedRef = useRef(false);
    const userInteractedRef = useRef(false);
    const shouldStartOnReadyRef = useRef(autoStartOnMount);

    const youtubeId = WEDDING_DETAILS.backgroundMusic.youtubeId;
    const songName = WEDDING_DETAILS.backgroundMusic.songName;
    const artist = WEDDING_DETAILS.backgroundMusic.artist;
    const startTime = WEDDING_DETAILS.backgroundMusic.startTime ?? 44;

    // Sync ref with state
    useEffect(() => {
      isMutedRef.current = isMuted;
    }, [isMuted]);

    const playAudio = useCallback(() => {
      userInteractedRef.current = true;
      shouldStartOnReadyRef.current = true;
      if (playerRef.current) {
        try {
          if (typeof playerRef.current.seekTo === 'function') {
            const current = typeof playerRef.current.getCurrentTime === 'function' ? playerRef.current.getCurrentTime() : 0;
            if (current < startTime - 1) {
              playerRef.current.seekTo(startTime, true);
            }
          }
          if (typeof playerRef.current.unMute === 'function') {
            playerRef.current.unMute();
            playerRef.current.setVolume(85);
          }
          if (typeof playerRef.current.playVideo === 'function') {
            playerRef.current.playVideo();
          }
          setIsMuted(false);
          setIsPlaying(true);
        } catch (e) {
          console.warn('Audio play trigger notice:', e);
        }
      }
    }, [startTime]);

    useImperativeHandle(ref, () => ({
      startAudio: playAudio,
    }));

    // Initialize YouTube Iframe Player
    useEffect(() => {
      let isMounted = true;

      const initPlayer = () => {
        if (!window.YT || !window.YT.Player) return;
        if (playerRef.current) return;

        const container = document.getElementById('youtube-hidden-player-slot');
        if (!container) return;

        try {
          playerRef.current = new window.YT.Player('youtube-hidden-player-slot', {
            height: '1',
            width: '1',
            videoId: youtubeId,
            playerVars: {
              autoplay: 0,
              controls: 0,
              disablekb: 1,
              fs: 0,
              iv_load_policy: 3,
              loop: 1,
              playlist: youtubeId,
              start: startTime,
              modestbranding: 1,
              playsinline: 1,
              rel: 0,
              enablejsapi: 1,
              origin: window.location.origin,
            },
            events: {
              onReady: (event: any) => {
                if (!isMounted) return;
                setIsPlayerReady(true);
                event.target.setVolume(85);
                event.target.seekTo(startTime, true);

                // Only play if user has pressed "Tap to begin"
                if (shouldStartOnReadyRef.current) {
                  try {
                    if (isMutedRef.current) {
                      event.target.mute();
                    } else {
                      event.target.unMute();
                    }
                    event.target.playVideo();
                  } catch {
                    // Handled upon user tap
                  }
                }
              },
              onStateChange: (event: any) => {
                if (!isMounted) return;
                const state = event.data;
                if (window.YT && window.YT.PlayerState) {
                  if (state === window.YT.PlayerState.PLAYING) {
                    setIsPlaying(true);
                    if (typeof event.target.isMuted === 'function') {
                      setIsMuted(event.target.isMuted());
                    }
                    if (typeof event.target.getCurrentTime === 'function') {
                      const current = event.target.getCurrentTime();
                      if (current < startTime - 1) {
                        event.target.seekTo(startTime, true);
                      }
                    }
                  } else if (state === window.YT.PlayerState.PAUSED) {
                    setIsPlaying(false);
                  } else if (state === window.YT.PlayerState.ENDED) {
                    event.target.seekTo(startTime, true);
                    event.target.playVideo();
                  }
                }
              },
              onError: (err: any) => {
                console.warn('YouTube Audio Player Notice:', err);
              },
            },
          });
        } catch (e) {
          console.warn('Could not initialize YouTube Player:', e);
        }
      };

      // Load YouTube Iframe API if not loaded
      if (!window.YT || !window.YT.Player) {
        const existingScript = document.getElementById('youtube-iframe-api-script');
        if (!existingScript) {
          const script = document.createElement('script');
          script.id = 'youtube-iframe-api-script';
          script.src = 'https://www.youtube.com/iframe_api';
          script.async = true;
          document.head.appendChild(script);
        }

        const prevCallback = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (typeof prevCallback === 'function') prevCallback();
          if (isMounted) initPlayer();
        };
      } else {
        initPlayer();
      }

      return () => {
        isMounted = false;
        if (playerRef.current && typeof playerRef.current.destroy === 'function') {
          try {
            playerRef.current.destroy();
          } catch {
            // Cleanup catch
          }
          playerRef.current = null;
        }
      };
    }, [youtubeId, startTime]);

    // Toggle Mute / Unmute handler
    const handleToggleMute = useCallback(() => {
      userInteractedRef.current = true;

      if (!playerRef.current) {
        setIsMuted((prev) => !prev);
        return;
      }

      try {
        if (isMuted) {
          if (typeof playerRef.current.getCurrentTime === 'function') {
            const current = playerRef.current.getCurrentTime();
            if (current < startTime - 1) {
              playerRef.current.seekTo(startTime, true);
            }
          }
          playerRef.current.unMute();
          playerRef.current.setVolume(85);
          playerRef.current.playVideo();
          setIsMuted(false);
          setIsPlaying(true);
        } else {
          playerRef.current.mute();
          setIsMuted(true);
        }
      } catch {
        setIsMuted((prev) => !prev);
      }
    }, [isMuted, startTime]);

    return (
      <>
        {/* Hidden YouTube Player */}
        <div
          id="youtube-audio-host"
          aria-hidden="true"
          tabIndex={-1}
          className="fixed -top-[9999px] -left-[9999px] w-1 h-1 pointer-events-none opacity-0 overflow-hidden -z-50"
        >
          <div id="youtube-hidden-player-slot" />
        </div>

        {/* On-Screen Mute/Unmute Toggle Button */}
        <div className={`fixed top-4 right-4 sm:top-5 sm:right-5 z-50 pointer-events-auto ${className}`}>
          <button
            id="audio-mute-toggle"
            type="button"
            onClick={handleToggleMute}
            aria-label={
              isMuted
                ? `Unmute wedding song ${songName} by ${artist}`
                : `Mute wedding song ${songName} by ${artist}`
            }
            title={isMuted ? `Play: ${songName} by ${artist}` : `Mute: ${songName} by ${artist}`}
            className={`group flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 backdrop-blur-md shadow-lg select-none cursor-pointer active:scale-95 ${
              isMuted
                ? 'bg-[#0B1A3A]/85 border-[#C9A24B]/40 text-[#C9A24B]/70 hover:border-[#C9A24B]/80 hover:text-[#F8CC4F]'
                : 'bg-[#0B1A3A]/90 border-[#C9A24B] text-[#F8CC4F] shadow-[0_4px_16px_rgba(201,162,75,0.25)] hover:border-[#F8CC4F] hover:shadow-[0_4px_20px_rgba(248,204,79,0.4)]'
            }`}
          >
            {/* Volume Icon */}
            <div className="relative flex items-center justify-center w-4 h-4 flex-shrink-0">
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-[#C9A24B]/80 transition-colors group-hover:text-[#F8CC4F]" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#F8CC4F] transition-transform group-hover:scale-110" />
              )}
            </div>

            {/* Equalizer Wave Animation (Only when unmuted and playing) */}
            {!isMuted && isPlaying ? (
              <div className="flex items-end gap-[2px] h-3.5 px-0.5 overflow-hidden" aria-hidden="true">
                <span className="w-[2px] bg-[#F8CC4F] rounded-full soundwave-bar-1" />
                <span className="w-[2px] bg-[#F8CC4F] rounded-full soundwave-bar-2" />
                <span className="w-[2px] bg-[#F8CC4F] rounded-full soundwave-bar-3" />
              </div>
            ) : null}

            {/* Song Name & Mute State Label */}
            <span className="text-[11px] sm:text-xs font-serif tracking-wider whitespace-nowrap leading-none transition-colors">
              {isMuted ? (
                <span className="text-[#C9A24B]/80 group-hover:text-[#F8CC4F]">Muted</span>
              ) : (
                <span className="text-[#FDFBF6] group-hover:text-[#F8CC4F]">{songName}</span>
              )}
            </span>
          </button>
        </div>
      </>
    );
  }
);

AudioPlayer.displayName = 'AudioPlayer';

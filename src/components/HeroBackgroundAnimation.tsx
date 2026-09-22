import React, { useRef, useEffect } from 'react';

interface Lantern {
  x: number;
  y: number;
  width: number;
  height: number;
  vy: number;
  vx: number;
  swaySpeed: number;
  swayOffset: number;
  swayRange: number;
  flickerSpeed: number;
  flickerPhase: number;
  baseAlpha: number;
  alpha: number;
  depth: number; // 0 (far) to 1 (near)
}

interface Sparkle {
  x: number;
  y: number;
  radius: number;
  vy: number;
  alpha: number;
  twinkleSpeed: number;
  phase: number;
}

export const HeroBackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create sky lanterns (the glowing floating orange lanterns from the video)
    const lanternCount = Math.max(18, Math.min(Math.floor((width * height) / 30000), 28));
    const lanterns: Lantern[] = [];

    const createLantern = (initY?: number): Lantern => {
      const depth = Math.random(); // 0 (far) to 1 (near)
      const baseWidth = 8 + depth * 14; // 8px to 22px
      const baseHeight = baseWidth * 1.35;
      const y = initY !== undefined ? initY : Math.random() * (height * 0.75);
      const x = Math.random() * width;

      return {
        x,
        y,
        width: baseWidth,
        height: baseHeight,
        vy: -(0.25 + depth * 0.45), // Float upwards
        vx: (Math.random() - 0.5) * 0.12,
        swaySpeed: 0.015 + Math.random() * 0.02,
        swayOffset: Math.random() * Math.PI * 2,
        swayRange: 12 + depth * 18,
        flickerSpeed: 0.04 + Math.random() * 0.05,
        flickerPhase: Math.random() * Math.PI * 2,
        baseAlpha: 0.75 + depth * 0.25,
        alpha: 0.9,
        depth,
      };
    };

    for (let i = 0; i < lanternCount; i++) {
      lanterns.push(createLantern());
    }

    // Gentle upward golden spark particles
    const sparkleCount = 20;
    const sparkles: Sparkle[] = [];
    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.65),
        radius: Math.random() * 1.5 + 0.8,
        vy: -(Math.random() * 0.35 + 0.15),
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.04 + 0.02,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Helper: Draw single glowing sky lantern
    const drawSkyLantern = (
      c: CanvasRenderingContext2D,
      lantern: Lantern
    ) => {
      c.save();

      // Atmospheric outer warm halo
      const haloRadius = lantern.width * 2.4;
      const halo = c.createRadialGradient(
        lantern.x,
        lantern.y + lantern.height * 0.5,
        lantern.width * 0.3,
        lantern.x,
        lantern.y + lantern.height * 0.5,
        haloRadius
      );
      halo.addColorStop(0, `rgba(255, 175, 45, ${0.45 * lantern.alpha})`);
      halo.addColorStop(0.5, `rgba(255, 120, 20, ${0.18 * lantern.alpha})`);
      halo.addColorStop(1, 'rgba(255, 80, 0, 0)');
      c.fillStyle = halo;
      c.beginPath();
      c.arc(lantern.x, lantern.y + lantern.height * 0.5, haloRadius, 0, Math.PI * 2);
      c.fill();

      // Lantern body (curved barrel shape)
      const w = lantern.width;
      const h = lantern.height;
      const left = lantern.x - w / 2;
      const top = lantern.y;

      c.beginPath();
      c.moveTo(left + w * 0.18, top);
      c.quadraticCurveTo(lantern.x, top - h * 0.06, left + w * 0.82, top);
      c.quadraticCurveTo(left + w * 1.08, top + h * 0.5, left + w * 0.88, top + h);
      c.quadraticCurveTo(lantern.x, top + h * 0.94, left + w * 0.12, top + h);
      c.quadraticCurveTo(left - w * 0.08, top + h * 0.5, left + w * 0.18, top);
      c.closePath();

      // Translucent parchment paper gradient
      const paperGrad = c.createLinearGradient(0, top, 0, top + h);
      paperGrad.addColorStop(0, `rgba(255, 235, 180, ${0.92 * lantern.alpha})`);
      paperGrad.addColorStop(0.35, `rgba(255, 170, 40, ${0.95 * lantern.alpha})`);
      paperGrad.addColorStop(0.85, `rgba(240, 95, 25, ${0.98 * lantern.alpha})`);
      paperGrad.addColorStop(1, `rgba(180, 50, 15, ${0.95 * lantern.alpha})`);
      c.fillStyle = paperGrad;
      c.fill();

      // Inner flame core (bright golden incandescent spark)
      c.beginPath();
      c.arc(lantern.x, top + h * 0.72, w * 0.22, 0, Math.PI * 2);
      c.fillStyle = `rgba(255, 255, 220, ${0.95 * lantern.alpha})`;
      c.shadowColor = '#FFA500';
      c.shadowBlur = 8;
      c.fill();

      c.restore();
    };

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.08);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Render floating sky lanterns in sky portion (top 68% of screen)
      for (let i = 0; i < lanterns.length; i++) {
        const l = lanterns[i];

        // Move upwards and sway
        l.y += l.vy * 60 * dt;
        l.swayOffset += l.swaySpeed;
        const currentSwayX = Math.sin(l.swayOffset) * l.swayRange * 0.04;
        l.x += currentSwayX;

        // Flicker brightness
        l.flickerPhase += l.flickerSpeed;
        const flicker = (Math.sin(l.flickerPhase) + 1) * 0.5;
        l.alpha = l.baseAlpha * (0.82 + flicker * 0.18);

        // Respawn when floated above top
        if (l.y < -30) {
          lanterns[i] = createLantern(height * 0.62 + Math.random() * (height * 0.15));
        }

        drawSkyLantern(ctx, l);
      }

      // Render tiny ascending embers
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.y += s.vy * 60 * dt;
        s.phase += s.twinkleSpeed;
        const alpha = Math.max(0.1, Math.sin(s.phase) * s.alpha);

        if (s.y < -10) {
          s.y = height * 0.6 + Math.random() * 50;
          s.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 220, 120, ${alpha})`;
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 4;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
    >
      {/* High-res Anand Karaj Sunset Pavilion Backdrop Artwork (Local Asset) */}
      <img
        src="/assets/hero_sunset_bg.jpg"
        alt="Anand Karaj Sunset Wedding Ceremony"
        className="w-full h-full object-cover object-center"
      />

      {/* Atmospheric sunset lighting gradient overlays for readability and glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(11, 26, 58, 0.45) 0%, rgba(180, 70, 30, 0.15) 30%, transparent 60%, rgba(11, 26, 58, 0.6) 100%)',
        }}
      />

      {/* Floating Sky Lanterns Canvas Animation */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};

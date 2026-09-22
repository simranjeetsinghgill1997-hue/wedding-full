import React, { useRef, useEffect } from 'react';

interface HeroBackgroundAnimationProps {
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  baseRadius: number;
  radius: number;
  alpha: number;
  maxAlpha: number;
  vx: number;
  vy: number;
  twinkleSpeed: number;
  phase: number;
  color: string;
  type: 'star' | 'bokeh' | 'sparkle';
  rotation: number;
  rotSpeed: number;
}

const GOLD_PALETTE = [
  '#FFE89E',
  '#FAD06C',
  '#FFDF00',
  '#F5BE0B',
  '#ECC880',
  '#F8CC4F',
  '#FFF275',
];

export const HeroBackgroundAnimation: React.FC<HeroBackgroundAnimationProps> = ({
  className = '',
}) => {
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

    // Particle count suited for vibrant starry golden celestial royal night
    const count = Math.max(45, Math.min(Math.floor((width * height) / 14000), 75));
    const particles: Particle[] = [];

    const createParticle = (initY?: number): Particle => {
      const roll = Math.random();
      const type: 'star' | 'bokeh' | 'sparkle' =
        roll < 0.45 ? 'star' : roll < 0.8 ? 'sparkle' : 'bokeh';

      let baseRadius = 2;
      let maxAlpha = 0.7;

      if (type === 'star') {
        baseRadius = Math.random() * 4.5 + 3.2; // 4-pointed radiant flare stars
        maxAlpha = Math.random() * 0.45 + 0.45;
      } else if (type === 'sparkle') {
        baseRadius = Math.random() * 2.2 + 1.0;
        maxAlpha = Math.random() * 0.4 + 0.35;
      } else {
        baseRadius = Math.random() * 24 + 14; // Soft glowing ambient gold orbs
        maxAlpha = Math.random() * 0.12 + 0.05;
      }

      return {
        x: Math.random() * width,
        y: initY !== undefined ? initY : Math.random() * height,
        baseRadius,
        radius: baseRadius,
        alpha: Math.random() * maxAlpha,
        maxAlpha,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.28 + 0.1), // Gentle upward drift like golden lanterns/sparks
        twinkleSpeed: Math.random() * 0.038 + 0.015,
        phase: Math.random() * Math.PI * 2,
        color: GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)],
        type,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.012,
      };
    };

    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }

    // Helper: Draw 4-point golden star flare
    const drawStar = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      r: number,
      rot: number,
      color: string,
      a: number
    ) => {
      c.save();
      c.translate(cx, cy);
      c.rotate(rot);
      c.globalAlpha = a;

      // Outer glow aura
      const grad = c.createRadialGradient(0, 0, 0, 0, 0, r * 2.8);
      grad.addColorStop(0, 'rgba(255, 223, 0, 0.45)');
      grad.addColorStop(0.5, 'rgba(245, 190, 11, 0.15)');
      grad.addColorStop(1, 'rgba(11, 26, 58, 0)');
      c.fillStyle = grad;
      c.beginPath();
      c.arc(0, 0, r * 2.8, 0, Math.PI * 2);
      c.fill();

      // 4-pointed curved star
      c.beginPath();
      c.moveTo(0, -r);
      c.quadraticCurveTo(0, 0, r, 0);
      c.quadraticCurveTo(0, 0, 0, r);
      c.quadraticCurveTo(0, 0, -r, 0);
      c.quadraticCurveTo(0, 0, 0, -r);
      c.closePath();
      c.fillStyle = color;
      c.fill();

      // Diamond shimmer center core
      c.beginPath();
      c.arc(0, 0, Math.max(1, r * 0.25), 0, Math.PI * 2);
      c.fillStyle = '#FFFFFF';
      c.fill();

      c.restore();
    };

    // Helper: Draw sparkling gold dot
    const drawSparkle = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      r: number,
      color: string,
      a: number
    ) => {
      c.save();
      c.globalAlpha = a;

      const grad = c.createRadialGradient(cx, cy, 0, cx, cy, r * 2.2);
      grad.addColorStop(0, color);
      grad.addColorStop(0.5, 'rgba(255, 215, 0, 0.35)');
      grad.addColorStop(1, 'rgba(255, 215, 0, 0)');
      c.fillStyle = grad;
      c.beginPath();
      c.arc(cx, cy, r * 2.2, 0, Math.PI * 2);
      c.fill();

      c.beginPath();
      c.arc(cx, cy, r, 0, Math.PI * 2);
      c.fillStyle = '#FFF8DC';
      c.fill();

      c.restore();
    };

    // Helper: Draw floating warm bokeh orb
    const drawBokeh = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      r: number,
      color: string,
      a: number
    ) => {
      c.save();
      c.globalAlpha = a;
      const grad = c.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, color);
      grad.addColorStop(0.7, 'rgba(201, 162, 75, 0.2)');
      grad.addColorStop(1, 'rgba(11, 26, 58, 0)');
      c.fillStyle = grad;
      c.beginPath();
      c.arc(cx, cy, r, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.08);
      lastTime = now;

      // Royal deep midnight blue background gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height * 0.45,
        width * 0.1,
        width / 2,
        height * 0.45,
        height * 0.85
      );
      bgGrad.addColorStop(0, '#10244F'); // Rich illuminated midnight navy
      bgGrad.addColorStop(0.5, '#0B1A3A'); // Signature royal navy
      bgGrad.addColorStop(1, '#050B18'); // Deep midnight shadow

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render floating golden dust, bokeh, and twinkling diamond star lights
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += p.vy * 60 * dt;
        p.x += Math.sin(p.phase) * p.vx * 60 * dt;
        p.rotation += p.rotSpeed;

        p.phase += p.twinkleSpeed;
        const sine = (Math.sin(p.phase) + 1) / 2;
        p.alpha = Math.max(0.02, sine * p.maxAlpha);
        p.radius = p.baseRadius * (0.85 + sine * 0.3);

        if (p.y < -30) {
          particles[i] = createParticle(height + 25);
        } else if (p.x < -30) {
          p.x = width + 20;
        } else if (p.x > width + 30) {
          p.x = -20;
        }

        if (p.type === 'star') {
          drawStar(ctx, p.x, p.y, p.radius, p.rotation, p.color, p.alpha);
        } else if (p.type === 'sparkle') {
          drawSparkle(ctx, p.x, p.y, p.radius, p.color, p.alpha);
        } else {
          drawBokeh(ctx, p.x, p.y, p.radius, p.color, p.alpha);
        }
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
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none select-none ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Subtle gold ambient vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(248, 204, 79, 0.08) 0%, transparent 65%)',
        }}
      />
    </div>
  );
};

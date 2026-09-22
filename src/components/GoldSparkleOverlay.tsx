import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseSize: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  speedY: number;
  speedX: number;
  twinkleSpeed: number;
  phase: number;
  type: 'star' | 'glitter';
  color: string;
  rotation: number;
  rotSpeed: number;
}

const GOLD_PALETTE = [
  '#FFDF00', // Vibrant golden yellow
  '#FFD700', // Rich radiant gold
  '#FFC000', // Warm amber yellow gold
  '#F5BE0B', // Bright saffron yellow gold
  '#FBBF24', // Sunny marigold gold
  '#EAB308', // Deep golden yellow
  '#FFE066', // Luminous sunny gold
];

interface GoldSparkleOverlayProps {
  visible?: boolean;
}

export const GoldSparkleOverlay: React.FC<GoldSparkleOverlayProps> = ({ visible = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visibleRef = useRef(visible);

  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Reduced by another 30%: scaled from 22 up to 38 particles
    const particleCount = Math.max(22, Math.min(Math.floor((width * height) / 28000), 38));
    const particles: Particle[] = [];

    const createParticle = (initialY?: number): Particle => {
      const isStar = Math.random() < 0.52;
      const baseSize = isStar ? Math.random() * 5 + 3.2 : Math.random() * 1.8 + 0.8;
      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        baseSize,
        size: baseSize,
        alpha: Math.random() * 0.35,
        maxAlpha: isStar ? Math.random() * 0.35 + 0.28 : Math.random() * 0.25 + 0.15,
        speedY: -(Math.random() * 0.24 + 0.1), // Gentle upward drift
        speedX: (Math.random() - 0.5) * 0.18, // Subtle horizontal sway
        twinkleSpeed: Math.random() * 0.035 + 0.016,
        phase: Math.random() * Math.PI * 2,
        type: isStar ? 'star' : 'glitter',
        color: GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)],
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.01,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    // Helper: Draw 4-pointed curved flare star with rich yellow-gold glow
    const drawFourPointStar = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      radius: number,
      rot: number,
      color: string,
      alpha: number
    ) => {
      c.save();
      c.translate(cx, cy);
      c.rotate(rot);
      c.globalAlpha = alpha;

      // Soft ambient golden-yellow halo
      const halo = c.createRadialGradient(0, 0, 0, 0, 0, radius * 2.5);
      halo.addColorStop(0, 'rgba(255, 223, 0, 0.38)');
      halo.addColorStop(0.45, 'rgba(245, 190, 11, 0.14)');
      halo.addColorStop(1, 'rgba(245, 190, 11, 0)');
      c.fillStyle = halo;
      c.beginPath();
      c.arc(0, 0, radius * 2.5, 0, Math.PI * 2);
      c.fill();

      // 4-pointed concave diamond sparkle
      c.beginPath();
      c.moveTo(0, -radius);
      c.quadraticCurveTo(0, 0, radius, 0);
      c.quadraticCurveTo(0, 0, 0, radius);
      c.quadraticCurveTo(0, 0, -radius, 0);
      c.quadraticCurveTo(0, 0, 0, -radius);
      c.closePath();
      c.fillStyle = color;
      c.fill();

      // Diamond center shimmer core (warm golden yellow spark)
      c.beginPath();
      c.arc(0, 0, Math.max(1, radius * 0.24), 0, Math.PI * 2);
      c.fillStyle = '#FFF59D';
      c.fill();

      c.restore();
    };

    // Helper: Draw soft glowing micro-glitter dot with yellow-gold shimmer
    const drawGlitterDot = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      radius: number,
      color: string,
      alpha: number
    ) => {
      c.save();
      c.globalAlpha = alpha;

      // Yellow-gold glow
      const glow = c.createRadialGradient(cx, cy, 0, cx, cy, radius * 2.2);
      glow.addColorStop(0, color);
      glow.addColorStop(1, 'rgba(255, 215, 0, 0)');
      c.fillStyle = glow;
      c.beginPath();
      c.arc(cx, cy, radius * 2.2, 0, Math.PI * 2);
      c.fill();

      c.beginPath();
      c.arc(cx, cy, radius, 0, Math.PI * 2);
      c.fillStyle = '#FFEB3B';
      c.fill();

      c.restore();
    };

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (!visibleRef.current) {
        ctx.clearRect(0, 0, width, height);
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update positions with subtle floating
        p.y += p.speedY * 60 * dt;
        p.x += Math.sin(p.phase) * p.speedX * 60 * dt;
        p.rotation += p.rotSpeed;

        // Twinkle sinusoidal pulsation
        p.phase += p.twinkleSpeed;
        const sineWave = (Math.sin(p.phase) + 1) / 2; // Range [0, 1]
        p.alpha = Math.max(0.02, sineWave * p.maxAlpha);
        p.size = p.baseSize * (0.75 + sineWave * 0.45);

        // Respawn when floated above screen or out of bounds
        if (p.y < -20) {
          particles[i] = createParticle(height + 15);
        } else if (p.x < -20) {
          p.x = width + 10;
        } else if (p.x > width + 20) {
          p.x = -10;
        }

        // Draw particle
        if (p.type === 'star') {
          drawFourPointStar(ctx, p.x, p.y, p.size, p.rotation, p.color, p.alpha);
        } else {
          drawGlitterDot(ctx, p.x, p.y, p.size, p.color, p.alpha);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-30 overflow-hidden transition-opacity duration-700 ease-in-out ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Subtle festive starlight canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Delicate golden-yellow perimeter vignette adding magical festive glow without obstructing text */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 66%, rgba(255, 215, 0, 0.04) 88%, rgba(245, 190, 11, 0.09) 100%)',
        }}
      />
    </div>
  );
};

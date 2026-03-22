import { useEffect, useRef, useCallback } from "react";

const LAYER_CONFIG = {
  far: {
    radiusMin: 1, radiusMax: 1.5,
    opacityMin: 0.10, opacityMax: 0.20,
    gravityResponse: 0.1,
    glowBlur: 0,
    color: [251, 191, 36],
  },
  mid: {
    radiusMin: 2, radiusMax: 3,
    opacityMin: 0.25, opacityMax: 0.40,
    gravityResponse: 0.4,
    glowBlur: 6,
    color: [251, 191, 36],
  },
  near: {
    radiusMin: 3, radiusMax: 4,
    opacityMin: 0.55, opacityMax: 0.75,
    gravityResponse: 1.0,
    glowBlur: 12,
    color: [253, 224, 71],
  },
};

function Starfield({ lightMode = false, onReady }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const starsRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const startTimeRef = useRef(Date.now());
  const lightModeRef = useRef(lightMode);
  const onReadyRef = useRef(onReady);

  // Keep refs in sync with props
  useEffect(() => { lightModeRef.current = lightMode; }, [lightMode]);
  useEffect(() => { onReadyRef.current = onReady; }, [onReady]);

  const isMobile = useRef(
    typeof window !== "undefined" &&
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ).current;

  const prefersReducedMotion = useRef(
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ).current;

  const generateStars = useCallback(() => {
    const farCount = isMobile ? 35 : 60;
    const midCount = isMobile ? 15 : 30;
    const nearCount = isMobile ? 5 : 10;
    const stars = [];

    const makeStar = (layer) => {
      const cfg = LAYER_CONFIG[layer];
      return {
        homeX: Math.random(),
        homeY: Math.random(),
        dx: 0,
        dy: 0,
        vx: 0,
        vy: 0,
        radius: cfg.radiusMin + Math.random() * (cfg.radiusMax - cfg.radiusMin),
        baseOpacity: cfg.opacityMin + Math.random() * (cfg.opacityMax - cfg.opacityMin),
        gravityResponse: cfg.gravityResponse,
        glowBlur: cfg.glowBlur,
        color: cfg.color,
        layer,
        twinkleSpeed: (Math.PI * 2) / (2 + Math.random() * 3),
        twinklePhase: Math.random() * Math.PI * 2,
        driftAmpX: 2 + Math.random() * 4,
        driftAmpY: 2 + Math.random() * 4,
        driftPeriodX: 8 + Math.random() * 12,
        driftPeriodY: 8 + Math.random() * 12,
        driftPhaseX: Math.random() * Math.PI * 2,
        driftPhaseY: Math.random() * Math.PI * 2,
        driftOffsetX: 0,
        driftOffsetY: 0,
      };
    };

    for (let i = 0; i < nearCount; i++) stars.push(makeStar("near"));
    for (let i = 0; i < midCount; i++) stars.push(makeStar("mid"));
    for (let i = 0; i < farCount; i++) stars.push(makeStar("far"));

    return stars;
  }, [isMobile]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio, 2);
    const width = canvas.clientWidth * dpr;
    const height = canvas.clientHeight * dpr;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const time = (Date.now() - startTimeRef.current) / 1000;
    const lm = lightModeRef.current;
    const opacityScale = lm ? 0.35 : 1.0;
    const glowScale = lm ? 0.5 : 1.0;

    ctx.fillStyle = lm ? "rgb(249,250,251)" : "rgb(10,10,10)";
    ctx.fillRect(0, 0, width, height);

    const stars = starsRef.current;
    if (!stars) return;

    const mouse = mouseRef.current;
    const gravityRadius = 150 * dpr;

    // Update physics
    for (const star of stars) {
      star.driftOffsetX = Math.sin(time / star.driftPeriodX * Math.PI * 2 + star.driftPhaseX) * star.driftAmpX * dpr;
      star.driftOffsetY = Math.sin(time / star.driftPeriodY * Math.PI * 2 + star.driftPhaseY) * star.driftAmpY * dpr;

      if (mouse.x >= 0 && mouse.y >= 0) {
        const starPixelX = star.homeX * width + star.dx + star.driftOffsetX;
        const starPixelY = star.homeY * height + star.dy + star.driftOffsetY;
        const mousePixelX = mouse.x * width;
        const mousePixelY = mouse.y * height;
        const distX = mousePixelX - starPixelX;
        const distY = mousePixelY - starPixelY;
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist < gravityRadius && dist > 0) {
          const force = (1 - dist / gravityRadius) * 2 * star.gravityResponse;
          star.vx += (distX / dist) * force;
          star.vy += (distY / dist) * force;
        }
      }

      const springForce = 0.05;
      star.vx += -star.dx * springForce;
      star.vy += -star.dy * springForce;

      star.vx *= 0.9;
      star.vy *= 0.9;

      star.dx += star.vx;
      star.dy += star.vy;

      const px = star.homeX * width + star.dx + star.driftOffsetX;
      const py = star.homeY * height + star.dy + star.driftOffsetY;
      if (px < 0) star.dx = -star.homeX * width - star.driftOffsetX;
      if (px > width) star.dx = width - star.homeX * width - star.driftOffsetX;
      if (py < 0) star.dy = -star.homeY * height - star.driftOffsetY;
      if (py > height) star.dy = height - star.homeY * height - star.driftOffsetY;
    }

    // Draw glow stars (near, then mid)
    for (const star of stars) {
      if (star.glowBlur === 0) continue;

      const x = star.homeX * width + star.dx + star.driftOffsetX;
      const y = star.homeY * height + star.dy + star.driftOffsetY;
      const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.2;
      const opacity = Math.max(0, (star.baseOpacity + twinkle * star.baseOpacity)) * opacityScale;
      const r = star.radius * dpr;
      const [cr, cg, cb] = star.color;

      ctx.shadowBlur = star.glowBlur * dpr * glowScale;
      ctx.shadowColor = `rgba(${cr},${cg},${cb},${opacity * 0.6})`;
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      if (star.layer === "near") {
        ctx.shadowBlur = 24 * dpr * glowScale;
        ctx.shadowColor = `rgba(${cr},${cg},${cb},${opacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Reset shadow before drawing far stars
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";

    // Draw far stars (no glow)
    for (const star of stars) {
      if (star.glowBlur !== 0) continue;

      const x = star.homeX * width + star.dx + star.driftOffsetX;
      const y = star.homeY * height + star.dy + star.driftOffsetY;
      const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.2;
      const opacity = Math.max(0, (star.baseOpacity + twinkle * star.baseOpacity)) * opacityScale;
      const r = star.radius * dpr;
      const [cr, cg, cb] = star.color;

      ctx.fillStyle = `rgba(${cr},${cg},${cb},${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [isMobile]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    starsRef.current = generateStars();

    if (prefersReducedMotion) {
      render();
      if (onReadyRef.current) onReadyRef.current();
      return;
    }

    let firstFrame = true;
    const loop = () => {
      render();
      if (firstFrame) {
        firstFrame = false;
        if (onReadyRef.current) onReadyRef.current();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [generateStars, render, prefersReducedMotion]);

  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -1, y: -1 };
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    />
  );
}

export default Starfield;

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Trainovate intro reveal.
 *
 * Lazy-loads three.js, runs ~8.5s, calls onDone() when finished or
 * when the user interacts. Phases (absolute ms):
 *
 *   0    –  400   particles scattered + drifting in 3D
 *   400  – 2000   particles converge along the two ±30° ellipses
 *   1600 – 2400   cobalt nucleus materializes with a flare-orange halo
 *   2000 – 2800   "Trainovate.ai" wordmark fades in (DOM overlay)
 *   2800 – 7800   HOLD — mark fully revealed, gentle rotation, soft halo
 *   7800 – 8500   camera dolly forward + scene fades to bone (hub bg)
 */

const COBALT = 0x0046e6;
const FLARE  = 0xff6b1a;
const BONE   = 0xf4f1ea;

// Phase boundaries in milliseconds — change these to retime the reveal
const T = {
  driftEnd:    400,
  convStart:   400,
  convEnd:    2000,
  nucIn:      1600,
  nucFull:    2400,
  haloPeak:   2200,
  wordmarkIn: 2000,
  holdEnd:    7800,
  dollyEnd:   8500,
} as const;
const DURATION = T.dollyEnd;

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function Intro({ onDone }: { onDone: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<0 | 1>(0); // 0 = playing, 1 = wordmark visible

  // Skip on any interaction
  useEffect(() => {
    function skip(e: Event) {
      e.preventDefault();
      onDone();
    }
    window.addEventListener("click", skip, { passive: false });
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: false });
    window.addEventListener("touchstart", skip, { passive: false });
    return () => {
      window.removeEventListener("click", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
    };
  }, [onDone]);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    const container = containerRef.current;
    if (!container) return;

    (async () => {
      const THREE = await import("three");
      if (cancelled || !containerRef.current) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a0a0a);

      const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000);
      camera.position.z = 60;

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      container.appendChild(renderer.domElement);

      // ─── Particles ───
      // Half on orbit A (+30°), half on orbit B (−30°). Each particle
      // gets a chord position 0..2π along its ellipse.
      const N = 600;
      const half = N / 2;
      const RX = 18; // ellipse radii in scene units
      const RY = 7.2;
      const start = new Float32Array(N * 3);
      const target = new Float32Array(N * 3);

      for (let i = 0; i < N; i++) {
        // Random initial scatter in a fat slab
        start[i * 3 + 0] = (Math.random() - 0.5) * 140;
        start[i * 3 + 1] = (Math.random() - 0.5) * 80;
        start[i * 3 + 2] = (Math.random() - 0.5) * 120 - 20;

        // Target: distributed along the orbit, with tiny z-jitter
        const onA = i < half;
        const t = (onA ? i / half : (i - half) / half) * Math.PI * 2;
        const x0 = Math.cos(t) * RX;
        const y0 = Math.sin(t) * RY;
        const angle = onA ? Math.PI / 6 : -Math.PI / 6;
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        target[i * 3 + 0] = x0 * c - y0 * s;
        target[i * 3 + 1] = x0 * s + y0 * c;
        target[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
      }

      const positions = new Float32Array(start);
      const geom = new THREE.BufferGeometry();
      geom.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      const mat = new THREE.PointsMaterial({
        color: BONE,
        size: 0.42,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particles = new THREE.Points(geom, mat);
      scene.add(particles);

      // ─── Nucleus ───
      const nucleusGeom = new THREE.SphereGeometry(1.6, 32, 32);
      const nucleusMat = new THREE.MeshBasicMaterial({
        color: COBALT,
        transparent: true,
        opacity: 0,
      });
      const nucleus = new THREE.Mesh(nucleusGeom, nucleusMat);
      scene.add(nucleus);

      // ─── Orange halo (sprite) ───
      // Procedural radial-gradient texture so we don't ship a PNG.
      const haloCanvas = document.createElement("canvas");
      haloCanvas.width = haloCanvas.height = 128;
      const ctx = haloCanvas.getContext("2d")!;
      const grd = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grd.addColorStop(0.0, "rgba(255,107,26,0.85)");
      grd.addColorStop(0.4, "rgba(255,107,26,0.35)");
      grd.addColorStop(1.0, "rgba(255,107,26,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 128, 128);
      const haloTex = new THREE.CanvasTexture(haloCanvas);
      const haloMat = new THREE.SpriteMaterial({
        map: haloTex,
        color: FLARE,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const halo = new THREE.Sprite(haloMat);
      halo.scale.set(8, 8, 1);
      scene.add(halo);

      // ─── Animation loop ───
      const t0 = performance.now();
      let raf = 0;
      let done = false;

      function frame() {
        const ms = performance.now() - t0;

        // ── Particles: drift then converge ──
        const conv = ease(clamp01((ms - T.convStart) / (T.convEnd - T.convStart)));
        const arr = geom.attributes.position.array as Float32Array;
        for (let i = 0; i < N * 3; i++) {
          const drift = Math.sin(ms * 0.0008 + i) * 0.08;
          arr[i] = lerp(start[i] + drift, target[i], conv);
        }
        geom.attributes.position.needsUpdate = true;

        // Slow z-rotation throughout — including the 5 s hold
        particles.rotation.z = ms * 0.00018 * Math.PI;

        // ── Nucleus fade-in + scale ──
        const nucT = clamp01((ms - T.nucIn) / (T.nucFull - T.nucIn));
        nucleusMat.opacity = ease(nucT);
        nucleus.scale.setScalar(lerp(0.2, 1, ease(nucT)));

        // ── Halo: ramp in, peak, gentle pulse during hold, fade with the dolly ──
        let haloOpacity = 0;
        if (ms < T.nucIn) {
          haloOpacity = 0;
        } else if (ms < T.haloPeak) {
          haloOpacity = (ms - T.nucIn) / (T.haloPeak - T.nucIn);
        } else if (ms < T.holdEnd) {
          // Settle from peak to a soft baseline, then breathe
          const settle = clamp01((ms - T.haloPeak) / 1200); // 1.2 s settle
          const baseline = lerp(1.0, 0.45, settle);
          const pulse = 0.08 * Math.sin((ms - T.haloPeak) * 0.0018);
          haloOpacity = baseline + pulse;
        } else {
          haloOpacity = lerp(0.45, 0, ease(clamp01((ms - T.holdEnd) / (T.dollyEnd - T.holdEnd))));
        }
        haloMat.opacity = clamp01(haloOpacity) * 0.85;
        const haloScale = lerp(5, 14, ease(clamp01(ms / T.holdEnd)));
        halo.scale.set(haloScale, haloScale, 1);

        // ── Wordmark cue (DOM overlay) ──
        if (!done && ms > T.wordmarkIn + 200 && phase !== 1) setPhase(1);

        // ── Camera dolly + scene fade-out ──
        if (ms > T.holdEnd) {
          const dt = clamp01((ms - T.holdEnd) / (T.dollyEnd - T.holdEnd));
          camera.position.z = lerp(60, 18, ease(dt));
          const c = new THREE.Color(0x0a0a0a).lerp(new THREE.Color(BONE), ease(dt));
          scene.background = c;
          renderer.domElement.style.opacity = String(1 - ease(dt));
        }

        renderer.render(scene, camera);

        if (ms < DURATION) {
          raf = requestAnimationFrame(frame);
        } else if (!done) {
          done = true;
          onDone();
        }
      }

      raf = requestAnimationFrame(frame);

      // Resize
      function onResize() {
        const W = window.innerWidth;
        const H = window.innerHeight;
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        renderer.setSize(W, H);
      }
      window.addEventListener("resize", onResize);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
        geom.dispose();
        mat.dispose();
        nucleusGeom.dispose();
        nucleusMat.dispose();
        haloMat.dispose();
        haloTex.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-ink overflow-hidden"
      aria-hidden="true"
    >
      {/* Wordmark overlay — fades in mid-reveal */}
      <div
        className="absolute inset-x-0 bottom-[18%] flex flex-col items-center pointer-events-none transition-opacity duration-700"
        style={{ opacity: phase === 1 ? 1 : 0 }}
      >
        <div
          className="font-bold tracking-tight text-bone"
          style={{ fontSize: "clamp(28px, 4vw, 56px)", letterSpacing: "-0.02em" }}
        >
          Trainovate
          <span style={{ fontWeight: 500, opacity: 0.55 }}>.ai</span>
        </div>
        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/45">
          Brand Hub · v1.0
        </div>
      </div>

      {/* Skip hint */}
      <div className="absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/35 pointer-events-none">
        Skip · click anywhere
      </div>
    </div>
  );
}

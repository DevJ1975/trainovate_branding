"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Trainovate intro reveal.
 *
 * Lazy-loads three.js, runs ~3.5s, calls onDone() when finished or
 * when the user interacts. Phases:
 *
 *   0.0 – 0.4s   particles scattered + drifting in 3D
 *   0.4 – 2.0s   particles converge along the two ±30° ellipses
 *   1.6 – 2.4s   cobalt nucleus materializes with a flare-orange halo
 *   2.0 – 2.8s   "Trainovate.ai" wordmark fades in (DOM overlay)
 *   2.8 – 3.5s   camera dolly forward + scene fades to bone (hub bg)
 */

const COBALT = 0x0046e6;
const FLARE  = 0xff6b1a;
const BONE   = 0xf4f1ea;

const DURATION = 3500; // ms

function ease(t: number) {
  // easeInOutQuad
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

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
        const elapsed = performance.now() - t0;
        const t = Math.min(elapsed / DURATION, 1);

        // Phase A: particle drift + converge
        // 0.0 → 0.12  pure drift; 0.12 → 0.62 converge
        const conv = ease(Math.max(0, Math.min((t - 0.12) / 0.5, 1)));
        const arr = geom.attributes.position.array as Float32Array;
        for (let i = 0; i < N * 3; i++) {
          // Subtle pre-drift on the start positions
          const drift = Math.sin(elapsed * 0.0008 + i) * 0.08;
          arr[i] = lerp(start[i] + drift, target[i], conv);
        }
        geom.attributes.position.needsUpdate = true;

        // Slow rotation around z (the orbit axis)
        particles.rotation.z = t * Math.PI * 0.18;

        // Phase B: nucleus fades in (0.45 → 0.65)
        nucleusMat.opacity = ease(
          Math.max(0, Math.min((t - 0.45) / 0.2, 1))
        );
        nucleus.scale.setScalar(
          lerp(0.2, 1, ease(Math.max(0, Math.min((t - 0.45) / 0.25, 1))))
        );

        // Halo: bright peak at t≈0.55, fades by 0.85
        const haloT =
          t < 0.45
            ? 0
            : t < 0.55
            ? (t - 0.45) / 0.1
            : t < 0.85
            ? 1 - (t - 0.55) / 0.3
            : 0;
        haloMat.opacity = haloT * 0.85;
        const haloScale = lerp(5, 14, ease(Math.min(t / 0.7, 1)));
        halo.scale.set(haloScale, haloScale, 1);

        // Phase D: wordmark fade-in cue (DOM)
        if (!done && t > 0.58 && phase !== 1) setPhase(1);

        // Phase E: camera dolly + fade out
        if (t > 0.82) {
          const dt = (t - 0.82) / 0.18;
          camera.position.z = lerp(60, 18, ease(dt));
          // Fade scene to bone via background blend
          const c = new THREE.Color(0x0a0a0a).lerp(
            new THREE.Color(BONE),
            ease(dt)
          );
          scene.background = c;
          renderer.domElement.style.opacity = String(1 - ease(dt));
        }

        renderer.render(scene, camera);

        if (t < 1) {
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

/* ============================================================
   lotabin — Hero constellation reveal (calm, non-interactive)
   ------------------------------------------------------------
   A brand-aligned particle network that fades in OVER the frozen
   final frame of the cinematic hero once the background video has
   finished playing.

   Behaviour:
   - NON-INTERACTIVE drift. The pointer does not repel particles. The
     field simply floats slowly. Holes over the copy are measured once
     (and on resize), so the loop performs no per-frame layout reads.
   - DEFAULT COLOUR is lotabin paper-white.
   - On CTA hover ("Book a Sprout trial" / "See the work") a BRONZE
     RIPPLE travels outward from the CENTRE of the screen: a moving band
     of bronze recolours each particle/filament as it passes, then they
     return to white behind it — so the colour pulses out and resolves
     back to white. No extra shapes are drawn; only the existing design
     is recoloured.
   - Every particle is guaranteed at least one connecting filament.

   Triggers (idempotent — first one wins):
     • <video> 'ended'              → static hero (return visits)
     • .hero-scrub-text.is-revealed → scroll-scrub completes (1st visit)
   ============================================================ */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const sticky = document.querySelector('.hero-scrub-sticky');
  const video  = sticky && sticky.querySelector('.hero-scrub-video');
  const textEl = document.querySelector('.hero-scrub-text');
  if (!sticky) return;

  /* ---------- Canvas ---------- */
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-particles';
  canvas.setAttribute('aria-hidden', 'true');
  sticky.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
  let W = 0, H = 0;            // CSS pixels
  let particles = [];
  let rafId = 0;
  let running = false;
  let CX = 0, CY = 0, maxR = 1;

  /* lotabin palette (rgb triplets) */
  const PAPER  = [246, 244, 239];   // --paper-50  (default)
  const BRONZE = [200, 168, 118];   // --bronze  #c8a876
  const PAPER_FILL   = 'rgba(246,244,239,0.72)';
  const PAPER_STROKE = '246,244,239';
  // true only while a ripple is mid-flight — gates all per-element tint/pulse math
  let RIPPLING = false;

  /* ---------- Bronze ripple travelling out from screen centre ----------
     Each ripple is a band of bronze whose leading edge moves from the
     centre to beyond the corners over RIPPLE_LIFE ms. The band tints
     particles as it passes; ahead of and behind it they are white. */
  let ripples = [];
  const RIPPLE_LIFE = 1500; // ms
  const BAND = 190;         // px thickness of the colour swath
  function spawnRipple() {
    ripples.push({ t0: performance.now() });
    if (ripples.length > 4) ripples.shift();
  }
  // fraction bronze (0..1) for a point `d` px from centre
  function bronzeAt(d, now) {
    let f = 0;
    for (let i = 0; i < ripples.length; i++) {
      const p = (now - ripples[i].t0) / RIPPLE_LIFE;
      if (p < 0 || p >= 1) continue;
      const ease = 1 - Math.pow(1 - p, 3);   // easeOutCubic
      const front = ease * maxR;
      const v = 1 - Math.abs(d - front) / BAND;
      if (v > f) f = v;
    }
    return f < 0 ? 0 : f;
  }
  function toneAt(d, now) {
    const f = bronzeAt(d, now);
    if (f <= 0) return PAPER;
    if (f >= 1) return BRONZE;
    return [
      Math.round(PAPER[0] + (BRONZE[0] - PAPER[0]) * f),
      Math.round(PAPER[1] + (BRONZE[1] - PAPER[1]) * f),
      Math.round(PAPER[2] + (BRONZE[2] - PAPER[2]) * f)
    ];
  }

  let NOW = 0;

  class Particle {
    constructor(x, y, dx, dy, size) {
      this.x = x; this.y = y;
      this.dx = dx; this.dy = dy;
      this.size = size;
      this.pvx = 0; this.pvy = 0; // transient push velocity (decays)
    }
    draw() {
      ctx.beginPath();
      if (!RIPPLING) {
        // ambient path: constant white, no swell, no distance/tint math
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = PAPER_FILL;
      } else {
        const d = Math.hypot(this.x - CX, this.y - CY);
        const c = toneAt(d, NOW);
        // as the ripple band passes, briefly swell the particle, then settle
        const pulse = 1 + bronzeAt(d, NOW) * 0.9;
        ctx.arc(this.x, this.y, this.size * pulse, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ', 0.85)';
      }
      ctx.fill();
    }
    update() {
      if (this.x > W || this.x < 0) this.dx = -this.dx;
      if (this.y > H || this.y < 0) this.dy = -this.dy;
      this.x += this.dx + this.pvx;
      this.y += this.dy + this.pvy;
      this.pvx *= 0.95; // ease the shove away → back to ambient drift
      this.pvy *= 0.95;
      this.draw();
    }
  }

  function build() {
    particles = [];
    // Calmer field — fewer points so the constellation reads as a quiet
    // backdrop behind the copy rather than a busy network.
    const count = Math.min(66, Math.floor((W * H) / 34000));
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 1.7 + 0.8;
      const x = Math.random() * (W - size * 4) + size * 2;
      const y = Math.random() * (H - size * 4) + size * 2;
      const dx = (Math.random() * 0.24) - 0.12;
      const dy = (Math.random() * 0.24) - 0.12;
      particles.push(new Particle(x, y, dx, dy, size));
    }
  }

  /* One-shot outward shove from centre — the hero copy "pushes" the
     field aside as it lands in the middle of the screen. Particles
     nearer the centre are kicked harder; they drift back afterward. */
  function pushOut(strength) {
    const reach = maxR * 0.92;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      let dx = p.x - CX, dy = p.y - CY;
      let d = Math.hypot(dx, dy);
      if (d < 0.001) { dx = (Math.random() - 0.5); dy = (Math.random() - 0.5); d = Math.hypot(dx, dy); }
      const f = Math.max(0, 1 - d / reach);
      const kick = f * f * strength;
      p.pvx += (dx / d) * kick;
      p.pvy += (dy / d) * kick;
    }
  }

  function resize() {
    const r = sticky.getBoundingClientRect();
    W = r.width; H = r.height;
    CX = W / 2; CY = H / 2;
    maxR = Math.hypot(W / 2, H / 2) + BAND;
    canvas.width  = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    build();
    measureHoles();
  }

  function strokeBetween(a, b, op) {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    if (!RIPPLING) {
      ctx.strokeStyle = 'rgba(' + PAPER_STROKE + ',' + op + ')';
      ctx.lineWidth = 1;
    } else {
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      const dm = Math.hypot(mx - CX, my - CY);
      const c = toneAt(dm, NOW);
      ctx.strokeStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ', ' + op + ')';
      ctx.lineWidth = 1 + bronzeAt(dm, NOW) * 1.1;
    }
    ctx.stroke();
  }

  function connect() {
    const n = particles.length;
    const maxDist = (W / 8) * (H / 8);   // squared threshold
    const nearestIdx = new Array(n).fill(-1);
    const nearestD = new Array(n).fill(Infinity);
    const hasLink = new Array(n).fill(false);

    for (let a = 0; a < n; a++) {
      const pa = particles[a];
      for (let b = a + 1; b < n; b++) {
        const pb = particles[b];
        const dx = pa.x - pb.x;
        const dy = pa.y - pb.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < nearestD[a]) { nearestD[a] = d2; nearestIdx[a] = b; }
        if (d2 < nearestD[b]) { nearestD[b] = d2; nearestIdx[b] = a; }
        if (d2 < maxDist) {
          hasLink[a] = hasLink[b] = true;
          strokeBetween(pa, pb, (1 - d2 / maxDist) * 0.26);
        }
      }
    }
    // guarantee every particle has at least one filament
    for (let a = 0; a < n; a++) {
      if (!hasLink[a] && nearestIdx[a] >= 0) {
        strokeBetween(particles[a], particles[nearestIdx[a]], 0.16);
      }
    }
  }

  /* ---------- Keep the constellation OUT from behind the copy ---------- */
  const HOLE_PAD = 14;
  let holeRects = [];
  function measureHoles() {
    holeRects = [];
    if (!textEl) return;
    const base = sticky.getBoundingClientRect();
    const els = textEl.querySelectorAll(
      '.hero-eyebrow, .hero-headline .mask-line, .hero-sub, .hero-cta .btn'
    );
    for (let i = 0; i < els.length; i++) {
      const r = els[i].getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      holeRects.push({
        x: r.left - base.left - HOLE_PAD,
        y: r.top - base.top - HOLE_PAD,
        w: r.width + HOLE_PAD * 2,
        h: r.height + HOLE_PAD * 2
      });
    }
  }
  function punchHoles() {
    if (!holeRects.length) return;
    const feather = (typeof ctx.filter === 'string');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    if (feather) ctx.filter = 'blur(7px)';
    ctx.fillStyle = '#000';
    for (let i = 0; i < holeRects.length; i++) {
      const r = holeRects[i];
      const rad = Math.min(22, r.h / 2);
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(r.x, r.y, r.w, r.h, rad);
      else ctx.rect(r.x, r.y, r.w, r.h);
      ctx.fill();
    }
    ctx.restore();
  }

  function animate() {
    rafId = requestAnimationFrame(animate);
    NOW = performance.now();
    // drop finished ripples
    if (ripples.length) {
      ripples = ripples.filter(function (r) { return (NOW - r.t0) < RIPPLE_LIFE; });
    }
    RIPPLING = ripples.length > 0;
    ctx.clearRect(0, 0, W, H); // transparent — last video frame shows through
    for (let i = 0; i < particles.length; i++) particles[i].update();
    connect();
    punchHoles();
  }

  /* ---------- Activation ---------- */
  let activated = false;
  function activate() {
    if (activated) return;
    activated = true;

    /* Reveal the copy centred IN PLACE — no horizontal slide. The old
       flush-left → centre FLIP made the headline (and the particle field
       around it) lurch toward the left edge before settling. Now the copy
       simply lands centred and the only motion is the constellation being
       pushed outward from the centre, off the screen edges (below). */
    if (textEl) textEl.classList.add('is-centered');

    canvas.classList.add('is-on');
    requestAnimationFrame(function () {
      resize();
      running = true;
      animate();
      window.addEventListener('resize', resize, { passive: true });
      // shove the field outward the instant the copy lands centred, so the
      // reveal reads as the headline pushing the constellation off-screen.
      setTimeout(function () { pushOut(10); }, 140);
      setTimeout(measureHoles, 2100);

      // each CTA hover sends a bronze ripple out from centre, then back to white
      const ctas = document.querySelectorAll('.hero-cta .btn');
      ctas.forEach(function (btn) {
        btn.addEventListener('mouseenter', spawnRipple, { passive: true });
      });
    });
  }

  /* video finished → static hero (return visits) */
  if (video) video.addEventListener('ended', activate, { once: true });

  /* scrub completed → first visit. Watch the headline reveal latch. */
  if (textEl) {
    if (textEl.classList.contains('is-revealed')) {
      activate();
    } else {
      const mo = new MutationObserver(() => {
        if (textEl.classList.contains('is-revealed')) { mo.disconnect(); activate(); }
      });
      mo.observe(textEl, { attributes: true, attributeFilter: ['class'] });
    }
  }

  /* Pause the rAF loop when the hero scrolls out of view (perf). */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      const vis = entries[0] && entries[0].isIntersecting;
      if (!activated) return;
      if (vis && !running) { running = true; animate(); }
      else if (!vis && running) { running = false; cancelAnimationFrame(rafId); }
    }, { threshold: 0.01 });
    io.observe(sticky);
  }
})();

/* ============================================================
   Selected Work horizontal reel — scroll-driven right→left travel.
   Mirrors the production-orbit pattern: the section pins while the
   user scrolls vertically, and that scroll distance is mapped to a
   horizontal translate on the card row. Degrades to a native
   swipeable rail when JS is off or reduced-motion is requested.
   ============================================================ */
(() => {
  "use strict";

  function initWorkRail(section) {
    const track = section.querySelector('.work-rail-track');
    const viewport = section.querySelector('.work-rail-viewport');
    const rail = section.querySelector('.work-rail');
    const heading = section.querySelector('.work-rail-heading');
    if (!track || !viewport || !rail) return;

    const reduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return; // leave the native horizontal scroll fallback in place

    section.classList.add('is-pinned');

    let maxShift = 0;

    function stickyTopPx() {
      const v = parseFloat(getComputedStyle(viewport).top);
      return Number.isFinite(v) ? v : 0;
    }

    function layout() {
      // Measure with no transform applied.
      rail.style.transform = 'translate3d(0,0,0)';
      maxShift = Math.max(0, rail.scrollWidth - viewport.clientWidth);
      // Pin for exactly the horizontal travel distance → ~1:1 scroll feel.
      track.style.height = (viewport.offsetHeight + maxShift) + 'px';
      apply();
    }

    function progress() {
      const scrollable = track.offsetHeight - viewport.offsetHeight;
      if (scrollable <= 0) return 0;
      const top = track.getBoundingClientRect().top;
      const p = (stickyTopPx() - top) / scrollable;
      return Math.min(1, Math.max(0, p));
    }

    function apply() {
      const p = progress();
      const x = -p * maxShift;
      rail.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      // Heading lifts straight up and clears frame over the first slice of travel.
      if (heading) {
        const out = Math.min(1, p / 0.16);
        heading.style.setProperty('--wrh-out', out.toFixed(3));
      }
    }

    let ticking = false;
    function update() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; apply(); });
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', layout, { passive: true });
    window.addEventListener('orientationchange', layout, { passive: true });

    // Re-measure once lazy images settle (they change rail.scrollWidth).
    rail.querySelectorAll('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', layout, { once: true });
    });

    layout();
    // A late pass in case fonts/images shift widths after first paint.
    setTimeout(layout, 400);
  }

  function boot() {
    document.querySelectorAll('.work-rail-section').forEach((s) => {
      if (s.__workRailInit) return;
      s.__workRailInit = true;
      initWorkRail(s);
    });
  }

  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();

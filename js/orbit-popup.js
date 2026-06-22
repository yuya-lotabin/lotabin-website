/* ============================================================
   lotabin — Production-flow popup launcher
   ------------------------------------------------------------
   The production-orbit lives inside a fixed, full-screen popup
   (#orbitPop). A floating button (#orbitFab) appears once the
   visitor scrolls past the hero and toggles the popup open.

   The orbit keeps its native scroll-scrub: inside the popup the
   panel itself is the scroll container (see production-orbit.js,
   which binds to .orbit-pop-panel when data-orbit-driver="popup").
   ============================================================ */
(function () {
  'use strict';

  const pop   = document.getElementById('orbitPop');
  const fab   = document.getElementById('orbitFab');
  if (!pop || !fab) return;

  const panel = pop.querySelector('.orbit-pop-panel');
  const host  = pop.querySelector('.lotabin-orbit');
  const hint  = pop.querySelector('#orbitHint');
  let lastFocus = null;

  /* Water-spill reveal: a clip-path circle that grows out of the launcher
     (bottom-right) and spreads across to the top-left corner. Driven via the
     Web Animations API so it runs on the compositor and can't get stuck. */
  const SPILL_ORIGIN = '88% 90%';                       // ~ the floating button
  const SPILL_FROM = 'circle(0% at ' + SPILL_ORIGIN + ')';
  const SPILL_TO   = 'circle(150% at ' + SPILL_ORIGIN + ')';
  let spillAnim = null;
  function setClip(v) { pop.style.clipPath = v; pop.style.webkitClipPath = v; }
  function clearClip() { setClip(''); }

  function isOpen() { return !pop.hidden; }

  /* The scroll cue: visible on open, fades the moment the panel scrolls. */
  function onPanelScroll() {
    if (!hint) return;
    if (panel.scrollTop > 4) {
      hint.classList.add('is-gone');
    }
  }
  if (panel) panel.addEventListener('scroll', onPanelScroll, { passive: true });

  function open() {
    if (isOpen()) return;
    lastFocus = document.activeElement;
    pop.hidden = false;
    pop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    fab.classList.add('is-active');
    fab.setAttribute('aria-expanded', 'true');

    // Water-spill reveal out of the launcher corner.
    if (pop.animate) {
      if (spillAnim) spillAnim.cancel();
      setClip(SPILL_FROM);
      spillAnim = pop.animate(
        [{ clipPath: SPILL_FROM }, { clipPath: SPILL_TO }],
        { duration: 1050, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
      );
      /* Settle to a fully-unclipped popup without the one-frame blink that a
         fill:none animation causes (it would snap back to the inline pinhole
         base before this handler runs). With fill:forwards the reveal is held,
         so we clear the inline clip FIRST, then drop the finished animation —
         the popup never flashes back to circle(0%). */
      const settleOpen = function () {
        clearClip();
        if (spillAnim) { spillAnim.cancel(); spillAnim = null; }
      };
      spillAnim.onfinish = settleOpen;
      spillAnim.oncancel = clearClip;
      setTimeout(settleOpen, 1200); // safety if events are throttled
    }

    // The orbit was sized while display:none — reset its scroll to the
    // start and force a re-measure now that it has real dimensions.
    requestAnimationFrame(function () {
      if (panel) panel.scrollTop = 0;
      if (hint) hint.classList.remove('is-gone');
      window.dispatchEvent(new Event('resize')); // nudges three.js stage + orbit dims
      if (host && host.__orbitUpdate) host.__orbitUpdate();
      const close = pop.querySelector('.orbit-pop-close');
      if (close) close.focus({ preventScroll: true });
    });
  }

  function close() {
    if (!isOpen()) return;
    fab.classList.remove('is-active');
    fab.setAttribute('aria-expanded', 'false');
    if (hint) hint.classList.add('is-gone'); // keep the scroll cue hidden on exit — it's reset on open()

    const finishClose = function () {
      pop.hidden = true;
      pop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      clearClip();
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    };

    // Spill back in toward the launcher corner, then hide.
    if (pop.animate) {
      if (spillAnim) spillAnim.cancel();
      // Start fully visible (SPILL_TO), THEN collapse inward. Setting the
      // collapsed state (SPILL_FROM) up-front would clip the popup to nothing
      // for the play-pending frame before the animation commits — the popup
      // would blink away instead of rippling in. Starting at SPILL_TO matches
      // the current on-screen state, so the reverse ripple is seamless.
      setClip(SPILL_TO);
      spillAnim = pop.animate(
        [{ clipPath: SPILL_TO }, { clipPath: SPILL_FROM }],
        { duration: 600, easing: 'cubic-bezier(0.55, 0, 0.85, 0.4)', fill: 'forwards' }
      );
      spillAnim.onfinish = finishClose;
      spillAnim.oncancel = function () {};
      setTimeout(function () { if (!pop.hidden) finishClose(); }, 700);
    } else {
      finishClose();
    }
  }

  fab.setAttribute('aria-expanded', 'false');
  fab.addEventListener('click', function () { isOpen() ? close() : open(); });
  pop.querySelectorAll('[data-orbit-close]').forEach(function (b) {
    b.addEventListener('click', close);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) close();
  });

  /* Reveal the launcher once the visitor is past the hero. Primary signal is
     an IntersectionObserver on the first post-hero section (works no matter
     which element is the scroll container); a scroll handler is a fallback. */
  function showFab() { fab.classList.add('is-visible'); }
  function hideFab() { fab.classList.remove('is-visible'); }

  const postHero = document.querySelector('.proof-band')
                || document.querySelector('main > section:nth-of-type(2)');
  let ioPast = false;
  if (postHero && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      ioPast = entries[0].isIntersecting || entries[0].boundingClientRect.top < 0;
      ioPast ? showFab() : hideFab();
    }, { threshold: 0, rootMargin: '0px 0px -40% 0px' });
    io.observe(postHero);
  }

  function syncFab() {
    const past = ioPast || window.scrollY > window.innerHeight * 0.6;
    past ? showFab() : hideFab();
  }
  window.addEventListener('scroll', syncFab, { passive: true });
  window.addEventListener('resize', syncFab, { passive: true });
  syncFab();
})();

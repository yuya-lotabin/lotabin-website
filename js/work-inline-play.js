/* ============================================================
   Selected Work reel — INLINE playback.
   Clicking a card plays its video right inside the card's media
   frame (no fullscreen lightbox). Reuses the same data-video
   forms as the Work page (YouTube / Vimeo / direct .mp4).
   ============================================================ */
(() => {
  "use strict";

  function parseEmbed(raw) {
    const url = (raw || "").trim();
    if (!url) return null;
    let m;

    // YouTube
    m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/i);
    if (m) {
      return { type: "embed", src: "https://www.youtube.com/embed/" + m[1] +
        "?autoplay=1&rel=0&modestbranding=1&playsinline=1" };
    }

    // Vimeo — public id, optional private hash, or player URL
    m = url.match(/(?:vimeo\.com\/(?:video\/|channels\/[\w]+\/|groups\/[\w]+\/videos\/)?|player\.vimeo\.com\/video\/)(\d+)(?:\/([0-9a-zA-Z]+))?/i);
    if (m) {
      let hash = m[2] || "";
      const hq = url.match(/[?&]h=([0-9a-zA-Z]+)/i);
      if (hq) hash = hq[1];
      return { type: "embed", src: "https://player.vimeo.com/video/" + m[1] +
        "?autoplay=1&byline=0&portrait=0&title=0&playsinline=1" + (hash ? "&h=" + hash : "") };
    }

    // Direct file
    if (/\.(mp4|webm|ogg|mov)(\?|#|$)/i.test(url)) return { type: "file", src: url };

    return { type: "embed", src: url };
  }

  function playInline(card) {
    if (card.dataset.playing === "1") return;
    const media = card.querySelector(".work-media");
    if (!media) return;

    const embed = parseEmbed(card.getAttribute("data-video"));
    if (!embed) {
      // No film linked yet — show an inline notice instead of navigating away.
      if (media.querySelector(".work-soon")) return;
      const soon = document.createElement("div");
      soon.className = "work-soon";
      soon.innerHTML =
        '<span class="work-soon-k">Coming soon</span>' +
        '<span class="work-soon-t">This film isn\u2019t linked yet.</span>';
      media.appendChild(soon);
      setTimeout(() => soon.remove(), 2600);
      return;
    }

    card.dataset.playing = "1";
    const play = media.querySelector(".work-play");
    if (play) play.remove();

    let node;
    if (embed.type === "file") {
      node = document.createElement("video");
      node.src = embed.src;
      node.controls = true;
      node.autoplay = true;
      node.playsInline = true;
    } else {
      node = document.createElement("iframe");
      node.src = embed.src;
      node.allow = "autoplay; fullscreen; picture-in-picture";
      node.setAttribute("allowfullscreen", "");
      node.setAttribute("frameborder", "0");
    }
    node.className = "work-embed";
    media.appendChild(node);
  }

  function boot() {
    document.querySelectorAll(".work-rail .work-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        e.preventDefault();
        playInline(card);
      });
    });
  }

  if (document.readyState !== "loading") boot();
  else document.addEventListener("DOMContentLoaded", boot);
})();

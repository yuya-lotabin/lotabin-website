/* ============================================================
   lotabin — Work gallery, spherical edition
   ------------------------------------------------------------
   Renders the real .work-card projects on the inside of a sphere
   you look around by dragging (inertia + smoothing). Square cards
   on black, joined by a continuous white grid; the vertical axis
   loops endlessly. Tapping a card opens the existing video
   lightbox (work-lightbox.js) by re-dispatching a click on the
   matching source card. Search filters which projects appear.

   Requires THREE (r128) + the .work-card markup already on page.
   Falls back to the plain grid if WebGL is unavailable.
   ============================================================ */
(function () {
  "use strict";

  const stage = document.getElementById("workStage");
  const canvas = document.getElementById("workSphere");
  const grid = document.querySelector("[data-gallery]");
  if (!stage || !canvas || !grid || !window.THREE) { fallback(); return; }

  function fallback() {
    if (grid) grid.classList.remove("is-sphere-source");
    if (stage) stage.style.display = "none";
  }

  // ---- read the real projects from the DOM ---------------------------------
  function norm(s) { return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
  const cards = Array.prototype.slice.call(grid.querySelectorAll(".work-card"));
  const WORKS = cards.map(function (el) {
    const title = (el.querySelector(".work-title") || {}).textContent || "";
    const tag = (el.querySelector(".work-tag") || {}).textContent || "";
    const client = el.getAttribute("data-client") || "";
    const partner = el.getAttribute("data-partner") || "";
    const imgEl = el.querySelector("img");
    return {
      el: el,
      title: title.trim(), tag: tag.trim(),
      client: client.trim(), partner: partner.trim(),
      img: imgEl ? imgEl.getAttribute("src") : "",
      video: (el.getAttribute("data-video") || "").trim(),
      year: (el.getAttribute("data-work-year") || "").trim(),
      search: norm([title, tag, client, partner].join(" ")),
    };
  });
  if (!WORKS.length) { fallback(); return; }

  // ---- tunables -------------------------------------------------------------
  // The viewer stands INSIDE the tube (the dough) of a TORUS — on the tube's
  // centre circle, NOT in the hole — looking outward at the inner wall. The
  // cards tile the whole tube. Horizontal drag travels along the tube (around
  // the donut); vertical drag rotates the view around the tube cross-section
  // (poloidal). Both are circles, so the scroll WRAPS forever — it never ends,
  // and a tube has no poles so the squares never converge.
  const A = 12.0;                       // major radius (donut size, centre → tube centre)
  const B = 5.4;                        // tube radius (bigger = fatter tube = flatter cross-section wall)
  const NU = 24;                        // cards along the tube (toroidal, wraps) — ÷4 for the block tiling
  const NV = 12;                        // cards around the cross-section (poloidal, wraps)
  const OVERLAP = 1.13;                 // each patch grows past its cell so neighbours overlap → tighter seams between reels
  const FOV = 62;                       // tuned so ~9 reels rest on screen
  const DU = (2 * Math.PI) / NU;        // angular footprint per card, along the tube
  const DV = (2 * Math.PI) / NV;        // angular footprint per card, around the tube

  // ---- renderer / scene -----------------------------------------------------
  let gl;
  try {
    gl = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  } catch (e) { fallback(); return; }
  gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  gl.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const cardGroup = new THREE.Group();   // the whole donut — rotated by drag
  scene.add(cardGroup);
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
  // pinned in the dough facing outward at one section; sits near the centre
  // circle so the portfolio wall reads dense & full (as before the pin change)
  const CAM_R = 11.4;
  camera.position.set(0, 0, -CAM_R);
  camera.lookAt(0, 0, -CAM_R - 10);

  function size() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    gl.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  if (window.ResizeObserver) new ResizeObserver(size).observe(stage);
  window.addEventListener("resize", size);

  // ---- card texture: real thumbnail + black mat + grid + meta ---------------
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function wrapLines(ctx, text, maxW, maxLines) {
    const words = text.split(/\s+/);
    const lines = []; let line = "";
    for (let i = 0; i < words.length; i++) {
      const test = line ? line + " " + words[i] : words[i];
      if (ctx.measureText(test).width > maxW && line) {
        lines.push(line); line = words[i];
        if (lines.length === maxLines - 1) break;
      } else line = test;
    }
    let rest = line;
    if (lines.length === maxLines - 1) {
      // append remaining words to last line, ellipsis if overflow
      const used = lines.join(" ").split(/\s+/).length;
      rest = words.slice(used).join(" ");
      while (rest && ctx.measureText(rest + "…").width > maxW) rest = rest.replace(/\s*\S+$/, "");
      if (rest !== line && words.slice(used).join(" ") !== rest) rest += "…";
    }
    lines.push(rest);
    return lines.slice(0, maxLines);
  }

  // ---- card geometry (shared by static + video compositing) ----------------
  // Phantom-style layout: client top-left, title top-right, category pills
  // bottom-left, year bottom-right, with the media centred in between.
  const SZ = 512, TEXT_M = 36;
  // Media is laid out at the video's NATIVE aspect ratio inside a fixed band —
  // landscape fills the width; square / vertical films keep their true shape
  // (centred on the black mat) instead of being letterboxed into a 16:9 box.
  const MEDIA = { x: TEXT_M, yTop: 82, maxW: SZ - 2 * TEXT_M, maxH: 278 };
  function fitRect(ar) {
    if (!ar || !isFinite(ar)) ar = 16 / 9;
    let w = MEDIA.maxW, h = w / ar;
    if (h > MEDIA.maxH) { h = MEDIA.maxH; w = h * ar; }
    return { x: MEDIA.x + (MEDIA.maxW - w) / 2, y: MEDIA.yTop + (MEDIA.maxH - h) / 2, w: w, h: h };
  }
  const TOP_Y = 58, TITLE_Y = 388, BOT_Y = 452;
  // a direct video file can be drawn as a WebGL texture; an embed (Vimeo /
  // YouTube iframe) cannot, so those keep the static thumbnail.
  function isVideoFile(u) { return /\.(mp4|webm|ogg|mov)(\?|#|$)/i.test(u || ""); }

  // Draw media at its NATIVE aspect ratio, centred inside the region and
  // letterboxed against the black mat (so portrait / non-16:9 films keep their
  // true proportions without the card or its black background changing size).
  function drawContain(ctx, el, dx, dy, dw, dh) {
    ctx.fillStyle = "#07070a"; ctx.fillRect(dx, dy, dw, dh);
    const iw = el.videoWidth || el.naturalWidth || el.width;
    const ih = el.videoHeight || el.naturalHeight || el.height;
    if (!iw || !ih) return;
    const ir = iw / ih, tr = dw / dh;
    let w, h;
    if (ir > tr) { w = dw; h = dw / ir; }   // wider than region → bars top & bottom
    else { h = dh; w = dh * ir; }            // taller/narrower → bars left & right
    ctx.drawImage(el, dx + (dw - w) / 2, dy + (dh - h) / 2, w, h);
  }

  // draw the bottom shade + hairline frame over the thumbnail/video region
  function frameThumb(ctx, R) {
    const sh = ctx.createLinearGradient(0, R.y + R.h - 70, 0, R.y + R.h);
    sh.addColorStop(0, "rgba(7,7,10,0)"); sh.addColorStop(1, "rgba(7,7,10,0.45)");
    ctx.fillStyle = sh; ctx.fillRect(R.x, R.y + R.h - 70, R.w, 70);
    ctx.strokeStyle = "rgba(246,244,239,0.14)"; ctx.lineWidth = 1;
    ctx.strokeRect(R.x + 0.5, R.y + 0.5, R.w - 1, R.h - 1);
  }

  // ellipsis-truncate text to fit a max pixel width with the current font
  function fit(ctx, text, maxW) {
    if (ctx.measureText(text).width <= maxW) return text;
    let t = text;
    while (t && ctx.measureText(t + "…").width > maxW) t = t.slice(0, -1);
    return t + "…";
  }

  // category tags, bottom-left — uniform outlined pills, quiet and consistent
  // (Phantom-style: no filled accent, thin hairline stroke, even height)
  function drawTags(ctx, tags, x, baseY) {
    ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
    ctx.font = "400 12.5px 'JetBrains Mono', monospace";
    if ("letterSpacing" in ctx) ctx.letterSpacing = "1.5px";
    let cx = x;
    tags.slice(0, 3).forEach(function (t) {
      const w = ctx.measureText(t).width + 26;
      roundRect(ctx, cx, baseY - 19, w, 27, 13.5);
      ctx.strokeStyle = "rgba(246,244,239,0.26)"; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = "rgba(246,244,239,0.74)"; ctx.fillText(t, cx + 13, baseY);
      cx += w + 9;
    });
    if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
  }

  // Film-reel sprocket holes down the left & right edges of each card.
  function drawFilmEdges(ctx) {
    const n = 8, holeW = 12, holeH = 16, rad = 4, cxL = 13, cxR = SZ - 13;
    ctx.strokeStyle = "rgba(246,244,239,0.10)"; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(26.5, 0); ctx.lineTo(26.5, SZ);
    ctx.moveTo(SZ - 26.5, 0); ctx.lineTo(SZ - 26.5, SZ);
    ctx.stroke();
    ctx.fillStyle = "rgba(246,244,239,0.20)";
    for (let i = 0; i < n; i++) {
      const cy = (i + 0.5) * (SZ / n);
      roundRect(ctx, cxL - holeW / 2, cy - holeH / 2, holeW, holeH, rad); ctx.fill();
      roundRect(ctx, cxR - holeW / 2, cy - holeH / 2, holeW, holeH, rad); ctx.fill();
    }
  }

  // Static card canvas. skipImage=true leaves the media region empty so a
  // live video frame can be composited over it each tick.
  function makeCardCanvas(work, img, skipImage) {
    const c = document.createElement("canvas");
    c.width = SZ; c.height = SZ;
    const ctx = c.getContext("2d");

    // black mat
    ctx.fillStyle = "#07070a"; ctx.fillRect(0, 0, SZ, SZ);

    // continuous grid: only top + left edges, so abutting cells share lines.
    // Kept fine + faint so the whole sphere reads as a delicate net, not a
    // patchwork of hard squares.
    ctx.strokeStyle = "rgba(246,244,239,0.13)"; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 0.75); ctx.lineTo(SZ, 0.75);
    ctx.moveTo(0.75, 0); ctx.lineTo(0.75, SZ);
    ctx.stroke();

    drawFilmEdges(ctx);

    // media at its native aspect ratio, centred in the band
    const R = work.rect || fitRect(16 / 9);
    if (!skipImage) {
      ctx.save();
      ctx.beginPath(); ctx.rect(R.x, R.y, R.w, R.h); ctx.clip();
      if (img) drawContain(ctx, img, R.x, R.y, R.w, R.h);
      else { ctx.fillStyle = "#1c1c24"; ctx.fillRect(R.x, R.y, R.w, R.h); }
      ctx.restore();
      frameThumb(ctx, R);
    } else {
      ctx.fillStyle = "#101016"; ctx.fillRect(R.x, R.y, R.w, R.h);
    }

    // top-left: client (serif wordmark)   top-right: year (dim mono label)
    ctx.fillStyle = "#f6f4ef"; ctx.textBaseline = "alphabetic";
    ctx.font = "500 22px 'Source Serif 4', Georgia, serif"; ctx.textAlign = "left";
    ctx.fillText(fit(ctx, work.client || "", SZ * 0.6), TEXT_M, TOP_Y);
    if (work.year) {
      ctx.fillStyle = "rgba(246,244,239,0.5)";
      ctx.font = "400 14px 'JetBrains Mono', monospace"; ctx.textAlign = "right";
      if ("letterSpacing" in ctx) ctx.letterSpacing = "1.5px";
      ctx.fillText(work.year, SZ - TEXT_M, TOP_Y);
      if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
    }

    // below media: project title (serif italic — editorial, Phantom-style)
    ctx.fillStyle = "#f6f4ef"; ctx.textAlign = "left";
    ctx.font = "italic 500 23px 'Source Serif 4', Georgia, serif";
    ctx.fillText(fit(ctx, work.title || "", SZ - 2 * TEXT_M), TEXT_M, TITLE_Y);

    // bottom-left: category tags (split the tag on ·)
    const tags = (work.tag || "").split("·").map(function (s) { return s.trim().toUpperCase(); }).filter(Boolean);
    drawTags(ctx, tags, TEXT_M, BOT_Y);
    return c;
  }

  function texOf(canvas) {
    const t = new THREE.CanvasTexture(canvas);
    t.anisotropy = gl.capabilities.getMaxAnisotropy();
    t.minFilter = THREE.LinearFilter;
    return t;
  }

  // ---- preload thumbnails, then build --------------------------------------
  function loadImg(src) {
    return new Promise(function (res) {
      if (!src) { res(null); return; }
      const im = new Image();
      im.crossOrigin = "anonymous";
      im.onload = function () { res(im); };
      im.onerror = function () { res(null); };
      im.src = src;
    });
  }

  // Average colour of a card's thumbnail/poster — used as the hover tint so the
  // box takes on the dominant colour of the video embedded on it. Saturation is
  // boosted a touch so muddy averages still read as a clear hue.
  function avgColor(img) {
    const fallback = [0.46, 0.5, 0.62];
    if (!img) return fallback;
    try {
      const n = 16, cc = document.createElement("canvas");
      cc.width = n; cc.height = n;
      const cx = cc.getContext("2d");
      cx.drawImage(img, 0, 0, n, n);
      const d = cx.getImageData(0, 0, n, n).data;
      let r = 0, g = 0, b = 0, c = 0;
      for (let p = 0; p < d.length; p += 4) { r += d[p]; g += d[p + 1]; b += d[p + 2]; c++; }
      r /= c * 255; g /= c * 255; b /= c * 255;
      const m = (r + g + b) / 3, s = 1.55;
      const cl = function (v) { return Math.max(0, Math.min(1, m + (v - m) * s)); };
      return [cl(r), cl(g), cl(b)];
    } catch (e) { return fallback; }
  }

  const cardTex = new Array(WORKS.length);
  const media = new Array(WORKS.length);   // per-work video record (or {isVideo:false})

  // Exact torus patch in WORLD space spanning [u0±DU/2] × [v0±DV/2] on the tube
  // surface. Because every patch is the real torus surface, the cards tile into
  // one seamless tube with no gaps or convergence. Geometry is static — the
  // camera moves through the dough instead of the cards moving.
  function torusPoint(u, v, out) {
    const r = A + B * Math.cos(v);
    out.set(r * Math.sin(u), B * Math.sin(v), -r * Math.cos(u));
    return out;
  }
  // Canonical card patch: centred at the origin, facing +Z (the inward normal,
  // toward the viewer near the centre), curved to approximate the tube wall —
  // radius A along the tube, radius B around it. Placed + oriented per frame at
  // its (u,v) on the torus so vertical drag can roll the cross-section
  // (poloidal) without ever tilting the ring's hole toward the camera.
  function buildTorusPatchCanonical(seg) {
    const geo = new THREE.BufferGeometry();
    const pos = [], uv = [], idx = [];
    for (let j = 0; j <= seg; j++) {
      const tb = j / seg, b = (tb - 0.5) * DV * OVERLAP;
      const yb = B * Math.sin(b), zb = B * (1 - Math.cos(b));
      for (let i = 0; i <= seg; i++) {
        const ta = i / seg, a = (ta - 0.5) * DU * OVERLAP;
        pos.push(A * Math.sin(a), yb, zb + A * (1 - Math.cos(a)));
        uv.push(ta, tb);
      }
    }
    for (let j = 0; j < seg; j++) for (let i = 0; i < seg; i++) {
      const a = j * (seg + 1) + i, b = a + 1, c = a + seg + 1, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    return geo;
  }
  const cardGeo = buildTorusPatchCanonical(8);
  const cells = [];
  let active = WORKS.map(function (_, i) { return i; });

  // hidden host for the <video> elements that feed the WebGL textures
  const videoHost = document.createElement("div");
  videoHost.setAttribute("aria-hidden", "true");
  videoHost.style.cssText = "position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;";
  document.body.appendChild(videoHost);

  function makeVideo(src) {
    const v = document.createElement("video");
    v.muted = true; v.defaultMuted = true; v.loop = true;
    v.playsInline = true; v.setAttribute("playsinline", ""); v.setAttribute("muted", "");
    v.preload = "auto"; v.crossOrigin = "anonymous";
    v.src = src;
    videoHost.appendChild(v);
    return v;   // the render loop starts/pauses playback based on visibility
  }

  // build the fixed mesh pool (assignment filled by relayout)
  // Each card is drawn with a shader that fades the tile to black per-PIXEL
  // toward the rim of the view (facing = how squarely that point faces the
  // camera). Because the dissolve happens continuously across every card's
  // surface — not per-tile — the cards stop reading as discrete squares: the
  // grid melts into one continuous curved net that feathers into the dark,
  // with no hard tile edges and no sawtooth silhouette at the boundary.
  const CARD_VERT = [
    "varying vec2 vUv;",
    "varying vec3 vView;",
    "void main() {",
    "  vUv = uv;",
    "  vec4 mv = modelViewMatrix * vec4(position, 1.0);",
    "  vView = mv.xyz;",
    "  gl_Position = projectionMatrix * mv;",
    "}"
  ].join("\n");
  const CARD_FRAG = [
    "precision mediump float;",
    "uniform sampler2D map;",
    "uniform float uBright;",
    "uniform float uEdge0;",
    "uniform float uEdge1;",
    "uniform float uVert0;",
    "uniform float uVert1;",
    "uniform vec3 uTint;",
    "uniform float uHover;",
    "varying vec2 vUv;",
    "varying vec3 vView;",
    "void main() {",
    "  vec4 tex = texture2D(map, vUv);",
    "  vec3 n = normalize(vView);",
    "  float facing = -n.z;",                       // 1 = dead-centre, →0 toward rim
    "  float f = smoothstep(uEdge0, uEdge1, facing);",
    "  f *= 1.0 - smoothstep(uVert0, uVert1, abs(n.y));",  // fade rows above/below off-screen so the pole merge never shows
    "  vec3 col = tex.rgb;",
    "  col += uTint * uHover * 0.5;",               // hover: glow in the colour sampled from this card's video
    "  col = mix(col, uTint, uHover * 0.14);",
    "  gl_FragColor = vec4(col * uBright * f, 1.0);",
    "}"
  ].join("\n");

  for (let iv = 0; iv < NV; iv++) {
    const v0 = iv * DV;
    for (let iu = 0; iu < NU; iu++) {
      const u0 = iu * DU;
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          map: { value: null },
          uBright: { value: 1 },
          uEdge0: { value: 0.20 },   // dissolve toward the rim of the view
          uEdge1: { value: 0.66 },
          uVert0: { value: 0.55 },   // soft vignette top & bottom of the tube
          uVert1: { value: 1.10 },
          uTint:  { value: new THREE.Vector3(0.5, 0.55, 0.7) },
          uHover: { value: 0 },
        },
        vertexShader: CARD_VERT,
        fragmentShader: CARD_FRAG,
        side: THREE.DoubleSide,
        transparent: false, depthTest: true, depthWrite: true,
      });
      const mesh = new THREE.Mesh(cardGeo, mat);
      mesh.frustumCulled = true;
      cardGroup.add(mesh);
      cells.push({ mesh: mesh, mat: mat, u0: u0, v0: v0, ci: iu, ri: iv, hover: 0, work: null });
    }
  }

  // Strategic curation: the 12 projects are shuffled into a 4-col × 3-row block
  // that tiles the whole tube. Any screen-sized (≤4×3) window therefore shows 12
  // DISTINCT projects, and identical projects always sit ≥4 columns / 3 rows
  // apart (out past the vignette) — so a viewer never catches a repeat and the
  // catalogue feels far larger than the 12 pieces it actually is.
  function shuffled(n) {
    const a = []; for (let i = 0; i < n; i++) a.push(i);
    for (let i = n - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; const t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function assignCell(cell, wi) {
    cell.wi = wi;
    cell.work = WORKS[wi];
    cell.mat.uniforms.map.value = cardTex[wi] || null;
    const col = WORKS[wi].color;
    if (col) cell.mat.uniforms.uTint.value.set(col[0], col[1], col[2]);
  }
  function relayout() {
    if (!active.length) {
      cells.forEach(function (cell) { cell.work = null; cell.wi = -1; cell.mat.uniforms.map.value = null; });
      return;
    }
    const block = shuffled(12);            // a fresh shuffle each load / filter change
    cells.forEach(function (cell) {
      const slot = (cell.ri % 3) * 4 + (cell.ci % 4);
      assignCell(cell, active[block[slot] % active.length]);
    });
  }

  Promise.all(WORKS.map(function (w) { return loadImg(w.img); })).then(function (imgs) {
    WORKS.forEach(function (w, i) {
      w.color = avgColor(imgs[i]);
      const im = imgs[i];
      w.rect = fitRect(im && im.naturalWidth ? im.naturalWidth / im.naturalHeight : 16 / 9);
      if (isVideoFile(w.video)) {
        // live video card: static base (grid + meta) recomposited with frames
        const live = document.createElement("canvas"); live.width = SZ; live.height = SZ;
        const lctx = live.getContext("2d");
        const tex = texOf(live);
        cardTex[i] = tex;
        const rec = { isVideo: true, video: makeVideo(w.video), base: makeCardCanvas(w, imgs[i], true), lctx: lctx, tex: tex, playing: false };
        lctx.drawImage(rec.base, 0, 0);
        media[i] = rec;
        // once the file reports its real dimensions, relayout the media box to the
        // video's native aspect ratio so vertical / square films keep their shape.
        rec.video.addEventListener("loadedmetadata", function () {
          const vw = rec.video.videoWidth, vh = rec.video.videoHeight;
          if (vw && vh) { w.rect = fitRect(vw / vh); rec.base = makeCardCanvas(w, imgs[i], true); }
        });
      } else {
        cardTex[i] = texOf(makeCardCanvas(w, imgs[i], false));
        media[i] = { isVideo: false };
      }
    });
    relayout();
    size();
    if (window.document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        WORKS.forEach(function (w, i) {
          if (media[i] && media[i].isVideo) { media[i].base = makeCardCanvas(w, imgs[i], true); }
          else { const nt = makeCardCanvas(w, imgs[i], false); cardTex[i].image = nt; cardTex[i].needsUpdate = true; }
        });
      });
    }
    stage.classList.add("is-ready");
  });

  // ---- drag / inertia -------------------------------------------------------
  let targetYaw = 0, targetPitch = 0, curYaw = 0, curPitch = 0;
  let velYaw = 0, velPitch = 0;
  let dragging = false, lastX = 0, lastY = 0, moved = 0, downT = 0;
  // subtle cursor-relative parallax while hovering (eased; zeroed on drag / leave)
  let parX = 0, parY = 0, parTX = 0, parTY = 0;
  const PAR = 0.055;                       // max parallax swing (radians) — gentle drift toward the cursor
  const K = 0.0038;

  // quick zoom-out while the user holds to drag: widen the FOV and open up the
  // vertical band so more of the portfolio is revealed, then snap back on release.
  let zoom = 0, zoomTarget = 0;
  let hov = 0, hovTarget = 0;              // hover: ease the FOV out a touch to reveal ~9 reels
  const FOV_WIDE = 74;
  const FOV_HOVER = 72;                  // hovering the stage widens 62→72 → reveals more of the catalogue past the resting 9
  const VTIGHT0 = 0.50, VTIGHT1 = 0.96;   // cylinder: show several rows, soft-vignette the extremes
  const VOPEN0 = 0.72, VOPEN1 = 1.25;     // opened up while dragging
  const SNAP_V = 0.0026;                   // below this fling speed, begin snapping
  const SNAP_K = 0.09;                     // ease toward the nearest aligned, centred 9-up cell

  function onDown(e) {
    dragging = true; moved = 0; downT = performance.now();
    lastX = e.clientX; lastY = e.clientY; velYaw = velPitch = 0;
    parTX = parTY = 0;                     // drag shouldn't inherit the hover offset
    zoomTarget = 1;
    canvas.style.cursor = "grabbing";
    stage.classList.add("is-grabbed");
    // capture the pointer so we reliably get the release even if it happens
    // off-canvas or the trackpad gesture is reinterpreted by the OS
    try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
  }
  function onMove(e) {
    if (!dragging) { updateHover(e); return; }
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    moved += Math.abs(dx) + Math.abs(dy);
    targetYaw += dx * K;
    targetPitch -= dy * K;
    velYaw = dx * K; velPitch = -dy * K;
    lastX = e.clientX; lastY = e.clientY;
  }
  // single place that always clears the grabbed state
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    canvas.style.cursor = "grab";
    zoomTarget = 0;
    stage.classList.remove("is-grabbed");
  }
  function onUp(e) {
    if (!dragging) return;
    const wasMoved = moved, wasDownT = downT;
    endDrag();
    if (wasMoved < 8 && performance.now() - wasDownT < 350) handleClick(e);
  }
  canvas.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  // a cancelled gesture (trackpad reinterpreted as scroll/zoom, focus lost,
  // etc.) must release the grab just like a normal pointerup
  canvas.addEventListener("pointercancel", endDrag);
  canvas.addEventListener("lostpointercapture", endDrag);
  window.addEventListener("blur", endDrag);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) endDrag();
  });
  canvas.style.cursor = "grab";

  // Hovering the stage eases the view out (62→72 FOV) to reveal more reels past
  // the resting nine, settling back when the pointer leaves. Mouse only — touch
  // has no hover and uses the drag zoom instead.
  stage.addEventListener("pointerenter", function (e) { if (e.pointerType !== "touch") hovTarget = 1; });
  stage.addEventListener("pointerleave", function () { hovTarget = 0; parTX = parTY = 0; });

  // ---- picking --------------------------------------------------------------
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  function setNDC(e) {
    const r = canvas.getBoundingClientRect();
    ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
  }
  let hovered = null;
  const featured = document.getElementById("sphereFeatured");
  function pick(e) {
    setNDC(e);
    ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(cells.filter(function (c) { return c.mesh.visible; }).map(function (c) { return c.mesh; }), false);
    return hits.length ? hits[0].object.userData.cell : null;
  }
  cells.forEach(function (c) { c.mesh.userData.cell = c; });
  function updateHover(e) {
    // drift the view a touch toward the cursor (parallax) while hovering
    const pr = canvas.getBoundingClientRect();
    const nx = ((e.clientX - pr.left) / pr.width) * 2 - 1;
    const ny = ((e.clientY - pr.top) / pr.height) * 2 - 1;
    parTX = nx * PAR; parTY = -ny * PAR;
    const cell = pick(e);
    if (cell === hovered) return;
    hovered = cell;
    canvas.style.cursor = cell ? "pointer" : "grab";
    if (featured) {
      if (cell && cell.work) {
        featured.querySelector(".sf-tag").textContent = cell.work.tag;
        featured.querySelector(".sf-title").textContent = cell.work.title;
        featured.classList.add("show");
      } else featured.classList.remove("show");
    }
  }

  function handleClick(e) {
    const cell = pick(e);
    if (!cell || !cell.work) return;
    cell.work.el.click(); // re-use the existing video lightbox
  }

  // ---- render loop ----------------------------------------------------------
  const _pos = new THREE.Vector3(), _N = new THREE.Vector3();
  const _tU = new THREE.Vector3(), _tV = new THREE.Vector3();
  const _basis = new THREE.Matrix4();
  const _camWorld = new THREE.Vector3(0, 0, -CAM_R);
  function wrap(x, half) { const p = 2 * half; return ((x + half) % p + p) % p - half; }
  function smooth(a, b, x) { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }

  function tick() {
    if (!dragging) {
      targetYaw += velYaw; targetPitch += velPitch;
      velYaw *= 0.965; velPitch *= 0.965;
      if (Math.abs(velYaw) < 1e-5) velYaw = 0;
      if (Math.abs(velPitch) < 1e-5) velPitch = 0;
      // Once a fling has mostly spent itself, ease the grid to the nearest
      // aligned cell so any over-scroll settles back on a centred, framed
      // 9-up view instead of resting on a half-card offset.
      if (Math.abs(velYaw) < SNAP_V && Math.abs(velPitch) < SNAP_V) {
        targetYaw += (Math.round(targetYaw / DU) * DU - targetYaw) * SNAP_K;
        targetPitch += (Math.round(targetPitch / DV) * DV - targetPitch) * SNAP_K;
      }
    }
    curYaw += (targetYaw - curYaw) * 0.055;
    curPitch += (targetPitch - curPitch) * 0.055;

    // quick zoom-out easing → wider FOV + opened vignette while dragging
    zoom += (zoomTarget - zoom) * 0.18;
    hov += (hovTarget - hov) * 0.10;
    const fovBase = FOV + (FOV_HOVER - FOV) * hov;      // hover reveals ~9
    const fov = fovBase + (FOV_WIDE - fovBase) * zoom;  // drag opens further
    if (Math.abs(camera.fov - fov) > 0.02) { camera.fov = fov; camera.updateProjectionMatrix(); }
    const op = Math.max(zoom, hov);                      // open the vertical vignette on hover too
    const uV0 = VTIGHT0 + (VOPEN0 - VTIGHT0) * op;
    const uV1 = VTIGHT1 + (VOPEN1 - VTIGHT1) * op;

    // Pinned camera; the donut spins by scrolling each card's torus angle:
    // horizontal drag (uOff) turns it side-to-side along the ring, vertical drag
    // (vOff) rolls the tube cross-section inward/outward. Both wrap → never ends,
    // and the ring's plane never tilts, so the hole is never exposed.
    parX += (parTX - parX) * 0.06;
    parY += (parTY - parY) * 0.06;
    const uOff = curYaw + parX, vOff = curPitch + parY;

    const hasWork = active.length > 0;
    const vseen = {};   // work indices visible this frame (for video play/pause)
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      if (!cell.work || !hasWork) { cell.mesh.visible = false; continue; }
      const u = cell.u0 + uOff, v = cell.v0 + vOff;
      const su = Math.sin(u), cu = Math.cos(u), sv = Math.sin(v), cvv = Math.cos(v);
      const r = A + B * cvv;
      _pos.set(r * su, B * sv, -r * cu);
      _N.set(-cvv * su, -sv, cvv * cu);                    // inward normal (toward the viewer)
      const dx = _camWorld.x - _pos.x, dy = _camWorld.y - _pos.y, dz = _camWorld.z - _pos.z;
      const dist = Math.max(1e-4, Math.hypot(dx, dy, dz));
      const facing = (dx * _N.x + dy * _N.y + dz * _N.z) / dist;
      const ahead = _camWorld.z - _pos.z;                  // >0 when the card is in front of the camera
      const vis = facing > 0.12 && ahead > 0.2;
      cell.mesh.visible = vis;
      if (!vis) continue;
      if (cell.wi >= 0 && facing > 0.5 && ahead > 2) vseen[cell.wi] = 1;
      _tU.set(cu, 0, su);
      _tV.set(-sv * su, cvv, sv * cu);
      _basis.makeBasis(_tU, _tV, _N);
      cell.mesh.position.copy(_pos);
      cell.mesh.quaternion.setFromRotationMatrix(_basis);
      cell.mat.uniforms.uHover.value = cell.hover;
      cell.mat.uniforms.uVert0.value = uV0;
      cell.mat.uniforms.uVert1.value = uV1;
      const tgt = cell === hovered ? 1 : 0;
      cell.hover += (tgt - cell.hover) * 0.15;
    }

    // composite live video frames once per visible video work; pause the rest
    for (let i = 0; i < media.length; i++) {
      const md = media[i];
      if (!md || !md.isVideo) continue;
      const visible = !!vseen[i];
      if (visible) {
        if (!md.playing) { const p = md.video.play(); if (p && p.catch) p.catch(function () {}); md.playing = true; }
        if (md.video.readyState >= 2) {
          const R = WORKS[i].rect;
          const lc = md.lctx;
          lc.drawImage(md.base, 0, 0);
          lc.save();
          lc.beginPath(); lc.rect(R.x, R.y, R.w, R.h); lc.clip();
          drawContain(lc, md.video, R.x, R.y, R.w, R.h);
          lc.restore();
          frameThumb(lc, R);
          md.tex.needsUpdate = true;
        }
      } else if (md.playing) {
        md.video.pause(); md.playing = false;
      }
    }
    gl.render(scene, camera);
    requestAnimationFrame(tick);
  }
  size();
  tick();

  // ---- public API (search hooks here) --------------------------------------
  window.workSphere = {
    // debug helper: how many card centres currently sit inside the viewport
    count: function () {
      const v = new THREE.Vector3(); let n = 0; const seen = {};
      cells.forEach(function (c) {
        if (!c.mesh.visible) return;
        v.copy(c.mesh.position).project(camera);
        if (v.x >= -1 && v.x <= 1 && v.y >= -1 && v.y <= 1 && v.z < 1) { n++; if (c.wi >= 0) seen[c.wi] = 1; }
      });
      return { onScreen: n, distinct: Object.keys(seen).length };
    },
    filter: function (query) {
      const q = norm((query || "").trim());
      active = WORKS.map(function (_, i) { return i; })
        .filter(function (i) { return !q || WORKS[i].search.indexOf(q) !== -1; });
      relayout();
      stage.classList.toggle("is-empty", active.length === 0);
      return active.length;
    },
  };
})();

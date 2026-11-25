/* ============================================================================
   z3itq3ist // MAXED-OUT APPLICATION ENGINE (app.js)
   100% Complete — All 19 Features + Wilder Chaos Glitch Overdrive
   ============================================================================ */
(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const rand = (min, max) => min + Math.random() * (max - min);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));

  const KEYS = {
    display:       'z3_display_mode_v3',
    sfx:           'z3_sfx_enabled_v3',
    calm:          'z3_calm_mode_v3',
    relics:        'z3_relics_v3',
    kills:         'z3_seraph_kills_v3',
    closedPopups:  'z3_closed_popups_v3',
    closedInline:  'z3_closed_inline_v3',
    lockerPos:     'z3_locker_pos_v3',
    lockerStamps:  'z3_locker_stamps_v3',
    altarState:    'z3_altar_state_v3',
    konamiUnlocked:'z3_konami_unlocked_v3',
    adsClosedCount:'z3_ads_closed_cnt_v3'
  };

  const lsGet = (k, fb = null) => { try { const v = localStorage.getItem(k); return v === null ? fb : v; } catch { return fb; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, String(v)); } catch {} };
  const lsGetJson = (k, fb) => { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : fb; } catch { return fb; } };
  const lsSetJson = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  /* =========================================================================
     0. INJECT EXTRA WILD CHAOS GLITCH STYLES (SELF-CONTAINED)
     ========================================================================= */
  (() => {
    if ($('z3-wild-chaos-css')) return;
    const st = document.createElement('style');
    st.id = 'z3-wild-chaos-css';
    st.textContent = `
      @keyframes z3ScreenShake {
        0%, 100% { transform: translate3d(0,0,0) skewX(0deg); }
        15% { transform: translate3d(-5px, 2px, 0) skewX(-1.4deg); }
        32% { transform: translate3d(6px, -3px, 0) skewX(1.8deg); }
        52% { transform: translate3d(-4px, -2px, 0) skewX(-1.2deg); }
        74% { transform: translate3d(5px, 3px, 0) skewX(1.3deg); }
      }
      @keyframes z3PanelInvertFlash {
        0%, 100% { filter: none; }
        25% { filter: invert(1) hue-rotate(140deg) contrast(1.8) saturate(2.5); }
        55% { filter: hue-rotate(-110deg) contrast(1.6) drop-shadow(-10px 0 0 #ff1f6d) drop-shadow(10px 0 0 #00f0ff); }
      }
      @keyframes z3TearSlide {
        0%   { opacity: .95; transform: translateX(var(--tx0, -24px)) scaleY(1); }
        50%  { opacity: .82; transform: translateX(var(--tx1, 32px)) scaleY(1.3); }
        100% { opacity: 0;   transform: translateX(var(--tx2, -14px)) scaleY(.6); }
      }
      @keyframes z3StaticFlash {
        0%   { opacity: .36; }
        45%  { opacity: .14; }
        100% { opacity: 0; }
      }
      #z3-chaos-tear-layer {
        position: fixed;
        inset: 0;
        z-index: 64;
        pointer-events: none;
        overflow: hidden;
      }
      .z3-tear-bar {
        position: fixed;
        left: -6vw;
        width: 112vw;
        pointer-events: none;
        mix-blend-mode: screen;
        animation: z3TearSlide var(--td, .22s) steps(3, end) forwards;
      }
      .z3-chaos-flash {
        position: fixed;
        inset: 0;
        pointer-events: none;
        mix-blend-mode: hard-light;
        animation: z3StaticFlash .19s steps(3, end) forwards;
      }
      body.overdrive-mode.chaos-shaking > div.relative.z-20 {
        animation: z3ScreenShake .24s steps(3, end) infinite;
      }
      body.overdrive-mode .chaos-invert-spike {
        animation: z3PanelInvertFlash .22s steps(2, end) infinite !important;
      }
      body.overdrive-mode::after {
        content: "";
        position: fixed;
        inset: 0;
        z-index: 63;
        pointer-events: none;
        background:
          repeating-linear-gradient(0deg, rgba(255, 31, 109, .08) 0 2px, transparent 2px 5px, rgba(0, 240, 255, .07) 5px 7px, transparent 7px 11px);
        mix-blend-mode: screen;
      }
    `;
    document.head.appendChild(st);
  })();

  /* =========================================================================
     1. COMPLETE BUILT-IN FALLBACK DATASET (4 VERIFIED PIRATE TV CHANNELS)
     ========================================================================= */
  const FALLBACK_SITE_DATA = {
    schemaVersion: 3,
    siteMeta: {
      siteTitle: 'z3itq3ist // SECTOR 09 CYBER-OCCULT NODE',
      heroTickerTop: 'ᛟ SALVAGED RELAY // SECTOR 09 ONLINE ⛨ WELCOME TO THE WEIRD WEB ☽ NO ALGORITHMS // PURE STATIC & PAGAN HTML ⌖ LONG LIVE INDIE CYBERSPACE ✦',
      heroTickerBottom: "✦ CLICK FLYING SERAPHIMS TO BANISH THEM (7 = ARCH-SERAPH BOSS) ⌖ TYPE 'neofetch' IN TERMINAL ⛨ TRY KONAMI CODE ↑↑↓↓←→←→BA ᛟ"
    },
    integrations: {},
    current: {
      listening: 'Signal Deck // Nocturnal Static',
      reading: 'Salvaged Grimoire Vol. 01',
      watching: 'Pirate TV CH 01 // Dark Synthwave',
      fuel: 'Iced Coffee // 3AM',
      mood: 'Hand-welded cyber-occult node online',
      spotifyEmbed: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXdxcBWuJkbcy?utm_source=generator&theme=0',
      spotifyProfileUrl: 'https://open.spotify.com/',
      spotifyLinerNotes: '3AM raindrive static & post-punk rituals.',
      updatedAt: ''
    },
    operator: {
      badge: 'VERIFIED', avatarUrl: '', alias: 'z3itq3ist', opClass: 'TECHNO-PAGAN',
      sector: 'WASTELAND_09', sigil: 'ᛟ ⛨ ☽ ⌖', gridPct: 78, gridStatus: 'SCRAPPED', occultPct: 92, occultStatus: 'VOLATILE'
    },
    directory: {
      manifestoNote: '',
      manifestoParagraphs: [
        'You have drifted off the sterile corporate highway and tuned into z3itq3ist — a hand-welded digital altar built from salvaged markup, late-night static, esoteric notebooks, and bootleg signals.',
        'No feeds, no engagement bait, no smooth minimalist cages. Everything here is stitched together by hand and archived permanently on GitHub.',
        'Use the Sector Directory to raid my Spotify & grimoire rack, flip Pirate TV channels, pull a 3-Card Tarot spread, light the Digital Altar, rearrange the Cyber-Locker, or leave static in the Blackbox Chat.'
      ],
      ciphers: [
        'ᛟ [DECRYPTED 01/04]: The weird web never died—it just went underground behind rusted firewalls.',
        '☽ [DECRYPTED 02/04]: Banish 7 flying seraphims to summon the Gilded Arch-Seraph Boss.',
        '⛨ [DECRYPTED 03/04]: Try the Konami Code (↑↑↓↓←→←→BA) to unlock the hidden Glitch Vault & 4th synth frequency.',
        '⌖ [DECRYPTED 04/04]: Long live hand-coded HTML, weird shrines, and permanent personal archives.'
      ],
      books: [
        { title: '[PLACEHOLDER BOOK TITLE #1]', author: '[Author Name #1]', format: 'Physical / E-book', status: 'READING', accent: 'acid', cover: 'https://placehold.co/90x132/0b0d0f/39ff14?text=BOOK+01', progressLabel: 'PAGE 184 / 320', progressPct: 58, notes: '[@ 18%] First impressions on the prose.\n[@ 58%] Mid-book reaction.' },
        { title: '[PLACEHOLDER BOOK TITLE #2]', author: '[Author Name #2]', format: 'Essays / Manga', status: 'SIDE READ', accent: 'pink', cover: 'https://placehold.co/90x132/0b0d0f/ff1f6d?text=BOOK+02', progressLabel: 'PAGE 42 / 210', progressPct: 20, notes: '[@ 20%] Highlighted quote or hot take.' }
      ],
      vhs: [
        { type: 'series', title: '[PLACEHOLDER SERIES #1]', year: '2026', status: 'WATCHING', genre: 'Sci-Fi / Psychological', progress: 'S01 E05', rating: '4.5 / 5 ☠', accent: 'pink', notes: 'What hooks you about this show.', quote: 'Placeholder favorite line.' },
        { type: 'movie',  title: '[PLACEHOLDER MOVIE #1]',  year: '1999', status: 'OBSESSED', genre: 'Cult / Cyber-Horror',   progress: '',        rating: '5.0 / 5 ☠', accent: 'acid', notes: 'Why this film permanently rewired your brain.', quote: 'Favorite movie quote.' }
      ],
      tvChannels: [
        { ch: 'CH 01', label: 'MIDNIGHT MIX', title: 'MIDNIGHT TRANSMISSION // DARK SYNTHWAVE', embed: 'https://www.youtube.com/embed/nMGxbYwkOPA?rel=0', note: 'The Last Operator // 3AM dark synthwave transmission.' },
        { ch: 'CH 02', label: 'VHS TOKYO',    title: 'TOKYO NOSTALGIA // VHS VAPORWAVE',      embed: 'https://www.youtube.com/embed/1XAUDIGSQEE?rel=0', note: 'Late-night CRT tape visuals & nocturnal static.' },
        { ch: 'CH 03', label: 'ARCADE RUIN',  title: 'ABANDONED ARCADE AMBIENT SYNTHWAVE',    embed: 'https://www.youtube.com/embed/yXsG4IUxXlo?rel=0', note: 'No one plays here anymore // haunted neon cabinets.' },
        { ch: 'CH 04', label: '80S HORROR',   title: 'LATE NIGHT ARCADE // 80S HORROR VIBES', embed: 'https://www.youtube.com/embed/gH6IzaznZFI?rel=0', note: 'Retro tape station // midnight cassette loop.' }
      ],
      gifs: [
        { slot: 1, label: 'CYBER_SKULL.GIF', url: '' }, { slot: 2, label: 'HEX_STAR.GIF', url: '' },
        { slot: 3, label: 'ORACLE_EYE.GIF',  url: '' }, { slot: 4, label: 'RUST_MOTH.GIF', url: '' },
        { slot: 5, label: 'TRIPLE_MOON.GIF', url: '' }, { slot: 6, label: 'RUNE_CORE.GIF', url: '' }
      ],
      locker: {
        polaroid1Img: 'https://placehold.co/220x200/0b0d0f/39ff14?text=POLAROID+01', polaroid1Cap: '[caption #1 // 2026]',
        polaroid2Img: 'https://placehold.co/220x200/0b0d0f/ff1f6d?text=POLAROID+02', polaroid2Cap: '[late night static]',
        receiptHeader: 'SECTOR 09 BODEGA', receiptItems: '1x ICED COFFEE | $4.04\n2x BLANK VHS | $6.66\n1x RAW HTML | FREE', receiptTotal: 'SOUL_OK',
        zineQuote: 'Drop your favorite unhinged lyric, book quote, or personal motto here.',
        ticketNo: 'NO. 0666', ticketTitle: '[FAVORITE GIG / FILM STUB]', ticketDate: 'DATE: 11/25/2026 // ROW Z'
      },
      relays: {
        substackTitle: '[Latest Substack Essay Title]', substackDate: 'NOV 25, 2026', substackTeaser: 'Teaser of your newest Substack post or newsletter.', substackUrl: 'https://YOUR_SUBSTACK.substack.com',
        igHandle: 'YOUR_INSTAGRAM_HANDLE', igUrl: 'https://instagram.com/YOUR_INSTAGRAM_HANDLE', igBio: 'Darkroom dump, photos & visual chaos.',
        igImg1: 'https://placehold.co/70x70/14080e/ff1f6d?text=01', igImg2: 'https://placehold.co/70x70/0d1112/39ff14?text=02', igImg3: 'https://placehold.co/70x70/081316/00f0ff?text=03',
        ttHandle: 'YOUR_TIKTOK_HANDLE', ttUrl: 'https://tiktok.com/@YOUR_TIKTOK_HANDLE', ttBio: 'Short-form edits, rants & cursed clips.',
        fbHandle: 'YOUR_FACEBOOK_HANDLE', fbUrl: 'https://facebook.com/YOUR_FACEBOOK_HANDLE', fbBio: 'Status dispatches & signal check-ins.',
        deadnetLinks: 'INTERNET ARCHIVE | https://archive.org | RELIC_VAULT\nGIFCITIES | https://gifcities.org | GIF_DUMP'
      }
    },
    inlineAds: [],
    popupAds: [
      { id: 'ad-01', enabled: true, size: 'sm',   theme: 'acid',  win: 'AD_01 // SCRAP_DEAL.EXE',     head: 'SALVAGED CYBER-IMPLANT!!',      copy: 'Edit text, url & img in console.html.',          cta: 'CLICK HERE >>',   url: 'https://example.com/ad-01', img: '' },
      { id: 'ad-02', enabled: true, size: 'wide', theme: 'pink',  win: 'AD_02 // RITUAL_ALERT.BAT',   head: 'SOLAR FLARE IN SECTOR 09!',     copy: 'Wide banner Ad 02 — paste custom GIF.',          cta: 'OPEN LINK ↗',     url: 'https://example.com/ad-02', img: '' },
      { id: 'ad-03', enabled: true, size: 'md',   theme: 'cyan',  win: 'AD_03 // BOOTLEG_TAPE.MP3',   head: '★ PIRATE SYNTH TRANSMISSION ★', copy: 'Link Spotify, Bandcamp, or mixtape here.',       cta: '▶ LISTEN NOW',    url: 'https://example.com/ad-03', img: '' },
      { id: 'ad-04', enabled: true, size: 'tall', theme: 'amber', win: 'AD_04 // PAGAN_ORACLE.SYS',   head: 'DOWNLOAD FORBIDDEN SIGILS',     copy: 'Tall poster ad for vertical GIFs.',              cta: 'ACCESS VAULT >>', url: 'https://example.com/ad-04', img: '' },
      { id: 'ad-05', enabled: true, size: 'xs',   theme: 'pink',  win: 'AD_05 // MSG.DAT',            head: '✉ 1 ENCRYPTED NOTE',            copy: 'Compact secret message pop-up.',                 cta: 'OPEN',            url: 'https://example.com/ad-05', img: '' },
      { id: 'ad-06', enabled: true, size: 'lg',   theme: 'acid',  win: 'AD_06 // WASTELAND_DROP.ZIP', head: 'SECRET UNDERGROUND SHRINE!',    copy: 'Large featured pop-up slot.',                    cta: 'ENTER >>',        url: 'https://example.com/ad-06', img: '' },
      { id: 'ad-07', enabled: true, size: 'md',   theme: 'pink',  win: 'AD_07 // ZINE_STASH.ZIP',     head: 'DISTRESSED ZINES & PATCHES',    copy: 'Point to your shop or Substack.',                cta: 'BROWSE ↗',        url: 'https://example.com/ad-07', img: '' },
      { id: 'ad-08', enabled: true, size: 'wide', theme: 'cyan',  win: 'AD_08 // PIRATE_FM_99.9',     head: '● NIGHTSHIFT OCCULT RADIO',     copy: 'Wide audio/radio broadcast banner.',             cta: 'TUNE IN ↗',       url: 'https://example.com/ad-08', img: '' },
      { id: 'ad-09', enabled: true, size: 'xs',   theme: 'acid',  win: 'AD_09 // RELIC',              head: '★ FREE GIF PACK ★',             copy: 'Tiny promo pop-up slot.',                        cta: 'GRAB .ZIP',       url: 'https://example.com/ad-09', img: '' },
      { id: 'ad-10', enabled: true, size: 'tall', theme: 'pink',  win: 'AD_10 // AFFILIATE',          head: '✦ FRIEND NODE ✦',               copy: 'Shout out a friend indie web shrine.',           cta: 'VISIT SITE ↗',    url: 'https://example.com/ad-10', img: '' },
      { id: 'ad-11', enabled: true, size: 'sm',   theme: 'amber', win: 'AD_11 // RELIC_SCAN',         head: '⌖ ARTIFACT DETECTED',           copy: 'Small wasteland discovery slot.',                cta: 'INSPECT >>',      url: 'https://example.com/ad-11', img: '' },
      { id: 'ad-12', enabled: true, size: 'lg',   theme: 'cyan',  win: 'AD_12 // GALLERY_LEAK',       head: 'NEW CYBER-OCCULT ART UPLOADED', copy: 'Showcase photography or featured videos.',       cta: 'OPEN GALLERY >>', url: 'https://example.com/ad-12', img: '' },
      { id: 'ad-13', enabled: true, size: 'md',   theme: 'acid',  win: 'AD_13 // MYSTERY_PORT',       head: 'UNMARKED BUNKER TERMINAL',      copy: 'Drop a hidden link or rabbit hole.',             cta: 'JACK IN ↗',       url: 'https://example.com/ad-13', img: '' },
      { id: 'ad-14', enabled: true, size: 'wide', theme: 'amber', win: 'AD_14 // SPONSORED',          head: '$$ SCRAP SYNDICATE SUPPLY $$',  copy: 'Wide chaotic ad strip.',                         cta: 'CLAIM ↗',         url: 'https://example.com/ad-14', img: '' },
      { id: 'ad-15', enabled: true, size: 'sm',   theme: 'cyan',  win: 'AD_15 // RADIO_LINK',         head: 'FOLLOW Z3ITQ3IST',              copy: 'Link socials or guestbook here.',                cta: 'CONNECT ↗',       url: 'https://example.com/ad-15', img: '' }
    ],
    archive: [
      {
        id: 'log-init', createdAt: '2026-11-25T00:00:00.000Z', category: 'DISPATCH',
        title: 'SECTOR 09 MAXED-OUT REBUILD ONLINE', tags: ['launch', 'zine', 'github-pages'],
        body: '# WELCOME TO SECTOR 09\n\nAll 19 interactive modules are live on **GitHub Pages**.\n\n> Click any archive entry to read it inside the full **Zine Reader**!\n\n- Banish **7 flying seraphims** to summon the Gilded Arch-Seraph Boss\n- Enter the **Konami Code** (`↑↑↓↓←→←→BA`) to unlock the secret 4th Synth track\n- Light the **Digital Altar** or pull a **3-Card Tarot Spread**'
      }
    ]
  };

  /* Global State */
  let siteData = FALLBACK_SITE_DATA;
  let currentUserId = 'NODE-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  let sfxOn = lsGet(KEYS.sfx, '1') !== '0';
  let calmOn = lsGet(KEYS.calm) === '1' || (lsGet(KEYS.calm) === null && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  let chaosOn = false;
  let seraphKills = Number(lsGet(KEYS.kills, '0')) || 0;
  let adsClosedTotal = Number(lsGet(KEYS.adsClosedCount, '0')) || 0;
  let unlockedRelics = new Set(lsGetJson(KEYS.relics, []));
  let cipherList = [...FALLBACK_SITE_DATA.directory.ciphers];
  let cipherIdx = 0;

  /* =========================================================================
     2. RETRO UI SOUND FOLEY ENGINE (TONE.JS)
     ========================================================================= */
  let foleySynth = null;
  function playSfx(type = 'click') {
    if (!sfxOn || typeof Tone === 'undefined') return;
    try {
      if (Tone.context.state !== 'running') Tone.start().catch(() => {});
      if (!foleySynth) {
        foleySynth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'square' },
          envelope: { attack: 0.005, decay: 0.09, sustain: 0.05, release: 0.14 }
        }).toDestination();
        foleySynth.volume.value = -16;
      }
      const now = Tone.now();
      if (type === 'click')  foleySynth.triggerAttackRelease('C6', '32n', now);
      else if (type === 'tab')    foleySynth.triggerAttackRelease(['E5', 'B5'], '32n', now);
      else if (type === 'zap')    foleySynth.triggerAttackRelease(['G5', 'C#6', 'G6'], '16n', now);
      else if (type === 'tarot')  foleySynth.triggerAttackRelease(['D4', 'A4', 'F5', 'A5'], '8n', now);
      else if (type === 'candle') foleySynth.triggerAttackRelease(['F4', 'C5'], '16n', now);
      else if (type === 'relic')  foleySynth.triggerAttackRelease(['C5', 'E5', 'G5', 'C6'], '8n', now);
      else if (type === 'boss')   foleySynth.triggerAttackRelease(['C3', 'F#3', 'C4'], '4n', now);
      else if (type === 'glitch') {
        const notes = ['C2', 'F#2', 'C#5', 'G#5', 'D#6', 'A#3'];
        foleySynth.triggerAttackRelease(pick(notes), '32n', now);
      } else if (type === 'static') {
        const n = new Tone.Noise('white').toDestination();
        n.volume.value = -22;
        n.start(now); n.stop(now + 0.16);
        setTimeout(() => { try { n.dispose(); } catch {} }, 350);
      }
    } catch {}
  }

  /* =========================================================================
     3. TOAST NOTIFICATIONS & 7-BADGE RELIC ACHIEVEMENTS CASE
     ========================================================================= */
  const RELIC_DEFS = [
    { id: 'seraph_slayer',   icon: '✦', name: 'SERAPH SLAYER',    desc: 'Banish 5 flying chibi seraphims.' },
    { id: 'boss_slayer',     icon: '👑', name: 'ARCH-SERAPH BANE', desc: 'Defeat the 3-HP Gilded Arch-Seraph Boss.' },
    { id: 'chaos_survivor',  icon: '⚡', name: 'CHAOS SURVIVOR',   desc: 'Unleash Wild Chaos Overdrive mode.' },
    { id: 'fortune_seeker',  icon: '☽', name: 'FORTUNE SEEKER',   desc: 'Consult the 22 Major Arcana Tarot deck.' },
    { id: 'ad_exterminator', icon: '⛨', name: 'AD EXTERMINATOR',  desc: 'Permanently close 5 pop-up or inline ads.' },
    { id: 'altar_keeper',    icon: '🕯', name: 'ALTAR KEEPER',     desc: 'Kindle all 3 cyber-candles & incense.' },
    { id: 'root_access',     icon: 'ᛟ', name: 'ROOT ACCESS',      desc: 'Unlock the Konami Glitch Vault or secret CLI.' }
  ];

  function showToast(title, sub = '', accent = '#39ff14') {
    const stack = $('z3-toast-stack');
    if (!stack) return;
    while (stack.children.length >= 4) stack.firstElementChild.remove();
    const t = document.createElement('div');
    t.className = 'z3-toast';
    t.style.borderLeftColor = accent;
    t.innerHTML = `<div class="text-xs font-bold" style="color:${accent}">${esc(title)}</div>${sub ? `<div class="text-[10px] text-bone/85 mt-0.5">${esc(sub)}</div>` : ''}`;
    stack.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => t.remove(), 320); }, 3600);
  }

  function syncRelicsUI() {
    const cnt = unlockedRelics.size;
    const btn = $('btn-relics-open');
    if (btn) { btn.textContent = `🏆 ${cnt}/${RELIC_DEFS.length}`; btn.setAttribute('data-ghost', btn.textContent); }
    const prog = $('relics-progress');
    if (prog) prog.textContent = `UNLOCKED ${cnt} OF ${RELIC_DEFS.length} SECTOR_09 RELICS`;
    const grid = $('relics-grid');
    if (!grid) return;
    grid.innerHTML = RELIC_DEFS.map((r) => {
      const ok = unlockedRelics.has(r.id);
      return `
        <div class="rounded-sm border p-2.5 font-tech ${ok ? 'border-gold bg-gold/10' : 'border-rust/35 bg-void opacity-55'}">
          <div class="flex items-center justify-between text-xs font-bold ${ok ? 'text-gold' : 'text-ash'}">
            <span>${r.icon} ${r.name}</span>
            <span class="text-[9px] ${ok ? 'text-acid' : 'text-ash'}">${ok ? '[UNLOCKED]' : '[LOCKED]'}</span>
          </div>
          <p class="text-[10px] font-typewriter text-bone/80 mt-1">${r.desc}</p>
        </div>
      `;
    }).join('');
  }

  function unlockRelic(id) {
    if (unlockedRelics.has(id)) return;
    const def = RELIC_DEFS.find((r) => r.id === id);
    if (!def) return;
    unlockedRelics.add(id);
    lsSetJson(KEYS.relics, [...unlockedRelics]);
    syncRelicsUI();
    playSfx('relic');
    showToast(`🏆 RELIC UNLOCKED: ${def.name}`, def.desc, '#f5d27a');
  }

  /* =========================================================================
     4. UNIFIED MODAL SYSTEM & BIOS POST BOOT SCREEN
     ========================================================================= */
  let auraInterval = null;
  function setModal(el, show) {
    if (!el) return;
    el.classList.toggle('hidden', !show);
    el.classList.toggle('flex', show);
    if (!show && el === $('aura-modal')) clearInterval(auraInterval);
  }
  function showModal(title, msg) {
    if ($('modal-title')) $('modal-title').textContent = title;
    if ($('modal-body')) $('modal-body').textContent = msg;
    setModal($('cyber-modal'), true);
  }

  $$('.app-modal').forEach((m) => {
    m.addEventListener('click', (e) => {
      if (e.target === m || e.target.closest('[data-close-modal]')) { playSfx('click'); setModal(m, false); }
    });
  });

  $('btn-relics-open')?.addEventListener('click', () => { playSfx('click'); syncRelicsUI(); setModal($('relics-modal'), true); });

  let biosTimer = null;
  function runBiosBoot(force = false) {
    const ov = $('z3-bios-overlay'), log = $('z3-bios-log');
    if (!ov || !log) return;
    if (!force && (calmOn || sessionStorage.getItem('z3_bios_seen'))) return;
    sessionStorage.setItem('z3_bios_seen', '1');
    ov.classList.remove('is-hidden');
    log.textContent = '';
    const lines = [
      'Z3IT_BIOS v09.44 // SALVAGED HARDWARE POST',
      'CHECKING OCCULT RAM............ 666 KB [OK]',
      'MOUNTING PAGAN_FIREWALL........ ACTIVE [OK]',
      'LOADING 22 MAJOR ARCANA........ SYNCED [OK]',
      'INITIALIZING PIRATE_TV 4CH..... LOCKED [OK]',
      '>> WELCOME TO SECTOR 09. ENTERING SHRINE...'
    ];
    let i = 0;
    clearInterval(biosTimer);
    biosTimer = setInterval(() => {
      if (i < lines.length) {
        log.textContent += (i ? '\n' : '') + lines[i++];
      } else {
        clearInterval(biosTimer);
        setTimeout(() => ov.classList.add('is-hidden'), 320);
      }
    }, 240);
  }
  $('btn-bios-skip')?.addEventListener('click', () => { clearInterval(biosTimer); $('z3-bios-overlay')?.classList.add('is-hidden'); });

  /* =========================================================================
     5. TOP BAR CONTROLS: DISPLAY FILTER RACK, SFX, CALM MODE, CLOCK & MOON
     ========================================================================= */
  const DISPLAY_MODES = ['crt', 'phosphor', 'amber', 'clean'];
  let dispIdx = Math.max(0, DISPLAY_MODES.indexOf(lsGet(KEYS.display, 'crt')));
  function applyDisplayMode() {
    const mode = DISPLAY_MODES[dispIdx % DISPLAY_MODES.length];
    document.body.setAttribute('data-display', mode);
    lsSet(KEYS.display, mode);
    const btn = $('btn-display-mode');
    if (btn) { btn.textContent = `DISP: ${mode.toUpperCase()}`; btn.setAttribute('data-ghost', btn.textContent); }
  }
  $('btn-display-mode')?.addEventListener('click', () => { dispIdx = (dispIdx + 1) % DISPLAY_MODES.length; applyDisplayMode(); playSfx('click'); });
  applyDisplayMode();

  function syncSfxUI() {
    const btn = $('btn-sfx-toggle');
    if (!btn) return;
    btn.textContent = sfxOn ? 'SFX: ON' : 'SFX: OFF';
    btn.setAttribute('data-ghost', btn.textContent);
    btn.classList.toggle('bg-gold', sfxOn); btn.classList.toggle('text-void', sfxOn);
    btn.classList.toggle('bg-scrap', !sfxOn); btn.classList.toggle('text-gold', !sfxOn);
  }
  $('btn-sfx-toggle')?.addEventListener('click', () => { sfxOn = !sfxOn; lsSet(KEYS.sfx, sfxOn ? '1' : '0'); syncSfxUI(); if (sfxOn) playSfx('click'); });
  syncSfxUI();

  function syncCalmUI() {
    document.body.classList.toggle('calm-mode', calmOn);
    const btn = $('btn-calm-toggle');
    if (!btn) return;
    btn.textContent = calmOn ? 'CALM: ON' : 'CALM: OFF';
    btn.setAttribute('data-ghost', btn.textContent);
    btn.classList.toggle('bg-rust', calmOn); btn.classList.toggle('text-void', calmOn);
    btn.classList.toggle('bg-scrap', !calmOn); btn.classList.toggle('text-rust', !calmOn);
  }
  $('btn-calm-toggle')?.addEventListener('click', () => { calmOn = !calmOn; lsSet(KEYS.calm, calmOn ? '1' : '0'); syncCalmUI(); playSfx('click'); });
  syncCalmUI();

  function updateClock() {
    const el = $('live-clock');
    if (!el) return;
    const t = new Date().toTimeString().slice(0, 8);
    el.textContent = t;
    if (chaosOn) el.setAttribute('data-ghost', t);
  }
  function updateTelemetry() {
    if ($('stat-res')) $('stat-res').textContent = `${window.innerWidth}x${window.innerHeight}`;
    if ($('stat-tz')) {
      try { $('stat-tz').textContent = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UNKNOWN'; }
      catch { $('stat-tz').textContent = 'UNKNOWN'; }
    }
    if ($('stat-sid')) $('stat-sid').textContent = currentUserId;
  }
  function updateLiveMoonPhase() {
    const el = $('live-lunar-badge');
    if (!el) return;
    const synodic = 29.53058867;
    const diff = (Date.now() - Date.UTC(2000, 0, 6, 18, 14, 0)) / 86400000;
    const f = (((diff % synodic) + synodic) % synodic) / synodic;
    const illum = Math.round(((1 - Math.cos(f * 2 * Math.PI)) / 2) * 100);
    const phases = [
      [.03, '🌑', 'NEW MOON'], [.22, '🌒', 'WAXING CRESCENT'], [.28, '🌓', 'FIRST QUARTER'],
      [.47, '🌔', 'WAXING GIBBOUS'], [.53, '🌕', 'FULL MOON'], [.72, '🌖', 'WANING GIBBOUS'],
      [.78, '🌗', 'LAST QUARTER'], [.97, '🌘', 'WANING CRESCENT'], [1.1, '🌑', 'NEW MOON']
    ];
    const [, icon, label] = phases.find(([max]) => f < max);
    el.textContent = `${icon} ${label} (${illum}%)`;
  }
  updateClock(); setInterval(updateClock, 1000);
  updateTelemetry(); updateLiveMoonPhase();

  /* Hero cursor spotlight */
  const heroShrine = $('hero-shrine');
  heroShrine?.addEventListener('pointermove', (e) => {
    const r = heroShrine.getBoundingClientRect();
    heroShrine.style.setProperty('--hx', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`);
    heroShrine.style.setProperty('--hy', `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`);
  });

  /* =========================================================================
     6. DRAG HELPER, TABS, WINDOW CHROME, WEBRING & SIDEBAR AD ROTATOR
     ========================================================================= */
  function bindDrag(handle, target, onStart, clampFn, onEnd) {
    handle.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button')) return;
      e.preventDefault();
      onStart?.();
      const sx = e.clientX, sy = e.clientY;
      const ox = parseFloat(target.style.left) || 0, oy = parseFloat(target.style.top) || 0;
      const onMove = (ev) => {
        let nx = ox + (ev.clientX - sx), ny = oy + (ev.clientY - sy);
        if (clampFn) [nx, ny] = clampFn(nx, ny);
        target.style.left = `${nx}px`; target.style.top = `${ny}px`;
      };
      const onUp = () => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        onEnd?.();
      };
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    });
  }

  const navBtns = $$('.nav-tab-btn');
  const tabTitles = {
    manifesto: 'C:\\Z3ITQ3IST\\MANIFESTO.TXT',
    media:     'C:\\Z3ITQ3IST\\MEDIA_VAULT\\',
    tv:        'C:\\Z3ITQ3IST\\PIRATE_TV.EXE',
    gifs:      'C:\\Z3ITQ3IST\\ORACLE_ALTAR.SYS',
    locker:    'C:\\Z3ITQ3IST\\CYBER_LOCKER\\',
    webring:   'C:\\Z3ITQ3IST\\SIGNAL_RELAYS.URL'
  };

  function switchTab(target, scrollToIsland = false) {
    const btn = navBtns.find((b) => b.dataset.tab === target);
    if (!btn) return;
    navBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
    $$('.tab-panel').forEach((p) => p.classList.toggle('hidden', p.id !== `tab-${target}`));
    if ($('window-title') && tabTitles[target]) $('window-title').textContent = tabTitles[target];
    playSfx('tab');
    if (target === 'locker') clampLockerItems();
    if (scrollToIsland) ($('main-island-anchor') || document.querySelector('main'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  navBtns.forEach((btn) => btn.addEventListener('click', () => switchTab(btn.dataset.tab, window.innerWidth < 1024)));

  const chromeAlerts = {
    min:   ['⚠ MINIMIZE_DENIED', 'Cannot minimize Sector 09. The shrine refuses to hide in your taskbar.'],
    max:   ['⚠ OVERFLOW_WARNING', 'Already broadcasting at 100% salvaged resolution!'],
    close: ['⚠ TERMINATION_BLOCKED', 'Nice try. You can leave the weird web, but the weird web never leaves you.']
  };
  $$('[data-chrome]').forEach((b) => b.addEventListener('click', () => {
    playSfx('click');
    const [t, m] = chromeAlerts[b.dataset.chrome] || chromeAlerts.close;
    showModal(t, m);
  }));

  /* Copy 88x31 Badge HTML */
  $('btn-copy-badge')?.addEventListener('click', () => {
    const siteUrl = siteData.siteMeta?.siteUrl || location.href;
    const snippet = `<a href="${siteUrl}" target="_blank" rel="noopener"><img src="https://placehold.co/88x31/050607/39ff14?text=z3itq3ist" alt="z3itq3ist" width="88" height="31"></a>`;
    navigator.clipboard?.writeText(snippet).catch(() => {});
    playSfx('relic');
    showToast('◈ 88x31 BADGE COPIED', 'Paste the HTML snippet onto your own shrine!', '#39ff14');
  });

  /* Cipher Decryptor */
  $('btn-decrypt-cipher')?.addEventListener('click', () => {
    playSfx('click');
    const out = $('cipher-output');
    if (!out || !cipherList.length) return;
    const msg = cipherList[cipherIdx++ % cipherList.length];
    const chars = '0123456789ABCDEFᛟ⛨☽⌖▓▒░';
    let step = 0;
    const iv = setInterval(() => {
      if (++step >= 8) { clearInterval(iv); out.textContent = msg; return; }
      out.textContent = msg.split('').map((c, idx) => (idx < (msg.length * step) / 8 || c === ' ' ? c : chars[Math.floor(Math.random() * chars.length)])).join('');
    }, 36);
  });

  /* Webring & Rotating Shady Sidebar Ad */
  const webringNodes = ['Node #08: rust_shrine.github.io', 'Node #09: z3itq3ist (CURRENT)', 'Node #10: pagan_modem.neocities.org', 'Node #11: scrap_oracle.github.io', 'Node #12: deadnet_sigil.org'];
  let webringIdx = 1;
  $$('.webring-btn').forEach((b) => b.addEventListener('click', () => {
    playSfx('click');
    webringIdx = b.dataset.dir === 'prev' ? (webringIdx + webringNodes.length - 1) % webringNodes.length
      : b.dataset.dir === 'next' ? (webringIdx + 1) % webringNodes.length
      : Math.floor(Math.random() * webringNodes.length);
    if ($('webring-status')) $('webring-status').textContent = `Signal locked on ${webringNodes[webringIdx]}`;
  }));

  const sidebarAds = [
    ['FREE SALVAGED RAM!!', 'CLICK TO OVERCLOCK YOUR OCCULT RIG'],
    ['HAUNTED CRT MONITOR', 'ONLY SLIGHTLY RADIOACTIVE • BARTER ONLY'],
    ['LOCAL TECHNO-PAGANS', 'CASTING HEXES 2 KM FROM YOUR NODE'],
    ['RUNE FIRMWARE PATCH', 'FIXES CURSED CSS IN 1 CLICK']
  ];
  let sbAdIdx = 0;
  setInterval(() => {
    const [t, s] = sidebarAds[++sbAdIdx % sidebarAds.length];
    if ($('ad-title')) $('ad-title').textContent = t;
    if ($('ad-sub')) $('ad-sub').textContent = s;
  }, 6200);
  $('shady-ad-box')?.addEventListener('click', () => { playSfx('click'); showModal('$$ RELIC_INTERCEPT', 'No malware here—just authentic salvaged wasteland ad chaos.'); });

  /* =========================================================================
     7. SIGIL RADAR EYE + ALWAYS-ON RUNE CURSOR TRAIL
     ========================================================================= */
  const radarPupil = $('radar-pupil'), radarSvg = $('radar-svg'), radarCoords = $('radar-coords');
  const runeTrailLayer = $('rune-trail-layer');
  const trailRunes = ['ᛟ', '☽', '⌖', '✦', '⛨', 'ᛉ', '0', '1', '†'];
  const trailColors = ['#39ff14', '#ff1f6d', '#00f0ff', '#d48c28', '#f5d27a'];
  let lastTrail = 0, ptrX = 0, ptrY = 0, radarPending = false;

  function spawnRuneParticle(x, y) {
    if (calmOn || !runeTrailLayer) return;
    const cap = window.innerWidth < 768 ? 16 : 30;
    while (runeTrailLayer.children.length >= cap) runeTrailLayer.firstElementChild.remove();
    const s = document.createElement('span');
    s.className = 'rune-trail-particle';
    s.textContent = pick(trailRunes);
    s.style.cssText = `left:${x}px;top:${y}px;font-size:${11 + Math.floor(Math.random() * 8)}px;color:${pick(trailColors)}`;
    runeTrailLayer.appendChild(s);
    setTimeout(() => s.remove(), 700);
  }
  $('btn-trail-status')?.addEventListener('click', () => {
    playSfx('zap');
    const r = $('btn-trail-status').getBoundingClientRect();
    for (let i = 0; i < 12; i++) setTimeout(() => spawnRuneParticle(r.left + r.width / 2 + rand(-55, 55), r.top + r.height / 2 + rand(-18, 44)), i * 24);
  });

  function onPtr(x, y) {
    ptrX = x; ptrY = y;
    if (!radarPending) {
      radarPending = true;
      requestAnimationFrame(() => {
        radarPending = false;
        if (radarCoords) radarCoords.textContent = `CURSOR: ${String(Math.round(ptrX)).padStart(4, '0')} , ${String(Math.round(ptrY)).padStart(4, '0')}`;
        if (radarSvg && radarPupil) {
          const r = radarSvg.getBoundingClientRect();
          const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
          const a = Math.atan2(ptrY - cy, ptrX - cx);
          const d = Math.min(12, Math.hypot(ptrX - cx, ptrY - cy) / 18);
          radarPupil.setAttribute('transform', `translate(${(Math.cos(a) * d).toFixed(1)},${(Math.sin(a) * d * .65).toFixed(1)})`);
        }
      });
    }
    const now = performance.now();
    if (now - lastTrail < (window.innerWidth < 768 ? 60 : 40)) return;
    lastTrail = now;
    spawnRuneParticle(x, y);
  }
  window.addEventListener('mousemove', (e) => onPtr(e.clientX, e.clientY), { passive: true });
  window.addEventListener('touchmove', (e) => { if (e.touches[0]) onPtr(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });

  /* =========================================================================
     8. TONE.JS SIGNAL DECK (3 TRACKS + SECRET 4TH KONAMI TRACK)
     ========================================================================= */
  const eqBarsSpec = [
    ['bg-acid', 85, 0], ['bg-acid', 60, .12], ['bg-cyan', 95, .25], ['bg-cyan', 70, .08],
    ['bg-pink', 100, .32], ['bg-pink', 55, .18], ['bg-rust', 90, .4], ['bg-acid', 75, .15],
    ['bg-pink', 95, .28], ['bg-cyan', 65, .05], ['bg-rust', 85, .35], ['bg-acid', 70, .2]
  ];
  if ($('eq-container')) {
    $('eq-container').innerHTML = eqBarsSpec.map(([c, h, d]) => `<div class="eq-bar w-full ${c}" style="height:${h}%;animation-delay:${d}s"></div>`).join('');
  }

  const trackBtns = $$('.track-btn');
  const trackLabels = { void: 'VOID_DRONE', acid: 'ACID_HEX', static: 'RITUAL_FM', konami: 'KONAMI_HEX' };
  let audioOn = false, currentTrack = 'void', synthNodes = [], audioLoop = null;

  if (lsGet(KEYS.konamiUnlocked) === '1') $('btn-track-konami')?.classList.remove('hidden');

  function disposeAudio() {
    try {
      audioLoop?.stop(); audioLoop?.dispose(); audioLoop = null;
      if (typeof Tone !== 'undefined') { Tone.Transport.stop(); Tone.Transport.cancel(); }
      synthNodes.forEach((n) => { try { n.dispose(); } catch {} });
      synthNodes = [];
    } catch {}
  }

  function startTrack() {
    if (typeof Tone === 'undefined') return showModal('◈ AUDIO_OFFLINE', 'Tone.js audio engine could not be loaded.');
    disposeAudio();
    const reverb = new Tone.Reverb({ decay: 4.8, wet: .5 }).toDestination();
    const gain = new Tone.Gain(.18).connect(reverb);
    synthNodes.push(reverb, gain);

    if (currentTrack === 'void') {
      const flt = new Tone.Filter(580, 'lowpass').connect(gain);
      const syn = new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'sawtooth' }, envelope: { attack: 1.4, decay: 1, sustain: .65, release: 2.8 } }).connect(flt);
      synthNodes.push(flt, syn);
      const chords = [['C2', 'G2', 'D#3'], ['A#1', 'F2', 'D3'], ['G#1', 'D#2', 'C3'], ['G1', 'D2', 'A#2']];
      let step = 0; Tone.Transport.bpm.value = 60;
      audioLoop = new Tone.Loop((t) => syn.triggerAttackRelease(chords[step++ % chords.length], '1n', t), '1m').start(0);
    } else if (currentTrack === 'acid') {
      const flt = new Tone.Filter({ frequency: 920, type: 'lowpass', Q: 8 }).connect(gain);
      const bass = new Tone.MonoSynth({ oscillator: { type: 'square' }, envelope: { attack: .01, decay: .16, sustain: .15, release: .15 } }).connect(flt);
      synthNodes.push(flt, bass);
      const notes = ['C2', 'C2', 'D#2', 'G2', 'A#1', 'C2', 'F2', 'G2'];
      let step = 0; Tone.Transport.bpm.value = 128;
      audioLoop = new Tone.Loop((t) => { flt.frequency.setValueAtTime(520 + ((step * 220) % 1400), t); bass.triggerAttackRelease(notes[step++ % notes.length], '16n', t); }, '8n').start(0);
    } else if (currentTrack === 'konami') {
      const chip = new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'pulse' }, envelope: { attack: .005, decay: .14, sustain: .1, release: .2 } }).connect(gain);
      synthNodes.push(chip);
      const arp = ['E4', 'G4', 'B4', 'E5', 'D5', 'B4', 'A4', 'F#4', 'G4', 'B4', 'D5', 'G5', 'F#5', 'D5', 'C5', 'B4'];
      let step = 0; Tone.Transport.bpm.value = 148;
      audioLoop = new Tone.Loop((t) => chip.triggerAttackRelease(arp[step++ % arp.length], '16n', t), '16n').start(0);
    } else {
      const noise = new Tone.Noise('pink').start();
      const nf = new Tone.Filter(620, 'bandpass').connect(gain);
      noise.connect(nf);
      const chime = new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: .06, decay: .45, sustain: .12, release: 2 } }).connect(gain);
      synthNodes.push(noise, nf, chime);
      const freqs = ['D4', 'A4', 'F4', 'E5', 'C5'];
      Tone.Transport.bpm.value = 84;
      audioLoop = new Tone.Loop((t) => { if (Math.random() < .6) chime.triggerAttackRelease(pick(freqs), '4n', t); }, '2n').start(0);
    }
    Tone.Transport.start();
  }

  function syncAudioUI() {
    if ($('btn-audio-play')) $('btn-audio-play').textContent = audioOn ? '■ CUT TRANSMISSION' : '▶ TRANSMIT SIGNAL';
    if ($('btn-top-audio')) {
      $('btn-top-audio').textContent = audioOn ? `♪ ${trackLabels[currentTrack]}` : '♪ MUTED';
      $('btn-top-audio').setAttribute('data-ghost', $('btn-top-audio').textContent);
    }
    if ($('audio-status-tag')) {
      $('audio-status-tag').textContent = audioOn ? 'LIVE' : 'STANDBY';
      $('audio-status-tag').classList.toggle('text-acid', audioOn);
      $('audio-status-tag').classList.toggle('text-ash', !audioOn);
    }
    $('eq-container')?.classList.toggle('eq-paused', !audioOn);
    document.querySelector('[data-mob-action="synth"]')?.classList.toggle('is-live', audioOn);
  }

  async function toggleAudio(forcePlay = false) {
    try {
      if (!audioOn || forcePlay) {
        if (typeof Tone !== 'undefined') await Tone.start();
        audioOn = true; startTrack();
      } else {
        audioOn = false; disposeAudio();
      }
      syncAudioUI();
    } catch (err) { console.warn('Audio error:', err); }
  }
  $('btn-audio-play')?.addEventListener('click', () => toggleAudio(false));
  $('btn-top-audio')?.addEventListener('click', () => toggleAudio(false));
  trackBtns.forEach((b) => b.addEventListener('click', () => {
    currentTrack = b.dataset.track || 'void';
    trackBtns.forEach((x) => {
      const on = x === b;
      x.classList.toggle('border-cyan', on); x.classList.toggle('bg-cyan/15', on); x.classList.toggle('text-cyan', on); x.classList.toggle('font-bold', on);
      if (!on && x.id !== 'btn-track-konami') { x.classList.add('border-rust/40', 'bg-void', 'text-ash'); }
    });
    if (audioOn) startTrack();
    syncAudioUI();
  }));
  $('btn-konami-track')?.addEventListener('click', () => {
    currentTrack = 'konami';
    $('btn-track-konami')?.classList.remove('hidden');
    setModal($('konami-modal'), false);
    toggleAudio(true);
  });

  /* =========================================================================
     9. CHATTABLE LIVE THEME INJECTION
     ========================================================================= */
  const chatFrame = $('chattable');
  const CHAT_CSS = `#settings,#settingsMenu,#settingsWindow,#account,#shadow{display:none!important;visibility:hidden!important;pointer-events:none!important;}html,body{background:#050607!important;color:#d8d5c8!important;font-family:'Courier Prime','Courier New',monospace!important;font-size:12px;}#top_banner{background:linear-gradient(90deg,#0b0d0b,#1a0b12,#090f0c)!important;border-bottom:1px dashed #39ff14!important;display:flex!important;align-items:center!important;justify-content:center!important;font-size:0!important;color:transparent!important;}#top_banner>*{display:none!important;}#top_banner::after{content:"SEND A MESSAGE";font-family:'Special Elite','Courier New',monospace!important;font-size:12px!important;font-weight:700;letter-spacing:.22em;color:#39ff14!important;text-shadow:0 0 8px rgba(57,255,20,.55);visibility:visible!important;}#background{background:#050607!important;}.allMessages{background:rgba(12,14,15,.96)!important;border:1px solid rgba(212,140,40,.3)!important;border-left:3px solid #00f0ff!important;border-radius:2px;padding:6px 9px;color:#d8d5c8!important;margin:7px 8px;}.sent{background:rgba(10,18,11,.96)!important;border-color:rgba(57,255,20,.45)!important;border-left:3px solid #39ff14!important;}.senderInfo{color:#00f0ff!important;font-weight:700;font-size:11px;}.sent .senderInfo{color:#39ff14!important;}.msgBody{color:#d8d5c8!important;}#input{background:#090b09!important;color:#e8ffe4!important;border:1px solid rgba(57,255,20,.55)!important;border-radius:2px;font-family:'Courier Prime',monospace!important;}#input:empty::before{content:"> etch message into the blackbox (Enter)...";color:#7b827b!important;font-style:italic;}`;
  function initChattable() { try { chatFrame?.contentWindow?.postMessage(CHAT_CSS, '*'); } catch {} }
  chatFrame?.addEventListener('load', () => { initChattable(); setTimeout(initChattable, 650); });

  /* =========================================================================
     10. 22 MAJOR ARCANA TAROT (1-CARD & 3-CARD SPREAD + COPY FOR CHAT)
     ========================================================================= */
  const TAROT_DECK = [
    ['0 // THE FOOL', 'New beginnings, spontaneity, and a leap of faith into static.', 'Recklessness, hesitation, or ignoring warning signs.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#d48c28" stroke-width="1.4"/><circle cx="58" cy="24" r="9" fill="none" stroke="#ffff00" stroke-width="1.6"/><path d="M12,92 L46,92 L58,72 L68,92" fill="none" stroke="#39ff14" stroke-width="1.6"/><circle cx="36" cy="46" r="6" fill="none" stroke="#00f0ff" stroke-width="1.5"/>'],
    ['I // THE MAGICIAN', 'Manifestation, willpower, and turning salvaged scraps into reality.', 'Manipulation, scattered focus, or untapped potential.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#39ff14" stroke-width="1.4"/><line x1="40" y1="26" x2="40" y2="86" stroke="#ff1f6d" stroke-width="2.2"/><polygon points="40,26 48,42 32,42" fill="#ffff00"/><circle cx="24" cy="74" r="5" fill="none" stroke="#00f0ff" stroke-width="1.5"/>'],
    ['II // HIGH PRIESTESS', 'Intuition, sacred knowledge, mystery, and trusting your inner voice.', 'Hidden agendas, ignoring intuition, or secrets surfacing.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#00f0ff" stroke-width="1.4"/><rect x="14" y="20" width="12" height="72" fill="none" stroke="#d8d5c8" stroke-width="1.4"/><rect x="54" y="20" width="12" height="72" fill="none" stroke="#d48c28" stroke-width="1.4"/><circle cx="40" cy="48" r="11" fill="none" stroke="#ff1f6d" stroke-width="1.8"/>'],
    ['III // THE EMPRESS', 'Abundance, fertility, creativity, nurturing, and sensory beauty.', 'Creative block, overindulgence, or neglecting self-care.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#39ff14" stroke-width="1.4"/><circle cx="40" cy="42" r="15" fill="none" stroke="#ff1f6d" stroke-width="2"/><path d="M40,57 V86 M29,72 H51" stroke="#ff1f6d" stroke-width="2"/>'],
    ['IV // THE EMPEROR', 'Authority, structure, stability, discipline, and solid foundations.', 'Rigidity, tyranny, or stubborn control.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#d48c28" stroke-width="1.4"/><polygon points="20,42 28,22 40,34 52,22 60,42" fill="none" stroke="#ff1f6d" stroke-width="2"/><rect x="22" y="48" width="36" height="40" fill="none" stroke="#d48c28" stroke-width="1.8"/>'],
    ['V // THE HIEROPHANT', 'Tradition, spiritual wisdom, mentorship, and shared lore.', 'Rebellion, unconventional paths, and questioning dogma.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#d48c28" stroke-width="1.4"/><path d="M40,16 V90 M26,34 H54 M22,50 H58" stroke="#00f0ff" stroke-width="2"/>'],
    ['VI // THE LOVERS', 'Harmony, deep alignment, love, partnership, and meaningful choices.', 'Disharmony, imbalance, or a difficult crossroads.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#ff1f6d" stroke-width="1.4"/><path d="M40,84 C20,68 16,50 28,44 C34,41 38,46 40,50 C42,46 46,41 52,44 C64,50 60,68 40,84 Z" fill="none" stroke="#ff1f6d" stroke-width="2"/>'],
    ['VII // THE CHARIOT', 'Determination, triumph, momentum, and self-mastery.', 'Lack of direction, stalled progress, or losing control.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#00f0ff" stroke-width="1.4"/><rect x="20" y="34" width="40" height="36" fill="none" stroke="#39ff14" stroke-width="1.8"/><circle cx="24" cy="80" r="9" fill="none" stroke="#d48c28" stroke-width="1.8"/><circle cx="56" cy="80" r="9" fill="none" stroke="#d48c28" stroke-width="1.8"/>'],
    ['VIII // STRENGTH', 'Courage, inner fortitude, compassion, and gentle mastery.', 'Self-doubt, raw emotion, or low battery.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#d48c28" stroke-width="1.4"/><circle cx="40" cy="60" r="20" fill="none" stroke="#d48c28" stroke-width="2" stroke-dasharray="5 3"/><polygon points="40,44 52,70 28,70" fill="none" stroke="#ff1f6d" stroke-width="1.8"/>'],
    ['IX // THE HERMIT', 'Soul-searching, introspection, solitude, and inner illumination.', 'Isolation, loneliness, or avoiding quiet reflection.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#00f0ff" stroke-width="1.4"/><polygon points="40,18 60,54 40,90 20,54" fill="none" stroke="#d48c28" stroke-width="1.6"/><circle cx="40" cy="54" r="6" fill="#ffff00"/>'],
    ['X // WHEEL OF FORTUNE', 'Destiny, turning points, cycles of luck, and fateful shifts.', 'Resistance to change or breaking an old cycle.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#39ff14" stroke-width="1.4"/><circle cx="40" cy="55" r="25" fill="none" stroke="#d48c28" stroke-width="2"/><path d="M40,30 V80 M15,55 H65" stroke="#39ff14" stroke-width="1.5"/>'],
    ['XI // JUSTICE', 'Fairness, truth, clarity, accountability, and karmic balance.', 'Unfairness, bias, or avoiding responsibility.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#00f0ff" stroke-width="1.4"/><line x1="40" y1="18" x2="40" y2="90" stroke="#d8d5c8" stroke-width="2"/><line x1="16" y1="44" x2="64" y2="44" stroke="#d48c28" stroke-width="1.8"/>'],
    ['XII // THE HANGED MAN', 'Surrender, pause, new perspective, and willing insight.', 'Stagnation, indecision, or resisting a needed pause.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#ff1f6d" stroke-width="1.4"/><path d="M16,22 H64 M40,22 V62" stroke="#39ff14" stroke-width="2"/><circle cx="40" cy="76" r="11" fill="none" stroke="#ffff00" stroke-width="1.8"/>'],
    ['XIII // DEATH', 'Transformation, endings, renewal, and shedding what is outgrown.', 'Clinging to the past or delayed transition.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#ff1f6d" stroke-width="1.4"/><circle cx="40" cy="46" r="18" fill="none" stroke="#d8d5c8" stroke-width="1.8"/><circle cx="33" cy="44" r="4" fill="#39ff14"/><circle cx="47" cy="44" r="4" fill="#39ff14"/>'],
    ['XIV // TEMPERANCE', 'Balance, moderation, patience, healing, and alchemy.', 'Imbalance, excess, or clashing frequencies.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#00f0ff" stroke-width="1.4"/><polygon points="40,22 58,54 22,54" fill="none" stroke="#d48c28" stroke-width="1.6"/><polygon points="40,88 58,56 22,56" fill="none" stroke="#00f0ff" stroke-width="1.6"/>'],
    ['XV // THE DEVIL', 'Shadow self, attachment, temptation, or hidden chains.', 'Liberation, breaking chains, and reclaiming power.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#ff1f6d" stroke-width="1.4"/><polygon points="40,88 22,30 62,64 18,64 58,30" fill="none" stroke="#ff1f6d" stroke-width="1.8"/>'],
    ['XVI // THE TOWER', 'Sudden upheaval, revelation, awakening, and collapsing walls.', 'Narrowly avoided disaster or quiet overhaul.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#ff1f6d" stroke-width="1.4"/><rect x="28" y="34" width="24" height="58" fill="none" stroke="#d48c28" stroke-width="1.8"/><polyline points="14,14 38,34 31,39 58,64" fill="none" stroke="#ffff00" stroke-width="2.2"/>'],
    ['XVII // THE STAR', 'Hope, inspiration, serenity, renewal, and guiding light.', 'Creative fatigue, lost faith, or disconnection.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#00f0ff" stroke-width="1.4"/><polygon points="40,18 46,46 68,54 46,62 40,88 34,62 12,54 34,46" fill="none" stroke="#39ff14" stroke-width="1.8"/>'],
    ['XVIII // THE MOON', 'Dreams, the subconscious, illusion, and navigating the night.', 'Clarity emerging, release of fear, or truth revealed.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#d48c28" stroke-width="1.4"/><path d="M48,22 A18,18 0 1,0 48,54 A13,18 0 1,1 48,22 Z" fill="#00f0ff"/>'],
    ['XIX // THE SUN', 'Joy, vitality, warmth, clarity, and radiant success.', 'Temporary clouds, burnout, or delayed celebration.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#ffff00" stroke-width="1.4"/><circle cx="40" cy="54" r="16" fill="none" stroke="#ffff00" stroke-width="2"/><circle cx="40" cy="54" r="5" fill="#39ff14"/>'],
    ['XX // JUDGEMENT', 'Awakening, inner calling, absolution, and rebirth.', 'Self-doubt or ignoring an important signal.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#00f0ff" stroke-width="1.4"/><polygon points="40,18 54,48 26,48" fill="none" stroke="#ffff00" stroke-width="1.8"/><circle cx="40" cy="78" r="7" fill="none" stroke="#ff1f6d" stroke-width="1.8"/>'],
    ['XXI // THE WORLD', 'Completion, wholeness, fulfillment, and cosmic harmony.', 'Unfinished business or standing just shy of closure.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#39ff14" stroke-width="1.4"/><ellipse cx="40" cy="55" rx="22" ry="32" fill="none" stroke="#39ff14" stroke-width="2" stroke-dasharray="6 3"/><polygon points="40,34 52,55 40,76 28,55" fill="none" stroke="#00f0ff" stroke-width="1.8"/>']
  ];

  let tarotMode = 1;
  let lastTarotSummary = '';
  function syncTarotModeBtns() {
    $('btn-tarot-1')?.classList.toggle('border-cyan', tarotMode === 1);
    $('btn-tarot-1')?.classList.toggle('bg-cyan/20', tarotMode === 1);
    $('btn-tarot-1')?.classList.toggle('text-cyan', tarotMode === 1);
    $('btn-tarot-3')?.classList.toggle('border-gold', tarotMode === 3);
    $('btn-tarot-3')?.classList.toggle('bg-gold/20', tarotMode === 3);
    $('btn-tarot-3')?.classList.toggle('text-gold', tarotMode === 3);
  }
  $('btn-tarot-1')?.addEventListener('click', () => { tarotMode = 1; syncTarotModeBtns(); playSfx('click'); });
  $('btn-tarot-3')?.addEventListener('click', () => { tarotMode = 3; syncTarotModeBtns(); playSfx('click'); });

  function pullTarot(count = tarotMode) {
    const stage = $('tarot-spread-stage');
    const pool = [...TAROT_DECK].sort(() => Math.random() - 0.5).slice(0, count);
    const labels = count === 3 ? ['PAST', 'PRESENT', 'SIGNAL'] : ['ORACLE PULL'];
    const lines = [];
    const html = pool.map(([name, up, rev, svg], i) => {
      const isRev = Math.random() < .35;
      const orient = isRev ? 'REVERSED ↺' : 'UPRIGHT ▲';
      const meaning = isRev ? rev : up;
      lines.push(`[${labels[i]}] ${name} (${orient}): ${meaning}`);
      return `
        <div class="tarot-reveal rounded-sm border border-rust/50 bg-scrap p-2.5 flex flex-col items-center text-center gap-2">
          <span class="text-[9px] font-tech text-gold font-bold tracking-widest">${labels[i]}</span>
          <svg viewBox="0 0 80 110" class="w-16 h-22 bg-void border border-acid/45 rounded-sm ${isRev ? 'rotate-180' : ''}">${svg}</svg>
          <div class="font-display text-xs text-acid leading-tight">${esc(name)}</div>
          <span class="text-[9px] font-tech px-1.5 py-0.5 border ${isRev ? 'border-pink/70 text-pink' : 'border-cyan/70 text-cyan'}">${orient}</span>
          <p class="text-[11px] font-typewriter text-bone/85 leading-snug">${esc(meaning)}</p>
        </div>
      `;
    }).join('');
    if (stage) stage.innerHTML = `<div class="grid grid-cols-1 ${count === 3 ? 'sm:grid-cols-3' : 'max-w-xs mx-auto'} gap-2.5">${html}</div>`;
    lastTarotSummary = `✦ z3itq3ist TAROT READING ✦\n${lines.join('\n')}`;
    playSfx('tarot');
    unlockRelic('fortune_seeker');
    return lines.join(' | ');
  }
  $('btn-draw-tarot')?.addEventListener('click', () => pullTarot(tarotMode));
  $('btn-copy-tarot')?.addEventListener('click', () => {
    if (!lastTarotSummary) pullTarot(tarotMode);
    navigator.clipboard?.writeText(lastTarotSummary).catch(() => {});
    playSfx('click');
    showToast('✦ TAROT READING COPIED', 'Paste it directly into Blackbox Chat!', '#00f0ff');
  });

  /* =========================================================================
     11. INTERACTIVE DIGITAL ALTAR (3 CYBER-CANDLES + INCENSE SMOKE)
     ========================================================================= */
  const ALTAR_BLESSINGS = [
    'May your bandwidth stay uncut and your markup stay weird.',
    'Static clears from the wire; a quiet midnight omen watches over this node.',
    'The phosphor burns bright — your salvaged shrine stands immune to algorithms.',
    'Four flames united: Sector 09 blesses your next creative transmission.'
  ];
  const altarState = lsGetJson(KEYS.altarState, { c: [false, false, false], inc: false });

  function syncAltarUI() {
    const candles = $$('.altar-candle');
    candles.forEach((c, idx) => c.classList.toggle('is-lit', Boolean(altarState.c[idx])));
    $('incense-ember')?.classList.toggle('hidden', !altarState.inc);
    const litCnt = altarState.c.filter(Boolean).length + (altarState.inc ? 1 : 0);
    if ($('altar-lit-count')) $('altar-lit-count').textContent = `${litCnt} / 4 LIT`;
    if ($('altar-blessing-text')) {
      $('altar-blessing-text').textContent = litCnt === 0
        ? 'Tap the cyber-candles or incense stick to kindle the altar...'
        : `ᛟ ${ALTAR_BLESSINGS[Math.min(litCnt - 1, ALTAR_BLESSINGS.length - 1)]}`;
    }
    if (litCnt === 4) unlockRelic('altar_keeper');
  }

  $$('.altar-candle').forEach((btn) => btn.addEventListener('click', () => {
    const i = Number(btn.dataset.candle);
    altarState.c[i] = !altarState.c[i];
    lsSetJson(KEYS.altarState, altarState);
    syncAltarUI(); playSfx('candle');
  }));
  $('altar-incense')?.addEventListener('click', () => {
    altarState.inc = !altarState.inc;
    lsSetJson(KEYS.altarState, altarState);
    syncAltarUI(); playSfx('candle');
  });
  syncAltarUI();

  setInterval(() => {
    if (calmOn || document.hidden || !altarState.inc) return;
    const layer = $('altar-smoke-layer');
    if (!layer || $('tab-gifs')?.classList.contains('hidden')) return;
    const g = document.createElement('span');
    g.className = 'altar-smoke-glyph';
    g.textContent = pick(['~', 'ᛟ', '☽', '✦', '░', '·']);
    g.style.left = `${rand(74, 88).toFixed(1)}%`;
    g.style.bottom = '54px';
    g.style.setProperty('--sx', `${rand(-18, 18).toFixed(0)}px`);
    layer.appendChild(g);
    setTimeout(() => g.remove(), 2100);
  }, 550);

  /* =========================================================================
     12. PERSISTENT CYBER-LOCKER + VISITOR RUNE STAMPS
     ========================================================================= */
  const lockerBoard = $('cyber-locker-board');
  const lockerItems = $$('#cyber-locker-board .locker-item');
  let lockerZ = 12;

  function saveLockerPositions() {
    const map = {};
    lockerItems.forEach((it) => { if (it.id) map[it.id] = { l: parseFloat(it.style.left) || 0, t: parseFloat(it.style.top) || 0, z: it.style.zIndex || '5' }; });
    lsSetJson(KEYS.lockerPos, map);
  }
  function clampLockerItems() {
    if (!lockerBoard) return;
    const bw = lockerBoard.clientWidth || 560, bh = lockerBoard.clientHeight || 440;
    lockerItems.forEach((it) => {
      it.style.left = `${Math.min(Math.max(-16, parseFloat(it.style.left) || 0), bw - 60)}px`;
      it.style.top  = `${Math.min(Math.max(-8, parseFloat(it.style.top) || 0), bh - 50)}px`;
    });
  }
  function resetLocker(clearSaved = true) {
    if (!lockerBoard) return;
    if (clearSaved) try { localStorage.removeItem(KEYS.lockerPos); } catch {}
    const bw = lockerBoard.clientWidth || 560, bh = lockerBoard.clientHeight || 440;
    const compact = bw < 460;
    lockerItems.forEach((it, i) => {
      if (compact) {
        it.style.left = `${i % 2 === 0 ? 10 : Math.max(10, Math.round(bw * .51))}px`;
        it.style.top  = `${Math.min(12 + Math.floor(i / 2) * 124, Math.max(8, bh - 110))}px`;
      } else {
        it.style.left = `${Math.min(Math.max(8, Number(it.dataset.initLeft || 16 + i * 30)), Math.max(8, bw - 140))}px`;
        it.style.top  = `${Math.min(Math.max(8, Number(it.dataset.initTop || 16 + i * 24)), Math.max(8, bh - 120))}px`;
      }
      it.style.transform = `rotate(${Number(it.dataset.initRot || 0)}deg)`;
      it.style.zIndex = String(i + 2);
    });
  }
  function restoreLockerPositions() {
    const saved = lsGetJson(KEYS.lockerPos, null);
    resetLocker(false);
    if (!saved) return;
    lockerItems.forEach((it) => {
      const p = saved[it.id];
      if (p) { it.style.left = `${p.l}px`; it.style.top = `${p.t}px`; it.style.zIndex = p.z; }
    });
    clampLockerItems();
  }
  lockerItems.forEach((it) => bindDrag(it, it, () => { it.style.zIndex = String(++lockerZ); }, (x, y) => [
    Math.min(Math.max(-16, x), (lockerBoard?.clientWidth || 560) - 60),
    Math.min(Math.max(-8, y), (lockerBoard?.clientHeight || 440) - 50)
  ], saveLockerPositions));
  $('btn-reset-locker')?.addEventListener('click', () => { playSfx('click'); resetLocker(true); });

  /* Visitor Rune Stamps inside Locker */
  let userStamps = lsGetJson(KEYS.lockerStamps, []);
  function saveUserStamps() { lsSetJson(KEYS.lockerStamps, userStamps); }
  function mountUserStamp(st) {
    if (!lockerBoard) return;
    const el = document.createElement('div');
    el.className = 'locker-user-stamp';
    el.textContent = st.glyph;
    el.style.left = `${st.x}px`; el.style.top = `${st.y}px`; el.style.color = st.color;
    el.style.transform = `rotate(${st.rot}deg)`; el.style.zIndex = String(++lockerZ);
    el.title = 'Drag to move • Double-click to remove';
    el.addEventListener('dblclick', () => {
      userStamps = userStamps.filter((u) => u.id !== st.id);
      saveUserStamps(); el.remove(); playSfx('click');
    });
    bindDrag(el, el, () => { el.style.zIndex = String(++lockerZ); }, (x, y) => [
      Math.min(Math.max(0, x), (lockerBoard.clientWidth || 560) - 36),
      Math.min(Math.max(0, y), (lockerBoard.clientHeight || 440) - 36)
    ], () => { st.x = parseFloat(el.style.left) || 0; st.y = parseFloat(el.style.top) || 0; saveUserStamps(); });
    lockerBoard.appendChild(el);
  }
  $$('.locker-stamp-btn').forEach((b) => b.addEventListener('click', () => {
    const bw = lockerBoard?.clientWidth || 320, bh = lockerBoard?.clientHeight || 380;
    const st = { id: 'st-' + Date.now().toString(36), glyph: b.dataset.stamp || 'ᛟ', x: Math.round(rand(24, Math.max(40, bw - 60))), y: Math.round(rand(24, Math.max(40, bh - 60))), rot: Math.round(rand(-18, 18)), color: pick(trailColors) };
    userStamps.push(st); saveUserStamps(); mountUserStamp(st); playSfx('click');
  }));
  $('btn-clear-locker-stamps')?.addEventListener('click', () => {
    userStamps = []; saveUserStamps();
    $$('.locker-user-stamp', lockerBoard || document).forEach((n) => n.remove());
    playSfx('click');
  });
  restoreLockerPositions();
  userStamps.forEach(mountUserStamp);

  /* =========================================================================
     13. SHADY VISITOR AURA SCANNER
     ========================================================================= */
  const AURA_TITLES = ['LEVEL 4 NEON NECROMANCER', 'ROGUE RADIO SCAVENGER', 'CURSED HTML ARCHIVIST', '3AM CAFFEINE ALCHEMIST', 'CYBER-PAGAN SIGNAL WITCH', 'BOOTLEG VHS SOMMELIER', 'SECTOR 09 GHOST IN THE WIRE'];
  const AURA_NOTES = ['Mild sigil interference detected near your left browser tab.', 'Your cursor emits high levels of nostalgic CRT phosphor.', 'Compatible with z3itq3ist frequency. Do not feed after midnight.', 'Warning: Too cool for modern corporate social feeds.'];
  function runAuraScan() {
    clearInterval(auraInterval);
    setModal($('aura-modal'), true);
    playSfx('click');
    const stream = $('aura-scan-stream');
    if (!stream) return;
    let ticks = 0;
    const hex = () => '0x' + Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
    auraInterval = setInterval(() => {
      if (++ticks < 12) {
        stream.textContent = `>> SCANNING VISITOR SIGIL [${currentUserId}]...\n>> HEX_PROBE: ${hex()} ${hex()} ${hex()}\n>> MEASURING RADIATION & VIBES: ${Math.min(99, ticks * 8)}%`;
        return;
      }
      clearInterval(auraInterval);
      playSfx('relic');
      stream.textContent = `>> SCAN COMPLETE // CLASS ASSIGNED:\n   [ ${pick(AURA_TITLES)} ]\n\n• CAFFEINATED: ${54 + Math.floor(Math.random() * 46)}%\n• HAUNTED: ${12 + Math.floor(Math.random() * 83)}%\n• NODE COMPATIBILITY: ${74 + Math.floor(Math.random() * 26)}%\n• DIAGNOSIS: ${pick(AURA_NOTES)}`;
    }, 150);
  }
  $('btn-aura-scan')?.addEventListener('click', runAuraScan);
  $('aura-rescan-btn')?.addEventListener('click', runAuraScan);

  /* =========================================================================
     14. PERMANENT INLINE ADS + 15 DRAGGABLE POP-UP ADS ENGINE
     ========================================================================= */
  const closedInline = new Set(lsGetJson(KEYS.closedInline, []));
  const closedPopups = new Set(lsGetJson(KEYS.closedPopups, []));
  const openPopups = new Map();
  let livePopupAds = [...FALLBACK_SITE_DATA.popupAds];
  let popZ = 63, popCycleT = null, popBursts = [];

  function trackAdClosed() {
    adsClosedTotal++;
    lsSet(KEYS.adsClosedCount, adsClosedTotal);
    if (adsClosedTotal >= 5) unlockRelic('ad_exterminator');
  }
  function applyInlineDismissals() {
    $$('.dismissible-ad').forEach((el) => {
      const id = el.dataset.dismissAd;
      if (id) el.classList.toggle('hidden', closedInline.has(id) || el.dataset.cmsDisabled === '1');
    });
  }
  $$('[data-close-inline-ad]').forEach((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    const id = btn.dataset.closeInlineAd;
    if (!id) return;
    closedInline.add(id); lsSetJson(KEYS.closedInline, [...closedInline]);
    applyInlineDismissals(); playSfx('click'); trackAdClosed();
  }));

  const POP_THEMES = {
    acid:  { accent: '#39ff14', barBg: '#09160a', glow: 'rgba(57,255,20,.32)' },
    pink:  { accent: '#ff1f6d', barBg: '#1c0811', glow: 'rgba(255,31,109,.35)' },
    cyan:  { accent: '#00f0ff', barBg: '#07171c', glow: 'rgba(0,240,255,.32)' },
    amber: { accent: '#d48c28', barBg: '#1c1308', glow: 'rgba(212,140,40,.35)' }
  };

  function closePopup(id, permanent = false) {
    if (permanent) { closedPopups.add(id); lsSetJson(KEYS.closedPopups, [...closedPopups]); trackAdClosed(); }
    const w = openPopups.get(id);
    if (w && !w.classList.contains('is-closing')) {
      openPopups.delete(id);
      w.classList.add('is-closing');
      setTimeout(() => w.remove(), 190);
    }
    renderAdDirectory();
  }

  function spawnPopupById(id, force = false) {
    const layer = $('z3-ad-popup-layer');
    const ad = livePopupAds.find((a) => a.id === id && a.enabled !== false);
    if (!layer || !ad) return false;
    if (force && closedPopups.has(ad.id)) { closedPopups.delete(ad.id); lsSetJson(KEYS.closedPopups, [...closedPopups]); }
    if (closedPopups.has(ad.id)) return false;
    if (openPopups.has(ad.id)) { openPopups.get(ad.id).style.zIndex = String(popZ = popZ >= 68 ? 63 : popZ + 1); return true; }

    const maxOpen = window.innerWidth < 768 ? 2 : 6;
    while (openPopups.size >= maxOpen) { const first = openPopups.keys().next().value; if (!first) break; closePopup(first, false); }

    const th = POP_THEMES[ad.theme] || POP_THEMES.pink;
    const win = document.createElement('div');
    win.className = `z3-popup-win sz-${ad.size || 'md'}`;
    win.style.setProperty('--z3-accent', th.accent);
    win.style.setProperty('--z3-bar-bg', th.barBg);
    win.style.setProperty('--z3-glow', th.glow);
    win.style.setProperty('--z3-rot', `${rand(-2.2, 2.2).toFixed(1)}deg`);
    win.style.zIndex = String(popZ = popZ >= 68 ? 63 : popZ + 1);

    const bar = document.createElement('div');
    bar.className = 'z3-popup-bar';
    bar.innerHTML = `<span class="truncate">${esc(ad.win)}</span>`;
    const xBtn = document.createElement('button');
    xBtn.type = 'button'; xBtn.className = 'z3-popup-x'; xBtn.textContent = 'X'; xBtn.title = 'Close Permanently';
    xBtn.addEventListener('click', (e) => { e.stopPropagation(); playSfx('click'); closePopup(ad.id, true); });
    bar.appendChild(xBtn);

    const body = document.createElement('a');
    body.className = 'z3-popup-link';
    body.href = ad.url || '#'; body.target = '_blank'; body.rel = 'noopener noreferrer';
    const media = ad.img
      ? `<div class="z3-popup-slot"><img src="${esc(ad.img)}" alt="${esc(ad.head)}" onerror="this.parentElement.textContent='[ ${esc(ad.id.toUpperCase())} ]'"></div>`
      : `<div class="z3-popup-slot">[ ${esc(ad.id.toUpperCase())} GIF SLOT ]</div>`;
    body.innerHTML = `${media}<div class="min-w-0 flex-1"><div class="font-display text-xs mb-1" style="color:${th.accent}">${esc(ad.head)}</div><p class="text-[11px] text-bone/85 leading-snug mb-2">${esc(ad.copy)}</p>${ad.cta ? `<span class="inline-block px-2 py-0.5 text-void font-tech font-bold text-[10px]" style="background:${th.accent}">${esc(ad.cta)}</span>` : ''}</div>`;

    win.append(bar, body);
    const raise = () => { win.style.zIndex = String(popZ = popZ >= 68 ? 63 : popZ + 1); };
    win.addEventListener('pointerdown', raise);
    bindDrag(bar, win, raise);

    win.style.visibility = 'hidden'; win.style.left = '0px'; win.style.top = '0px';
    layer.appendChild(win);
    const r = win.getBoundingClientRect();
    const isMob = window.innerWidth < 768;
    const padX = isMob ? 10 : 14, minY = isMob ? 86 : 60, padB = isMob ? 124 : 66;
    win.style.left = `${Math.round(rand(padX, Math.max(padX, window.innerWidth - r.width - padX)))}px`;
    win.style.top  = `${Math.round(rand(minY, Math.max(minY, window.innerHeight - r.height - padB)))}px`;
    win.style.visibility = 'visible';
    openPopups.set(ad.id, win);
    renderAdDirectory();
    return true;
  }

  function spawnRandomPopup() {
    const avail = livePopupAds.filter((a) => a.enabled !== false && !closedPopups.has(a.id) && !openPopups.has(a.id));
    if (!avail.length) return false;
    return spawnPopupById(pick(avail).id, false);
  }

  function schedulePopups() {
    clearTimeout(popCycleT); popBursts.forEach(clearTimeout); popBursts = [];
    const enabled = livePopupAds.filter((a) => a.enabled !== false);
    if (!enabled.length || enabled.every((a) => closedPopups.has(a.id))) return;
    const delays = window.innerWidth < 768 ? [rand(3200, 14000)] : [rand(1600, 7400), rand(8000, 14000)];
    popBursts = delays.map((ms) => setTimeout(() => { if (!document.hidden && !calmOn) spawnRandomPopup(); }, ms));
    popCycleT = setTimeout(schedulePopups, 16000);
  }

  function renderAdDirectory() {
    const activeList = livePopupAds.filter((a) => a.enabled !== false);
    const unclosed = activeList.filter((a) => !closedPopups.has(a.id)).length;
    if ($('z3-dock-count')) $('z3-dock-count').textContent = `${unclosed}/${activeList.length}`;
    const grid = $('z3-dir-grid');
    if (!grid) return;
    grid.innerHTML = activeList.map((ad) => {
      const th = POP_THEMES[ad.theme] || POP_THEMES.pink;
      const muted = closedPopups.has(ad.id);
      return `
        <div class="rounded-sm border border-rust/40 bg-scrap p-2.5 flex flex-col justify-between gap-2 ${muted ? 'opacity-55' : ''}" style="border-left:4px solid ${th.accent}">
          <div>
            <div class="font-tech text-[10px] font-bold truncate" style="color:${th.accent}">${esc(ad.win)} ${muted ? '[CLOSED]' : ''}</div>
            <div class="font-display text-xs text-bone mt-0.5">${esc(ad.head)}</div>
            <p class="text-[11px] text-ash mt-0.5">${esc(ad.copy)}</p>
          </div>
          <div class="flex gap-1.5 font-tech text-[10px] pt-1 border-t border-rust/25">
            <button type="button" data-launch-ad="${esc(ad.id)}" class="px-2 py-0.5 border border-acid text-acid hover:bg-acid hover:text-void font-bold">${muted ? 'RESTORE & POP' : 'LAUNCH'}</button>
            <a href="${esc(ad.url || '#')}" target="_blank" rel="noopener noreferrer" class="px-2 py-0.5 border border-cyan text-cyan hover:bg-cyan hover:text-void font-bold">LINK ↗</a>
          </div>
        </div>
      `;
    }).join('');
    $$('[data-launch-ad]', grid).forEach((b) => b.addEventListener('click', () => {
      playSfx('click');
      spawnPopupById(b.dataset.launchAd, true);
      $('z3-ad-dir-modal')?.classList.remove('is-open');
    }));
  }

  $('z3-ad-dir-dock')?.addEventListener('click', () => { playSfx('click'); renderAdDirectory(); $('z3-ad-dir-modal')?.classList.add('is-open'); });
  $('z3-dir-close')?.addEventListener('click', () => $('z3-ad-dir-modal')?.classList.remove('is-open'));
  $('z3-ad-dir-modal')?.addEventListener('click', (e) => { if (e.target === $('z3-ad-dir-modal')) $('z3-ad-dir-modal').classList.remove('is-open'); });
  $('z3-btn-spawn-now')?.addEventListener('click', () => { playSfx('click'); spawnRandomPopup(); });
  $('z3-btn-sweep-open')?.addEventListener('click', () => { playSfx('click'); [...openPopups.keys()].forEach((id) => closePopup(id, false)); });
  function resetAllAds() {
    closedInline.clear(); closedPopups.clear();
    try { localStorage.removeItem(KEYS.closedInline); localStorage.removeItem(KEYS.closedPopups); } catch {}
    applyInlineDismissals(); renderAdDirectory(); spawnRandomPopup(); schedulePopups();
  }
  $('z3-btn-restore-all')?.addEventListener('click', () => { playSfx('relic'); resetAllAds(); });

  /* =========================================================================
     15. ZINE READER (MARKDOWN PARSER) & SEARCHABLE ARCHIVE
     ========================================================================= */
  let archiveEntries = [];
  let activeZineIdx = 0;

  function parseZineMarkdown(md) {
    const lines = String(md || '').split('\n');
    let html = '', inList = false;
    const inline = (s) => esc(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-bone">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="text-gold">$1</em>');
    for (const raw of lines) {
      const line = raw.trim();
      if (!line) { if (inList) { html += '</ul>'; inList = false; } continue; }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        if (!inList) { html += '<ul>'; inList = true; }
        html += `<li>${inline(line.slice(2))}</li>`;
      } else {
        if (inList) { html += '</ul>'; inList = false; }
        if (line.startsWith('### ')) html += `<h3>${inline(line.slice(4))}</h3>`;
        else if (line.startsWith('## ')) html += `<h2>${inline(line.slice(3))}</h2>`;
        else if (line.startsWith('# ')) html += `<h1>${inline(line.slice(2))}</h1>`;
        else if (line.startsWith('> ')) html += `<blockquote>${inline(line.slice(2))}</blockquote>`;
        else html += `<p>${inline(line)}</p>`;
      }
    }
    if (inList) html += '</ul>';
    return html || '<p class="text-ash">No body content.</p>';
  }

  function openZineReader(idx) {
    const item = archiveEntries[idx];
    if (!item) return;
    activeZineIdx = idx;
    if ($('zine-cat')) $('zine-cat').textContent = `ᛟ ZINE_READER // ${item.category || 'DISPATCH'}`;
    if ($('zine-date')) $('zine-date').textContent = item.createdAt ? new Date(item.createdAt).toLocaleString() : 'ARCHIVED';
    if ($('zine-title')) $('zine-title').textContent = item.title || 'UNTITLED TRANSMISSION';
    if ($('zine-tags')) $('zine-tags').innerHTML = (item.tags || []).map((t) => `<span class="px-1.5 py-0.5 border border-acid/60 text-acid bg-acid/10">#${esc(t)}</span>`).join('');
    if ($('zine-media')) $('zine-media').innerHTML = item.image ? `<img src="${esc(item.image)}" alt="" class="max-h-64 w-full object-cover rounded-sm border border-rust/50">` : '';
    if ($('zine-body')) $('zine-body').innerHTML = parseZineMarkdown(item.body || '');
    if ($('zine-meta')) $('zine-meta').innerHTML = item.link ? `<a href="${esc(item.link)}" target="_blank" rel="noopener noreferrer" class="text-cyan hover:underline">↗ ATTACHED LINK: ${esc(item.link)}</a>` : 'ᛟ PERMANENT GITHUB ARCHIVE RECORD';
    if ($('zine-prev-btn')) $('zine-prev-btn').disabled = idx <= 0;
    if ($('zine-next-btn')) $('zine-next-btn').disabled = idx >= archiveEntries.length - 1;
    setModal($('zine-reader-modal'), true);
    playSfx('tab');
  }
  $('zine-prev-btn')?.addEventListener('click', () => { if (activeZineIdx > 0) openZineReader(activeZineIdx - 1); });
  $('zine-next-btn')?.addEventListener('click', () => { if (activeZineIdx < archiveEntries.length - 1) openZineReader(activeZineIdx + 1); });

  function renderArchiveBox(entries) {
    archiveEntries = Array.isArray(entries) ? entries : [];
    const wrap = $('z3-github-archive-box');
    if (!wrap) return;
    let filter = 'ALL', limit = 6, query = '';
    const CAT_CLS = {
      STATUS: 'border-acid text-acid bg-acid/10', DISPATCH: 'border-cyan text-cyan bg-cyan/10',
      DIRECTORY: 'border-cyan text-cyan bg-cyan/10', ADS_15: 'border-pink text-pink bg-pink/10',
      INLINE_5: 'border-gold text-gold bg-gold/10', OPERATOR: 'border-rust text-rust bg-rust/10',
      BOOK_NOTE: 'border-rust text-rust bg-rust/10', VHS_LOG: 'border-pink text-pink bg-pink/10',
      MUSIC: 'border-acid text-acid bg-acid/10', RELIC: 'border-gold text-gold bg-gold/10'
    };

    function draw() {
      const filtered = archiveEntries.map((item, origIdx) => ({ item, origIdx })).filter(({ item }) => {
        const catOk = filter === 'ALL' || (item.category || 'DISPATCH') === filter;
        const q = query.trim().toLowerCase();
        const txtOk = !q || `${item.title || ''} ${item.body || ''} ${(item.tags || []).join(' ')}`.toLowerCase().includes(q);
        return catOk && txtOk;
      });
      const shown = filtered.slice(0, limit);
      const listHtml = shown.length ? shown.map(({ item, origIdx }) => {
        const cat = item.category || 'DISPATCH';
        const dt = item.createdAt ? new Date(item.createdAt).toLocaleDateString([], { year: 'numeric', month: 'short', day: '2-digit' }) : '';
        const preview = String(item.body || '').replace(/[#>*`]/g, '').slice(0, 140);
        return `
          <article data-open-zine="${origIdx}" class="cursor-pointer rounded-sm border border-rust/35 border-l-2 border-l-cyan bg-scrap/95 hover:border-cyan p-2.5 space-y-1 transition">
            <div class="flex items-center justify-between gap-1.5 font-tech text-[10px]">
              <span class="px-1.5 py-0.5 border ${CAT_CLS[cat] || CAT_CLS.DISPATCH} font-bold">${esc(cat)}</span>
              <span class="text-ash">${esc(dt)} • <span class="text-gold">READ ↗</span></span>
            </div>
            ${item.title ? `<h4 class="font-display text-xs sm:text-sm text-bone tracking-wide">${esc(item.title)}</h4>` : ''}
            ${preview ? `<p class="text-[11px] text-bone/75 font-typewriter line-clamp-2">${esc(preview)}${(item.body || '').length > 140 ? '...' : ''}</p>` : ''}
          </article>
        `;
      }).join('') : `<div class="text-center py-4 text-xs font-tech text-ash">No archived transmissions match this filter.</div>`;

      wrap.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-rust/35 pb-2 font-tech">
          <span class="text-cyan font-bold text-xs tracking-widest">ᛟ ZINE &amp; UPDATE ARCHIVE // ${archiveEntries.length}</span>
          <input id="z3-arch-search" type="text" value="${esc(query)}" placeholder="search archive..." class="bg-scrap border border-rust/45 focus:border-cyan focus:outline-none rounded-sm px-2 py-0.5 text-[11px] text-bone w-40">
        </div>
        <div class="flex flex-wrap gap-1 font-tech text-[10px]">
          ${['ALL', 'DISPATCH', 'STATUS', 'DIRECTORY', 'ADS_15', 'OPERATOR', 'BOOK_NOTE', 'VHS_LOG'].map((c) => `
            <button type="button" data-arch-cat="${c}" class="px-2 py-0.5 rounded-sm border ${filter === c ? 'border-acid bg-acid/20 text-acid font-bold' : 'border-rust/40 bg-scrap text-ash hover:text-bone'}">${c}</button>
          `).join('')}
        </div>
        <div class="space-y-2 max-h-96 overflow-y-auto pr-1">${listHtml}</div>
        ${filtered.length > limit ? `<button id="z3-arch-more" type="button" class="w-full py-1.5 rounded-sm border border-cyan/60 bg-cyan/10 text-cyan hover:bg-cyan hover:text-void font-tech text-[10px] font-bold tracking-widest">[ LOAD MORE (${filtered.length - limit} REMAINING) ]</button>` : ''}
      `;
      $$('[data-arch-cat]', wrap).forEach((b) => b.addEventListener('click', () => { filter = b.dataset.archCat; limit = 6; draw(); }));
      $$('[data-open-zine]', wrap).forEach((a) => a.addEventListener('click', () => openZineReader(Number(a.dataset.openZine))));
      const sEl = wrap.querySelector('#z3-arch-search');
      if (sEl) {
        sEl.addEventListener('input', (e) => { query = e.target.value; limit = 6; draw(); });
        if (query) { sEl.focus(); sEl.setSelectionRange(query.length, query.length); }
      }
      wrap.querySelector('#z3-arch-more')?.addEventListener('click', () => { limit += 8; draw(); });
    }
    draw();
  }

  /* =========================================================================
     16. HYDRATE ALL PORTALS FROM updates.json (+ LAST.FM & GISCUS)
     ========================================================================= */
  const BUILTIN_RELIC_SVGS = [
    `<svg viewBox="0 0 64 64" class="w-14 h-14 anim-gif-glitch"><circle cx="32" cy="32" r="28" fill="none" stroke="#39ff14" stroke-width="1.5" stroke-dasharray="4 3"/><path d="M18,28 C18,16 46,16 46,28 C46,36 41,40 41,46 H23 C23,40 18,36 18,28 Z" fill="#131618" stroke="#d8d5c8" stroke-width="1.6"/><circle cx="26" cy="29" r="3.5" fill="#39ff14"/><rect x="34" y="26" width="7" height="6" fill="#ff1f6d"/></svg>`,
    `<svg viewBox="0 0 64 64" class="w-14 h-14 anim-gif-spin"><polygon points="32,6 54,48 10,48" fill="none" stroke="#ff1f6d" stroke-width="1.8"/><polygon points="32,58 54,16 10,16" fill="none" stroke="#00f0ff" stroke-width="1.8"/><circle cx="32" cy="32" r="6" fill="#39ff14"/></svg>`,
    `<svg viewBox="0 0 64 64" class="w-14 h-14 anim-eye-blink"><path d="M8,32 Q32,12 56,32 Q32,52 8,32 Z" fill="#0b0d0f" stroke="#00f0ff" stroke-width="2"/><circle cx="32" cy="32" r="9" fill="#ff1f6d"/><circle cx="32" cy="32" r="4" fill="#050607"/></svg>`,
    `<svg viewBox="0 0 64 64" class="w-14 h-14 anim-gif-bounce"><path d="M32,18 C16,8 6,22 14,34 C18,40 26,38 32,34 C38,38 46,40 50,34 C58,22 48,8 32,18 Z" fill="none" stroke="#d48c28" stroke-width="2"/><line x1="32" y1="14" x2="32" y2="52" stroke="#39ff14" stroke-width="2.2"/><circle cx="20" cy="26" r="3" fill="#ff1f6d"/><circle cx="44" cy="26" r="3" fill="#ff1f6d"/></svg>`,
    `<svg viewBox="0 0 64 64" class="w-14 h-14"><circle cx="32" cy="32" r="11" fill="none" stroke="#f5d27a" stroke-width="2"/><path d="M16,20 A12,12 0 0,0 16,44 A8,12 0 0,1 16,20 Z" fill="#00f0ff"/><path d="M48,20 A12,12 0 0,1 48,44 A8,12 0 0,0 48,20 Z" fill="#ff1f6d"/></svg>`,
    `<svg viewBox="0 0 64 64" class="w-14 h-14"><rect x="10" y="10" width="44" height="44" fill="none" stroke="#39ff14" stroke-width="1.6" stroke-dasharray="6 3"/><text x="32" y="42" text-anchor="middle" fill="#39ff14" font-family="monospace" font-size="30" font-weight="bold">ᛟ</text></svg>`
  ];

  function spawnStickerFromHtml(innerHtml) {
    const layer = $('sticker-layer');
    if (!layer) return;
    while (layer.children.length >= 24) layer.firstElementChild.remove();
    const wrap = document.createElement('div');
    wrap.className = 'fixed pointer-events-auto cursor-pointer select-none p-1.5 rounded-sm border border-acid/60 bg-void/90 shadow-[0_0_16px_rgba(57,255,20,.3)] transition-transform hover:scale-125';
    wrap.title = 'Click sticker to dismiss';
    wrap.style.cssText = `left:${rand(6, 84)}vw;top:${rand(12, 82)}vh;transform:rotate(${rand(-20, 20).toFixed(1)}deg)`;
    wrap.innerHTML = innerHtml;
    wrap.addEventListener('click', () => { playSfx('click'); wrap.remove(); });
    layer.appendChild(wrap);
    playSfx('zap');
  }
  $('btn-clear-stickers')?.addEventListener('click', () => { if ($('sticker-layer')) $('sticker-layer').innerHTML = ''; playSfx('click'); });

  function hydrateLastFm(integ, cur) {
    if (!integ?.lastfmUser || !integ?.lastfmApiKey) return;
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(integ.lastfmUser)}&api_key=${encodeURIComponent(integ.lastfmApiKey)}&format=json&limit=1`;
    fetch(url).then((r) => (r.ok ? r.json() : null)).then((d) => {
      const tr = d?.recenttracks?.track?.[0];
      if (!tr) return;
      const nowPlaying = tr['@attr']?.nowplaying === 'true';
      const label = `${tr.artist?.['#text'] || ''} - ${tr.name || ''}${nowPlaying ? ' [SCROBBLING NOW ●]' : ''}`;
      const el = $('cur-listen-val');
      if (el && label.trim()) el.textContent = label;
    }).catch(() => {});
  }

  function hydrateGiscus(integ) {
    const mount = $('giscus-mount');
    if (!mount || !integ?.giscusRepo || !integ?.giscusRepoId || !integ?.giscusCategoryId) return;
    if (mount.dataset.loaded) return;
    mount.dataset.loaded = '1';
    mount.innerHTML = '';
    const s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    s.async = true; s.crossOrigin = 'anonymous';
    s.dataset.repo = integ.giscusRepo;
    s.dataset.repoId = integ.giscusRepoId;
    s.dataset.category = integ.giscusCategory || 'General';
    s.dataset.categoryId = integ.giscusCategoryId;
    s.dataset.mapping = 'pathname';
    s.dataset.reactionsEnabled = '1';
    s.dataset.theme = 'dark_high_contrast';
    mount.appendChild(s);
  }

  function applySiteData(raw, isFallback = false) {
    const d = {
      ...FALLBACK_SITE_DATA,
      ...(raw || {}),
      siteMeta:     { ...FALLBACK_SITE_DATA.siteMeta, ...(raw?.siteMeta || {}) },
      integrations: { ...FALLBACK_SITE_DATA.integrations, ...(raw?.integrations || {}) },
      current:      { ...FALLBACK_SITE_DATA.current, ...(raw?.current || {}) },
      operator:     { ...FALLBACK_SITE_DATA.operator, ...(raw?.operator || {}) },
      directory:    {
        ...FALLBACK_SITE_DATA.directory,
        ...(raw?.directory || {}),
        locker: { ...FALLBACK_SITE_DATA.directory.locker, ...(raw?.directory?.locker || {}) },
        relays: { ...FALLBACK_SITE_DATA.directory.relays, ...(raw?.directory?.relays || {}) }
      }
    };
    if (!Array.isArray(d.directory.tvChannels) || !d.directory.tvChannels.length) d.directory.tvChannels = FALLBACK_SITE_DATA.directory.tvChannels;
    if (!Array.isArray(d.directory.books) || !d.directory.books.length) d.directory.books = FALLBACK_SITE_DATA.directory.books;
    if (!Array.isArray(d.directory.vhs) || !d.directory.vhs.length) d.directory.vhs = FALLBACK_SITE_DATA.directory.vhs;
    if (!Array.isArray(d.directory.gifs) || !d.directory.gifs.length) d.directory.gifs = FALLBACK_SITE_DATA.directory.gifs;
    if (!Array.isArray(d.popupAds) || !d.popupAds.length) d.popupAds = FALLBACK_SITE_DATA.popupAds;
    if (!Array.isArray(d.archive) || !d.archive.length) d.archive = FALLBACK_SITE_DATA.archive;
    siteData = d;

    /* 1. Site Meta & Tickers */
    if (d.siteMeta.siteTitle) document.title = d.siteMeta.siteTitle;
    if (d.siteMeta.heroTickerTop && $('hero-ticker-top')) {
      const t = esc(d.siteMeta.heroTickerTop);
      $('hero-ticker-top').innerHTML = `<span>${t}</span><span>${t}</span>`;
    }
    if (d.siteMeta.heroTickerBottom && $('hero-ticker-bottom')) {
      const t = esc(d.siteMeta.heroTickerBottom);
      $('hero-ticker-bottom').innerHTML = `<span>${t}</span><span>${t}</span>`;
    }

    /* 2. Currently Status Box + Last.fm */
    const cur = d.current;
    if ($('currently-status-box')) {
      const upd = cur.updatedAt ? new Date(cur.updatedAt).toLocaleDateString([], { year: 'numeric', month: 'short', day: '2-digit' }) : (isFallback ? 'FALLBACK MODE' : 'LIVE');
      $('currently-status-box').innerHTML = `
        <div class="flex items-center justify-between border-b border-rust/30 pb-1 font-tech text-[10px]">
          <span class="text-acid font-bold tracking-widest">● CURRENTLY_LOG // ${isFallback ? 'LOCAL FALLBACK' : 'GITHUB PAGES LIVE'}</span>
          <span class="text-ash">UPDATED: ${esc(upd)}</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] font-typewriter">
          <div><span class="text-cyan font-tech font-bold">♪ LISTENING:</span> <span id="cur-listen-val" class="text-bone">${esc(cur.listening || '---')}</span></div>
          <div><span class="text-rust font-tech font-bold">⛨ READING:</span> <span class="text-bone">${esc(cur.reading || '---')}</span></div>
          <div><span class="text-pink font-tech font-bold">▣ WATCHING:</span> <span class="text-bone">${esc(cur.watching || '---')}</span></div>
          <div><span class="text-acid font-tech font-bold">☕ FUEL:</span> <span class="text-bone">${esc(cur.fuel || '---')}</span></div>
          <div class="sm:col-span-2"><span class="text-bone/70 font-tech font-bold">☽ MOOD:</span> <span class="text-acid italic">"${esc(cur.mood || 'signal active')}"</span></div>
        </div>
      `;
    }
    hydrateLastFm(d.integrations, cur);

    /* 3. Manifesto Pinned Note, Paragraphs & Ciphers */
    const pin = $('z3-manifesto-pinned-note');
    if (pin) {
      if (d.directory.manifestoNote) {
        pin.classList.remove('hidden');
        pin.innerHTML = `<span class="text-pink font-tech font-bold">⛨ PINNED_BROADCAST:</span> ${esc(d.directory.manifestoNote)}`;
      } else pin.classList.add('hidden');
    }
    if ($('manifesto-paragraphs')) {
      const paras = Array.isArray(d.directory.manifestoParagraphs) && d.directory.manifestoParagraphs.length
        ? d.directory.manifestoParagraphs : FALLBACK_SITE_DATA.directory.manifestoParagraphs;
      $('manifesto-paragraphs').innerHTML = paras.map((p, i) => `<p>${i === 0 ? '<span class="text-acid font-tech font-bold">&gt; BOOT_SEQUENCE:</span> ' : ''}${esc(p)}</p>`).join('');
    }
    if (Array.isArray(d.directory.ciphers) && d.directory.ciphers.length) cipherList = d.directory.ciphers;

    /* 4. Operator Tag */
    const op = d.operator;
    if ($('op-badge')) $('op-badge').textContent = op.badge || 'VERIFIED';
    if ($('op-avatar-box') && op.avatarUrl) {
      const box = $('op-avatar-box');
      if (!box.dataset.origSvg) box.dataset.origSvg = box.innerHTML;
      box.innerHTML = `<img src="${esc(op.avatarUrl)}" alt="${esc(op.alias)}" class="w-full h-full object-cover rounded-sm">`;
      box.querySelector('img').onerror = () => { box.innerHTML = box.dataset.origSvg; };
    }
    if ($('op-info-box')) {
      $('op-info-box').innerHTML = `
        <div class="truncate"><span class="text-ash">ALIAS:</span> <span class="text-acid font-bold">${esc(op.alias || 'z3itq3ist')}</span></div>
        <div class="truncate"><span class="text-ash">CLASS:</span> <span class="text-pink">${esc(op.opClass || 'TECHNO-PAGAN')}</span></div>
        <div class="truncate"><span class="text-ash">SECTOR:</span> <span class="text-cyan">${esc(op.sector || 'WASTELAND_09')}</span></div>
        <div class="truncate"><span class="text-ash">SIGIL:</span> <span class="text-rust">${esc(op.sigil || 'ᛟ ⛨ ☽ ⌖')}</span></div>
      `;
    }
    if ($('op-bars-box')) {
      const g = Math.max(0, Math.min(100, Number(op.gridPct ?? 78)));
      const o = Math.max(0, Math.min(100, Number(op.occultPct ?? 92)));
      $('op-bars-box').innerHTML = `
        <div class="flex justify-between"><span class="text-ash">GRID_INTEGRITY</span><span class="text-acid">${g}% [${esc(op.gridStatus || 'SCRAPPED')}]</span></div>
        <div class="w-full h-2 bg-void border border-acid/40 p-0.5"><div class="h-full bg-acid" style="width:${g}%"></div></div>
        <div class="flex justify-between pt-0.5"><span class="text-ash">OCCULT_CHARGE</span><span class="text-pink">${o}% [${esc(op.occultStatus || 'VOLATILE')}]</span></div>
        <div class="w-full h-2 bg-void border border-pink/40 p-0.5"><div class="h-full bg-pink" style="width:${o}%"></div></div>
      `;
    }

    /* 5. Media Vault: Spotify, Books & VHS */
    if ($('spotify-embed-iframe') && cur.spotifyEmbed?.startsWith('https://open.spotify.com/embed/')) {
      if ($('spotify-embed-iframe').src !== cur.spotifyEmbed) $('spotify-embed-iframe').src = cur.spotifyEmbed;
    }
    if ($('spotify-profile-link') && cur.spotifyProfileUrl) $('spotify-profile-link').href = cur.spotifyProfileUrl;
    if ($('spotify-liner-notes')) $('spotify-liner-notes').innerHTML = `<span class="text-acid font-tech font-bold">&gt; LINER_NOTES:</span> ${esc(cur.spotifyLinerNotes || '')}`;

    if ($('books-list')) {
      const acMap = {
        acid: { c: 'border-acid/45', b: 'border-acid text-acid bg-acid/10', bar: 'from-acid to-cyan', t: 'text-acid' },
        pink: { c: 'border-pink/45', b: 'border-pink text-pink bg-pink/10', bar: 'from-pink to-rust', t: 'text-pink' },
        cyan: { c: 'border-cyan/45', b: 'border-cyan text-cyan bg-cyan/10', bar: 'from-cyan to-acid', t: 'text-cyan' },
        rust: { c: 'border-rust/55', b: 'border-rust text-rust bg-rust/10', bar: 'from-rust to-pink', t: 'text-rust' }
      };
      $('books-list').innerHTML = d.directory.books.map((bk, i) => {
        const ac = acMap[bk.accent] || acMap.acid;
        const pct = Math.max(0, Math.min(100, Number(bk.progressPct) || 0));
        const notes = String(bk.notes || '').split('\n').filter((l) => l.trim());
        const cov = bk.cover || `https://placehold.co/90x132/0b0d0f/39ff14?text=BOOK+0${i + 1}`;
        return `
          <article class="rounded-sm border ${ac.c} bg-void/95 p-3">
            <div class="flex flex-col sm:flex-row gap-3">
              <img src="${esc(cov)}" alt="${esc(bk.title)}" onerror="this.onerror=null;this.src='https://placehold.co/90x132/050607/d48c28?text=COVER';" class="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-sm border ${ac.c} shrink-0 self-start">
              <div class="flex-1 min-w-0 space-y-1.5">
                <div class="flex flex-wrap items-center justify-between gap-1">
                  <h3 class="font-display text-sm text-bone tracking-wide">${esc(bk.title)}</h3>
                  <span class="text-[10px] font-tech px-1.5 py-0.5 border ${ac.b}">${esc(bk.status || 'READING')}</span>
                </div>
                <div class="text-[11px] font-tech text-ash">BY: <span class="text-cyan">${esc(bk.author || 'Unknown')}</span> • FORMAT: <span class="text-rust">${esc(bk.format || 'Book')}</span></div>
                <div class="space-y-1 pt-1">
                  <div class="flex justify-between text-[10px] font-tech"><span class="${ac.t}">${esc(bk.progressLabel || `${pct}%`)}</span><span class="${ac.t} font-bold">${pct}%</span></div>
                  <div class="w-full h-2.5 bg-scrap border ${ac.c} p-0.5"><div class="h-full bg-gradient-to-r ${ac.bar}" style="width:${pct}%"></div></div>
                </div>
                ${notes.length ? `<div class="mt-2 bg-scrap border border-rust/30 rounded-sm p-2 max-h-24 overflow-y-auto space-y-1 text-[11px] font-typewriter">${notes.map((n) => `<p class="text-bone/85">${esc(n)}</p>`).join('')}</div>` : ''}
              </div>
            </div>
          </article>
        `;
      }).join('');
    }

    if ($('vhs-list')) {
      const bm = { pink: ['border-l-pink', 'text-pink', 'border-pink bg-pink/10'], acid: ['border-l-acid', 'text-acid', 'border-acid bg-acid/10'], cyan: ['border-l-cyan', 'text-cyan', 'border-cyan bg-cyan/10'], rust: ['border-l-rust', 'text-rust', 'border-rust bg-rust/10'] };
      $('vhs-list').innerHTML = d.directory.vhs.map((v) => {
        const [bl, tx, bg] = bm[v.accent] || bm.pink;
        return `
          <div class="vhs-card rounded-sm border border-l-4 border-rust/35 ${bl} bg-void/95 overflow-hidden" data-vhs-type="${esc(v.type || 'movie')}">
            <button type="button" class="vhs-toggle-btn w-full px-3 py-2.5 flex flex-wrap items-center justify-between gap-2 text-left hover:bg-iron/70 transition">
              <div>
                <div class="flex flex-wrap items-center gap-2"><span class="font-display text-xs sm:text-sm text-bone">${esc(v.title)}</span>${v.year ? `<span class="text-[10px] font-tech text-ash">(${esc(v.year)})</span>` : ''}<span class="text-[9px] font-tech px-1.5 py-0.5 border ${bg} ${tx}">[${esc(v.status || 'WATCHED')}]</span></div>
                <div class="text-[10px] font-tech text-ash mt-0.5">${esc((v.type || 'movie').toUpperCase())} • ${esc(v.genre || '')}${v.progress ? ` • <span class="text-cyan">${esc(v.progress)}</span>` : ''}</div>
              </div>
              <div class="text-right font-tech shrink-0"><div class="text-xs ${tx} font-bold">${esc(v.rating || '')}</div><div class="text-[9px] text-ash">FLIP ▾</div></div>
            </button>
            <div class="vhs-review hidden border-t border-dashed border-rust/35 bg-scrap px-3 py-2.5 space-y-1 text-[11px] font-typewriter">
              ${v.notes ? `<p class="text-bone/90"><span class="${tx} font-tech font-bold">NOTES:</span> ${esc(v.notes)}</p>` : ''}
              ${v.quote ? `<p class="text-ash italic">"${esc(v.quote)}"</p>` : ''}
            </div>
          </div>
        `;
      }).join('');
      $$('.vhs-toggle-btn', $('vhs-list')).forEach((b) => b.addEventListener('click', () => { playSfx('click'); b.parentElement?.querySelector('.vhs-review')?.classList.toggle('hidden'); }));
    }

    /* 6. Pirate TV 4 Channels */
    const tvGrid = $('tv-channels-grid');
    if (tvGrid) {
      const chs = d.directory.tvChannels;
      const loadChannel = (idx, withStatic = false) => {
        const ch = chs[idx]; if (!ch) return;
        if (withStatic) {
          playSfx('static');
          const snow = $('tv-static-overlay');
          if (snow) { snow.classList.remove('hidden', 'tv-static-flash'); void snow.offsetWidth; snow.classList.add('tv-static-flash'); setTimeout(() => snow.classList.add('hidden'), 330); }
        }
        if ($('tv-channel-badge')) $('tv-channel-badge').textContent = `${ch.ch || `CH 0${idx + 1}`} // SIGNAL_LOCKED`;
        if ($('tv-now-title')) $('tv-now-title').textContent = ch.title || 'UNTITLED';
        if ($('tv-now-note')) $('tv-now-note').textContent = ch.note || '';
        if ($('pirate-tv-iframe') && ch.embed && $('pirate-tv-iframe').src !== ch.embed) $('pirate-tv-iframe').src = ch.embed;
        $$('.tv-ch-btn', tvGrid).forEach((b, i) => {
          const on = i === idx;
          b.className = `tv-ch-btn py-2 px-2 rounded-sm border transition ${on ? 'border-acid bg-acid/20 text-acid font-bold' : 'border-rust/45 bg-void text-bone/80 hover:border-cyan'}`;
        });
      };
      tvGrid.innerHTML = chs.map((ch, i) => `<button type="button" data-tv-idx="${i}" class="tv-ch-btn py-2 px-2 rounded-sm border border-rust/45 bg-void text-bone/80">[ ${esc(ch.ch || `CH 0${i + 1}`)} ]<br><span class="text-[9px] opacity-80">${esc(ch.label || `CH ${i + 1}`)}</span></button>`).join('');
      $$('.tv-ch-btn', tvGrid).forEach((b) => b.addEventListener('click', () => loadChannel(Number(b.dataset.tvIdx), true)));
      loadChannel(0, false);
    }

    /* 7. Occult GIFs / Sticker Spawner */
    const gifsGrid = $('gifs-grid');
    if (gifsGrid) {
      gifsGrid.innerHTML = d.directory.gifs.map((g, i) => {
        const media = g.url ? `<img src="${esc(g.url)}" alt="${esc(g.label)}" class="w-14 h-14 object-contain">` : BUILTIN_RELIC_SVGS[i % BUILTIN_RELIC_SVGS.length];
        return `<button type="button" data-gif-idx="${i}" class="gif-spawn-card rounded-sm border border-rust/45 hover:border-acid bg-void p-2.5 flex flex-col items-center gap-1.5 transition">${media}<span class="text-acid truncate max-w-full">${esc(g.label || `RELIC_0${i + 1}.GIF`)}</span></button>`;
      }).join('');
      $$('.gif-spawn-card', gifsGrid).forEach((card) => card.addEventListener('click', () => {
        const mediaEl = card.querySelector('svg, img');
        if (mediaEl) spawnStickerFromHtml(mediaEl.outerHTML);
      }));
    }

    /* 8. Cyber-Locker Artifacts */
    const lk = d.directory.locker;
    if ($('locker-p1')) {
      const img = $('locker-p1').querySelector('img'), cap = $('locker-p1').querySelector('.font-display');
      if (img && lk.polaroid1Img) img.src = lk.polaroid1Img;
      if (cap && lk.polaroid1Cap) cap.textContent = lk.polaroid1Cap;
    }
    if ($('locker-p2')) {
      const img = $('locker-p2').querySelector('img'), cap = $('locker-p2').querySelector('.font-display');
      if (img && lk.polaroid2Img) img.src = lk.polaroid2Img;
      if (cap && lk.polaroid2Cap) cap.textContent = lk.polaroid2Cap;
    }
    if ($('locker-receipt')) {
      const rows = String(lk.receiptItems || '').split('\n').filter((l) => l.trim()).map((line) => {
        const [l, r] = line.split('|').map((s) => s.trim());
        return `<div class="flex justify-between"><span>${esc(l)}</span><span>${esc(r || '')}</span></div>`;
      }).join('');
      $('locker-receipt').innerHTML = `<div class="text-center font-bold border-b border-dashed border-black/50 pb-1 mb-1">${esc(lk.receiptHeader || 'SECTOR 09 BODEGA')}</div>${rows}<div class="border-t border-dashed border-black/50 mt-1 pt-1 flex justify-between font-bold"><span>TOTAL</span><span>${esc(lk.receiptTotal || 'SOUL_OK')}</span></div><div class="text-center text-[8px] mt-1 tracking-widest">||||| |||| |||||</div>`;
    }
    if ($('locker-zine')) {
      const p = $('locker-zine').querySelector('p');
      if (p) p.textContent = `"${String(lk.zineQuote || '').replace(/^"|"$/g, '')}"`;
    }
    if ($('locker-ticket')) {
      $('locker-ticket').innerHTML = `<div class="flex justify-between text-pink font-bold border-b border-pink/40 pb-1"><span>ADMIT ONE</span><span>${esc(lk.ticketNo || 'NO. 0666')}</span></div><div class="text-bone mt-1 font-bold">${esc(lk.ticketTitle || '[TICKET]')}</div><div class="text-ash text-[9px]">${esc(lk.ticketDate || '')}</div>`;
    }

    /* 9. Signal Relays + Sync 88x31 Stamps + Giscus */
    const r = d.directory.relays;
    if ($('rel-sub-title-out')) $('rel-sub-title-out').textContent = r.substackTitle || '';
    if ($('rel-sub-date-out')) $('rel-sub-date-out').textContent = r.substackDate ? `PUBLISHED: ${r.substackDate}` : '';
    if ($('rel-sub-teaser-out')) $('rel-sub-teaser-out').textContent = r.substackTeaser || '';
    if ($('rel-sub-url-out') && r.substackUrl) $('rel-sub-url-out').href = r.substackUrl;
    if ($('rel-ig-card') && r.igUrl) $('rel-ig-card').href = r.igUrl;
    if ($('rel-ig-img1') && r.igImg1) $('rel-ig-img1').src = r.igImg1;
    if ($('rel-ig-img2') && r.igImg2) $('rel-ig-img2').src = r.igImg2;
    if ($('rel-ig-img3') && r.igImg3) $('rel-ig-img3').src = r.igImg3;
    if ($('rel-ig-handle-out')) $('rel-ig-handle-out').textContent = r.igHandle ? `@${r.igHandle.replace(/^@/, '')}` : '';
    if ($('rel-ig-bio-out')) $('rel-ig-bio-out').textContent = r.igBio || '';
    if ($('rel-tt-card') && r.ttUrl) $('rel-tt-card').href = r.ttUrl;
    if ($('rel-tt-handle-out')) $('rel-tt-handle-out').textContent = r.ttHandle ? `@${r.ttHandle.replace(/^@/, '')}` : '';
    if ($('rel-tt-bio-out')) $('rel-tt-bio-out').textContent = r.ttBio || '';
    if ($('rel-fb-card') && r.fbUrl) $('rel-fb-card').href = r.fbUrl;
    if ($('rel-fb-handle-out')) $('rel-fb-handle-out').textContent = r.fbHandle ? `/${r.fbHandle.replace(/^\//, '')}` : '';
    if ($('rel-fb-bio-out')) $('rel-fb-bio-out').textContent = r.fbBio || '';
    if ($('stamp-substack') && r.substackUrl) $('stamp-substack').href = r.substackUrl;
    if ($('stamp-instagram') && r.igUrl) $('stamp-instagram').href = r.igUrl;
    if ($('stamp-tiktok') && r.ttUrl) $('stamp-tiktok').href = r.ttUrl;
    if ($('stamp-facebook') && r.fbUrl) $('stamp-facebook').href = r.fbUrl;

    if ($('relay-deadnet-list')) {
      const pal = [['hover:border-acid', 'text-acid'], ['hover:border-pink', 'text-pink'], ['hover:border-cyan', 'text-cyan'], ['hover:border-rust', 'text-rust']];
      $('relay-deadnet-list').innerHTML = String(r.deadnetLinks || '').split('\n').filter((l) => l.trim()).map((line, i) => {
        const [label, url, tag] = line.split('|').map((s) => s.trim());
        const [hb, tx] = pal[i % pal.length];
        return `<a href="${esc(url || '#')}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between p-2.5 rounded-sm border border-rust/35 bg-void/85 ${hb} transition font-tech text-xs"><span class="${tx} font-bold">↗ ${esc(label)}</span><span class="text-[10px] text-ash">[${esc(tag || 'RELAY')}]</span></a>`;
      }).join('');
    }
    hydrateGiscus(d.integrations);

    /* 10. 5 Inline Ads & 15 Pop-Up Ads */
    if (Array.isArray(d.inlineAds)) {
      d.inlineAds.forEach((ia) => {
        const sec = document.querySelector(`[data-dismiss-ad="${ia.id}"]`);
        if (!sec) return;
        sec.dataset.cmsDisabled = ia.enabled === false ? '1' : '0';
        const link = sec.querySelector('.inline-ad-link'); if (link && ia.url) link.href = ia.url;
        const head = sec.querySelector('.inline-ad-head'); if (head && ia.head) head.textContent = ia.head;
        const sub  = sec.querySelector('.inline-ad-sub');  if (sub && ia.sub !== undefined) sub.textContent = ia.sub;
        const cta  = sec.querySelector('.inline-ad-cta');  if (cta && ia.cta) cta.textContent = ia.cta;
        const marq = sec.querySelector('.inline-ad-marquee');
        if (marq && ia.marquee) {
          marq.innerHTML = marq.tagName === 'DIV' ? `<span>${esc(ia.marquee)}</span><span>${esc(ia.marquee)}</span>` : esc(ia.marquee);
        }
        const gifSlot = sec.querySelector('.inline-ad-gif');
        if (gifSlot && ia.img) {
          const img = document.createElement('img');
          img.src = ia.img; img.alt = ia.head || 'Ad GIF'; img.className = 'w-full h-full object-cover';
          gifSlot.innerHTML = ''; gifSlot.appendChild(img);
        }
      });
    }
    applyInlineDismissals();

    livePopupAds = d.popupAds;
    renderAdDirectory();
    renderArchiveBox(d.archive);
  }

  /* VHS Filter Buttons */
  $$('.vhs-filter-btn').forEach((b) => b.addEventListener('click', () => {
    playSfx('click');
    $$('.vhs-filter-btn').forEach((x) => {
      const on = x === b;
      x.classList.toggle('border-pink', on); x.classList.toggle('bg-pink/20', on); x.classList.toggle('text-pink', on); x.classList.toggle('font-bold', on);
      if (!on) x.classList.add('border-rust/40', 'bg-void', 'text-ash');
    });
    const f = b.dataset.vhsFilter || 'all';
    $$('.vhs-card').forEach((c) => c.classList.toggle('hidden', f !== 'all' && c.dataset.vhsType !== f));
  }));

  /* =========================================================================
     17. WILDER CHAOS OVERDRIVE + HYPER-MATRIX RAIN + GLITCH TEAR ENGINE
     ========================================================================= */
  const matrixWrap = $('matrix-rain-wrapper'), matrixCanvas = $('matrix-rain-canvas'), matrixCtx = matrixCanvas?.getContext('2d');
  const chaosGhostLayer = $('chaos-ghost-layer'), topGhostLayer = $('top-bar-ghost-layer');
  const topTargets = $$('#top-telemetry-bar .top-glitch-target');
  let tearLayer = $('z3-chaos-tear-layer');
  if (!tearLayer) { tearLayer = document.createElement('div'); tearLayer.id = 'z3-chaos-tear-layer'; document.body.appendChild(tearLayer); }

  const chaosTimers = new Set();
  const chaosBaseRects = new Map();
  const scrambledOriginals = new Map();
  let chaosZ = 20, chaosHideTimer = null, matrixRaf = null, matrixLast = 0, matrixDrops = [], matrixCols = 0;

  const addChaosTimer = (fn, ms) => { const id = setTimeout(() => { chaosTimers.delete(id); fn(); }, ms); chaosTimers.add(id); return id; };
  const clearChaosTimers = () => { chaosTimers.forEach(clearTimeout); chaosTimers.clear(); };

  function resizeMatrix() {
    if (!matrixCanvas || !matrixCtx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = window.innerWidth, h = window.innerHeight;
    matrixCanvas.width = Math.floor(w * dpr); matrixCanvas.height = Math.floor(h * dpr);
    matrixCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    matrixCtx.font = '700 16px "Share Tech Mono", monospace';
    matrixCtx.textBaseline = 'top';
    matrixCols = Math.ceil(w / 16);
    matrixDrops = Array.from({ length: matrixCols }, () => Math.floor(Math.random() * Math.max(12, h / 16)));
  }

  const MATRIX_GLITCH_CHARS = '0123456789ABCDEFᛟ⛨☽⌖ØÆЖ▓▒░';
  function renderMatrix(ts) {
    if (!chaosOn || !matrixCtx) return;
    matrixRaf = requestAnimationFrame(renderMatrix);
    if (ts - matrixLast < 34) return;
    matrixLast = ts;
    const w = window.innerWidth, h = window.innerHeight;
    matrixCtx.fillStyle = 'rgba(4, 7, 5, .15)';
    matrixCtx.fillRect(0, 0, w, h);

    const tear = Math.random() < .35;
    const tearY = tear ? Math.floor(Math.random() * (h / 16)) * 16 : -1;
    const tearShift = tear ? (Math.random() < .5 ? -1 : 1) * rand(18, 56) : 0;

    for (let i = 0; i < matrixCols; i++) {
      let x = i * 16;
      const y = matrixDrops[i] * 16;
      if (tear && Math.abs(y - tearY) <= 48) x += tearShift;
      const r = Math.random();
      if (r < .06) matrixCtx.fillStyle = '#ff1f6d';
      else if (r < .12) matrixCtx.fillStyle = '#00f0ff';
      else if (r < .18) matrixCtx.fillStyle = '#ffffff';
      else matrixCtx.fillStyle = '#39ff14';
      matrixCtx.fillText(MATRIX_GLITCH_CHARS[Math.floor(Math.random() * MATRIX_GLITCH_CHARS.length)], x, y);
      matrixDrops[i] = (y > h && Math.random() > .92) ? 0 : matrixDrops[i] + 1;
    }
    if (Math.random() < .26) {
      matrixCtx.fillStyle = pick(['rgba(57,255,20,.16)', 'rgba(255,31,109,.18)', 'rgba(0,240,255,.16)']);
      matrixCtx.fillRect(0, Math.random() * h, w, rand(4, 24));
    }
    if (Math.random() < .12) {
      matrixCtx.fillStyle = '#ff1f6d';
      matrixCtx.fillText(pick(['ERR_0x666', 'BREACH!!', 'SEGFAULT', 'ᛟ_CORRUPT']), rand(20, w - 120), rand(40, h - 40));
    }
  }

  function spawnScreenTearBar() {
    if (!chaosOn || !tearLayer) return;
    while (tearLayer.children.length >= 12) tearLayer.firstElementChild.remove();
    const bar = document.createElement('div');
    bar.className = 'z3-tear-bar';
    const h = Math.round(rand(2, 26));
    const col1 = pick(['rgba(255,31,109,.65)', 'rgba(0,240,255,.65)', 'rgba(57,255,20,.6)', 'rgba(255,255,0,.55)']);
    const col2 = pick(['rgba(0,240,255,.5)', 'rgba(255,31,109,.5)', 'rgba(255,255,255,.45)']);
    bar.style.top = `${rand(0, 98).toFixed(1)}vh`;
    bar.style.height = `${h}px`;
    bar.style.background = `repeating-linear-gradient(90deg, ${col1} 0 18px, transparent 18px 26px, ${col2} 26px 46px)`;
    bar.style.setProperty('--tx0', `${rand(-45, 45).toFixed(0)}px`);
    bar.style.setProperty('--tx1', `${rand(-60, 60).toFixed(0)}px`);
    bar.style.setProperty('--tx2', `${rand(-30, 30).toFixed(0)}px`);
    const dur = rand(.12, .28);
    bar.style.setProperty('--td', `${dur.toFixed(2)}s`);
    tearLayer.appendChild(bar);
    addChaosTimer(() => bar.remove(), Math.ceil(dur * 1000) + 40);
  }

  function spawnStaticFlash() {
    if (!chaosOn || !tearLayer) return;
    const fl = document.createElement('div');
    fl.className = 'z3-chaos-flash';
    fl.style.background = pick([
      'linear-gradient(90deg, rgba(255,31,109,.28), transparent 40%, rgba(0,240,255,.28))',
      'repeating-linear-gradient(0deg, rgba(57,255,20,.22) 0 3px, rgba(0,0,0,.6) 3px 6px)'
    ]);
    tearLayer.appendChild(fl);
    addChaosTimer(() => fl.remove(), 220);
  }

  function scrambleRandomTextNode() {
    if (!chaosOn) return;
    const candidates = $$('h1, h2, h3, .scrap-hdr span, .nav-tab-btn span.block.font-tech, .z3-wb-title, #window-title').filter((el) => el.offsetParent !== null && !el.matches(':hover') && !scrambledOriginals.has(el) && el.children.length === 0 && el.textContent.trim().length > 2);
    if (!candidates.length) return;
    const el = pick(candidates);
    const orig = el.textContent;
    scrambledOriginals.set(el, orig);
    const glitchGlyphs = '▓▒░ØÆᛟ⛨∆╳01#$%@!';
    el.textContent = orig.split('').map((c) => (c === ' ' || Math.random() < .35 ? c : glitchGlyphs[Math.floor(Math.random() * glitchGlyphs.length)])).join('');
    addChaosTimer(() => {
      if (scrambledOriginals.has(el)) { el.textContent = scrambledOriginals.get(el); scrambledOriginals.delete(el); }
    }, rand(180, 520));
  }

  function restoreAllScrambledText() {
    scrambledOriginals.forEach((orig, el) => { el.textContent = orig; });
    scrambledOriginals.clear();
  }

  function spawnGhost(el, layer, isTop = false) {
    if (!chaosOn || !layer || el.offsetParent === null || (isTop && el.matches(':hover'))) return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 8 || rect.height < 8) return;
    while (layer.children.length >= (isTop ? 10 : 18)) layer.firstElementChild.remove();
    const g = el.cloneNode(true);
    g.removeAttribute('id'); $$('[id]', g).forEach((n) => n.removeAttribute('id'));
    $$('iframe', g).forEach((f) => { const d = document.createElement('div'); d.className = 'w-full h-full bg-pink/15 border border-acid text-acid flex items-center justify-center font-tech text-xs'; d.textContent = '⚠ SIGNAL_CORRUPT ⚠'; f.replaceWith(d); });
    const dur = isTop ? rand(.38, .75) : rand(.45, .95);
    g.classList.remove('chaos-blinking', 'chaos-glitching', 'chaos-invert-spike', 'chaos-ghost-echo', 'chaos-returning');
    g.classList.add(isTop ? 'top-bar-ghost-clone' : 'chaos-ghost-clone');
    Object.assign(g.style, {
      left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px`,
      transition: 'none', transform: 'none',
      filter: pick(['drop-shadow(-6px 0 0 #ff1f6d) saturate(2.2)', 'drop-shadow(6px 0 0 #00f0ff) saturate(2.2)', 'invert(1) hue-rotate(120deg)', 'drop-shadow(0 0 14px #39ff14)'])
    });
    g.style.setProperty('--gx', `${rand(isTop ? -26 : -54, isTop ? 26 : 54).toFixed(1)}px`);
    g.style.setProperty('--gy', `${rand(isTop ? 4 : -42, isTop ? 22 : 42).toFixed(1)}px`);
    g.style.setProperty('--gd', `${dur.toFixed(2)}s`);
    layer.appendChild(g);
    addChaosTimer(() => g.remove(), Math.ceil(dur * 1000) + 60);
  }

  const getChaosPanels = () => $$('header.cyber-panel, aside .cyber-panel, main .cyber-panel, footer.cyber-panel');
  const getChaosMicros = () => $$('.btn-88x31, .nav-tab-btn, .gif-spawn-card');

  function triggerPanelGlitch(el) {
    if (!chaosOn || el.matches(':hover') || el.matches(':focus-within')) return;
    const r = Math.random();
    if (r < .28) { el.classList.add('chaos-blinking'); addChaosTimer(() => el.classList.remove('chaos-blinking'), rand(160, 480)); }
    else if (r < .58) { el.classList.add('chaos-glitching'); addChaosTimer(() => el.classList.remove('chaos-glitching'), rand(160, 520)); }
    else if (r < .78) { el.classList.add('chaos-invert-spike'); addChaosTimer(() => el.classList.remove('chaos-invert-spike'), rand(120, 320)); }
    else { el.classList.add('chaos-ghost-echo'); spawnGhost(el, chaosGhostLayer); addChaosTimer(() => el.classList.remove('chaos-ghost-echo'), rand(240, 680)); }
  }

  function warpChaosPanel(panel) {
    if (!chaosOn || panel.matches(':hover') || panel.matches(':focus-within')) return;
    const base = chaosBaseRects.get(panel);
    if (!base) return;
    const vw = window.innerWidth, isNarrow = vw < 768, isWide = base.width > vw * .62;
    const maxX = isNarrow ? 22 : isWide ? 88 : 130;
    const maxY = isNarrow ? 34 : isWide ? 110 : 210;
    const maxRot = isNarrow ? 6 : isWide ? 8.5 : 19;
    const x = rand(-maxX, maxX).toFixed(1), y = rand(-maxY, maxY).toFixed(1);
    const rot = rand(-maxRot, maxRot).toFixed(1), sc = rand(.9, 1.09).toFixed(2);
    const skewX = rand(-8, 8).toFixed(1), skewY = rand(-3, 3).toFixed(1);
    const teleport = Math.random() < .58;
    if (Math.random() < (teleport ? .9 : .55)) spawnGhost(panel, chaosGhostLayer);
    panel.style.transition = teleport ? 'none' : `transform ${rand(.18, .62).toFixed(2)}s cubic-bezier(.22,1,.36,1)`;
    panel.style.transform = `translate3d(${x}px,${y}px,0) rotate(${rot}deg) scale(${sc}) skew(${skewX}deg,${skewY}deg)`;
    if (Math.random() < .78) triggerPanelGlitch(panel);
  }

  const bringChaosForward = (e) => { if (chaosOn) { chaosZ = chaosZ >= 36 ? 20 : chaosZ + 1; e.currentTarget.style.zIndex = String(chaosZ); } };

  function startChaosMode() {
    clearChaosTimers();
    restoreAllScrambledText();
    if (chaosGhostLayer) chaosGhostLayer.innerHTML = '';
    if (topGhostLayer) topGhostLayer.innerHTML = '';
    if (tearLayer) tearLayer.innerHTML = '';

    const panels = getChaosPanels(), micros = getChaosMicros();
    const sx = window.scrollX, sy = window.scrollY;
    chaosBaseRects.clear();
    panels.forEach((p) => {
      p.classList.remove('chaos-returning', 'chaos-blinking', 'chaos-glitching', 'chaos-invert-spike', 'chaos-ghost-echo');
      p.style.transition = 'none'; p.style.transform = '';
      const r = p.getBoundingClientRect();
      chaosBaseRects.set(p, { left: r.left + sx, top: r.top + sy, width: r.width, height: r.height });
    });

    document.body.classList.add('overdrive-mode');
    matrixWrap?.classList.remove('hidden');
    resizeMatrix(); matrixLast = 0; cancelAnimationFrame(matrixRaf); matrixRaf = requestAnimationFrame(renderMatrix);
    unlockRelic('chaos_survivor');
    playSfx('boss');

    const glitchStormLoop = () => {
      if (!chaosOn) return;
      spawnScreenTearBar();
      if (Math.random() < .55) spawnScreenTearBar();
      if (Math.random() < .32) spawnStaticFlash();
      if (Math.random() < .65) scrambleRandomTextNode();
      if (Math.random() < .35) {
        document.body.classList.add('chaos-shaking');
        playSfx('glitch');
        addChaosTimer(() => document.body.classList.remove('chaos-shaking'), rand(160, 380));
      }
      addChaosTimer(glitchStormLoop, rand(140, 380));
    };

    const topLoop = () => {
      if (!chaosOn) return;
      const vis = topTargets.filter((el) => el.offsetParent !== null && !el.matches(':hover'));
      if (vis.length) {
        const picked = pick(vis);
        spawnGhost(picked, topGhostLayer, true);
        picked.classList.add('is-bursting');
        addChaosTimer(() => picked.classList.remove('is-bursting'), rand(140, 320));
      }
      addChaosTimer(topLoop, rand(280, 760));
    };

    requestAnimationFrame(() => {
      if (!chaosOn) return;
      const driftP = (p) => { if (!chaosOn) return; warpChaosPanel(p); addChaosTimer(() => driftP(p), rand(240, 760)); };
      const driftM = (el) => {
        if (!chaosOn) return;
        if (!el.matches(':hover')) {
          el.style.transition = Math.random() < .55 ? 'none' : `transform ${rand(.18, .55).toFixed(2)}s ease-out`;
          el.style.transform = `translate3d(${rand(-30, 30).toFixed(1)}px,${rand(-18, 18).toFixed(1)}px,0) rotate(${rand(-18, 18).toFixed(1)}deg) skewX(${rand(-10, 10).toFixed(1)}deg)`;
          if (Math.random() < .48) triggerPanelGlitch(el);
        }
        addChaosTimer(() => driftM(el), rand(220, 680));
      };
      panels.forEach((p) => { p.addEventListener('pointerdown', bringChaosForward); driftP(p); });
      micros.forEach((m) => driftM(m));
      glitchStormLoop();
      topLoop();
    });
  }

  function stopChaosMode() {
    clearChaosTimers();
    restoreAllScrambledText();
    document.body.classList.remove('overdrive-mode', 'chaos-shaking');
    cancelAnimationFrame(matrixRaf); matrixRaf = null;
    matrixCtx?.clearRect(0, 0, window.innerWidth, window.innerHeight);
    matrixWrap?.classList.add('hidden');
    if (chaosGhostLayer) chaosGhostLayer.innerHTML = '';
    if (topGhostLayer) topGhostLayer.innerHTML = '';
    if (tearLayer) tearLayer.innerHTML = '';
    topTargets.forEach((el) => el.classList.remove('is-bursting'));

    const panels = getChaosPanels(), micros = getChaosMicros();
    [...panels, ...micros].forEach((el) => {
      el.removeEventListener('pointerdown', bringChaosForward);
      el.classList.remove('chaos-blinking', 'chaos-glitching', 'chaos-invert-spike', 'chaos-ghost-echo');
      el.classList.add('chaos-returning');
      el.style.transform = 'translate3d(0,0,0) rotate(0deg) scale(1)';
      el.style.zIndex = '';
    });
    addChaosTimer(() => {
      if (chaosOn) return;
      [...panels, ...micros].forEach((el) => { el.classList.remove('chaos-returning'); el.style.transition = ''; el.style.transform = ''; });
    }, 680);
  }

  function setChaos(next) {
    const btn = $('btn-overdrive');
    chaosOn = Boolean(next);
    if (btn) {
      btn.textContent = chaosOn ? 'CHAOS: ON' : 'CHAOS: OFF';
      btn.setAttribute('data-ghost', btn.textContent);
      btn.classList.toggle('bg-pink', chaosOn); btn.classList.toggle('text-void', chaosOn);
      btn.classList.toggle('bg-scrap', !chaosOn); btn.classList.toggle('text-pink', !chaosOn);
    }
    if (chaosOn) {
      startChaosMode();
      clearTimeout(chaosHideTimer);
      btn?.classList.add('hidden');
      chaosHideTimer = setTimeout(() => btn?.classList.remove('hidden'), 6000);
    } else {
      clearTimeout(chaosHideTimer);
      btn?.classList.remove('hidden');
      stopChaosMode();
    }
  }
  $('btn-overdrive')?.addEventListener('click', () => setChaos(!chaosOn));

  /* =========================================================================
     18. OCCULT 5-LINE MARGINS + MINI CHIBI SERAPHIMS + 3-HP ARCH-SERAPH BOSS
     ========================================================================= */
  const veilCanvas = $('z3-occult-veil-canvas'), veilCtx = veilCanvas?.getContext('2d');
  const seraphLayer = $('z3-seraph-layer');
  const PAGAN_GLYPHS = ['ᛟ', 'ᛉ', 'ᚦ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛊ', 'ᛏ', '⛨', '☽', '☾', '⌖', '✦', '⚚', '⛧', '†'];
  const CORRUPT_GLYPHS = ['Ø', 'Æ', 'Ð', 'Ʃ', 'Ѫ', '§', '¤', 'Ж', 'Ψ', 'Ω', 'Ξ', '▓', '▒', '░', '╬', '╳', '≠', '∑', '∞', '0', '1', '3', '6', '9'];
  const ZALGO = ['\u0336', '\u0337', '\u0338', '\u0307', '\u0323'];
  const GREENS = ['#39ff14', '#55ff33', '#16f26b', '#00e676', '#88ff4d'];
  const PRISMS = ['#00f0ff', '#ff1f6d', '#f5d27a', '#c084fc', '#38bdf8', '#ff66b2'];
  const makeGlyph = () => (Math.random() < .58 ? pick(PAGAN_GLYPHS) : pick(CORRUPT_GLYPHS)) + (Math.random() < .32 ? pick(ZALGO) : '');

  const MARGIN_SPECS = [
    { thick: 4.4, fontSize: 15, speed: 34, dir:  1, gap: 22, alpha: .80, bias: .62 },
    { thick: 0.9, fontSize: 10, speed: 56, dir: -1, gap: 16, alpha: .70, bias: .72 },
    { thick: 3.1, fontSize: 14, speed: 24, dir:  1, gap: 20, alpha: .74, bias: .44 },
    { thick: 1.5, fontSize: 11, speed: 45, dir: -1, gap: 18, alpha: .64, bias: .58 },
    { thick: 2.3, fontSize: 13, speed: 30, dir:  1, gap: 19, alpha: .52, bias: .50 }
  ];

  let vw = window.innerWidth, vh = window.innerHeight, streams = [], patches = [], gradCache = new Map();
  const seraphs = [];
  let activeBoss = null;

  function syncKillBadge() {
    const b = $('seraph-kill-badge');
    if (b) b.textContent = `✦ BANISHED: ${String(seraphKills).padStart(2, '0')}`;
  }
  syncKillBadge();

  function buildOccultScene() {
    if (!veilCanvas || !veilCtx) return;
    vw = window.innerWidth; vh = window.innerHeight;
    const mob = vw < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, mob ? 1.25 : 1.6);
    veilCanvas.width = Math.floor(vw * dpr); veilCanvas.height = Math.floor(vh * dpr);
    veilCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    gradCache.clear();

    const band = mob ? 34 : Math.max(76, Math.min(190, Math.max(0, (vw - 1280) / 2) + 46));
    streams = [];
    ['left', 'right'].forEach((side) => {
      for (let i = 0; i < 5; i++) {
        const sp = MARGIN_SPECS[i];
        const frac = (i + .45) / 5.1;
        const x = side === 'left' ? (mob ? 4 : 8) + frac * (band - (mob ? 6 : 14)) : vw - ((mob ? 4 : 8) + frac * (band - (mob ? 6 : 14)));
        const gap = mob ? Math.round(sp.gap * 1.18) : sp.gap;
        streams.push({
          side, index: i, x, offset: rand(0, gap * 3), ...sp, gap,
          fontSize: mob ? Math.max(9, Math.round(sp.fontSize * .82)) : sp.fontSize,
          thick: mob ? Math.max(.8, +(sp.thick * .82).toFixed(1)) : sp.thick,
          dir: side === 'right' ? -sp.dir : sp.dir,
          glyphs: Array.from({ length: Math.ceil((vh + 120) / gap) + 4 }, () => ({ ch: makeGlyph(), jx: 0, gt: 0 }))
        });
      }
    });

    const pCnt = mob ? 7 : 14;
    patches = Array.from({ length: pCnt }, (_, i) => {
      const onM = i < pCnt * .72, isG = Math.random() < .56, col = isG ? pick(GREENS) : pick(PRISMS);
      const rx = rand(mob ? 28 : 42, onM ? (mob ? 66 : 112) : 138);
      const grad = veilCtx.createRadialGradient(0, 0, 2, 0, 0, rx);
      grad.addColorStop(0, col); grad.addColorStop(.55, isG ? 'rgba(57,255,20,.26)' : 'rgba(0,240,255,.18)'); grad.addColorStop(1, 'rgba(0,0,0,0)');
      return {
        x: onM ? (i % 2 === 0 ? rand(0, band * 1.2) : rand(vw - band * 1.2, vw)) : rand(vw * .14, vw * .86),
        y: rand(0, vh), rx, ry: rand(mob ? 18 : 24, mob ? 44 : 74),
        vx: rand(-6, 6), vy: rand(-12, 12), grad, alpha: onM ? rand(.08, .14) : rand(.025, .05), phase: rand(0, 6.28)
      };
    });
  }

  function drawOccultVeil(dt, t) {
    if (!veilCtx || calmOn || veilCanvas.classList.contains('hidden')) return;
    veilCtx.clearRect(0, 0, vw, vh);
    const mob = vw < 768, boost = chaosOn ? 2.5 : 1;

    veilCtx.save();
    veilCtx.globalCompositeOperation = 'lighter';
    for (const p of patches) {
      p.x += p.vx * dt * boost; p.y += p.vy * dt * boost;
      if (p.y < -p.ry) p.y = vh + p.ry; if (p.y > vh + p.ry) p.y = -p.ry;
      if (p.x < -p.rx) p.x = vw + p.rx; if (p.x > vw + p.rx) p.x = -p.rx;
      veilCtx.globalAlpha = p.alpha * (.76 + .24 * Math.sin(t * .9 + p.phase));
      veilCtx.fillStyle = p.grad;
      veilCtx.save(); veilCtx.translate(p.x, p.y); veilCtx.scale(1, p.ry / p.rx);
      veilCtx.beginPath(); veilCtx.arc(0, 0, p.rx, 0, Math.PI * 2); veilCtx.fill(); veilCtx.restore();
    }
    veilCtx.restore();

    veilCtx.save();
    veilCtx.textAlign = 'center'; veilCtx.textBaseline = 'middle';
    for (const st of streams) {
      st.offset = (st.offset + st.speed * dt * st.dir * boost) % st.gap;
      if (st.offset < 0) st.offset += st.gap;
      const gk = `${st.side}-${st.index}-${vh}`;
      let vg = gradCache.get(gk);
      if (!vg) {
        vg = veilCtx.createLinearGradient(st.x, 0, st.x, vh);
        vg.addColorStop(0, 'rgba(57,255,20,.88)'); vg.addColorStop(.25, 'rgba(0,240,255,.8)');
        vg.addColorStop(.5, 'rgba(57,255,20,.26)'); vg.addColorStop(.75, 'rgba(255,31,109,.82)'); vg.addColorStop(1, 'rgba(192,132,252,.8)');
        gradCache.set(gk, vg);
      }
      veilCtx.strokeStyle = vg; veilCtx.lineWidth = st.thick; veilCtx.globalAlpha = st.alpha * .52;
      veilCtx.setLineDash(st.index % 2 === 0 ? [22, 9, 5, 11] : [9, 6, 38, 10]);
      veilCtx.lineDashOffset = -t * st.speed * st.dir * .9;
      veilCtx.beginPath(); veilCtx.moveTo(st.x, 0); veilCtx.lineTo(st.x, vh); veilCtx.stroke(); veilCtx.setLineDash([]);

      veilCtx.font = `700 ${st.fontSize}px "Share Tech Mono", monospace`;
      for (let k = 0; k < st.glyphs.length; k++) {
        const y = (k - 1) * st.gap + st.offset;
        if (y < -22 || y > vh + 22) continue;
        const sl = st.glyphs[k];
        if (Math.random() < .02 * boost) sl.ch = makeGlyph();
        if (sl.gt > 0) sl.gt -= dt;
        else if (!mob && Math.random() < .007 * boost) { sl.gt = rand(.08, .24); sl.jx = rand(-4.5, 4.5); }
        const wv = Math.sin(y * .015 + t * 1.15 + st.index * 1.3) * .5 + .5;
        const col = wv < st.bias ? GREENS[Math.floor(Math.abs(Math.sin(y * .02 + t)) * GREENS.length) % GREENS.length]
          : PRISMS[Math.floor(((y * .014 + st.x * .009 + t * .55) % PRISMS.length + PRISMS.length) % PRISMS.length)];
        const gx = st.x + (sl.gt > 0 ? sl.jx : 0);
        const al = st.alpha * (.36 + wv * .64);
        if (!mob && sl.gt > 0) {
          veilCtx.globalAlpha = al * .76;
          veilCtx.fillStyle = '#ff1f6d'; veilCtx.fillText(sl.ch, gx - 2.4, y);
          veilCtx.fillStyle = '#00f0ff'; veilCtx.fillText(sl.ch, gx + 2.4, y);
        }
        veilCtx.globalAlpha = al; veilCtx.fillStyle = col; veilCtx.fillText(sl.ch, gx, y);
      }
    }
    veilCtx.restore();
  }

  const buildSeraphSVG = (v, m, p, isBoss = false) => isBoss
    ? `<svg viewBox="0 0 80 64" fill="none" stroke-linecap="round" stroke-linejoin="round"><g class="sr-halo"><ellipse cx="40" cy="7" rx="16" ry="4" stroke="#f5d27a" stroke-width="2.4"/><polygon points="40,1 43,6 37,6" fill="#ff1f6d"/></g><g class="sr-wing-top-l"><path d="M34 22 C24 6, 8 8, 7 18 C13 20, 19 20, 26 24" stroke="#f5d27a" stroke-width="2.2"/></g><g class="sr-wing-top-r"><path d="M46 22 C56 6, 72 8, 73 18 C67 20, 61 20, 54 24" stroke="#f5d27a" stroke-width="2.2"/></g><g class="sr-wing-mid-l"><path d="M29 29 C16 19, 2 22, 2 33 C8 35, 13 33, 16 38 C21 37, 25 35, 30 33" stroke="#ff1f6d" stroke-width="2.4"/></g><g class="sr-wing-mid-r"><path d="M51 29 C64 19, 78 22, 78 33 C72 35, 67 33, 64 38 C59 37, 55 35, 50 33" stroke="#ff1f6d" stroke-width="2.4"/></g><ellipse cx="40" cy="31" rx="18" ry="11" stroke="#f5d27a" stroke-width="2" stroke-dasharray="4 3"/><g class="sr-eye"><path d="M24 31 Q40 16 56 31 Q40 46 24 31 Z" fill="#0b0706" stroke="#f5d27a" stroke-width="2.4"/><circle cx="40" cy="31" r="6.5" fill="#ff1f6d" stroke="#39ff14" stroke-width="1.6"/><circle cx="40" cy="31" r="2.5" fill="#fff"/></g></svg>`
    : v === 0
      ? `<svg viewBox="0 0 80 64" fill="none" stroke-linecap="round" stroke-linejoin="round"><g class="sr-halo"><ellipse cx="40" cy="9" rx="11" ry="3.2" stroke="${p}" stroke-width="1.9"/></g><g class="sr-wing-top-l"><path d="M35 23 C27 11, 14 11, 13 19 C16 20, 21 20, 26 24" stroke="${p}" stroke-width="1.8"/></g><g class="sr-wing-top-r"><path d="M45 23 C53 11, 66 11, 67 19 C64 20, 59 20, 54 24" stroke="${p}" stroke-width="1.8"/></g><g class="sr-wing-mid-l"><path d="M31 28 C20 20, 5 22, 4 31 C9 32, 13 31, 15 35 C19 35, 22 33, 25 36 C28 35, 30 33, 32 31" stroke="${m}" stroke-width="2.1"/></g><g class="sr-wing-mid-r"><path d="M49 28 C60 20, 75 22, 76 31 C71 32, 67 31, 65 35 C61 35, 58 33, 55 36 C52 35, 50 33, 48 31" stroke="${m}" stroke-width="2.1"/></g><g class="sr-eye"><path d="M27 29 Q40 16 53 29 Q40 42 27 29 Z" stroke="${m}" stroke-width="2.2"/><circle cx="40" cy="29" r="5.5" stroke="${p}" stroke-width="1.8"/><circle cx="40" cy="29" r="2" stroke="${m}" stroke-width="1.6"/></g></svg>`
      : v === 1
        ? `<svg viewBox="0 0 80 64" fill="none" stroke-linecap="round" stroke-linejoin="round"><g class="sr-halo"><ellipse cx="40" cy="8.5" rx="10" ry="2.8" stroke="${m}" stroke-width="1.9"/></g><g class="sr-wing-mid-l"><path d="M31 31 C19 25, 6 28, 7 37 C12 38, 16 37, 19 41 C23 40, 27 38, 31 35" stroke="${m}" stroke-width="2.1"/></g><g class="sr-wing-mid-r"><path d="M49 31 C61 25, 74 28, 73 37 C68 38, 64 37, 61 41 C57 40, 53 38, 49 35" stroke="${m}" stroke-width="2.1"/></g><circle cx="40" cy="24" r="9.2" stroke="${m}" stroke-width="2.1"/><g class="sr-eye"><path d="M36 23.5 Q37 21.5 38 23.5 M42 23.5 Q43 21.5 44 23.5" stroke="${p}" stroke-width="1.8"/><path d="M38.5 27 Q40 28.5 41.5 27" stroke="${m}" stroke-width="1.5"/></g><path d="M34 33 L30 46 Q40 50 50 46 L46 33" stroke="${m}" stroke-width="1.9"/></svg>`
        : `<svg viewBox="0 0 80 64" fill="none" stroke-linecap="round" stroke-linejoin="round"><g class="sr-halo"><path d="M40 4 L42 9 L47 10 L42 11 L40 16 L38 11 L33 10 L38 9 Z" stroke="${p}" stroke-width="1.6"/></g><g class="sr-wing-mid-l"><path d="M24 29 C13 21, 5 25, 7 34 C12 36, 17 34, 21 37" stroke="${m}" stroke-width="2.0"/></g><g class="sr-wing-mid-r"><path d="M56 29 C67 21, 75 25, 73 34 C68 36, 63 34, 59 37" stroke="${m}" stroke-width="2.0"/></g><ellipse cx="40" cy="33" rx="16" ry="9" transform="rotate(-24 40 33)" stroke="${p}" stroke-width="1.85"/><ellipse cx="40" cy="33" rx="16" ry="9" transform="rotate(24 40 33)" stroke="${m}" stroke-width="1.85"/><circle cx="40" cy="33" r="6.8" stroke="${m}" stroke-width="2.0"/></svg>`;

  function spawnSeraphSpark(x, y, col, burst = false) {
    if (!seraphLayer || calmOn) return;
    if (!burst && seraphLayer.querySelectorAll('.z3-seraph-spark').length > 10) return;
    const sp = document.createElement('span');
    sp.className = 'z3-seraph-spark';
    sp.textContent = pick(burst ? ['✦', '✧', 'ᛟ', '☽', '⌖', '╳', '†'] : ['✦', '✧', 'ᛟ', '·']);
    sp.style.left = `${x}px`; sp.style.top = `${y}px`; sp.style.color = col;
    if (burst) sp.style.fontSize = `${Math.round(rand(13, 20))}px`;
    seraphLayer.appendChild(sp);
    setTimeout(() => sp.remove(), 750);
  }

  function updateBossHud() {
    const hud = $('z3-boss-hud');
    if (!hud) return;
    if (!activeBoss || activeBoss.dead) { hud.classList.add('hidden'); return; }
    hud.classList.remove('hidden');
    if ($('z3-boss-hp-txt')) $('z3-boss-hp-txt').textContent = `HP: ${activeBoss.hp} / 3`;
    if ($('z3-boss-hp-bar')) $('z3-boss-hp-bar').style.width = `${(activeBoss.hp / 3) * 100}%`;
  }

  function spawnArchSeraphBoss() {
    if (!seraphLayer || activeBoss) return;
    const el = document.createElement('div');
    el.className = 'z3-seraph is-boss';
    el.style.setProperty('--sr-flap', '0.42s');
    el.innerHTML = buildSeraphSVG(0, '#f5d27a', '#ff1f6d', true);
    seraphLayer.appendChild(el);
    const boss = {
      el, isBoss: true, hp: 3, dead: false,
      x: vw / 2, y: 120, vx: rand(-60, 60), vy: rand(20, 50),
      tx: rand(80, vw - 80), ty: rand(100, vh - 120),
      speed: 92, scale: 1.05, bobPhase: 0, bobFreq: 3.4, facing: 1,
      m: '#f5d27a', p: '#ff1f6d', sparkTimer: .4, retargetTimer: 2.2
    };
    el.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      if (boss.dead) return;
      boss.hp--;
      playSfx(boss.hp > 0 ? 'zap' : 'relic');
      el.classList.add('is-hit');
      setTimeout(() => el.classList.remove('is-hit'), 160);
      for (let k = 0; k < 10; k++) spawnSeraphSpark(boss.x + rand(-34, 34), boss.y + rand(-28, 28), k % 2 ? '#f5d27a' : '#ff1f6d', true);
      if (boss.hp <= 0) {
        boss.dead = true; activeBoss = null;
        const idx = seraphs.indexOf(boss); if (idx !== -1) seraphs.splice(idx, 1);
        el.classList.add('is-vanishing'); setTimeout(() => el.remove(), 220);
        seraphKills += 3; lsSet(KEYS.kills, seraphKills); syncKillBadge();
        unlockRelic('boss_slayer');
        showToast('👑 GILDED ARCH-SERAPH BANISHED!', 'You purified Sector 09 (+3 Banishes)!', '#f5d27a');
      } else {
        boss.tx = rand(60, vw - 60); boss.ty = rand(90, vh - 100);
        boss.vx = rand(-140, 140); boss.vy = rand(-110, 110);
      }
      updateBossHud();
    });
    activeBoss = boss;
    seraphs.push(boss);
    updateBossHud();
    playSfx('boss');
    showToast('⚠ GILDED ARCH-SERAPH SUMMONED!', 'Strike it 3 times to banish it!', '#ff1f6d');
  }

  function killSeraph(obj) {
    if (!obj || obj.dead) return;
    obj.dead = true;
    const idx = seraphs.indexOf(obj); if (idx !== -1) seraphs.splice(idx, 1);
    playSfx('zap');
    const sc = vw < 768 ? 4 : 8;
    for (let k = 0; k < sc; k++) spawnSeraphSpark(obj.x + rand(-18, 18), obj.y + rand(-16, 16), k % 2 ? obj.p : obj.m, true);
    obj.el.classList.add('is-vanishing');
    obj.el.style.transform = `translate3d(${(obj.x - 36).toFixed(1)}px,${(obj.y - 30).toFixed(1)}px,0) scale(.15) rotate(45deg)`;
    setTimeout(() => obj.el.remove(), 180);

    seraphKills++; lsSet(KEYS.kills, seraphKills); syncKillBadge();
    if (seraphKills >= 5) unlockRelic('seraph_slayer');
    if (seraphKills % 7 === 0 && !activeBoss) spawnArchSeraphBoss();
  }

  function pickWp() {
    const pad = vw < 768 ? 26 : 42;
    return { x: rand(pad, Math.max(pad + 40, vw - pad)), y: rand(68, Math.max(108, vh - (vw < 768 ? 100 : 60))) };
  }

  function initSeraphims() {
    if (!seraphLayer) return;
    seraphLayer.innerHTML = ''; seraphs.length = 0; activeBoss = null; updateBossHud();
    const mob = vw < 768, cnt = mob ? 4 : 7;
    const pairs = [['#39ff14', '#00f0ff', 'rgba(57,255,20,.88)'], ['#00f0ff', '#ff1f6d', 'rgba(0,240,255,.88)'], ['#39ff14', '#f5d27a', 'rgba(245,210,122,.88)'], ['#ff4da6', '#39ff14', 'rgba(255,31,109,.88)'], ['#c084fc', '#39ff14', 'rgba(192,132,252,.88)']];
    for (let i = 0; i < cnt; i++) {
      const [m, p, glow] = pairs[i % pairs.length];
      const el = document.createElement('div');
      el.className = 'z3-seraph';
      el.style.setProperty('--sr-glow', glow);
      el.style.setProperty('--sr-flap', `${rand(.46, .74).toFixed(2)}s`);
      el.innerHTML = buildSeraphSVG(i % 3, m, p, false);
      seraphLayer.appendChild(el);
      const st = pickWp(), tg = pickWp();
      const obj = { el, isBoss: false, dead: false, x: st.x, y: st.y, vx: rand(-30, 30), vy: rand(-24, 24), tx: tg.x, ty: tg.y, speed: mob ? rand(46, 72) : rand(38, 66), scale: rand(.84, 1.12), bobPhase: rand(0, 6.28), bobFreq: rand(2.2, 3.6), facing: 1, m, p, sparkTimer: rand(1.1, 2.8), retargetTimer: rand(2.4, 5.4) };
      el.addEventListener('pointerdown', (e) => { e.stopPropagation(); killSeraph(obj); });
      seraphs.push(obj);
    }
  }

  function updateSeraphims(dt, t) {
    if (calmOn) return;
    const mob = vw < 768, boost = chaosOn ? 2.1 : 1;
    for (let i = seraphs.length - 1; i >= 0; i--) {
      const s = seraphs[i]; if (s.dead) continue;
      s.retargetTimer -= dt;
      const dx = s.tx - s.x, dy = s.ty - s.y, dist = Math.hypot(dx, dy);
      if (dist < 38 || s.retargetTimer <= 0) { const wp = pickWp(); s.tx = wp.x; s.ty = wp.y; s.retargetTimer = rand(2.4, 5.6); }
      s.vx += (((dx / (dist || 1)) * s.speed * boost) - s.vx) * Math.min(1, dt * 1.45);
      s.vy += (((dy / (dist || 1)) * s.speed * boost) - s.vy) * Math.min(1, dt * 1.45);
      if (!mob && !s.isBoss) {
        const pdx = s.x - ptrX, pdy = s.y - ptrY, pDist = Math.hypot(pdx, pdy);
        if (pDist < 95 && pDist > 1) { const push = ((95 - pDist) / 95) * 180 * dt; s.vx += (pdx / pDist) * push; s.vy += (pdy / pDist) * push; }
      }
      const spd = Math.hypot(s.vx, s.vy), maxS = (s.isBoss ? 150 : 120) * boost;
      if (spd > maxS) { s.vx = (s.vx / spd) * maxS; s.vy = (s.vy / spd) * maxS; }
      s.x += s.vx * dt; s.y += s.vy * dt;
      if (s.x < 24) { s.x = 24; s.vx = Math.abs(s.vx); }
      if (s.x > vw - 24) { s.x = vw - 24; s.vx = -Math.abs(s.vx); }
      if (s.y < 54) { s.y = 54; s.vy = Math.abs(s.vy); }
      if (s.y > vh - 46) { s.y = vh - 46; s.vy = -Math.abs(s.vy); }
      if (Math.abs(s.vx) > 6) s.facing = s.vx >= 0 ? 1 : -1;
      const bob = Math.sin(t * s.bobFreq + s.bobPhase) * 6.5;
      const hw = s.isBoss ? 59 : 36, hh = s.isBoss ? 49 : 30;
      s.el.style.transform = `translate3d(${(s.x - hw).toFixed(1)}px,${(s.y - hh + bob).toFixed(1)}px,0) scale(${(s.scale * s.facing).toFixed(2)},${s.scale.toFixed(2)}) rotate(${Math.max(-18, Math.min(18, s.vx * .14 * s.facing)).toFixed(1)}deg)`;
      if ((s.sparkTimer -= dt) <= 0) { s.sparkTimer = rand(mob ? 1.8 : 1.2, mob ? 3.6 : 2.8); spawnSeraphSpark(s.x, s.y + bob, Math.random() < .5 ? s.m : s.p); }
    }
  }

  let animLast = 0, animElapsed = 0;
  function animTick(ts) {
    requestAnimationFrame(animTick);
    if (document.hidden || calmOn) { animLast = ts; return; }
    if (!animLast) animLast = ts;
    if (vw < 768 && (ts - animLast) < 32) return; // Smooth ~30fps cap on mobile
    const dt = Math.min(.05, Math.max(.001, (ts - animLast) / 1000));
    animLast = ts; animElapsed += dt;
    drawOccultVeil(dt, animElapsed);
    updateSeraphims(dt, animElapsed);
  }

  /* =========================================================================
     19. HACKER CLI TERMINAL (↑/↓ HISTORY) + KONAMI CODE (↑↑↓↓←→←→BA)
     ========================================================================= */
  const cliOut = $('cli-output'), cliIn = $('cli-input');
  const cliHistory = [];
  let cliHistIdx = -1;

  const logCli = (txt) => {
    if (!cliOut) return;
    cliOut.classList.remove('hidden');
    cliOut.textContent = (cliOut.textContent ? cliOut.textContent + '\n' : '') + txt;
    cliOut.scrollTop = cliOut.scrollHeight;
  };

  function triggerKonamiVault() {
    lsSet(KEYS.konamiUnlocked, '1');
    $('btn-track-konami')?.classList.remove('hidden');
    unlockRelic('root_access');
    setModal($('konami-modal'), true);
  }

  const KONAMI_SEQ = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiPos = 0;
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      $$('.app-modal').forEach((m) => setModal(m, false));
      $('z3-ad-dir-modal')?.classList.remove('is-open');
      $('z3-mob-sheet-backdrop')?.classList.remove('is-open');
      $('z3-bios-overlay')?.classList.add('is-hidden');
      if (chaosOn) setChaos(false);
    }
    if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (k === KONAMI_SEQ[konamiPos]) {
      konamiPos++;
      if (konamiPos === KONAMI_SEQ.length) { konamiPos = 0; triggerKonamiVault(); }
    } else konamiPos = 0;
  });

  cliIn?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && cliHistory.length) {
      e.preventDefault();
      cliHistIdx = cliHistIdx <= 0 ? cliHistory.length - 1 : cliHistIdx - 1;
      cliIn.value = cliHistory[cliHistIdx];
    } else if (e.key === 'ArrowDown' && cliHistory.length) {
      e.preventDefault();
      cliHistIdx = cliHistIdx >= cliHistory.length - 1 ? 0 : cliHistIdx + 1;
      cliIn.value = cliHistory[cliHistIdx];
    }
  });

  $('cli-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const raw = cliIn?.value.trim(); if (!raw) return;
    cliHistory.push(raw); cliHistIdx = cliHistory.length;
    cliIn.value = '';
    const cmd = raw.toLowerCase();
    logCli(`$ ${raw}`); playSfx('click');

    if (cmd === 'help') logCli('COMMANDS: help | neofetch | ls | cat manifesto.txt | whoami | badges | boss | tarot | aura | chaos | bios | sync | resetads | seraph | veil | konami | secret | theme acid|rust|pink|cyan | clear');
    else if (cmd === 'clear') { if (cliOut) { cliOut.textContent = ''; cliOut.classList.add('hidden'); } }
    else if (cmd === 'ls') logCli('index.html   styles.css   app.js   console.html   feed.xml   data/updates.json');
    else if (cmd === 'whoami') logCli(`${currentUserId} // GUEST VISITOR IN SECTOR 09 (RELICS: ${unlockedRelics.size}/${RELIC_DEFS.length})`);
    else if (cmd === 'cat manifesto.txt') logCli((siteData.directory?.manifestoParagraphs || []).join('\n\n'));
    else if (cmd === 'neofetch') {
      const op = siteData.operator || {};
      logCli(`  .---.    ${op.alias || 'z3itq3ist'}@SECTOR_09\n / o x \\   ----------------------\n |  ^  |   OS: RUNE_OS // SCRAP-9\n  \\===/    LUNAR: ${$('live-lunar-badge')?.textContent || 'SYNCED'}\n  /| |\\    DISPLAY: ${DISPLAY_MODES[dispIdx].toUpperCase()} | BANISHED: ${seraphKills}\n           RELICS: ${unlockedRelics.size}/${RELIC_DEFS.length} | HOST: GITHUB PAGES`);
    }
    else if (cmd === 'badges') { syncRelicsUI(); setModal($('relics-modal'), true); logCli(`>> Opening Relic Case (${unlockedRelics.size}/${RELIC_DEFS.length} unlocked)...`); }
    else if (cmd === 'boss') { spawnArchSeraphBoss(); logCli('>> WARNING: Gilded Arch-Seraph summoned!'); }
    else if (cmd === 'aura') { logCli('>> Launching biometric occult scanner...'); runAuraScan(); }
    else if (cmd === 'tarot') logCli(`>> [TAROT] ${pullTarot(1)}`);
    else if (cmd === 'chaos') { setChaos(!chaosOn); logCli(`>> WILD CHAOS OVERDRIVE: ${chaosOn ? 'ENGAGED' : 'TERMINATED'}.`); }
    else if (cmd === 'bios') { runBiosBoot(true); logCli('>> Replaying salvaged BIOS POST sequence...'); }
    else if (cmd === 'sync') { logCli('>> Re-fetching ./data/updates.json...'); fetchUpdatesJson(true); }
    else if (cmd === 'resetads') { resetAllAds(); logCli('>> All dismissed inline & pop-up ads restored.'); }
    else if (cmd === 'seraph' || cmd === 'seraphs') { if (!seraphs.length) initSeraphims(); else seraphLayer?.classList.toggle('hidden'); logCli('>> Seraphim flock toggled.'); }
    else if (cmd === 'veil' || cmd === 'margins') { veilCanvas?.classList.toggle('hidden'); logCli('>> Occult margin veil toggled.'); }
    else if (cmd === 'konami') { triggerKonamiVault(); logCli('>> KONAMI GLITCH VAULT OPENED.'); }
    else if (cmd === 'secret') { unlockRelic('root_access'); logCli('>> [BACKDOOR UNLOCKED] "ᛟ Long live the weird web & permanent personal shrines. ᛟ"'); }
    else if (cmd.startsWith('theme ')) {
      const arg = cmd.slice(6).trim();
      if (['acid', 'rust', 'pink', 'cyan'].includes(arg)) {
        arg === 'acid' ? document.body.removeAttribute('data-accent') : document.body.setAttribute('data-accent', arg);
        logCli(`>> Accent shifted to [${arg.toUpperCase()}].`);
      } else logCli('>> Try: theme acid | theme rust | theme pink | theme cyan');
    } else logCli(`>> Unknown command: "${raw}". Type 'help' for valid rituals.`);
  });

  /* =========================================================================
     20. MOBILE VIEW OPTIMIZER (< 1024px) — UNTOUCHED ON DESKTOP
     ========================================================================= */
  const mobileMQ = window.matchMedia('(max-width: 1023px)');
  const mobBackdrop = $('z3-mob-sheet-backdrop'), mobTitle = $('z3-mob-sheet-title'), mobBody = $('z3-mob-sheet-body');
  const closeMobSheet = () => mobBackdrop?.classList.remove('is-open');

  function openMobSheet(mode) {
    if (!mobBackdrop || !mobTitle || !mobBody) return;
    mobBody.innerHTML = '';
    if (mode === 'portals') {
      mobTitle.textContent = '⌖ JUMP TO SECTOR PORTAL';
      const curTab = document.querySelector('.tab-panel:not(.hidden)')?.id.replace(/^tab-/, '') || 'manifesto';
      [
        ['manifesto', '#39ff14', 'ᛟ MANIFESTO', 'Currently, Zine & Archive'],
        ['media',     '#00f0ff', '♪ MEDIA VAULT', 'Spotify, Books & VHS'],
        ['tv',        '#ff1f6d', '▣ PIRATE TV', '4 Static CRT Channels'],
        ['gifs',      '#ff1f6d', '✦ ORACLE & ALTAR', 'Tarot, Candles & GIFs'],
        ['locker',    '#d48c28', '✂ CYBER LOCKER', 'Persistent Board & Stamps'],
        ['webring',   '#39ff14', '⛨ SIGNAL RELAYS', 'Socials, Webring & Guestbook']
      ].forEach(([id, acc, t, sub]) => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = `z3-sheet-card ${curTab === id ? 'is-current' : ''}`;
        b.style.setProperty('--card-accent', acc);
        b.innerHTML = `<span class="text-[11px] font-bold" style="color:${acc}">${t}</span><span class="text-[10px] text-bone/75 font-typewriter">${sub}</span>`;
        b.addEventListener('click', () => { closeMobSheet(); switchTab(id, true); });
        mobBody.appendChild(b);
      });
    } else {
      mobTitle.textContent = '✦ QUICK TOOLS & RITUALS';
      [
        ['#ff1f6d', '⌖ SCAN AURA', 'Biometric occult scan', () => { closeMobSheet(); runAuraScan(); }],
        ['#39ff14', '✦ 3-CARD TAROT', 'Pull Major Arcana spread', () => { closeMobSheet(); switchTab('gifs', true); tarotMode = 3; syncTarotModeBtns(); pullTarot(3); }],
        ['#f5d27a', '🏆 RELIC CASE', 'View 7 achievements', () => { closeMobSheet(); syncRelicsUI(); setModal($('relics-modal'), true); }],
        ['#ff1f6d', '⚡ WILD CHAOS', 'Toggle Glitch Overdrive', () => { closeMobSheet(); setChaos(!chaosOn); }],
        ['#00f0ff', '⛨ AD DIRECTORY', 'Browse or restore 15 ads', () => { closeMobSheet(); $('z3-ad-dir-dock')?.click(); }],
        ['#d48c28', '⌖ OPERATOR CMS', 'Open console.html', () => { location.href = './console.html'; }]
      ].forEach(([acc, t, sub, fn]) => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'z3-sheet-card'; b.style.setProperty('--card-accent', acc);
        b.innerHTML = `<span class="text-[11px] font-bold" style="color:${acc}">${t}</span><span class="text-[10px] text-bone/75 font-typewriter">${sub}</span>`;
        b.addEventListener('click', fn);
        mobBody.appendChild(b);
      });
    }
    mobBackdrop.classList.add('is-open');
  }

  $('z3-mob-sheet-close')?.addEventListener('click', closeMobSheet);
  mobBackdrop?.addEventListener('click', (e) => { if (e.target === mobBackdrop) closeMobSheet(); });
  $('z3-mob-dock')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.z3-mob-dock-btn'); if (!btn) return;
    $$('.z3-mob-dock-btn').forEach((b) => b.classList.toggle('is-active', b === btn));
    const act = btn.dataset.mobAction;
    if (act === 'portals') openMobSheet('portals');
    else if (act === 'tools') openMobSheet('tools');
    else if (act === 'synth') { closeMobSheet(); $('section-signal-deck')?.classList.remove('z3-mob-collapsed'); $('section-signal-deck')?.scrollIntoView({ behavior: 'smooth' }); }
    else if (act === 'chat')  { closeMobSheet(); $('section-blackbox-chat')?.classList.remove('z3-mob-collapsed'); $('section-blackbox-chat')?.scrollIntoView({ behavior: 'smooth' }); }
    else if (act === 'top')   { closeMobSheet(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  });

  const accordionSpecs = [
    ['section-sector-directory', true], ['section-signal-deck', false], ['section-operator-tag', false],
    ['section-stamps-wall', true], ['section-sigil-radar', true], ['section-blackbox-chat', false], ['section-visitor-log', true]
  ];
  accordionSpecs.forEach(([id, defCol]) => {
    const el = $(id), hdr = el?.firstElementChild;
    if (!el || !hdr) return;
    hdr.classList.add('z3-mob-collapsible-hdr');
    const ch = document.createElement('span'); ch.className = 'z3-mob-chevron'; ch.textContent = '▾';
    hdr.appendChild(ch);
    hdr.addEventListener('click', (e) => { if (mobileMQ.matches && !e.target.closest('a,button')) el.classList.toggle('z3-mob-collapsed'); });
    if (mobileMQ.matches && defCol) el.classList.add('z3-mob-collapsed');
  });
  mobileMQ.addEventListener?.('change', () => {
    if (!mobileMQ.matches) {
      closeMobSheet();
      accordionSpecs.forEach(([id]) => $(id)?.classList.remove('z3-mob-collapsed'));
    }
  });

  /* =========================================================================
     21. LIVE DATA FETCH & MASTER BOOT
     ========================================================================= */
  function fetchUpdatesJson(notify = false) {
    return fetch(`./data/updates.json?t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json) {
          applySiteData(json, false);
          if (notify) showToast('ᛟ NODE RE-SYNCED', 'Loaded latest data/updates.json!', '#39ff14');
        } else {
          applySiteData(FALLBACK_SITE_DATA, true);
        }
      })
      .catch(() => applySiteData(FALLBACK_SITE_DATA, true));
  }

  let resizeT = null;
  window.addEventListener('resize', () => {
    updateTelemetry();
    if (!$('tab-locker')?.classList.contains('hidden')) clampLockerItems();
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      buildOccultScene();
      if (chaosOn) { resizeMatrix(); startChaosMode(); }
    }, 220);
  });

  syncRelicsUI();
  buildOccultScene();
  initSeraphims();
  requestAnimationFrame(animTick);
  runBiosBoot(false);
  fetchUpdatesJson(false).finally(() => {
    setTimeout(() => { if (!document.hidden && !calmOn) spawnRandomPopup(); schedulePopups(); }, 2600);
  });
})();

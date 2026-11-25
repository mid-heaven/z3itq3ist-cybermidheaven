/* ============================================================================
   z3itq3ist // MAXED-OUT APPLICATION ENGINE (app.js)
   Pure GitHub Pages Edition — Zero Build Step, Zero External Servers
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
    konamiUnlocked:'z3_konami_unlocked_v3'
  };

  const readJson = (k, fallback) => {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  };
  const writeJson = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  const currentUserId = 'NODE-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  let siteData = null;
  let chaosOn = false;
  let calmOn = false;
  let sfxOn = localStorage.getItem(KEYS.sfx) !== '0';
  let displayMode = localStorage.getItem(KEYS.display) || 'crt';
  let seraphKills = Number(localStorage.getItem(KEYS.kills) || 0) || 0;
  let konamiUnlocked = localStorage.getItem(KEYS.konamiUnlocked) === '1';
  let cipherList = [
    'ᛟ [DECRYPTED 01/04]: The weird web never died—it just went underground behind rusted firewalls.',
    '☽ [DECRYPTED 02/04]: Banish 7 flying seraphims to summon the Gilded Arch-Seraph Boss.',
    '⛨ [DECRYPTED 03/04]: Try the Konami Code (↑↑↓↓←→←→BA) to unlock the hidden Glitch Vault.',
    '⌖ [DECRYPTED 04/04]: Long live hand-coded HTML, weird shrines, and permanent personal archives.'
  ];
  let cipherIdx = 0;

  /* ==========================================================================
     01. RETRO UI SOUND FOLEY PACK (SAFE LAZY TONE.JS / WEB AUDIO)
     ========================================================================== */
  let sfxCtx = null;
  function getSfxCtx() {
    if (!sfxOn) return null;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!sfxCtx) sfxCtx = new AC();
      if (sfxCtx.state === 'suspended') sfxCtx.resume().catch(() => {});
      return sfxCtx;
    } catch { return null; }
  }

  function playFoley(kind = 'click') {
    if (!sfxOn) return;
    const ac = getSfxCtx();
    if (!ac) return;
    try {
      const now = ac.currentTime;
      const tone = (freq, endFreq, dur, type = 'square', vol = 0.055, delay = 0) => {
        const osc = ac.createOscillator();
        const g = ac.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now + delay);
        if (endFreq !== freq) osc.frequency.exponentialRampToValueAtTime(Math.max(30, endFreq), now + delay + dur);
        g.gain.setValueAtTime(vol, now + delay);
        g.gain.exponentialRampToValueAtTime(0.0008, now + delay + dur);
        osc.connect(g).connect(ac.destination);
        osc.start(now + delay);
        osc.stop(now + delay + dur + 0.02);
      };

      if (kind === 'click') {
        tone(680, 220, 0.045, 'square', 0.04);
      } else if (kind === 'static') {
        const len = Math.floor(ac.sampleRate * 0.14);
        const buf = ac.createBuffer(1, len, ac.sampleRate);
        const ch = buf.getChannelData(0);
        for (let i = 0; i < len; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / len);
        const src = ac.createBufferSource();
        src.buffer = buf;
        const g = ac.createGain();
        g.gain.setValueAtTime(0.06, now);
        src.connect(g).connect(ac.destination);
        src.start(now);
      } else if (kind === 'tarot') {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, f * 1.02, 0.22, 'triangle', 0.045, i * 0.055));
      } else if (kind === 'zap') {
        tone(960, 140, 0.14, 'sawtooth', 0.06);
        tone(1420, 320, 0.11, 'triangle', 0.04, 0.02);
      } else if (kind === 'flame') {
        tone(220, 540, 0.12, 'triangle', 0.045);
      } else if (kind === 'fanfare') {
        [440, 554.37, 659.25, 880].forEach((f, i) => tone(f, f, 0.25, 'square', 0.045, i * 0.075));
      }
    } catch {}
  }

  /* ==========================================================================
     02. HIDDEN RELIC ACHIEVEMENTS CASE & RETRO TOASTS
     ========================================================================== */
  const RELICS_CATALOG = [
    { id: 'seraph_slayer',   icon: '✦', name: 'SERAPH SLAYER',        desc: 'Banish 5 flying chibi seraphims.' },
    { id: 'arch_vanquisher', icon: '👑', name: 'ARCH-SERAPH BANE',     desc: 'Defeat the rare Gilded Arch-Seraph Boss.' },
    { id: 'chaos_survivor',  icon: '⚡', name: 'CHAOS SURVIVOR',       desc: 'Trigger Chaos Overdrive on the node.' },
    { id: 'fortune_seeker',  icon: '☽', name: 'FORTUNE SEEKER',       desc: 'Consult the Major Arcana Tarot Oracle.' },
    { id: 'altar_keeper',    icon: '🕯', name: 'ALTAR KEEPER',         desc: 'Light all 3 candles & incense on the Altar.' },
    { id: 'ad_exterminator', icon: '⛨', name: 'AD EXTERMINATOR',      desc: 'Permanently banish 5 popup or inline ads.' },
    { id: 'root_access',     icon: 'ᛟ', name: 'ROOT ACCESS',          desc: 'Unlock a secret CLI ritual or Konami Vault.' }
  ];
  const unlockedRelics = new Set(readJson(KEYS.relics, []));

  function showToast(title, sub, tone = 'acid') {
    const stack = $('z3-toast-stack');
    if (!stack) return;
    const t = document.createElement('div');
    t.className = 'z3-toast rounded-sm';
    const col = tone === 'gold' ? 'text-gold' : tone === 'pink' ? 'text-pink' : 'text-acid';
    t.innerHTML = `<div class="text-[11px] font-bold ${col} tracking-wider">${esc(title)}</div><div class="text-[10px] text-bone/85 mt-0.5">${esc(sub)}</div>`;
    stack.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => t.remove(), 320); }, 3600);
  }

  function updateRelicsUI() {
    const btn = $('btn-relics-open');
    if (btn) {
      const txt = `🏆 ${unlockedRelics.size}/${RELICS_CATALOG.length}`;
      btn.textContent = txt;
      btn.setAttribute('data-ghost', txt);
    }
    const prog = $('relics-progress');
    if (prog) prog.textContent = `RELICS UNLOCKED: ${unlockedRelics.size} / ${RELICS_CATALOG.length}`;
    const grid = $('relics-grid');
    if (!grid) return;
    grid.innerHTML = RELICS_CATALOG.map((r) => {
      const ok = unlockedRelics.has(r.id);
      return `
        <div class="rounded-sm border ${ok ? 'border-acid bg-acid/10' : 'border-rust/35 bg-void opacity-60'} p-2.5 space-y-1">
          <div class="flex items-center justify-between font-tech text-xs">
            <span class="${ok ? 'text-gold' : 'text-ash'} font-bold">${r.icon} ${esc(r.name)}</span>
            <span class="text-[9px] px-1.5 py-0.5 border ${ok ? 'border-acid text-acid' : 'border-rust/40 text-ash'}">${ok ? 'UNLOCKED' : 'LOCKED'}</span>
          </div>
          <p class="text-[11px] font-typewriter text-bone/80">${esc(r.desc)}</p>
        </div>
      `;
    }).join('');
  }

  function unlockRelic(id) {
    if (unlockedRelics.has(id)) return;
    const item = RELICS_CATALOG.find((r) => r.id === id);
    if (!item) return;
    unlockedRelics.add(id);
    writeJson(KEYS.relics, [...unlockedRelics]);
    updateRelicsUI();
    playFoley('fanfare');
    showToast(`🏆 RELIC UNLOCKED: ${item.name}`, item.desc, 'gold');
  }
  updateRelicsUI();

  /* ==========================================================================
     03. RETRO BIOS POST BOOT SEQUENCE (ONCE PER SESSION, SKIPPABLE)
     ========================================================================== */
  let biosTimers = [];
  function hideBios() {
    biosTimers.forEach(clearTimeout);
    biosTimers = [];
    const ov = $('z3-bios-overlay');
    if (ov) {
      ov.classList.add('is-hidden');
      setTimeout(() => ov.classList.add('hidden'), 360);
    }
    try { sessionStorage.setItem('z3_bios_seen', '1'); } catch {}
  }

  function runBiosBoot(force = false) {
    const ov = $('z3-bios-overlay');
    const log = $('z3-bios-log');
    if (!ov || !log) return;
    if (!force) {
      try { if (sessionStorage.getItem('z3_bios_seen') === '1' || calmOn) { ov.classList.add('hidden'); return; } } catch {}
    }
    biosTimers.forEach(clearTimeout);
    biosTimers = [];
    ov.classList.remove('hidden', 'is-hidden');
    log.textContent = '';

    const lines = [
      'Z3IT_BIOS v09.44 (C) 1999-2026 SALVAGED HARDWARE CORP.',
      'CHECKING SALVAGED RAM........ 666 KB OK',
      'MOUNTING PAGAN_FIREWALL...... [ACTIVE]',
      'SYNCING GITHUB_PAGES NODE.... [OK]',
      'CALIBRATING SERAPHIM RADAR... [TRACKING]',
      '>> BOOTING SECTOR 09 SHRINE...'
    ];
    lines.forEach((ln, idx) => {
      biosTimers.push(setTimeout(() => {
        log.textContent += (idx ? '\n' : '') + ln;
      }, idx * 230));
    });
    biosTimers.push(setTimeout(hideBios, 1850));
  }
  $('btn-bios-skip')?.addEventListener('click', () => { playFoley('click'); hideBios(); });

  /* ==========================================================================
     04. TOP BAR CONTROLS: DISPLAY RACK, SFX, CALM MODE, CLOCK, MOON, MODALS
     ========================================================================== */
  const DISPLAY_MODES = ['crt', 'phosphor', 'amber', 'clean'];
  function applyDisplayMode(mode) {
    displayMode = DISPLAY_MODES.includes(mode) ? mode : 'crt';
    document.body.setAttribute('data-display', displayMode);
    try { localStorage.setItem(KEYS.display, displayMode); } catch {}
    const btn = $('btn-display-mode');
    if (btn) {
      const label = `DISP: ${displayMode.toUpperCase()}`;
      btn.textContent = label;
      btn.setAttribute('data-ghost', label);
    }
  }
  applyDisplayMode(displayMode);
  $('btn-display-mode')?.addEventListener('click', () => {
    const next = DISPLAY_MODES[(DISPLAY_MODES.indexOf(displayMode) + 1) % DISPLAY_MODES.length];
    applyDisplayMode(next);
    playFoley('click');
  });

  function syncSfxUI() {
    const btn = $('btn-sfx-toggle');
    if (!btn) return;
    const lbl = sfxOn ? 'SFX: ON' : 'SFX: OFF';
    btn.textContent = lbl;
    btn.setAttribute('data-ghost', lbl);
    btn.classList.toggle('opacity-60', !sfxOn);
  }
  syncSfxUI();
  $('btn-sfx-toggle')?.addEventListener('click', () => {
    sfxOn = !sfxOn;
    try { localStorage.setItem(KEYS.sfx, sfxOn ? '1' : '0'); } catch {}
    syncSfxUI();
    if (sfxOn) playFoley('click');
  });

  function applyCalmMode(on) {
    calmOn = Boolean(on);
    document.body.classList.toggle('calm-mode', calmOn);
    const btn = $('btn-calm-toggle');
    if (btn) {
      const lbl = calmOn ? 'CALM: ON' : 'CALM: OFF';
      btn.textContent = lbl;
      btn.setAttribute('data-ghost', lbl);
      btn.classList.toggle('bg-rust', calmOn);
      btn.classList.toggle('text-void', calmOn);
    }
  }
  const savedCalm = localStorage.getItem(KEYS.calm);
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  applyCalmMode(savedCalm === null ? prefersReduced : savedCalm === '1');
  $('btn-calm-toggle')?.addEventListener('click', () => {
    applyCalmMode(!calmOn);
    try { localStorage.setItem(KEYS.calm, calmOn ? '1' : '0'); } catch {}
    playFoley('click');
  });

  // Boot BIOS after checking calm mode
  runBiosBoot(false);

  // Clock, Telemetry & Real-Time Moon Phase
  const liveClockEl = $('live-clock');
  function updateClock() {
    if (!liveClockEl) return;
    const t = new Date().toTimeString().slice(0, 8);
    liveClockEl.textContent = t;
    if (chaosOn) liveClockEl.setAttribute('data-ghost', t);
  }
  function updateTelemetry() {
    if ($('stat-res')) $('stat-res').textContent = `${window.innerWidth}x${window.innerHeight}`;
    if ($('stat-tz')) {
      try { $('stat-tz').textContent = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UNKNOWN'; }
      catch { $('stat-tz').textContent = 'UNKNOWN'; }
    }
    if ($('stat-sid')) $('stat-sid').textContent = currentUserId;
  }
  function getMoonPhaseString() {
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
    return `${icon} ${label} (${illum}%)`;
  }
  if ($('live-lunar-badge')) $('live-lunar-badge').textContent = getMoonPhaseString();
  updateClock();
  setInterval(updateClock, 1000);
  updateTelemetry();

  // Unified Modals
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
      if (e.target === m || e.target.closest('[data-close-modal]')) {
        setModal(m, false);
        playFoley('click');
      }
    });
  });
  $('btn-relics-open')?.addEventListener('click', () => { updateRelicsUI(); setModal($('relics-modal'), true); playFoley('click'); });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideBios();
      $$('.app-modal').forEach((m) => setModal(m, false));
      $('z3-ad-dir-modal')?.classList.remove('is-open');
      $('z3-mob-sheet-backdrop')?.classList.remove('is-open');
    }
  });

  // Hero Spotlight
  const heroShrine = $('hero-shrine');
  heroShrine?.addEventListener('pointermove', (e) => {
    const r = heroShrine.getBoundingClientRect();
    heroShrine.style.setProperty('--hx', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`);
    heroShrine.style.setProperty('--hy', `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`);
  });

  /* ==========================================================================
     05. DIRECTORY TABS, WINDOW CHROME, STAMPS, WEBRING & SIDEBAR AD
     ========================================================================== */
  const navBtns = $$('.nav-tab-btn');
  const tabTitles = {
    manifesto: 'C:\\Z3ITQ3IST\\MANIFESTO.TXT',
    media:     'C:\\Z3ITQ3IST\\MEDIA_VAULT\\',
    tv:        'C:\\Z3ITQ3IST\\PIRATE_TV.EXE',
    gifs:      'C:\\Z3ITQ3IST\\ORACLE_ALTAR\\',
    locker:    'C:\\Z3ITQ3IST\\CYBER_LOCKER\\',
    webring:   'C:\\Z3ITQ3IST\\SIGNAL_RELAYS.URL'
  };

  function switchTab(target, scrollToIsland = false) {
    const btn = navBtns.find((b) => b.dataset.tab === target);
    if (!btn) return;
    navBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
    $$('.tab-panel').forEach((p) => p.classList.toggle('hidden', p.id !== `tab-${target}`));
    if (tabTitles[target] && $('window-title')) $('window-title').textContent = tabTitles[target];
    playFoley('click');
    if (target === 'locker') setTimeout(clampLockerItems, 40);
    if (scrollToIsland) ($('main-island-anchor') || document.querySelector('.main-island'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  navBtns.forEach((btn) => btn.addEventListener('click', () => switchTab(btn.dataset.tab, window.innerWidth < 1024)));

  const chromeAlerts = {
    min:   'Minimize denied. Sector 09 remains permanently open.',
    max:   'Window already maximized beyond corporate web standards.',
    close: 'Nice try—there is no escape from the cyber-occult shrine.'
  };
  $$('[data-chrome]').forEach((b) => b.addEventListener('click', () => {
    playFoley('click');
    showModal('⚠ WINDOW_INTERCEPT', chromeAlerts[b.dataset.chrome] || 'Signal locked.');
  }));

  $('btn-copy-badge')?.addEventListener('click', () => {
    const url = window.location.origin + window.location.pathname;
    const snip = `<a href="${url}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:4px 8px;background:#050607;color:#39ff14;border:1px solid #39ff14;font-family:monospace;font-size:11px;text-decoration:none;">† z3itq3ist †</a>`;
    navigator.clipboard?.writeText(snip).catch(() => {});
    playFoley('click');
    showModal('ᛟ 88x31 BADGE COPIED', `HTML link snippet copied to clipboard!\n\n${snip}`);
  });

  const webringNodes = [
    'Node #08: rust_shrine.github.io',
    'Node #09: z3itq3ist (CURRENT)',
    'Node #10: pagan_modem.neocities.org',
    'Node #11: scrap_oracle.neocities.org',
    'Node #12: deadnet_sigil.org'
  ];
  let webringIdx = 1;
  $$('.webring-btn').forEach((b) => b.addEventListener('click', () => {
    playFoley('click');
    webringIdx = b.dataset.dir === 'prev'
      ? (webringIdx + webringNodes.length - 1) % webringNodes.length
      : b.dataset.dir === 'next'
        ? (webringIdx + 1) % webringNodes.length
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
    if (calmOn) return;
    const [t, s] = sidebarAds[++sbAdIdx % sidebarAds.length];
    if ($('ad-title')) $('ad-title').textContent = t;
    if ($('ad-sub')) $('ad-sub').textContent = s;
  }, 6200);
  $('shady-ad-box')?.addEventListener('click', () => {
    playFoley('click');
    showModal('$$ RELIC_INTERCEPT', 'No malware here—just authentic salvaged wasteland ad chaos.');
  });

  $('btn-decrypt-cipher')?.addEventListener('click', () => {
    playFoley('static');
    if ($('cipher-output') && cipherList.length) {
      $('cipher-output').textContent = cipherList[cipherIdx++ % cipherList.length];
    }
  });

  /* ==========================================================================
     06. TONE.JS SIGNAL DECK (3 TRACKS + SECRET 4TH KONAMI TRACK)
     ========================================================================== */
  const eqBarsSpec = [
    ['bg-acid', 85, 0], ['bg-acid', 60, .12], ['bg-cyan', 95, .25], ['bg-cyan', 70, .08],
    ['bg-pink', 100, .32], ['bg-pink', 55, .18], ['bg-rust', 90, .4], ['bg-acid', 75, .15],
    ['bg-pink', 95, .28], ['bg-cyan', 65, .05], ['bg-rust', 85, .35], ['bg-acid', 70, .2]
  ];
  if ($('eq-container')) {
    $('eq-container').innerHTML = eqBarsSpec.map(([c, h, d]) => `<div class="eq-bar w-full ${c}" style="height:${h}%;animation-delay:${d}s"></div>`).join('');
  }

  const trackLabels = { void: 'VOID_DRONE', acid: 'ACID_HEX', static: 'RITUAL_FM', konami: 'KONAMI_HEX' };
  let audioOn = false, currentTrack = 'void', synthNodes = [], audioLoop = null;

  if (konamiUnlocked) $('btn-track-konami')?.classList.remove('hidden');

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
    const reverb = new Tone.Reverb({ decay: 5.2, wet: .5 }).toDestination();
    const gain = new Tone.Gain(.18).connect(reverb);
    synthNodes.push(reverb, gain);

    if (currentTrack === 'void') {
      const flt = new Tone.Filter(580, 'lowpass').connect(gain);
      const syn = new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'sawtooth' }, envelope: { attack: 1.5, decay: 1, sustain: .65, release: 3 } }).connect(flt);
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
      const lead = new Tone.Synth({ oscillator: { type: 'pulse', width: 0.25 }, envelope: { attack: 0.008, decay: 0.14, sustain: 0.2, release: 0.18 } }).connect(gain);
      const sub = new Tone.Synth({ oscillator: { type: 'triangle' }, envelope: { attack: 0.01, decay: 0.2, sustain: 0.3, release: 0.2 } }).connect(gain);
      synthNodes.push(lead, sub);
      const arp = ['E4', 'G4', 'B4', 'E5', 'D5', 'B4', 'A4', 'G4', 'F#4', 'A4', 'D5', 'F#5', 'E5', 'D5', 'B4', 'G4'];
      const bassNotes = ['E2', 'E2', 'C2', 'C2', 'D2', 'D2', 'B1', 'B1'];
      let step = 0; Tone.Transport.bpm.value = 142;
      audioLoop = new Tone.Loop((t) => {
        lead.triggerAttackRelease(arp[step % arp.length], '16n', t);
        if (step % 2 === 0) sub.triggerAttackRelease(bassNotes[(step / 2) % bassNotes.length], '8n', t);
        step++;
      }, '16n').start(0);
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
      const txt = audioOn ? `♪ ${trackLabels[currentTrack]}` : '♪ MUTED';
      $('btn-top-audio').textContent = txt;
      $('btn-top-audio').setAttribute('data-ghost', txt);
    }
    if ($('audio-status-tag')) {
      $('audio-status-tag').textContent = audioOn ? 'LIVE' : 'STANDBY';
      $('audio-status-tag').classList.toggle('text-acid', audioOn);
      $('audio-status-tag').classList.toggle('text-ash', !audioOn);
    }
    $('eq-container')?.classList.toggle('eq-paused', !audioOn);
    document.querySelector('[data-mob-action="synth"]')?.classList.toggle('is-live', audioOn);
  }

  async function toggleAudio(forceOn = false) {
    try {
      if (!audioOn || forceOn) {
        if (typeof Tone !== 'undefined') await Tone.start();
        audioOn = true;
        startTrack();
      } else {
        audioOn = false;
        disposeAudio();
      }
      syncAudioUI();
    } catch (err) { console.warn('Audio error:', err); }
  }

  function selectTrack(trackId, autoPlay = false) {
    currentTrack = trackId || 'void';
    $$('.track-btn').forEach((b) => {
      const on = b.dataset.track === currentTrack;
      b.classList.toggle('border-cyan', on && trackId !== 'konami');
      b.classList.toggle('bg-cyan/15', on && trackId !== 'konami');
      b.classList.toggle('text-cyan', on && trackId !== 'konami');
      b.classList.toggle('font-bold', on);
      if (!on && b.dataset.track !== 'konami') {
        b.classList.add('border-rust/40', 'bg-void', 'text-ash');
      } else if (b.dataset.track !== 'konami') {
        b.classList.remove('border-rust/40', 'bg-void', 'text-ash');
      }
    });
    if (audioOn || autoPlay) toggleAudio(true);
    else syncAudioUI();
  }

  $('btn-audio-play')?.addEventListener('click', () => toggleAudio(false));
  $('btn-top-audio')?.addEventListener('click', () => toggleAudio(false));
  $$('.track-btn').forEach((b) => b.addEventListener('click', () => { playFoley('click'); selectTrack(b.dataset.track, false); }));

  /* ==========================================================================
     07. 3-CARD TAROT SPREAD + COPY FOR BLACKBOX CHAT
     ========================================================================== */
  const TAROT_DECK = [
    ['0 // THE FOOL', 'New beginnings, innocence, spontaneity, and a leap of faith.', 'Recklessness, hesitation, or ignoring clear warning signs.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#d48c28" stroke-width="1.4"/><circle cx="58" cy="24" r="9" fill="none" stroke="#ffff00" stroke-width="1.6"/><path d="M12,92 L46,92 L58,72 L68,92" fill="none" stroke="#39ff14" stroke-width="1.6"/><circle cx="36" cy="46" r="6" fill="none" stroke="#00f0ff" stroke-width="1.5"/>'],
    ['I // THE MAGICIAN', 'Manifestation, resourcefulness, willpower, and turning ideas into reality.', 'Scattered focus, illusion, or untapped potential.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#39ff14" stroke-width="1.4"/><path d="M26,24 C26,18 36,18 40,24 C44,30 54,30 54,24 C54,18 44,18 40,24 C36,30 26,30 26,24 Z" fill="none" stroke="#00f0ff" stroke-width="1.8"/><line x1="40" y1="36" x2="40" y2="86" stroke="#ff1f6d" stroke-width="2.2"/>'],
    ['II // THE HIGH PRIESTESS', 'Intuition, sacred knowledge, mystery, and trusting your inner voice.', 'Secrets surfacing, ignoring intuition, or hidden agendas.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#00f0ff" stroke-width="1.4"/><rect x="14" y="20" width="12" height="72" fill="none" stroke="#d8d5c8" stroke-width="1.4"/><rect x="54" y="20" width="12" height="72" fill="none" stroke="#d48c28" stroke-width="1.4"/><circle cx="40" cy="44" r="10" fill="none" stroke="#ff1f6d" stroke-width="1.6"/>'],
    ['III // THE EMPRESS', 'Abundance, creativity, nurturing, and sensory beauty.', 'Creative block, burnout, or neglecting self-care.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#39ff14" stroke-width="1.4"/><circle cx="40" cy="42" r="15" fill="none" stroke="#ff1f6d" stroke-width="2"/><path d="M40,57 V86 M29,72 H51" stroke="#ff1f6d" stroke-width="2"/>'],
    ['IV // THE EMPEROR', 'Authority, structure, stability, discipline, and solid foundations.', 'Rigidity, stubborn control, or lack of discipline.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#d48c28" stroke-width="1.4"/><polygon points="20,42 28,22 40,34 52,22 60,42" fill="none" stroke="#ff1f6d" stroke-width="2"/><rect x="22" y="48" width="36" height="40" fill="none" stroke="#d48c28" stroke-width="1.8"/>'],
    ['V // THE HIEROPHANT', 'Tradition, spiritual wisdom, mentorship, and shared lore.', 'Rebellion, unconventional paths, and personal truth.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#d48c28" stroke-width="1.4"/><path d="M40,16 V90 M30,28 H50 M26,40 H54 M22,52 H58" stroke="#00f0ff" stroke-width="1.8"/>'],
    ['VI // THE LOVERS', 'Harmony, deep alignment, partnership, and meaningful choices.', 'Disharmony, imbalance, or a difficult crossroads.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#ff1f6d" stroke-width="1.4"/><path d="M40,86 C20,70 16,52 28,46 C34,43 38,48 40,52 C42,48 46,43 52,46 C64,52 60,70 40,86 Z" fill="none" stroke="#ff1f6d" stroke-width="2"/>'],
    ['VII // THE CHARIOT', 'Determination, triumph, momentum, and self-mastery.', 'Lack of direction, stalled progress, or losing control.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#00f0ff" stroke-width="1.4"/><rect x="20" y="34" width="40" height="36" fill="none" stroke="#39ff14" stroke-width="1.8"/><circle cx="24" cy="80" r="10" fill="none" stroke="#d48c28" stroke-width="1.8"/><circle cx="56" cy="80" r="10" fill="none" stroke="#d48c28" stroke-width="1.8"/>'],
    ['VIII // STRENGTH', 'Courage, inner fortitude, patience, and gentle mastery.', 'Self-doubt, raw emotion, or low energy.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#d48c28" stroke-width="1.4"/><circle cx="40" cy="62" r="20" fill="none" stroke="#d48c28" stroke-width="2" stroke-dasharray="5 3"/><polygon points="40,46 52,72 28,72" fill="none" stroke="#ff1f6d" stroke-width="1.8"/>'],
    ['IX // THE HERMIT', 'Soul-searching, introspection, solitude, and inner illumination.', 'Isolation, withdrawal, or avoiding quiet reflection.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#00f0ff" stroke-width="1.4"/><polygon points="40,18 60,54 40,90 20,54" fill="none" stroke="#d48c28" stroke-width="1.6"/><circle cx="40" cy="54" r="4" fill="#ffff00"/>'],
    ['X // WHEEL OF FORTUNE', 'Destiny, turning points, cycles of luck, and fateful shifts.', 'Resistance to change or breaking an old cycle.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#39ff14" stroke-width="1.4"/><circle cx="40" cy="55" r="26" fill="none" stroke="#d48c28" stroke-width="2"/><path d="M40,29 V81 M14,55 H66 M22,37 L58,73 M58,37 L22,73" stroke="#39ff14" stroke-width="1.3"/>'],
    ['XI // JUSTICE', 'Fairness, truth, clarity, and karmic balance.', 'Avoiding accountability, bias, or imbalance.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#00f0ff" stroke-width="1.4"/><line x1="40" y1="16" x2="40" y2="90" stroke="#d8d5c8" stroke-width="2"/><line x1="16" y1="42" x2="64" y2="42" stroke="#d48c28" stroke-width="1.8"/>'],
    ['XII // THE HANGED MAN', 'Surrender, pause, and seeing the world inverted.', 'Stagnation, indecision, or resisting a needed pause.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#ff1f6d" stroke-width="1.4"/><path d="M16,22 H64 M40,22 V56 L26,44 M40,56 L54,68" fill="none" stroke="#39ff14" stroke-width="2"/><circle cx="40" cy="76" r="11" fill="none" stroke="#ffff00" stroke-width="1.8"/>'],
    ['XIII // DEATH', 'Transformation, endings, renewal, and shedding the old.', 'Clinging to the past or delaying inevitable change.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#ff1f6d" stroke-width="1.4"/><circle cx="40" cy="44" r="18" fill="none" stroke="#d8d5c8" stroke-width="1.8"/><circle cx="33" cy="42" r="4" fill="#39ff14"/><circle cx="47" cy="42" r="4" fill="#39ff14"/>'],
    ['XIV // TEMPERANCE', 'Balance, patience, healing, and alchemy of opposites.', 'Excess, impatience, or clashing frequencies.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#00f0ff" stroke-width="1.4"/><polygon points="40,22 58,54 22,54" fill="none" stroke="#d48c28" stroke-width="1.6"/><polygon points="40,88 58,56 22,56" fill="none" stroke="#00f0ff" stroke-width="1.6"/>'],
    ['XV // THE DEVIL', 'Shadow self, attachment, temptation, or hidden chains.', 'Liberation, breaking chains, and reclaiming power.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#ff1f6d" stroke-width="1.4"/><polygon points="40,88 22,30 62,64 18,64 58,30" fill="none" stroke="#ff1f6d" stroke-width="1.8"/>'],
    ['XVI // THE TOWER', 'Sudden upheaval, revelation, and collapsing false structures.', 'Narrowly avoided disaster or quiet internal overhaul.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#ff1f6d" stroke-width="1.4"/><rect x="28" y="34" width="24" height="58" fill="none" stroke="#d48c28" stroke-width="1.8"/><polyline points="14,14 38,34 31,39 58,64" fill="none" stroke="#ffff00" stroke-width="2.2"/>'],
    ['XVII // THE STAR', 'Hope, inspiration, serenity, and guiding starlight.', 'Creative fatigue, doubt, or temporary disconnection.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#00f0ff" stroke-width="1.4"/><polygon points="40,18 46,46 68,54 46,62 40,88 34,62 12,54 34,46" fill="none" stroke="#39ff14" stroke-width="1.8"/>'],
    ['XVIII // THE MOON', 'Dreams, subconscious signals, mystery, and navigating night.', 'Clarity emerging and uncovering hidden truth.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#d48c28" stroke-width="1.4"/><path d="M48,22 A18,18 0 1,0 48,54 A13,18 0 1,1 48,22 Z" fill="#00f0ff"/>'],
    ['XIX // THE SUN', 'Joy, vitality, warmth, clarity, and radiant success.', 'Temporary clouds, muted optimism, or burnout.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#ffff00" stroke-width="1.4"/><circle cx="40" cy="54" r="16" fill="none" stroke="#ffff00" stroke-width="2"/><circle cx="40" cy="54" r="5" fill="#39ff14"/>'],
    ['XX // JUDGEMENT', 'Awakening, inner calling, rebirth, and answering destiny.', 'Self-doubt or ignoring an urgent signal.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#00f0ff" stroke-width="1.4"/><polygon points="40,18 54,48 26,48" fill="none" stroke="#ffff00" stroke-width="1.8"/><circle cx="40" cy="88" r="5" fill="#ff1f6d"/>'],
    ['XXI // THE WORLD', 'Completion, wholeness, integration, and cosmic harmony.', 'Unfinished business standing just shy of the finish.', '<rect x="4" y="4" width="72" height="102" fill="none" stroke="#39ff14" stroke-width="1.4"/><ellipse cx="40" cy="55" rx="22" ry="32" fill="none" stroke="#39ff14" stroke-width="2" stroke-dasharray="6 3"/><polygon points="40,34 52,55 40,76 28,55" fill="none" stroke="#00f0ff" stroke-width="1.8"/>']
  ];

  let tarotMode = 1;
  let lastTarotText = '';

  function setTarotMode(count) {
    tarotMode = count;
    const b1 = $('btn-tarot-1'), b3 = $('btn-tarot-3');
    if (b1 && b3) {
      b1.className = count === 1 ? 'px-2 py-0.5 rounded-sm border border-cyan bg-cyan/20 text-cyan font-bold' : 'px-2 py-0.5 rounded-sm border border-rust/50 bg-scrap text-ash font-bold';
      b3.className = count === 3 ? 'px-2 py-0.5 rounded-sm border border-gold bg-gold/20 text-gold font-bold' : 'px-2 py-0.5 rounded-sm border border-rust/50 bg-scrap text-ash font-bold';
    }
  }
  $('btn-tarot-1')?.addEventListener('click', () => { setTarotMode(1); playFoley('click'); });
  $('btn-tarot-3')?.addEventListener('click', () => { setTarotMode(3); playFoley('click'); });

  function pullTarot(overrideCount) {
    const count = overrideCount || tarotMode;
    const pool = [...TAROT_DECK];
    const drawn = [];
    const positions = count === 3 ? ['PAST', 'PRESENT', 'SIGNAL'] : ['ORACLE PULL'];

    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      const [name, up, rev, svg] = pool.splice(idx, 1)[0];
      const isRev = Math.random() < 0.34;
      drawn.push({ pos: positions[i], name, isRev, text: isRev ? rev : up, svg });
    }

    const stage = $('tarot-spread-stage');
    if (stage) {
      stage.className = count === 3 ? 'grid grid-cols-1 sm:grid-cols-3 gap-2.5' : 'flex flex-col sm:flex-row items-center gap-3.5 text-left';
      stage.innerHTML = drawn.map((c) => `
        <div class="tarot-reveal rounded-sm border ${c.isRev ? 'border-pink/65' : 'border-cyan/60'} bg-scrap p-2.5 flex ${count === 3 ? 'flex-col items-center text-center' : 'flex-col sm:flex-row items-center gap-3.5 w-full'} gap-2">
          <div class="shrink-0 flex flex-col items-center">
            <span class="text-[9px] font-tech text-gold font-bold tracking-widest mb-1">${esc(c.pos)}</span>
            <svg viewBox="0 0 80 110" class="${count === 3 ? 'w-16 h-22' : 'w-20 h-28'} bg-void rounded-sm ${c.isRev ? 'rotate-180' : ''}">${c.svg}</svg>
          </div>
          <div class="space-y-1 min-w-0">
            <div class="font-display text-xs sm:text-sm text-bone">${esc(c.name)}</div>
            <span class="inline-block text-[9px] font-tech px-1.5 py-0.5 border ${c.isRev ? 'border-pink/60 text-pink' : 'border-cyan/60 text-cyan'}">${c.isRev ? 'REVERSED ↺' : 'UPRIGHT ▲'}</span>
            <p class="text-[11px] font-typewriter text-bone/85 leading-snug">${esc(c.text)}</p>
          </div>
        </div>
      `).join('');
    }

    lastTarotText = `✦ z3itq3ist TAROT [${count === 3 ? '3-CARD SPREAD' : '1-CARD'}]: ` +
      drawn.map((c) => `${count === 3 ? `${c.pos}: ` : ''}${c.name} (${c.isRev ? 'REV' : 'UP'}) — ${c.text}`).join(' | ');

    playFoley('tarot');
    unlockRelic('fortune_seeker');
    return lastTarotText;
  }

  $('btn-draw-tarot')?.addEventListener('click', () => pullTarot());
  $('btn-copy-tarot')?.addEventListener('click', () => {
    if (!lastTarotText) pullTarot();
    navigator.clipboard?.writeText(lastTarotText).catch(() => {});
    playFoley('click');
    showToast('✦ READING COPIED', 'Paste it directly into Blackbox Chat!', 'acid');
  });

  /* ==========================================================================
     08. INTERACTIVE DIGITAL ALTAR (CANDLES, INCENSE SMOKE & BLESSINGS)
     ========================================================================== */
  const ALTAR_BLESSINGS = [
    'May your stylesheets never break at 3:00 AM.',
    'Static clears the mind; odd corners of the web shelter the soul.',
    'Your signal travels cleanly through the rusted wires of Sector 09.',
    'The digital flame warms every wanderer who drifts off the algorithm.',
    'Keep one candle lit for dead links, lost forums, and hand-coded shrines.'
  ];
  const altarState = readJson(KEYS.altarState, { c0: false, c1: false, c2: false, inc: false });

  function renderAltar() {
    $$('.altar-candle').forEach((btn) => {
      const key = `c${btn.dataset.candle}`;
      btn.classList.toggle('is-lit', Boolean(altarState[key]));
    });
    $('incense-ember')?.classList.toggle('hidden', !altarState.inc);
    const litTotal = [altarState.c0, altarState.c1, altarState.c2, altarState.inc].filter(Boolean).length;
    if ($('altar-lit-count')) $('altar-lit-count').textContent = `${litTotal} / 4 LIT`;
    const bless = $('altar-blessing-text');
    if (bless) {
      if (litTotal === 0) bless.textContent = 'Tap the cyber-candles or incense stick to kindle the altar...';
      else if (litTotal === 4) {
        bless.textContent = `✦ FULL ALTAR KINDLED: "${ALTAR_BLESSINGS[(new Date().getDate()) % ALTAR_BLESSINGS.length]}"`;
        unlockRelic('altar_keeper');
      } else {
        bless.textContent = `☽ ${litTotal} flame${litTotal > 1 ? 's' : ''} burning — "${pick(ALTAR_BLESSINGS)}"`;
      }
    }
    writeJson(KEYS.altarState, altarState);
  }

  $$('.altar-candle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const k = `c${btn.dataset.candle}`;
      altarState[k] = !altarState[k];
      playFoley('flame');
      renderAltar();
    });
  });
  $('altar-incense')?.addEventListener('click', () => {
    altarState.inc = !altarState.inc;
    playFoley('flame');
    renderAltar();
  });
  renderAltar();

  setInterval(() => {
    if (calmOn || document.hidden) return;
    const layer = $('altar-smoke-layer');
    if (!layer || $('tab-gifs')?.classList.contains('hidden')) return;
    const anyLit = altarState.c0 || altarState.c1 || altarState.c2 || altarState.inc;
    if (!anyLit) return;
    const g = document.createElement('span');
    g.className = 'altar-smoke-glyph';
    g.textContent = pick(['~', 'ᛟ', '☽', '·', '✦', '≈', '░']);
    g.style.left = `${altarState.inc && Math.random() < .55 ? rand(72, 86) : rand(14, 68)}%`;
    g.style.bottom = '36%';
    g.style.setProperty('--sx', `${rand(-22, 22).toFixed(0)}px`);
    layer.appendChild(g);
    setTimeout(() => g.remove(), 2150);
  }, 680);

  /* ==========================================================================
     09. PERSISTENT CYBER-LOCKER + VISITOR RUNE STAMPS
     ========================================================================== */
  const lockerBoard = $('cyber-locker-board');
  const lockerItems = $$('#cyber-locker-board .locker-item');
  let lockerZ = 10;

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
        target.style.left = `${nx}px`;
        target.style.top = `${ny}px`;
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

  function saveLockerPositions() {
    const map = {};
    lockerItems.forEach((it) => {
      if (!it.id) return;
      map[it.id] = { left: parseFloat(it.style.left) || 0, top: parseFloat(it.style.top) || 0 };
    });
    writeJson(KEYS.lockerPos, map);
  }

  function resetLocker(clearSaved = true) {
    if (!lockerBoard) return;
    if (clearSaved) try { localStorage.removeItem(KEYS.lockerPos); } catch {}
    const bw = lockerBoard.clientWidth || 560, bh = lockerBoard.clientHeight || 440;
    const isCompact = bw < 460;
    lockerItems.forEach((it, i) => {
      if (isCompact) {
        const col = i % 2, row = Math.floor(i / 2);
        it.style.left = `${Math.min(col === 0 ? 10 : Math.round(bw * 0.51), Math.max(8, bw - 135))}px`;
        it.style.top = `${Math.min(12 + row * 120, Math.max(8, bh - 104))}px`;
      } else {
        it.style.left = `${Math.min(Math.max(8, Number(it.dataset.initLeft || 16 + i * 30)), Math.max(8, bw - 140))}px`;
        it.style.top = `${Math.min(Math.max(8, Number(it.dataset.initTop || 16 + i * 24)), Math.max(8, bh - 120))}px`;
      }
      it.style.transform = `rotate(${Number(it.dataset.initRot || 0)}deg)`;
      it.style.zIndex = String(i + 2);
    });
  }

  function restoreLockerPositions() {
    const saved = readJson(KEYS.lockerPos, null);
    if (!saved) return resetLocker(false);
    lockerItems.forEach((it, i) => {
      const p = saved[it.id];
      it.style.left = `${p ? p.left : Number(it.dataset.initLeft || 18)}px`;
      it.style.top = `${p ? p.top : Number(it.dataset.initTop || 18)}px`;
      it.style.transform = `rotate(${Number(it.dataset.initRot || 0)}deg)`;
      it.style.zIndex = String(i + 2);
    });
    clampLockerItems();
  }

  function clampLockerItems() {
    if (!lockerBoard) return;
    const bw = lockerBoard.clientWidth || 560, bh = lockerBoard.clientHeight || 440;
    lockerItems.forEach((it) => {
      it.style.left = `${Math.min(Math.max(-16, parseFloat(it.style.left) || 0), bw - 60)}px`;
      it.style.top = `${Math.min(Math.max(-10, parseFloat(it.style.top) || 0), bh - 50)}px`;
    });
  }

  lockerItems.forEach((it) => bindDrag(
    it, it,
    () => { it.style.zIndex = String(++lockerZ); },
    (x, y) => [Math.min(Math.max(-16, x), (lockerBoard?.clientWidth || 560) - 60), Math.min(Math.max(-10, y), (lockerBoard?.clientHeight || 440) - 50)],
    saveLockerPositions
  ));
  $('btn-reset-locker')?.addEventListener('click', () => { playFoley('click'); resetLocker(true); });
  restoreLockerPositions();

  // Visitor Rune Stamps on Cyber-Locker (Persisted)
  let userStamps = readJson(KEYS.lockerStamps, []);
  const stampColors = ['#39ff14', '#ff1f6d', '#00f0ff', '#f5d27a', '#d48c28'];

  function mountLockerStamp(st) {
    if (!lockerBoard) return;
    const el = document.createElement('div');
    el.className = 'locker-user-stamp';
    el.textContent = st.glyph;
    el.title = 'Drag to move • Double-click to remove';
    el.style.left = `${st.x}px`;
    el.style.top = `${st.y}px`;
    el.style.color = st.color;
    el.style.borderColor = st.color;
    el.style.transform = `rotate(${st.rot}deg)`;
    el.style.zIndex = String(++lockerZ);

    bindDrag(
      el, el,
      () => { el.style.zIndex = String(++lockerZ); },
      (x, y) => [Math.min(Math.max(4, x), (lockerBoard.clientWidth || 500) - 36), Math.min(Math.max(4, y), (lockerBoard.clientHeight || 400) - 36)],
      () => { st.x = parseFloat(el.style.left) || st.x; st.y = parseFloat(el.style.top) || st.y; writeJson(KEYS.lockerStamps, userStamps); }
    );
    el.addEventListener('dblclick', () => {
      userStamps = userStamps.filter((s) => s.id !== st.id);
      writeJson(KEYS.lockerStamps, userStamps);
      el.remove();
      playFoley('click');
    });
    lockerBoard.appendChild(el);
  }
  userStamps.forEach(mountLockerStamp);

  $$('.locker-stamp-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!lockerBoard) return;
      const bw = lockerBoard.clientWidth || 460, bh = lockerBoard.clientHeight || 380;
      const st = {
        id: 'st-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
        glyph: btn.dataset.stamp || 'ᛟ',
        x: Math.round(rand(24, Math.max(40, bw - 56))),
        y: Math.round(rand(24, Math.max(40, bh - 56))),
        rot: Math.round(rand(-18, 18)),
        color: pick(stampColors)
      };
      userStamps.push(st);
      if (userStamps.length > 30) userStamps.shift();
      writeJson(KEYS.lockerStamps, userStamps);
      mountLockerStamp(st);
      playFoley('click');
    });
  });

  $('btn-clear-locker-stamps')?.addEventListener('click', () => {
    userStamps = [];
    writeJson(KEYS.lockerStamps, []);
    $$('.locker-user-stamp', lockerBoard).forEach((el) => el.remove());
    playFoley('click');
  });

  /* ==========================================================================
     10. FULL LONG-FORM ZINE / DIARY POST READER (MARKDOWN PARSER)
     ========================================================================== */
  let archiveListCache = [];
  let currentZineIndex = 0;

  function renderSimpleMarkdown(md) {
    const safe = esc(md || '');
    const lines = safe.split('\n');
    let html = '', inUl = false;
    const inline = (s) => s
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-bone font-bold">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="text-gold">$1</em>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan underline">$1 ↗</a>');

    for (const raw of lines) {
      const line = raw.trim();
      if (/^[-*]\s+/.test(line)) {
        if (!inUl) { html += '<ul>'; inUl = true; }
        html += `<li>${inline(line.replace(/^[-*]\s+/, ''))}</li>`;
        continue;
      }
      if (inUl) { html += '</ul>'; inUl = false; }
      if (!line) continue;
      if (line.startsWith('### ')) html += `<h3>${inline(line.slice(4))}</h3>`;
      else if (line.startsWith('## ')) html += `<h2>${inline(line.slice(3))}</h2>`;
      else if (line.startsWith('# ')) html += `<h1>${inline(line.slice(2))}</h1>`;
      else if (line.startsWith('&gt; ')) html += `<blockquote>${inline(line.slice(5))}</blockquote>`;
      else html += `<p>${inline(line)}</p>`;
    }
    if (inUl) html += '</ul>';
    return html || '<p class="text-ash italic">(No body text recorded.)</p>';
  }

  function openZineReader(idx) {
    if (!archiveListCache.length) return;
    currentZineIndex = Math.max(0, Math.min(archiveListCache.length - 1, idx));
    const item = archiveListCache[currentZineIndex];
    if (!item) return;

    $('zine-cat').textContent = `ᛟ ZINE_READER // ${item.category || 'DISPATCH'}`;
    $('zine-date').textContent = item.createdAt ? new Date(item.createdAt).toLocaleString() : '';
    $('zine-title').textContent = item.title || 'UNTITLED TRANSMISSION';
    const tags = Array.isArray(item.tags) ? item.tags : [];
    $('zine-tags').innerHTML = tags.map((t) => `<span class="px-1.5 py-0.5 border border-acid/55 text-acid bg-acid/10">#${esc(t)}</span>`).join('');
    $('zine-media').innerHTML = item.image ? `<img src="${esc(item.image)}" alt="" class="max-h-64 w-full object-cover rounded-sm border border-rust/50">` : '';
    $('zine-body').innerHTML = renderSimpleMarkdown(item.body || '');

    const metaParts = [];
    if (item.link) metaParts.push(`<a href="${esc(item.link)}" target="_blank" rel="noopener noreferrer" class="text-cyan hover:underline">↗ OPEN ATTACHED LINK</a>`);
    if (item.snapshot) {
      const s = item.snapshot;
      metaParts.push(`<div class="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px]">${s.listening ? `<span>♪ ${esc(s.listening)}</span>` : ''}${s.reading ? `<span>⛨ ${esc(s.reading)}</span>` : ''}${s.watching ? `<span>▣ ${esc(s.watching)}</span>` : ''}${s.mood ? `<span class="text-acid">☽ "${esc(s.mood)}"</span>` : ''}</div>`);
    }
    $('zine-meta').innerHTML = metaParts.join('');
    $('zine-prev-btn').disabled = currentZineIndex <= 0;
    $('zine-next-btn').disabled = currentZineIndex >= archiveListCache.length - 1;
    $('zine-prev-btn').classList.toggle('opacity-40', currentZineIndex <= 0);
    $('zine-next-btn').classList.toggle('opacity-40', currentZineIndex >= archiveListCache.length - 1);

    setModal($('zine-reader-modal'), true);
    playFoley('click');
  }
  $('zine-prev-btn')?.addEventListener('click', () => openZineReader(currentZineIndex - 1));
  $('zine-next-btn')?.addEventListener('click', () => openZineReader(currentZineIndex + 1));

  /* ==========================================================================
     11. UNIFIED 15 POP-UP ADS + 5 INLINE ADS PERMANENT DISMISSAL ENGINE
     ========================================================================== */
  const AD_THEMES = {
    acid:  { accent: '#39ff14', barBg: '#09160a', glow: 'rgba(57, 255, 20, .32)' },
    pink:  { accent: '#ff1f6d', barBg: '#1c0811', glow: 'rgba(255, 31, 109, .35)' },
    cyan:  { accent: '#00f0ff', barBg: '#07171c', glow: 'rgba(0, 240, 255, .32)' },
    amber: { accent: '#d48c28', barBg: '#1c1308', glow: 'rgba(212, 140, 40, .35)' }
  };

  const closedInline = new Set(readJson(KEYS.closedInline, []));
  const closedPopups = new Set(readJson(KEYS.closedPopups, []));
  let livePopupAds = [];
  const openPopupWins = new Map();
  let popupZ = 63, popupCycleTimer = null, popupBurstTimers = [];

  function checkAdExterminator() {
    if (closedInline.size + closedPopups.size >= 5) unlockRelic('ad_exterminator');
  }

  function applyInlineDismissals() {
    $$('.dismissible-ad').forEach((el) => {
      const id = el.dataset.dismissAd;
      if (id && el.dataset.cmsDisabled !== '1') el.classList.toggle('hidden', closedInline.has(id));
    });
  }
  applyInlineDismissals();

  $$('[data-close-inline-ad]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      const id = btn.dataset.closeInlineAd;
      if (!id) return;
      closedInline.add(id);
      writeJson(KEYS.closedInline, [...closedInline]);
      document.querySelector(`[data-dismiss-ad="${id}"]`)?.classList.add('hidden');
      playFoley('click');
      checkAdExterminator();
    });
  });

  function closePopupWin(id, permanent = false) {
    if (permanent) {
      closedPopups.add(id);
      writeJson(KEYS.closedPopups, [...closedPopups]);
      checkAdExterminator();
    }
    const w = openPopupWins.get(id);
    if (w && !w.classList.contains('is-closing')) {
      openPopupWins.delete(id);
      w.classList.add('is-closing');
      setTimeout(() => w.remove(), 190);
    }
    refreshAdDirUI();
  }

  function spawnPopupById(id, force = false) {
    const layer = $('z3-ad-popup-layer');
    const ad = livePopupAds.find((a) => a.id === id);
    if (!layer || !ad) return false;
    if (force && closedPopups.has(ad.id)) { closedPopups.delete(ad.id); writeJson(KEYS.closedPopups, [...closedPopups]); }
    if (closedPopups.has(ad.id)) return false;
    if (openPopupWins.has(ad.id)) { openPopupWins.get(ad.id).style.zIndex = String(popupZ = popupZ >= 68 ? 63 : popupZ + 1); return true; }

    const isMob = window.innerWidth < 768;
    const maxOpen = isMob ? 2 : 7;
    while (openPopupWins.size >= maxOpen) {
      const oldest = openPopupWins.keys().next().value;
      if (!oldest) break;
      closePopupWin(oldest, false);
    }

    const th = AD_THEMES[ad.theme] || AD_THEMES.pink;
    const win = document.createElement('div');
    win.className = `z3-popup-win sz-${ad.size || 'md'}`;
    win.style.setProperty('--z3-accent', th.accent);
    win.style.setProperty('--z3-bar-bg', th.barBg);
    win.style.setProperty('--z3-glow', th.glow);
    win.style.setProperty('--z3-rot', `${rand(-2.2, 2.2).toFixed(1)}deg`);
    win.style.zIndex = String(popupZ = popupZ >= 68 ? 63 : popupZ + 1);

    const bar = document.createElement('div');
    bar.className = 'z3-popup-bar';
    bar.innerHTML = `<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(ad.win)}</span>`;
    const xBtn = document.createElement('button');
    xBtn.type = 'button'; xBtn.className = 'z3-popup-x'; xBtn.textContent = 'X';
    xBtn.title = 'Close Ad Permanently';
    xBtn.addEventListener('click', (e) => { e.stopPropagation(); playFoley('click'); closePopupWin(ad.id, true); });
    bar.appendChild(xBtn);

    const link = document.createElement('a');
    link.className = 'z3-popup-link';
    link.href = ad.url || '#'; link.target = '_blank'; link.rel = 'noopener noreferrer';
    const mediaHtml = ad.img
      ? `<div class="z3-popup-slot"><img src="${esc(ad.img)}" alt="${esc(ad.head)}" onerror="this.parentElement.textContent='[ ${esc(ad.id.toUpperCase())} ]'"></div>`
      : `<div class="z3-popup-slot">[ ${esc(ad.id.toUpperCase())} GIF SLOT ]</div>`;
    link.innerHTML = `${mediaHtml}<div style="min-width:0;flex:1;"><div style="font-family:'Special Elite',monospace;font-size:13px;color:${th.accent};margin-bottom:4px;">${esc(ad.head)}</div><p style="font-size:11px;color:rgba(216,213,200,.86);margin:0 0 8px 0;">${esc(ad.copy)}</p>${ad.cta ? `<span style="display:inline-block;padding:3px 9px;background:${th.accent};color:#050607;font-family:'Share Tech Mono',monospace;font-size:10px;font-weight:700;">${esc(ad.cta)}</span>` : ''}</div>`;

    win.append(bar, link);
    bindDrag(bar, win, () => { win.style.zIndex = String(popupZ = popupZ >= 68 ? 63 : popupZ + 1); });

    win.style.visibility = 'hidden'; win.style.left = '0px'; win.style.top = '0px';
    layer.appendChild(win);
    const r = win.getBoundingClientRect();
    const padX = isMob ? 10 : 14, minY = isMob ? 86 : 60, padB = isMob ? 124 : 66;
    win.style.left = `${Math.round(rand(padX, Math.max(padX, window.innerWidth - r.width - padX)))}px`;
    win.style.top = `${Math.round(rand(minY, Math.max(minY, window.innerHeight - r.height - padB)))}px`;
    win.style.visibility = 'visible';

    openPopupWins.set(ad.id, win);
    refreshAdDirUI();
    return true;
  }

  function spawnRandomPopup() {
    const avail = livePopupAds.filter((a) => !closedPopups.has(a.id) && !openPopupWins.has(a.id));
    if (!avail.length) return false;
    return spawnPopupById(pick(avail).id, false);
  }

  function schedulePopupCycle() {
    clearTimeout(popupCycleTimer); popupBurstTimers.forEach(clearTimeout); popupBurstTimers = [];
    if (!livePopupAds.length || livePopupAds.every((a) => closedPopups.has(a.id))) return;
    const isMob = window.innerWidth < 768;
    const delays = isMob ? [rand(3200, 13000)] : [rand(1800, 7200), rand(8200, 14000)];
    popupBurstTimers = delays.map((ms) => setTimeout(() => { if (!document.hidden && !calmOn) spawnRandomPopup(); }, ms));
    popupCycleTimer = setTimeout(schedulePopupCycle, 16000);
  }

  function refreshAdDirUI() {
    const activeCnt = livePopupAds.filter((a) => !closedPopups.has(a.id)).length;
    if ($('z3-dock-count')) $('z3-dock-count').textContent = `${activeCnt}/${livePopupAds.length}`;
    const grid = $('z3-dir-grid');
    if (!grid) return;
    grid.innerHTML = livePopupAds.map((ad) => {
      const th = AD_THEMES[ad.theme] || AD_THEMES.pink;
      const muted = closedPopups.has(ad.id);
      return `
        <div class="rounded-sm border border-rust/40 bg-[#090c0d] p-2.5 flex flex-col justify-between gap-2 ${muted ? 'opacity-55' : ''}" style="border-left:4px solid ${th.accent}">
          <div>
            <div class="font-tech text-[10px] font-bold" style="color:${th.accent}">${esc(ad.win)} ${muted ? '[CLOSED]' : ''}</div>
            <div class="font-display text-xs text-bone mt-1">${esc(ad.head)}</div>
            <p class="text-[11px] text-ash mt-0.5">${esc(ad.copy)}</p>
          </div>
          <div class="flex gap-1.5 pt-1.5 border-t border-dashed border-rust/25 font-tech text-[10px]">
            <button type="button" data-pop-launch="${esc(ad.id)}" class="px-2 py-0.5 border border-acid text-acid hover:bg-acid hover:text-void">${muted ? 'RESTORE & POP' : 'LAUNCH'}</button>
            <a href="${esc(ad.url || '#')}" target="_blank" rel="noopener noreferrer" class="px-2 py-0.5 border border-cyan text-cyan hover:bg-cyan hover:text-void">LINK ↗</a>
          </div>
        </div>
      `;
    }).join('');
    grid.querySelectorAll('[data-pop-launch]').forEach((b) => b.addEventListener('click', () => {
      spawnPopupById(b.dataset.popLaunch, true);
      $('z3-ad-dir-modal')?.classList.remove('is-open');
      playFoley('click');
    }));
  }

  function resetAllAds() {
    closedPopups.clear(); closedInline.clear();
    try { localStorage.removeItem(KEYS.closedPopups); localStorage.removeItem(KEYS.closedInline); } catch {}
    applyInlineDismissals();
    refreshAdDirUI();
    spawnRandomPopup();
    schedulePopupCycle();
  }

  $('z3-ad-dir-dock')?.addEventListener('click', () => { refreshAdDirUI(); $('z3-ad-dir-modal')?.classList.add('is-open'); playFoley('click'); });
  $('z3-dir-close')?.addEventListener('click', () => $('z3-ad-dir-modal')?.classList.remove('is-open'));
  $('z3-ad-dir-modal')?.addEventListener('click', (e) => { if (e.target === $('z3-ad-dir-modal')) $('z3-ad-dir-modal').classList.remove('is-open'); });
  $('z3-btn-spawn-now')?.addEventListener('click', () => { playFoley('click'); spawnRandomPopup(); });
  $('z3-btn-sweep-open')?.addEventListener('click', () => { playFoley('click'); [...openPopupWins.keys()].forEach((id) => closePopupWin(id, false)); });
  $('z3-btn-restore-all')?.addEventListener('click', () => { playFoley('click'); resetAllAds(); });

  /* ==========================================================================
     12. LIVE DATA HYDRATION FROM ./data/updates.json (+ LAST.FM + GISCUS)
     ========================================================================== */
  const BUILTIN_GIF_SVGS = [
    '<svg viewBox="0 0 64 64" class="w-14 h-14 anim-gif-glitch"><circle cx="32" cy="28" r="16" fill="#131618" stroke="#39ff14" stroke-width="2"/><circle cx="26" cy="26" r="3.5" fill="#39ff14"/><circle cx="38" cy="26" r="3.5" fill="#ff1f6d"/><path d="M25,44 v8 M32,44 v8 M39,44 v8" stroke="#d8d5c8" stroke-width="2"/></svg>',
    '<svg viewBox="0 0 64 64" class="w-14 h-14 anim-gif-spin"><polygon points="32,6 39,24 58,24 43,36 49,54 32,43 15,54 21,36 6,24 25,24" fill="none" stroke="#ff1f6d" stroke-width="2.2"/><circle cx="32" cy="32" r="6" fill="#00f0ff"/></svg>',
    '<svg viewBox="0 0 64 64" class="w-14 h-14 anim-eye-blink"><path d="M6,32 Q32,12 58,32 Q32,52 6,32 Z" fill="#050607" stroke="#00f0ff" stroke-width="2.2"/><circle cx="32" cy="32" r="8" fill="#39ff14"/><circle cx="32" cy="32" r="3.5" fill="#050607"/></svg>',
    '<svg viewBox="0 0 64 64" class="w-14 h-14 anim-gif-bounce"><path d="M32,16 L10,24 L18,46 L32,36 L46,46 L54,24 Z" fill="none" stroke="#d48c28" stroke-width="2.2"/><line x1="32" y1="12" x2="32" y2="50" stroke="#39ff14" stroke-width="2"/></svg>',
    '<svg viewBox="0 0 64 64" class="w-14 h-14"><circle cx="32" cy="32" r="11" fill="none" stroke="#f5d27a" stroke-width="2.2"/><path d="M16,20 A12,12 0 0,0 16,44 A8,12 0 0,1 16,20 Z" fill="#00f0ff"/><path d="M48,20 A12,12 0 0,1 48,44 A8,12 0 0,0 48,20 Z" fill="#ff1f6d"/></svg>',
    '<svg viewBox="0 0 64 64" class="w-14 h-14 anim-gif-spin"><polygon points="32,8 54,32 32,56 10,32" fill="none" stroke="#39ff14" stroke-width="2.2"/><text x="32" y="38" text-anchor="middle" fill="#f5d27a" font-size="18" font-family="monospace">ᛟ</text></svg>'
  ];

  const CAT_BADGE = {
    STATUS: 'border-acid text-acid bg-acid/10', DISPATCH: 'border-cyan text-cyan bg-cyan/10',
    DIRECTORY: 'border-cyan text-cyan bg-cyan/10', ADS_15: 'border-pink text-pink bg-pink/10',
    INLINE_5: 'border-gold text-gold bg-gold/10', OPERATOR: 'border-rust text-rust bg-rust/10',
    BOOK_NOTE: 'border-rust text-rust bg-rust/10', VHS_LOG: 'border-pink text-pink bg-pink/10',
    MUSIC: 'border-acid text-acid bg-acid/10', RELIC: 'border-gold text-gold bg-[#181106]'
  };

  function hydrateInlineAds(inlineAds) {
    if (!Array.isArray(inlineAds)) return;
    inlineAds.forEach((ad) => {
      const sec = document.querySelector(`[data-dismiss-ad="${ad.id}"]`);
      if (!sec) return;
      if (ad.enabled === false) { sec.dataset.cmsDisabled = '1'; sec.classList.add('hidden'); return; }
      sec.dataset.cmsDisabled = '0';
      if (!closedInline.has(ad.id)) sec.classList.remove('hidden');

      const link = sec.querySelector('.inline-ad-link');
      if (link && ad.url) link.href = ad.url;
      const head = sec.querySelector('.inline-ad-head');
      if (head && ad.head) head.textContent = ad.head;
      const sub = sec.querySelector('.inline-ad-sub');
      if (sub && ad.sub) sub.textContent = ad.sub;
      const cta = sec.querySelector('.inline-ad-cta');
      if (cta && ad.cta) cta.textContent = ad.cta;
      const mq = sec.querySelector('.inline-ad-marquee');
      if (mq && ad.marquee) {
        if (mq.children.length >= 2) { mq.children[0].textContent = ad.marquee; mq.children[1].textContent = ad.marquee; }
        else mq.textContent = ad.marquee;
      }
      const gifSlot = sec.querySelector('.inline-ad-gif');
      if (gifSlot && ad.img && ad.img.trim()) {
        const fb = gifSlot.dataset.origHtml || gifSlot.innerHTML;
        gifSlot.dataset.origHtml = fb;
        gifSlot.innerHTML = `<img src="${esc(ad.img.trim())}" alt="${esc(ad.head || ad.id)}" class="w-full h-full object-cover">`;
        const im = gifSlot.querySelector('img');
        if (im) im.onerror = () => { gifSlot.innerHTML = fb; };
      }
    });
  }

  async function maybeFetchLastFm(integrations, cur) {
    if (!integrations?.lastfmUser || !integrations?.lastfmApiKey) return null;
    try {
      const u = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(integrations.lastfmUser)}&api_key=${encodeURIComponent(integrations.lastfmApiKey)}&format=json&limit=1`;
      const res = await fetch(u);
      if (!res.ok) return null;
      const json = await res.json();
      const tr = json?.recenttracks?.track?.[0];
      if (!tr) return null;
      const playing = tr['@attr']?.nowplaying === 'true';
      return { text: `${tr.artist?.['#text'] || ''} — ${tr.name || ''}`, playing };
    } catch { return null; }
  }

  function renderCurrentlyBox(cur, lfm) {
    const box = $('currently-status-box');
    if (!box || !cur) return;
    const updated = cur.updatedAt ? new Date(cur.updatedAt).toLocaleDateString([], { year: 'numeric', month: 'short', day: '2-digit' }) : 'LIVE';
    const listenTxt = lfm?.text ? `${lfm.text}${lfm.playing ? ' [● SCROBBLING LIVE]' : ' [LAST.FM]'}` : (cur.listening || '---');
    box.innerHTML = `
      <div class="flex items-center justify-between border-b border-rust/30 pb-1 font-tech text-[10px]">
        <span class="text-acid font-bold tracking-widest">● CURRENTLY_LOG // GITHUB LIVE</span>
        <span class="text-ash">UPDATED: ${esc(updated)}</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] font-typewriter">
        <div><span class="text-cyan font-tech font-bold">♪ LISTENING:</span> <span class="text-bone">${esc(listenTxt)}</span></div>
        <div><span class="text-rust font-tech font-bold">⛨ READING:</span> <span class="text-bone">${esc(cur.reading || '---')}</span></div>
        <div><span class="text-pink font-tech font-bold">▣ WATCHING:</span> <span class="text-bone">${esc(cur.watching || '---')}</span></div>
        <div><span class="text-acid font-tech font-bold">☕ FUEL:</span> <span class="text-bone">${esc(cur.fuel || '---')}</span></div>
        <div class="sm:col-span-2"><span class="text-bone/70 font-tech font-bold">☽ MOOD:</span> <span class="text-acid italic">"${esc(cur.mood || 'signal active')}"</span></div>
      </div>
    `;
  }

  function mountGiscusIfConfigured(integ) {
    const mount = $('giscus-mount');
    if (!mount || mount.dataset.loaded === '1') return;
    if (!integ?.giscusRepo || !integ?.giscusRepoId || !integ?.giscusCategoryId) return;
    mount.dataset.loaded = '1';
    mount.innerHTML = '';
    const s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.setAttribute('data-repo', integ.giscusRepo);
    s.setAttribute('data-repo-id', integ.giscusRepoId);
    s.setAttribute('data-category', integ.giscusCategory || 'General');
    s.setAttribute('data-category-id', integ.giscusCategoryId);
    s.setAttribute('data-mapping', 'pathname');
    s.setAttribute('data-reactions-enabled', '1');
    s.setAttribute('data-emit-metadata', '0');
    s.setAttribute('data-input-position', 'top');
    s.setAttribute('data-theme', 'dark_high_contrast');
    s.setAttribute('data-lang', 'en');
    mount.appendChild(s);
  }

  function renderArchiveWidget(entries) {
    archiveListCache = Array.isArray(entries) ? entries : [];
    const wrap = $('z3-github-archive-box');
    if (!wrap) return;
    let filter = 'ALL', limit = 6, query = '';

    function draw() {
      const filtered = archiveListCache.map((item, origIdx) => ({ item, origIdx })).filter(({ item }) => {
        const catOk = filter === 'ALL' || (item.category || 'DISPATCH') === filter;
        const q = query.trim().toLowerCase();
        const textOk = !q || `${item.title || ''} ${item.body || ''} ${(item.tags || []).join(' ')} ${item.category || ''}`.toLowerCase().includes(q);
        return catOk && textOk;
      });
      const shown = filtered.slice(0, limit);
      const listHtml = shown.length ? shown.map(({ item, origIdx }) => {
        const cat = item.category || 'DISPATCH';
        const badge = CAT_BADGE[cat] || CAT_BADGE.DISPATCH;
        const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleString([], { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '';
        const preview = String(item.body || '').replace(/[#*>`]/g, '').slice(0, 150);
        return `
          <article data-open-zine="${origIdx}" class="cursor-pointer rounded-sm border border-rust/35 border-l-2 border-l-cyan bg-scrap/95 hover:border-acid p-2.5 space-y-1 transition">
            <div class="flex flex-wrap items-center justify-between gap-1.5 font-tech text-[10px]">
              <span class="px-1.5 py-0.5 border ${badge} font-bold">${esc(cat)}</span>
              <span class="text-ash">${esc(dateStr)}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <h4 class="font-display text-xs sm:text-sm text-bone tracking-wide">${esc(item.title || 'UNTITLED')}</h4>
              <span class="text-[9px] font-tech text-cyan shrink-0">[ READ ZINE ↗ ]</span>
            </div>
            ${preview ? `<p class="text-[11px] text-bone/75 font-typewriter line-clamp-2">${esc(preview)}${String(item.body || '').length > 150 ? '…' : ''}</p>` : ''}
          </article>
        `;
      }).join('') : `<div class="text-center py-4 text-xs font-tech text-ash">No archived entries match this filter.</div>`;

      wrap.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-rust/35 pb-2 font-tech">
          <span class="text-cyan font-bold text-xs tracking-widest">ᛟ ZINE &amp; UPDATE ARCHIVE // ${archiveListCache.length} LOGGED</span>
          <input id="z3-arch-search" type="text" value="${esc(query)}" placeholder="search archive..." class="bg-scrap border border-rust/45 focus:border-cyan focus:outline-none rounded-sm px-2 py-0.5 text-[11px] text-bone w-40">
        </div>
        <div class="flex flex-wrap gap-1 font-tech text-[10px]">
          ${['ALL', 'STATUS', 'DISPATCH', 'DIRECTORY', 'ADS_15', 'INLINE_5', 'OPERATOR', 'BOOK_NOTE', 'VHS_LOG'].map((c) => `
            <button type="button" data-arch-cat="${c}" class="px-2 py-0.5 rounded-sm border ${filter === c ? 'border-acid bg-acid/20 text-acid font-bold' : 'border-rust/40 bg-scrap text-ash hover:text-bone'}">${c}</button>
          `).join('')}
        </div>
        <div class="space-y-2 max-h-96 overflow-y-auto pr-1">${listHtml}</div>
        ${filtered.length > limit ? `<button id="z3-arch-more" type="button" class="w-full py-1.5 rounded-sm border border-cyan/60 bg-cyan/10 text-cyan hover:bg-cyan hover:text-void font-tech text-[10px] font-bold tracking-widest">[ LOAD MORE (${filtered.length - limit} REMAINING) ]</button>` : ''}
      `;

      wrap.querySelectorAll('[data-arch-cat]').forEach((b) => b.addEventListener('click', () => { filter = b.dataset.archCat; limit = 6; draw(); playFoley('click'); }));
      wrap.querySelectorAll('[data-open-zine]').forEach((card) => card.addEventListener('click', () => openZineReader(Number(card.dataset.openZine))));
      const sEl = wrap.querySelector('#z3-arch-search');
      if (sEl) {
        sEl.addEventListener('input', (e) => { query = e.target.value; limit = 6; draw(); });
        if (query) { sEl.focus(); sEl.setSelectionRange(query.length, query.length); }
      }
      wrap.querySelector('#z3-arch-more')?.addEventListener('click', () => { limit += 8; draw(); playFoley('click'); });
    }
    draw();
  }

  async function hydrateFromUpdatesJson() {
    try {
      const res = await fetch(`./data/updates.json?t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) return false;
      const data = await res.json();
      siteData = data;

      // 1. Site Meta & Tickers
      if (data.siteMeta?.siteTitle) document.title = data.siteMeta.siteTitle;
      if (data.siteMeta?.heroTickerTop && $('hero-ticker-top')) {
        $('hero-ticker-top').innerHTML = `<span>${esc(data.siteMeta.heroTickerTop)}</span><span>${esc(data.siteMeta.heroTickerTop)}</span>`;
      }
      if (data.siteMeta?.heroTickerBottom && $('hero-ticker-bottom')) {
        $('hero-ticker-bottom').innerHTML = `<span>${esc(data.siteMeta.heroTickerBottom)}</span><span>${esc(data.siteMeta.heroTickerBottom)}</span>`;
      }

      // 2. Currently (+ optional Last.fm live track)
      renderCurrentlyBox(data.current, null);
      maybeFetchLastFm(data.integrations, data.current).then((lfm) => { if (lfm) renderCurrentlyBox(data.current, lfm); });

      // 3. Manifesto Pinned Note, Paragraphs & Ciphers
      const pin = $('z3-manifesto-pinned-note');
      if (pin) {
        if (data.directory?.manifestoNote) {
          pin.innerHTML = `<span class="text-pink font-tech font-bold">⛨ PINNED_BROADCAST:</span> ${esc(data.directory.manifestoNote)}`;
          pin.classList.remove('hidden');
        } else pin.classList.add('hidden');
      }
      const paraBox = $('manifesto-paragraphs');
      if (paraBox && Array.isArray(data.directory?.manifestoParagraphs)) {
        paraBox.innerHTML = data.directory.manifestoParagraphs.map((p, i) =>
          `<p>${i === 0 ? '<span class="text-acid font-tech font-bold">&gt; BOOT_SEQUENCE:</span> ' : ''}${esc(p)}</p>`
        ).join('');
      }
      if (Array.isArray(data.directory?.ciphers) && data.directory.ciphers.length) {
        cipherList = data.directory.ciphers;
      }

      // 4. Operator Tag
      const op = data.operator;
      if (op) {
        if ($('op-badge') && op.badge) $('op-badge').textContent = op.badge;
        if ($('op-avatar-box') && op.avatarUrl) {
          const orig = $('op-avatar-box').dataset.orig || $('op-avatar-box').innerHTML;
          $('op-avatar-box').dataset.orig = orig;
          $('op-avatar-box').innerHTML = `<img src="${esc(op.avatarUrl)}" alt="${esc(op.alias || 'Operator')}" class="w-full h-full object-cover rounded-sm">`;
          const im = $('op-avatar-box').querySelector('img');
          if (im) im.onerror = () => { $('op-avatar-box').innerHTML = orig; };
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
          const gPct = Math.max(0, Math.min(100, Number(op.gridPct ?? 78)));
          const oPct = Math.max(0, Math.min(100, Number(op.occultPct ?? 92)));
          $('op-bars-box').innerHTML = `
            <div class="flex justify-between"><span class="text-ash">GRID_INTEGRITY</span><span class="text-acid">${gPct}% [${esc(op.gridStatus || 'SCRAPPED')}]</span></div>
            <div class="w-full h-2 bg-void border border-acid/40 p-0.5"><div class="h-full bg-acid" style="width:${gPct}%"></div></div>
            <div class="flex justify-between pt-0.5"><span class="text-ash">OCCULT_CHARGE</span><span class="text-pink">${oPct}% [${esc(op.occultStatus || 'VOLATILE')}]</span></div>
            <div class="w-full h-2 bg-void border border-pink/40 p-0.5"><div class="h-full bg-pink" style="width:${oPct}%"></div></div>
          `;
        }
      }

      // 5. Media Vault (Spotify, Books, VHS)
      if (data.current?.spotifyEmbed && $('spotify-embed-iframe')) $('spotify-embed-iframe').src = data.current.spotifyEmbed;
      if (data.current?.spotifyProfileUrl && $('spotify-profile-link')) $('spotify-profile-link').href = data.current.spotifyProfileUrl;
      if ($('spotify-liner-notes')) $('spotify-liner-notes').innerHTML = `<span class="text-acid font-tech font-bold">&gt; LINER_NOTES:</span> ${esc(data.current?.spotifyLinerNotes || '')}`;

      const booksBox = $('books-list');
      if (booksBox && Array.isArray(data.directory?.books)) {
        const acMap = {
          acid: { card: 'border-acid/45', img: 'border-acid/50', badge: 'border-acid text-acid bg-acid/10', bar: 'from-acid to-cyan', txt: 'text-acid' },
          pink: { card: 'border-pink/45', img: 'border-pink/50', badge: 'border-pink text-pink bg-pink/10', bar: 'from-pink to-rust', txt: 'text-pink' },
          cyan: { card: 'border-cyan/45', img: 'border-cyan/50', badge: 'border-cyan text-cyan bg-cyan/10', bar: 'from-cyan to-acid', txt: 'text-cyan' },
          rust: { card: 'border-rust/55', img: 'border-rust/50', badge: 'border-rust text-rust bg-rust/10', bar: 'from-rust to-pink', txt: 'text-rust' }
        };
        booksBox.innerHTML = data.directory.books.map((bk, idx) => {
          const ac = acMap[bk.accent] || acMap.acid;
          const pct = Math.max(0, Math.min(100, Number(bk.progressPct) || 0));
          const notes = String(bk.notes || '').split('\n').filter((l) => l.trim());
          return `
            <article class="rounded-sm border ${ac.card} bg-void/95 p-3">
              <div class="flex flex-col sm:flex-row gap-3">
                <img src="${esc(bk.cover || `https://placehold.co/90x132/0b0d0f/39ff14?text=BOOK+0${idx + 1}`)}" alt="${esc(bk.title)}" onerror="this.onerror=null;this.src='https://placehold.co/90x132/050607/d48c28?text=COVER';" class="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-sm border ${ac.img} shrink-0 self-start">
                <div class="flex-1 min-w-0 space-y-1.5">
                  <div class="flex flex-wrap items-center justify-between gap-1">
                    <h3 class="font-display text-sm text-bone tracking-wide">${esc(bk.title)}</h3>
                    <span class="text-[10px] font-tech px-1.5 py-0.5 border ${ac.badge}">${esc(bk.status || 'READING')}</span>
                  </div>
                  <div class="text-[11px] font-tech text-ash">BY: <span class="text-cyan">${esc(bk.author || 'Unknown')}</span> • FORMAT: <span class="text-rust">${esc(bk.format || 'Book')}</span></div>
                  <div class="space-y-1 pt-1">
                    <div class="flex justify-between text-[10px] font-tech"><span class="${ac.txt}">PROGRESS: ${esc(bk.progressLabel || `${pct}%`)}</span><span class="${ac.txt} font-bold">${pct}%</span></div>
                    <div class="w-full h-2.5 bg-scrap border ${ac.img} p-0.5"><div class="h-full bg-gradient-to-r ${ac.bar}" style="width:${pct}%"></div></div>
                  </div>
                  ${notes.length ? `<div class="mt-2 bg-scrap border border-rust/30 rounded-sm p-2 max-h-24 overflow-y-auto space-y-1 text-[11px] font-typewriter"><div class="text-[10px] font-tech ${ac.txt} font-bold">MARGIN NOTES:</div>${notes.map((l) => `<p class="text-bone/85">${esc(l)}</p>`).join('')}</div>` : ''}
                </div>
              </div>
            </article>
          `;
        }).join('');
      }

      const vhsBox = $('vhs-list');
      if (vhsBox && Array.isArray(data.directory?.vhs)) {
        const bdr = { pink: ['border-l-pink', 'text-pink', 'border-pink bg-pink/10'], acid: ['border-l-acid', 'text-acid', 'border-acid bg-acid/10'], cyan: ['border-l-cyan', 'text-cyan', 'border-cyan bg-cyan/10'], rust: ['border-l-rust', 'text-rust', 'border-rust bg-rust/10'] };
        vhsBox.innerHTML = data.directory.vhs.map((v) => {
          const [bl, tx, bg] = bdr[v.accent] || bdr.pink;
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
        vhsBox.querySelectorAll('.vhs-toggle-btn').forEach((b) => b.addEventListener('click', () => {
          playFoley('click');
          b.parentElement?.querySelector('.vhs-review')?.classList.toggle('hidden');
        }));
      }

      // 6. Pirate TV 4 Channels
      const tvGrid = $('tv-channels-grid');
      if (tvGrid && Array.isArray(data.directory?.tvChannels)) {
        tvGrid.innerHTML = data.directory.tvChannels.map((ch, idx) => `
          <button type="button" class="tv-ch-btn py-2 px-2 rounded-sm border ${idx === 0 ? 'border-acid bg-acid/20 text-acid font-bold' : 'border-rust/45 bg-void text-bone/80'} hover:border-acid transition"
            data-ch="${esc(ch.ch || `CH 0${idx + 1}`)}" data-title="${esc(ch.title)}" data-embed="${esc(ch.embed)}" data-note="${esc(ch.note)}">
            [ ${esc(ch.ch || `CH 0${idx + 1}`)} ]<br><span class="text-[9px] opacity-80">${esc(ch.label || `CH #${idx + 1}`)}</span>
          </button>
        `).join('');
        const setTvChannel = (btn, withFx = true) => {
          $$('.tv-ch-btn', tvGrid).forEach((b) => {
            const on = b === btn;
            b.classList.toggle('border-acid', on); b.classList.toggle('bg-acid/20', on); b.classList.toggle('text-acid', on); b.classList.toggle('font-bold', on);
            b.classList.toggle('border-rust/45', !on); b.classList.toggle('bg-void', !on); b.classList.toggle('text-bone/80', !on);
          });
          if (withFx) {
            playFoley('static');
            const snow = $('tv-static-overlay');
            if (snow) { snow.classList.remove('hidden', 'tv-static-flash'); void snow.offsetWidth; snow.classList.add('tv-static-flash'); setTimeout(() => snow.classList.add('hidden'), 330); }
          }
          if ($('tv-channel-badge')) $('tv-channel-badge').textContent = `${btn.dataset.ch} // SIGNAL_LOCKED`;
          if ($('tv-now-title')) $('tv-now-title').textContent = btn.dataset.title || '';
          if ($('tv-now-note')) $('tv-now-note').textContent = btn.dataset.note || '';
          if (btn.dataset.embed && $('pirate-tv-iframe')) $('pirate-tv-iframe').src = btn.dataset.embed;
        };
        tvGrid.querySelectorAll('.tv-ch-btn').forEach((b) => b.addEventListener('click', () => setTvChannel(b, true)));
        const firstBtn = tvGrid.querySelector('.tv-ch-btn');
        if (firstBtn) setTvChannel(firstBtn, false);
      }

      // 7. Occult GIFs / Floating Stickers
      const gifsGrid = $('gifs-grid');
      if (gifsGrid && Array.isArray(data.directory?.gifs)) {
        gifsGrid.innerHTML = data.directory.gifs.map((g, i) => `
          <button type="button" class="gif-spawn-card rounded-sm border border-rust/45 bg-void hover:border-acid p-2.5 flex flex-col items-center gap-1.5 transition" data-gif-url="${esc(g.url || '')}" data-gif-idx="${i}">
            ${g.url ? `<img src="${esc(g.url)}" alt="${esc(g.label)}" class="w-14 h-14 object-contain">` : BUILTIN_GIF_SVGS[i % BUILTIN_GIF_SVGS.length]}
            <span class="text-acid truncate max-w-full">${esc(g.label || `RELIC_0${i + 1}.GIF`)}</span>
          </button>
        `).join('');
        gifsGrid.querySelectorAll('.gif-spawn-card').forEach((card) => {
          card.addEventListener('click', () => {
            const layer = $('sticker-layer');
            if (!layer) return;
            while (layer.children.length >= 24) layer.firstElementChild.remove();
            const wrap = document.createElement('div');
            wrap.className = 'fixed pointer-events-auto cursor-pointer select-none p-1.5 rounded-sm border border-acid/60 bg-void/90 shadow-[0_0_16px_rgba(57,255,20,.3)] transition-transform hover:scale-125';
            wrap.title = 'Click sticker to dismiss';
            wrap.style.cssText = `left:${rand(6, 84)}vw;top:${rand(12, 82)}vh;transform:rotate(${rand(-20, 20).toFixed(1)}deg)`;
            const url = card.dataset.gifUrl;
            wrap.innerHTML = url ? `<img src="${esc(url)}" alt="" class="w-16 h-16 object-contain">` : BUILTIN_GIF_SVGS[Number(card.dataset.gifIdx) % BUILTIN_GIF_SVGS.length];
            wrap.addEventListener('click', () => { playFoley('click'); wrap.remove(); });
            layer.appendChild(wrap);
            playFoley('click');
          });
        });
      }

      // 8. Cyber-Locker Content
      const lk = data.directory?.locker;
      if (lk) {
        if ($('locker-p1')) {
          const im = $('locker-p1').querySelector('img'), cp = $('locker-p1').querySelector('.font-display');
          if (im && lk.polaroid1Img) im.src = lk.polaroid1Img;
          if (cp && lk.polaroid1Cap) cp.textContent = lk.polaroid1Cap;
        }
        if ($('locker-p2')) {
          const im = $('locker-p2').querySelector('img'), cp = $('locker-p2').querySelector('.font-display');
          if (im && lk.polaroid2Img) im.src = lk.polaroid2Img;
          if (cp && lk.polaroid2Cap) cp.textContent = lk.polaroid2Cap;
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
          if (p && lk.zineQuote) p.textContent = `"${lk.zineQuote.replace(/^"|"$/g, '')}"`;
        }
        if ($('locker-ticket')) {
          $('locker-ticket').innerHTML = `<div class="flex justify-between text-pink font-bold border-b border-pink/40 pb-1"><span>ADMIT ONE</span><span>${esc(lk.ticketNo || 'NO. 0666')}</span></div><div class="text-bone mt-1 font-bold">${esc(lk.ticketTitle || '[TICKET]')}</div><div class="text-ash text-[9px]">${esc(lk.ticketDate || '')}</div>`;
        }
      }

      // 9. Signal Relays + Matching 88x31 Stamps
      const rel = data.directory?.relays;
      if (rel) {
        if ($('rel-sub-title-out')) $('rel-sub-title-out').textContent = rel.substackTitle || '';
        if ($('rel-sub-date-out')) $('rel-sub-date-out').textContent = rel.substackDate ? `PUBLISHED: ${rel.substackDate}` : '';
        if ($('rel-sub-teaser-out')) $('rel-sub-teaser-out').textContent = rel.substackTeaser || '';
        if ($('rel-sub-url-out') && rel.substackUrl) $('rel-sub-url-out').href = rel.substackUrl;
        if ($('stamp-substack') && rel.substackUrl) $('stamp-substack').href = rel.substackUrl;

        if ($('rel-ig-card') && rel.igUrl) $('rel-ig-card').href = rel.igUrl;
        if ($('stamp-instagram') && rel.igUrl) $('stamp-instagram').href = rel.igUrl;
        if ($('rel-ig-handle-out')) $('rel-ig-handle-out').textContent = `@${(rel.igHandle || '').replace(/^@/, '')}`;
        if ($('rel-ig-bio-out')) $('rel-ig-bio-out').textContent = rel.igBio || '';
        if ($('rel-ig-img1') && rel.igImg1) $('rel-ig-img1').src = rel.igImg1;
        if ($('rel-ig-img2') && rel.igImg2) $('rel-ig-img2').src = rel.igImg2;
        if ($('rel-ig-img3') && rel.igImg3) $('rel-ig-img3').src = rel.igImg3;

        if ($('rel-tt-card') && rel.ttUrl) $('rel-tt-card').href = rel.ttUrl;
        if ($('stamp-tiktok') && rel.ttUrl) $('stamp-tiktok').href = rel.ttUrl;
        if ($('rel-tt-handle-out')) $('rel-tt-handle-out').textContent = `@${(rel.ttHandle || '').replace(/^@/, '')}`;
        if ($('rel-tt-bio-out')) $('rel-tt-bio-out').textContent = rel.ttBio || '';

        if ($('rel-fb-card') && rel.fbUrl) $('rel-fb-card').href = rel.fbUrl;
        if ($('stamp-facebook') && rel.fbUrl) $('stamp-facebook').href = rel.fbUrl;
        if ($('rel-fb-handle-out')) $('rel-fb-handle-out').textContent = `/${(rel.fbHandle || '').replace(/^\//, '')}`;
        if ($('rel-fb-bio-out')) $('rel-fb-bio-out').textContent = rel.fbBio || '';

        if ($('relay-deadnet-list') && rel.deadnetLinks) {
          const pal = [['hover:border-acid', 'text-acid'], ['hover:border-pink', 'text-pink'], ['hover:border-cyan', 'text-cyan'], ['hover:border-rust', 'text-rust']];
          $('relay-deadnet-list').innerHTML = rel.deadnetLinks.split('\n').filter((l) => l.trim()).map((line, i) => {
            const [lbl, url, tag] = line.split('|').map((s) => s.trim());
            const [hb, tx] = pal[i % pal.length];
            return `<a href="${esc(url || '#')}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between p-2.5 rounded-sm border border-rust/35 bg-void/85 ${hb} transition font-tech text-xs"><span class="${tx} font-bold">↗ ${esc(lbl)}</span><span class="text-[10px] text-ash">[${esc(tag || 'RELAY')}]</span></a>`;
          }).join('');
        }
      }

      // 10. Giscus Guestbook, Inline Ads, 15 Pop-Up Ads & Archive
      mountGiscusIfConfigured(data.integrations);
      hydrateInlineAds(data.inlineAds);
      if (Array.isArray(data.popupAds)) {
        livePopupAds = data.popupAds.filter((a) => a && a.enabled !== false);
        refreshAdDirUI();
        if (!popupCycleTimer) {
          setTimeout(() => { if (!document.hidden && !calmOn) spawnRandomPopup(); schedulePopupCycle(); }, 2800);
        }
      }
      renderArchiveWidget(data.archive || []);
      return true;
    } catch (err) {
      console.warn('updates.json sync skipped:', err);
      return false;
    }
  }

  // VHS Filters
  const vhsFilterBtns = $$('.vhs-filter-btn');
  vhsFilterBtns.forEach((b) => b.addEventListener('click', () => {
    playFoley('click');
    vhsFilterBtns.forEach((x) => {
      const on = x === b;
      x.classList.toggle('border-pink', on); x.classList.toggle('bg-pink/20', on); x.classList.toggle('text-pink', on); x.classList.toggle('font-bold', on);
      x.classList.toggle('border-rust/40', !on); x.classList.toggle('bg-void', !on); x.classList.toggle('text-ash', !on);
    });
    const f = b.dataset.vhsFilter || 'all';
    $$('.vhs-card').forEach((c) => c.classList.toggle('hidden', f !== 'all' && c.dataset.vhsType !== f));
  }));
  $('btn-clear-stickers')?.addEventListener('click', () => { if ($('sticker-layer')) $('sticker-layer').innerHTML = ''; playFoley('click'); });

  hydrateFromUpdatesJson();

  /* ==========================================================================
     13. SIGIL RADAR EYE, RUNE CURSOR TRAIL & AURA SCANNER
     ========================================================================== */
  const radarPupil = $('radar-pupil'), radarSvg = $('radar-svg'), radarCoords = $('radar-coords');
  const runeTrailLayer = $('rune-trail-layer');
  const trailRunes = ['ᛟ', '☽', '⌖', '✦', '⛨', 'ᛉ', '0', '1', '†'];
  const trailColors = ['#39ff14', '#ff1f6d', '#00f0ff', '#d48c28', '#f5d27a'];
  let lastTrail = 0, ptrX = 0, ptrY = 0, radarPending = false;

  function spawnRuneParticle(x, y) {
    if (!runeTrailLayer || calmOn) return;
    const cap = window.innerWidth < 768 ? 16 : 30;
    while (runeTrailLayer.children.length >= cap) runeTrailLayer.firstElementChild.remove();
    const s = document.createElement('span');
    s.className = 'rune-trail-particle';
    s.textContent = pick(trailRunes);
    s.style.cssText = `left:${x}px;top:${y}px;font-size:${11 + Math.floor(Math.random() * 7)}px;color:${pick(trailColors)}`;
    runeTrailLayer.appendChild(s);
    setTimeout(() => s.remove(), 700);
  }

  $('btn-trail-status')?.addEventListener('click', () => {
    playFoley('tarot');
    const r = $('btn-trail-status').getBoundingClientRect();
    for (let i = 0; i < 12; i++) setTimeout(() => spawnRuneParticle(r.left + r.width / 2 + rand(-55, 55), r.top + rand(8, 52)), i * 24);
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

  const AURA_TITLES = ['LEVEL 4 NEON NECROMANCER', 'ROGUE RADIO SCAVENGER', 'CURSED HTML ARCHIVIST', '3AM CAFFEINE ALCHEMIST', 'CYBER-PAGAN SIGNAL WITCH', 'BOOTLEG VHS SOMMELIER', 'SECTOR 09 GHOST IN THE WIRE'];
  const AURA_NOTES = ['Mild sigil interference detected near your left browser tab.', 'Your cursor emits high levels of nostalgic CRT phosphor.', 'Compatible with z3itq3ist frequency. Do not feed after midnight.', 'Warning: Too cool for modern corporate social feeds.'];

  function runAuraScan() {
    clearInterval(auraInterval);
    setModal($('aura-modal'), true);
    playFoley('static');
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
      stream.textContent = `>> SCAN COMPLETE // CLASS ASSIGNED:\n   [ ${pick(AURA_TITLES)} ]\n\n• CAFFEINATED: ${54 + Math.floor(Math.random() * 46)}%\n• HAUNTED: ${12 + Math.floor(Math.random() * 83)}%\n• NODE COMPATIBILITY: ${74 + Math.floor(Math.random() * 26)}%\n• DIAGNOSIS: ${pick(AURA_NOTES)}`;
    }, 155);
  }
  $('btn-aura-scan')?.addEventListener('click', runAuraScan);
  $('aura-rescan-btn')?.addEventListener('click', runAuraScan);

  /* ==========================================================================
     14. CHAOS OVERDRIVE + MATRIX GREEN RAIN
     ========================================================================== */
  const matrixWrap = $('matrix-rain-wrapper'), matrixCanvas = $('matrix-rain-canvas'), matrixCtx = matrixCanvas?.getContext('2d');
  let matrixRaf = null, matrixLast = 0, matrixDrops = [], matrixCols = 0;
  const chaosTimers = new Set();
  const addChaosTimer = (fn, ms) => { const id = setTimeout(() => { chaosTimers.delete(id); fn(); }, ms); chaosTimers.add(id); return id; };
  const clearChaosTimers = () => { chaosTimers.forEach(clearTimeout); chaosTimers.clear(); };
  let chaosHideTimer = null;

  function resizeMatrix() {
    if (!matrixCanvas || !matrixCtx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = window.innerWidth, h = window.innerHeight;
    matrixCanvas.width = Math.floor(w * dpr); matrixCanvas.height = Math.floor(h * dpr);
    matrixCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    matrixCtx.font = '700 16px "Share Tech Mono", monospace';
    matrixCtx.textBaseline = 'top';
    matrixCols = Math.ceil(w / 16);
    matrixDrops = Array.from({ length: matrixCols }, () => Math.floor(Math.random() * 35));
  }

  function renderMatrix(ts) {
    if (!chaosOn || !matrixCtx) return;
    matrixRaf = requestAnimationFrame(renderMatrix);
    if (ts - matrixLast < 48) return;
    matrixLast = ts;
    const w = window.innerWidth, h = window.innerHeight;
    matrixCtx.fillStyle = 'rgba(4, 7, 5, .15)';
    matrixCtx.fillRect(0, 0, w, h);
    for (let i = 0; i < matrixCols; i++) {
      const y = matrixDrops[i] * 16;
      matrixCtx.fillStyle = Math.random() < .15 ? '#c8ffbd' : '#39ff14';
      matrixCtx.fillText(String(Math.floor(Math.random() * 10)), i * 16, y);
      matrixDrops[i] = y > h && Math.random() > .94 ? 0 : matrixDrops[i] + 1;
    }
  }

  function setChaos(on) {
    chaosOn = on;
    const btn = $('btn-overdrive');
    if (btn) {
      btn.textContent = on ? 'CHAOS: ON' : 'CHAOS: OFF';
      btn.classList.toggle('bg-pink', on); btn.classList.toggle('text-void', on);
      btn.classList.toggle('bg-scrap', !on); btn.classList.toggle('text-pink', !on);
    }
    clearChaosTimers();
    const panels = $$('header.cyber-panel, aside .cyber-panel, main .cyber-panel, footer.cyber-panel');
    if (on) {
      document.body.classList.add('overdrive-mode');
      matrixWrap?.classList.remove('hidden');
      resizeMatrix();
      matrixRaf = requestAnimationFrame(renderMatrix);
      unlockRelic('chaos_survivor');
      playFoley('static');

      panels.forEach((p) => {
        const drift = () => {
          if (!chaosOn) return;
          if (!p.matches(':hover') && !p.matches(':focus-within')) {
            p.style.transition = `transform ${rand(.3, .8).toFixed(2)}s cubic-bezier(.22,1,.36,1)`;
            p.style.transform = `translate3d(${rand(-22, 22).toFixed(1)}px,${rand(-20, 20).toFixed(1)}px,0) rotate(${rand(-4.5, 4.5).toFixed(1)}deg)`;
            if (Math.random() < .35) { p.classList.add('chaos-glitching'); addChaosTimer(() => p.classList.remove('chaos-glitching'), 260); }
          }
          addChaosTimer(drift, rand(420, 1080));
        };
        drift();
      });

      clearTimeout(chaosHideTimer);
      btn?.classList.add('hidden');
      chaosHideTimer = setTimeout(() => btn?.classList.remove('hidden'), 10000);
    } else {
      clearTimeout(chaosHideTimer);
      btn?.classList.remove('hidden');
      document.body.classList.remove('overdrive-mode');
      cancelAnimationFrame(matrixRaf);
      matrixWrap?.classList.add('hidden');
      panels.forEach((p) => {
        p.classList.remove('chaos-glitching', 'chaos-blinking');
        p.classList.add('chaos-returning');
        p.style.transform = 'translate3d(0,0,0) rotate(0deg)';
      });
      addChaosTimer(() => panels.forEach((p) => { p.classList.remove('chaos-returning'); p.style.transition = ''; p.style.transform = ''; }), 700);
    }
  }
  $('btn-overdrive')?.addEventListener('click', () => setChaos(!chaosOn));

  /* ==========================================================================
     15. OCCULT 5-LINE MARGINS, CHIBI SERAPHIMS & GILDED ARCH-SERAPH BOSS
     ========================================================================== */
  const veilCanvas = $('z3-occult-veil-canvas');
  const veilCtx = veilCanvas?.getContext('2d');
  const seraphLayer = $('z3-seraph-layer');
  const PAGAN_GLYPHS = ['ᛟ', 'ᛉ', 'ᚦ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛊ', 'ᛏ', '⛨', '☽', '☾', '⌖', '✦', '✧', '⚚', '⛧', '☥', '☸', '⟐', '†'];
  const CORRUPTED = ['Ø', 'Æ', 'Ð', 'Þ', 'Ʃ', 'Ƹ', 'Ѫ', '҂', '§', '¤', 'Ж', 'Ψ', 'Ω', 'Ξ', '▓', '▒', '░', '╬', '╳', '≠', '∑', '∞', '0', '1', '3', '6', '9'];
  const GREEN_PAL = ['#39ff14', '#55ff33', '#16f26b', '#00e676', '#88ff4d'];
  const PRISM_PAL = ['#00f0ff', '#ff1f6d', '#f5d27a', '#c084fc', '#38bdf8', '#ff66b2'];
  const MARGIN_SPECS = [
    { thick: 4.4, fontSize: 15, speed: 34, dir:  1, gap: 22, alpha: .80, bias: .62 },
    { thick: 0.9, fontSize: 10, speed: 56, dir: -1, gap: 15, alpha: .70, bias: .72 },
    { thick: 3.1, fontSize: 14, speed: 24, dir:  1, gap: 20, alpha: .74, bias: .44 },
    { thick: 1.5, fontSize: 11, speed: 45, dir: -1, gap: 17, alpha: .64, bias: .58 },
    { thick: 2.3, fontSize: 13, speed: 30, dir:  1, gap: 19, alpha: .52, bias: .50 }
  ];

  let vw = window.innerWidth, vh = window.innerHeight;
  let streams = [], patches = [], gradCache = new Map();
  const seraphs = [];
  let activeBoss = null;

  function updateKillBadge() {
    if ($('seraph-kill-badge')) $('seraph-kill-badge').textContent = `✦ BANISHED: ${String(seraphKills).padStart(2, '0')}`;
  }
  updateKillBadge();

  function buildVeilScene() {
    if (!veilCanvas || !veilCtx) return;
    vw = window.innerWidth; vh = window.innerHeight;
    const mob = vw < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, mob ? 1.25 : 1.6);
    veilCanvas.width = Math.floor(vw * dpr); veilCanvas.height = Math.floor(vh * dpr);
    veilCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    gradCache.clear();

    const bandWidth = mob ? 34 : Math.max(76, Math.min(190, Math.max(0, (vw - 1280) / 2) + 46));
    streams = [];
    ['left', 'right'].forEach((side) => {
      for (let i = 0; i < 5; i++) {
        const sp = MARGIN_SPECS[i];
        const frac = (i + 0.45) / 5.1;
        const x = side === 'left' ? (mob ? 4 : 8) + frac * (bandWidth - (mob ? 6 : 14)) : vw - ((mob ? 4 : 8) + frac * (bandWidth - (mob ? 6 : 14)));
        const effGap = mob ? Math.round(sp.gap * 1.2) : sp.gap;
        const slots = Math.ceil((vh + 120) / effGap) + 3;
        streams.push({
          side, index: i, x, offset: rand(0, effGap * 3), ...sp,
          thick: mob ? Math.max(0.8, sp.thick * 0.8) : sp.thick,
          fontSize: mob ? Math.max(9, Math.round(sp.fontSize * 0.82)) : sp.fontSize,
          gap: effGap,
          dir: side === 'right' ? -sp.dir : sp.dir,
          glyphs: Array.from({ length: slots }, () => ({ ch: Math.random() < .58 ? pick(PAGAN_GLYPHS) : pick(CORRUPTED) }))
        });
      }
    });

    const pCnt = mob ? 6 : 14;
    patches = Array.from({ length: pCnt }, (_, i) => {
      const onMargin = i < pCnt * 0.72;
      const isGreen = Math.random() < .56;
      const col = isGreen ? pick(GREEN_PAL) : pick(PRISM_PAL);
      const rx = rand(mob ? 28 : 42, mob ? 68 : 115);
      const grad = veilCtx.createRadialGradient(0, 0, 2, 0, 0, rx);
      grad.addColorStop(0, col);
      grad.addColorStop(0.55, isGreen ? 'rgba(57,255,20,.26)' : 'rgba(0,240,255,.18)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      return {
        x: onMargin ? (i % 2 === 0 ? rand(0, bandWidth * 1.2) : rand(vw - bandWidth * 1.2, vw)) : rand(vw * .15, vw * .85),
        y: rand(0, vh), rx, ry: rand(20, 62), vx: rand(-6, 6), vy: rand(-11, 11),
        grad, alpha: onMargin ? rand(.08, .14) : rand(.025, .05), phase: rand(0, Math.PI * 2)
      };
    });
  }

  const buildSeraphSVG = (v, m, p, isBoss = false) => isBoss
    ? `<svg viewBox="0 0 80 64" fill="none" stroke-linecap="round" stroke-linejoin="round"><g class="sr-halo"><ellipse cx="40" cy="6" rx="16" ry="4" stroke="#f5d27a" stroke-width="2.4"/><polygon points="40,0 42,5 47,6 42,7 40,12 38,7 33,6 38,5" fill="#39ff14"/></g><g class="sr-wing-top-l"><path d="M34 22 C22 6, 4 6, 4 17 C10 19, 17 19, 25 24" stroke="#f5d27a" stroke-width="2.2"/></g><g class="sr-wing-top-r"><path d="M46 22 C58 6, 76 6, 76 17 C70 19, 63 19, 55 24" stroke="#f5d27a" stroke-width="2.2"/></g><g class="sr-wing-mid-l"><path d="M30 29 C16 18, 1 22, 2 34 C9 36, 15 34, 19 39 C24 38, 28 35, 31 32" stroke="#ff1f6d" stroke-width="2.4"/></g><g class="sr-wing-mid-r"><path d="M50 29 C64 18, 79 22, 78 34 C71 36, 65 34, 61 39 C56 38, 52 35, 49 32" stroke="#ff1f6d" stroke-width="2.4"/></g><ellipse cx="40" cy="31" rx="18" ry="10" transform="rotate(-18 40 31)" stroke="#00f0ff" stroke-width="1.8"/><ellipse cx="40" cy="31" rx="18" ry="10" transform="rotate(18 40 31)" stroke="#39ff14" stroke-width="1.8"/><g class="sr-eye"><path d="M25 31 Q40 16 55 31 Q40 46 25 31 Z" stroke="#f5d27a" stroke-width="2.4"/><circle cx="40" cy="31" r="6" stroke="#ff1f6d" stroke-width="2"/><circle cx="40" cy="31" r="2.5" fill="#39ff14"/></g></svg>`
    : v === 0
      ? `<svg viewBox="0 0 80 64" fill="none" stroke-linecap="round" stroke-linejoin="round"><g class="sr-halo"><ellipse cx="40" cy="9" rx="11" ry="3.2" stroke="${p}" stroke-width="1.9"/></g><g class="sr-wing-top-l"><path d="M35 23 C27 11, 14 11, 13 19 C16 20, 21 20, 26 24" stroke="${p}" stroke-width="1.8"/></g><g class="sr-wing-top-r"><path d="M45 23 C53 11, 66 11, 67 19 C64 20, 59 20, 54 24" stroke="${p}" stroke-width="1.8"/></g><g class="sr-wing-mid-l"><path d="M31 28 C20 20, 5 22, 4 31 C9 32, 13 31, 15 35 C19 35, 22 33, 25 36 C28 35, 30 33, 32 31" stroke="${m}" stroke-width="2.1"/></g><g class="sr-wing-mid-r"><path d="M49 28 C60 20, 75 22, 76 31 C71 32, 67 31, 65 35 C61 35, 58 33, 55 36 C52 35, 50 33, 48 31" stroke="${m}" stroke-width="2.1"/></g><g class="sr-eye"><path d="M27 29 Q40 16 53 29 Q40 42 27 29 Z" stroke="${m}" stroke-width="2.2"/><circle cx="40" cy="29" r="5.5" stroke="${p}" stroke-width="1.8"/><circle cx="40" cy="29" r="2" stroke="${m}" stroke-width="1.6"/></g></svg>`
      : v === 1
        ? `<svg viewBox="0 0 80 64" fill="none" stroke-linecap="round" stroke-linejoin="round"><g class="sr-halo"><ellipse cx="40" cy="8.5" rx="10" ry="2.8" stroke="${m}" stroke-width="1.9"/></g><g class="sr-wing-mid-l"><path d="M31 31 C19 25, 6 28, 7 37 C12 38, 16 37, 19 41 C23 40, 27 38, 31 35" stroke="${m}" stroke-width="2.1"/></g><g class="sr-wing-mid-r"><path d="M49 31 C61 25, 74 28, 73 37 C68 38, 64 37, 61 41 C57 40, 53 38, 49 35" stroke="${m}" stroke-width="2.1"/></g><circle cx="40" cy="24" r="9.2" stroke="${m}" stroke-width="2.1"/><g class="sr-eye"><path d="M36 23.5 Q37 21.5 38 23.5 M42 23.5 Q43 21.5 44 23.5" stroke="${p}" stroke-width="1.8"/><path d="M38.5 27 Q40 28.5 41.5 27" stroke="${m}" stroke-width="1.5"/></g><path d="M34 33 L30 46 Q40 50 50 46 L46 33" stroke="${m}" stroke-width="1.9"/></svg>`
        : `<svg viewBox="0 0 80 64" fill="none" stroke-linecap="round" stroke-linejoin="round"><g class="sr-halo"><path d="M40 4 L42 9 L47 10 L42 11 L40 16 L38 11 L33 10 L38 9 Z" stroke="${p}" stroke-width="1.6"/></g><g class="sr-wing-mid-l"><path d="M24 29 C13 21, 5 25, 7 34 C12 36, 17 34, 21 37" stroke="${m}" stroke-width="2.0"/></g><g class="sr-wing-mid-r"><path d="M56 29 C67 21, 75 25, 73 34 C68 36, 63 34, 59 37" stroke="${m}" stroke-width="2.0"/></g><ellipse cx="40" cy="33" rx="16" ry="9" transform="rotate(-24 40 33)" stroke="${p}" stroke-width="1.85"/><ellipse cx="40" cy="33" rx="16" ry="9" transform="rotate(24 40 33)" stroke="${m}" stroke-width="1.85"/><circle cx="40" cy="33" r="6.8" stroke="${m}" stroke-width="2.0"/></svg>`;

  function spawnSeraphSpark(x, y, col, burst = false) {
    if (!seraphLayer || calmOn) return;
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
    if ($('z3-boss-hp-txt')) $('z3-boss-hp-txt').textContent = `HP: ${activeBoss.hp} / ${activeBoss.maxHp}`;
    if ($('z3-boss-hp-bar')) $('z3-boss-hp-bar').style.width = `${Math.round((activeBoss.hp / activeBoss.maxHp) * 100)}%`;
  }

  function spawnArchSeraphBoss() {
    if (!seraphLayer || (activeBoss && !activeBoss.dead)) return;
    const el = document.createElement('div');
    el.className = 'z3-seraph is-boss';
    el.style.setProperty('--sr-flap', '0.42s');
    el.innerHTML = buildSeraphSVG(0, '#f5d27a', '#ff1f6d', true);
    seraphLayer.appendChild(el);
    const boss = {
      el, dead: false, isBoss: true, hp: 3, maxHp: 3,
      x: vw / 2, y: 120, vx: rand(-60, 60), vy: rand(-40, 40),
      tx: rand(80, Math.max(120, vw - 80)), ty: rand(100, Math.max(160, vh - 140)),
      speed: 88, scale: 1.08, bobPhase: 0, bobFreq: 3.4, facing: 1,
      m: '#f5d27a', p: '#ff1f6d', sparkTimer: 0.4, retargetTimer: 2.2
    };
    el.addEventListener('pointerdown', (e) => { e.stopPropagation(); hitSeraph(boss); });
    activeBoss = boss;
    seraphs.push(boss);
    updateBossHud();
    playFoley('fanfare');
    showToast('⚠ GILDED ARCH-SERAPH SPAWNED!', 'Click it 3 times to banish it and claim the relic!', 'gold');
  }

  function hitSeraph(obj) {
    if (!obj || obj.dead) return;
    playFoley('zap');
    if (obj.isBoss && obj.hp > 1) {
      obj.hp -= 1;
      obj.el.classList.add('is-hit');
      setTimeout(() => obj.el.classList.remove('is-hit'), 180);
      for (let k = 0; k < 7; k++) spawnSeraphSpark(obj.x + rand(-26, 26), obj.y + rand(-20, 20), k % 2 ? '#f5d27a' : '#ff1f6d', true);
      updateBossHud();
      return;
    }

    obj.dead = true;
    const idx = seraphs.indexOf(obj);
    if (idx !== -1) seraphs.splice(idx, 1);
    const spCount = obj.isBoss ? 18 : (vw < 768 ? 4 : 8);
    for (let k = 0; k < spCount; k++) spawnSeraphSpark(obj.x + rand(-24, 24), obj.y + rand(-20, 20), k % 2 ? obj.m : obj.p, true);

    obj.el.classList.add('is-vanishing');
    obj.el.style.transform = `translate3d(${(obj.x - 36).toFixed(1)}px,${(obj.y - 30).toFixed(1)}px,0) scale(0.15) rotate(45deg)`;
    setTimeout(() => obj.el.remove(), 180);

    seraphKills += 1;
    try { localStorage.setItem(KEYS.kills, String(seraphKills)); } catch {}
    updateKillBadge();

    if (obj.isBoss) {
      activeBoss = null;
      updateBossHud();
      unlockRelic('arch_vanquisher');
      showModal('👑 ARCH-SERAPH BANISHED', 'You shattered the Gilded Arch-Seraph of Sector 09!\n\n"The static bows to the persistent operator. Keep exploring the hidden terminals."');
    } else {
      if (seraphKills >= 5) unlockRelic('seraph_slayer');
      if (seraphKills > 0 && seraphKills % 7 === 0) spawnArchSeraphBoss();
    }
  }

  function initSeraphims() {
    if (!seraphLayer) return;
    seraphLayer.innerHTML = ''; seraphs.length = 0; activeBoss = null; updateBossHud();
    const mob = vw < 768;
    const count = mob ? 4 : 7;
    const pairs = [['#39ff14', '#00f0ff', 'rgba(57,255,20,.88)'], ['#00f0ff', '#ff1f6d', 'rgba(0,240,255,.88)'], ['#39ff14', '#f5d27a', 'rgba(245,210,122,.88)'], ['#ff4da6', '#39ff14', 'rgba(255,31,109,.88)'], ['#c084fc', '#39ff14', 'rgba(192,132,252,.88)']];
    for (let i = 0; i < count; i++) {
      const [m, p, glow] = pairs[i % pairs.length];
      const el = document.createElement('div');
      el.className = 'z3-seraph';
      el.style.setProperty('--sr-glow', glow);
      el.style.setProperty('--sr-flap', `${rand(.46, .74).toFixed(2)}s`);
      el.innerHTML = buildSeraphSVG(i % 3, m, p, false);
      seraphLayer.appendChild(el);
      const obj = {
        el, dead: false, isBoss: false,
        x: rand(30, Math.max(80, vw - 30)), y: rand(70, Math.max(120, vh - 90)),
        vx: rand(-30, 30), vy: rand(-22, 22),
        tx: rand(30, Math.max(80, vw - 30)), ty: rand(70, Math.max(120, vh - 90)),
        speed: mob ? rand(46, 72) : rand(38, 66), scale: rand(.84, 1.1),
        bobPhase: rand(0, Math.PI * 2), bobFreq: rand(2.2, 3.6), facing: 1,
        m, p, sparkTimer: rand(1.1, 2.8), retargetTimer: rand(2.4, 5.4)
      };
      el.addEventListener('pointerdown', (e) => { e.stopPropagation(); hitSeraph(obj); });
      seraphs.push(obj);
    }
  }

  let veilLastTs = 0, veilElapsed = 0;
  function tickVeilAndSeraphs(ts) {
    requestAnimationFrame(tickVeilAndSeraphs);
    if (document.hidden || calmOn) { veilLastTs = ts; return; }
    if (!veilLastTs) veilLastTs = ts;
    const mob = vw < 768;
    if (mob && ts - veilLastTs < 32) return;
    const dt = Math.min(0.05, Math.max(0.001, (ts - veilLastTs) / 1000));
    veilLastTs = ts; veilElapsed += dt;

    if (veilCtx) {
      veilCtx.clearRect(0, 0, vw, vh);
      const boost = chaosOn ? 2.1 : 1;
      veilCtx.save();
      veilCtx.globalCompositeOperation = 'lighter';
      for (const p of patches) {
        p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.y < -p.ry) p.y = vh + p.ry; if (p.y > vh + p.ry) p.y = -p.ry;
        if (p.x < -p.rx) p.x = vw + p.rx; if (p.x > vw + p.rx) p.x = -p.rx;
        veilCtx.globalAlpha = p.alpha * (0.76 + 0.24 * Math.sin(veilElapsed * 0.9 + p.phase));
        veilCtx.fillStyle = p.grad;
        veilCtx.save();
        veilCtx.translate(p.x, p.y);
        veilCtx.scale(1, p.ry / p.rx);
        veilCtx.beginPath(); veilCtx.arc(0, 0, p.rx, 0, Math.PI * 2); veilCtx.fill();
        veilCtx.restore();
      }
      veilCtx.restore();

      veilCtx.save();
      veilCtx.textAlign = 'center'; veilCtx.textBaseline = 'middle';
      for (const st of streams) {
        st.offset = (st.offset + st.speed * dt * st.dir * boost) % st.gap;
        if (st.offset < 0) st.offset += st.gap;
        const gKey = `${st.side}-${st.index}-${vh}`;
        let vg = gradCache.get(gKey);
        if (!vg) {
          vg = veilCtx.createLinearGradient(st.x, 0, st.x, vh);
          vg.addColorStop(0, 'rgba(57,255,20,.88)'); vg.addColorStop(0.25, 'rgba(0,240,255,.82)');
          vg.addColorStop(0.5, 'rgba(57,255,20,.26)'); vg.addColorStop(0.75, 'rgba(255,31,109,.84)'); vg.addColorStop(1, 'rgba(192,132,252,.8)');
          gradCache.set(gKey, vg);
        }
        veilCtx.strokeStyle = vg; veilCtx.lineWidth = st.thick; veilCtx.globalAlpha = st.alpha * 0.5;
        veilCtx.setLineDash(st.index % 2 === 0 ? [20, 8, 5, 10] : [8, 6, 34, 10]);
        veilCtx.lineDashOffset = -veilElapsed * st.speed * st.dir * 0.9;
        veilCtx.beginPath(); veilCtx.moveTo(st.x, 0); veilCtx.lineTo(st.x, vh); veilCtx.stroke();
        veilCtx.setLineDash([]);

        veilCtx.font = `700 ${st.fontSize}px "Share Tech Mono", monospace`;
        for (let k = 0; k < st.glyphs.length; k++) {
          const y = (k - 1) * st.gap + st.offset;
          if (y < -20 || y > vh + 20) continue;
          const slot = st.glyphs[k];
          if (Math.random() < .018 * boost) slot.ch = Math.random() < .58 ? pick(PAGAN_GLYPHS) : pick(CORRUPTED);
          const wv = Math.sin(y * 0.015 + veilElapsed * 1.1 + st.index * 1.3) * 0.5 + 0.5;
          veilCtx.globalAlpha = st.alpha * (0.35 + wv * 0.65);
          veilCtx.fillStyle = wv < st.bias ? GREEN_PAL[k % GREEN_PAL.length] : PRISM_PAL[(k + st.index) % PRISM_PAL.length];
          veilCtx.fillText(slot.ch, st.x, y);
        }
      }
      veilCtx.restore();
    }

    const sBoost = chaosOn ? 1.75 : 1;
    for (let i = seraphs.length - 1; i >= 0; i--) {
      const s = seraphs[i];
      if (s.dead) continue;
      s.retargetTimer -= dt;
      const dx = s.tx - s.x, dy = s.ty - s.y, dist = Math.hypot(dx, dy);
      if (dist < 40 || s.retargetTimer <= 0) {
        s.tx = rand(30, Math.max(80, vw - 30)); s.ty = rand(72, Math.max(120, vh - 96));
        s.retargetTimer = rand(2.4, 5.4);
      }
      s.vx += (((dx / (dist || 1)) * s.speed * sBoost) - s.vx) * Math.min(1, dt * 1.5);
      s.vy += (((dy / (dist || 1)) * s.speed * sBoost) - s.vy) * Math.min(1, dt * 1.5);
      if (!mob && !s.isBoss) {
        const pdx = s.x - ptrX, pdy = s.y - ptrY, pDist = Math.hypot(pdx, pdy);
        if (pDist < 90 && pDist > 1) { const push = ((90 - pDist) / 90) * 175 * dt; s.vx += (pdx / pDist) * push; s.vy += (pdy / pDist) * push; }
      }
      s.x += s.vx * dt; s.y += s.vy * dt;
      if (s.x < 26) { s.x = 26; s.vx = Math.abs(s.vx); } if (s.x > vw - 26) { s.x = vw - 26; s.vx = -Math.abs(s.vx); }
      if (s.y < 58) { s.y = 58; s.vy = Math.abs(s.vy); } if (s.y > vh - 58) { s.y = vh - 58; s.vy = -Math.abs(s.vy); }
      if (Math.abs(s.vx) > 5) s.facing = s.vx >= 0 ? 1 : -1;
      const bobY = Math.sin(veilElapsed * s.bobFreq + s.bobPhase) * 6.5;
      const hw = s.isBoss ? 59 : 36, hh = s.isBoss ? 49 : 30;
      s.el.style.transform = `translate3d(${(s.x - hw).toFixed(1)}px,${(s.y - hh + bobY).toFixed(1)}px,0) scale(${(s.scale * s.facing).toFixed(2)},${s.scale.toFixed(2)}) rotate(${Math.max(-16, Math.min(16, s.vx * 0.14 * s.facing)).toFixed(1)}deg)`;
      if ((s.sparkTimer -= dt) <= 0) { s.sparkTimer = rand(mob ? 2.2 : 1.4, 3.6); spawnSeraphSpark(s.x, s.y + bobY, Math.random() < .5 ? s.m : s.p); }
    }
  }
  buildVeilScene();
  initSeraphims();
  requestAnimationFrame(tickVeilAndSeraphs);

  /* ==========================================================================
     16. KONAMI CODE & UPGRADED HACKER CLI TERMINAL (↑/↓ HISTORY + NEOFETCH)
     ========================================================================== */
  function triggerKonamiVault() {
    konamiUnlocked = true;
    try { localStorage.setItem(KEYS.konamiUnlocked, '1'); } catch {}
    $('btn-track-konami')?.classList.remove('hidden');
    unlockRelic('root_access');
    setModal($('konami-modal'), true);
    playFoley('fanfare');
  }
  $('btn-konami-track')?.addEventListener('click', () => {
    setModal($('konami-modal'), false);
    selectTrack('konami', true);
  });

  const KONAMI_SEQ = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
  let konamiPos = 0;
  window.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea')) return;
    const k = e.key.toLowerCase();
    if (k === KONAMI_SEQ[konamiPos]) {
      konamiPos++;
      if (konamiPos === KONAMI_SEQ.length) { konamiPos = 0; triggerKonamiVault(); }
    } else konamiPos = k === KONAMI_SEQ[0] ? 1 : 0;
  });

  const cliOut = $('cli-output'), cliIn = $('cli-input');
  const cliHistory = [];
  let cliHistIdx = -1;

  const logCli = (txt) => {
    if (!cliOut) return;
    cliOut.classList.remove('hidden');
    cliOut.textContent = (cliOut.textContent ? cliOut.textContent + '\n' : '') + txt;
    cliOut.scrollTop = cliOut.scrollHeight;
  };

  cliIn?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      if (!cliHistory.length) return;
      e.preventDefault();
      cliHistIdx = Math.min(cliHistory.length - 1, cliHistIdx + 1);
      cliIn.value = cliHistory[cliHistory.length - 1 - cliHistIdx];
    } else if (e.key === 'ArrowDown') {
      if (!cliHistory.length) return;
      e.preventDefault();
      cliHistIdx = Math.max(-1, cliHistIdx - 1);
      cliIn.value = cliHistIdx === -1 ? '' : cliHistory[cliHistory.length - 1 - cliHistIdx];
    }
  });

  $('cli-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const raw = cliIn?.value.trim();
    if (!raw) return;
    cliHistory.push(raw);
    if (cliHistory.length > 40) cliHistory.shift();
    cliHistIdx = -1;
    cliIn.value = '';
    const cmd = raw.toLowerCase();
    playFoley('click');
    logCli(`$ ${raw}`);

    if (cmd === 'help') {
      logCli('COMMANDS: help | neofetch | ls | whoami | cat manifesto.txt | badges | boss | konami | bios | aura | tarot | tarot3 | seraph | veil | sync | resetads | theme acid|rust|pink|cyan | clear');
    } else if (cmd === 'clear') {
      if (cliOut) { cliOut.textContent = ''; cliOut.classList.add('hidden'); }
    } else if (cmd === 'neofetch') {
      const op = siteData?.operator || {};
      logCli(
`   .---.    ${op.alias || 'z3itq3ist'}@sector-09
  / o o \\   -----------------------
  |  ^  |   OS: RUNE_OS // SCRAP-9 (GitHub Pages)
  \\ === /   DISPLAY: ${displayMode.toUpperCase()} | SFX: ${sfxOn ? 'ON' : 'OFF'}
   '---'    LUNAR: ${getMoonPhaseString()}
            SERAPHS BANISHED: ${seraphKills} | RELICS: ${unlockedRelics.size}/${RELICS_CATALOG.length}
            ARCHIVE ENTRIES: ${archiveListCache.length}`
      );
    } else if (cmd === 'ls') {
      logCli('manifesto.txt   media_vault/   pirate_tv.exe   oracle_altar/   cyber_locker/   signal_relays.url   console.html   feed.xml');
    } else if (cmd === 'whoami') {
      logCli(`VISITOR_ID: ${currentUserId} // CLEARANCE: ${konamiUnlocked ? 'ROOT_OPERATOR' : 'WANDERER'}`);
    } else if (cmd === 'cat manifesto.txt') {
      const paras = siteData?.directory?.manifestoParagraphs || ['Hand-welded cyber-occult static shrine.'];
      logCli(paras.join('\n\n'));
    } else if (cmd === 'badges' || cmd === 'relics') {
      updateRelicsUI();
      setModal($('relics-modal'), true);
      logCli(`>> Opening Relic Case (${unlockedRelics.size}/${RELICS_CATALOG.length} unlocked).`);
    } else if (cmd === 'boss') {
      spawnArchSeraphBoss();
      logCli('>> WARNING: Gilded Arch-Seraph summoned into Sector 09!');
    } else if (cmd === 'konami' || cmd === 'secret') {
      triggerKonamiVault();
      logCli('>> [ROOT ACCESS] Konami Glitch Vault unlocked!');
    } else if (cmd === 'bios') {
      runBiosBoot(true);
    } else if (cmd === 'aura') {
      logCli('>> Launching biometric occult scanner...'); runAuraScan();
    } else if (cmd === 'tarot') {
      logCli(`>> ${pullTarot(1)}`);
    } else if (cmd === 'tarot3') {
      logCli(`>> ${pullTarot(3)}`);
    } else if (cmd === 'seraph' || cmd === 'seraphs') {
      if (!seraphs.length) { initSeraphims(); logCli('>> Fresh flock of chibi seraphims summoned.'); }
      else { seraphLayer?.classList.toggle('hidden'); logCli('>> Toggled seraphims layer.'); }
    } else if (cmd === 'veil' || cmd === 'margins') {
      $('z3-occult-veil-layer')?.classList.toggle('hidden');
      logCli('>> Toggled occult margin veil.');
    } else if (cmd === 'sync') {
      logCli('>> Re-fetching ./data/updates.json...');
      hydrateFromUpdatesJson().then((ok) => logCli(ok ? '>> Sync complete!' : '>> Sync failed.'));
    } else if (cmd === 'resetads') {
      resetAllAds(); logCli('>> All dismissed inline & pop-up ads restored.');
    } else if (cmd.startsWith('theme ')) {
      const arg = cmd.slice(6).trim();
      if (['acid', 'rust', 'pink', 'cyan'].includes(arg)) {
        arg === 'acid' ? document.body.removeAttribute('data-accent') : document.body.setAttribute('data-accent', arg);
        logCli(`>> Primary accent shifted to [${arg.toUpperCase()}].`);
      } else logCli('>> Valid themes: acid | rust | pink | cyan');
    } else {
      logCli(`>> Unknown ritual: "${raw}". Type 'help' for valid commands.`);
    }
  });

  /* ==========================================================================
     17. CHATTABLE THEME INJECTION
     ========================================================================== */
  const chatFrame = $('chattable');
  const CHAT_CSS = `#settings,#settingsMenu,#settingsWindow,#account,#shadow{display:none!important;visibility:hidden!important;}html,body{background:#050607!important;color:#d8d5c8!important;font-family:'Courier Prime',monospace!important;font-size:12px;}#top_banner{background:linear-gradient(90deg,#0b0d0b,#1a0b12,#090f0c)!important;border-bottom:1px dashed #39ff14!important;display:flex!important;align-items:center!important;justify-content:center!important;font-size:0!important;}#top_banner>*{display:none!important;}#top_banner::after{content:"SEND A MESSAGE";font-family:'Special Elite',monospace!important;font-size:12px!important;font-weight:700;letter-spacing:.22em;color:#39ff14!important;visibility:visible!important;}#background{background:#050607!important;}.allMessages{background:rgba(12,14,15,.96)!important;border:1px solid rgba(212,140,40,.3)!important;border-left:3px solid #00f0ff!important;padding:6px 9px;color:#d8d5c8!important;margin:7px 8px;}.sent{border-color:rgba(57,255,20,.45)!important;border-left:3px solid #39ff14!important;}.senderInfo{color:#00f0ff!important;font-weight:700;}#input{background:#090b09!important;color:#e8ffe4!important;border:1px solid rgba(57,255,20,.55)!important;font-family:'Courier Prime',monospace!important;}`;
  chatFrame?.addEventListener('load', () => {
    try { chatFrame.contentWindow?.postMessage(CHAT_CSS, '*'); } catch {}
    setTimeout(() => { try { chatFrame.contentWindow?.postMessage(CHAT_CSS, '*'); } catch {} }, 600);
  });

  /* ==========================================================================
     18. MOBILE VIEW OPTIMIZER (< 1024px ONLY — DESKTOP 100% UNTOUCHED)
     ========================================================================== */
  const mobileMQ = window.matchMedia('(max-width: 1023px)');
  const mobDock = $('z3-mob-dock'), mobBackdrop = $('z3-mob-sheet-backdrop');
  const mobTitle = $('z3-mob-sheet-title'), mobBody = $('z3-mob-sheet-body');

  const scrollSmooth = (el) => { if (!el) return; el.classList.remove('z3-mob-collapsed'); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const closeMobSheet = () => mobBackdrop?.classList.remove('is-open');

  function openMobSheet(mode) {
    if (!mobBackdrop || !mobBody || !mobTitle) return;
    mobBody.innerHTML = '';
    const items = mode === 'portals'
      ? [
          { accent: '#39ff14', t: 'ᛟ MANIFESTO',    s: 'Currently, Zine & Archive',  run: () => { switchTab('manifesto', true); closeMobSheet(); } },
          { accent: '#00f0ff', t: '♪ MEDIA VAULT',  s: 'Spotify, Books & VHS',       run: () => { switchTab('media', true); closeMobSheet(); } },
          { accent: '#ff1f6d', t: '▣ PIRATE TV',    s: '4 Static CRT Channels',      run: () => { switchTab('tv', true); closeMobSheet(); } },
          { accent: '#ff1f6d', t: '✦ ORACLE & ALTAR', s: '3-Card Tarot & Candles',   run: () => { switchTab('gifs', true); closeMobSheet(); } },
          { accent: '#d48c28', t: '✂ CYBER LOCKER', s: 'Board & Rune Stamps',        run: () => { switchTab('locker', true); closeMobSheet(); } },
          { accent: '#39ff14', t: '⛨ SIGNAL RELAYS', s: 'Socials & Guestbook',       run: () => { switchTab('webring', true); closeMobSheet(); } }
        ]
      : [
          { accent: '#f5d27a', t: '🏆 RELIC CASE',  s: 'View unlocked achievements', run: () => { closeMobSheet(); $('btn-relics-open')?.click(); } },
          { accent: '#ff1f6d', t: '⌖ SCAN AURA',    s: 'Biometric occult scanner',   run: () => { closeMobSheet(); runAuraScan(); } },
          { accent: '#39ff14', t: '✦ 3-CARD TAROT', s: 'Pull Past/Present/Signal',   run: () => { closeMobSheet(); switchTab('gifs', true); setTimeout(() => pullTarot(3), 180); } },
          { accent: '#00f0ff', t: '◈ 88x31 STAMPS', s: 'Jump to indie stamps wall',  run: () => { closeMobSheet(); scrollSmooth($('section-stamps-wall')); } },
          { accent: '#d48c28', t: 'ᛟ OPERATOR TAG', s: 'Profile & integrity bars',   run: () => { closeMobSheet(); scrollSmooth($('section-operator-tag')); } },
          { accent: '#f5d27a', t: '⛨ AD DIRECTORY', s: 'Browse or restore 15 ads',   run: () => { closeMobSheet(); $('z3-ad-dir-dock')?.click(); } },
          { accent: '#00f0ff', t: '▣ DISPLAY MODE', s: 'Cycle CRT/Phosphor/Amber',   run: () => { $('btn-display-mode')?.click(); closeMobSheet(); } },
          { accent: '#ff1f6d', t: '⌖ OPERATOR CMS', s: 'Open console.html',          run: () => { window.location.href = './console.html'; } }
        ];
    mobTitle.textContent = mode === 'portals' ? '⌖ JUMP TO SECTOR PORTAL' : '✦ QUICK TOOLS & MODULES';
    items.forEach((it) => {
      const c = document.createElement('button');
      c.type = 'button'; c.className = 'z3-sheet-card';
      c.style.setProperty('--card-accent', it.accent);
      c.innerHTML = `<span class="text-[11px] font-bold" style="color:${it.accent}">${it.t}</span><span class="text-[10px] text-bone/75 font-typewriter">${it.s}</span>`;
      c.addEventListener('click', it.run);
      mobBody.appendChild(c);
    });
    mobBackdrop.classList.add('is-open');
  }

  $('z3-mob-sheet-close')?.addEventListener('click', closeMobSheet);
  mobBackdrop?.addEventListener('click', (e) => { if (e.target === mobBackdrop) closeMobSheet(); });

  mobDock?.addEventListener('click', (e) => {
    const btn = e.target.closest('.z3-mob-dock-btn');
    if (!btn) return;
    playFoley('click');
    $$('.z3-mob-dock-btn', mobDock).forEach((b) => b.classList.toggle('is-active', b === btn));
    const a = btn.dataset.mobAction;
    if (a === 'portals') openMobSheet('portals');
    else if (a === 'tools') openMobSheet('tools');
    else if (a === 'synth') { closeMobSheet(); scrollSmooth($('section-signal-deck')); }
    else if (a === 'chat') { closeMobSheet(); scrollSmooth($('section-blackbox-chat')); }
    else if (a === 'top') { closeMobSheet(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  });

  // Mobile-only collapsible sidebar accordions
  const accordions = [
    [$('section-sector-directory'), true],
    [$('section-signal-deck'), false],
    [$('section-operator-tag'), false],
    [$('section-stamps-wall'), true],
    [$('section-sigil-radar'), true],
    [$('section-blackbox-chat'), false],
    [$('section-visitor-log'), true]
  ];
  accordions.forEach(([el, defCol]) => {
    if (!el || !el.firstElementChild) return;
    const hdr = el.firstElementChild;
    hdr.classList.add('z3-mob-collapsible-hdr');
    const chev = document.createElement('span');
    chev.className = 'z3-mob-chevron'; chev.textContent = '▾';
    hdr.appendChild(chev);
    hdr.addEventListener('click', (e) => {
      if (!mobileMQ.matches || e.target.closest('a, button')) return;
      el.classList.toggle('z3-mob-collapsed');
    });
    el.dataset.defCol = defCol ? '1' : '0';
  });

  function syncMobileAccordions() {
    const isMob = mobileMQ.matches;
    accordions.forEach(([el]) => {
      if (!el) return;
      if (!isMob) el.classList.remove('z3-mob-collapsed');
      else if (!el.dataset.mobInited) { el.dataset.mobInited = '1'; if (el.dataset.defCol === '1') el.classList.add('z3-mob-collapsed'); }
    });
    if (!isMob) closeMobSheet();
  }
  syncMobileAccordions();
  mobileMQ.addEventListener?.('change', syncMobileAccordions);

  // Single consolidated resize listener
  let rTimer = null;
  window.addEventListener('resize', () => {
    updateTelemetry();
    if ($('tab-locker') && !$('tab-locker').classList.contains('hidden')) clampLockerItems();
    clearTimeout(rTimer);
    rTimer = setTimeout(() => { buildVeilScene(); if (chaosOn) resizeMatrix(); }, 220);
  });
})();

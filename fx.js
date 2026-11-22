/* ============================================================
   fx.js — المؤثرات: أصوات (قابلة للإغلاق)، الولد الكرتوني، الصوت، ورود الإجابة الصحيحة
   كل الأصوات مُولَّدة بالكود (لا تحتاج ملفات ولا إنترنت)
   ============================================================ */
window.NIG = window.NIG || {};
NIG.FX = (function () {
  let ctx = null, on = true;
  try { on = localStorage.getItem('nig_sound') !== '0'; } catch (e) {}

  function ac() {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  /* المتصفحات (خصوصًا الآيفون) تمنع الصوت حتى أول لمسة: نفتحه عند أول ضغطة */
  function unlock() {
    const c = ac(); if (!c) return;
    try { const b = c.createBuffer(1, 1, 22050), s = c.createBufferSource(); s.buffer = b; s.connect(c.destination); s.start(0); } catch (e) {}
    if ('speechSynthesis' in window) { try { speechSynthesis.getVoices(); } catch (e) {} }
  }
  ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(ev => document.addEventListener(ev, unlock, { passive: true }));

  function tone(f, t0, d, type, vol) {
    const c = ac(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine'; o.frequency.value = f;
    const t = c.currentTime + t0;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(Math.min(1, (vol || 0.2) * 2), t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + d + 0.05);
  }
  /* ---------- مؤثرات صوتية: نُولّد ملف WAV بالكود ونشغّله بعنصر audio (أوثق على الهواتف) ---------- */
  const SR = 22050;
  // نوتة: [تردد, بداية(ث), مدة(ث), موجة, شدة]   ضجيج تصفيق: ['n', بداية, مدة, شدة]
  const N = (f, t, d, w, v) => [f, t, d, w || 'tri', v || .5];
  const SPEC = {
    right: [ // فانفار حماسي + تصفيق
      N(523, 0, .14), N(659, .12, .14), N(784, .24, .14), N(1046, .36, .45, 'sq', .45),
      N(784, .36, .45, 'tri', .35), N(1318, .62, .5, 'tri', .5), N(1568, .8, .55, 'tri', .4),
      ['n', .5, .9, .5]],
    wrong: [ // «وووومب وووومب» حزين
      N(330, 0, .3, 'saw', .5), N(311, .3, .3, 'saw', .5), N(262, .62, .6, 'saw', .55), N(131, .62, .6, 'sq', .35)],
    dice: [N(300, 0, .06, 'sq', .3), N(390, .08, .06, 'sq', .3), N(480, .16, .06, 'sq', .3), N(600, .24, .08, 'sq', .3)],
    step: [N(520, 0, .07, 'tri', .4)],
    flip: [N(400, 0, .08, 'sine', .5), N(700, .07, .12, 'sine', .45)],
    ladder: [N(400, 0, .1, 'sine', .5), N(500, .08, .1, 'sine', .5), N(650, .16, .1, 'sine', .5), N(850, .24, .25, 'sine', .5)],
    win: [N(523, 0, .2), N(659, .18, .2), N(784, .36, .2), N(1046, .54, .3), N(784, .8, .15), N(1046, .95, .15), N(1318, 1.1, .7, 'sq', .45), ['n', .9, 1.3, .5]]
  };
  const wave = (w, ph) => w === 'sq' ? (Math.sin(ph) >= 0 ? 1 : -1) * .6 : w === 'saw' ? ((ph / (2 * Math.PI)) % 1) * 2 - 1 : w === 'tri' ? 2 / Math.PI * Math.asin(Math.sin(ph)) : Math.sin(ph);
  function render(name) {
    const spec = SPEC[name]; let len = 0;
    spec.forEach(x => { const t = x[0] === 'n' ? x[1] + x[2] : x[1] + x[2]; len = Math.max(len, t); });
    const n = Math.ceil((len + .1) * SR), buf = new Float32Array(n);
    spec.forEach(x => {
      if (x[0] === 'n') { // تصفيق: ضجيج متقطع
        const i0 = Math.floor(x[1] * SR), i1 = Math.min(n, Math.floor((x[1] + x[2]) * SR));
        for (let i = i0; i < i1; i++) {
          const t = (i - i0) / SR, env = Math.min(1, t * 20) * Math.max(0, 1 - t / x[2]);
          const clap = (Math.floor(t * 14) % 2 ? 1 : .55);
          buf[i] += (Math.random() * 2 - 1) * x[3] * .5 * env * clap;
        }
        return;
      }
      const [f, t0, d, w, v] = x, i0 = Math.floor(t0 * SR), cnt = Math.floor(d * SR);
      for (let k = 0; k < cnt && i0 + k < n; k++) {
        const t = k / cnt, env = Math.min(1, k / (SR * .01)) * Math.pow(1 - t, 1.3);
        buf[i0 + k] += wave(w, 2 * Math.PI * f * k / SR) * v * env;
      }
    });
    let mx = 0; for (let i = 0; i < n; i++) mx = Math.max(mx, Math.abs(buf[i]));
    const g = mx > .95 ? .95 / mx : 1;
    const bytes = new Uint8Array(44 + n * 2), dv = new DataView(bytes.buffer);
    const wr = (o, str) => { for (let i = 0; i < str.length; i++) dv.setUint8(o + i, str.charCodeAt(i)); };
    wr(0, 'RIFF'); dv.setUint32(4, 36 + n * 2, true); wr(8, 'WAVEfmt '); dv.setUint32(16, 16, true); dv.setUint16(20, 1, true);
    dv.setUint16(22, 1, true); dv.setUint32(24, SR, true); dv.setUint32(28, SR * 2, true); dv.setUint16(32, 2, true); dv.setUint16(34, 16, true);
    wr(36, 'data'); dv.setUint32(40, n * 2, true);
    for (let i = 0; i < n; i++) dv.setInt16(44 + i * 2, Math.max(-1, Math.min(1, buf[i] * g)) * 32767, true);
    let bin = ''; for (let i = 0; i < bytes.length; i += 8192) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192));
    return 'data:audio/wav;base64,' + btoa(bin);
  }
  const cache = {};
  function sfx(name) {
    if (!on || !SPEC[name]) return;
    try {
      if (!cache[name]) cache[name] = render(name);
      const a = new Audio(cache[name]); a.volume = 1;
      const pr = a.play();
      if (pr && pr.catch) pr.catch(() => { try { webSfx(name); } catch (e) {} });
    } catch (e) { try { webSfx(name); } catch (e2) {} }
  }
  /* احتياطي: WebAudio */
  function webSfx(name) {
    SPEC[name].forEach(x => { if (x[0] !== 'n') tone(x[0], x[1], x[2], x[3] === 'sq' ? 'square' : x[3] === 'saw' ? 'sawtooth' : x[3] === 'tri' ? 'triangle' : 'sine', x[4] * .4); });
  }

  /* ---------- الصوت البشري (صوت الجهاز العربي، نبرة طفولية) ---------- */
  function speak(text) {
    if (!on || !('speechSynthesis' in window)) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const vs = speechSynthesis.getVoices();
      const v = vs.find(x => /ar[-_]EG/i.test(x.lang)) || vs.find(x => /^ar/i.test(x.lang));
      if (v) u.voice = v;
      u.lang = v ? v.lang : 'ar-EG'; u.pitch = 1.7; u.rate = 1.05; u.volume = 1;
      speechSynthesis.speak(u);
    } catch (e) {}
  }

  /* ---------- الولد الكرتوني (SVG) ---------- */
  const BOY = (mood) => `
  <svg viewBox="0 0 120 140" width="100%" height="100%" aria-hidden="true">
    <ellipse cx="60" cy="132" rx="30" ry="6" fill="rgba(0,0,0,.2)"/>
    <path d="M30 128c0-26 14-40 30-40s30 14 30 40z" fill="#d62828"/>
    <rect x="52" y="78" width="16" height="14" rx="6" fill="#f2b987"/>
    <circle cx="60" cy="52" r="32" fill="#f7c9a0"/>
    <path d="M27 48c-2-24 16-34 33-34s35 10 33 34c-6-12-18-16-33-16S33 36 27 48z" fill="#2b1a10"/>
    <circle cx="28" cy="56" r="6" fill="#f7c9a0"/><circle cx="92" cy="56" r="6" fill="#f7c9a0"/>
    <circle cx="48" cy="54" r="5" fill="#fff"/><circle cx="72" cy="54" r="5" fill="#fff"/>
    <circle cx="${mood ? 49 : 48}" cy="55" r="2.6" fill="#222"/><circle cx="${mood ? 73 : 72}" cy="55" r="2.6" fill="#222"/>
    ${mood
      ? '<path d="M44 68q16 18 32 0z" fill="#fff" stroke="#8a2b2b" stroke-width="2.5" stroke-linejoin="round"/><path d="M42 44q6-5 12 0M66 44q6-5 12 0" stroke="#2b1a10" stroke-width="3" fill="none" stroke-linecap="round"/>'
      : '<path d="M46 76q14-10 28 0" stroke="#8a2b2b" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M42 46q6 4 12 0M66 46q6 4 12 0" stroke="#2b1a10" stroke-width="3" fill="none" stroke-linecap="round"/>'}
    <circle cx="38" cy="66" r="5" fill="#f3a38f" opacity=".6"/><circle cx="82" cy="66" r="5" fill="#f3a38f" opacity=".6"/>
    ${mood ? '<path d="M92 92l16-22" stroke="#f7c9a0" stroke-width="9" stroke-linecap="round"/><circle cx="109" cy="68" r="7" fill="#f7c9a0"/>' : ''}
  </svg>`;

  let boyTimer = null;
  const GOOD = ['أحسنت يا بطل!'];
  const BAD = ['حظ أوفر المرة القادمة!'];
  const pick = a => a[Math.floor(Math.random() * a.length)];

  function boy(ok, text) {
    let el = document.getElementById('fx-boy');
    if (!el) { el = document.createElement('div'); el.id = 'fx-boy'; document.body.appendChild(el); }
    text = text || pick(ok ? GOOD : BAD);
    el.className = 'fx-boy show ' + (ok ? 'happy' : 'sad');
    el.innerHTML = `<div class="fx-bubble">${text}</div><div class="fx-fig">${BOY(ok)}</div>`;
    setTimeout(() => speak(text), 700);
    clearTimeout(boyTimer); boyTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }

  /* ---------- ورود حمراء تتساقط ---------- */
  function roses() {
    const box = document.createElement('div'); box.className = 'fx-roses';
    let h = '';
    for (let i = 0; i < 18; i++) {
      h += `<i style="left:${Math.random() * 96}%;animation-delay:${Math.random() * .8}s;animation-duration:${2 + Math.random() * 1.5}s;font-size:${22 + Math.random() * 18}px">🌹</i>`;
    }
    box.innerHTML = h; document.body.appendChild(box);
    setTimeout(() => box.remove(), 4200);
  }

  /* تغذية راجعة كاملة: صوت + ولد + (ورود إن صح) */
  function feedback(ok, text) {
    sfx(ok ? 'right' : 'wrong'); boy(ok, text); if (ok) roses();
    const fl = document.createElement('div'); fl.className = 'fx-flash ' + (ok ? 'g' : 'r'); document.body.appendChild(fl); setTimeout(() => fl.remove(), 700);
  }

  /* ---------- زر الصوت ---------- */
  function init() {
    if (document.getElementById('fx-toggle')) return;
    const b = document.createElement('button');
    b.id = 'fx-toggle'; b.className = 'fx-toggle'; b.type = 'button';
    const paint = () => { b.textContent = on ? '🔊 الصوت' : '🔇 صامت'; b.title = on ? 'إيقاف الصوت' : 'تشغيل الصوت'; };
    b.onclick = () => {
      on = !on; try { localStorage.setItem('nig_sound', on ? '1' : '0'); } catch (e) {}
      if (!on && 'speechSynthesis' in window) speechSynthesis.cancel();
      paint(); if (on) { sfx('right'); speak('الصوت شغّال يا بطل'); }
    };
    paint();
    document.body.appendChild(b);
    if ('speechSynthesis' in window) speechSynthesis.getVoices();
  }
  document.addEventListener('DOMContentLoaded', init);
  if (document.readyState !== 'loading') init();

  return { state: () => (ctx ? ctx.state : 'none'), sfx, speak, boy, roses, feedback, init, isOn: () => on };
})();

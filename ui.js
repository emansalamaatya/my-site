/* ============================================================
   ui.js — الشاشات والنرد وحركة القطع والاحتفال
   ============================================================ */
(function () {
  const G = NIG.Game;
  const $ = id => document.getElementById(id);
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const START_POS = { x: 735, y: 837 };      // مكان القطع قبل البداية
  let setupMode = 'solo';
  let setupCount = 2;
  let busy = false;
  let zoomIdx = 0;
  const ZOOMS = [100, 150, 200, 260];

  /* ---------------- الشاشات ---------------- */
  function show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id));
    window.scrollTo(0, 0);
  }

  /* ---------------- نافذة عامة ---------------- */
  function modal(html, actions) {
    return new Promise(resolve => {
      $('modal-body').innerHTML = html;
      const box = $('modal-actions'); box.innerHTML = '';
      actions.forEach(a => {
        const b = document.createElement('button');
        b.className = 'btn ' + (a.cls || 'primary'); b.textContent = a.text;
        b.onclick = () => { $('modal').classList.add('hidden'); resolve(a.value); };
        box.appendChild(b);
      });
      $('modal').classList.remove('hidden');
    });
  }

  /* ---------------- إعداد اللاعبين ---------------- */
  function renderSetup() {
    const team = setupMode === 'team';
    $('setup-title').textContent = team ? 'إعداد الفرق' : 'إعداد الطلاب';
    const box = $('setup-fields'); box.innerHTML = '';
    for (let i = 0; i < setupCount; i++) {
      const c = NIG.COLORS[i];
      const row = document.createElement('div'); row.className = 'field';
      row.innerHTML =
        `<label>${team ? 'اسم الفريق' : 'اسم الطالب'} ${i + 1}</label>` +
        `<input type="text" maxlength="24" id="f-name-${i}" placeholder="${team ? 'مثال: فريق النيل' : 'اكتب الاسم'}">` +
        (team ? `<label>عدد الأعضاء</label><input type="number" min="1" max="12" value="4" id="f-mem-${i}">` : '') +
        `<label>اللون</label><div class="swatches" id="f-col-${i}" data-val="${c.id}"></div>`;
      box.appendChild(row);
      const sw = row.querySelector('.swatches');
      NIG.COLORS.forEach(col => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'sw' + (col.id === c.id ? ' on' : '');
        b.style.background = col.hex; b.title = col.name;
        b.onclick = () => { sw.dataset.val = col.id; sw.querySelectorAll('.sw').forEach(x => x.classList.remove('on')); b.classList.add('on'); };
        sw.appendChild(b);
      });
    }
  }

  function startFromSetup() {
    const entries = [];
    const used = new Set();
    for (let i = 0; i < setupCount; i++) {
      const colId = $('f-col-' + i).dataset.val;
      if (used.has(colId)) { alert('اختاري لونًا مختلفًا لكل ' + (setupMode === 'team' ? 'فريق' : 'طالب')); return; }
      used.add(colId);
      const col = NIG.COLORS.find(c => c.id === colId);
      let name = $('f-name-' + i).value.trim() || ((setupMode === 'team' ? 'الفريق ' : 'الطالب ') + (i + 1));
      entries.push({
        name, color: col.hex,
        members: setupMode === 'team' ? Math.max(1, Math.min(12, parseInt($('f-mem-' + i).value) || 1)) : 1
      });
    }
    G.create(setupMode, entries);
    openGame();
  }

  /* ---------------- اللوحة والقطع ---------------- */
  const pct = (x, y) => ({ l: (x / NIG.BOARD.w * 100), t: (y / NIG.BOARD.h * 100) });

  function pawnSVG(color) {
    return `<svg viewBox="0 0 40 56" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="52" rx="15" ry="4" fill="rgba(0,0,0,.35)"/>
      <path d="M20 14 C10 24 6 40 4 48 L36 48 C34 40 30 24 20 14Z" fill="${color}" stroke="#fff" stroke-width="2.5"/>
      <circle cx="20" cy="11" r="9" fill="${color}" stroke="#fff" stroke-width="2.5"/>
      <circle cx="17" cy="8" r="2.6" fill="rgba(255,255,255,.55)"/></svg>`;
  }

  function slotOffset(idx, total) {
    if (total <= 1) return { dx: 0, dy: 0 };
    const a = (idx / total) * Math.PI * 2 - Math.PI / 2;
    return { dx: Math.cos(a) * 12, dy: Math.sin(a) * 8 };
  }

  function stationXY(pos) {
    if (pos <= 0) return START_POS;
    const s = G.byNum(pos); return s || START_POS;
  }

  function placeToken(p, instant) {
    const el = document.querySelector(`.token[data-id="${p.id}"]`);
    if (!el) return;
    const st = stationXY(p.pos);
    const sameTile = G.get().players.filter(q => q.pos === p.pos);
    const o = slotOffset(sameTile.indexOf(p), sameTile.length);
    const c = pct(st.x + o.dx, st.y + o.dy);
    if (instant) el.style.transition = 'none';
    el.style.left = c.l + '%'; el.style.top = c.t + '%';
    if (instant) { void el.offsetWidth; el.style.transition = ''; }
  }

  function refreshTokens(instant) {
    G.get().players.forEach(p => placeToken(p, instant));
  }

  function buildTokens() {
    const box = $('tokens'); box.innerHTML = '';
    G.get().players.forEach(p => {
      const d = document.createElement('div');
      d.className = 'token'; d.dataset.id = p.id;
      d.innerHTML = pawnSVG(p.color);
      d.title = p.name;
      box.appendChild(d);
    });
    refreshTokens(true);
  }

  function renderScoreboard() {
    const S = G.get();
    $('scoreboard').innerHTML = S.players.map((p, i) =>
      `<div class="chip ${i === S.turn ? 'now' : ''}" style="--c:${p.color}">
         <i class="dot"></i><b>${esc(p.name)}</b>
         <span>المحطة ${p.pos <= 0 ? 'البداية' : (p.pos >= G.FINISH ? 'النهاية' : p.pos)}</span>
         <em>⭐ ${p.score}</em></div>`).join('');
  }

  function renderTurn() {
    const S = G.get(), p = G.current();
    const who = (S.mode === 'team' && p.members > 1) ? ` — العضو ${p.member + 1}` : '';
    $('turn-banner').innerHTML = `<i class="dot" style="background:${p.color}"></i> دور: <b>${esc(p.name)}</b>${who}`;
    renderScoreboard();
  }

  function esc(s) { return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }
  function say(t) { $('msg').textContent = t; }

  function applyZoom() {
    $('board').style.width = ZOOMS[zoomIdx] + '%';
    focusCurrent(false);
  }
  function focusCurrent(smooth) {
    const p = G.current(); if (!p) return;
    const sc = $('board-scroll'), b = $('board');
    const st = stationXY(p.pos);
    const x = st.x / NIG.BOARD.w * b.clientWidth;
    const y = st.y / NIG.BOARD.h * b.clientHeight;
    sc.scrollTo({ left: x - sc.clientWidth / 2, top: y - sc.clientHeight / 2, behavior: smooth ? 'smooth' : 'auto' });
  }

  /* ---------------- النرد ---------------- */
  const FACE_ROT = { 1: [0, 0], 6: [0, 180], 2: [0, -90], 5: [0, 90], 3: [-90, 0], 4: [90, 0] };
  let spinBase = 0;

  function buildDice() {
    const cube = $('cube'); cube.innerHTML = '';
    const pips = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
    const place = { 1: 'rotateY(0deg)', 6: 'rotateY(180deg)', 2: 'rotateY(90deg)', 5: 'rotateY(-90deg)', 3: 'rotateX(90deg)', 4: 'rotateX(-90deg)' };
    for (let f = 1; f <= 6; f++) {
      const face = document.createElement('div');
      face.className = 'face'; face.style.transform = place[f] + ' translateZ(var(--half))';
      for (let i = 0; i < 9; i++) {
        const c = document.createElement('i');
        if (pips[f].includes(i)) c.className = 'pip';
        face.appendChild(c);
      }
      cube.appendChild(face);
    }
    showFace(1, true);
  }
  function showFace(n, instant) {
    const cube = $('cube'); const [rx, ry] = FACE_ROT[n];
    spinBase += 720;
    cube.style.transition = instant ? 'none' : 'transform 1s cubic-bezier(.2,.8,.2,1)';
    cube.style.transform = `rotateX(${rx + (instant ? 0 : spinBase)}deg) rotateY(${ry + (instant ? 0 : spinBase)}deg)`;
  }

  async function onRoll() {
    if (NIG.FX) NIG.FX.sfx('dice');
    if (busy || G.get().over) return;
    busy = true; $('dice').classList.add('off');
    const p = G.current();
    const n = G.roll();
    say(`${p.name} يرمي النرد…`);
    showFace(n, false);
    await sleep(1050);
    say(`خرج الرقم ${n}`);
    await sleep(350);

    await walk(p, Math.min(G.FINISH, p.pos + n));
    await resolveLanding(p);
  }

  /* تحريك القطعة محطة بمحطة */
  async function walk(p, target) {
    const steps = G.path(p.pos, target);
    for (const n of steps) {
      G.moveTo(p, n);
      placeToken(p);
      const el = document.querySelector(`.token[data-id="${p.id}"]`);
      el.classList.add('hop'); setTimeout(() => el.classList.remove('hop'), 260);
      renderScoreboard(); focusCurrent(true);
      say(`المحطة ${n}`); if (NIG.FX) NIG.FX.sfx('step');
      await sleep(300);
    }
    refreshTokens();
  }

  async function slideTo(p, target) {
    G.moveTo(p, target);
    placeToken(p); renderScoreboard(); focusCurrent(true);
    await sleep(900);
    refreshTokens();
  }

  async function resolveLanding(p) {
    const ev = G.landing(p);
    switch (ev.kind) {
      case 'finish': return win(p);
      case 'ladder':
        if (NIG.FX) NIG.FX.sfx('ladder');
        say(ev.up ? '🪜 سلم! اطلع إلى المحطة ' + ev.to : '🪜 أنزل السلم إلى المحطة ' + ev.to);
        await sleep(700);
        await slideTo(p, ev.to);
        break;
      case 'forward':
        say(`👏 أحسنت! تقدّم ${ev.steps === 1 ? 'خطوة' : 'خطوتين'}`);
        await sleep(600);
        await walk(p, Math.min(G.FINISH, p.pos + ev.steps));
        break;
      case 'back':
        say(`↩ ارجع ${ev.steps === 1 ? 'خطوة' : 'خطوتين'}`);
        await sleep(600);
        await walk(p, Math.max(1, p.pos - ev.steps));
        break;
      case 'swap':
        await modal(`<div class="big">🔄</div><h3>محطة تبديل</h3><p>${G.get().mode === 'team' ? 'بدّلوا العضو الذي يلعب في الفريق.' : 'لا يوجد أعضاء في اللعب الفردي — تابعي.'}</p>`,
          [{ text: 'تابع', value: 1 }]);
        if (G.get().mode === 'team') G.rotateMember(p);
        break;
      case 'card': {
        let r = {};
        if (NIG.CardUI) r = await NIG.CardUI.play(ev, p); else await cardPlaceholder(ev);
        await applyCardResult(p, r);
        break;
      }
    }
    if (G.hasWon(p)) return win(p);
    endTurn();
  }

  /* تطبيق نتيجة الكارت: نقاط + حركة + تبديل عضو */
  async function applyCardResult(p, r) {
    if (r.points) { p.score += r.points; G.save(); renderScoreboard(); }
    if (r.swap) { G.rotateMember(p); renderTurn(); }
    if (r.move) {
      const target = Math.max(1, Math.min(G.FINISH, p.pos + r.move));
      if (target !== p.pos) {
        say(r.move > 0 ? `👏 تقدّم ${r.move === 1 ? 'خطوة' : r.move + ' خطوات'}` : `↩ ارجع ${r.move === -1 ? 'خطوة' : (-r.move) + ' خطوات'}`);
        await sleep(500);
        await walk(p, target);
      }
    }
  }

  /* احتياطي إن لم يُحمَّل ملف الكروت */
  async function cardPlaceholder(ev) {
    const t = NIG.TYPES[ev.type].label;
    await modal(
      `<div class="big">🃏</div><h3>محطة ${esc(t)} — رقم ${ev.station.n}</h3>
       <p class="soft">هنا ستظهر البطاقة الأصلية مع السؤال والاختيارات (المرحلة الرابعة).</p>`,
      [{ text: 'تابع', value: 1 }]);
  }

  function endTurn() {
    const p = G.nextTurn();
    renderTurn(); focusCurrent(true);
    say(`دور ${p.name} — اضغط على النرد`);
    busy = false; $('dice').classList.remove('off');
  }

  /* ---------------- الفوز ---------------- */
  function win(p) {
    if (NIG.FX) { NIG.FX.sfx('win'); NIG.FX.speak('مبروك يا بطل! أنت سفير الهوية الوطنية'); }
    G.finish();
    $('win-name').textContent = p.name;
    $('win-scores').innerHTML = G.get().players
      .slice().sort((a, b) => b.score - a.score)
      .map(q => `<span style="--c:${q.color}"><i class="dot"></i>${esc(q.name)} ⭐ ${q.score}</span>`).join('');
    show('screen-win'); startConfetti();
    G.clearSave();
    busy = false;
  }

  function startConfetti() {
    const cv = $('confetti'), ctx = cv.getContext('2d');
    const fit = () => { cv.width = innerWidth; cv.height = innerHeight; }; fit();
    const colors = ['#d62828', '#ffffff', '#111111', '#d99a06', '#15803d'];
    const bits = Array.from({ length: 150 }, () => ({
      x: Math.random() * cv.width, y: -Math.random() * cv.height,
      s: 6 + Math.random() * 8, v: 2 + Math.random() * 3, r: Math.random() * 6,
      c: colors[(Math.random() * colors.length) | 0]
    }));
    let alive = true; const stop = Date.now() + 9000;
    (function loop() {
      if (!alive) return;
      ctx.clearRect(0, 0, cv.width, cv.height);
      bits.forEach(b => {
        b.y += b.v; b.r += .05; b.x += Math.sin(b.r) * 1.2;
        if (b.y > cv.height) { b.y = -10; b.x = Math.random() * cv.width; }
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r);
        ctx.fillStyle = b.c; ctx.fillRect(-b.s / 2, -b.s / 3, b.s, b.s * .6); ctx.restore();
      });
      if (Date.now() < stop && $('screen-win').classList.contains('active')) requestAnimationFrame(loop);
      else ctx.clearRect(0, 0, cv.width, cv.height);
    })();
  }

  function saveCertificate() {
    const name = $('win-name').textContent;
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas'); c.width = 1200; c.height = 1500;
      const x = c.getContext('2d');
      const g = x.createLinearGradient(0, 0, 0, 1500); g.addColorStop(0, '#fff8e1'); g.addColorStop(1, '#ffe9a8');
      x.fillStyle = g; x.fillRect(0, 0, 1200, 1500);
      x.strokeStyle = '#b8860b'; x.lineWidth = 14; x.strokeRect(30, 30, 1140, 1440);
      x.drawImage(img, 200, 120, 800, 800);
      x.textAlign = 'center'; x.direction = 'rtl';
      x.fillStyle = '#0f2a5c'; x.font = 'bold 90px Cairo, Tahoma, sans-serif'; x.fillText(name, 600, 1040);
      x.fillStyle = '#c1121f'; x.font = 'bold 64px Cairo, Tahoma, sans-serif';
      x.fillText('مبروك.. أنت سفير الهوية الوطنية', 600, 1160);
      x.fillStyle = '#0f2a5c'; x.font = '40px Cairo, Tahoma, sans-serif';
      x.fillText('رحلة البحث عن الهوية الوطنية', 600, 1280);
      try {
        c.toBlob(b => {
          if (!b) throw new Error('blob');
          const a = document.createElement('a'); a.href = URL.createObjectURL(b);
          a.download = 'شهادة-سفير-الهوية-الوطنية.png'; a.click();
        });
      } catch (e) { alert('تعذّر الحفظ من ملف مفتوح مباشرة. شغّلي اللعبة من خادم محلي أو من الاستضافة.'); }
    };
    img.src = 'assets/badge/badge-600.png';
  }

  /* ---------------- فتح اللعبة ---------------- */
  function openGame() {
    show('screen-game');
    buildTokens(); buildDice(); renderTurn();
    zoomIdx = 0; applyZoom();
    busy = false; $('dice').classList.remove('off');
    say(`دور ${G.current().name} — اضغط على النرد`);
  }

  /* ---------------- ربط الأزرار ---------------- */
  document.querySelectorAll('.mode:not([disabled])').forEach(b => b.onclick = () => {
    setupMode = b.dataset.mode; setupCount = 2; renderSetup(); show('screen-setup');
  });
  $('btn-add').onclick = () => { if (setupCount < 4) { setupCount++; keepAndRender(); } };
  $('btn-remove').onclick = () => { if (setupCount > 2) { setupCount--; keepAndRender(); } };
  function keepAndRender() {
    const old = [...document.querySelectorAll('#setup-fields input[type=text]')].map(i => i.value);
    renderSetup();
    old.forEach((v, i) => { const e = $('f-name-' + i); if (e) e.value = v; });
  }
  $('btn-back-start').onclick = () => show('screen-start');
  $('btn-go').onclick = startFromSetup;
  $('dice').onclick = onRoll;
  $('zoom-in').onclick = () => { zoomIdx = Math.min(ZOOMS.length - 1, zoomIdx + 1); applyZoom(); };
  $('zoom-out').onclick = () => { zoomIdx = Math.max(0, zoomIdx - 1); applyZoom(); };
  $('btn-again').onclick = () => { show('screen-start'); refreshResume(); };
  $('btn-save-cert').onclick = saveCertificate;

  $('btn-menu').onclick = async () => {
    if (busy) return;
    const v = await modal('<h3>القائمة</h3>', [
      { text: 'متابعة اللعب', value: 'go' },
      { text: 'العودة للشاشة الرئيسية', value: 'home', cls: 'ghost' },
      { text: 'إنهاء وبدء لعبة جديدة', value: 'reset', cls: 'danger' }
    ]);
    if (v === 'home') { show('screen-start'); refreshResume(); }
    if (v === 'reset') { G.clearSave(); show('screen-start'); refreshResume(); }
  };

  function refreshResume() { $('btn-resume').classList.toggle('hidden', !G.hasSave()); }
  $('btn-resume').onclick = () => { if (G.load()) openGame(); };
  refreshResume();

  addEventListener('resize', () => G.get() && refreshTokens(true));

  /* للاختبار والتطوير */
  NIG.debug = { openGame, onRoll };
})();

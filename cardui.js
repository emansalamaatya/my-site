/* ============================================================
   cardui.js — سحب الكروت المقلوبة، عرض الكارت الأصلي، الأسئلة والتحديات
   play(ev, player) تُرجع وعدًا بنتيجة: { points, move, swap, correct }
   ============================================================ */
window.NIG = window.NIG || {};

NIG.CardUI = (function () {
  const $ = id => document.getElementById(id);
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const esc = s => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  const ALL = ['info', 'flag', 'values', 'history', 'geography', 'figures', 'pharaohs', 'culture', 'battles'];
  const POOL = {
    situation: ['values'], history: ['history'], geography: ['geography'],
    figures: ['figures', 'pharaohs'], culture: ['culture'], battles: ['battles'],
    info: ['info'], flag: ['flag'], challenge: ['challenge'],
    quiz: ALL, question: ALL
  };
  const MIXED = { quiz: 1, question: 1 };
  const PENALTY = { 'belong-2': 5, 'message-8': 3, 'hero-7': 2 };   // كما هو مكتوب على الكروت
  const LETTERS = ['أ', 'ب', 'ج', 'د'];

  /* ---------- اختيار الكروت (بدون تكرار داخل المباراة) ---------- */
  function candidates(type) {
    const S = NIG.Game.get();
    S.used = S.used || {};
    const key = MIXED[type] ? 'mixed' : type;
    const all = NIG.CARDS.filter(c => POOL[type].includes(c.cat));
    let used = S.used[key] || [];
    let free = all.filter(c => !used.includes(c.id));
    if (!free.length) { used = []; S.used[key] = used; free = all; }
    return { free, key };
  }
  function markUsed(key, id) {
    const S = NIG.Game.get();
    (S.used[key] = S.used[key] || []).push(id);
    NIG.Game.save();
  }

  function backOf(card) {
    const b = card.cat === 'pharaohs' ? 'figures' : card.cat;
    return NIG.BACKS[b];
  }

  /* ---------- أدوات الواجهة ---------- */
  function layer(html) { $('card-body').innerHTML = html; $('card-layer').classList.remove('hidden'); $('card-layer').scrollTop = 0; }
  function closeLayer() { $('card-layer').classList.add('hidden'); $('card-body').innerHTML = ''; }
  function waitClick(sel) {
    return new Promise(res => { const b = document.querySelector(sel); b.onclick = () => res(); });
  }
  const head = (t, sub) => `<div class="cl-head"><b>${esc(t)}</b>${sub ? `<span>${esc(sub)}</span>` : ''}</div>`;

  /* ---------- 1) اختيار كارت مقلوب ---------- */
  async function pickCard(type, who) {
    const { free, key } = candidates(type);
    const n = Math.min(NIG.RULES.cardChoices || 6, free.length);
    const slots = shuffle(free).slice(0, n);
    const mixed = !!MIXED[type];
    const label = NIG.TYPES[type].label;
    const tiles = slots.map((c, i) => `
      <button class="fc" data-i="${i}" aria-label="كارت ${i + 1}">
        <div class="fci">
          <div class="fcb">${mixed ? '<span class="qmark">؟</span>' : `<img src="${backOf(c)}" alt="ظهر الكارت" draggable="false">`}</div>
          <div class="fcf"><img src="${c.img}" alt="" draggable="false"></div>
        </div></button>`).join('');
    layer(`${head('محطة ' + label, who)}
      <p class="cl-hint">اختاري كارتًا واحدًا لتكتشفي ما بداخله 👇</p>
      <div class="fc-grid n${n}">${tiles}</div>`);
    const idx = await new Promise(res => {
      document.querySelectorAll('.fc').forEach(b => b.onclick = () => res(+b.dataset.i));
    });
    document.querySelectorAll('.fc').forEach(b => { b.disabled = true; if (+b.dataset.i !== idx) b.classList.add('fade'); });
    if (NIG.FX) NIG.FX.sfx('flip');
    document.querySelector(`.fc[data-i="${idx}"]`).classList.add('on');
    const card = slots[idx];
    markUsed(key, card.id);
    await sleep(1100);
    return card;
  }

  /* ---------- 2) عرض الكارت الأصلي ---------- */
  async function revealCard(card, btnText, label) {
    layer(`${head(label, '')}
      <div class="reveal"><img class="big-card pop" src="${card.img}" alt="الكارت"></div>
      <div class="cl-actions"><button id="cl-go" class="btn primary">${btnText}</button></div>`);
    await waitClick('#cl-go');
  }

  /* ---------- 3) سؤال اختيار من متعدد ---------- */
  function askMCQ(card, qtext, options, pts, opts) {
    return new Promise(res => {
      const right = options[0];
      const list = shuffle(options);
      layer(`
        <div class="qv">
          <button class="qthumb-btn" id="q-zoom" title="تكبير الكارت"><img class="qthumb" src="${card.img}" alt="الكارت"></button>
          <div class="qbox">
            <div class="q-label">${esc(opts.label || 'السؤال')}</div>
            <p class="qtext">${esc(qtext)}</p>
            <div class="opts">${list.map((t, i) => `<button class="opt" data-t="${esc(t)}"><i>${LETTERS[i]}</i><span>${esc(t)}</span></button>`).join('')}</div>
            <div id="q-fb" class="fb hidden"></div>
            <div class="cl-actions"><button id="q-next" class="btn primary hidden">متابعة ◀</button></div>
          </div>
        </div>`);
      $('q-zoom').onclick = () => {
        const z = document.createElement('div'); z.className = 'zoom-view';
        z.innerHTML = `<img src="${card.img}" alt="">`; z.onclick = () => z.remove(); $('card-body').appendChild(z);
      };
      let done = false;
      document.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        if (done) return; done = true;
        const ok = b.dataset.t === right;
        document.querySelectorAll('.opt').forEach(x => {
          x.disabled = true;
          if (x.dataset.t === right) x.classList.add('right');
        });
        if (!ok) b.classList.add('wrong');
        if (NIG.FX) NIG.FX.feedback(ok);
        const fb = $('q-fb'); fb.classList.remove('hidden'); fb.classList.add(ok ? 'good' : 'bad');
        fb.innerHTML = ok
          ? `<b>✔ إجابة صحيحة! +${pts} نقطة</b>${opts.okNote ? `<small>${esc(opts.okNote)}</small>` : ''}`
          : `<b>✘ إجابة غير صحيحة</b><small>الإجابة الصحيحة: ${esc(right)}${opts.badNote ? ' — ' + esc(opts.badNote) : ''}</small>`;
        const nx = $('q-next'); nx.classList.remove('hidden'); nx.onclick = () => res(ok);
        nx.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  }

  /* ---------- 4) تحدٍّ مفتوح (نشاط) ---------- */
  function openChallenge(card, penalty, swapText) {
    return new Promise(res => {
      layer(`
        <div class="qv">
          <button class="qthumb-btn" id="q-zoom"><img class="qthumb" src="${card.img}" alt="الكارت"></button>
          <div class="qbox">
            <div class="q-label">${esc(card.title)}</div>
            <p class="qtext">${esc(card.task)}</p>
            ${card.draw ? '<button id="draw-open" class="btn ghost draw-open">🎨 افتح لوح الرسم</button>' : ''}
            ${card.sec ? `<div class="timer"><span id="tm">${card.sec}</span><small>ثانية</small><button id="tm-go" class="btn ghost">ابدأ المؤقت ⏱</button></div>` : ''}
            <p class="soft">بعد تنفيذ التحدي اختاروا النتيجة (يقرّرها الحَكَم: المعلمة أو الفريق المنافس):</p>
            <div class="cl-actions two">
              <button id="ch-ok" class="btn primary">✔ أنجزنا التحدي (+${card.pts})</button>
              <button id="ch-no" class="btn danger">✘ لم ننجز (${swapText || (penalty === 1 ? 'ارجع خطوة' : 'ارجع ' + penalty + ' خطوات')})</button>
            </div>
          </div>
        </div>`);
      $('q-zoom').onclick = () => {
        const z = document.createElement('div'); z.className = 'zoom-view';
        z.innerHTML = `<img src="${card.img}" alt="">`; z.onclick = () => z.remove(); $('card-body').appendChild(z);
      };
      const dro = $('draw-open'); if (dro) dro.onclick = () => NIG.Draw.open(card.title);
      let timer = null;
      const stop = () => { if (timer) clearInterval(timer); };
      const tg = $('tm-go');
      if (tg) tg.onclick = () => {
        stop(); let t = card.sec; $('tm').textContent = t; tg.disabled = true;
        timer = setInterval(() => {
          t--; const el = $('tm'); if (!el) return stop();
          el.textContent = t; if (t <= 5) el.classList.add('low');
          if (t <= 0) { stop(); el.textContent = '⏰'; tg.disabled = false; tg.textContent = 'إعادة المؤقت'; }
        }, 1000);
      };
      $('ch-ok').onclick = () => { stop(); res(true); };
      $('ch-no').onclick = () => { stop(); res(false); };
    });
  }

  /* ---------- نتيجة قصيرة بعد التحدي ---------- */
  async function toast(html) {
    layer(`<div class="result-box">${html}<div class="cl-actions"><button id="cl-go" class="btn primary">متابعة ◀</button></div></div>`);
    if (NIG.FX && /🌟|💪/.test(html)) NIG.FX.feedback(/🌟/.test(html));
    await waitClick('#cl-go');
  }

  /* ---------- المسار الكامل ---------- */
  async function play(ev, player) {
    try { return await playInner(ev, player); }
    finally { closeLayer(); }          // دائمًا نُغلق طبقة الكروت ليظهر اللوح
  }

  async function playInner(ev, player) {
    const S = NIG.Game.get();
    const type = ev.type;
    const who = (S.mode === 'team' && player.members > 1) ? `${player.name} — العضو ${player.member + 1}` : player.name;
    const label = 'محطة ' + NIG.TYPES[type].label;
    const card = await pickCard(type, who);
    let result = { points: 0, move: 0, swap: false, correct: null };

    if (card.cat === 'challenge') {
      const penalty = PENALTY[card.num] || 1;
      let ok;
      if (card.kind === 'mcq') {
        await revealCard(card, 'ابدأ التحدي ◀', label);
        ok = await askMCQ(card, card.task, card.o, card.pts, { label: card.title });
      } else {
        await revealCard(card, 'ابدأ التحدي ◀', label);
        const team = S.mode === 'team' && player.members > 1;
        ok = await openChallenge(card, penalty, card.swap ? (team ? 'بدّلوا العضو' : 'ارجع خطوة') : null);
      }
      result.correct = ok;
      if (ok) result.points = card.pts;
      else if (card.swap && S.mode === 'team' && player.members > 1) result.swap = true;
      else result.move = -(card.swap ? 1 : penalty);
      if (card.kind !== 'mcq') {
        await toast(ok
          ? `<div class="big">🌟</div><h3>أحسنتم! +${card.pts} نقطة</h3>`
          : `<div class="big">💪</div><h3>حاولوا في المرة القادمة</h3><p class="soft">${result.swap ? 'يُبدَّل العضو الذي يلعب.' : 'تعودون ' + (-result.move === 1 ? 'خطوة' : (-result.move) + ' خطوات') + ' للخلف.'}</p>`);
      }
      return result;
    }

    // كروت المعلومات: اقرأ الكارت ثم أجب
    await revealCard(card, 'اقرأت الكارت — إلى السؤال ◀', label);
    const pts = NIG.RULES.pointsCorrect || 10;
    const ok = await askMCQ(card, card.q, card.o, pts, { label: 'السؤال' });
    result.correct = ok;
    if (ok) { result.points = pts; result.move = NIG.RULES.stepOnCorrect || 0; }
    else { result.move = -(NIG.RULES.stepOnWrong || 0); }
    return result;
  }

  function end() { closeLayer(); }

  return { play, end, _closeLayer: closeLayer };
})();

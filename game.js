/* ============================================================
   game.js — منطق اللعبة (بدون أي واجهة): الأدوار، النرد، الحركة، السلالم
   ============================================================ */
window.NIG = window.NIG || {};

NIG.Game = (function () {
  const FINISH = NIG.STATIONS[NIG.STATIONS.length - 1].n; // 50
  const SAVE_KEY = 'nig_save_v1';

  let state = null;

  const byNum = n => NIG.STATIONS.find(s => s.n === n);

  function create(mode, entries) {
    // entries: [{name, color, members}]
    state = {
      mode,
      turn: 0,
      round: 1,
      over: false,
      used: {},            // الكروت التي ظهرت في هذه المباراة (لمنع التكرار)
      players: entries.map((e, i) => ({
        id: i,
        name: e.name,
        color: e.color,
        members: e.members || 1,
        member: 0,           // رقم العضو الحالي داخل الفريق
        pos: 0,              // 0 = قبل البداية
        score: 0
      })),
      log: []
    };
    save();
    return state;
  }

  const get = () => state;
  const current = () => state.players[state.turn];

  function roll() { return 1 + Math.floor(Math.random() * 6); }

  /* يحسب مسار الخطوات (محطة بمحطة) من موضع إلى آخر */
  function path(from, to) {
    const p = [];
    const dir = to >= from ? 1 : -1;
    for (let n = from + dir; dir > 0 ? n <= to : n >= to; n += dir) p.push(n);
    return p;
  }

  /* يطبق أثر المحطة بعد الوصول. يُرجع وصفًا للحدث */
  function landing(player) {
    const st = byNum(player.pos);
    if (!st) return { kind: 'none' };
    if (player.pos >= FINISH) return { kind: 'finish' };

    if (NIG.RULES.useLadders) {
      const l = NIG.LADDERS.find(l => l.from === st.n);
      if (l) return { kind: 'ladder', from: l.from, to: l.to, up: l.to > l.from, station: st };
    }
    if (st.t === 'forward') return { kind: 'forward', steps: st.steps, station: st };
    if (st.t === 'back')    return { kind: 'back', steps: st.steps, station: st };
    if (st.t === 'swap')    return { kind: 'swap', station: st };
    if (NIG.TYPES[st.t] && NIG.TYPES[st.t].card) return { kind: 'card', type: st.t, station: st };
    return { kind: 'none', station: st };
  }

  /* تحريك اللاعب إلى موضع جديد (دون تطبيق أثر المحطة) */
  function moveTo(player, n) {
    player.pos = Math.max(0, Math.min(FINISH, n));
    save();
  }

  function nextTurn() {
    const p = current();
    if (state.mode === 'team' && p.members > 1) p.member = (p.member + 1) % p.members;
    state.turn = (state.turn + 1) % state.players.length;
    if (state.turn === 0) state.round++;
    save();
    return current();
  }

  function rotateMember(player) {
    if (player.members > 1) player.member = (player.member + 1) % player.members;
    save();
  }

  /* الفائز: من وصل النهاية */
  function hasWon(player) {
    return NIG.RULES.exactFinish ? player.pos === FINISH : player.pos >= FINISH;
  }

  /* ---------- الحفظ المحلي (يعمل بدون إنترنت) ---------- */
  function save() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (e) { /* تجاهل */ }
  }
  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (!s || s.over || !Array.isArray(s.players)) return null;
      state = s; return state;
    } catch (e) { return null; }
  }
  function hasSave() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return false;
      const s = JSON.parse(raw);
      return !!(s && !s.over && s.players);
    } catch (e) { return false; }
  }
  function clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch (e) {} }
  function finish() { state.over = true; save(); }

  return { FINISH, byNum, create, get, current, roll, path, landing, moveTo,
           nextTurn, rotateMember, hasWon, load, hasSave, clearSave, finish, save };
})();

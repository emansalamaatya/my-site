/* ============================================================
   draw.js — لوح الرسم الإلكتروني: ألوان، حجم فرشاة، ممحاة، تراجع، مسح، حفظ، إنهاء
   NIG.Draw.open(title) → وعد يتحقق عند الضغط على «تم»
   ============================================================ */
window.NIG = window.NIG || {};
NIG.Draw = (function () {
  const COLORS = ['#d62828', '#ffffff', '#111111', '#1d4ed8', '#15803d', '#d99a06', '#7e22ce', '#f97316'];

  function open(title) {
    return new Promise(res => {
      const w = document.createElement('div'); w.className = 'dr-wrap';
      w.innerHTML = `
        <div class="dr-top"><b>🎨 ${title || 'لوح الرسم'}</b><button class="btn primary dr-done">تم ✔</button></div>
        <div class="dr-tools">
          <div class="dr-colors">${COLORS.map((c, i) => `<button class="dr-c${i === 0 ? ' on' : ''}" data-c="${c}" style="background:${c}" aria-label="لون"></button>`).join('')}</div>
          <label class="dr-size">الحجم <input type="range" min="2" max="40" value="8"></label>
          <button class="dr-b" data-a="eraser">🧽 ممحاة</button>
          <button class="dr-b" data-a="undo">↩ تراجع</button>
          <button class="dr-b" data-a="clear">🗑 مسح</button>
          <button class="dr-b" data-a="save">💾 حفظ</button>
        </div>
        <canvas class="dr-canvas"></canvas>`;
      document.body.appendChild(w);
      const cv = w.querySelector('canvas'), g = cv.getContext('2d');
      const size = w.querySelector('input'); let color = COLORS[0], erase = false, drawing = false, hist = [], last;
      function fit() {
        const r = cv.getBoundingClientRect(), d = window.devicePixelRatio || 1;
        const keep = cv.width ? g.getImageData(0, 0, cv.width, cv.height) : null;
        cv.width = r.width * d; cv.height = r.height * d;
        g.fillStyle = '#fff'; g.fillRect(0, 0, cv.width, cv.height);
        if (keep) g.putImageData(keep, 0, 0);
        g.lineCap = g.lineJoin = 'round';
      }
      fit(); hist = [g.getImageData(0, 0, cv.width, cv.height)];
      const pos = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * cv.width / r.width, (e.clientY - r.top) * cv.height / r.height]; };
      cv.onpointerdown = e => { drawing = true; cv.setPointerCapture(e.pointerId); last = pos(e); stroke(last, last); e.preventDefault(); };
      cv.onpointermove = e => { if (!drawing) return; const p = pos(e); stroke(last, p); last = p; };
      const end = () => { if (!drawing) return; drawing = false; hist.push(g.getImageData(0, 0, cv.width, cv.height)); if (hist.length > 30) hist.shift(); };
      cv.onpointerup = cv.onpointercancel = end;
      function stroke(a, b) {
        g.strokeStyle = erase ? '#fff' : color; g.lineWidth = size.value * (window.devicePixelRatio || 1);
        g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0] + .01, b[1]); g.stroke();
      }
      w.querySelectorAll('.dr-c').forEach(b => b.onclick = () => {
        color = b.dataset.c; erase = false;
        w.querySelectorAll('.dr-c').forEach(x => x.classList.remove('on')); b.classList.add('on');
        w.querySelector('[data-a=eraser]').classList.remove('on');
      });
      w.querySelectorAll('.dr-b').forEach(b => b.onclick = () => {
        const a = b.dataset.a;
        if (a === 'eraser') { erase = !erase; b.classList.toggle('on', erase); }
        if (a === 'undo' && hist.length > 1) { hist.pop(); g.putImageData(hist[hist.length - 1], 0, 0); }
        if (a === 'clear') { g.fillStyle = '#fff'; g.fillRect(0, 0, cv.width, cv.height); hist.push(g.getImageData(0, 0, cv.width, cv.height)); }
        if (a === 'save') {
          try {
            const l = document.createElement('a'); l.download = 'رسمتي.png'; l.href = cv.toDataURL('image/png'); l.click();
          } catch (e) {}
        }
      });
      w.querySelector('.dr-done').onclick = () => { w.remove(); res(true); };
    });
  }
  return { open };
})();

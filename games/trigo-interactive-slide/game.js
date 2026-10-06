/**
 * Trigonometry: From History to Function  (v4)
 *
 * Slide 3: six identical equilateral triangles snap around one centre point (6 x 60 = 360).
 * Slide 4: ONE timeline drives the whole animation. renderS4(t) is a pure function of time,
 *          so every frame is computed (not a "new page" swapped in), which is what makes it smooth.
 */

const TOTAL_SLIDES = 7;
let currentSlide = 1;
let currentLanguage = 'en';

/* =====================================================================
   TRANSLATIONS
   ===================================================================== */
const translations = {
  en: {
    mainTitle: "Trigonometry: From History to Function",
    prevBtn: "← Previous",
    nextBtn: "Next →",
    slide1Title: "🏛️ Babylonian Origins",
    slide1Text1: "Trigonometry originated from ancient Babylon, around 1800 BCE.",
    slide1Bullet1: "Track celestial bodies and stars",
    slide1Bullet2: "Calculate distances without measurement",
    slide1Bullet3: "Develop astronomy and calendar systems",
    slide2Title: "🔢 Base-60 (Sexagesimal) System",
    slide2Text1: "Why is 60 special? It divides evenly by many numbers!",
    slide2Divisible: "60 is divisible by:",
    slide2NoDecimals: "No decimals needed! Easy to measure anything.",
    slide2Triangle: "60 equal angles in a triangle:",
    slide3Title: "⭕ Six Triangles = 360° Circle",
    slide3Text: "Drag the 6 identical triangles onto the board. Their tips must meet at the centre.",
    dragTriangles: "Drag triangles to the board:",
    resetBtn: "↻ Reset",
    circleComplete: "✅ Perfect! 6 × 60° = 360°! That's why a circle is 360 degrees!",
    slide4Title: "📐 From Equal Triangle to Right Triangle",
    restartBtn: "↻ Restart",
    playLabel: "▶ Play",
    pauseLabel: "⏸ Pause",
    replayLabel: "↻ Replay",
    hypotenuse: "Hypotenuse (H)",
    opposite: "Opposite (O)",
    adjacent: "Adjacent (A)",
    nameH: "Hypotenuse", nameO: "Opposite", nameA: "Adjacent",
    defH: "faces the right angle", defO: "faces angle α", defA: "touches angle α",
    cap1: "Start with an equilateral triangle: three equal sides and three 60° angles.",
    cap2: "Slide the top corner sideways until it sits directly above the left corner. The triangle becomes a right-angled triangle.",
    cap3: "The corner that makes a perfect square is the right angle (90°).",
    cap4: "The side facing the right angle, and the longest one, is the hypotenuse (H).",
    cap5: "Move the camera to another corner and call this angle α (alpha). The camera always keeps the triangle in focus.",
    cap6: "The side directly across from α is the opposite (O).",
    cap7: "The side that touches α, and is not the hypotenuse, is the adjacent (A).",
    cap8: "So, looking from angle α, the three sides are named H, O and A.",
    cap9: "Move the camera to the other corner. The observed angle α changes, so Opposite and Adjacent swap roles. The hypotenuse never changes.",
    cap10: "Remember H O A: the names depend on the angle you look from, except the hypotenuse."
  },

  bm: {
    mainTitle: "Trigonometri: Dari Sejarah ke Fungsi",
    prevBtn: "← Sebelum",
    nextBtn: "Seterusnya →",
    slide1Title: "🏛️ Asal-usul Babylon",
    slide1Text1: "Trigonometri berasal daripada Babylon kuno, sekitar 1800 SM.",
    slide1Bullet1: "Menjejaki badan-badan cakerawala dan bintang",
    slide1Bullet2: "Mengira jarak tanpa pengukuran langsung",
    slide1Bullet3: "Membangun sistem astronomi dan takwim awal",
    slide2Title: "🔢 Sistem Asas-60 (Sexagesimal)",
    slide2Text1: "Mengapa 60 istimewa? Ia membahagi dengan banyak nombor!",
    slide2Divisible: "60 boleh dibahagi oleh:",
    slide2NoDecimals: "Tiada perpuluhan diperlukan! Mudah mengukur apa sahaja.",
    slide2Triangle: "60 sudut yang sama dalam segi tiga:",
    slide3Title: "⭕ Enam Segi Tiga = Bulatan 360°",
    slide3Text: "Seret 6 segi tiga yang serupa ke papan. Hujung semuanya mesti bertemu di tengah.",
    dragTriangles: "Seret segi tiga ke papan:",
    resetBtn: "↻ Set semula",
    circleComplete: "✅ Sempurna! 6 × 60° = 360°! Itulah sebabnya bulatan ialah 360 darjah!",
    slide4Title: "📐 Daripada Segi Tiga Sama Sisi ke Segi Tiga Bersudut Tegak",
    restartBtn: "↻ Mula semula",
    playLabel: "▶ Main",
    pauseLabel: "⏸ Jeda",
    replayLabel: "↻ Main semula",
    hypotenuse: "Hipotenus (H)",
    opposite: "Bertentangan (O)",
    adjacent: "Bersebelahan (A)",
    nameH: "Hipotenus", nameO: "Bertentangan", nameA: "Bersebelahan",
    defH: "menghadap sudut tegak", defO: "menghadap sudut α", defA: "menyentuh sudut α",
    cap1: "Mulakan dengan segi tiga sama sisi: tiga sisi sama panjang dan tiga sudut 60°.",
    cap2: "Gelongsorkan bucu atas ke tepi sehingga betul-betul di atas bucu kiri. Segi tiga menjadi segi tiga bersudut tegak.",
    cap3: "Bucu yang membentuk petak sempurna ialah sudut tegak (90°).",
    cap4: "Sisi yang menghadap sudut tegak, dan juga yang terpanjang, ialah hipotenus (H).",
    cap5: "Gerakkan kamera ke bucu lain dan namakan sudut ini α (alfa). Kamera sentiasa memfokus pada segi tiga.",
    cap6: "Sisi yang betul-betul bertentangan dengan α ialah sisi bertentangan (O).",
    cap7: "Sisi yang menyentuh α, dan bukan hipotenus, ialah sisi bersebelahan (A).",
    cap8: "Jadi, dari sudut α, tiga sisi dinamakan H, O dan A.",
    cap9: "Gerakkan kamera ke bucu yang satu lagi. Sudut α berubah, maka sisi bertentangan dan bersebelahan bertukar peranan. Hipotenus tidak pernah berubah.",
    cap10: "Ingat H O A: nama sisi bergantung pada sudut yang kita lihat, kecuali hipotenus."
  },

  cn: {
    mainTitle: "三角函数：从历史到函数",
    prevBtn: "← 上一步",
    nextBtn: "下一步 →",
    slide1Title: "🏛️ 巴比伦起源",
    slide1Text1: "三角函数起源于古代巴比伦，大约在公元前1800年。",
    slide1Bullet1: "追踪天体和星星",
    slide1Bullet2: "在不进行直接测量的情况下计算距离",
    slide1Bullet3: "开发早期天文学和历法系统",
    slide2Title: "🔢 60进制（六十进制）系统",
    slide2Text1: "为什么60很特别？它能被许多数字整除！",
    slide2Divisible: "60可以被以下数字整除：",
    slide2NoDecimals: "不需要小数！易于测量任何东西。",
    slide2Triangle: "三角形中60个相等的角：",
    slide3Title: "⭕ 六个三角形 = 360°圆",
    slide3Text: "把6个相同的三角形拖到画板上，让它们的尖角都在中心相遇。",
    dragTriangles: "拖动三角形到画板：",
    resetBtn: "↻ 重置",
    circleComplete: "✅ 完美！6 × 60° = 360°！这就是为什么圆是360度！",
    slide4Title: "📐 从等边三角形到直角三角形",
    restartBtn: "↻ 重新开始",
    playLabel: "▶ 播放",
    pauseLabel: "⏸ 暂停",
    replayLabel: "↻ 重播",
    hypotenuse: "斜边 (H)",
    opposite: "对边 (O)",
    adjacent: "邻边 (A)",
    nameH: "斜边", nameO: "对边", nameA: "邻边",
    defH: "正对直角", defO: "正对角 α", defA: "紧挨角 α",
    cap1: "从等边三角形开始：三条边一样长，三个角都是 60°。",
    cap2: "把顶点横向移动，直到它位于左下角的正上方，三角形就变成了直角三角形。",
    cap3: "构成完美方块的那个角就是直角（90°）。",
    cap4: "正对直角、也是最长的一条边，叫做斜边 (H)。",
    cap5: "把相机移到另一个角，并把这个角记作 α（阿尔法）。相机始终对准三角形。",
    cap6: "正对着 α 的那条边叫做对边 (O)。",
    cap7: "紧挨着 α、且不是斜边的那条边叫做邻边 (A)。",
    cap8: "因此，从角 α 来看，三条边分别是 H、O 和 A。",
    cap9: "把相机移到另一个角：观察角 α 改变了，对边和邻边就互换角色，而斜边永远不变。",
    cap10: "记住 H O A：边的名称取决于你观察的角，只有斜边不变。"
  }
};

/* =====================================================================
   SMALL HELPERS
   ===================================================================== */
const SVG_NS = 'http://www.w3.org/2000/svg';

function svgEl(name, attrs, parent) {
  const el = document.createElementNS(SVG_NS, name);
  if (attrs) for (const k in attrs) el.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(el);
  return el;
}

const clamp01 = x => Math.max(0, Math.min(1, x));
const seg = (t, a, b) => clamp01((t - a) / (b - a));               // 0..1 progress of t inside [a,b]
const ease = x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2); // easeInOutCubic
const lerp = (a, b, k) => a + (b - a) * k;
const lerpPt = (a, b, k) => ({ x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k) });
const subPt = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
const addPt = (a, d, k = 1) => ({ x: a.x + d.x * k, y: a.y + d.y * k });
const unitPt = v => { const l = Math.hypot(v.x, v.y) || 1; return { x: v.x / l, y: v.y / l }; };
const toDeg = r => (r * 180) / Math.PI;
const polar = (c, r, deg) => ({ x: c.x + r * Math.cos((deg * Math.PI) / 180), y: c.y + r * Math.sin((deg * Math.PI) / 180) });

function hexToRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function mixColor(c1, c2, k) {
  const a = hexToRgb(c1), b = hexToRgb(c2);
  return `rgb(${Math.round(lerp(a[0], b[0], k))},${Math.round(lerp(a[1], b[1], k))},${Math.round(lerp(a[2], b[2], k))})`;
}
// mixColor returns "rgb(...)": allow mixing a result again
function mix2(c1, c2, k) {
  const toHex = c => {
    if (c.startsWith('#')) return c;
    const m = c.match(/\d+/g).map(Number);
    return '#' + m.map(v => v.toString(16).padStart(2, '0')).join('');
  };
  return mixColor(toHex(c1), toHex(c2), k);
}

/* =====================================================================
   INITIALISATION
   ===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initSlideNavigation();
  initSlide3();
  initSlide4();

  // Language passed by the portal (?lang=en|bm|cn). Done here, AFTER the buttons have listeners.
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  const startLang = urlLang && translations[urlLang] ? urlLang : 'en';
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === startLang));
  updateLanguage(startLang);

  showSlide(1);
});

function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateLanguage(btn.dataset.lang);
    });
  });
}

function updateLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang === 'cn' ? 'zh' : lang;
  const t = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });

  updateS4Texts();   // SVG texts, caption, play button
}

function initSlideNavigation() {
  document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentSlide > 1) showSlide(currentSlide - 1);
  });
  document.getElementById('next-btn').addEventListener('click', () => {
    if (currentSlide < TOTAL_SLIDES) showSlide(currentSlide + 1);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' && currentSlide < TOTAL_SLIDES) showSlide(currentSlide + 1);
    if (e.key === 'ArrowLeft' && currentSlide > 1) showSlide(currentSlide - 1);
  });
}

function showSlide(slideNum) {
  document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`slide-${slideNum}`);
  if (target) target.classList.add('active');

  currentSlide = slideNum;
  document.getElementById('current-slide').textContent = slideNum;
  document.getElementById('prev-btn').disabled = slideNum === 1;
  document.getElementById('next-btn').disabled = slideNum === TOTAL_SLIDES;

  // Slide 4 plays itself when you arrive, and stops when you leave
  if (slideNum === 4) s4Restart();
  else s4Pause();
}

/* =====================================================================
   SLIDE 3: SIX TRIANGLES AROUND ONE CENTRE
   Geometry: centre C=(200,200), radius R=150. Vertex k sits at angle 60*k degrees.
   Slot k is the equilateral triangle C, V(k), V(k+1): every side = R, apex angle = 60 deg.
   ===================================================================== */
const S3 = {
  cx: 200, cy: 200, R: 150,
  colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'],
  filled: [null, null, null, null, null, null],
  slots: [],
  drag: null,
  countRaf: 0
};

function s3Vertex(k) {
  const a = (k * Math.PI) / 3;
  return { x: S3.cx + S3.R * Math.cos(a), y: S3.cy + S3.R * Math.sin(a) };
}
function s3Centroid(k) {
  const v1 = s3Vertex(k), v2 = s3Vertex(k + 1);
  return { x: (S3.cx + v1.x + v2.x) / 3, y: (S3.cy + v1.y + v2.y) / 3 };
}

function initSlide3() {
  buildBoard();
  buildPool();
  document.getElementById('reset-circle-btn').addEventListener('click', resetSlide3);
}

function buildBoard() {
  const board = document.getElementById('circle-board');
  board.innerHTML = '';
  board.classList.remove('complete');
  const { cx, cy, R } = S3;
  const C = { x: cx, y: cy };

  const defs = svgEl('defs', {}, board);
  const grad = svgEl('radialGradient', { id: 'sphereGrad', cx: '40%', cy: '35%', r: '70%' }, defs);
  svgEl('stop', { offset: '0%', 'stop-color': '#ffffff' }, grad);
  svgEl('stop', { offset: '65%', 'stop-color': '#d4d4d4' }, grad);
  svgEl('stop', { offset: '100%', 'stop-color': '#8a8a8a' }, grad);

  // faint guide circle (the circle we are about to "build")
  svgEl('circle', { cx, cy, r: R, class: 's3-guide' }, board);

  // six slots
  S3.slots = [];
  for (let k = 0; k < 6; k++) {
    const v1 = s3Vertex(k), v2 = s3Vertex(k + 1), ct = s3Centroid(k);
    const poly = svgEl('polygon', {
      points: `${cx},${cy} ${v1.x.toFixed(2)},${v1.y.toFixed(2)} ${v2.x.toFixed(2)},${v2.y.toFixed(2)}`,
      class: 's3-slot'
    }, board);
    poly.style.transformOrigin = `${ct.x}px ${ct.y}px`;
    S3.slots.push(poly);
  }

  // the finished circle (drawn after completion)
  svgEl('circle', { cx, cy, r: R, class: 's3-ring', pathLength: 1 }, board);

  // six 60 degree arcs + labels
  for (let k = 0; k < 6; k++) {
    const p0 = polar(C, 44, 60 * k + 7), p1 = polar(C, 44, 60 * (k + 1) - 7);
    const arc = svgEl('path', { d: `M ${p0.x} ${p0.y} A 44 44 0 0 1 ${p1.x} ${p1.y}`, class: 's3-arc' }, board);
    arc.style.transitionDelay = `${0.5 + k * 0.12}s`;
    const lp = polar(C, 76, 60 * k + 30);
    const lab = svgEl('text', { x: lp.x, y: lp.y, class: 's3-arc-label' }, board);
    lab.textContent = '60°';
    lab.style.transitionDelay = `${0.6 + k * 0.12}s`;
  }

  // centre disc (the white "sphere" in your reference picture) + 360 label
  svgEl('circle', { cx, cy, r: 30, class: 's3-disc' }, board);
  const total = svgEl('text', { x: cx, y: cy, id: 's3-total', class: 's3-total' }, board);
  total.textContent = '360°';
}

function buildPool() {
  const grid = document.getElementById('pool-grid');
  grid.innerHTML = '';
  S3.colors.forEach((color, i) => {
    const item = document.createElement('div');
    item.className = 'pool-item';
    item.dataset.color = color;
    item.dataset.i = i;
    item.innerHTML =
      `<svg viewBox="0 0 100 90" class="pool-tri" xmlns="${SVG_NS}">` +
      `<polygon points="50,5 95,83 5,83" fill="${color}" stroke="#ffffff" stroke-width="3" stroke-linejoin="round"/></svg>`;
    item.addEventListener('pointerdown', s3PointerDown);
    grid.appendChild(item);
  });
}

function s3PointerDown(e) {
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  const item = e.currentTarget;
  if (item.classList.contains('used') || S3.drag) return;
  e.preventDefault();

  const ghost = item.querySelector('svg').cloneNode(true);
  ghost.classList.add('drag-ghost');
  document.body.appendChild(ghost);

  S3.drag = { item, ghost, color: item.dataset.color, slot: -1, id: e.pointerId };
  item.classList.add('picked');
  item.setPointerCapture(e.pointerId);        // keep receiving events even outside the iframe
  item.addEventListener('pointermove', s3PointerMove);
  item.addEventListener('pointerup', s3PointerUp);
  item.addEventListener('pointercancel', s3PointerCancel);
  s3PointerMove(e);
}

function s3PointerMove(e) {
  const d = S3.drag;
  if (!d) return;
  d.ghost.style.transform = `translate(${e.clientX - 48}px, ${e.clientY - 43}px)`;

  // which empty slot would it snap into?
  const slot = s3NearestFreeSlot(e.clientX, e.clientY);
  if (slot !== d.slot) {
    S3.slots.forEach(s => s.classList.remove('hover'));
    if (slot >= 0) S3.slots[slot].classList.add('hover');
    d.slot = slot;
  }
}

function s3NearestFreeSlot(clientX, clientY) {
  const box = document.getElementById('circle-target').getBoundingClientRect();
  const inside = clientX >= box.left && clientX <= box.right && clientY >= box.top && clientY <= box.bottom;
  if (!inside) return -1;

  const board = document.getElementById('circle-board');
  const pt = board.createSVGPoint();
  pt.x = clientX; pt.y = clientY;
  const p = pt.matrixTransform(board.getScreenCTM().inverse());

  let best = -1, bestDist = Infinity;
  for (let k = 0; k < 6; k++) {
    if (S3.filled[k]) continue;
    const c = s3Centroid(k);
    const dist = Math.hypot(p.x - c.x, p.y - c.y);
    if (dist < bestDist) { bestDist = dist; best = k; }
  }
  return best;
}

function s3EndDrag(item) {
  item.removeEventListener('pointermove', s3PointerMove);
  item.removeEventListener('pointerup', s3PointerUp);
  item.removeEventListener('pointercancel', s3PointerCancel);
  try { item.releasePointerCapture(S3.drag.id); } catch (_) { /* already released */ }
  S3.drag.ghost.remove();
  S3.slots.forEach(s => s.classList.remove('hover'));
}

function s3PointerUp(e) {
  const d = S3.drag;
  if (!d) return;
  const slot = s3NearestFreeSlot(e.clientX, e.clientY);
  const item = d.item, color = d.color;
  s3EndDrag(item);
  S3.drag = null;

  if (slot >= 0) {
    S3.filled[slot] = color;
    const poly = S3.slots[slot];
    poly.style.fill = color;
    poly.classList.add('filled');
    item.classList.remove('picked');
    item.classList.add('used');
    s3UpdateProgress();
  } else {
    item.classList.remove('picked');   // dropped outside: it simply returns to the pool
  }
}

function s3PointerCancel() {
  const d = S3.drag;
  if (!d) return;
  const item = d.item;
  s3EndDrag(item);
  S3.drag = null;
  item.classList.remove('picked');
}

function s3UpdateProgress() {
  const n = S3.filled.filter(Boolean).length;
  document.getElementById('placed-count').textContent = n;

  if (n === 6) {
    setTimeout(() => {
      document.getElementById('circle-board').classList.add('complete');
      document.getElementById('circle-feedback').classList.add('show');
      s3CountUp();
    }, 450);
  }
}

function s3CountUp() {
  const el = document.getElementById('s3-total');
  const start = performance.now(), dur = 1400;
  cancelAnimationFrame(S3.countRaf);
  const tick = now => {
    const k = clamp01((now - start) / dur);
    el.textContent = Math.round(360 * ease(k)) + '°';
    if (k < 1) S3.countRaf = requestAnimationFrame(tick);
  };
  S3.countRaf = requestAnimationFrame(tick);
}

function resetSlide3() {
  cancelAnimationFrame(S3.countRaf);
  S3.filled = [null, null, null, null, null, null];
  S3.drag = null;
  document.querySelectorAll('.drag-ghost').forEach(g => g.remove());
  document.getElementById('circle-feedback').classList.remove('show');
  document.getElementById('placed-count').textContent = '0';
  buildBoard();
  buildPool();
}

/* =====================================================================
   SLIDE 4: THE TIMELINE ANIMATION
   ---------------------------------------------------------------------
   Time (seconds)  What happens
    0  - 3         equilateral triangle is drawn (equal-side ticks, 60 deg labels)
    3  - 6.5       top corner slides over the left corner -> right triangle
    6.5- 9.5       right-angle square + 90 deg
    9.5-13         hypotenuse: arrow from the right angle across to the facing side
   13  - 16.5      camera appears, flies to the bottom-right corner, angle alpha appears
   16.5- 20        arrow to the OPPOSITE side
   20  - 23        label of the ADJACENT side
   23  - 26        H O A summary
   26  - 31        camera flies to the top corner: O and A swap
   31  - 35        recap
   ===================================================================== */
const COL = { blue: '#4A90E2', red: '#E74C3C', green: '#27AE60', orange: '#F39C12', purple: '#B794F4', text: '#E2E8F0', dim: '#A0AEC0' };

const S4 = {
  P: { x: 210, y: 370 },    // right-angle corner (bottom-left)
  Q: { x: 470, y: 370 },    // bottom-right corner
  R: { x: 210, y: 145 },    // top-left corner (final apex)
  C0: { x: 340, y: 145 },   // apex of the equilateral triangle
  duration: 35,
  t: 0,
  playing: false,
  last: 0,
  raf: 0,
  built: false,
  els: {},
  capKey: ''
};

const S4_CAPTIONS = [
  [0, 'cap1'], [3, 'cap2'], [6.5, 'cap3'], [9.5, 'cap4'], [13, 'cap5'],
  [16.5, 'cap6'], [20, 'cap7'], [23, 'cap8'], [26, 'cap9'], [31, 'cap10']
];

function initSlide4() {
  buildS4();
  document.getElementById('play-animation-btn').addEventListener('click', () => {
    if (S4.playing) s4Pause(); else s4Play();
  });
  document.getElementById('reset-animation-btn').addEventListener('click', s4Restart);
  document.getElementById('s4-slider').addEventListener('input', e => {
    s4Pause();
    S4.t = (e.target.value / 1000) * S4.duration;
    s4Update();
  });
  s4Update();
}

/* ---------- build the SVG scene once ---------- */
function buildS4() {
  const svg = document.getElementById('triangle-animation');
  svg.innerHTML = '';
  const E = S4.els = {};

  // arrow heads
  const defs = svgEl('defs', {}, svg);
  [['arrR', COL.red], ['arrG', COL.green], ['arrO', COL.orange]].forEach(([id, c]) => {
    const m = svgEl('marker', { id, markerWidth: 14, markerHeight: 14, refX: 11, refY: 7, orient: 'auto', markerUnits: 'userSpaceOnUse' }, defs);
    svgEl('path', { d: 'M1,1 L12,7 L1,13 Z', fill: c }, m);
  });

  // right-hand panel (H / O / A definitions)
  svgEl('rect', { x: 575, y: 50, width: 235, height: 340, rx: 16, class: 's4-panel' }, svg);
  E.title = svgEl('text', { x: 692, y: 118, 'text-anchor': 'middle', class: 's4-title' }, svg);
  [['H', COL.red], ['O', COL.green], ['A', COL.orange]].forEach(([ch, c], i) => {
    const ts = svgEl('tspan', { fill: c, dx: i ? 14 : 0 }, E.title);
    ts.textContent = ch;
  });
  E.rows = [['H', COL.red, 200], ['O', COL.green, 270], ['A', COL.orange, 340]].map(([ch, c, y]) => {
    const g = svgEl('g', {}, svg);
    svgEl('circle', { cx: 603, cy: y, r: 17, fill: c }, g);
    const l = svgEl('text', { x: 603, y: y + 1, 'text-anchor': 'middle', 'dominant-baseline': 'middle', class: 's4-chip' }, g);
    l.textContent = ch;
    const n = svgEl('text', { x: 631, y: y - 6, 'dominant-baseline': 'middle', class: 's4-rowname' }, g);
    const d = svgEl('text', { x: 631, y: y + 15, 'dominant-baseline': 'middle', class: 's4-rowdef' }, g);
    return { g, n, d };
  });

  // triangle
  E.fill = svgEl('polygon', { fill: COL.blue, 'fill-opacity': 0.14 }, svg);
  const side = () => svgEl('line', { pathLength: 1, 'stroke-dasharray': 1, 'stroke-linecap': 'round' }, svg);
  E.sBottom = side(); E.sLeft = side(); E.sHyp = side();
  E.ticks = [0, 1, 2].map(() => svgEl('line', { stroke: COL.dim, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, svg));
  E.deg60 = [0, 1, 2].map(() => {
    const t = svgEl('text', { 'text-anchor': 'middle', 'dominant-baseline': 'middle', class: 's4-lbl s4-small', fill: COL.text }, svg);
    t.textContent = '60°';
    return t;
  });

  // right-angle marker
  E.raFill = svgEl('polygon', { fill: 'rgba(231,76,60,0.25)' }, svg);
  E.raLine = svgEl('polyline', { fill: 'none', stroke: COL.red, 'stroke-width': 3, 'stroke-linejoin': 'round' }, svg);
  E.raLabel = svgEl('text', { 'text-anchor': 'end', 'dominant-baseline': 'middle', class: 's4-lbl', fill: COL.red }, svg);
  E.raLabel.textContent = '90°';

  // hypotenuse arrow + label
  E.hypArrow = svgEl('line', { stroke: COL.red, 'stroke-width': 3, 'stroke-dasharray': '8 6', 'marker-end': 'url(#arrR)', 'stroke-linecap': 'round' }, svg);
  E.hypLabel = svgEl('text', { 'text-anchor': 'start', 'dominant-baseline': 'middle', class: 's4-lbl', fill: COL.red }, svg);

  // opposite / adjacent arrows + labels
  E.oppArrow = svgEl('line', { stroke: COL.green, 'stroke-width': 3, 'marker-end': 'url(#arrG)', 'stroke-linecap': 'round' }, svg);
  E.oppLabel = svgEl('text', { 'dominant-baseline': 'middle', class: 's4-lbl', fill: COL.green }, svg);
  E.adjArrow = svgEl('line', { stroke: COL.orange, 'stroke-width': 3, 'marker-end': 'url(#arrO)', 'stroke-linecap': 'round' }, svg);
  E.adjLabel = svgEl('text', { 'dominant-baseline': 'middle', class: 's4-lbl', fill: COL.orange }, svg);

  // angle alpha at the bottom-right corner (arcQ) and at the top corner (arcR)
  const { P, Q, R } = S4;
  const aQ0 = 180, aQ1 = (toDeg(Math.atan2(R.y - Q.y, R.x - Q.x)) + 360) % 360;
  const aR0 = 90, aR1 = toDeg(Math.atan2(Q.y - R.y, Q.x - R.x));
  const arc = (c, r, a0, a1) => {
    const p0 = polar(c, r, a0), p1 = polar(c, r, a1);
    return `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 1 : 0} ${p1.x} ${p1.y}`;
  };
  E.arcQ = svgEl('path', { d: arc(Q, 40, aQ0, aQ1), fill: 'none', stroke: COL.purple, 'stroke-width': 3, 'stroke-linecap': 'round' }, svg);
  E.arcR = svgEl('path', { d: arc(R, 40, aR0, aR1), fill: 'none', stroke: COL.purple, 'stroke-width': 3, 'stroke-linecap': 'round' }, svg);
  const aPosQ = polar(Q, 62, (aQ0 + aQ1) / 2), aPosR = polar(R, 62, (aR0 + aR1) / 2);
  E.alphaQ = svgEl('text', { x: aPosQ.x, y: aPosQ.y, 'text-anchor': 'middle', 'dominant-baseline': 'middle', class: 's4-alpha', fill: COL.purple }, svg);
  E.alphaR = svgEl('text', { x: aPosR.x, y: aPosR.y, 'text-anchor': 'middle', 'dominant-baseline': 'middle', class: 's4-alpha', fill: COL.purple }, svg);
  E.alphaQ.textContent = 'α'; E.alphaR.textContent = 'α';

  // camera (drawn facing +x, rotated each frame so it always looks at the triangle)
  E.cam = svgEl('g', {}, svg);
  svgEl('polygon', { points: '20,-5 62,-20 62,20 20,5', fill: 'rgba(255,255,255,0.10)' }, E.cam);
  svgEl('rect', { x: -14, y: -17, width: 14, height: 6, rx: 2, fill: '#2D3748', stroke: '#CBD5E0', 'stroke-width': 2 }, E.cam);
  svgEl('rect', { x: -22, y: -12, width: 30, height: 24, rx: 5, fill: '#2D3748', stroke: '#CBD5E0', 'stroke-width': 2 }, E.cam);
  svgEl('rect', { x: 8, y: -8, width: 12, height: 16, rx: 2, fill: '#4A5568', stroke: '#CBD5E0', 'stroke-width': 2 }, E.cam);
  svgEl('circle', { cx: 14, cy: 0, r: 3.5, fill: '#90CDF4' }, E.cam);

  S4.built = true;
  updateS4Texts();
}

/* ---------- texts that depend on language ---------- */
function updateS4Texts() {
  if (!S4.built) return;
  const t = translations[currentLanguage], E = S4.els;
  E.hypLabel.textContent = t.hypotenuse;
  E.oppLabel.textContent = t.opposite;
  E.adjLabel.textContent = t.adjacent;
  [['nameH', 'defH'], ['nameO', 'defO'], ['nameA', 'defA']].forEach(([n, d], i) => {
    E.rows[i].n.textContent = t[n];
    E.rows[i].d.textContent = t[d];
  });
  S4.capKey = '';              // force caption refresh in the new language
  updatePlayButton();
  s4Update();
}

function updatePlayButton() {
  const t = translations[currentLanguage];
  const btn = document.getElementById('play-animation-btn');
  if (!btn) return;
  if (S4.playing) btn.textContent = t.pauseLabel;
  else if (S4.t >= S4.duration - 0.01) btn.textContent = t.replayLabel;
  else btn.textContent = t.playLabel;
}

/* ---------- transport ---------- */
function s4Play() {
  if (S4.t >= S4.duration - 0.01) S4.t = 0;
  S4.playing = true;
  S4.last = performance.now();
  cancelAnimationFrame(S4.raf);
  S4.raf = requestAnimationFrame(s4Loop);
  updatePlayButton();
}

function s4Pause() {
  S4.playing = false;
  cancelAnimationFrame(S4.raf);
  updatePlayButton();
}

function s4Restart() {
  S4.t = 0;
  s4Update();
  s4Play();
}

function s4Loop(now) {
  if (!S4.playing) return;
  const dt = Math.min(0.1, (now - S4.last) / 1000);   // clamp so a hidden tab can't jump the film
  S4.last = now;
  S4.t = Math.min(S4.duration, S4.t + dt);
  s4Update();
  if (S4.t >= S4.duration) { S4.playing = false; updatePlayButton(); return; }
  S4.raf = requestAnimationFrame(s4Loop);
}

function s4Update() {
  if (!S4.built) return;
  renderS4(S4.t);
  updateCaption(S4.t);
  document.getElementById('s4-slider').value = (S4.t / S4.duration) * 1000;
  const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  document.getElementById('s4-time').textContent = `${fmt(S4.t)} / ${fmt(S4.duration)}`;
}

function updateCaption(t) {
  let key = S4_CAPTIONS[0][1];
  for (const [from, k] of S4_CAPTIONS) if (t >= from) key = k;
  if (key === S4.capKey) return;
  S4.capKey = key;
  const el = document.getElementById('s4-caption');
  el.textContent = translations[currentLanguage][key];
  el.classList.remove('fade-in');
  void el.offsetWidth;                // restart the CSS fade
  el.classList.add('fade-in');
}

/* ---------- THE RENDERER: everything below is a pure function of t ---------- */
function setLine(el, a, b) {
  el.setAttribute('x1', a.x); el.setAttribute('y1', a.y);
  el.setAttribute('x2', b.x); el.setAttribute('y2', b.y);
}

function setSide(el, a, b, drawn, color, width) {
  setLine(el, a, b);
  el.setAttribute('stroke', color);
  el.setAttribute('stroke-width', width);
  el.setAttribute('stroke-dashoffset', 1 - drawn);
  el.style.visibility = drawn > 0.001 ? 'visible' : 'hidden';
}

function setArrow(el, a, b, progress, opacity) {
  setLine(el, a, lerpPt(a, b, progress));
  el.style.opacity = progress > 0.01 ? opacity : 0;
}

function setLabel(el, pos, anchor, opacity) {
  el.setAttribute('x', pos.x);
  el.setAttribute('y', pos.y);
  if (anchor) el.setAttribute('text-anchor', anchor);
  el.style.opacity = opacity;
}

function renderS4(t) {
  const E = S4.els, { P, Q, R, C0 } = S4;

  /* ---- the moving apex: equilateral -> right triangle ---- */
  const C = lerpPt(C0, R, ease(seg(t, 3, 6.5)));
  const cen = { x: (P.x + Q.x + C.x) / 3, y: (P.y + Q.y + C.y) / 3 };

  E.fill.setAttribute('points', `${P.x},${P.y} ${Q.x},${Q.y} ${C.x},${C.y}`);
  E.fill.style.opacity = seg(t, 1.8, 2.6);

  /* ---- colours of the three sides ---- */
  const hv = seg(t, 9.5, 10.5);                 // hypotenuse turns red
  const oVis = seg(t, 16.8, 17.8);              // opposite turns green
  const aVis = seg(t, 20, 21);                  // adjacent turns orange
  const cp = ease(seg(t, 26.5, 29.5));          // camera flight to the top corner (0 -> 1)
  const f = cp < 0.5 ? 1 - 2 * cp : 2 * cp - 1; // V-shaped fade used while O and A trade places
  const modeR = cp >= 0.5;                      // false: looking from bottom-right, true: from the top

  const colHyp = mix2(COL.blue, COL.red, hv);
  const colLeft = mix2(mix2(COL.blue, COL.green, oVis), COL.orange, cp);
  const colBot = mix2(mix2(COL.blue, COL.orange, aVis), COL.green, cp);

  setSide(E.sBottom, P, Q, seg(t, 0, 0.9), colBot, 3.5 + 1.5 * aVis);
  setSide(E.sHyp, Q, C, seg(t, 0.7, 1.6), colHyp, 3.5 + 2 * hv);
  setSide(E.sLeft, P, C, seg(t, 1.4, 2.3), colLeft, 3.5 + 1.5 * oVis);

  /* ---- equilateral extras: equal-side ticks and 60 deg labels ---- */
  const eqOp = seg(t, 2.3, 2.9) * (1 - seg(t, 3, 3.6));
  [[P, Q], [Q, C], [C, P]].forEach(([a, b], i) => {
    const mid = lerpPt(a, b, 0.5), d = unitPt(subPt(b, a)), n = { x: -d.y, y: d.x };
    setLine(E.ticks[i], addPt(mid, n, -8), addPt(mid, n, 8));
    E.ticks[i].style.opacity = eqOp;
  });
  [P, Q, C].forEach((v, i) => {
    setLabel(E.deg60[i], addPt(v, unitPt(subPt(cen, v)), 38), null, eqOp);
  });

  /* ---- right-angle marker ---- */
  const ra = seg(t, 6.5, 7.4);
  const s = 24;
  E.raFill.setAttribute('points', `${P.x},${P.y} ${P.x + s},${P.y} ${P.x + s},${P.y - s} ${P.x},${P.y - s}`);
  E.raLine.setAttribute('points', `${P.x + s},${P.y} ${P.x + s},${P.y - s} ${P.x},${P.y - s}`);
  E.raFill.style.opacity = ra;
  E.raLine.style.opacity = ra;
  setLabel(E.raLabel, { x: P.x - 14, y: P.y - 20 }, 'end', seg(t, 6.9, 7.7));

  /* ---- hypotenuse: arrow from the right angle to the side that faces it ---- */
  const hypMid = lerpPt(Q, C, 0.5);
  const hypDir = unitPt(subPt(hypMid, P));
  setArrow(E.hypArrow, addPt(P, hypDir, 48), addPt(hypMid, hypDir, -8), ease(seg(t, 9.5, 11)), 1 - seg(t, 13, 14));
  // label sits just outside the hypotenuse, on the side away from the triangle's centre
  let hn = unitPt({ x: Q.y - C.y, y: C.x - Q.x });
  if (hn.x * (hypMid.x - cen.x) + hn.y * (hypMid.y - cen.y) < 0) hn = { x: -hn.x, y: -hn.y };
  setLabel(E.hypLabel, addPt(hypMid, hn, 26), 'start', seg(t, 11, 11.8));

  /* ---- camera ---- */
  const cenF = { x: (P.x + Q.x + R.x) / 3, y: (P.y + Q.y + R.y) / 3 };
  const out = v => addPt(v, unitPt(subPt(v, cenF)), 50);
  const Pout = out(P), Qout = out(Q), Rout = out(R);
  let camPos, camAng;
  if (t < 26.5) {
    camPos = lerpPt(Pout, Qout, ease(seg(t, 13.3, 16)));
  } else {
    // curved flight on the outside of the hypotenuse (quadratic Bezier, so it never crosses the labels)
    const mid = unitPt(subPt(lerpPt(Qout, Rout, 0.5), cenF));
    const M = addPt(cenF, mid, 235);
    const ctrl = { x: 2 * M.x - 0.5 * (Qout.x + Rout.x), y: 2 * M.y - 0.5 * (Qout.y + Rout.y) };
    const u = 1 - cp;
    camPos = {
      x: u * u * Qout.x + 2 * u * cp * ctrl.x + cp * cp * Rout.x,
      y: u * u * Qout.y + 2 * u * cp * ctrl.y + cp * cp * Rout.y
    };
  }
  camAng = toDeg(Math.atan2(cenF.y - camPos.y, cenF.x - camPos.x));   // always look at the triangle
  if (t >= 26.5 && camAng < 0) camAng += 360;
  E.cam.setAttribute('transform', `translate(${camPos.x.toFixed(2)} ${camPos.y.toFixed(2)}) rotate(${camAng.toFixed(2)})`);
  E.cam.style.opacity = seg(t, 12.6, 13.3);

  /* ---- angle alpha (follows the camera) ---- */
  const arcQop = seg(t, 15.6, 16.5) * (1 - clamp01(cp * 2));
  const arcRop = clamp01(cp * 2 - 1);
  E.arcQ.style.opacity = arcQop; E.alphaQ.style.opacity = arcQop;
  E.arcR.style.opacity = arcRop; E.alphaR.style.opacity = arcRop;

  /* ---- OPPOSITE: arrow from the observed angle straight across to the facing side ---- */
  const midL = lerpPt(P, R, 0.5), midB = lerpPt(P, Q, 0.5);
  let oa, ob, oLab, oAnchor, aa, ab, aLab, aAnchor;
  if (!modeR) {
    const d = unitPt(subPt(midL, Q));
    oa = addPt(Q, d, 90); ob = addPt(midL, d, -8);
    oLab = { x: midL.x - 18, y: midL.y }; oAnchor = 'end';
    aLab = { x: midB.x, y: midB.y + 52 }; aAnchor = 'middle';
    aa = { x: midB.x, y: midB.y + 34 }; ab = { x: midB.x, y: midB.y + 6 };
  } else {
    const d = unitPt(subPt(midB, R));
    oa = addPt(R, d, 90); ob = addPt(midB, d, -8);
    oLab = { x: midB.x, y: midB.y + 30 }; oAnchor = 'middle';
    aLab = { x: midL.x - 46, y: midL.y }; aAnchor = 'end';
    aa = { x: midL.x - 40, y: midL.y }; ab = { x: midL.x - 6, y: midL.y };
  }
  setArrow(E.oppArrow, oa, ob, ease(seg(t, 16.8, 18.5)), f);
  setLabel(E.oppLabel, oLab, oAnchor, seg(t, 18.2, 19) * f);

  /* ---- ADJACENT: label + short arrow pointing at the side that touches alpha ---- */
  setArrow(E.adjArrow, aa, ab, ease(seg(t, 20, 21.2)), f);
  setLabel(E.adjLabel, aLab, aAnchor, seg(t, 20.8, 21.6) * f);

  /* ---- right-hand panel ---- */
  const rowAt = [11.2, 18.6, 21.6];
  E.rows.forEach((r, i) => {
    const o = seg(t, rowAt[i], rowAt[i] + 0.8);
    r.g.style.opacity = o;
    r.g.setAttribute('transform', `translate(${((1 - o) * 14).toFixed(2)} 0)`);
  });
  const ti = seg(t, 23, 24);
  E.title.style.opacity = ti;
  E.title.setAttribute('transform', `translate(692 118) scale(${(0.85 + 0.15 * ease(ti)).toFixed(3)}) translate(-692 -118)`);
}

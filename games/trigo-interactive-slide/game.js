/**
 * EduQuest MY - Trigonometry Interactive Slide
 * 7-slide educational module with history, concepts, and quiz
 */

// ===== APPLICATION STATE =====
let currentSlide = 1;
let currentLanguage = 'en';
let quizAnswers = {};
let quizScore = 0;

// ===== TRANSLATIONS (BM, EN, 中文) =====
const translations = {
  en: {
    mainTitle: "Trigonometry: From History to Function",
    prevBtn: "← Previous",
    nextBtn: "Next →",
    
    // Slide 1: Babylonian History
    slide1Title: "🏛️ Babylonian Origins of Trigonometry",
    slide1Text1: "Trigonometry originated from the ancient Babylonian civilization, around 1800 BCE. Babylonian astronomers and mathematicians were the first to study angles and their relationships in triangles.",
    slide1Text2: "They used sophisticated mathematical techniques to:",
    slide1Bullet1: "Track celestial bodies and stars",
    slide1Bullet2: "Calculate distances without direct measurement",
    slide1Bullet3: "Develop early astronomy and calendar systems",
    
    // Slide 2: Sexagesimal System
    slide2Title: "🔢 The Sexagesimal (Base-60) System",
    slide2Text1: "The Babylonians used a sexagesimal system — a base-60 counting system, not the base-10 we use today.",
    slide2Text2: "This ancient system still influences us:",
    slide2Bullet1: "60 seconds in a minute",
    slide2Bullet2: "60 minutes in an hour",
    slide2Bullet3: "360 degrees in a circle (6 × 60)",
    slide2InfoText: "The Babylonians divided angles into 60 equal parts. Since 6 triangles can form a complete circle, they established that 1 circle = 6 × 60 = 360 degrees.",
    
    // Slide 3: Circle Division
    slide3Title: "⭕ The 360° Circle: Six Triangles",
    slide3Text: "Try dragging the 6 triangles below into the circular box on the right. You'll see that 6 equal triangles perfectly form one complete circle!",
    dragTriangles: "Drag triangles here →",
    circleComplete: "✅ Perfect! 6 triangles make a complete 360° circle!",
    
    // Slide 4: Right Triangle
    slide4Title: "📐 Right Triangle: The Three Sides",
    slide4Text: "When we study one angle (other than the right angle) in a right triangle, we identify three sides:",
    hypotenuseDesc: "The longest side, opposite the right angle",
    oppositeDesc: "The side opposite to the angle θ we're studying",
    adjacentDesc: "The side next to the angle θ (not the hypotenuse)",
    
    // Slide 5: Six Ratios
    slide5Title: "🔗 The Six Trigonometric Ratios",
    slide5Text: "No matter how big or small the triangle is, if you fix one angle θ, these six ratios are always the same!",
    tryItOut: "Try It Out:",
    angleLabel: "Angle θ:",
    
    ratioSine: "Sine",
    ratioSineFull: "sin(θ)",
    ratioSineFormula: "sin(θ) = Opposite / Hypotenuse",
    
    ratioCosine: "Cosine",
    ratioCosineFull: "cos(θ)",
    ratioCosineFormula: "cos(θ) = Adjacent / Hypotenuse",
    
    ratioTangent: "Tangent",
    ratioTangentFull: "tan(θ)",
    ratioTangentFormula: "tan(θ) = Opposite / Adjacent",
    
    ratioCosecant: "Cosecant",
    ratioCosecantFull: "cosec(θ)",
    ratioCosecantFormula: "cosec(θ) = Hypotenuse / Opposite",
    
    ratioSecant: "Secant",
    ratioSecantFull: "sec(θ)",
    ratioSecantFormula: "sec(θ) = Hypotenuse / Adjacent",
    
    ratioCotangent: "Cotangent",
    ratioCotangentFull: "cot(θ)",
    ratioCotangentFormula: "cot(θ) = Adjacent / Opposite",
    
    // Slide 6: Functions
    slide6Title: "📈 Trigonometric Functions",
    slide6Text: "The six ratios define six trigonometric functions that describe how the side lengths change as the angle changes.",
    unitCircleTitle: "Unit Circle",
    slide6InfoText: "These functions are fundamental in physics, engineering, and advanced mathematics. They describe cyclic patterns in nature: waves, oscillations, and circular motion!",
    
    // Slide 7: Quiz
    slide7Title: "❓ Quiz: Test Your Understanding",
    quizComplete: "Quiz Complete!",
    quizQ1: "What counting system did the Babylonians use?",
    quizQ1A: "Base-10 (decimal)",
    quizQ1B: "Base-60 (sexagesimal)",
    quizQ1C: "Base-2 (binary)",
    quizQ1D: "Base-12 (duodecimal)",
    quizQ1Correct: "B",
    quizQ1Solution: "The Babylonians invented the sexagesimal (base-60) system, which still influences our time measurements (60 seconds, 60 minutes) and angles (360 degrees = 6 × 60).",
    
    quizQ2: "How many triangles form one complete circle of 360°?",
    quizQ2A: "3 triangles",
    quizQ2B: "4 triangles",
    quizQ2C: "6 triangles",
    quizQ2D: "12 triangles",
    quizQ2Correct: "C",
    quizQ2Solution: "Six equilateral triangles, each with 60° angles, perfectly form a 360° circle. This is why 1 circle = 6 × 60 = 360°.",
    
    quizQ3: "In a right triangle, which side is opposite the right angle?",
    quizQ3A: "The adjacent side",
    quizQ3B: "The opposite side",
    quizQ3C: "The hypotenuse",
    quizQ3D: "None - the right angle has no opposite side",
    quizQ3Correct: "C",
    quizQ3Solution: "The hypotenuse is the longest side of a right triangle and is always opposite the 90° right angle. This is the most important side in trigonometry.",
    
    quizQ4: "sin(θ) is equal to:",
    quizQ4A: "Adjacent / Hypotenuse",
    quizQ4B: "Hypotenuse / Opposite",
    quizQ4C: "Opposite / Hypotenuse",
    quizQ4D: "Adjacent / Opposite",
    quizQ4Correct: "C",
    quizQ4Solution: "sin(θ) = Opposite / Hypotenuse. Remember SOH = Sine = Opposite over Hypotenuse. This is one of the fundamental trigonometric ratios.",
    
    quizQ5: "Which ratio equals tan(θ)?",
    quizQ5A: "Opposite / Hypotenuse",
    quizQ5B: "Adjacent / Hypotenuse",
    quizQ5C: "Opposite / Adjacent",
    quizQ5D: "Hypotenuse / Adjacent",
    quizQ5Correct: "C",
    quizQ5Solution: "tan(θ) = Opposite / Adjacent. Remember TOA = Tangent = Opposite over Adjacent. This ratio compares the two legs (not the hypotenuse).",
  },
  
  bm: {
    mainTitle: "Trigonometri: Dari Sejarah ke Fungsi",
    prevBtn: "← Sebelum",
    nextBtn: "Seterusnya →",
    
    slide1Title: "🏛️ Asal-usul Trigonometri Babylon",
    slide1Text1: "Trigonometri berasal daripada tamadun Babylon kuno, sekitar 1800 SM. Ahli astronomi dan matematik Babylon adalah yang pertama mengkaji sudut dan hubungan mereka dalam segi tiga.",
    slide1Text2: "Mereka menggunakan teknik matematik canggih untuk:",
    slide1Bullet1: "Menjejaki badan-badan cakerawala dan bintang",
    slide1Bullet2: "Mengira jarak tanpa pengukuran langsung",
    slide1Bullet3: "Membangun sistem astronomi dan takwim awal",
    
    slide2Title: "🔢 Sistem Sexagesimal (Asas-60)",
    slide2Text1: "Orang Babylon menggunakan sistem sexagesimal — sistem perangkaan asas-60, bukan asas-10 yang kita gunakan hari ini.",
    slide2Text2: "Sistem purba ini masih mempengaruhi kita:",
    slide2Bullet1: "60 saat dalam satu minit",
    slide2Bullet2: "60 minit dalam satu jam",
    slide2Bullet3: "360 darjah dalam satu bulatan (6 × 60)",
    slide2InfoText: "Orang Babylon membahagi sudut kepada 60 bahagian yang sama. Kerana 6 segi tiga boleh membentuk satu bulatan lengkap, mereka menetapkan bahawa 1 bulatan = 6 × 60 = 360 darjah.",
    
    slide3Title: "⭕ Bulatan 360°: Enam Segi Tiga",
    slide3Text: "Cuba seret 6 segi tiga di bawah ke dalam kotak bulatan di sebelah kanan. Anda akan melihat bahawa 6 segi tiga yang sama membentuk satu bulatan lengkap!",
    dragTriangles: "Seret segi tiga di sini →",
    circleComplete: "✅ Sempurna! 6 segi tiga membentuk bulatan 360° yang lengkap!",
    
    slide4Title: "📐 Segi Tiga Bersudut Tegak: Tiga Sisi",
    slide4Text: "Apabila kita mengkaji satu sudut (selain sudut tegak) dalam segi tiga bersudut tegak, kita mengenal pasti tiga sisi:",
    hypotenuseDesc: "Sisi paling panjang, bertentangan dengan sudut tegak",
    oppositeDesc: "Sisi bertentangan dengan sudut θ yang kita kaji",
    adjacentDesc: "Sisi bersebelahan dengan sudut θ (bukan hipotenus)",
    
    slide5Title: "🔗 Enam Nisbah Trigonometri",
    slide5Text: "Tidak kira betapa besar atau kecil segi tiga itu, jika anda menetapkan satu sudut θ, enam nisbah ini sentiasa sama!",
    tryItOut: "Cubalah:",
    angleLabel: "Sudut θ:",
    
    ratioSine: "Sinus",
    ratioSineFull: "sin(θ)",
    ratioSineFormula: "sin(θ) = Bertentangan / Hipotenus",
    
    ratioCosine: "Kosinus",
    ratioCosineFull: "cos(θ)",
    ratioCosineFormula: "cos(θ) = Bersebelahan / Hipotenus",
    
    ratioTangent: "Tangen",
    ratioTangentFull: "tan(θ)",
    ratioTangentFormula: "tan(θ) = Bertentangan / Bersebelahan",
    
    ratioCosecant: "Kosekant",
    ratioCosecantFull: "cosec(θ)",
    ratioCosecantFormula: "cosec(θ) = Hipotenus / Bertentangan",
    
    ratioSecant: "Sekan",
    ratioSecantFull: "sec(θ)",
    ratioSecantFormula: "sec(θ) = Hipotenus / Bersebelahan",
    
    ratioCotangent: "Kotangen",
    ratioCotangentFull: "cot(θ)",
    ratioCotangentFormula: "cot(θ) = Bersebelahan / Bertentangan",
    
    slide6Title: "📈 Fungsi Trigonometri",
    slide6Text: "Enam nisbah mentakrifkan enam fungsi trigonometri yang menerangkan bagaimana panjang sisi berubah apabila sudut berubah.",
    unitCircleTitle: "Bulatan Unit",
    slide6InfoText: "Fungsi ini adalah asas dalam fizik, kejuruteraan, dan matematik maju. Ia menerangkan corak kitaran dalam alam semula jadi: gelombang, ayunan, dan gerakan bulatan!",
    
    slide7Title: "❓ Kuiz: Uji Pemahaman Anda",
    quizComplete: "Kuiz Lengkap!",
    quizQ1: "Sistem perangkaan apakah yang digunakan oleh orang Babylon?",
    quizQ1A: "Asas-10 (perpuluhan)",
    quizQ1B: "Asas-60 (sexagesimal)",
    quizQ1C: "Asas-2 (binari)",
    quizQ1D: "Asas-12 (duodecimal)",
    quizQ1Correct: "B",
    quizQ1Solution: "Orang Babylon mencipta sistem sexagesimal (asas-60), yang masih mempengaruhi pengukuran masa kami (60 saat, 60 minit) dan sudut (360 darjah = 6 × 60).",
    
    quizQ2: "Berapa banyak segi tiga membentuk satu bulatan lengkap 360°?",
    quizQ2A: "3 segi tiga",
    quizQ2B: "4 segi tiga",
    quizQ2C: "6 segi tiga",
    quizQ2D: "12 segi tiga",
    quizQ2Correct: "C",
    quizQ2Solution: "Enam segi tiga sama sisi, masing-masing dengan sudut 60°, membentuk bulatan 360° dengan sempurna. Ini mengapa 1 bulatan = 6 × 60 = 360°.",
    
    quizQ3: "Dalam segi tiga bersudut tegak, sisi manakah yang bertentangan dengan sudut tegak?",
    quizQ3A: "Sisi bersebelahan",
    quizQ3B: "Sisi bertentangan",
    quizQ3C: "Hipotenus",
    quizQ3D: "Tiada - sudut tegak tidak mempunyai sisi bertentangan",
    quizQ3Correct: "C",
    quizQ3Solution: "Hipotenus adalah sisi paling panjang segi tiga bersudut tegak dan sentiasa bertentangan dengan sudut tegak 90°. Ini adalah sisi paling penting dalam trigonometri.",
    
    quizQ4: "sin(θ) bersamaan dengan:",
    quizQ4A: "Bersebelahan / Hipotenus",
    quizQ4B: "Hipotenus / Bertentangan",
    quizQ4C: "Bertentangan / Hipotenus",
    quizQ4D: "Bersebelahan / Bertentangan",
    quizQ4Correct: "C",
    quizQ4Solution: "sin(θ) = Bertentangan / Hipotenus. Ingat SOH = Sinus = Bertentangan ke atas Hipotenus. Ini adalah salah satu nisbah trigonometri asas.",
    
    quizQ5: "Nisbah manakah yang bersamaan dengan tan(θ)?",
    quizQ5A: "Bertentangan / Hipotenus",
    quizQ5B: "Bersebelahan / Hipotenus",
    quizQ5C: "Bertentangan / Bersebelahan",
    quizQ5D: "Hipotenus / Bersebelahan",
    quizQ5Correct: "C",
    quizQ5Solution: "tan(θ) = Bertentangan / Bersebelahan. Ingat TOA = Tangen = Bertentangan ke atas Bersebelahan. Nisbah ini membandingkan dua kaki (bukan hipotenus).",
  },
  
  cn: {
    mainTitle: "三角函数：从历史到函数",
    prevBtn: "← 上一步",
    nextBtn: "下一步 →",
    
    slide1Title: "🏛️ 三角函数的巴比伦起源",
    slide1Text1: "三角函数起源于古代巴比伦文明，大约在公元前1800年。巴比伦天文学家和数学家是第一批研究角度及其三角形关系的人。",
    slide1Text2: "他们使用精密的数学技术来:",
    slide1Bullet1: "追踪天体和星星",
    slide1Bullet2: "在不进行直接测量的情况下计算距离",
    slide1Bullet3: "开发早期天文学和历法系统",
    
    slide2Title: "🔢 六十进制（60进制）系统",
    slide2Text1: "巴比伦人使用六十进制系统——一个60进制的计数系统，而不是我们今天使用的10进制。",
    slide2Text2: "这个古老的系统仍然影响我们：",
    slide2Bullet1: "一分钟有60秒",
    slide2Bullet2: "一小时有60分钟",
    slide2Bullet3: "一个圆有360度（6 × 60）",
    slide2InfoText: "巴比伦人将角度分为60个相等的部分。由于6个三角形可以形成一个完整的圆形，他们确定1个圆 = 6 × 60 = 360度。",
    
    slide3Title: "⭕ 360°圆形：六个三角形",
    slide3Text: "尝试将下面的6个三角形拖到右边的圆形框中。您会看到6个相等的三角形完美地形成一个完整的圆形！",
    dragTriangles: "拖动三角形到此处 →",
    circleComplete: "✅ 完美！6个三角形形成一个完整的360°圆！",
    
    slide4Title: "📐 直角三角形：三条边",
    slide4Text: "当我们研究直角三角形中的一个角（除了直角）时，我们识别三条边：",
    hypotenuseDesc: "最长的边，与直角相对",
    oppositeDesc: "与我们研究的角θ相对的边",
    adjacentDesc: "与角θ相邻的边（不是斜边）",
    
    slide5Title: "🔗 六个三角比",
    slide5Text: "无论三角形多大或多小，如果固定一个角θ，这六个比总是相同的！",
    tryItOut: "试试看:",
    angleLabel: "角度θ:",
    
    ratioSine: "正弦",
    ratioSineFull: "sin(θ)",
    ratioSineFormula: "sin(θ) = 对边 / 斜边",
    
    ratioCosine: "余弦",
    ratioCosineFull: "cos(θ)",
    ratioCosineFormula: "cos(θ) = 邻边 / 斜边",
    
    ratioTangent: "正切",
    ratioTangentFull: "tan(θ)",
    ratioTangentFormula: "tan(θ) = 对边 / 邻边",
    
    ratioCosecant: "余割",
    ratioCosecantFull: "cosec(θ)",
    ratioCosecantFormula: "cosec(θ) = 斜边 / 对边",
    
    ratioSecant: "正割",
    ratioSecantFull: "sec(θ)",
    ratioSecantFormula: "sec(θ) = 斜边 / 邻边",
    
    ratioCotangent: "余切",
    ratioCotangentFull: "cot(θ)",
    ratioCotangentFormula: "cot(θ) = 邻边 / 对边",
    
    slide6Title: "📈 三角函数",
    slide6Text: "六个比定义了六个三角函数，描述当角度变化时边长如何变化。",
    unitCircleTitle: "单位圆",
    slide6InfoText: "这些函数是物理、工程和高等数学的基础。它们描述自然界中的周期性模式：波、振荡和圆周运动！",
    
    slide7Title: "❓ 测验：检验你的理解",
    quizComplete: "测验完成！",
    quizQ1: "巴比伦人使用什么计数系统?",
    quizQ1A: "十进制（10进制）",
    quizQ1B: "六十进制（60进制）",
    quizQ1C: "二进制（2进制）",
    quizQ1D: "十二进制（12进制）",
    quizQ1Correct: "B",
    quizQ1Solution: "巴比伦人发明了六十进制系统，它仍然影响我们的时间测量（60秒、60分钟）和角度（360度 = 6 × 60）。",
    
    quizQ2: "多少个三角形形成一个完整的360°圆？",
    quizQ2A: "3个三角形",
    quizQ2B: "4个三角形",
    quizQ2C: "6个三角形",
    quizQ2D: "12个三角形",
    quizQ2Correct: "C",
    quizQ2Solution: "六个等边三角形，每个有60°角，完美地形成360°圆。这就是为什么1圆 = 6 × 60 = 360°。",
    
    quizQ3: "在直角三角形中，哪条边与直角相对？",
    quizQ3A: "邻边",
    quizQ3B: "对边",
    quizQ3C: "斜边",
    quizQ3D: "无——直角没有相对的边",
    quizQ3Correct: "C",
    quizQ3Solution: "斜边是直角三角形最长的边，总是与90°直角相对。这是三角函数中最重要的边。",
    
    quizQ4: "sin(θ) 等于:",
    quizQ4A: "邻边 / 斜边",
    quizQ4B: "斜边 / 对边",
    quizQ4C: "对边 / 斜边",
    quizQ4D: "邻边 / 对边",
    quizQ4Correct: "C",
    quizQ4Solution: "sin(θ) = 对边 / 斜边。记住 SOH = 正弦 = 对边比斜边。这是基本的三角比之一。",
    
    quizQ5: "哪个比等于 tan(θ)?",
    quizQ5A: "对边 / 斜边",
    quizQ5B: "邻边 / 斜边",
    quizQ5C: "对边 / 邻边",
    quizQ5D: "斜边 / 邻边",
    quizQ5Correct: "C",
    quizQ5Solution: "tan(θ) = 对边 / 邻边。记住 TOA = 正切 = 对边比邻边。这个比比较两条直角边（不是斜边）。",
  }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initSlideNavigation();
  initInteractiveElements();
  updateLanguage('en');
  showSlide(1);
});

// ===== LANGUAGE MANAGEMENT =====
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
  const t = translations[lang];
  
  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) {
      el.textContent = t[key];
    }
  });
  
  // Rebuild dynamic content
  if (currentSlide === 5) buildRatiosSection();
  if (currentSlide === 6) buildFunctionsSection();
  if (currentSlide === 7) buildQuiz();
}

// ===== SLIDE NAVIGATION =====
function initSlideNavigation() {
  document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentSlide > 1) showSlide(currentSlide - 1);
  });
  
  document.getElementById('next-btn').addEventListener('click', () => {
    if (currentSlide < 7) showSlide(currentSlide + 1);
  });
}

function showSlide(slideNum) {
  // Hide all slides
  document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
  
  // Show target slide
  const targetSlide = document.getElementById(`slide-${slideNum}`);
  if (targetSlide) {
    targetSlide.classList.add('active');
  }
  
  currentSlide = slideNum;
  
  // Update progress
  document.getElementById('current-slide').textContent = slideNum;
  document.getElementById('progress-fill').style.width = `${(slideNum / 7) * 100}%`;
  
  // Update button states
  document.getElementById('prev-btn').disabled = slideNum === 1;
  document.getElementById('next-btn').disabled = slideNum === 7;
  
  // Initialize slide-specific content
  if (slideNum === 3) initCircleFormation();
  if (slideNum === 5) buildRatiosSection();
  if (slideNum === 6) buildFunctionsSection();
  if (slideNum === 7) buildQuiz();
}

// ===== SLIDE 3: CIRCLE FORMATION =====
function initCircleFormation() {
  const pool = document.getElementById('triangles-pool');
  if (pool.children.length > 0) return; // Already initialized
  
  // Create 6 draggable triangles
  for (let i = 0; i < 6; i++) {
    const svg = createTriangleSVG(i);
    pool.appendChild(svg);
  }
}

function createTriangleSVG(index) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('class', 'draggable-triangle');
  svg.setAttribute('draggable', 'true');
  
  // Create equilateral triangle
  const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  poly.setAttribute('points', '50,10 90,90 10,90');
  poly.setAttribute('fill', `hsl(${index * 60}, 70%, 60%)`);
  poly.setAttribute('stroke', 'white');
  poly.setAttribute('stroke-width', '2');
  
  svg.appendChild(poly);
  
  // Add drag listeners
  svg.addEventListener('dragstart', (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
  });
  
  return svg;
}

// ===== SLIDE 5: RATIOS SECTION =====
function buildRatiosSection() {
  const container = document.getElementById('ratios-container');
  container.innerHTML = ''; // Clear
  
  const t = translations[currentLanguage];
  const ratios = [
    { name: t.ratioSine, full: t.ratioSineFull, formula: t.ratioSineFormula },
    { name: t.ratioCosine, full: t.ratioCosineFull, formula: t.ratioCosineFormula },
    { name: t.ratioTangent, full: t.ratioTangentFull, formula: t.ratioTangentFormula },
    { name: t.ratioCosecant, full: t.ratioCosecantFull, formula: t.ratioCosecantFormula },
    { name: t.ratioSecant, full: t.ratioSecantFull, formula: t.ratioSecantFormula },
    { name: t.ratioCotangent, full: t.ratioCotangentFull, formula: t.ratioCotangentFormula },
  ];
  
  ratios.forEach((ratio, idx) => {
    const card = document.createElement('div');
    card.className = 'ratio-card';
    card.style.animationDelay = `${idx * 0.1}s`;
    card.innerHTML = `
      <div class="ratio-name">${ratio.name}</div>
      <div class="ratio-abbreviation">${ratio.full}</div>
      <div class="ratio-formula">${ratio.formula}</div>
    `;
    container.appendChild(card);
  });
  
  // Initialize angle control
  const angleSlider = document.getElementById('angle-slider');
  const angleInput = document.getElementById('angle-input');
  
  angleSlider.addEventListener('input', (e) => {
    angleInput.value = e.target.value;
    updateInteractiveTriangle(e.target.value);
  });
  
  angleInput.addEventListener('input', (e) => {
    const val = Math.max(5, Math.min(85, e.target.value));
    angleSlider.value = val;
    angleInput.value = val;
    updateInteractiveTriangle(val);
  });
  
  // Initial update
  updateInteractiveTriangle(30);
}

function updateInteractiveTriangle(angle) {
  const svg = document.getElementById('interactive-triangle');
  const container = document.getElementById('ratio-values-display');
  
  // Clear previous
  svg.innerHTML = '';
  container.innerHTML = '';
  
  const angleRad = (angle * Math.PI) / 180;
  const opposite = Math.sin(angleRad) * 100;
  const adjacent = Math.cos(angleRad) * 100;
  const hypotenuse = 100;
  
  // Draw triangle
  svg.innerHTML = `
    <polygon points="30,180 30,80 ${30 + adjacent},180" fill="rgba(74,144,226,0.1)" stroke="#4A90E2" stroke-width="2"/>
    <rect x="30" y="160" width="20" height="20" fill="none" stroke="#E74C3C" stroke-width="2"/>
    <text x="15" y="130" font-size="12" fill="#27AE60" font-weight="bold">O=${opposite.toFixed(1)}</text>
    <text x="${30 + adjacent/2}" y="200" font-size="12" fill="#F39C12" font-weight="bold">A=${adjacent.toFixed(1)}</text>
    <line x1="40" y1="165" x2="55" y2="150" stroke="#9B59B6" stroke-width="2"/>
    <text x="70" y="145" font-size="12" fill="#9B59B6" font-weight="bold">θ=${angle}°</text>
  `;
  
  // Display ratios
  const t = translations[currentLanguage];
  const ratioData = [
    { label: 'sin(θ)', value: Math.sin(angleRad) },
    { label: 'cos(θ)', value: Math.cos(angleRad) },
    { label: 'tan(θ)', value: Math.tan(angleRad) },
  ];
  
  ratioData.forEach(ratio => {
    const div = document.createElement('div');
    div.className = 'ratio-value-item';
    div.innerHTML = `
      <div class="ratio-value-label">${ratio.label}</div>
      <div class="ratio-value-number">${ratio.value.toFixed(3)}</div>
    `;
    container.appendChild(div);
  });
}

// ===== SLIDE 6: FUNCTIONS SECTION =====
function buildFunctionsSection() {
  const container = document.getElementById('functions-list');
  container.innerHTML = '';
  
  const t = translations[currentLanguage];
  const functions = [
    { name: 'Sine (sin)', def: 'sin(θ) = O/H', use: 'Describes vertical component of rotation' },
    { name: 'Cosine (cos)', def: 'cos(θ) = A/H', use: 'Describes horizontal component of rotation' },
    { name: 'Tangent (tan)', def: 'tan(θ) = O/A', use: 'Ratio of vertical to horizontal' },
  ];
  
  functions.forEach(func => {
    const card = document.createElement('div');
    card.className = 'function-card';
    card.innerHTML = `
      <div class="function-name">${func.name}</div>
      <div class="function-definition">${func.def}</div>
      <div class="function-usage">${func.use}</div>
    `;
    container.appendChild(card);
  });
}

// ===== SLIDE 7: QUIZ =====
function buildQuiz() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';
  
  const t = translations[currentLanguage];
  const questions = [
    {
      q: t.quizQ1,
      options: [t.quizQ1A, t.quizQ1B, t.quizQ1C, t.quizQ1D],
      correct: t.quizQ1Correct,
      solution: t.quizQ1Solution
    },
    {
      q: t.quizQ2,
      options: [t.quizQ2A, t.quizQ2B, t.quizQ2C, t.quizQ2D],
      correct: t.quizQ2Correct,
      solution: t.quizQ2Solution
    },
    {
      q: t.quizQ3,
      options: [t.quizQ3A, t.quizQ3B, t.quizQ3C, t.quizQ3D],
      correct: t.quizQ3Correct,
      solution: t.quizQ3Solution
    },
    {
      q: t.quizQ4,
      options: [t.quizQ4A, t.quizQ4B, t.quizQ4C, t.quizQ4D],
      correct: t.quizQ4Correct,
      solution: t.quizQ4Solution
    },
    {
      q: t.quizQ5,
      options: [t.quizQ5A, t.quizQ5B, t.quizQ5C, t.quizQ5D],
      correct: t.quizQ5Correct,
      solution: t.quizQ5Solution
    }
  ];
  
  questions.forEach((q, idx) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'quiz-question';
    
    let optionsHTML = '';
    ['A', 'B', 'C', 'D'].forEach((letter, i) => {
      optionsHTML += `
        <button class="quiz-option" data-question="${idx}" data-answer="${letter}">
          ${letter}. ${q.options[i]}
        </button>
      `;
    });
    
    qDiv.innerHTML = `
      <div class="quiz-question-number">Question ${idx + 1} of 5</div>
      <div class="quiz-question-text">${q.q}</div>
      <div class="quiz-options">${optionsHTML}</div>
      <div class="quiz-solution" data-question="${idx}">
        <div class="solution-title">Explanation:</div>
        <div class="solution-text">${q.solution}</div>
      </div>
    `;
    
    container.appendChild(qDiv);
  });
  
  // Add event listeners
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', handleQuizAnswer);
  });
}

function handleQuizAnswer(e) {
  const btn = e.target;
  const questionIdx = btn.dataset.question;
  const selectedAnswer = btn.dataset.answer;
  const t = translations[currentLanguage];
  
  // Get correct answer
  let correctAnswer;
  if (questionIdx == 0) correctAnswer = t.quizQ1Correct;
  else if (questionIdx == 1) correctAnswer = t.quizQ2Correct;
  else if (questionIdx == 2) correctAnswer = t.quizQ3Correct;
  else if (questionIdx == 3) correctAnswer = t.quizQ4Correct;
  else if (questionIdx == 4) correctAnswer = t.quizQ5Correct;
  
  // Disable all buttons for this question
  document.querySelectorAll(`[data-question="${questionIdx}"]`).forEach(b => {
    b.disabled = true;
    if (b.dataset.answer === correctAnswer) {
      b.classList.add('correct');
    }
    if (b.dataset.answer === selectedAnswer && selectedAnswer !== correctAnswer) {
      b.classList.add('incorrect');
    }
  });
  
  // Show solution
  document.querySelector(`.quiz-solution[data-question="${questionIdx}"]`).classList.add('show');
  
  // Track answer
  quizAnswers[questionIdx] = selectedAnswer === correctAnswer;
  
  // Check if all answered
  if (Object.keys(quizAnswers).length === 5) {
    showQuizResults();
  }
}

function showQuizResults() {
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('quiz-results').style.display = 'block';
  
  const score = Object.values(quizAnswers).filter(v => v).length;
  document.getElementById('score-display').textContent = `Score: ${score} / 5`;
}

// ===== INTERACTIVE ELEMENTS INITIALIZATION =====
function initInteractiveElements() {
  // Setup will be called when reaching those slides
}

// Get language from URL parameter or default to 'en'
const urlParams = new URLSearchParams(window.location.search);
const urlLang = urlParams.get('lang');
if (urlLang && translations[urlLang]) {
  const langBtn = document.querySelector(`[data-lang="${urlLang}"]`);
  if (langBtn) {
    langBtn.click();
  }
}

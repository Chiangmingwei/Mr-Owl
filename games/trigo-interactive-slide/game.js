/**
 * Trigonometry Interactive Slide v2
 * Improved: Fixed drag-drop, animations, single-screen layout
 */

let currentSlide = 1;
let currentLanguage = 'en';
let trianglesPlaced = 0;
let animationInProgress = false;

// ===== TRANSLATIONS =====
const translations = {
  en: {
    mainTitle: "Trigonometry: From History to Function",
    prevBtn: "← Previous",
    nextBtn: "Next →",
    
    // Slide 1
    slide1Title: "🏛️ Babylonian Origins",
    slide1Text1: "Trigonometry originated from ancient Babylon, around 1800 BCE.",
    slide1Bullet1: "Track celestial bodies and stars",
    slide1Bullet2: "Calculate distances without measurement",
    slide1Bullet3: "Develop astronomy and calendar systems",
    
    // Slide 2
    slide2Title: "🔢 Base-60 (Sexagesimal) System",
    slide2Text1: "Why is 60 special? It divides evenly by many numbers!",
    slide2Divisible: "60 is divisible by:",
    slide2NoDecimals: "No decimals needed! Easy to measure anything.",
    slide2Triangle: "60 equal angles in a triangle:",
    
    // Slide 3
    slide3Title: "⭕ Six Triangles = One Circle",
    slide3Text: "Drag 6 triangles to the circle box to discover why a circle is 360°",
    dragTriangles: "Drag here:",
    circleComplete: "✅ Perfect! 6 × 60° = 360°! That's why a circle is 360 degrees!",
    
    // Slide 4
    slide4Title: "📐 From Equal Triangle to Right Triangle",
    slide4Text: "Watch how a triangle changes and we identify three sides",
    hypotenuse: "Hypotenuse (H)",
    opposite: "Opposite (O)",
    adjacent: "Adjacent (A)",
    playAnimation: "▶ Play Animation",
    resetAnimation: "↻ Reset",
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
    
    slide3Title: "⭕ Enam Segi Tiga = Satu Bulatan",
    slide3Text: "Seret 6 segi tiga ke kotak bulatan untuk temui mengapa bulatan ialah 360°",
    dragTriangles: "Seret di sini:",
    circleComplete: "✅ Sempurna! 6 × 60° = 360°! Itulah sebabnya bulatan ialah 360 darjah!",
    
    slide4Title: "📐 Daripada Segi Tiga Sama ke Segi Tiga Bersudut Tegak",
    slide4Text: "Lihat bagaimana segi tiga berubah dan kami mengenal pasti tiga sisi",
    hypotenuse: "Hipotenus (H)",
    opposite: "Bertentangan (O)",
    adjacent: "Bersebelahan (A)",
    playAnimation: "▶ Main Animasi",
    resetAnimation: "↻ Tetapkan Semula",
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
    slide2Divisible: "60可以被整除by:",
    slide2NoDecimals: "不需要小数！易于测量任何东西。",
    slide2Triangle: "三角形中60个相等的角：",
    
    slide3Title: "⭕ 六个三角形 = 一个圆",
    slide3Text: "将6个三角形拖到圆形框中，发现为什么圆是360°",
    dragTriangles: "拖动到此处：",
    circleComplete: "✅ 完美！6 × 60° = 360°！这就是为什么圆是360度！",
    
    slide4Title: "📐 从等边三角形到直角三角形",
    slide4Text: "观看三角形如何变化，我们识别三条边",
    hypotenuse: "斜边 (H)",
    opposite: "对边 (O)",
    adjacent: "邻边 (A)",
    playAnimation: "▶ 播放动画",
    resetAnimation: "↻ 重置",
  }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initSlideNavigation();
  updateLanguage('en');
  showSlide(1);
  initSlide3();
  initSlide4();
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
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) {
      el.textContent = t[key];
    }
  });
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
  document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
  const targetSlide = document.getElementById(`slide-${slideNum}`);
  if (targetSlide) {
    targetSlide.classList.add('active');
  }
  
  currentSlide = slideNum;
  document.getElementById('current-slide').textContent = slideNum;
  document.getElementById('progress-fill').style.width = `${(slideNum / 7) * 100}%`;
  
  document.getElementById('prev-btn').disabled = slideNum === 1;
  document.getElementById('next-btn').disabled = slideNum === 7;
}

// ===== SLIDE 3: CIRCLE FORMATION (FIXED DRAG-DROP) =====
function initSlide3() {
  const pool = document.getElementById('triangles-pool');
  if (pool.children.length > 1) return; // Already initialized
  
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
  svg.setAttribute('data-triangle-id', index);
  
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
  
  const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  poly.setAttribute('points', '50,10 90,90 10,90');
  poly.setAttribute('fill', colors[index]);
  poly.setAttribute('stroke', 'white');
  poly.setAttribute('stroke-width', '2');
  
  svg.appendChild(poly);
  
  // Drag handlers
  let offsetX = 0, offsetY = 0;
  
  svg.addEventListener('mousedown', (e) => {
    svg.classList.add('dragging');
    const rect = svg.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
  });
  
  function onDragMove(e) {
    const target = document.getElementById('circle-target');
    const targetRect = target.getBoundingClientRect();
    const x = e.clientX - targetRect.left - offsetX;
    const y = e.clientY - targetRect.top - offsetY;
    
    svg.style.position = 'fixed';
    svg.style.left = e.clientX - offsetX + 'px';
    svg.style.top = e.clientY - offsetY + 'px';
    svg.style.width = '60px';
    svg.style.height = '60px';
    svg.style.zIndex = '1000';
  }
  
  function onDragEnd(e) {
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);
    
    const target = document.getElementById('circle-target');
    const targetRect = target.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    
    // Check if dropped inside circle
    const centerX = targetRect.left + targetRect.width / 2;
    const centerY = targetRect.top + targetRect.height / 2;
    const triangleX = svgRect.left + svgRect.width / 2;
    const triangleY = svgRect.top + svgRect.height / 2;
    
    const distance = Math.sqrt(Math.pow(triangleX - centerX, 2) + Math.pow(triangleY - centerY, 2));
    
    if (distance < targetRect.width / 2.5) {
      // Successfully placed
      svg.classList.remove('dragging');
      svg.style.position = 'absolute';
      svg.style.left = '0px';
      svg.style.top = '0px';
      svg.style.zIndex = '1';
      
      // Place in circle using rotation
      const angle = (trianglesPlaced * 360 / 6) * (Math.PI / 180);
      const x = 80 * Math.cos(angle);
      const y = 80 * Math.sin(angle);
      
      const placedDiv = document.getElementById('placed-triangles');
      const placed = document.createElement('div');
      placed.style.position = 'absolute';
      placed.style.left = (80 + x) + 'px';
      placed.style.top = (80 + y) + 'px';
      placed.style.width = '50px';
      placed.style.height = '50px';
      placed.appendChild(svg.cloneNode(true));
      placedDiv.appendChild(placed);
      
      trianglesPlaced++;
      svg.style.display = 'none';
      
      if (trianglesPlaced === 6) {
        document.getElementById('circle-feedback').style.display = 'block';
      }
    } else {
      // Reset position
      svg.classList.remove('dragging');
      svg.style.position = 'static';
      svg.style.zIndex = '1';
    }
  }
  
  return svg;
}

// ===== SLIDE 4: ANIMATION =====
function initSlide4() {
  document.getElementById('play-animation-btn')?.addEventListener('click', playTriangleAnimation);
  document.getElementById('reset-animation-btn')?.addEventListener('click', resetTriangleAnimation);
}

function playTriangleAnimation() {
  if (animationInProgress) return;
  animationInProgress = true;
  
  const svg = document.getElementById('triangle-animation');
  svg.innerHTML = '';
  
  // Define animation steps
  const steps = [
    { time: 0, title: 'Equilateral Triangle', transform: 'equilateral' },
    { time: 2000, title: 'Transform to Right Triangle', transform: 'right' },
    { time: 4000, title: 'Label Right Angle', showRightAngle: true },
    { time: 5000, title: 'Label Hypotenuse', showHypotenuse: true },
    { time: 6000, title: 'View from Angle α', viewAngle: 30 },
    { time: 8000, title: 'Hypotenuse = H, Opposite = O', showLabels: true },
  ];
  
  let step = 0;
  const interval = setInterval(() => {
    drawTriangleFrame(step);
    step++;
    
    if (step >= steps.length) {
      clearInterval(interval);
      animationInProgress = false;
    }
  }, 2000);
  
  drawTriangleFrame(0);
}

function drawTriangleFrame(frameIndex) {
  const svg = document.getElementById('triangle-animation');
  if (!svg) return;
  
  svg.innerHTML = '';
  
  // Frame 0: Equilateral triangle
  if (frameIndex === 0) {
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', '150,50 100,150 200,150');
    poly.setAttribute('fill', 'rgba(74,144,226,0.2)');
    poly.setAttribute('stroke', '#4A90E2');
    poly.setAttribute('stroke-width', '2');
    svg.appendChild(poly);
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '250');
    text.setAttribute('y', '100');
    text.setAttribute('font-size', '16');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('fill', '#A0AEC0');
    text.textContent = 'Equilateral Triangle (60° each)';
    svg.appendChild(text);
  }
  
  // Frame 1: Right triangle
  else if (frameIndex === 1) {
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', '100,50 100,150 200,150');
    poly.setAttribute('fill', 'rgba(74,144,226,0.2)');
    poly.setAttribute('stroke', '#4A90E2');
    poly.setAttribute('stroke-width', '2');
    svg.appendChild(poly);
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '250');
    text.setAttribute('y', '100');
    text.setAttribute('font-size', '14');
    text.setAttribute('fill', '#A0AEC0');
    text.textContent = 'Right Triangle (90° at bottom-left)';
    svg.appendChild(text);
  }
  
  // Frame 2: Label right angle
  else if (frameIndex === 2) {
    drawRightTriangle(svg);
    
    // Right angle marker
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', '95');
    rect.setAttribute('y', '145');
    rect.setAttribute('width', '10');
    rect.setAttribute('height', '10');
    rect.setAttribute('fill', 'none');
    rect.setAttribute('stroke', '#E74C3C');
    rect.setAttribute('stroke-width', '2');
    svg.appendChild(rect);
    
    const angleLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    angleLabel.setAttribute('x', '80');
    angleLabel.setAttribute('y', '175');
    angleLabel.setAttribute('font-size', '12');
    angleLabel.setAttribute('fill', '#E74C3C');
    angleLabel.setAttribute('font-weight', 'bold');
    angleLabel.textContent = '90°';
    svg.appendChild(angleLabel);
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '250');
    text.setAttribute('y', '100');
    text.setAttribute('font-size', '14');
    text.setAttribute('fill', '#A0AEC0');
    text.textContent = 'Right Angle (90°)';
    svg.appendChild(text);
  }
  
  // Frame 3: Label hypotenuse
  else if (frameIndex === 3) {
    drawRightTriangle(svg);
    
    // Hypotenuse label
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '100');
    line.setAttribute('y1', '50');
    line.setAttribute('x2', '200');
    line.setAttribute('y2', '150');
    line.setAttribute('stroke', '#E74C3C');
    line.setAttribute('stroke-width', '3');
    svg.appendChild(line);
    
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', '165');
    label.setAttribute('y', '85');
    label.setAttribute('font-size', '13');
    label.setAttribute('fill', '#E74C3C');
    label.setAttribute('font-weight', 'bold');
    label.textContent = 'Hypotenuse (H)';
    svg.appendChild(label);
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '250');
    text.setAttribute('y', '100');
    text.setAttribute('font-size', '14');
    text.setAttribute('fill', '#A0AEC0');
    text.textContent = 'Hypotenuse: opposite to right angle';
    svg.appendChild(text);
  }
  
  // Frame 4+: Show all sides
  else {
    drawRightTriangleLabeled(svg);
  }
}

function drawRightTriangle(svg) {
  const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  poly.setAttribute('points', '100,50 100,150 200,150');
  poly.setAttribute('fill', 'rgba(74,144,226,0.1)');
  poly.setAttribute('stroke', '#4A90E2');
  poly.setAttribute('stroke-width', '2');
  svg.appendChild(poly);
}

function drawRightTriangleLabeled(svg) {
  const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  poly.setAttribute('points', '100,50 100,150 200,150');
  poly.setAttribute('fill', 'rgba(74,144,226,0.1)');
  poly.setAttribute('stroke', '#4A90E2');
  poly.setAttribute('stroke-width', '2');
  svg.appendChild(poly);
  
  // Hypotenuse (H) - red
  const hLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  hLine.setAttribute('x1', '100');
  hLine.setAttribute('y1', '50');
  hLine.setAttribute('x2', '200');
  hLine.setAttribute('y2', '150');
  hLine.setAttribute('stroke', '#E74C3C');
  hLine.setAttribute('stroke-width', '3');
  svg.appendChild(hLine);
  
  const hLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  hLabel.setAttribute('x', '165');
  hLabel.setAttribute('y', '80');
  hLabel.setAttribute('font-size', '12');
  hLabel.setAttribute('fill', '#E74C3C');
  hLabel.setAttribute('font-weight', 'bold');
  hLabel.textContent = 'H';
  svg.appendChild(hLabel);
  
  // Opposite (O) - green
  const oLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  oLine.setAttribute('x1', '100');
  oLine.setAttribute('y1', '50');
  oLine.setAttribute('x2', '100');
  oLine.setAttribute('y2', '150');
  oLine.setAttribute('stroke', '#27AE60');
  oLine.setAttribute('stroke-width', '3');
  svg.appendChild(oLine);
  
  const oLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  oLabel.setAttribute('x', '75');
  oLabel.setAttribute('y', '105');
  oLabel.setAttribute('font-size', '12');
  oLabel.setAttribute('fill', '#27AE60');
  oLabel.setAttribute('font-weight', 'bold');
  oLabel.textContent = 'O';
  svg.appendChild(oLabel);
  
  // Adjacent (A) - orange
  const aLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  aLine.setAttribute('x1', '100');
  aLine.setAttribute('y1', '150');
  aLine.setAttribute('x2', '200');
  aLine.setAttribute('y2', '150');
  aLine.setAttribute('stroke', '#F39C12');
  aLine.setAttribute('stroke-width', '3');
  svg.appendChild(aLine);
  
  const aLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  aLabel.setAttribute('x', '145');
  aLabel.setAttribute('y', '170');
  aLabel.setAttribute('font-size', '12');
  aLabel.setAttribute('fill', '#F39C12');
  aLabel.setAttribute('font-weight', 'bold');
  aLabel.textContent = 'A';
  svg.appendChild(aLabel);
  
  // Angle α
  const arc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  arc.setAttribute('d', 'M 130 150 A 30 30 0 0 1 110 130');
  arc.setAttribute('fill', 'none');
  arc.setAttribute('stroke', '#9B59B6');
  arc.setAttribute('stroke-width', '1.5');
  svg.appendChild(arc);
  
  const angleLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  angleLabel.setAttribute('x', '125');
  angleLabel.setAttribute('y', '140');
  angleLabel.setAttribute('font-size', '14');
  angleLabel.setAttribute('fill', '#9B59B6');
  angleLabel.setAttribute('font-weight', 'bold');
  angleLabel.textContent = 'α';
  svg.appendChild(angleLabel);
  
  const info = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  info.setAttribute('x', '250');
  info.setAttribute('y', '90');
  info.setAttribute('font-size', '12');
  info.setAttribute('fill', '#A0AEC0');
  info.textContent = 'H = Hypotenuse (red)';
  svg.appendChild(info);
  
  const info2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  info2.setAttribute('x', '250');
  info2.setAttribute('y', '110');
  info2.setAttribute('font-size', '12');
  info2.setAttribute('fill', '#A0AEC0');
  info2.textContent = 'O = Opposite (green)';
  svg.appendChild(info2);
  
  const info3 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  info3.setAttribute('x', '250');
  info3.setAttribute('y', '130');
  info3.setAttribute('font-size', '12');
  info3.setAttribute('fill', '#A0AEC0');
  info3.textContent = 'A = Adjacent (orange)';
  svg.appendChild(info3);
}

function resetTriangleAnimation() {
  const svg = document.getElementById('triangle-animation');
  if (svg) {
    svg.innerHTML = '';
  }
  animationInProgress = false;
}

// Get language from URL
const urlParams = new URLSearchParams(window.location.search);
const urlLang = urlParams.get('lang');
if (urlLang && translations[urlLang]) {
  const langBtn = document.querySelector(`[data-lang="${urlLang}"]`);
  if (langBtn) langBtn.click();
}

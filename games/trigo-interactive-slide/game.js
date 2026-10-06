/**
 * Trigonometry Interactive Slide v3
 * Fixed: Triangles drag inside circle box, form hexagon arrangement
 */

let currentSlide = 1;
let currentLanguage = 'en';
let trianglesPlaced = 0;
let animationInProgress = false;
let placedTriangles = [];

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
    slide3Text: "Drag 6 triangles inside the circle box to form a complete circle",
    dragTriangles: "Drag triangles to circle:",
    circleComplete: "✅ Perfect! 6 × 60° = 360°! That's why a circle is 360 degrees!",
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
    slide3Title: "⭕ Enam Segi Tiga = Bulatan 360°",
    slide3Text: "Seret 6 segi tiga ke dalam kotak bulatan untuk membentuk bulatan lengkap",
    dragTriangles: "Seret segi tiga ke bulatan:",
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
    slide3Title: "⭕ 六个三角形 = 360°圆",
    slide3Text: "将6个三角形拖到圆形框内以形成完整的圆",
    dragTriangles: "拖动三角形到圆：",
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
  
  document.getElementById('prev-btn').disabled = slideNum === 1;
  document.getElementById('next-btn').disabled = slideNum === 7;
}

// ===== SLIDE 3: CIRCLE FORMATION (IMPROVED DRAG-DROP) =====
function initSlide3() {
  const pool = document.getElementById('triangles-pool');
  if (pool.children.length > 1) return;
  
  trianglesPlaced = 0;
  placedTriangles = [];
  
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
  
  let isDragging = false;
  let startX, startY;
  
  svg.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    svg.classList.add('dragging');
    svg.style.position = 'fixed';
    svg.style.zIndex = '10000';
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    svg.style.left = (e.clientX - 35) + 'px';
    svg.style.top = (e.clientY - 35) + 'px';
    svg.style.width = '70px';
    svg.style.height = '70px';
  });
  
  document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    svg.classList.remove('dragging');
    
    const target = document.getElementById('circle-target');
    const targetRect = target.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Check if mouse is inside circle target
    const centerX = targetRect.left + targetRect.width / 2;
    const centerY = targetRect.top + targetRect.height / 2;
    const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
    const radius = targetRect.width / 2;
    
    if (distance < radius * 0.8) {
      // Successfully placed inside circle
      placeTriangleInCircle(svg, index);
    } else {
      // Reset position
      svg.style.position = 'static';
      svg.style.left = 'auto';
      svg.style.top = 'auto';
      svg.style.width = '70px';
      svg.style.height = '70px';
      svg.style.zIndex = 'auto';
    }
  });
  
  return svg;
}

function placeTriangleInCircle(svg, index) {
  if (placedTriangles.includes(index)) return;
  
  placedTriangles.push(index);
  trianglesPlaced++;
  
  // Calculate position in circle (hexagon arrangement)
  const angle = (trianglesPlaced - 1) * (360 / 6) * (Math.PI / 180);
  const radius = 90; // Distance from center
  const x = 140 + radius * Math.cos(angle);
  const y = 140 + radius * Math.sin(angle);
  
  // Rotate triangle to face center
  const rotation = (trianglesPlaced - 1) * (360 / 6) + 180;
  
  const placed = document.getElementById('placed-triangles');
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = x + 'px';
  container.style.top = y + 'px';
  container.style.width = '60px';
  container.style.height = '60px';
  container.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
  
  const newSvg = svg.cloneNode(true);
  newSvg.style.width = '100%';
  newSvg.style.height = '100%';
  newSvg.style.position = 'static';
  newSvg.classList.remove('dragging');
  
  container.appendChild(newSvg);
  placed.appendChild(container);
  
  // Hide original triangle
  svg.style.display = 'none';
  
  if (trianglesPlaced === 6) {
    document.getElementById('circle-feedback').style.display = 'block';
  }
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
  
  let frameNum = 0;
  const interval = setInterval(() => {
    drawAnimationFrame(frameNum);
    frameNum++;
    
    if (frameNum >= 6) {
      clearInterval(interval);
      animationInProgress = false;
    }
  }, 2000);
  
  drawAnimationFrame(0);
}

function drawAnimationFrame(frame) {
  const svg = document.getElementById('triangle-animation');
  if (!svg) return;
  
  svg.innerHTML = '';
  
  if (frame === 0) {
    // Frame 0: Equilateral triangle
    drawEquilateralTriangle(svg);
  } else if (frame === 1) {
    // Frame 1: Right triangle
    drawRightTriangle(svg);
  } else if (frame === 2) {
    // Frame 2: Label right angle
    drawRightTriangleWithRightAngle(svg);
  } else if (frame === 3) {
    // Frame 3: Label hypotenuse
    drawTriangleWithHypotenuse(svg);
  } else if (frame === 4) {
    // Frame 4: Show all labels
    drawTriangleWithAllLabels(svg);
  } else if (frame === 5) {
    // Frame 5: Complete labeled triangle
    drawCompleteTriangle(svg);
  }
}

function drawEquilateralTriangle(svg) {
  const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  poly.setAttribute('points', '150,50 100,150 200,150');
  poly.setAttribute('fill', 'rgba(74,144,226,0.2)');
  poly.setAttribute('stroke', '#4A90E2');
  poly.setAttribute('stroke-width', '2');
  svg.appendChild(poly);
  
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', '250');
  text.setAttribute('y', '100');
  text.setAttribute('font-size', '14');
  text.setAttribute('fill', '#A0AEC0');
  text.textContent = 'Equilateral Triangle (60° each)';
  svg.appendChild(text);
}

function drawRightTriangle(svg) {
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
  text.textContent = 'Transform to Right Triangle';
  svg.appendChild(text);
}

function drawRightTriangleWithRightAngle(svg) {
  drawRightTriangle(svg);
  
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', '95');
  rect.setAttribute('y', '145');
  rect.setAttribute('width', '10');
  rect.setAttribute('height', '10');
  rect.setAttribute('fill', 'none');
  rect.setAttribute('stroke', '#E74C3C');
  rect.setAttribute('stroke-width', '2');
  svg.appendChild(rect);
  
  const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  label.setAttribute('x', '75');
  label.setAttribute('y', '175');
  label.setAttribute('font-size', '12');
  label.setAttribute('fill', '#E74C3C');
  label.setAttribute('font-weight', 'bold');
  label.textContent = '90°';
  svg.appendChild(label);
  
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', '250');
  text.setAttribute('y', '100');
  text.setAttribute('font-size', '14');
  text.setAttribute('fill', '#A0AEC0');
  text.textContent = 'Label: Right Angle (90°)';
  svg.appendChild(text);
}

function drawTriangleWithHypotenuse(svg) {
  drawRightTriangleWithRightAngle(svg);
  
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
  label.setAttribute('font-size', '12');
  label.setAttribute('fill', '#E74C3C');
  label.setAttribute('font-weight', 'bold');
  label.textContent = 'H';
  svg.appendChild(label);
  
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', '250');
  text.setAttribute('y', '100');
  text.setAttribute('font-size', '14');
  text.setAttribute('fill', '#A0AEC0');
  text.textContent = 'Hypotenuse (H) - opposite to right angle';
  svg.appendChild(text);
}

function drawTriangleWithAllLabels(svg) {
  drawTriangleWithHypotenuse(svg);
  
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
}

function drawCompleteTriangle(svg) {
  drawTriangleWithAllLabels(svg);
  
  const arc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  arc.setAttribute('d', 'M 130 150 A 30 30 0 0 1 110 130');
  arc.setAttribute('fill', 'none');
  arc.setAttribute('stroke', '#9B59B6');
  arc.setAttribute('stroke-width', '1.5');
  svg.appendChild(arc);
  
  const angleLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  angleLabel.setAttribute('x', '125');
  angleLabel.setAttribute('y', '140');
  angleLabel.setAttribute('font-size', '13');
  angleLabel.setAttribute('fill', '#9B59B6');
  angleLabel.setAttribute('font-weight', 'bold');
  angleLabel.textContent = 'α';
  svg.appendChild(angleLabel);
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

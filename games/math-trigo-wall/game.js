/**
 * Trigonometry: Hole in the Wall
 * Procedural Math Engine & Arcade Game Loop (Centered Proportional Geometry & EN Default Language)
 */

// --- Game State & Configuration (Default Language: English) ---
let currentLang = 'en';
let difficulty = 2; // 1: Easy, 2: Medium, 3: Hard
let score = 0;
let streak = 0;
let maxStreak = 0;
let correctPasses = 0;
let soundEnabled = true;

// Current Question Object
let currentQuestion = null;
let userInput = '';

// Game Loop & Wall Animation Timer
let wallTimer = null;
let wallProgress = 0; // 0 (far) to 100 (crash)
let wallDuration = 60000; // milliseconds (Level 2 default: 1 min)
let remainingTimeMs = 60000;
let isGameOver = false;

// Web Audio API Synthesizer
let audioCtx = null;

// --- i18n Translations for Mini-Game ---
const gameTranslations = {
  en: {
    difficulty: "Difficulty:",
    diffEasy: "Level 1: Easy (2 Min)",
    diffMedium: "Level 2: Medium (1 Min)",
    diffHard: "Level 3: Hard (30 Sec)",
    score: "SCORE",
    streak: "STREAK",
    timeLabel: "TIME",
    formulaBtn: "Formulas",
    wallWarning: "WALL APPROACHING!",
    ansLabel: "Answer =",
    submit: "PASS! ✓",
    formulaTitle: "📐 SOH CAH TOA Formulas",
    crashTitle: "WALL CRASHED!",
    crashDesc: "You didn't match the hole parameters in time.",
    passTitle: "CLEAN PASS!",
    passDesc: "Great calculation! Your triangle fitted cleanly through the hole!",
    finalScore: "Final Score:",
    maxStreak: "Max Streak:",
    correctAnswers: "Walls Passed:",
    playAgain: "Play Again 🔄",
    findSide: "Find missing side x (round to 2 d.p. if required)",
    findAngle: "Find angle θ in degrees (°)"
  },
  bm: {
    difficulty: "Tahap:",
    diffEasy: "Tahap 1: Mudah (2 Minit)",
    diffMedium: "Tahap 2: Sederhana (1 Minit)",
    diffHard: "Tahap 3: Sukar (30 Saat)",
    score: "SKOR",
    streak: "PENETAPAN",
    timeLabel: "MASA",
    formulaBtn: "Formula",
    wallWarning: "DINGDING BERGERAK!",
    ansLabel: "Jawapan =",
    submit: "LULUS! ✓",
    formulaTitle: "📐 Formula SOH CAH TOA",
    crashTitle: "DINGDING TERLANGGAR!",
    crashDesc: "Anda tidak dapat melepasi lubang dinding tepat pada masanya.",
    passTitle: "BERJAYA MELEPASI!",
    passDesc: "Jawapan anda tepat! Segi tiga anda melepasi lubang dinding!",
    finalScore: "Skor Akhir:",
    maxStreak: "Penetapan Maksimum:",
    correctAnswers: "Dinding Dilepasi:",
    playAgain: "Main Semula 🔄",
    findSide: "Hitung panjang sisi x (2 tempat perpuluhan jika perlu)",
    findAngle: "Hitung sudut θ dalam darjah (°)"
  },
  cn: {
    difficulty: "难度级别:",
    diffEasy: "第1关：简单 (2分钟)",
    diffMedium: "第2关：中等 (1分钟)",
    diffHard: "第3关：困难 (30秒)",
    score: "得分",
    streak: "连胜",
    timeLabel: "剩余时间",
    formulaBtn: "公式表",
    wallWarning: "墙壁快速逼近中！",
    ansLabel: "计算答案 =",
    submit: "穿越！ ✓",
    formulaTitle: "📐 SOH CAH TOA 三角函数公式",
    crashTitle: "撞墙惨败！",
    crashDesc: "未能及时计算出正确尺寸，三角形无法穿过墙洞。",
    passTitle: "完美穿墙！",
    passDesc: "计算非常精确！三角形成功穿过墙壁。",
    finalScore: "最终得分:",
    maxStreak: "最高连胜:",
    correctAnswers: "成功穿越次数:",
    playAgain: "重新开始 🔄",
    findSide: "计算未知边长 x (必要时保留两位小数)",
    findAngle: "计算未知角度 θ (单位：度 °)"
  }
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  parseUrlLanguage();
  initEventListeners();
  initAudio();
  updateGameLanguage();
  startNewGame();
});

/**
 * Parse ?lang=bm|en|cn from URL search params (Default: en)
 */
function parseUrlLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang');
  if (lang && gameTranslations[lang]) {
    currentLang = lang;
  } else {
    currentLang = 'en';
  }
}

/**
 * Initialize Web Audio API
 */
function initAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (AudioContext) {
    audioCtx = new AudioContext();
  }
}

function playSound(type) {
  if (!soundEnabled || !audioCtx) return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  const now = audioCtx.currentTime;
  
  if (type === 'beep') {
    osc.frequency.setValueAtTime(440, now);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.start(now);
    osc.stop(now + 0.08);
  } else if (type === 'pass') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc.start(now);
    osc.stop(now + 0.4);
  } else if (type === 'crash') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc.start(now);
    osc.stop(now + 0.4);
  }
}

/**
 * Update UI text based on language
 */
function updateGameLanguage() {
  const dict = gameTranslations[currentLang] || gameTranslations.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
}

/**
 * Event Listeners Initialization
 */
function initEventListeners() {
  // Difficulty selector
  const diffSelect = document.getElementById('difficulty-select');
  diffSelect.addEventListener('change', (e) => {
    difficulty = parseInt(e.target.value);
    startNewGame();
  });

  // Formula Drawer toggle
  document.getElementById('toggle-formula-btn').addEventListener('click', toggleFormulaDrawer);
  document.getElementById('close-formula-btn').addEventListener('click', toggleFormulaDrawer);

  // Audio Toggle
  document.getElementById('audio-btn').addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    document.getElementById('audio-icon').textContent = soundEnabled ? '🔊' : '🔇';
  });

  // Numpad Buttons
  document.querySelectorAll('.num-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.val;
      handleNumpadInput(val);
    });
  });

  // Submit Button
  document.getElementById('submit-btn').addEventListener('click', submitAnswer);

  // Restart Button
  document.getElementById('restart-btn').addEventListener('click', () => {
    hideModal();
    startNewGame();
  });

  // Physical Keyboard Input
  window.addEventListener('keydown', (e) => {
    if (isGameOver) return;
    if (e.key >= '0' && e.key <= '9') {
      handleNumpadInput(e.key);
    } else if (e.key === '.') {
      handleNumpadInput('.');
    } else if (e.key === 'Backspace') {
      handleNumpadInput('back');
    } else if (e.key === 'Enter') {
      submitAnswer();
    }
  });
}

function toggleFormulaDrawer() {
  const drawer = document.getElementById('formula-drawer');
  drawer.classList.toggle('open');
}

/**
 * Numpad Input Handler
 */
function handleNumpadInput(val) {
  if (isGameOver) return;
  playSound('beep');
  
  if (val === 'back') {
    userInput = userInput.slice(0, -1);
  } else if (val === '.') {
    if (!userInput.includes('.')) {
      userInput += '.';
    }
  } else {
    if (userInput.length < 6) {
      userInput += val;
    }
  }

  updateInputDisplay();
}

function updateInputDisplay() {
  const display = document.getElementById('user-input-display');
  if (userInput === '') {
    display.textContent = '0';
    display.classList.add('placeholder');
  } else {
    display.textContent = userInput;
    display.classList.remove('placeholder');
  }
}

/**
 * Helper: Format Numbers cleanly (e.g. 17 or 17.5 or 17.25)
 */
function formatVal(num) {
  if (Number.isInteger(num)) return num.toString();
  return (Math.round(num * 100) / 100).toString();
}

/**
 * Procedural Math Engine Question Generator
 */
function generateQuestion() {
  const triples = [
    [3, 4, 5],
    [5, 12, 13],
    [8, 15, 17],
    [7, 24, 25],
    [9, 40, 41],
    [12, 35, 37]
  ];

  let opp, adj, hyp, angleDeg, targetType, targetAnswer;

  if (difficulty === 1) {
    // Level 1: Easy (2 minutes / 120s)
    wallDuration = 120000;
    const base = triples[Math.floor(Math.random() * triples.length)];
    const scale = Math.floor(Math.random() * 2) + 1; // 1 or 2
    opp = base[0] * scale;
    adj = base[1] * scale;
    hyp = base[2] * scale;
    angleDeg = Math.round(Math.atan2(opp, adj) * (180 / Math.PI));

    const targetIdx = Math.floor(Math.random() * 3);
    if (targetIdx === 0) {
      targetType = 'opp';
      targetAnswer = opp;
    } else if (targetIdx === 1) {
      targetType = 'adj';
      targetAnswer = adj;
    } else {
      targetType = 'hyp';
      targetAnswer = hyp;
    }
  } else if (difficulty === 2) {
    // Level 2: Medium (1 minute / 60s)
    wallDuration = 60000;
    const base = triples[Math.floor(Math.random() * triples.length)];
    const scale = parseFloat((Math.random() * 1.5 + 0.8).toFixed(1));
    opp = parseFloat((base[0] * scale).toFixed(1));
    adj = parseFloat((base[1] * scale).toFixed(1));
    hyp = parseFloat(Math.sqrt(opp * opp + adj * adj).toFixed(1));
    angleDeg = parseFloat((Math.atan2(opp, adj) * (180 / Math.PI)).toFixed(1));

    if (Math.random() < 0.4) {
      targetType = 'angle';
      targetAnswer = angleDeg;
    } else {
      const sides = ['opp', 'adj', 'hyp'];
      targetType = sides[Math.floor(Math.random() * sides.length)];
      targetAnswer = targetType === 'opp' ? opp : (targetType === 'adj' ? adj : hyp);
    }
  } else {
    // Level 3: Hard (30 seconds / 30s)
    wallDuration = 30000;
    adj = parseFloat((Math.random() * 15 + 5).toFixed(2));
    opp = parseFloat((Math.random() * 15 + 5).toFixed(2));
    hyp = parseFloat(Math.sqrt(opp * opp + adj * adj).toFixed(2));
    angleDeg = parseFloat((Math.atan2(opp, adj) * (180 / Math.PI)).toFixed(2));

    if (Math.random() < 0.5) {
      targetType = 'angle';
      targetAnswer = angleDeg;
    } else {
      const sides = ['opp', 'adj', 'hyp'];
      targetType = sides[Math.floor(Math.random() * sides.length)];
      targetAnswer = targetType === 'opp' ? opp : (targetType === 'adj' ? adj : hyp);
    }
  }

  currentQuestion = {
    opp,
    adj,
    hyp,
    angleDeg,
    targetType,
    targetAnswer
  };

  renderQuestionUI();
}

/**
 * Render Question UI & Dynamic Proportional Centered SVG Right-Triangle
 */
function renderQuestionUI() {
  const dict = gameTranslations[currentLang] || gameTranslations.en;
  const qText = document.getElementById('question-text');
  
  if (currentQuestion.targetType === 'angle') {
    qText.textContent = dict.findAngle;
  } else {
    qText.textContent = dict.findSide;
  }

  const svg = document.getElementById('triangle-svg');
  svg.innerHTML = ''; // Clear SVG

  // --- Dynamic Proportional Centered Geometry Calculation ---
  // ViewBox: 0 0 480 270
  const maxW = 210; // Max horizontal base width
  const maxH = 155; // Max vertical height
  const minW = 85;  // Min base width
  const minH = 50;  // Min height

  const oppVal = currentQuestion.opp;
  const adjVal = currentQuestion.adj;
  const ratio = oppVal / adjVal; // aspect ratio = Opp / Adj

  let W, H;
  if (ratio > 1) {
    // Tall triangle (Opp > Adj)
    H = maxH;
    W = Math.max(minW, Math.min(maxW, maxH / ratio));
  } else {
    // Wide or balanced triangle (Opp <= Adj)
    W = maxW;
    H = Math.max(minH, Math.min(maxH, maxW * ratio));
  }

  // Calculate centered X position for vertex V1:
  // Offset center to account for left theta label (~40px) vs right opp label (~80px)
  const calcCenterX = 230 - W / 2;
  const x1 = Math.max(75, Math.min(175, calcCenterX));
  const y1 = 220;
  const x2 = x1 + W; // Bottom-Right vertex
  const y2 = y1;
  const x3 = x2;     // Top-Right vertex
  const y3 = y1 - H;

  // 1. Draw Triangle Polygon Path
  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
  polygon.setAttribute('class', 'triangle-path');
  svg.appendChild(polygon);

  // 2. Right-angle square indicator at (x2, y2)
  const sqSize = Math.min(18, Math.min(W * 0.2, H * 0.2));
  const raSquare = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  raSquare.setAttribute('d', `M ${x2 - sqSize} ${y2} L ${x2 - sqSize} ${y2 - sqSize} L ${x2} ${y2 - sqSize}`);
  raSquare.setAttribute('class', 'right-angle-square');
  svg.appendChild(raSquare);

  // 3. Theta Angle Arc & Label at vertex V1 (x1, y1)
  const thetaRad = Math.atan2(H, W); // acute angle in radians
  const arcR = Math.min(32, Math.min(W * 0.35, H * 0.35)); // dynamic arc radius
  const arcEndX = x1 + arcR * Math.cos(thetaRad);
  const arcEndY = y1 - arcR * Math.sin(thetaRad);

  const arc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  arc.setAttribute('d', `M ${x1 + arcR} ${y1} A ${arcR} ${arcR} 0 0 0 ${arcEndX} ${arcEndY}`);
  arc.setAttribute('class', 'angle-arc');
  svg.appendChild(arc);

  // Theta Angle Label positioned on angle bisector outside arc
  const bisectorAngle = thetaRad / 2;
  const labelDist = arcR + 24;
  const thetaLabelX = x1 + labelDist * Math.cos(bisectorAngle);
  const thetaLabelY = y1 - labelDist * Math.sin(bisectorAngle) + 5;

  const angleLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  angleLabel.setAttribute('x', thetaLabelX);
  angleLabel.setAttribute('y', thetaLabelY);
  angleLabel.setAttribute('text-anchor', 'start');
  angleLabel.setAttribute('class', currentQuestion.targetType === 'angle' ? 'svg-label svg-label-unknown' : 'svg-label');
  angleLabel.textContent = currentQuestion.targetType === 'angle' ? 'θ = ?' : `θ = ${formatVal(currentQuestion.angleDeg)}°`;
  svg.appendChild(angleLabel);

  // 4. Side Labels
  // Adjacent Label (Bottom side)
  const adjText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  adjText.setAttribute('x', x1 + W / 2);
  adjText.setAttribute('y', y1 + 30);
  adjText.setAttribute('text-anchor', 'middle');
  adjText.setAttribute('class', currentQuestion.targetType === 'adj' ? 'svg-label svg-label-unknown' : 'svg-label');
  adjText.textContent = currentQuestion.targetType === 'adj' ? 'x = ?' : `Adj = ${formatVal(currentQuestion.adj)}`;
  svg.appendChild(adjText);

  // Opposite Label (Right vertical side - positioned at x2 + 14 with text-anchor="start")
  const oppText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  oppText.setAttribute('x', x2 + 14);
  oppText.setAttribute('y', y1 - H / 2 + 5);
  oppText.setAttribute('text-anchor', 'start');
  oppText.setAttribute('class', currentQuestion.targetType === 'opp' ? 'svg-label svg-label-unknown' : 'svg-label');
  oppText.textContent = currentQuestion.targetType === 'opp' ? 'x = ?' : `Opp = ${formatVal(currentQuestion.opp)}`;
  svg.appendChild(oppText);

  // Hypotenuse Label (Slanted side - offset perpendicular to hypotenuse)
  const hypMidX = x1 + W / 2;
  const hypMidY = y1 - H / 2;
  const hypLen = Math.sqrt(W * W + H * H);
  const nx = -H / hypLen;
  const ny = -W / hypLen;
  const hypTextX = hypMidX + nx * 18;
  const hypTextY = hypMidY + ny * 18;

  const hypText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  hypText.setAttribute('x', hypTextX);
  hypText.setAttribute('y', hypTextY);
  hypText.setAttribute('text-anchor', 'middle');
  hypText.setAttribute('class', currentQuestion.targetType === 'hyp' ? 'svg-label svg-label-unknown' : 'svg-label');
  hypText.textContent = currentQuestion.targetType === 'hyp' ? 'x = ?' : `Hyp = ${formatVal(currentQuestion.hyp)}`;
  svg.appendChild(hypText);

  // Render SVG Cutout Hole preview on wall matching W & H proportions!
  renderWallHoleSVG(W, H);
}

/**
 * Render Cutout Triangle Hole on Approaching Wall matching dynamic W & H proportions
 */
function renderWallHoleSVG(triW = 180, triH = 120) {
  const wallSvg = document.getElementById('wall-hole-svg');
  wallSvg.innerHTML = '';

  const maxHoleW = 150;
  const maxHoleH = 100;
  const holeRatio = triH / triW;

  let holeW, holeH;
  if (holeRatio > 1) {
    holeH = maxHoleH;
    holeW = Math.max(35, Math.min(maxHoleW, maxHoleH / holeRatio));
  } else {
    holeW = maxHoleW;
    holeH = Math.max(30, Math.min(maxHoleH, maxHoleW * holeRatio));
  }

  const hx1 = 35;
  const hy1 = 125;
  const hx2 = hx1 + holeW;
  const hy2 = hy1;
  const hx3 = hx2;
  const hy3 = hy1 - holeH;

  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute('points', `${hx1},${hy1} ${hx2},${hy2} ${hx3},${hy3}`);
  polygon.setAttribute('fill', '#070913'); // Black cutout hole
  polygon.setAttribute('stroke', '#00f2fe');
  polygon.setAttribute('stroke-width', '3.5');
  wallSvg.appendChild(polygon);
}

/**
 * Game Loop & Wall Animation
 */
function startNewGame() {
  score = 0;
  streak = 0;
  correctPasses = 0;
  isGameOver = false;

  updateHUDDisplay();
  nextQuestion();
}

function nextQuestion() {
  if (isGameOver) return;
  userInput = '';
  updateInputDisplay();
  generateQuestion();
  resetWallAnimation();
}

function resetWallAnimation() {
  clearInterval(wallTimer);
  wallProgress = 0;
  const wall = document.getElementById('approaching-wall');
  const timerBar = document.getElementById('timer-bar');
  const distTag = document.getElementById('wall-distance-tag');
  
  wall.className = 'wall-3d';
  
  const startTime = Date.now();

  wallTimer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    remainingTimeMs = Math.max(0, wallDuration - elapsed);
    wallProgress = (elapsed / wallDuration) * 100;

    // Update Digital Timer Display (MM:SS)
    updateDigitalTimer(remainingTimeMs);

    // Update Distance Indicator (e.g. 100m -> 0m)
    const distanceMeters = Math.max(0, Math.round((1 - wallProgress / 100) * 100));
    if (distTag) {
      distTag.textContent = `DISTANCE: ${distanceMeters}m`;
    }

    if (wallProgress >= 100) {
      clearInterval(wallTimer);
      triggerWallCrash();
    } else {
      // 3D Perspective Scaling: Continuous movement from Z=-900px (scale 0.15) to Z=0 (scale 1.0)
      const currentZ = -900 + (wallProgress / 100) * 900;
      const currentScale = 0.15 + (wallProgress / 100) * 0.85;
      const currentOpacity = 0.4 + (wallProgress / 100) * 0.6;

      wall.style.transform = `translateZ(${currentZ}px) scale(${currentScale})`;
      wall.style.opacity = currentOpacity;
      timerBar.style.width = `${100 - wallProgress}%`;
    }
  }, 50);
}

/**
 * Update Digital Clock Display (MM:SS)
 */
function updateDigitalTimer(timeMs) {
  const totalSeconds = Math.ceil(timeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  const timerElem = document.getElementById('digital-timer-display');
  if (timerElem) {
    timerElem.textContent = formattedStr;
  }
}

/**
 * Answer Submission & Verification
 */
function submitAnswer() {
  if (isGameOver || userInput === '') return;
  
  const userVal = parseFloat(userInput);
  const correctVal = currentQuestion.targetAnswer;

  // Tolerance check (exact integer match or within +-0.15)
  const isCorrect = Math.abs(userVal - correctVal) <= 0.15;

  if (isCorrect) {
    triggerWallPass();
  } else {
    triggerWallCrash();
  }
}

/**
 * Successful Wall Pass Event
 */
function triggerWallPass() {
  clearInterval(wallTimer);
  playSound('pass');

  streak++;
  if (streak > maxStreak) maxStreak = streak;
  correctPasses++;
  
  const speedBonus = Math.round((100 - wallProgress) * 5);
  const points = 100 * difficulty + speedBonus + (streak * 20);
  score += points;

  updateHUDDisplay();

  const wall = document.getElementById('approaching-wall');
  wall.className = 'wall-3d passed';

  setTimeout(() => {
    nextQuestion();
  }, 600);
}

/**
 * Wall Crash Event (Game Over)
 */
function triggerWallCrash() {
  clearInterval(wallTimer);
  isGameOver = true;
  playSound('crash');

  const wall = document.getElementById('approaching-wall');
  wall.className = 'wall-3d crashed';

  setTimeout(() => {
    showGameOverModal();
  }, 600);
}

function updateHUDDisplay() {
  document.getElementById('score-display').textContent = score;
  document.getElementById('streak-display').textContent = `🔥 ${streak}`;
}

/**
 * Game Over Modal Display
 */
function showGameOverModal() {
  const modal = document.getElementById('game-over-modal');
  document.getElementById('final-score-val').textContent = score;
  document.getElementById('max-streak-val').textContent = maxStreak;
  document.getElementById('passes-val').textContent = correctPasses;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function hideModal() {
  const modal = document.getElementById('game-over-modal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
}

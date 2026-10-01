/**
 * Trigonometry: Hole in the Wall
 * Procedural Math Engine & Arcade Game Loop
 */

// --- Game State & Configuration ---
let currentLang = 'bm';
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
let wallDuration = 12000; // milliseconds
let isGameOver = false;

// Web Audio API Synthesizer
let audioCtx = null;

// --- i18n Translations for Mini-Game ---
const gameTranslations = {
  bm: {
    difficulty: "Tahap:",
    diffEasy: "Tahap 1: Mudah (Teorem Pythagoras)",
    diffMedium: "Tahap 2: Sederhana (Nisbah Trigo)",
    diffHard: "Tahap 3: Sukar (Perpuluhan)",
    score: "SKOR",
    streak: "PENETAPAN",
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
  en: {
    difficulty: "Difficulty:",
    diffEasy: "Level 1: Easy (Pythagoras)",
    diffMedium: "Level 2: Medium (Trigo Ratios)",
    diffHard: "Level 3: Hard (Decimals)",
    score: "SCORE",
    streak: "STREAK",
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
  cn: {
    difficulty: "难度级别:",
    diffEasy: "第1关：简单 (勾股定理 / Pythagoras)",
    diffMedium: "第2关：中等 (三角比 SOH CAH TOA)",
    diffHard: "第3关：困难 (小数与弧度计算)",
    score: "得分",
    streak: "连胜",
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
 * Parse ?lang=bm|en|cn from URL search params
 */
function parseUrlLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang');
  if (lang && gameTranslations[lang]) {
    currentLang = lang;
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
  const dict = gameTranslations[currentLang] || gameTranslations.bm;
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
 * Procedural Math Engine Question Generator
 */
function generateQuestion() {
  // Common Pythagorean Triples
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
    // Easy: Pythagorean triples (whole numbers)
    const base = triples[Math.floor(Math.random() * triples.length)];
    const scale = Math.floor(Math.random() * 2) + 1; // 1 or 2
    opp = base[0] * scale;
    adj = base[1] * scale;
    hyp = base[2] * scale;
    angleDeg = Math.round(Math.atan2(opp, adj) * (180 / Math.PI));

    // Choose target to solve: 0 (opp), 1 (adj), 2 (hyp)
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
    wallDuration = 16000;
  } else if (difficulty === 2) {
    // Medium: SOH CAH TOA (side or angle)
    const base = triples[Math.floor(Math.random() * triples.length)];
    const scale = (Math.random() * 1.5 + 0.8).toFixed(1);
    opp = parseFloat((base[0] * scale).toFixed(1));
    adj = parseFloat((base[1] * scale).toFixed(1));
    hyp = parseFloat(Math.sqrt(opp * opp + adj * adj).toFixed(1));
    angleDeg = parseFloat((Math.atan2(opp, adj) * (180 / Math.PI)).toFixed(1));

    // Random choice: find angle (40% chance) or side (60% chance)
    if (Math.random() < 0.4) {
      targetType = 'angle';
      targetAnswer = angleDeg;
    } else {
      const sides = ['opp', 'adj', 'hyp'];
      targetType = sides[Math.floor(Math.random() * sides.length)];
      targetAnswer = targetType === 'opp' ? opp : (targetType === 'adj' ? adj : hyp);
    }
    wallDuration = 11000;
  } else {
    // Hard: Random decimal numbers
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
    wallDuration = 8000;
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
 * Render Question UI & SVG Right-Triangle
 */
function renderQuestionUI() {
  const dict = gameTranslations[currentLang] || gameTranslations.bm;
  const qText = document.getElementById('question-text');
  
  if (currentQuestion.targetType === 'angle') {
    qText.textContent = dict.findAngle;
  } else {
    qText.textContent = dict.findSide;
  }

  // Draw Interactive SVG Right Triangle
  const svg = document.getElementById('triangle-svg');
  svg.innerHTML = ''; // Clear SVG

  // Coordinates: Bottom-Left (X1, Y1), Bottom-Right (X2, Y2), Top-Right (X3, Y3)
  const x1 = 40, y1 = 180;
  const x2 = 250, y2 = 180;
  const x3 = 250, y3 = 50;

  // 1. Triangle Path
  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
  polygon.setAttribute('class', 'triangle-path');
  svg.appendChild(polygon);

  // 2. Right-angle square indicator at (X2, Y2)
  const raSquare = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  raSquare.setAttribute('d', `M ${x2 - 18} ${y2} L ${x2 - 18} ${y2 - 18} L ${x2} ${y2 - 18}`);
  raSquare.setAttribute('class', 'right-angle-square');
  svg.appendChild(raSquare);

  // 3. Theta Angle Arc at vertex (X1, Y1)
  const arc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  arc.setAttribute('d', `M ${x1 + 35} ${y1} A 35 35 0 0 0 ${x1 + 30} ${y1 - 18}`);
  arc.setAttribute('class', 'angle-arc');
  svg.appendChild(arc);

  // Theta Angle Text Label
  const angleLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  angleLabel.setAttribute('x', x1 + 45);
  angleLabel.setAttribute('y', y1 - 10);
  angleLabel.setAttribute('class', currentQuestion.targetType === 'angle' ? 'svg-label svg-label-unknown' : 'svg-label');
  angleLabel.textContent = currentQuestion.targetType === 'angle' ? 'θ = ?' : `θ = ${currentQuestion.angleDeg}°`;
  svg.appendChild(angleLabel);

  // 4. Side Labels
  // Adjacent (Bottom side)
  const adjText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  adjText.setAttribute('x', (x1 + x2) / 2);
  adjText.setAttribute('y', y1 + 25);
  adjText.setAttribute('class', currentQuestion.targetType === 'adj' ? 'svg-label svg-label-unknown' : 'svg-label');
  adjText.textContent = currentQuestion.targetType === 'adj' ? 'x = ?' : `Adj = ${currentQuestion.adj}`;
  svg.appendChild(adjText);

  // Opposite (Right vertical side)
  const oppText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  oppText.setAttribute('x', x2 + 35);
  oppText.setAttribute('y', (y2 + y3) / 2);
  oppText.setAttribute('class', currentQuestion.targetType === 'opp' ? 'svg-label svg-label-unknown' : 'svg-label');
  oppText.textContent = currentQuestion.targetType === 'opp' ? 'x = ?' : `Opp = ${currentQuestion.opp}`;
  svg.appendChild(oppText);

  // Hypotenuse (Slanted side)
  const hypText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  hypText.setAttribute('x', (x1 + x3) / 2 - 25);
  hypText.setAttribute('y', (y1 + y3) / 2 - 12);
  hypText.setAttribute('class', currentQuestion.targetType === 'hyp' ? 'svg-label svg-label-unknown' : 'svg-label');
  hypText.textContent = currentQuestion.targetType === 'hyp' ? 'x = ?' : `Hyp = ${currentQuestion.hyp}`;
  svg.appendChild(hypText);

  // Render SVG Cutout Hole preview on wall
  renderWallHoleSVG();
}

/**
 * Render Cutout Triangle Hole on Approaching Wall
 */
function renderWallHoleSVG() {
  const wallSvg = document.getElementById('wall-hole-svg');
  wallSvg.innerHTML = '';

  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute('points', '30,130 170,130 170,30');
  polygon.setAttribute('fill', '#070913'); // Black hole
  polygon.setAttribute('stroke', '#00f2fe');
  polygon.setAttribute('stroke-width', '4');
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
  
  wall.className = 'wall-3d';
  
  const startTime = Date.now();

  wallTimer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    wallProgress = (elapsed / wallDuration) * 100;

    if (wallProgress >= 100) {
      clearInterval(wallTimer);
      triggerWallCrash();
    } else {
      // Scale wall 3D depth from Z=-800px (scale 0.1) to Z=0 (scale 1)
      const currentZ = -800 + (wallProgress / 100) * 800;
      const currentScale = 0.1 + (wallProgress / 100) * 0.9;
      const currentOpacity = 0.3 + (wallProgress / 100) * 0.7;

      wall.style.transform = `translateZ(${currentZ}px) scale(${currentScale})`;
      wall.style.opacity = currentOpacity;
      timerBar.style.width = `${100 - wallProgress}%`;
    }
  }, 30);
}

/**
 * Answer Submission & Verification
 */
function submitAnswer() {
  if (isGameOver || userInput === '') return;
  
  const userVal = parseFloat(userInput);
  const correctVal = currentQuestion.targetAnswer;

  // Tolerance check (exact integer match or within +-0.1)
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

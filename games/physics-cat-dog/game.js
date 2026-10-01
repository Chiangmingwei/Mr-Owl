/**
 * Physics: Cat vs Dog - Projectile Battle
 * Procedural SPM Physics Engine, 1P Timed/Practice Modes & 2P Simultaneous Fair Battle Loop
 */

// --- Game State & Configuration ---
let currentLang = 'en';
let gameMode = 'single'; // 'single' (1P vs AI) or 'pvp' (2P Q vs P)
let difficultyTimer = 'infinite'; // 'infinite', '180', '120', '60'

let activeAnsweringPlayer = null; // null, 'cat', or 'dog'
let activeTimer = null;
let activeTimeRemaining = 0;

let audioCtx = null;
let soundEnabled = true;

// Player Stats & State Machine
const fighters = {
  cat: {
    name: 'Felix the Cat',
    hp: 100,
    maxHp: 100,
    streak: 0,
    x: 100,
    y: 320,
    state: 'idle', // 'idle', 'answering', 'animating', 'cooldown'
    cooldownTimer: null,
    cooldownSec: 0,
    question: null,
    isFrozen: false,
    doubleDamage: false
  },
  dog: {
    name: 'Buster the Dog',
    hp: 100,
    maxHp: 100,
    streak: 0,
    x: 860,
    y: 320,
    state: 'idle',
    cooldownTimer: null,
    cooldownSec: 0,
    question: null,
    isFrozen: false,
    doubleDamage: false
  }
};

let userInput = '';
let roundsPlayed = 0;

// Canvas & Animation Context
let canvas, ctx;
let activeProjectile = null;
let particles = [];
let floatingTexts = [];

// --- i18n Translations ---
const gameTranslations = {
  en: {
    modeLabel: "Mode:",
    modeSingle: "1 Player vs Computer AI",
    modePvp: "2 Player Battle (Q vs P)",
    diffLabel: "Timer:",
    diffPractice: "Unlimited Time (Practice)",
    diffEasy: "Easy (3 Min)",
    diffMedium: "Medium (2 Min)",
    diffHard: "Hard (1 Min)",
    currentTurn: "STATUS:",
    timeLabel: "TIME:",
    formulaBtn: "SPM Formulas",
    catName: "Felix the Cat",
    dogName: "Buster the Dog",
    ansLabel: "Answer =",
    launchBtn: "LAUNCH SHOT! 🚀",
    formulaTitle: "🧪 SPM Projectile Motion Formulas",
    playAgain: "Play Again 🔄"
  },
  bm: {
    modeLabel: "Mod:",
    modeSingle: "1 Pemain vs Komputer AI",
    modePvp: "2 Pemain Pertandingan (Q vs P)",
    diffLabel: "Masa:",
    diffPractice: "Masa Tanpa Had (Latihan)",
    diffEasy: "Mudah (3 Minit)",
    diffMedium: "Sederhana (2 Minit)",
    diffHard: "Sukar (1 Minit)",
    currentTurn: "STATUS:",
    timeLabel: "MASA:",
    formulaBtn: "Formula SPM",
    catName: "Felix si Kucing",
    dogName: "Buster si Anjing",
    ansLabel: "Jawapan =",
    launchBtn: "LANCARKAN! 🚀",
    formulaTitle: "🧪 Formula Gerakan Projektil SPM",
    playAgain: "Main Semula 🔄"
  },
  cn: {
    modeLabel: "模式:",
    modeSingle: "1人对战电脑 (AI)",
    modePvp: "2人双人对战 (Q / P 抢答)",
    diffLabel: "答题时间:",
    diffPractice: "不限时间 (练习模式)",
    diffEasy: "简单 (3分钟)",
    diffMedium: "中等 (2分钟)",
    diffHard: "困难 (1分钟)",
    currentTurn: "状态:",
    timeLabel: "剩余时间:",
    formulaBtn: "SPM物理公式表",
    catName: "小猫 Felix",
    dogName: "小狗 Buster",
    ansLabel: "计算答案 =",
    launchBtn: "发射炮弹！ 🚀",
    formulaTitle: "🧪 SPM 平抛与斜抛运动公式",
    playAgain: "重新开始 🔄"
  }
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  parseUrlLanguage();
  initCanvas();
  initEventListeners();
  initAudio();
  updateGameLanguage();
  startNewBattle();
});

function parseUrlLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang');
  if (lang && gameTranslations[lang]) {
    currentLang = lang;
  }
}

function initCanvas() {
  canvas = document.getElementById('battle-canvas');
  ctx = canvas.getContext('2d');
  requestAnimationFrame(gameCanvasLoop);
}

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
  } else if (type === 'hit') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'heal') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.setValueAtTime(880, now + 0.15); // A5
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc.start(now);
    osc.stop(now + 0.35);
  }
}

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
 * Event Listeners
 */
function initEventListeners() {
  // Mode Selector
  document.getElementById('mode-select').addEventListener('change', (e) => {
    gameMode = e.target.value;
    const diffContainer = document.getElementById('diff-selector-container');
    if (gameMode === 'pvp') {
      diffContainer.style.display = 'none';
    } else {
      diffContainer.style.display = 'flex';
    }
    startNewBattle();
  });

  // Difficulty Timer Selector (1P Mode)
  document.getElementById('difficulty-select').addEventListener('change', (e) => {
    difficultyTimer = e.target.value;
    startNewBattle();
  });

  // Formula Drawer
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
      if (!activeAnsweringPlayer) return;
      const val = btn.dataset.val;
      handleNumpadInput(val);
    });
  });

  // Submit Button
  document.getElementById('submit-btn').addEventListener('click', submitAnswer);

  // Restart Button
  document.getElementById('restart-btn').addEventListener('click', () => {
    hideGameOverModal();
    startNewBattle();
  });

  // Powerup Buttons
  document.querySelectorAll('.powerup-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const fighterRole = e.target.dataset.fighter;
      const type = e.target.dataset.type;
      activatePowerup(fighterRole, type);
    });
  });

  // Keyboard Hotkeys
  window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    if (gameMode === 'pvp') {
      if (key === 'q' && canPlayerAnswer('cat')) {
        startAnsweringSession('cat');
      } else if (key === 'p' && canPlayerAnswer('dog')) {
        startAnsweringSession('dog');
      }
    } else if (gameMode === 'single' && activeAnsweringPlayer === 'cat') {
      // 1P Mode Hotkey or keyboard input
    }

    if (activeAnsweringPlayer) {
      if (key >= '0' && key <= '9') {
        handleNumpadInput(key);
      } else if (key === '.') {
        handleNumpadInput('.');
      } else if (key === 'backspace') {
        handleNumpadInput('back');
      } else if (key === 'enter') {
        submitAnswer();
      }
    }
  });
}

function toggleFormulaDrawer() {
  const drawer = document.getElementById('formula-drawer');
  drawer.classList.toggle('open');
}

function handleNumpadInput(val) {
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
 * Start New Battle Game
 */
function startNewBattle() {
  clearInterval(activeTimer);
  clearInterval(fighters.cat.cooldownTimer);
  clearInterval(fighters.dog.cooldownTimer);

  fighters.cat.hp = 100;
  fighters.dog.hp = 100;
  fighters.cat.streak = 0;
  fighters.dog.streak = 0;
  fighters.cat.state = 'idle';
  fighters.dog.state = 'idle';
  fighters.cat.isFrozen = false;
  fighters.dog.isFrozen = false;
  fighters.cat.doubleDamage = false;
  fighters.dog.doubleDamage = false;

  activeAnsweringPlayer = null;
  roundsPlayed = 0;
  userInput = '';
  updateInputDisplay();

  updateHealthBars();
  updateStreakDisplay();

  const dogCard = document.getElementById('dog-q-card');
  const banner = document.getElementById('hotkey-banner');
  const activeLabel = document.getElementById('active-player-label');

  if (gameMode === 'single') {
    dogCard.classList.add('hidden');
    banner.classList.add('hidden');
    activeLabel.textContent = "Cat Answer =";
    start1PModeTurn();
  } else {
    dogCard.classList.remove('hidden');
    banner.classList.remove('hidden');
    activeLabel.textContent = "Answer =";
    start2PModeBattle();
  }
}

/**
 * --- 1-PLAYER MODE LOGIC (vs AI) ---
 */
function start1PModeTurn() {
  if (fighters.cat.hp <= 0 || fighters.dog.hp <= 0) return;

  fighters.cat.question = generateSpmQuestion('Felix the Cat 🐱');
  renderQuestionCard('cat', fighters.cat.question);

  startAnsweringSession('cat');
}

/**
 * --- 2-PLAYER MODE LOGIC (Simultaneous Dual Questions & 10s Fairness Window) ---
 */
function start2PModeBattle() {
  // Generate initial questions for both Cat and Dog simultaneously!
  if (!fighters.cat.question) {
    fighters.cat.question = generateSpmQuestion('Felix the Cat 🐱');
    renderQuestionCard('cat', fighters.cat.question);
  }
  if (!fighters.dog.question) {
    fighters.dog.question = generateSpmQuestion('Buster the Dog 🐶');
    renderQuestionCard('dog', fighters.dog.question);
  }

  update2PStatusHUD();
}

function canPlayerAnswer(playerRole) {
  const f = fighters[playerRole];
  if (activeAnsweringPlayer !== null) return false; // Another player is currently typing
  if (f.state === 'animating' || f.isFrozen) return false;
  return true;
}

function startAnsweringSession(playerRole) {
  const f = fighters[playerRole];
  if (f.isFrozen) return;

  activeAnsweringPlayer = playerRole;
  f.state = 'answering';
  userInput = '';
  updateInputDisplay();

  const activeLabel = document.getElementById('active-player-label');
  activeLabel.textContent = playerRole === 'cat' ? "Cat Answer =" : "Dog Answer =";

  // Highlight active question card
  document.getElementById('cat-q-card').classList.toggle('active-answering', playerRole === 'cat');
  document.getElementById('dog-q-card').classList.toggle('active-answering', playerRole === 'dog');

  // Start Timer
  clearInterval(activeTimer);
  const timerElem = document.getElementById('shot-timer');

  if (gameMode === 'single') {
    if (difficultyTimer === 'infinite') {
      timerElem.textContent = '∞';
    } else {
      activeTimeRemaining = parseInt(difficultyTimer);
      timerElem.textContent = `${activeTimeRemaining}s`;

      activeTimer = setInterval(() => {
        activeTimeRemaining--;
        timerElem.textContent = `${activeTimeRemaining}s`;

        if (activeTimeRemaining <= 0) {
          clearInterval(activeTimer);
          submitAnswer(); // Timeout shot execution
        }
      }, 1000);
    }
  } else {
    // 2-Player Mode: 30-Second Answer Timer
    activeTimeRemaining = 30;
    timerElem.textContent = '30s';

    activeTimer = setInterval(() => {
      activeTimeRemaining--;
      timerElem.textContent = `${activeTimeRemaining}s`;

      if (activeTimeRemaining <= 0) {
        clearInterval(activeTimer);
        submitAnswer(); // Timeout shot execution
      }
    }, 1000);
  }
}

/**
 * Submit Answer
 */
function submitAnswer() {
  if (!activeAnsweringPlayer) return;
  clearInterval(activeTimer);

  const shooterRole = activeAnsweringPlayer;
  const shooter = fighters[shooterRole];
  const q = shooter.question;

  const userVal = parseFloat(userInput);
  const correctVal = q.targetAns;
  const isCorrect = userInput !== '' && Math.abs(userVal - correctVal) <= 0.25;

  activeAnsweringPlayer = null;
  document.getElementById('cat-q-card').classList.remove('active-answering');
  document.getElementById('dog-q-card').classList.remove('active-answering');

  executeBallisticShot(shooterRole, isCorrect);
}

/**
 * Execute Ballistic Shot Animation & Apply Damage
 */
function executeBallisticShot(shooterRole, isHit) {
  const shooter = fighters[shooterRole];
  const targetRole = shooterRole === 'cat' ? 'dog' : 'cat';
  const target = fighters[targetRole];

  shooter.state = 'animating';
  const itemEmoji = shooterRole === 'cat' ? '🥫' : '🦴';
  const startX = shooter.x;
  const startY = shooter.y - 20;

  let endX = target.x;
  let endY = target.y - 20;

  if (!isHit) {
    endX = Math.random() < 0.5 ? target.x - 140 : target.x + 120;
  }

  activeProjectile = {
    shooterRole,
    targetRole,
    startX,
    startY,
    endX,
    endY,
    progress: 0,
    itemEmoji,
    isHit
  };
}

/**
 * On Shot Impact Event
 */
function handleShotImpact(proj) {
  const shooter = fighters[proj.shooterRole];
  const target = fighters[proj.targetRole];

  if (proj.isHit) {
    playSound('hit');

    let damage = 25;
    if (shooter.doubleDamage) {
      damage = 50;
      shooter.doubleDamage = false;
    }

    target.hp = Math.max(0, target.hp - damage);
    shooter.streak++;

    addExplosionParticles(proj.endX, proj.endY);
    addFloatingText(proj.endX, proj.endY - 30, `-${damage} HP!`, '#ff0844');

    if (shooter.streak >= 3) {
      addFloatingText(shooter.x, shooter.y - 50, '3 STREAK! POWERUPS UNLOCKED ⚡', '#ffea00');
    }
  } else {
    shooter.streak = 0;
    addFloatingText(proj.endX, proj.endY - 20, 'MISSED!', '#94a3b8');
  }

  updateHealthBars();
  updateStreakDisplay();
  updatePowerupButtons();

  // Check Game Over Condition
  if (target.hp <= 0) {
    setTimeout(() => {
      showGameOverModal(proj.shooterRole);
    }, 1000);
    return;
  }

  // Handle Post-Shot Transitions
  if (gameMode === 'single') {
    if (proj.shooterRole === 'cat') {
      // AI Turn next
      setTimeout(() => {
        simulateAiTurn();
      }, 1200);
    } else {
      // Back to Cat turn in 1P mode
      setTimeout(() => {
        start1PModeTurn();
      }, 1200);
    }
  } else {
    // 2-Player Fairness 10-Second Transition Window Logic!
    start2PPostShotTransition(proj.shooterRole);
  }
}

/**
 * 2-Player Mode 10-Second Fairness Transition Window Logic
 */
function start2PPostShotTransition(shooterRole) {
  const shooter = fighters[shooterRole];
  const opponentRole = shooterRole === 'cat' ? 'dog' : 'cat';
  const opponent = fighters[opponentRole];

  shooter.state = 'cooldown';
  shooter.question = null; // Clear spent question
  renderQuestionCard(shooterRole, null); // Show "Next Question in 10s..."

  let cooldownSec = 10;
  clearInterval(shooter.cooldownTimer);

  shooter.cooldownTimer = setInterval(() => {
    cooldownSec--;

    // If opponent is currently typing/answering, wait for opponent to finish!
    if (activeAnsweringPlayer === opponentRole || opponent.state === 'animating') {
      // Hold cooldown until opponent finishes
      return;
    }

    if (cooldownSec <= 0) {
      clearInterval(shooter.cooldownTimer);
      shooter.state = 'idle';
      shooter.question = generateSpmQuestion(shooterRole === 'cat' ? 'Felix the Cat 🐱' : 'Buster the Dog 🐶');
      renderQuestionCard(shooterRole, shooter.question);
      update2PStatusHUD();
    }
  }, 1000);

  update2PStatusHUD();
}

/**
 * AI Turn Simulation (1P Mode)
 */
function simulateAiTurn() {
  if (fighters.cat.hp <= 0 || fighters.dog.hp <= 0) return;

  const isHit = Math.random() < 0.75; // AI 75% accuracy
  executeBallisticShot('dog', isHit);
}

/**
 * Render SPM Question Cards
 */
function renderQuestionCard(role, qObj) {
  const cardElem = document.getElementById(`${role}-q-card`);
  const textElem = document.getElementById(`${role}-question-text`);

  if (!qObj) {
    textElem.textContent = "⌛ Shot completed! Preparing next SPM question in 10 seconds...";
    cardElem.classList.add('cooldown');
  } else {
    textElem.textContent = qObj.text;
    cardElem.classList.remove('cooldown');
  }
}

function update2PStatusHUD() {
  const turnIndicator = document.getElementById('turn-indicator');
  if (activeAnsweringPlayer === 'cat') {
    turnIndicator.textContent = '🐱 CAT ANSWERING...';
    turnIndicator.className = 'hud-value cat-turn';
  } else if (activeAnsweringPlayer === 'dog') {
    turnIndicator.textContent = '🐶 DOG ANSWERING...';
    turnIndicator.className = 'hud-value dog-turn';
  } else {
    turnIndicator.textContent = '⚡ PRESS [Q] OR [P]';
    turnIndicator.className = 'hud-value timer-glow';
  }
}

/**
 * Procedural SPM Physics Question Engine (g = 9.8 m/s²)
 */
function generateSpmQuestion(shooterName) {
  const g = 9.8;
  const u = Math.floor(Math.random() * 25) + 15; // 15 to 40 m/s
  const angleDeg = Math.floor(Math.random() * 30) + 30; // 30° to 60°
  const angleRad = angleDeg * (Math.PI / 180);

  const ux = parseFloat((u * Math.cos(angleRad)).toFixed(2));
  const uy = parseFloat((u * Math.sin(angleRad)).toFixed(2));
  const timeOfFlight = parseFloat(((2 * uy) / g).toFixed(2));
  const maxHeight = parseFloat(((uy * uy) / (2 * g)).toFixed(2));
  const range = parseFloat(((u * u * Math.sin(2 * angleRad)) / g).toFixed(2));

  const qType = Math.floor(Math.random() * 4);
  let text = '', targetAns = 0;

  if (qType === 0) {
    text = `${shooterName} launches at velocity u = ${u} m/s and angle θ = ${angleDeg}°. Assuming g = 9.8 m/s², calculate the Horizontal Range R (in meters).`;
    targetAns = range;
  } else if (qType === 1) {
    text = `${shooterName} launches a projectile at u = ${u} m/s and angle θ = ${angleDeg}°. Assuming g = 9.8 m/s², calculate the Maximum Height Hₘₐₓ (in meters).`;
    targetAns = maxHeight;
  } else if (qType === 2) {
    text = `${shooterName} launches with initial vertical velocity uᵧ = ${uy} m/s. Assuming g = 9.8 m/s², calculate the total Time of Flight T (in seconds).`;
    targetAns = timeOfFlight;
  } else {
    text = `${shooterName} launches at speed u = ${u} m/s at angle θ = ${angleDeg}°. Calculate the initial vertical velocity component uᵧ (in m/s).`;
    targetAns = uy;
  }

  return { text, targetAns, u, angleDeg, ux, uy };
}

/**
 * Powerup Activation (+30 HP, Double Damage, Freeze)
 */
function activatePowerup(role, type) {
  const fighter = fighters[role];
  if (fighter.streak < 3) return;

  if (type === 'heal') {
    playSound('heal');
    fighter.hp = Math.min(fighter.maxHp, fighter.hp + 30);
    addFloatingText(fighter.x, fighter.y - 40, '+30 HP HEAL! 🩹', '#00e676');
  } else if (type === 'double') {
    fighter.doubleDamage = true;
    addFloatingText(fighter.x, fighter.y - 40, '2x DAMAGE READY! 💥', '#ffea00');
  } else if (type === 'freeze') {
    const opponent = fighters[role === 'cat' ? 'dog' : 'cat'];
    opponent.isFrozen = true;
    addFloatingText(opponent.x, opponent.y - 40, 'FROZEN! ❄️', '#00f2fe');
  }

  fighter.streak = 0;
  updateHealthBars();
  updateStreakDisplay();
  updatePowerupButtons();
}

function updateHealthBars() {
  document.getElementById('cat-hp-bar').style.width = `${(fighters.cat.hp / fighters.cat.maxHp) * 100}%`;
  document.getElementById('dog-hp-bar').style.width = `${(fighters.dog.hp / fighters.dog.maxHp) * 100}%`;

  document.getElementById('cat-hp-text').textContent = `${fighters.cat.hp} / 100 HP`;
  document.getElementById('dog-hp-text').textContent = `${fighters.dog.hp} / 100 HP`;
}

function updateStreakDisplay() {
  document.getElementById('cat-streak').textContent = `Streak: 🔥 ${fighters.cat.streak}`;
  document.getElementById('dog-streak').textContent = `Streak: 🔥 ${fighters.dog.streak}`;
}

function updatePowerupButtons() {
  ['cat', 'dog'].forEach(role => {
    const f = fighters[role];
    const container = document.getElementById(`${role}-powerups`);
    const btns = container.querySelectorAll('.powerup-btn');

    btns.forEach(btn => {
      if (f.streak >= 3) {
        btn.classList.add('active');
        btn.removeAttribute('disabled');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('disabled', 'true');
      }
    });
  });
}

function addFloatingText(x, y, text, color) {
  floatingTexts.push({ x, y, text, color, opacity: 1, life: 0 });
}

function addExplosionParticles(x, y) {
  for (let i = 0; i < 15; i++) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      radius: Math.random() * 4 + 2,
      color: Math.random() < 0.5 ? '#ff0844' : '#ffea00',
      life: 0
    });
  }
}

/**
 * 2D Canvas Animation Loop
 */
function gameCanvasLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. Draw Sky & Cloud Background
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Draw Ground
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 340, canvas.width, 80);
  ctx.fillStyle = '#00e676';
  ctx.fillRect(0, 340, canvas.width, 4);

  // 3. Draw Center Obstacle Fence
  ctx.fillStyle = '#475569';
  ctx.fillRect(470, 240, 20, 100);
  ctx.fillStyle = '#00f2fe';
  ctx.fillRect(468, 238, 24, 4);

  // 4. Draw Fighters (Cat & Dog)
  ctx.font = '50px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🐱', fighters.cat.x, fighters.cat.y);
  ctx.fillText('🐶', fighters.dog.x, fighters.dog.y);

  // 5. Animate Active Projectile Trajectory
  if (activeProjectile) {
    activeProjectile.progress += 0.025;

    const p = activeProjectile.progress;
    const currentX = activeProjectile.startX + (activeProjectile.endX - activeProjectile.startX) * p;
    const arcH = 140;
    const currentY = activeProjectile.startY + (activeProjectile.endY - activeProjectile.startY) * p - Math.sin(p * Math.PI) * arcH;

    // Draw Parabolic Trail
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(activeProjectile.startX, activeProjectile.startY);
    ctx.quadraticCurveTo(
      (activeProjectile.startX + activeProjectile.endX) / 2,
      activeProjectile.startY - arcH * 1.5,
      currentX,
      currentY
    );
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Throw Item
    ctx.font = '28px sans-serif';
    ctx.fillText(activeProjectile.itemEmoji, currentX, currentY);

    if (p >= 1) {
      handleShotImpact(activeProjectile);
      activeProjectile = null;
    }
  }

  // 6. Draw Explosion Particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const pt = particles[i];
    pt.x += pt.vx;
    pt.y += pt.vy;
    pt.life += 0.05;

    ctx.fillStyle = pt.color;
    ctx.globalAlpha = Math.max(0, 1 - pt.life);
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
    ctx.fill();

    if (pt.life >= 1) {
      particles.splice(i, 1);
    }
  }
  ctx.globalAlpha = 1;

  // 7. Draw Floating Text Effects
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    const ft = floatingTexts[i];
    ft.y -= 0.8;
    ft.life += 0.03;
    ft.opacity = Math.max(0, 1 - ft.life);

    ctx.font = 'bold 18px "Outfit", sans-serif';
    ctx.fillStyle = ft.color;
    ctx.globalAlpha = ft.opacity;
    ctx.fillText(ft.text, ft.x, ft.y);

    if (ft.life >= 1) {
      floatingTexts.splice(i, 1);
    }
  }
  ctx.globalAlpha = 1;

  requestAnimationFrame(gameCanvasLoop);
}

/**
 * Game Over Modal
 */
function showGameOverModal(winnerRole) {
  const winnerName = winnerRole === 'cat' ? '🐱 Felix the Cat' : '🐶 Buster the Dog';
  const modal = document.getElementById('game-over-modal');

  document.getElementById('winner-val').textContent = winnerName;
  document.getElementById('rounds-val').textContent = roundsPlayed;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function hideGameOverModal() {
  const modal = document.getElementById('game-over-modal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
}

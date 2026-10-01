/**
 * Physics: Cat vs Dog - Projectile Battle
 * Procedural SPM Physics Engine & 2D Cannon Ballistic Canvas Game Loop
 */

// --- Game State & Configuration ---
let currentLang = 'en';
let gameMode = 'single'; // 'single' (vs AI) or 'pvp' (2 Player Q vs P)
let currentTurn = 'cat'; // 'cat' (left) or 'dog' (right)
let turnState = 'idle';  // 'waiting_hotkey', 'answering', 'animating'

let shotTimer = null;
let shotTimeRemaining = 30; // 30s countdown

let audioCtx = null;
let soundEnabled = true;

// Player Stats
const fighters = {
  cat: {
    name: 'Felix the Cat',
    hp: 100,
    maxHp: 100,
    streak: 0,
    x: 100,
    y: 320,
    isFrozen: false,
    doubleDamage: false,
    powerups: { heal: false, double: false, freeze: false }
  },
  dog: {
    name: 'Buster the Dog',
    hp: 100,
    maxHp: 100,
    streak: 0,
    x: 860,
    y: 320,
    isFrozen: false,
    doubleDamage: false,
    powerups: { heal: false, double: false, freeze: false }
  }
};

let currentQuestion = null;
let userInput = '';
let roundsPlayed = 0;

// Canvas & Animation Context
let canvas, ctx;
let activeProjectile = null; // { x, y, vx, vy, targetX, targetY, itemEmoji }
let particles = [];
let floatingTexts = [];

// --- i18n Translations ---
const gameTranslations = {
  en: {
    modeLabel: "Game Mode:",
    modeSingle: "1 Player vs Computer AI",
    modePvp: "2 Player Local Battle (Q vs P)",
    currentTurn: "TURN:",
    catTurn: "🐱 CAT'S TURN",
    dogTurn: "🐶 DOG'S TURN",
    timeLabel: "TIME:",
    formulaBtn: "SPM Formulas",
    catName: "Felix the Cat",
    dogName: "Buster the Dog",
    ansLabel: "Answer =",
    launchBtn: "LAUNCH SHOT! 🚀",
    formulaTitle: "🧪 SPM Projectile Motion Formulas",
    playAgain: "Play Again 🔄",
    pressHotkeyCat: "Press [ Q ] to start Cat's 30s answer timer!",
    pressHotkeyDog: "Press [ P ] to start Dog's 30s answer timer!"
  },
  bm: {
    modeLabel: "Mod Permainan:",
    modeSingle: "1 Pemain vs Komputer AI",
    modePvp: "2 Pemain Pertandingan (Q vs P)",
    currentTurn: "GILIRAN:",
    catTurn: "🐱 GILIRAN KUCING",
    dogTurn: "🐶 GILIRAN ANJING",
    timeLabel: "MASA:",
    formulaBtn: "Formula SPM",
    catName: "Felix si Kucing",
    dogName: "Buster si Anjing",
    ansLabel: "Jawapan =",
    launchBtn: "LANCARKAN! 🚀",
    formulaTitle: "🧪 Formula Gerakan Projektil SPM",
    playAgain: "Main Semula 🔄",
    pressHotkeyCat: "Tekan [ Q ] untuk mula masa jawapan Kucing (30s)!",
    pressHotkeyDog: "Tekan [ P ] untuk mula masa jawapan Anjing (30s)!"
  },
  cn: {
    modeLabel: "游戏模式:",
    modeSingle: "1人对战电脑 (AI)",
    modePvp: "2人双人对战 (Q / P 抢答)",
    currentTurn: "回合:",
    catTurn: "🐱 小猫的回合",
    dogTurn: "🐶 小狗的回合",
    timeLabel: "剩余时间:",
    formulaBtn: "SPM物理公式表",
    catName: "小猫 Felix",
    dogName: "小狗 Buster",
    ansLabel: "计算答案 =",
    launchBtn: "发射炮弹！ 🚀",
    formulaTitle: "🧪 SPM 平抛与斜抛运动公式",
    playAgain: "重新开始 🔄",
    pressHotkeyCat: "按下按键 [ Q ] 开启小猫 30秒 答题倒计时！",
    pressHotkeyDog: "按下按键 [ P ] 开启小狗 30秒 答题倒计时！"
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
      if (turnState !== 'answering') return;
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
      const type = e.target.dataset.type;
      activatePowerup(type);
    });
  });

  // Hotkey listener for 2 Player Mode (Q for Cat, P for Dog)
  window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    if (gameMode === 'pvp' && turnState === 'waiting_hotkey') {
      if (currentTurn === 'cat' && key === 'q') {
        startAnswerTimer();
      } else if (currentTurn === 'dog' && key === 'p') {
        startAnswerTimer();
      }
    } else if (turnState === 'answering') {
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

/**
 * Numpad Input Handler
 */
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
  fighters.cat.hp = 100;
  fighters.dog.hp = 100;
  fighters.cat.streak = 0;
  fighters.dog.streak = 0;
  fighters.cat.isFrozen = false;
  fighters.dog.isFrozen = false;
  fighters.cat.doubleDamage = false;
  fighters.dog.doubleDamage = false;
  
  currentTurn = 'cat';
  roundsPlayed = 0;

  updateHealthBars();
  updateStreakDisplay();
  startTurn();
}

/**
 * Start Turn
 */
function startTurn() {
  userInput = '';
  updateInputDisplay();

  const activeFighter = fighters[currentTurn];
  
  // Check if active player is frozen
  if (activeFighter.isFrozen) {
    activeFighter.isFrozen = false;
    addFloatingText(activeFighter.x, activeFighter.y - 40, 'FROZEN! SKIPPED ❄️', '#00f2fe');
    setTimeout(() => {
      switchTurn();
    }, 1500);
    return;
  }

  generateQuestion();
  updateTurnHUD();

  if (gameMode === 'single') {
    if (currentTurn === 'cat') {
      startAnswerTimer();
    } else {
      // Computer AI Turn
      turnState = 'animating';
      document.getElementById('hotkey-banner').classList.add('hidden');
      setTimeout(() => {
        simulateAiTurn();
      }, 1500);
    }
  } else {
    // 2-Player Mode (Waiting for Hotkey Q or P)
    turnState = 'waiting_hotkey';
    const dict = gameTranslations[currentLang] || gameTranslations.en;
    const banner = document.getElementById('hotkey-banner');
    const promptText = document.getElementById('hotkey-prompt-text');
    
    promptText.textContent = currentTurn === 'cat' ? dict.pressHotkeyCat : dict.pressHotkeyDog;
    banner.classList.remove('hidden');
    
    document.getElementById('shot-timer').textContent = '30s';
  }
}

function startAnswerTimer() {
  turnState = 'answering';
  document.getElementById('hotkey-banner').classList.add('hidden');
  
  clearInterval(shotTimer);
  shotTimeRemaining = 30;
  document.getElementById('shot-timer').textContent = '30s';

  shotTimer = setInterval(() => {
    shotTimeRemaining--;
    document.getElementById('shot-timer').textContent = `${shotTimeRemaining}s`;

    if (shotTimeRemaining <= 0) {
      clearInterval(shotTimer);
      // Timeout = Missed shot!
      executeShot(false);
    }
  }, 1000);
}

function updateTurnHUD() {
  const dict = gameTranslations[currentLang] || gameTranslations.en;
  const turnIndicator = document.getElementById('turn-indicator');
  
  if (currentTurn === 'cat') {
    turnIndicator.textContent = dict.catTurn;
    turnIndicator.className = 'hud-value cat-turn';
  } else {
    turnIndicator.textContent = dict.dogTurn;
    turnIndicator.className = 'hud-value dog-turn';
  }
}

/**
 * Procedural SPM Physics Question Engine (g = 9.8 m/s²)
 */
function generateQuestion() {
  const g = 9.8;
  const u = Math.floor(Math.random() * 25) + 15; // Launch speed: 15 to 40 m/s
  const angleDeg = Math.floor(Math.random() * 30) + 30; // Angle: 30° to 60°
  const angleRad = angleDeg * (Math.PI / 180);

  const ux = parseFloat((u * Math.cos(angleRad)).toFixed(2));
  const uy = parseFloat((u * Math.sin(angleRad)).toFixed(2));
  const timeOfFlight = parseFloat(((2 * uy) / g).toFixed(2));
  const maxHeight = parseFloat(((uy * uy) / (2 * g)).toFixed(2));
  const range = parseFloat(((u * u * Math.sin(2 * angleRad)) / g).toFixed(2));

  // 5 Different Question Types
  const qType = Math.floor(Math.random() * 4);
  let qText = '', targetAns = 0;

  const shooter = currentTurn === 'cat' ? 'Felix the Cat 🐱' : 'Buster the Dog 🐶';

  if (qType === 0) {
    // Horizontal Range R
    qText = `${shooter} launches an object at velocity u = ${u} m/s and angle θ = ${angleDeg}°. Assuming g = 9.8 m/s², calculate the Horizontal Range R (in meters).`;
    targetAns = range;
  } else if (qType === 1) {
    // Maximum Height Hmax
    qText = `${shooter} launches a projectile at u = ${u} m/s and angle θ = ${angleDeg}°. Assuming g = 9.8 m/s², calculate the Maximum Height Hₘₐₓ reached (in meters).`;
    targetAns = maxHeight;
  } else if (qType === 2) {
    // Time of Flight T
    qText = `${shooter} launches a projectile with initial vertical velocity uᵧ = ${uy} m/s. Assuming g = 9.8 m/s², calculate the total Time of Flight T (in seconds).`;
    targetAns = timeOfFlight;
  } else {
    // Initial Vertical Velocity uy
    qText = `${shooter} launches a projectile at speed u = ${u} m/s at angle θ = ${angleDeg}°. Calculate the initial vertical velocity component uᵧ (in m/s).`;
    targetAns = uy;
  }

  currentQuestion = {
    u,
    angleDeg,
    ux,
    uy,
    targetAns
  };

  document.getElementById('spm-question-text').textContent = qText;
}

/**
 * Submit Answer
 */
function submitAnswer() {
  if (turnState !== 'answering' || userInput === '') return;
  clearInterval(shotTimer);

  const userVal = parseFloat(userInput);
  const correctVal = currentQuestion.targetAns;

  // Standard tolerance check (+- 0.25)
  const isCorrect = Math.abs(userVal - correctVal) <= 0.25;

  executeShot(isCorrect);
}

/**
 * AI Turn Simulation (Single Player)
 */
function simulateAiTurn() {
  // AI has an 80% accuracy chance
  const isCorrect = Math.random() < 0.8;
  executeShot(isCorrect);
}

/**
 * Execute Shot Animation & Damage Mechanics
 */
function executeShot(isHit) {
  turnState = 'animating';
  const shooter = fighters[currentTurn];
  const target = fighters[currentTurn === 'cat' ? 'dog' : 'cat'];

  const itemEmoji = currentTurn === 'cat' ? '🥫' : '🦴';
  const startX = shooter.x;
  const startY = shooter.y - 20;

  // Determine target endpoint
  let endX = target.x;
  let endY = target.y - 20;

  if (!isHit) {
    // Miss: overshoot or fall short
    endX = Math.random() < 0.5 ? target.x - 140 : target.x + 120;
  }

  // Create parabolic projectile
  activeProjectile = {
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
  const shooter = fighters[currentTurn];
  const target = fighters[currentTurn === 'cat' ? 'dog' : 'cat'];

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

    // Check if streak reaches 3 -> Unlock Powerups!
    if (shooter.streak >= 3) {
      shooter.powerups.heal = true;
      shooter.powerups.double = true;
      shooter.powerups.freeze = true;
    }
  } else {
    // Missed
    shooter.streak = 0;
    addFloatingText(proj.endX, proj.endY - 20, 'MISSED!', '#94a3b8');
  }

  updateHealthBars();
  updateStreakDisplay();
  updatePowerupButtons();

  // Check Game Over Condition
  if (target.hp <= 0) {
    setTimeout(() => {
      showGameOverModal();
    }, 1000);
  } else {
    setTimeout(() => {
      switchTurn();
    }, 1200);
  }
}

function switchTurn() {
  roundsPlayed++;
  currentTurn = currentTurn === 'cat' ? 'dog' : 'cat';
  startTurn();
}

/**
 * Powerup Activation (+30 HP, Double Damage, Freeze)
 */
function activatePowerup(type) {
  const fighter = fighters[currentTurn];
  if (fighter.streak < 3) return;

  if (type === 'heal') {
    playSound('heal');
    fighter.hp = Math.min(fighter.maxHp, fighter.hp + 30);
    addFloatingText(fighter.x, fighter.y - 40, '+30 HP HEAL! 🩹', '#00e676');
  } else if (type === 'double') {
    fighter.doubleDamage = true;
    addFloatingText(fighter.x, fighter.y - 40, '2x DAMAGE READY! 💥', '#ffea00');
  } else if (type === 'freeze') {
    const opponent = fighters[currentTurn === 'cat' ? 'dog' : 'cat'];
    opponent.isFrozen = true;
    addFloatingText(opponent.x, opponent.y - 40, 'FROZEN! ❄️', '#00f2fe');
  }

  // Reset streak after using powerup
  fighter.streak = 0;
  updateHealthBars();
  updateStreakDisplay();
  updatePowerupButtons();
}

function updateHealthBars() {
  const catBar = document.getElementById('cat-hp-bar');
  const dogBar = document.getElementById('dog-hp-bar');
  
  catBar.style.width = `${(fighters.cat.hp / fighters.cat.maxHp) * 100}%`;
  dogBar.style.width = `${(fighters.dog.hp / fighters.dog.maxHp) * 100}%`;

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

/**
 * Floating Text Effects
 */
function addFloatingText(x, y, text, color) {
  floatingTexts.push({
    x,
    y,
    text,
    color,
    opacity: 1,
    life: 0
  });
}

/**
 * Explosion Particle Effects
 */
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
  // Cat 🐱 (Left)
  ctx.font = '50px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🐱', fighters.cat.x, fighters.cat.y);

  // Dog 🐶 (Right)
  ctx.fillText('🐶', fighters.dog.x, fighters.dog.y);

  // 5. Animate Active Projectile Trajectory
  if (activeProjectile) {
    activeProjectile.progress += 0.025;

    const p = activeProjectile.progress;
    const currentX = activeProjectile.startX + (activeProjectile.endX - activeProjectile.startX) * p;
    const arcH = 140; // Arc height
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

    // Draw Throw Item (Fish Can or Bone)
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
function showGameOverModal() {
  const winnerName = fighters.cat.hp > 0 ? '🐱 Felix the Cat' : '🐶 Buster the Dog';
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

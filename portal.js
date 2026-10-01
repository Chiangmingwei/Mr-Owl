/**
 * EduQuest MY - Portal Logic & i18n Translation Engine
 */

// Current application state (Default Language: English)
let currentLanguage = 'en';
let activeSubject = 'all';
let activeLevel = 'all';

// i18n Translation Dictionary (BM, EN, CN)
const translations = {
  bm: {
    tagline: "Portal Pembelajaran Interaktif Malaysia",
    selectLanguage: "Bahasa:",
    heroBadge: "✨ Selaras KSSR & KSSM",
    heroTitle: "Belajar Matematik, Sains & Sejarah Melalui Permainan Arked!",
    heroDesc: "Permainan STEM dan kemanusiaan menarik khas untuk murid sekolah rendah dan menengah Malaysia.",
    subjectLabel: "Subjek:",
    levelLabel: "Tahap:",
    allSubjects: "Semua Subjek",
    subjectMath: "Matematik",
    subjectScience: "Sains",
    subjectHistory: "Sejarah",
    allLevels: "Semua Tahap",
    levelPrimary: "Sekolah Rendah (KSSR)",
    levelSecondary: "Sekolah Menengah (KSSM)",
    tagPrimary: "Sekolah Rendah",
    tagSecondary: "Sekolah Menengah",
    tagMath: "Matematik",
    tagScience: "Sains",
    tagHistory: "Sejarah",
    diffMedium: "Sederhana",
    comingSoon: "Akan Datang",
    playButton: "Main Permainan",
    locked: "Kunci",
    exitGame: "Keluar Permainan",
    game1Title: "Trigonometri: Lubang Dinding",
    game1Desc: "Hitung panjang sisi atau sudut segi tiga bersudut tegak (SOH CAH TOA) sebelum dinding bergerak melanggar anda!",
    game2Title: "Makmal Sains: Fotosintesis Rush",
    game2Desc: "Imbangkan cahaya matahari, air, dan karbon dioksida untuk membantu tumbuhan berkembang!",
    game3Title: "Pengembaraan Kesultanan Melayu Melaka",
    game3Desc: "Jelajahi laluan perdagangan Melaka abad ke-15 dan uji pengetahuan sejarah anda."
  },
  en: {
    tagline: "Malaysian Interactive Learning Portal",
    selectLanguage: "Language:",
    heroBadge: "✨ KSSR & KSSM Aligned",
    heroTitle: "Learn Math, Science & History Through Arcade Gaming!",
    heroDesc: "Engaging STEM and humanities games specially created for Malaysian primary and secondary students.",
    subjectLabel: "Subject:",
    levelLabel: "Level:",
    allSubjects: "All Subjects",
    subjectMath: "Mathematics",
    subjectScience: "Science",
    subjectHistory: "History",
    allLevels: "All Levels",
    levelPrimary: "Primary School (KSSR)",
    levelSecondary: "Secondary School (KSSM)",
    tagPrimary: "Primary",
    tagSecondary: "Secondary",
    tagMath: "Mathematics",
    tagScience: "Science",
    tagHistory: "History",
    diffMedium: "Medium",
    comingSoon: "Coming Soon",
    playButton: "Play Game",
    locked: "Locked",
    exitGame: "Exit / Key Out",
    game1Title: "Trigonometry: Hole in the Wall",
    game1Desc: "Calculate missing triangle sides or angles using SOH CAH TOA before the moving wall reaches you!",
    game2Title: "Science Lab: Photosynthesis Rush",
    game2Desc: "Balance sunlight, water, and carbon dioxide to help plants thrive in the tropical rainforest!",
    game3Title: "Melaka Sultanate Quest",
    game3Desc: "Journey through 15th-century Melaka trade routes and test your knowledge of Malaysian heritage."
  },
  cn: {
    tagline: "马来西亚互动学习游戏门户",
    selectLanguage: "语言选择:",
    heroBadge: "✨ 符合 KSSR & KSSM 课程标准",
    heroTitle: "通过街机游戏轻松学习数学、科学与历史！",
    heroDesc: "专为马来西亚中小学生设计的趣味 STEM 与人文类互动游戏 portal。",
    subjectLabel: "科目分类:",
    levelLabel: "学习阶段:",
    allSubjects: "所有科目",
    subjectMath: "数学 (Matematik)",
    subjectScience: "科学 (Sains)",
    subjectHistory: "历史 (Sejarah)",
    allLevels: "所有阶段",
    levelPrimary: "小学 (Sekolah Rendah)",
    levelSecondary: "中学 (Sekolah Menengah)",
    tagPrimary: "小学",
    tagSecondary: "中学",
    tagMath: "数学",
    tagScience: "科学",
    tagHistory: "历史",
    diffMedium: "中等难度",
    comingSoon: "即将推出",
    playButton: "开始游戏",
    locked: "未解锁",
    exitGame: "退出游戏",
    game1Title: "三角函数：墙缝穿行 (Trigonometry Wall)",
    game1Desc: "在移动的墙壁靠近前，运用 SOH CAH TOA 计算直角三角形缺少的边长或角度！",
    game2Title: "科学实验室：光合作用冲刺",
    game2Desc: "平衡阳光、水分与二氧化碳，帮助热带雨林中的植物健康生长！",
    game3Title: "马六甲王朝历史大冒险",
    game3Desc: "穿越回15世纪马六甲贸易枢纽，挑战你的马来西亚历史知识储备。"
  }
};

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initFilters();
  initModalListeners();
  updateLanguage('en'); // Default language EN
});

/**
 * Initialize Language Switcher Buttons
 */
function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedLang = btn.dataset.lang;
      if (selectedLang && selectedLang !== currentLanguage) {
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateLanguage(selectedLang);
      }
    });
  });
}

/**
 * Update Language Across All i18n Elements
 */
function updateLanguage(langKey) {
  if (!translations[langKey]) return;
  currentLanguage = langKey;
  
  const langDict = translations[langKey];
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(el => {
    const key = el.dataset.i18n;
    if (langDict[key]) {
      el.textContent = langDict[key];
    }
  });
}

/**
 * Initialize Subject and Level Tabs Filtering
 */
function initFilters() {
  const subjectTabs = document.querySelectorAll('#subject-tabs .tab-btn');
  const levelTabs = document.querySelectorAll('#level-tabs .tab-btn');

  subjectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      subjectTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeSubject = tab.dataset.subject;
      filterGameCards();
    });
  });

  levelTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      levelTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeLevel = tab.dataset.level;
      filterGameCards();
    });
  });
}

/**
 * Filter Game Cards visibility based on Subject & Level
 */
function filterGameCards() {
  const cards = document.querySelectorAll('.game-card');
  cards.forEach(card => {
    const cardSubject = card.dataset.subject;
    const cardLevel = card.dataset.level;

    const matchSubject = activeSubject === 'all' || cardSubject === activeSubject;
    const matchLevel = activeLevel === 'all' || cardLevel === activeLevel;

    if (matchSubject && matchLevel) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

/**
 * Game Modal Launcher
 */
function openGameModal(gamePath) {
  const modal = document.getElementById('game-modal');
  const iframe = document.getElementById('game-iframe');
  const modalTitle = document.getElementById('modal-game-title');
  
  // Append current language parameter to iframe URL
  const fullUrl = `${gamePath}?lang=${currentLanguage}`;
  
  iframe.src = fullUrl;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  
  // Set modal title based on current language
  if (translations[currentLanguage]) {
    modalTitle.textContent = translations[currentLanguage].game1Title;
  }
}

function closeGameModal() {
  const modal = document.getElementById('game-modal');
  const iframe = document.getElementById('game-iframe');
  
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  // Reset iframe src to stop background audio/game loop
  iframe.src = 'about:blank';
}

/**
 * Keyboard Listeners (ESC key to exit modal)
 */
function initModalListeners() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('game-modal');
      if (modal.classList.contains('active')) {
        closeGameModal();
      }
    }
  });
}

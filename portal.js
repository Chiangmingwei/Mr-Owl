/**
 * EduQuest MY - Portal Logic & i18n Translation Engine (Structured Categories, Notes & Exam Games)
 */

// Current application state (Default Language: English)
let currentLanguage = 'en';
let activeCategory = 'all';
let activeSubject = 'all';
let activeLevel = 'all';

// i18n Translation Dictionary (BM, EN, CN)
const translations = {
  bm: {
    tagline: "Portal Nota Pembelajaran Interaktif & Permainan Ujian Malaysia",
    selectLanguage: "Bahasa:",
    heroBadge: "✨ Selaras KSSR & KSSM",
    heroTitle: "Buka Nota Ulang Kaji, Kemudian Kuasai Permainan Ujian!",
    heroDesc: "Nota ringkas berstruktur dan simulasi ujian berunsur permainan khas untuk murid sekolah rendah dan menengah Malaysia.",
    categoryLabel: "Kategori:",
    subjectLabel: "Subjek:",
    levelLabel: "Tahap:",
    catAll: "Semua Kategori",
    catNotes: "📚 Nota Ulang Kaji",
    catGames: "🎮 Permainan Ujian",
    allSubjects: "Semua Subjek",
    subjectMath: "Matematik",
    subjectScience: "Sains / Fizik",
    subjectHistory: "Sejarah",
    allLevels: "Semua Tahap",
    levelPrimary: "Sekolah Rendah (KSSR)",
    levelSecondary: "Sekolah Menengah (KSSM)",
    tagPrimary: "Sekolah Rendah",
    tagSecondary: "Sekolah Menengah",
    tagMath: "Matematik",
    tagScience: "Fizik",
    tagHistory: "Sejarah",
    tagStudyNote: "📚 Nota Ulang Kaji",
    tagExamGame: "🎮 Permainan Ujian",
    diffMedium: "Sederhana",
    comingSoon: "Akan Datang",
    playButton: "Main Permainan Ujian",
    testExamBtn: "Uji Ilmu Dalam Permainan ▶",
    locked: "Kunci",
    exitGame: "Keluar Permainan",
    note1Title: "Trigonometri & Segi Tiga Bersudut Tegak (SOH CAH TOA)",
    note1Desc: "Kuasai nisbah segi tiga bersudut tegak, teorem Pythagoras, dan cara menghitung panjang sisi dan sudut θ.",
    note2Title: "Fizik SPM: Gerakan Projektil (g = 9.8 ms⁻²)",
    note2Desc: "Panduan lengkap kinematik 2D, leraian vektor halaju, tinggi maksimum, dan masa penerbangan.",
    note3Title: "Sains KSSR: Fotosintesis Tumbuhan",
    note3Desc: "Pelajari bagaimana klorofil, cahaya matahari, karbon dioksida, dan air bertukar menjadi glukosa dan oksigen.",
    note4Title: "Sejarah KSSM: Kesultanan Melayu Melaka",
    note4Desc: "Terokai zaman kegemilangan perdagangan maritim Melaka abad ke-15 dan perundangan Melaka.",
    game1Title: "Trigonometri: Lubang Dinding",
    game1Desc: "Hitung panjang sisi atau sudut segi tiga bersudut tegak (SOH CAH TOA) sebelum dinding bergerak melanggar anda!",
    game4Title: "Fizik: Kucing vs Anjing (Pertempuran Projektil)",
    game4Desc: "Selesaikan pengiraan gerakan projektil Fizik SPM (g=9.8 ms⁻²) untuk melancarkan tembakan tepat!"
  },
  en: {
    tagline: "Malaysian Interactive Study Notes & Exam Games Portal",
    selectLanguage: "Language:",
    heroBadge: "✨ KSSR & KSSM Aligned",
    heroTitle: "Study the Notes, Then Master the Exam Games!",
    heroDesc: "Structured revision notes and gamified exam simulations for Malaysian primary and secondary students.",
    categoryLabel: "Category:",
    subjectLabel: "Subject:",
    levelLabel: "Level:",
    catAll: "All Categories",
    catNotes: "📚 Study Notes",
    catGames: "🎮 Exam Games",
    allSubjects: "All Subjects",
    subjectMath: "Mathematics",
    subjectScience: "Science / Physics",
    subjectHistory: "History",
    allLevels: "All Levels",
    levelPrimary: "Primary School (KSSR)",
    levelSecondary: "Secondary School (KSSM)",
    tagPrimary: "Primary",
    tagSecondary: "Secondary",
    tagMath: "Mathematics",
    tagScience: "Physics",
    tagHistory: "History",
    tagStudyNote: "📚 Study Note",
    tagExamGame: "🎮 Exam Game",
    diffMedium: "Medium",
    comingSoon: "Coming Soon",
    playButton: "Play Exam Game",
    testExamBtn: "Take Exam Game ▶",
    locked: "Locked",
    exitGame: "Exit / Key Out",
    note1Title: "Trigonometry & Right Triangles (SOH CAH TOA)",
    note1Desc: "Master right-angled triangle ratios, Pythagoras theorem, and calculating missing sides and angles θ.",
    note2Title: "SPM Physics: Projectile Motion (g = 9.8 ms⁻²)",
    note2Desc: "Comprehensive guide to 2D trajectory kinematics, velocity resolution, maximum height, and time of flight.",
    note3Title: "KSSR Science: Plant Photosynthesis",
    note3Desc: "Learn how chlorophyll, sunlight, carbon dioxide, and water convert into glucose and oxygen.",
    note4Title: "KSSM Sejarah: Kesultanan Melayu Melaka",
    note4Desc: "Discover the golden age of 15th-century Melaka maritime trade, diplomatic ties, and legal codes.",
    game1Title: "Trigonometry: Hole in the Wall",
    game1Desc: "Calculate missing triangle sides or angles using SOH CAH TOA before the moving wall reaches you!",
    game4Title: "Physics: Cat vs Dog (Projectile Battle)",
    game4Desc: "Solve SPM Physics projectile motion calculations (g=9.8 ms⁻²) to launch accurate trajectory shots!"
  },
  cn: {
    tagline: "马来西亚互动学习笔记与考试游戏门户",
    selectLanguage: "语言选择:",
    heroBadge: "✨ 符合 KSSR & KSSM 课程标准",
    heroTitle: "先温习知识笔记，再挑战考试游戏！",
    heroDesc: "专为马来西亚中小学生打造的结构化复习笔记与关卡式考试游戏。",
    categoryLabel: "资源分类:",
    subjectLabel: "科目分类:",
    levelLabel: "学习阶段:",
    catAll: "全部资源",
    catNotes: "📚 学习笔记",
    catGames: "🎮 考试与游戏",
    allSubjects: "所有科目",
    subjectMath: "数学 (Matematik)",
    subjectScience: "科学 / 物理 (Fizik)",
    subjectHistory: "历史 (Sejarah)",
    allLevels: "所有阶段",
    levelPrimary: "小学 (Sekolah Rendah)",
    levelSecondary: "中学 (Sekolah Menengah)",
    tagPrimary: "小学",
    tagSecondary: "中学",
    tagMath: "数学",
    tagScience: "物理",
    tagHistory: "历史",
    tagStudyNote: "📚 学习笔记",
    tagExamGame: "🎮 考试游戏",
    diffMedium: "中等难度",
    comingSoon: "即将推出",
    playButton: "开始考试游戏",
    testExamBtn: "进入考试游戏 ▶",
    locked: "未解锁",
    exitGame: "退出游戏",
    note1Title: "三角函数与直角三角形 (SOH CAH TOA)",
    note1Desc: "掌握直角三角形边长比、勾股定理以及计算未知边长与角度 θ。",
    note2Title: "SPM 物理：斜抛与平抛运动 (g = 9.8 ms⁻²)",
    note2Desc: "平抛 kinematics 运动学、初速度分解、最大高度 Hₘₐₓ 与飞行时间 T 详解。",
    note3Title: "KSSR 科学：植物的光合作用",
    note3Desc: "学习叶绿素、阳光、二氧化碳和水如何转化为葡萄糖和氧气。",
    note4Title: "KSSM 历史：马六甲王朝的辉煌",
    note4Desc: "探索15世纪马六甲海上贸易枢纽、外交关系与马六甲法典。",
    game1Title: "三角函数：墙缝穿行 (Trigonometry Wall)",
    game1Desc: "在移动的墙壁靠近前，运用 SOH CAH TOA 计算直角三角形缺少的边长或角度！",
    game4Title: "物理：猫狗大作战 (平抛与斜抛运动)",
    game4Desc: "解答 SPM 物理斜抛运动公式 (g=9.8 ms⁻²)，发射精准炮弹击败对手！"
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
    btn.addEventListener('click', () => {
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
 * Initialize Category, Subject and Level Tabs Filtering
 */
function initFilters() {
  const categoryTabs = document.querySelectorAll('#category-tabs .tab-btn');
  const subjectTabs = document.querySelectorAll('#subject-tabs .tab-btn');
  const levelTabs = document.querySelectorAll('#level-tabs .tab-btn');

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.category;
      filterPortalCards();
    });
  });

  subjectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      subjectTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeSubject = tab.dataset.subject;
      filterPortalCards();
    });
  });

  levelTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      levelTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeLevel = tab.dataset.level;
      filterPortalCards();
    });
  });
}

/**
 * Filter Portal Cards visibility based on Category, Subject & Level
 */
function filterPortalCards() {
  const cards = document.querySelectorAll('.portal-card');
  cards.forEach(card => {
    const cardCategory = card.dataset.category;
    const cardSubject = card.dataset.subject;
    const cardLevel = card.dataset.level;

    const matchCategory = activeCategory === 'all' || cardCategory === activeCategory;
    const matchSubject = activeSubject === 'all' || cardSubject === activeSubject;
    const matchLevel = activeLevel === 'all' || cardLevel === activeLevel;

    if (matchCategory && matchSubject && matchLevel) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

/**
 * Game Modal Launcher
 */
function openGameModal(gamePath, titleOverride) {
  const modal = document.getElementById('game-modal');
  const iframe = document.getElementById('game-iframe');
  const modalTitle = document.getElementById('modal-game-title');
  
  // Append current language parameter to iframe URL
  const fullUrl = `${gamePath}?lang=${currentLanguage}`;
  
  iframe.src = fullUrl;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  
  if (titleOverride) {
    modalTitle.textContent = titleOverride;
  } else if (translations[currentLanguage]) {
    modalTitle.textContent = translations[currentLanguage].game1Title;
  }
}

function closeGameModal() {
  const modal = document.getElementById('game-modal');
  const iframe = document.getElementById('game-iframe');
  
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
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

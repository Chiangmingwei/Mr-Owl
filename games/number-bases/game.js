/* Number Bases interactive slides - trilingual (EN / BM / 中文) */

const L = {
en: {
  mainTitle: "Number Bases: Place Value & Conversion",
  prevBtn: "← Previous", nextBtn: "Next →",
  s1Title: "🔢 What is a Number Base?",
  s1P1: "Every day you use Base 10 (decimal): 10 digits, 0 to 9. When a column reaches 10, it rolls over and carries 1 to the next column.",
  s1P2: "A number in base b only uses the digits 0 to (b − 1). Example: base 5 only uses 0, 1, 2, 3, 4.",
  s1P3: "Think of a car's mileage odometer. Each plate can only show digits 0 to (base − 1). When a plate completes a full cycle, it pushes the next plate by 1.",
  s1Toggle: "🎮 Try the Odometer Model", s1BaseLbl: "Base:", s1Inc: "+1", s1Reset: "↻ Reset",
  odoReadout: "Showing: {d}{sub} = {v} in base 10",
  s2Title: "📊 Numbers in Base 2, 5 and 8: Place Values",
  s2P1: "In base b, each column's place value is a power of b, just like base 10 uses 100s, 10s and 1s.",
  s2Ex: "Example: 101101₂ means:",
  s2Try: "Try your own:", s2Digits: "Digits:", s2BaseLbl: "Base:", s2Show: "Show Place Values",
  s2Toggle: "🎮 Try the Odometer Model", s2Inc: "+1", s2Reset: "↻ Reset",
  tblDigit: "Digit", tblPlace: "Place Value",
  invalidDigits: "Digits must only use 0 to {m} for base {b}.",
  s3Title: "➡️ Converting Base N to Base 10 (Expansion Method)",
  s3P: "Multiply each digit by its place value, then add everything up.",
  s3Ex1: "Example: Convert 1101₂ to base 10", s3Ex2: "Example: Convert 352₈ to base 10",
  s3Try: "Try It Yourself", s3Digits: "Digits:", s3FromLbl: "From base:", s3Btn: "Convert to Base 10",
  invalidBase: "Invalid digits for base {b}.",
  totalLine: "Total = {v} (base 10)",
  s4Title: "⬅️ Converting Base 10 to Base N (Repeated Division)",
  s4P: "Divide repeatedly by the target base, keep the remainders, then read them from bottom to top.",
  s4Ex: "Example: Convert 45 (base 10) to base 2",
  s4NumLbl: "Number (base 10):", s4ToLbl: "To base:", s4Btn: "Convert",
  enterValid: "Enter a valid non-negative number.",
  ladderStep: "{n} ÷ {b} = {q}  remainder {r}",
  readBottom: "Read remainders bottom → top:",
  ladderResult: "{n} (base 10) = {res} (base {b})",
  zeroLine: "{n} in base 10 = 0 in base {b}",
  s5Title: "🔄 Changing Base: Base A → Base 10 → Base B",
  s5P: "You cannot always jump directly between two non-10 bases. Use base 10 as the bridge:",
  s5Flow: "Step 1: Base A → Base 10 (expansion, like Slide 3)\nStep 2: Base 10 → Base B (repeated division, like Slide 4)",
  s5Ex: "Example: Convert 1011₂ to base 8", s5Try: "Try It Yourself",
  s5DigitsLbl: "Digits:", s5FromLbl: "From base A:", s5ToLbl: "To base B:", s5Btn: "Convert",
  step1: "Step 1 (base {a} → base 10):", step2: "Step 2 (base 10 → base {b}):",
  alreadyTen: "Already in base 10: {v}",
  zeroStop: "0 ÷ {b} → stop (the value is 0)",
  readRemainders: "Read remainders bottom → top",
  answerLine: "Answer: {d} (base {a}) = {r} (base {b})",
  s6Title: "➕ Addition in Base 2",
  s6P: "Only four rules to remember. Base 2 only uses 0 and 1, so 1 + 1 is already 'full' and must carry.",
  tblA: "A", tblB: "B", tblResult: "Result",
  r4Carry: "10 (write 0, carry 1)",
  s6Odo: "<strong>Odometer tie-in:</strong> when a plate passes 1 it resets to 0 and pushes the plate on its left forward by 1. That push is the carry.",
  s6Contoh: "Example: 1011₂ + 110₂",
  s6Step: "Step Through It Yourself",
  numALbl6: "Number A (base 2):", numBLbl6: "Number B (base 2):",
  btnStart: "Start", btnNext: "Next Column →", btnReset: "↻ Reset",
  addStep: "Column {c}: {x} + {y} + carry {cin} = {s}  →  write {d}, carry {co}",
  vizCarry: "carry", vizBorrow: "borrow",
  startPrompt: "Press 'Next Column →' to start from the rightmost column.",
  typeBinary: "Please type numbers using only 0 and 1.",
  aBiggerB: "For this lesson, A must be bigger than or equal to B.",
  answerBin: "Answer: {r} (base 2)",
  s7Title: "➖ Subtraction in Base 2",
  s7P: "Four rules. The only tricky case is 0 − 1: we must borrow 1 from the column on the left, which is worth 2 in base 2 (10₂ − 1 = 1).",
  r4Borrow: "1 (borrow 1 from the left)",
  s7Odo: "<strong>Odometer tie-in:</strong> borrowing is the odometer running backwards. One plate steps back by 1, and the plate on the right gains 2.",
  s7Contoh: "Example: 1101₂ − 111₂",
  s7Step: "Step Through It Yourself",
  numALbl7: "Number A (base 2, must be bigger):", numBLbl7: "Number B (base 2):",
  subStep: "Column {c}: {x} − {y} − borrow {bin} = {d}  →  write {d}",
  subNeg: "Column {c}: {x} − {y} − borrow {bin} is negative, so borrow 2  →  write {d}, borrow 1 from the left",
  s8Title: "❓ Practice Quiz (Unlimited Questions)",
  s8Topic: "Choose topic:",
  optToBase10: "Convert to Base 10", optFromBase10: "Convert from Base 10", optAdd: "Addition in Base 2",
  optSub: "Subtraction in Base 2", optAny: "Change Base (any 2–9)",
  btnNewQ: "🎲 New Question", placeholderAns: "Your answer", btnCheck: "Check Answer",
  quizStart: "Click 'New Question' to begin!",
  qToBase10: "Convert {d} (base {b}) to base 10:",
  qFromBase10: "Convert {n} (base 10) to base {b}:",
  qAdd: "Calculate {x} + {y} (both in base 2). Answer in base 2:",
  qSub: "Calculate {x} − {y} (both in base 2). Answer in base 2:",
  qAny: "Convert {d} (base {f}) to base {t}:",
  correct: "✅ Correct!", wrong: "❌ Not quite. Correct answer: {a}", score: "Score: {c} / {t}"
},
bm: {
  mainTitle: "Nombor Asas: Nilai Tempat & Penukaran",
  prevBtn: "← Sebelum", nextBtn: "Seterusnya →",
  s1Title: "🔢 Apakah Asas Nombor?",
  s1P1: "Setiap hari anda guna Asas 10 (perpuluhan): 10 digit, 0 hingga 9. Apabila satu lajur mencapai 10, ia kembali ke 0 dan membawa 1 ke lajur seterusnya.",
  s1P2: "Nombor dalam asas b hanya menggunakan digit 0 hingga (b − 1). Contoh: asas 5 hanya guna 0, 1, 2, 3, 4.",
  s1P3: "Bayangkan odometer kereta. Setiap plat hanya boleh tunjuk digit 0 hingga (asas − 1). Apabila sesuatu plat habis satu pusingan, ia menolak plat seterusnya sebanyak 1.",
  s1Toggle: "🎮 Cuba Model Odometer", s1BaseLbl: "Asas:", s1Inc: "+1", s1Reset: "↻ Set Semula",
  odoReadout: "Paparan: {d}{sub} = {v} dalam asas 10",
  s2Title: "📊 Nombor dalam Asas 2, 5 dan 8: Nilai Tempat",
  s2P1: "Dalam asas b, nilai tempat setiap lajur ialah kuasa b, sama seperti asas 10 yang guna 100, 10 dan 1.",
  s2Ex: "Contoh: 101101₂ bermaksud:",
  s2Try: "Cuba sendiri:", s2Digits: "Digit:", s2BaseLbl: "Asas:", s2Show: "Tunjuk Nilai Tempat",
  s2Toggle: "🎮 Cuba Model Odometer", s2Inc: "+1", s2Reset: "↻ Set Semula",
  tblDigit: "Digit", tblPlace: "Nilai Tempat",
  invalidDigits: "Digit hanya boleh guna 0 hingga {m} untuk asas {b}.",
  s3Title: "➡️ Tukar Asas N kepada Asas 10 (Kaedah Kembangan)",
  s3P: "Darab setiap digit dengan nilai tempatnya, kemudian jumlahkan semua.",
  s3Ex1: "Contoh: Tukar 1101₂ kepada asas 10", s3Ex2: "Contoh: Tukar 352₈ kepada asas 10",
  s3Try: "Cuba Sendiri", s3Digits: "Digit:", s3FromLbl: "Dari asas:", s3Btn: "Tukar kepada Asas 10",
  invalidBase: "Digit tidak sah untuk asas {b}.",
  totalLine: "Jumlah = {v} (asas 10)",
  s4Title: "⬅️ Tukar Asas 10 kepada Asas N (Pembahagian Berulang)",
  s4P: "Bahagi berulang kali dengan asas sasaran, simpan baki, kemudian baca baki dari bawah ke atas.",
  s4Ex: "Contoh: Tukar 45 (asas 10) kepada asas 2",
  s4NumLbl: "Nombor (asas 10):", s4ToLbl: "Ke asas:", s4Btn: "Tukar",
  enterValid: "Masukkan nombor sah yang tidak negatif.",
  ladderStep: "{n} ÷ {b} = {q}  baki {r}",
  readBottom: "Baca baki dari bawah ke atas:",
  ladderResult: "{n} (asas 10) = {res} (asas {b})",
  zeroLine: "{n} dalam asas 10 = 0 dalam asas {b}",
  s5Title: "🔄 Menukar Asas: Asas A → Asas 10 → Asas B",
  s5P: "Anda tidak boleh sentiasa terus menukar antara dua asas bukan 10. Gunakan asas 10 sebagai jambatan:",
  s5Flow: "Langkah 1: Asas A → Asas 10 (kembangan, seperti Slaid 3)\nLangkah 2: Asas 10 → Asas B (pembahagian berulang, seperti Slaid 4)",
  s5Ex: "Contoh: Tukar 1011₂ kepada asas 8", s5Try: "Cuba Sendiri",
  s5DigitsLbl: "Digit:", s5FromLbl: "Dari asas A:", s5ToLbl: "Ke asas B:", s5Btn: "Tukar",
  step1: "Langkah 1 (asas {a} → asas 10):", step2: "Langkah 2 (asas 10 → asas {b}):",
  alreadyTen: "Sudah dalam asas 10: {v}",
  zeroStop: "0 ÷ {b} → berhenti (nilai ialah 0)",
  readRemainders: "Baca baki dari bawah ke atas",
  answerLine: "Jawapan: {d} (asas {a}) = {r} (asas {b})",
  s6Title: "➕ Tambah dalam Asas 2",
  s6P: "Hanya empat peraturan untuk diingat. Asas 2 hanya guna 0 dan 1, jadi 1 + 1 sudah 'penuh' dan mesti dibawa.",
  tblA: "A", tblB: "B", tblResult: "Hasil",
  r4Carry: "10 (tulis 0, bawa 1)",
  s6Odo: "<strong>Kaitan odometer:</strong> apabila plat melepasi 1, ia kembali ke 0 dan menolak plat di kirinya ke hadapan sebanyak 1. Tolakan itu ialah bawaan.",
  s6Contoh: "Contoh: 1011₂ + 110₂",
  s6Step: "Langkah demi Langkah",
  numALbl6: "Nombor A (asas 2):", numBLbl6: "Nombor B (asas 2):",
  btnStart: "Mula", btnNext: "Lajur Seterusnya →", btnReset: "↻ Set Semula",
  addStep: "Lajur {c}: {x} + {y} + bawa {cin} = {s}  →  tulis {d}, bawa {co}",
  vizCarry: "bawa", vizBorrow: "pinjam",
  startPrompt: "Tekan 'Lajur Seterusnya →' untuk mula dari lajur paling kanan.",
  typeBinary: "Sila taip nombor menggunakan 0 dan 1 sahaja.",
  aBiggerB: "Untuk pelajaran ini, A mesti lebih besar atau sama dengan B.",
  answerBin: "Jawapan: {r} (asas 2)",
  s7Title: "➖ Tolak dalam Asas 2",
  s7P: "Empat peraturan. Kes yang sukar ialah 0 − 1: kita mesti pinjam 1 dari lajur di kiri, yang bernilai 2 dalam asas 2 (10₂ − 1 = 1).",
  r4Borrow: "1 (pinjam 1 dari kiri)",
  s7Odo: "<strong>Kaitan odometer:</strong> meminjam ialah odometer berjalan ke belakang. Satu plat berundur 1, dan plat di kanan mendapat 2.",
  s7Contoh: "Contoh: 1101₂ − 111₂",
  s7Step: "Langkah demi Langkah",
  numALbl7: "Nombor A (asas 2, mesti lebih besar):", numBLbl7: "Nombor B (asas 2):",
  subStep: "Lajur {c}: {x} − {y} − pinjam {bin} = {d}  →  tulis {d}",
  subNeg: "Lajur {c}: {x} − {y} − pinjam {bin} negatif, jadi pinjam 2  →  tulis {d}, pinjam 1 dari kiri",
  s8Title: "❓ Kuiz Latihan (Soalan Tanpa Had)",
  s8Topic: "Pilih topik:",
  optToBase10: "Tukar kepada Asas 10", optFromBase10: "Tukar dari Asas 10", optAdd: "Tambah dalam Asas 2",
  optSub: "Tolak dalam Asas 2", optAny: "Tukar Asas (mana-mana 2–9)",
  btnNewQ: "🎲 Soalan Baru", placeholderAns: "Jawapan anda", btnCheck: "Semak Jawapan",
  quizStart: "Klik 'Soalan Baru' untuk mula!",
  qToBase10: "Tukar {d} (asas {b}) kepada asas 10:",
  qFromBase10: "Tukar {n} (asas 10) kepada asas {b}:",
  qAdd: "Kira {x} + {y} (kedua-dua dalam asas 2). Jawapan dalam asas 2:",
  qSub: "Kira {x} − {y} (kedua-dua dalam asas 2). Jawapan dalam asas 2:",
  qAny: "Tukar {d} (asas {f}) kepada asas {t}:",
  correct: "✅ Betul!", wrong: "❌ Belum tepat. Jawapan betul: {a}", score: "Skor: {c} / {t}"
},
cn: {
  mainTitle: "进制：位值与转换",
  prevBtn: "← 上一步", nextBtn: "下一步 →",
  s1Title: "🔢 什么是进制？",
  s1P1: "我们每天使用十进制（基数10），即0到9共10个数字。当某一列达到10时，就进位1到下一列。",
  s1P2: "b进制的数只使用0到(b−1)这些数字。例如：五进制只用0、1、2、3、4。",
  s1P3: "想象汽车的里程表：每个数字轮只能显示0到(进制−1)。当一个数字轮转满一圈，就会把左边的数字轮推进1。",
  s1Toggle: "🎮 试试里程表模型", s1BaseLbl: "进制：", s1Inc: "+1", s1Reset: "↻ 重置",
  odoReadout: "显示：{d}{sub} = 十进制 {v}",
  s2Title: "📊 2、5、8进制中的数：位值",
  s2P1: "在b进制中，每一列的位值是b的幂，就像十进制使用百位、十位、个位一样。",
  s2Ex: "例：101101₂ 表示：",
  s2Try: "试试你自己的数：", s2Digits: "数字：", s2BaseLbl: "进制：", s2Show: "显示位值",
  s2Toggle: "🎮 试试里程表模型", s2Inc: "+1", s2Reset: "↻ 重置",
  tblDigit: "数字", tblPlace: "位值",
  invalidDigits: "{b}进制的数字只能使用0到{m}。",
  s3Title: "➡️ 从N进制转换为十进制（展开法）",
  s3P: "将每个数字乘以它的位值，然后全部相加。",
  s3Ex1: "例：将 1101₂ 转换为十进制", s3Ex2: "例：将 352₈ 转换为十进制",
  s3Try: "自己试试", s3Digits: "数字：", s3FromLbl: "原进制：", s3Btn: "转换为十进制",
  invalidBase: "数字不符合{b}进制。",
  totalLine: "总计 = {v}（十进制）",
  s4Title: "⬅️ 从十进制转换为N进制（反复除法）",
  s4P: "反复除以目标进制并保留余数，然后从下往上读取余数。",
  s4Ex: "例：将 45（十进制）转换为二进制",
  s4NumLbl: "数字（十进制）：", s4ToLbl: "目标进制：", s4Btn: "转换",
  enterValid: "请输入有效的非负整数。",
  ladderStep: "{n} ÷ {b} = {q}  余数 {r}",
  readBottom: "从下往上读余数：",
  ladderResult: "{n}（十进制）= {res}（{b}进制）",
  zeroLine: "{n}（十进制）= 0（{b}进制）",
  s5Title: "🔄 换进制：A进制 → 十进制 → B进制",
  s5P: "两个非十进制之间不一定能直接转换，请以十进制作为桥梁：",
  s5Flow: "第1步：A进制 → 十进制（展开，同第3张幻灯片）\n第2步：十进制 → B进制（反复除法，同第4张幻灯片）",
  s5Ex: "例：将 1011₂ 转换为八进制", s5Try: "自己试试",
  s5DigitsLbl: "数字：", s5FromLbl: "A进制：", s5ToLbl: "B进制：", s5Btn: "转换",
  step1: "第1步（{a}进制 → 十进制）：", step2: "第2步（十进制 → {b}进制）：",
  alreadyTen: "已经是十进制：{v}",
  zeroStop: "0 ÷ {b} → 停止（值为0）",
  readRemainders: "从下往上读余数",
  answerLine: "答案：{d}（{a}进制）= {r}（{b}进制）",
  s6Title: "➕ 二进制加法",
  s6P: "只需记住四条规则。二进制只用0和1，所以 1 + 1 已经“满”了，必须进位。",
  tblA: "A", tblB: "B", tblResult: "结果",
  r4Carry: "10（写0，进位1）",
  s6Odo: "<strong>里程表联系：</strong>当一个数字轮超过1时，它会回到0，并把左边的数字轮推进1。这个推进就是进位。",
  s6Contoh: "例：1011₂ + 110₂",
  s6Step: "自己一步一步来",
  numALbl6: "数字 A（二进制）：", numBLbl6: "数字 B（二进制）：",
  btnStart: "开始", btnNext: "下一列 →", btnReset: "↻ 重置",
  addStep: "第{c}列：{x} + {y} + 进位{cin} = {s}  →  写 {d}，进位 {co}",
  vizCarry: "进位", vizBorrow: "借位",
  startPrompt: "点击“下一列 →”从最右边一列开始。",
  typeBinary: "请只输入0和1组成的数字。",
  aBiggerB: "本课要求 A 大于或等于 B。",
  answerBin: "答案：{r}（二进制）",
  s7Title: "➖ 二进制减法",
  s7P: "只有四条规则。最难的情况是 0 − 1：必须从左边一列借1，它在二进制中值为2（10₂ − 1 = 1）。",
  r4Borrow: "1（从左边借1）",
  s7Odo: "<strong>里程表联系：</strong>借位就是里程表倒着转。一个数字轮后退1，右边的数字轮得到2。",
  s7Contoh: "例：1101₂ − 111₂",
  s7Step: "自己一步一步来",
  numALbl7: "数字 A（二进制，必须较大）：", numBLbl7: "数字 B（二进制）：",
  subStep: "第{c}列：{x} − {y} − 借位{bin} = {d}  →  写 {d}",
  subNeg: "第{c}列：{x} − {y} − 借位{bin} 为负，借2  →  写 {d}，左边借出1",
  s8Title: "❓ 练习测验（无限题目）",
  s8Topic: "选择主题：",
  optToBase10: "转换为十进制", optFromBase10: "从十进制转换", optAdd: "二进制加法",
  optSub: "二进制减法", optAny: "换进制（2–9任意）",
  btnNewQ: "🎲 新题目", placeholderAns: "你的答案", btnCheck: "检查答案",
  quizStart: "点击“新题目”开始！",
  qToBase10: "将 {d}（{b}进制）转换为十进制：",
  qFromBase10: "将 {n}（十进制）转换为 {b} 进制：",
  qAdd: "计算 {x} + {y}（均为二进制），用二进制作答：",
  qSub: "计算 {x} − {y}（均为二进制），用二进制作答：",
  qAny: "将 {d}（{f}进制）转换为 {t} 进制：",
  correct: "✅ 正确！", wrong: "❌ 不对。正确答案：{a}", score: "得分：{c} / {t}"
}
};

/* ===================== STATE & LANGUAGE ===================== */
let currentSlide = 1;
let lang = 'en';
const state = {
  ex2: {digits:'101101', base:2},
  r3: null, r4: null, r5: null,
  add: {st:null, idx:0, err:null},
  sub: {st:null, idx:0, err:null},
  q: null, fb: null, score: {c:0, t:0}
};
const renders = {};

function tr(k, v){
  const s = (L[lang][k] ?? L.en[k] ?? k);
  return s.replace(/\{(\w+)\}/g, (m,x) => (v && v[x] !== undefined) ? v[x] : m);
}
function reg(id, fn){ renders[id] = fn; fn(); }
function refreshAll(){ Object.values(renders).forEach(f => f()); }
function applyStatic(){
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = tr(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = tr(el.dataset.i18nHtml); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = tr(el.dataset.i18nPh); });
}
function setLang(l){
  if(!L[l]) l = 'en';
  lang = l;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === l));
  applyStatic();
  refreshAll();
}

/* ===================== HELPERS ===================== */
const SUBS = {'0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉'};
function sub(n){ return String(n).split('').map(c => SUBS[c] || c).join(''); }
function validDigits(s, b){ return !!s && [...s].every(c => /^\d$/.test(c) && +c < b); }
function rand(n){ return Math.floor(Math.random() * n); }
function padBits(s, n){ return s.padStart(n, '0').split('').map(Number); }

function showSlide(n){
  document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
  document.getElementById('slide-' + n).classList.add('active');
  currentSlide = n;
  document.getElementById('current-slide').textContent = n;
  document.getElementById('prev-btn').disabled = n === 1;
  document.getElementById('next-btn').disabled = n === 8;
}

/* ===================== ODOMETER MODEL ===================== */
class Odometer {
  constructor(containerId, base, numDigits){
    this.base = base;
    this.digits = new Array(numDigits).fill(0); // index 0 = rightmost
    this.container = document.getElementById(containerId);
    this.render();
  }
  setBase(base){ this.base = base; this.digits = this.digits.map(() => 0); this.render(); }
  increment(){
    let i = 0, carry = 1; const flipped = [];
    while(carry > 0 && i < this.digits.length){
      this.digits[i] += carry;
      if(this.digits[i] >= this.base){ this.digits[i] = 0; carry = 1; } else { carry = 0; }
      flipped.push(i); i++;
    }
    this.render(flipped);
  }
  reset(){ this.digits = this.digits.map(() => 0); this.render(); }
  value(){ let v = 0; for(let i = this.digits.length - 1; i >= 0; i--) v = v * this.base + this.digits[i]; return v; }
  digitsString(){ return this.digits.slice().reverse().join(''); }
  render(flippedIdx){
    this.container.innerHTML = '';
    for(let i = this.digits.length - 1; i >= 0; i--){
      const plate = document.createElement('div');
      plate.className = 'odo-plate' + (flippedIdx && flippedIdx.includes(i) ? ' flipping' : '');
      plate.textContent = this.digits[i];
      this.container.appendChild(plate);
    }
  }
}

/* ===================== SLIDE 1 ===================== */
function initSlide1(){
  const odo = new Odometer('odometer-1', 8, 3);
  document.getElementById('toggle-odo-1').addEventListener('click', () => {
    const p = document.getElementById('odo-panel-1');
    p.style.display = p.style.display === 'none' ? 'flex' : 'none';
    p.style.flexDirection = 'column';
  });
  document.getElementById('odo-base-1').addEventListener('change', e => { odo.setBase(+e.target.value); renders['odo-readout-1'](); });
  document.getElementById('odo-inc-1').addEventListener('click', () => { odo.increment(); renders['odo-readout-1'](); });
  document.getElementById('odo-reset-1').addEventListener('click', () => { odo.reset(); renders['odo-readout-1'](); });
  reg('odo-readout-1', () => {
    document.getElementById('odo-readout-1').textContent =
      tr('odoReadout', {d: odo.digitsString(), sub: sub(odo.base), v: odo.value()});
  });
}

/* ===================== SLIDE 2 ===================== */
function renderPlaceTable(digits, base){
  const d = digits.split('').map(Number), n = d.length;
  const head = `<tr><th>${tr('tblDigit')}</th>` + d.map(x => `<td>${x}</td>`).join('') + '</tr>';
  const place = `<tr><th>${tr('tblPlace')}</th>` + d.map((x,i) => `<td>${base}<sup>${n-1-i}</sup></td>`).join('') + '</tr>';
  return head + place;
}
function expansionHTML(digits, base){
  const d = digits.split('').map(Number), n = d.length;
  const terms = d.map((x,i) => `(${x}×${base}<sup>${n-1-i}</sup>)`).join(' + ');
  return `${terms} = ${parseInt(digits, base)}<sub>10</sub>`;
}
function initSlide2(){
  reg('place-table-2', () => { document.getElementById('place-table-2').innerHTML = renderPlaceTable(state.ex2.digits, state.ex2.base); });
  reg('expansion-example-2', () => { document.getElementById('expansion-example-2').innerHTML = expansionHTML(state.ex2.digits, state.ex2.base); });

  const odo2 = new Odometer('odometer-2', 2, 4);
  document.getElementById('toggle-odo-2').addEventListener('click', () => {
    const p = document.getElementById('odo-panel-2');
    p.style.display = p.style.display === 'none' ? 'block' : 'none';
  });
  document.getElementById('odo-inc-2').addEventListener('click', () => odo2.increment());
  document.getElementById('odo-reset-2').addEventListener('click', () => odo2.reset());
  document.getElementById('show-table-btn-2').addEventListener('click', () => {
    const digits = document.getElementById('custom-digits-2').value.trim();
    const base = +document.getElementById('custom-base-2').value;
    if(!validDigits(digits, base)){ alert(tr('invalidDigits', {m: base-1, b: base})); return; }
    state.ex2 = {digits, base};
    renders['place-table-2'](); renders['expansion-example-2']();
  });
}

/* ===================== SLIDE 3 ===================== */
function workedToBase10(digits, base){
  const d = digits.split('').map(Number), n = d.length;
  const lines = d.map((x,i) => `${x} × ${base}^${n-1-i} = ${x * Math.pow(base, n-1-i)}`);
  return lines.join('\n') + '\n————————\n' + tr('totalLine', {v: parseInt(digits, base)});
}
function initSlide3(){
  reg('worked-3a', () => { document.getElementById('worked-3a').textContent = workedToBase10('1101', 2); });
  reg('worked-3b', () => { document.getElementById('worked-3b').textContent = workedToBase10('352', 8); });
  reg('result-3', () => {
    const el = document.getElementById('result-3');
    if(!state.r3){ el.textContent = ''; return; }
    const {digits, base} = state.r3;
    if(!validDigits(digits, base)){ el.textContent = tr('invalidBase', {b: base}); return; }
    el.innerHTML = `${digits}<sub>${base}</sub> = <strong>${parseInt(digits, base)}</strong><sub>10</sub>`;
  });
  document.getElementById('convert-btn-3').addEventListener('click', () => {
    state.r3 = {digits: document.getElementById('input-digits-3').value.trim(), base: +document.getElementById('input-base-3').value};
    renders['result-3']();
  });
}

/* ===================== SLIDE 4 ===================== */
function ladderText(num, base){
  if(num === 0) return tr('zeroLine', {n: 0, b: base});
  const steps = []; let n = num;
  while(n > 0){ const q = Math.floor(n / base), r = n % base; steps.push(tr('ladderStep', {n, b: base, q, r})); n = q; }
  const rem = []; let m = num;
  while(m > 0){ rem.unshift(m % base); m = Math.floor(m / base); }
  return steps.join('\n') + '\n\n' + tr('readBottom') + '\n' + tr('ladderResult', {n: num, res: rem.join(''), b: base});
}
function initSlide4(){
  reg('ladder-4a', () => { document.getElementById('ladder-4a').textContent = ladderText(45, 2); });
  reg('ladder-4b', () => {
    const el = document.getElementById('ladder-4b');
    if(!state.r4){ el.textContent = ''; return; }
    if(isNaN(state.r4.num) || state.r4.num < 0){ el.textContent = tr('enterValid'); return; }
    el.textContent = ladderText(state.r4.num, state.r4.base);
  });
  document.getElementById('convert-btn-4').addEventListener('click', () => {
    state.r4 = {num: parseInt(document.getElementById('input-num-4').value, 10), base: +document.getElementById('input-base-4').value};
    renders['ladder-4b']();
  });
}

/* ===================== SLIDE 5: CHANGE BASE ===================== */
function changeBaseParts(digits, fromB, toB){
  const value = parseInt(digits, fromB), d = digits.split('').map(Number), n = d.length;
  const expansion = fromB === 10
    ? tr('alreadyTen', {v: value})
    : d.map((x,i) => `${x} × ${fromB}^${n-1-i} = ${x * Math.pow(fromB, n-1-i)}`).join('\n') + '\n————————\n' + tr('totalLine', {v: value});
  let division;
  if(toB === 10) division = tr('alreadyTen', {v: value});
  else if(value === 0) division = tr('zeroStop', {b: toB});
  else {
    const lines = []; let v = value;
    while(v > 0){ lines.push(tr('ladderStep', {n: v, b: toB, q: Math.floor(v / toB), r: v % toB})); v = Math.floor(v / toB); }
    division = lines.join('\n') + '\n' + tr('readRemainders');
  }
  return {expansion, division, result: value.toString(toB)};
}
function renderChange(){
  const exp = document.getElementById('chg-expansion'), div = document.getElementById('chg-division'), res = document.getElementById('chg-result');
  const s = state.r5;
  if(!s){ exp.textContent = ''; div.textContent = ''; res.innerHTML = ''; return; }
  if(!validDigits(s.digits, s.fromB)){
    exp.textContent = tr('invalidDigits', {m: s.fromB - 1, b: s.fromB});
    div.textContent = ''; res.innerHTML = ''; return;
  }
  const p = changeBaseParts(s.digits, s.fromB, s.toB);
  exp.textContent = tr('step1', {a: s.fromB}) + '\n' + p.expansion;
  div.textContent = tr('step2', {b: s.toB}) + '\n' + p.division;
  res.innerHTML = `${s.digits}<sub>${s.fromB}</sub> = <strong>${p.result}</strong><sub>${s.toB}</sub>`;
}
function initSlide5(){
  reg('worked-5', () => {
    const p = changeBaseParts('1011', 2, 8);
    document.getElementById('worked-5').textContent =
      tr('step1', {a: 2}) + '\n' + p.expansion + '\n\n' + tr('step2', {b: 8}) + '\n' + p.division + '\n\n' +
      tr('answerLine', {d: '1011', a: 2, r: p.result, b: 8});
  });
  reg('chg', renderChange);
  document.getElementById('chg-convert').addEventListener('click', () => {
    state.r5 = {digits: document.getElementById('chg-digits').value.trim(),
                fromB: +document.getElementById('chg-from').value,
                toB: +document.getElementById('chg-to').value};
    renderChange();
  });
}

/* ===================== SLIDES 6 & 7: ADDITION / SUBTRACTION ===================== */
function computeAdd(a, b){
  const n = Math.max(a.length, b.length) + 1;
  const A = padBits(a, n), B = padBits(b, n);
  const steps = []; let cin = 0;
  for(let i = n-1; i >= 0; i--){
    const s = A[i] + B[i] + cin;
    steps.push({c: n-i, col: i, x: A[i], y: B[i], cin, s, d: s % 2, co: Math.floor(s / 2)});
    cin = Math.floor(s / 2);
  }
  return {n, steps, result: steps.map(x => x.d).reverse().join('').replace(/^0+(?=.)/, '')};
}
function computeSub(a, b){
  const n = Math.max(a.length, b.length);
  const A = padBits(a, n), B = padBits(b, n);
  const steps = []; let bin = 0;
  for(let i = n-1; i >= 0; i--){
    let d = A[i] - B[i] - bin, bo = 0;
    if(d < 0){ d += 2; bo = 1; }
    steps.push({c: n-i, col: i, x: A[i], y: B[i], bin, d, bo});
    bin = bo;
  }
  return {n, steps, result: steps.map(x => x.d).reverse().join('').replace(/^0+(?=.)/, '')};
}
function stepText(kind, s){
  if(kind === 'add') return tr('addStep', {c: s.c, x: s.x, y: s.y, cin: s.cin, s: s.s, d: s.d, co: s.co});
  return s.bo ? tr('subNeg', {c: s.c, x: s.x, y: s.y, bin: s.bin, d: s.d}) : tr('subStep', {c: s.c, x: s.x, y: s.y, bin: s.bin, d: s.d});
}
function drawColumnViz(vizId, st, idx, kind){
  const {n, A, B, steps} = st;
  const resRow = Array(n).fill('?'), carryRow = Array(n).fill('');
  const activeCol = idx < steps.length ? steps[idx].col : -1;
  for(let k = 0; k < idx; k++){
    const s = steps[k];
    resRow[s.col] = s.d;
    const out = kind === 'add' ? s.co : s.bo;
    if(out && s.col - 1 >= 0) carryRow[s.col - 1] = 1;
  }
  const cls = i => (i === activeCol ? 'active' : '');
  const cell = (v, c) => `<td class="${c || ''}">${v}</td>`;
  const op = kind === 'add' ? '+' : '−';
  const label = kind === 'add' ? tr('vizCarry') : tr('vizBorrow');
  let html = '<table class="col-table">';
  html += `<tr class="carry-row"><th>${label}</th>` + carryRow.map(v => cell(v, 'carry-cell')).join('') + '</tr>';
  html += '<tr><th>A</th>' + A.map((v,i) => cell(v, cls(i))).join('') + '</tr>';
  html += `<tr><th>${op}</th>` + B.map((v,i) => cell(v, cls(i))).join('') + '</tr>';
  html += '<tr class="result-row"><th>=</th>' + resRow.map((v,i) => cell(v, cls(i))).join('') + '</tr>';
  html += '</table>';
  document.getElementById(vizId).innerHTML = html;
}
function renderArith(kind){
  const S = state[kind];
  const viz = document.getElementById(kind + '-viz'), log = document.getElementById(kind + '-log');
  if(S.err){ viz.innerHTML = ''; log.textContent = S.err; return; }
  if(!S.st){ viz.innerHTML = ''; log.textContent = ''; return; }
  drawColumnViz(kind + '-viz', S.st, S.idx, kind);
  if(S.idx === 0){ log.textContent = tr('startPrompt'); return; }
  let out = S.st.steps.slice(0, S.idx).map(s => stepText(kind, s)).join('\n');
  if(S.idx === S.st.steps.length) out += '\n\n' + tr('answerBin', {r: S.st.result});
  log.textContent = out;
}
function startArith(kind){
  const a = document.getElementById(kind + '-a').value.trim();
  const b = document.getElementById(kind + '-b').value.trim();
  const S = state[kind];
  if(!validDigits(a, 2) || !validDigits(b, 2)){ S.st = null; S.err = tr('typeBinary'); renderArith(kind); return; }
  if(kind === 'sub' && parseInt(a, 2) < parseInt(b, 2)){ S.st = null; S.err = tr('aBiggerB'); renderArith(kind); return; }
  S.st = kind === 'add' ? computeAdd(a, b) : computeSub(a, b);
  S.idx = 0; S.err = null;
  renderArith(kind);
}
function stepArith(kind){
  const S = state[kind];
  if(!S.st){ startArith(kind); if(!S.st) return; }
  if(S.idx < S.st.steps.length) S.idx++;
  renderArith(kind);
}
function resetArith(kind){
  state[kind] = {st: null, idx: 0, err: null};
  renderArith(kind);
}
function initSlide6(){
  reg('worked-6', () => {
    const ex = computeAdd('1011', '110');
    document.getElementById('worked-6').textContent =
      ex.steps.map(s => stepText('add', s)).join('\n') + '\n\n' + tr('answerBin', {r: ex.result});
  });
  reg('add-log', () => renderArith('add'));
  document.getElementById('add-start').addEventListener('click', () => startArith('add'));
  document.getElementById('add-next').addEventListener('click', () => stepArith('add'));
  document.getElementById('add-reset').addEventListener('click', () => resetArith('add'));
}
function initSlide7(){
  reg('worked-7', () => {
    const ex = computeSub('1101', '111');
    document.getElementById('worked-7').textContent =
      ex.steps.map(s => stepText('sub', s)).join('\n') + '\n\n' + tr('answerBin', {r: ex.result});
  });
  reg('sub-log', () => renderArith('sub'));
  document.getElementById('sub-start').addEventListener('click', () => startArith('sub'));
  document.getElementById('sub-next').addEventListener('click', () => stepArith('sub'));
  document.getElementById('sub-reset').addEventListener('click', () => resetArith('sub'));
}

/* ===================== SLIDE 8: QUIZ ===================== */
function buildQuestion(topic){
  if(topic === 'anyBase'){
    const f = 2 + rand(8);
    let t; do { t = 2 + rand(8); } while(t === f);
    const v = 1 + rand(Math.pow(f, 3) - 1);
    return {topic, f, t, d: v.toString(f), ans: v.toString(t)};
  }
  if(topic === 'addBase2'){
    const x = 1 + rand(7), y = 1 + rand(7);
    return {topic, x: x.toString(2), y: y.toString(2), ans: (x + y).toString(2)};
  }
  if(topic === 'subBase2'){
    const x = 2 + rand(6), y = 1 + rand(x - 1);
    return {topic, x: x.toString(2), y: y.toString(2), ans: (x - y).toString(2)};
  }
  if(topic === 'fromBase10'){
    const n = 5 + rand(120), b = [2,5,8][rand(3)];
    return {topic, n, b, ans: n.toString(b)};
  }
  const b = [2,5,8][rand(3)], nd = 2 + rand(2);
  let s = String(1 + rand(b - 1));
  for(let i = 1; i < nd; i++) s += rand(b);
  return {topic, d: s, b, ans: parseInt(s, b)};
}
function questionText(q){
  switch(q.topic){
    case 'toBase10':   return tr('qToBase10', {d: q.d, b: q.b});
    case 'fromBase10': return tr('qFromBase10', {n: q.n, b: q.b});
    case 'addBase2':   return tr('qAdd', {x: q.x, y: q.y});
    case 'subBase2':   return tr('qSub', {x: q.x, y: q.y});
    case 'anyBase':    return tr('qAny', {d: q.d, f: q.f, t: q.t});
  }
  return '';
}
function renderQuiz(){
  document.getElementById('quiz-question-box').textContent = state.q ? questionText(state.q) : tr('quizStart');
  const fb = document.getElementById('quiz-feedback');
  if(!state.fb){ fb.textContent = ''; fb.className = 'quiz-feedback'; }
  else if(state.fb.ok){ fb.textContent = tr('correct'); fb.className = 'quiz-feedback correct'; }
  else { fb.textContent = tr('wrong', {a: state.fb.ans}); fb.className = 'quiz-feedback incorrect'; }
  document.getElementById('score-text').textContent = tr('score', {c: state.score.c, t: state.score.t});
}
function newQuestion(){
  state.q = buildQuestion(document.getElementById('quiz-topic').value);
  state.fb = null;
  document.getElementById('quiz-answer-input').value = '';
  renderQuiz();
}
function checkAnswer(){
  if(!state.q || state.fb) return;
  const input = document.getElementById('quiz-answer-input').value.trim();
  const ok = state.q.topic === 'toBase10'
    ? input !== '' && Number(input) === state.q.ans
    : input === String(state.q.ans);
  state.score.t++;
  if(ok) state.score.c++;
  state.fb = {ok, ans: state.q.ans};
  renderQuiz();
}
function initSlide8(){
  reg('quiz', renderQuiz);
  document.getElementById('new-question-btn').addEventListener('click', newQuestion);
  document.getElementById('check-answer-btn').addEventListener('click', checkAnswer);
}

/* ===================== INIT ===================== */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  document.getElementById('prev-btn').addEventListener('click', () => { if(currentSlide > 1) showSlide(currentSlide - 1); });
  document.getElementById('next-btn').addEventListener('click', () => { if(currentSlide < 8) showSlide(currentSlide + 1); });

  initSlide1(); initSlide2(); initSlide3(); initSlide4();
  initSlide5(); initSlide6(); initSlide7(); initSlide8();

  showSlide(1);
  const p = new URLSearchParams(window.location.search).get('lang');
  setLang(L[p] ? p : 'en');
});

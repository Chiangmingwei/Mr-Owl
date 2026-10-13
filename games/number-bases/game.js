/* Number Bases Interactive Slide - core logic */
let currentSlide = 1;
let quizScore = { correct: 0, total: 0 };
let currentQuizAnswer = null;

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSlide1();
  initSlide2();
  initSlide3();
  initSlide4();
  initSlide6();
  initSlide7();
  initSlide8();
  showSlide(1);
});

function initNavigation(){
  document.getElementById('prev-btn').addEventListener('click', ()=>{ if(currentSlide>1) showSlide(currentSlide-1); });
  document.getElementById('next-btn').addEventListener('click', ()=>{ if(currentSlide<8) showSlide(currentSlide+1); });
}
function showSlide(n){
  document.querySelectorAll('.slide').forEach(s=>s.classList.remove('active'));
  document.getElementById('slide-'+n).classList.add('active');
  currentSlide=n;
  document.getElementById('current-slide').textContent=n;
  document.getElementById('prev-btn').disabled = n===1;
  document.getElementById('next-btn').disabled = n===8;
}

/* ===================== ODOMETER MODEL ===================== */
/* Represents a row of plates; each plate cycles 0..base-1; overflow carries to next plate (left) */
class Odometer {
  constructor(containerId, base, numDigits){
    this.base = base;
    this.digits = new Array(numDigits).fill(0); // index 0 = rightmost (least significant)
    this.container = document.getElementById(containerId);
    this.render();
  }
  setBase(base){
    this.base = base;
    this.digits = this.digits.map(()=>0);
    this.render();
  }
  increment(){
    let i = 0;
    let carry = 1;
    const flipped = [];
    while(carry>0 && i<this.digits.length){
      this.digits[i] += carry;
      if(this.digits[i] >= this.base){
        this.digits[i] = 0;
        carry = 1;
      } else {
        carry = 0;
      }
      flipped.push(i);
      i++;
    }
    this.render(flipped);
  }
  reset(){
    this.digits = this.digits.map(()=>0);
    this.render();
  }
  value(){
    let v=0;
    for(let i=this.digits.length-1;i>=0;i--) v = v*this.base + this.digits[i];
    return v;
  }
  digitsString(){
    return this.digits.slice().reverse().join('');
  }
  render(flippedIdx){
    this.container.innerHTML='';
    for(let i=this.digits.length-1;i>=0;i--){
      const plate = document.createElement('div');
      plate.className='odo-plate'+(flippedIdx && flippedIdx.includes(i) ? ' flipping':'');
      plate.textContent = this.digits[i];
      this.container.appendChild(plate);
    }
  }
}

/* ===================== SLIDE 1: Intro Odometer ===================== */
function initSlide1(){
  const toggleBtn = document.getElementById('toggle-odo-1');
  const panel = document.getElementById('odo-panel-1');
  toggleBtn.addEventListener('click', ()=>{
    panel.style.display = panel.style.display==='none' ? 'flex' : 'none';
    panel.style.flexDirection='column';
  });

  let odo = new Odometer('odometer-1', 8, 3);
  updateReadout1(odo);

  document.getElementById('odo-base-1').addEventListener('change', (e)=>{
    odo.setBase(parseInt(e.target.value));
    updateReadout1(odo);
  });
  document.getElementById('odo-inc-1').addEventListener('click', ()=>{
    odo.increment();
    updateReadout1(odo);
  });
  document.getElementById('odo-reset-1').addEventListener('click', ()=>{
    odo.reset();
    updateReadout1(odo);
  });

  function updateReadout1(o){
    document.getElementById('odo-readout-1').textContent =
      `Showing: ${o.digitsString()}${subscript(o.base)}  =  ${o.value()} in base 10`;
  }
}

/* ===================== SLIDE 2: Place Values ===================== */
function initSlide2(){
  document.getElementById('toggle-odo-2').addEventListener('click', ()=>{
    const panel = document.getElementById('odo-panel-2');
    panel.style.display = panel.style.display==='none' ? 'block' : 'none';
  });

  let odo2 = new Odometer('odometer-2', 2, 4);
  document.getElementById('odo-inc-2').addEventListener('click', ()=> odo2.increment());
  document.getElementById('odo-reset-2').addEventListener('click', ()=> odo2.reset());

  // default example table: 101101 base 2
  renderPlaceTable('place-table-2', '101101', 2);
  renderExpansion('expansion-example-2', '101101', 2);

  document.getElementById('show-table-btn-2').addEventListener('click', ()=>{
    const digits = document.getElementById('custom-digits-2').value.trim();
    const base = parseInt(document.getElementById('custom-base-2').value);
    if(!isValidInBase(digits, base)){ alert('Digits must only use 0 to '+(base-1)+' for base '+base); return; }
    renderPlaceTable('place-table-2', digits, base);
    renderExpansion('expansion-example-2', digits, base);
  });
}

function renderPlaceTable(tableId, digitsStr, base){
  const table = document.getElementById(tableId);
  const digits = digitsStr.split('').map(Number);
  const n = digits.length;
  let headerRow = '<tr><th>Digit</th>' + digits.map(d=>`<td>${d}</td>`).join('') + '</tr>';
  let placeRow = '<tr><th>Place Value</th>' + digits.map((d,i)=>{
    const power = n-1-i;
    return `<td>${base}<sup>${power}</sup></td>`;
  }).join('') + '</tr>';
  table.innerHTML = headerRow + placeRow;
}

function renderExpansion(elId, digitsStr, base){
  const digits = digitsStr.split('').map(Number);
  const n = digits.length;
  const terms = digits.map((d,i)=>{
    const power = n-1-i;
    return `(${d}×${base}<sup>${power}</sup>)`;
  }).join(' + ');
  const value = parseInt(digitsStr, base);
  document.getElementById(elId).innerHTML = `${terms} = ${value}<sub>10</sub>`;
}

function isValidInBase(str, base){
  if(!str) return false;
  for(const ch of str){
    const d = parseInt(ch,10);
    if(isNaN(d) || d>=base || d<0) return false;
  }
  return true;
}

/* ===================== SLIDE 3: Base N -> Base 10 ===================== */
function initSlide3(){
  renderWorkedToBase10('worked-3a','1101',2);
  renderWorkedToBase10('worked-3b','352',8);

  document.getElementById('convert-btn-3').addEventListener('click', ()=>{
    const digits = document.getElementById('input-digits-3').value.trim();
    const base = parseInt(document.getElementById('input-base-3').value);
    if(!isValidInBase(digits, base)){
      document.getElementById('result-3').textContent = 'Invalid digits for base '+base;
      return;
    }
    const val = parseInt(digits, base);
    document.getElementById('result-3').innerHTML = `${digits}<sub>${base}</sub> = <strong>${val}</strong><sub>10</sub>`;
  });
}

function renderWorkedToBase10(elId, digitsStr, base){
  const digits = digitsStr.split('').map(Number);
  const n = digits.length;
  const lines = digits.map((d,i)=>{
    const power = n-1-i;
    const placeVal = Math.pow(base,power);
    return `${d} × ${base}^${power} = ${d*placeVal}`;
  });
  const total = parseInt(digitsStr, base);
  document.getElementById(elId).innerHTML = lines.join('\n') + `\n————————\nTotal = ${total} (base 10)`;
}

/* ===================== SLIDE 4: Base 10 -> Base N ===================== */
function initSlide4(){
  renderDivisionLadder('ladder-4a', 45, 2);

  document.getElementById('convert-btn-4').addEventListener('click', ()=>{
    const num = parseInt(document.getElementById('input-num-4').value);
    const base = parseInt(document.getElementById('input-base-4').value);
    if(isNaN(num) || num<0){
      document.getElementById('ladder-4b').textContent = 'Enter a valid non-negative number';
      return;
    }
    renderDivisionLadder('ladder-4b', num, base);
  });
}

function renderDivisionLadder(elId, num, base){
  if(num===0){
    document.getElementById(elId).textContent = `0 in base 10 = 0 in base ${base}`;
    return;
  }
  let n = num;
  const steps = [];
  while(n>0){
    const q = Math.floor(n/base);
    const r = n % base;
    steps.push(`${n} ÷ ${base} = ${q}  remainder ${r}`);
    n = q;
  }
  const remainders = [];
  let n2 = num;
  while(n2>0){
    remainders.unshift(n2 % base);
    n2 = Math.floor(n2/base);
  }
  const result = remainders.join('');
  document.getElementById(elId).textContent =
    steps.join('\n') + `\n\nRead remainders bottom→top:\n${num} (base 10) = ${result} (base ${base})`;
}

/* ===================== SLIDE 8: QUIZ (infinite generator) ===================== */
function initSlide8(){
  document.getElementById('new-question-btn').addEventListener('click', generateQuizQuestion);
  document.getElementById('check-answer-btn').addEventListener('click', checkQuizAnswer);
}

function generateQuizQuestion(){
  const topic = document.getElementById('quiz-topic').value;
  const box = document.getElementById('quiz-question-box');
  const feedback = document.getElementById('quiz-feedback');
  feedback.textContent='';
  feedback.className='quiz-feedback';
  document.getElementById('quiz-answer-input').value='';

  const bases = [2,5,8];
  const base = bases[Math.floor(Math.random()*bases.length)];

  if(topic==='addBase2'){
    const x=1+Math.floor(Math.random()*7), y=1+Math.floor(Math.random()*7); // up to 3 binary digits
    currentQuizAnswer=(x+y).toString(2);
    box.innerHTML=`Calculate <strong>${x.toString(2)}</strong><sub>2</sub> + <strong>${y.toString(2)}</strong><sub>2</sub> (answer in base 2):`;
  } else if(topic==='subBase2'){
    const x=2+Math.floor(Math.random()*6), y=1+Math.floor(Math.random()*(x-1));
    currentQuizAnswer=(x-y).toString(2);
    box.innerHTML=`Calculate <strong>${x.toString(2)}</strong><sub>2</sub> − <strong>${y.toString(2)}</strong><sub>2</sub> (answer in base 2):`;
  } else if(topic==='toBase10'){
    const numDigits = 2 + Math.floor(Math.random()*2); // 2-3 digits
    let digitsArr=[];
    digitsArr.push(1 + Math.floor(Math.random()*(base-1))); // leading digit non-zero
    for(let i=1;i<numDigits;i++) digitsArr.push(Math.floor(Math.random()*base));
    const digitsStr = digitsArr.join('');
    currentQuizAnswer = parseInt(digitsStr, base);
    box.innerHTML = `Convert <strong>${digitsStr}</strong><sub>${base}</sub> to base 10:`;
  } else {
    const num = 5 + Math.floor(Math.random()*120); // small number up to ~124
    currentQuizAnswer = toBaseString(num, base);
    box.innerHTML = `Convert <strong>${num}</strong> (base 10) to base <strong>${base}</strong>:`;
    box.dataset.base = base;
  }
  document.getElementById('quiz-question-box').dataset.topic = topic;
}

function toBaseString(num, base){
  if(num===0) return '0';
  let n=num, digits=[];
  while(n>0){ digits.unshift(n%base); n=Math.floor(n/base); }
  return digits.join('');
}

function checkQuizAnswer(){
  if(currentQuizAnswer===null){ return; }
  const topic = document.getElementById('quiz-question-box').dataset.topic;
  const userAns = document.getElementById('quiz-answer-input').value.trim();
  const feedback = document.getElementById('quiz-feedback');
  let correct=false;

  if(topic==='toBase10'){
    correct = parseInt(userAns,10) === currentQuizAnswer;
  } else {
    correct = userAns === String(currentQuizAnswer);
  }

  quizScore.total++;
  if(correct){
    quizScore.correct++;
    feedback.textContent = '✅ Correct!';
    feedback.className = 'quiz-feedback correct';
  } else {
    feedback.textContent = `❌ Not quite. Correct answer: ${currentQuizAnswer}`;
    feedback.className = 'quiz-feedback incorrect';
  }
  document.getElementById('score-text').textContent = `Score: ${quizScore.correct} / ${quizScore.total}`;
}

/* Helper: unicode subscript for base label */
function subscript(n){
  const map={'0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉'};
  return String(n).split('').map(c=>map[c]||c).join('');
}


/* ===================== SLIDE 6 & 7: BINARY ADDITION / SUBTRACTION ===================== */
const arithState = { add:{st:null, idx:0}, sub:{st:null, idx:0} };

function padBits(s, n){ return s.padStart(n,'0').split('').map(Number); }

function computeAddSteps(a,b){
  const n = Math.max(a.length,b.length)+1; // +1 column so a final carry shows up
  const A = padBits(a,n), B = padBits(b,n);
  const steps=[]; let carry=0;
  for(let i=n-1;i>=0;i--){
    const sum = A[i]+B[i]+carry;
    const digit = sum%2, cout = Math.floor(sum/2);
    steps.push({col:i, digit, cout,
      text:`Column ${n-i}: ${A[i]} + ${B[i]} + carry ${carry} = ${sum}  →  write ${digit}, carry ${cout}`});
    carry = cout;
  }
  const result = steps.map(x=>x.digit).reverse().join('').replace(/^0+(?=.)/,'');
  return {n, A, B, steps, result, kind:'add', opSymbol:'+'};
}

function computeSubSteps(a,b){
  const n = Math.max(a.length,b.length);
  const A = padBits(a,n), B = padBits(b,n);
  const steps=[]; let borrow=0;
  for(let i=n-1;i>=0;i--){
    let d = A[i]-B[i]-borrow, bout = 0;
    if(d<0){ d+=2; bout=1; }
    const text = bout
      ? `Column ${n-i}: ${A[i]} − ${B[i]} − borrow ${borrow} is negative, so borrow 2  →  write ${d}, borrow 1 from the left`
      : `Column ${n-i}: ${A[i]} − ${B[i]} − borrow ${borrow} = ${d}  →  write ${d}`;
    steps.push({col:i, digit:d, cout:bout, text});
    borrow = bout;
  }
  const result = steps.map(x=>x.digit).reverse().join('').replace(/^0+(?=.)/,'');
  return {n, A, B, steps, result, kind:'sub', opSymbol:'−'};
}

function drawColumnViz(vizId, st, idx){
  const {n,A,B,steps,kind,opSymbol} = st;
  const resRow = Array(n).fill('?');
  const carryRow = Array(n).fill('');
  const activeCol = idx < steps.length ? steps[idx].col : -1;
  for(let k=0;k<idx;k++){
    const s = steps[k];
    resRow[s.col] = s.digit;
    if(s.col-1 >= 0 && s.cout) carryRow[s.col-1] = 1;
  }
  const cell = (txt, cls) => `<td class="${cls||''}">${txt}</td>`;
  const actCls = i => (i===activeCol ? 'active' : '');
  const label = kind==='add' ? 'carry' : 'borrow';
  let html = '<table class="col-table">';
  html += `<tr class="carry-row"><th>${label}</th>` + carryRow.map((v,i)=>cell(v,'carry-cell')).join('') + '</tr>';
  html += '<tr><th>A</th>' + A.map((v,i)=>cell(v,actCls(i))).join('') + '</tr>';
  html += `<tr><th>${opSymbol}</th>` + B.map((v,i)=>cell(v,actCls(i))).join('') + '</tr>';
  html += '<tr class="result-row"><th>=</th>' + resRow.map((v,i)=>cell(v,actCls(i))).join('') + '</tr>';
  html += '</table>';
  document.getElementById(vizId).innerHTML = html;
}

function startArith(kind){
  const pref = kind==='add' ? 'add' : 'sub';
  const aStr = document.getElementById(pref+'-a').value.trim();
  const bStr = document.getElementById(pref+'-b').value.trim();
  const log = document.getElementById(pref+'-log');
  if(!isValidInBase(aStr,2) || !isValidInBase(bStr,2)){
    log.textContent = 'Please type numbers using only 0 and 1.';
    arithState[kind] = {st:null, idx:0};
    return;
  }
  if(kind==='sub' && parseInt(aStr,2) < parseInt(bStr,2)){
    log.textContent = 'For this lesson, A must be bigger than or equal to B.';
    arithState[kind] = {st:null, idx:0};
    return;
  }
  const st = kind==='add' ? computeAddSteps(aStr,bStr) : computeSubSteps(aStr,bStr);
  arithState[kind] = {st, idx:0};
  drawColumnViz(pref+'-viz', st, 0);
  log.textContent = 'Press "Next Column →" to start from the rightmost column.';
}

function stepArith(kind){
  const pref = kind==='add' ? 'add' : 'sub';
  if(!arithState[kind].st){ startArith(kind); if(!arithState[kind].st) return; }
  const s = arithState[kind];
  if(s.idx < s.st.steps.length) s.idx++;
  drawColumnViz(pref+'-viz', s.st, s.idx);
  const lines = s.st.steps.slice(0, s.idx).map(x=>x.text);
  let out = lines.join('\n');
  if(s.idx === s.st.steps.length){
    out += `\n\nAnswer: ${s.st.result} (base 2)`;
  }
  document.getElementById(pref+'-log').textContent = out;
}

function resetArith(kind){
  const pref = kind==='add' ? 'add' : 'sub';
  arithState[kind] = {st:null, idx:0};
  document.getElementById(pref+'-viz').innerHTML = '';
  document.getElementById(pref+'-log').textContent = '';
}

function initSlide6(){
  // Worked Contoh: 1011 + 110
  const ex = computeAddSteps('1011','110');
  document.getElementById('worked-6').textContent =
    ex.steps.slice().reverse().map(x=>x.text).join('\n') + `\n\nAnswer: ${ex.result} (base 2)`;
  document.getElementById('add-start').addEventListener('click', ()=>startArith('add'));
  document.getElementById('add-next').addEventListener('click', ()=>stepArith('add'));
  document.getElementById('add-reset').addEventListener('click', ()=>resetArith('add'));
}

function initSlide7(){
  // Worked Contoh: 1101 - 111
  const ex = computeSubSteps('1101','111');
  document.getElementById('worked-7').textContent =
    ex.steps.slice().reverse().map(x=>x.text).join('\n') + `\n\nAnswer: ${ex.result} (base 2)`;
  document.getElementById('sub-start').addEventListener('click', ()=>startArith('sub'));
  document.getElementById('sub-next').addEventListener('click', ()=>stepArith('sub'));
  document.getElementById('sub-reset').addEventListener('click', ()=>resetArith('sub'));
}

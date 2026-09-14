// Quiz logic - Tagalog UI
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

let settings = { mode: "mixed", topic: "all", count: 10 };
let currentSubject = null;
let cardPpt = "all", cardTopic = "all", cardDeck = [], cardIdx = 0, cardFlipped = false;
let quiz = []; // shuffled questions for this session
let answers = {}; // id -> string | string[]
let current = 0;
let submitted = false;
let lastResults = [];

const TYPE_LABEL = { mc: "Multiple Choice", id: "Pagkakakilanlan", enum: "Enumerasyon" };

function norm(s) {
  return (s || "").toLowerCase().trim().replace(/\s+/g, " ").replace(/[.,!?;:()"'\-–]/g, "");
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function initStats() {
  const bank = currentSubject ? currentSubject.bank : QUESTION_BANK;
  $("#statTotal").textContent = bank.length;
  $("#statMC").textContent = bank.filter(q => q.type === "mc").length;
  $("#statID").textContent = bank.filter(q => q.type === "id").length;
  $("#statEnum").textContent = bank.filter(q => q.type === "enum").length;
}

function renderSubjects() {
  const g = $("#subjGrid"); g.innerHTML = "";
  SUBJECTS.forEach(s => {
    const mc = s.bank.filter(q => q.type === "mc").length;
    const id = s.bank.filter(q => q.type === "id").length;
    const en = s.bank.filter(q => q.type === "enum").length;
    const card = document.createElement("button");
    card.className = "subj-card";
    card.innerHTML = `<b></b><span class="subj-desc"></span><span class="subj-meta"></span>`;
    card.querySelector("b").textContent = s.title;
    card.querySelector(".subj-desc").textContent = s.desc;
    card.querySelector(".subj-meta").textContent = `${s.bank.length} tanong • MC ${mc} • ID ${id} • Enum ${en}`;
    card.addEventListener("click", () => selectSubject(s.id));
    g.appendChild(card);
  });
}

function renderTopicSeg() {
  const seg = $("#topicSeg"); seg.innerHTML = "";
  const mk = (val, label, on) => {
    const b = document.createElement("button");
    b.dataset.topic = val; b.textContent = label;
    if (on) b.classList.add("on");
    seg.appendChild(b);
  };
  mk("all", "Lahat", true);
  Object.entries(currentSubject.topics).forEach(([val, label]) => mk(val, label, false));
}

function selectSubject(id) {
  currentSubject = SUBJECTS.find(s => s.id === id) || SUBJECTS[0];
  settings = { mode: "mixed", topic: "all", count: 10 };
  $$("#modeSeg button").forEach(x => x.classList.toggle("on", x.dataset.mode === "mixed"));
  $$("#countSeg button").forEach(x => x.classList.toggle("on", x.dataset.count === "10"));
  renderTopicSeg();
  initStats();
  setupCards();
  $("#landingView").classList.add("hidden");
  $("#quizLayout").classList.remove("hidden");
  $("#resultView").classList.add("hidden");
  $("#quizView").classList.remove("hidden");
  $("#scoreChip").classList.add("hidden");
  if (!buildQuiz()) return;
  renderAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showLanding() {
  $("#quizLayout").classList.add("hidden");
  $("#landingView").classList.remove("hidden");
  renderSubjects();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------- Flashcards ----------
function pptList() {
  const set = [];
  (currentSubject.review || []).forEach(c => { if (set.indexOf(c.ppt) < 0) set.push(c.ppt); });
  return set;
}

function renderPptSeg() {
  const seg = $("#pptSeg"); seg.innerHTML = "";
  const mk = (val, label, on) => {
    const b = document.createElement("button");
    b.dataset.ppt = val; b.textContent = label;
    if (on) b.classList.add("on");
    seg.appendChild(b);
  };
  mk("all", "Lahat ng PPT", cardPpt === "all");
  pptList().forEach(p => mk(p, p, cardPpt === p));
}

function renderCardTopicSeg() {
  const seg = $("#cardTopicSeg"); seg.innerHTML = "";
  const topics = currentSubject.reviewTopics || {};
  const inPpt = (t) => cardPpt === "all" || (currentSubject.review || []).some(c => c.ppt === cardPpt && c.topic === t);
  const mk = (val, label, on) => {
    const b = document.createElement("button");
    b.dataset.ctopic = val; b.textContent = label;
    if (on) b.classList.add("on");
    seg.appendChild(b);
  };
  mk("all", "Lahat", cardTopic === "all");
  Object.entries(topics).forEach(([val, label]) => { if (inPpt(val)) mk(val, label, cardTopic === val); });
}

function buildDeck(reshuffle) {
  const all = currentSubject.review || [];
  const pool = all.filter(c =>
    (cardPpt === "all" || c.ppt === cardPpt) &&
    (cardTopic === "all" || c.topic === cardTopic)
  );
  cardDeck = reshuffle === false ? pool : shuffle(pool);
  cardIdx = 0; cardFlipped = false;
  renderCard();
}

function renderCard() {
  const card = $("#flashCard");
  card.classList.toggle("flipped", cardFlipped);
  const c = cardDeck[cardIdx];
  $("#flashTerm").textContent = c ? c.term : "Walang card sa filter na ito";
  $("#flashDef").textContent = c ? c.def : "Baguhin ang PPT o paksa";
  $("#cardNum").textContent = cardDeck.length ? `${cardIdx + 1}/${cardDeck.length}` : "0/0";
  const total = (currentSubject.review || []).length;
  $("#cardCount").textContent = `${cardDeck.length} cards (buo: ${total})`;
}

function setView(v) {
  $$("#viewSeg button").forEach(x => x.classList.toggle("on", x.dataset.view === v));
  const isCards = v === "cards";
  $("#cardsView").classList.toggle("hidden", !isCards);
  $("#quizView").classList.toggle("hidden", isCards);
  if (!isCards) $("#resultView").classList.add("hidden");
  if (isCards) { buildDeck(true); }
}

function setupCards() {
  const has = currentSubject.review && currentSubject.review.length;
  const btn = document.querySelector('#viewSeg button[data-view="cards"]');
  btn.disabled = !has;
  btn.textContent = has ? `Flashcards (${currentSubject.review.length})` : "Flashcards (wala pa)";
  cardPpt = "all"; cardTopic = "all";
  renderPptSeg(); renderCardTopicSeg();
  setView("quiz");
}

function bindSeg(id, key, parse) {
  $("#" + id).addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    $$("#" + id + " button").forEach(x => x.classList.remove("on"));
    b.classList.add("on");
    settings[key] = parse ? parse(b) : b.dataset.mode || b.dataset.topic || b.dataset.count;
  });
}

function buildQuiz() {
  if (!currentSubject) return false;
  let pool = currentSubject.bank.filter(q =>
    (settings.mode === "mixed" || q.type === settings.mode) &&
    (settings.topic === "all" || q.topic === settings.topic)
  );
  if (pool.length === 0) { alert("Walang tanong sa pinili mo. Baguhin ang setup."); return false; }
  pool = shuffle(pool);
  let n = settings.count === "all" ? pool.length : Math.min(parseInt(settings.count), pool.length);
  quiz = pool.slice(0, n).map(q => {
    const c = { ...q };
    if (c.type === "mc") c.shuffledChoices = shuffle(c.choices);
    return c;
  });
  answers = {}; current = 0; submitted = false; lastResults = [];
  quiz.forEach(q => { answers[q.id] = q.type === "enum" ? new Array(q.answers.length).fill("") : ""; });
  return true;
}

function isAnswered(q) {
  const a = answers[q.id];
  if (q.type === "enum") return a.some(v => norm(v) !== "");
  return norm(a) !== "";
}

function renderAll() {
  if (quiz.length === 0) return;
  renderQuestion(); renderNav(); renderProg();
}

function renderQuestion() {
  const q = quiz[current];
  $("#qTopic").textContent = (currentSubject.topics[q.topic] || q.topic);
  $("#qType").textContent = TYPE_LABEL[q.type];
  $("#qNum").textContent = `Tanong ${current + 1}/${quiz.length}`;
  $("#qText").textContent = q.q;
  const body = $("#qBody"); body.innerHTML = "";

  if (q.type === "mc") {
    q.shuffledChoices.forEach(ch => {
      const lab = document.createElement("label");
      lab.className = "choice" + (answers[q.id] === ch ? " sel" : "");
      lab.innerHTML = `<input type="radio" name="${q.id}" ${answers[q.id] === ch ? "checked" : ""}><span></span>`;
      lab.querySelector("span").textContent = ch;
      lab.querySelector("input").addEventListener("change", () => { answers[q.id] = ch; renderNav(); renderProg(); renderQuestion(); });
      body.appendChild(lab);
    });
  } else if (q.type === "id") {
    const inp = document.createElement("input");
    inp.className = "txtin"; inp.placeholder = "Isulat ang sagot dito...";
    inp.value = answers[q.id] || "";
    inp.addEventListener("input", () => { answers[q.id] = inp.value; renderNav(); renderProg(); });
    body.appendChild(inp);
    const h = document.createElement("p"); h.className = "hint"; h.textContent = "Hindi case-sensitive. Balewala ang maliliit na pagkakaiba sa espasyo.";
    body.appendChild(h);
  } else {
    q.answers.forEach((_, i) => {
      const l = document.createElement("label"); l.className = "enum-lbl"; l.textContent = `Sagot ${i + 1}`;
      const inp = document.createElement("input");
      inp.className = "txtin enum-in"; inp.placeholder = `Isulat ang sagot ${i + 1}...`;
      inp.value = answers[q.id][i] || "";
      inp.addEventListener("input", () => { answers[q.id][i] = inp.value; renderNav(); renderProg(); });
      body.appendChild(l); body.appendChild(inp);
    });
    const h = document.createElement("p"); h.className = "hint"; h.textContent = "Kahit anong order. May partial score bawat tamang item.";
    body.appendChild(h);
  }

  $("#btnPrev").disabled = current === 0;
  $("#btnNext").disabled = current === quiz.length - 1;
}

function renderNav() {
  const g = $("#navGrid"); g.innerHTML = "";
  quiz.forEach((q, i) => {
    const b = document.createElement("button");
    b.textContent = i + 1;
    if (isAnswered(q)) b.classList.add("done");
    if (i === current) b.classList.add("cur");
    b.addEventListener("click", () => { current = i; renderQuestion(); renderNav(); });
    g.appendChild(b);
  });
}

function renderProg() {
  const done = quiz.filter(isAnswered).length;
  $("#progText").textContent = `${done}/${quiz.length} nasagutan`;
  $("#progBar").style.width = quiz.length ? (done / quiz.length * 100) + "%" : "0";
}

function checkOne(q) {
  const a = answers[q.id];
  if (q.type === "mc") {
    const ua = norm(a);
    const ok = ua !== "" && ua === norm(q.answer);
    return { ok, score: ok ? 1 : 0, max: 1, userText: a || "(walang sagot)", correctText: q.answer };
  }
  if (q.type === "id") {
    const ua = norm(a);
    const ok = ua !== "" && q.answers.some(acc => norm(acc) === ua);
    return { ok, score: ok ? 1 : 0, max: 1, userText: a || "(walang sagot)", correctText: q.answers[0] };
  }
  // enum: order-independent, bawat item isang puntos, walang double-count
  const used = new Array(q.answers.length).fill(false);
  let hits = 0;
  const userVals = a.map(v => norm(v));
  userVals.forEach(uv => {
    if (!uv) return;
    for (let i = 0; i < q.answers.length; i++) {
      if (!used[i] && norm(q.answers[i]) === uv) { used[i] = true; hits++; break; }
    }
  });
  return { ok: hits === q.answers.length, partial: hits > 0 && hits < q.answers.length, score: hits, max: q.answers.length, userText: a.map(v => v || "—").join(" | "), correctText: q.answers.join(" | ") };
}

function submit() {
  const unans = quiz.filter(q => !isAnswered(q)).length;
  if (unans > 0 && !confirm(`May ${unans} tanong pang walang sagot. Ipasa pa rin?`)) return;
  lastResults = quiz.map(q => ({ q, r: checkOne(q) }));
  const totalScore = lastResults.reduce((s, x) => s + x.r.score, 0);
  const totalMax = lastResults.reduce((s, x) => s + x.r.max, 0);
  const pct = totalMax ? Math.round(totalScore / totalMax * 100) : 0;
  $("#resCorrect").textContent = `${totalScore}/${totalMax}`;
  $("#resTotal").textContent = quiz.length;
  $("#resPct").textContent = pct + "%";
  $("#resGrade").textContent = pct >= 90 ? "Mahusay!" : pct >= 75 ? "Pasado" : pct >= 50 ? "Kulang pa" : "Mag-review ulit";
  $("#scoreChip").classList.remove("hidden");
  $("#scoreChipVal").textContent = `${totalScore}/${totalMax} (${pct}%)`;
  $("#quizView").classList.add("hidden");
  $("#resultView").classList.remove("hidden");
  renderReview("all");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderReview(f) {
  const list = $("#reviewList"); list.innerHTML = "";
  lastResults.forEach(({ q, r }, i) => {
    const cls = r.ok ? "ok" : "no";
    if (f === "correct" && !r.ok) return;
    if (f === "wrong" && r.ok) return;
    const d = document.createElement("div");
    d.className = "rev " + cls;
    const badge = r.ok ? `<span class="badge ok">TAMA</span>` : r.partial ? `<span class="badge no">PARTIAL <span class="part">${r.score}/${r.max}</span></span>` : `<span class="badge no">MALI</span>`;
    d.innerHTML = `<div class="rq">${i + 1}. </div><div class="ans">Sagot mo: <b class="${r.ok ? "t" : "m"}"></b></div><div class="ans">Tamang sagot: <b class="t"></b></div><div class="exp"></div>`;
    d.querySelector(".rq").append(document.createTextNode(q.q), (() => { const s = document.createElement("span"); s.innerHTML = badge; return s; })());
    d.querySelectorAll(".ans b")[0].textContent = r.userText;
    d.querySelectorAll(".ans b")[1].textContent = r.correctText;
    d.querySelector(".exp").textContent = "Paliwanag: " + (q.explain || "—");
    list.appendChild(d);
  });
  $$("#filterSeg button").forEach(x => x.classList.toggle("on", x.dataset.f === f));
}

document.addEventListener("DOMContentLoaded", () => {
  const allBank = SUBJECTS.reduce((a, s) => a.concat(s.bank), []);
  $("#statTotal").textContent = allBank.length;
  $("#statMC").textContent = allBank.filter(q => q.type === "mc").length;
  $("#statID").textContent = allBank.filter(q => q.type === "id").length;
  $("#statEnum").textContent = allBank.filter(q => q.type === "enum").length;
  bindSeg("modeSeg", "mode", b => b.dataset.mode);
  bindSeg("topicSeg", "topic", b => b.dataset.topic);
  bindSeg("countSeg", "count", b => b.dataset.count);

  $("#btnStart").addEventListener("click", () => {
    if (!buildQuiz()) return;
    $("#resultView").classList.add("hidden");
    $("#quizView").classList.remove("hidden");
    $("#scoreChip").classList.add("hidden");
    renderAll();
  });
  $("#btnReset").addEventListener("click", () => {
    if (quiz.length && confirm("Ulitin at burahin ang sagot?")) {
      quiz.forEach(q => { answers[q.id] = q.type === "enum" ? new Array(q.answers.length).fill("") : ""; });
      current = 0;
      $("#resultView").classList.add("hidden");
      $("#quizView").classList.remove("hidden");
      $("#scoreChip").classList.add("hidden");
      renderAll();
    }
  });
  $("#btnPrev").addEventListener("click", () => { if (current > 0) { current--; renderQuestion(); renderNav(); } });
  $("#btnNext").addEventListener("click", () => { if (current < quiz.length - 1) { current++; renderQuestion(); renderNav(); } });
  $("#btnSubmit").addEventListener("click", () => { if (quiz.length) submit(); });
  $("#btnRetake").addEventListener("click", () => {
    if (!buildQuiz()) return;
    $("#resultView").classList.add("hidden");
    $("#quizView").classList.remove("hidden");
    $("#scoreChip").classList.add("hidden");
    renderAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  $("#btnBackSetup").addEventListener("click", () => {
    $("#resultView").classList.add("hidden");
    $("#quizView").classList.remove("hidden");
  });
  $("#filterSeg").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (b) renderReview(b.dataset.f);
  });
  $("#btnSubjects").addEventListener("click", showLanding);
  $("#viewSeg").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b || b.disabled) return;
    setView(b.dataset.view);
  });
  $("#pptSeg").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    $$("#pptSeg button").forEach(x => x.classList.remove("on"));
    b.classList.add("on");
    cardPpt = b.dataset.ppt; cardTopic = "all";
    renderCardTopicSeg(); buildDeck(true);
  });
  $("#cardTopicSeg").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    $$("#cardTopicSeg button").forEach(x => x.classList.remove("on"));
    b.classList.add("on");
    cardTopic = b.dataset.ctopic;
    buildDeck(true);
  });
  $("#flashCard").addEventListener("click", () => {
    if (!cardDeck.length) return;
    cardFlipped = !cardFlipped; renderCard();
  });
  $("#btnCardPrev").addEventListener("click", () => {
    if (!cardDeck.length) return;
    cardIdx = (cardIdx - 1 + cardDeck.length) % cardDeck.length;
    cardFlipped = false; renderCard();
  });
  $("#btnCardNext").addEventListener("click", () => {
    if (!cardDeck.length) return;
    cardIdx = (cardIdx + 1) % cardDeck.length;
    cardFlipped = false; renderCard();
  });
  $("#btnCardShuffle").addEventListener("click", () => buildDeck(true));

  // landing muna: pili ng subject bago quiz
  renderSubjects();
  showLanding();
});

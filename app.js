// Quiz logic - Tagalog UI
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

let settings = { mode: "mixed", topic: "all", count: 10 };
let quiz = []; // shuffled questions for this session
let answers = {}; // id -> string | string[]
let current = 0;
let submitted = false;
let lastResults = [];

const TYPE_LABEL = { mc: "Multiple Choice", id: "Pagkakakilanlan", enum: "Enumerasyon" };

function norm(s) {
  return (s || "").toLowerCase().trim().replace(/\s+/g, " ").replace(/[.,!?;:()"'-]/g, "");
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
  $("#statTotal").textContent = QUESTION_BANK.length;
  $("#statMC").textContent = QUESTION_BANK.filter(q => q.type === "mc").length;
  $("#statID").textContent = QUESTION_BANK.filter(q => q.type === "id").length;
  $("#statEnum").textContent = QUESTION_BANK.filter(q => q.type === "enum").length;
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
  let pool = QUESTION_BANK.filter(q =>
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
  $("#qTopic").textContent = TOPICS[q.topic] || q.topic;
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
    const ok = norm(a) === norm(q.answer);
    return { ok, score: ok ? 1 : 0, max: 1, userText: a || "(walang sagot)", correctText: q.answer };
  }
  if (q.type === "id") {
    const ok = q.answers.some(acc => norm(acc) === norm(a));
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
  initStats();
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

  // auto-start para agad masubukan
  settings = { mode: "mixed", topic: "all", count: 10 };
  buildQuiz(); renderAll();
});

(() => {
  "use strict";

  const STORAGE_KEY = "projektpilot-bcsm205-v1";
  const TYPE_LABELS = {
    single: "Single Choice",
    multiple: "Multiple Choice",
    matching: "Zuordnung",
    open: "Offene Aufgabe",
    network: "Netzplan",
    histogram: "Ressourcenplanung",
    order: "Reihenfolge"
  };
  const AUTO_TYPES = new Set(["single", "multiple", "matching", "network", "histogram", "order"]);
  const TOTAL_QUESTIONS = BCSM205_DATA.questions.length;
  const ORIGINAL_QUESTIONS = 46;
  const PHOTO_ONLY_QUESTIONS = TOTAL_QUESTIONS - ORIGINAL_QUESTIONS;

  const view = document.querySelector("#view");
  const title = document.querySelector("#page-title");
  const eyebrow = document.querySelector("#page-eyebrow");
  const toast = document.querySelector("#toast");
  let session = null;
  let interaction = null;
  let catalogFilter = { query: "", category: "all", state: "all" };
  let examSize = 20;
  let timerHandle = null;

  const defaultState = { progress: {}, theme: "light", lastLearnId: 1 };
  const state = loadState();
  document.documentElement.dataset.theme = state.theme;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return { ...defaultState, ...saved, progress: saved?.progress || {} };
    } catch {
      return { ...defaultState };
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    const el = document.querySelector("#save-state");
    if (el) {
      el.textContent = "Fortschritt gespeichert";
      el.animate([{opacity:.35},{opacity:1}], {duration:350});
    }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
  }

  function getQuestion(id) {
    return BCSM205_DATA.questions.find(q => q.id === Number(id));
  }

  function categoryFor(id) {
    return BCSM205_DATA.categories.find(c => c.id === id);
  }

  function auditPhotoForQuestion(id) {
    return BCSM205_DATA.photoAudit.matches.find(item => item.question === Number(id))?.photo || null;
  }

  function recordResult(q, correct, mode = "auto") {
    const previous = state.progress[q.id] || { attempts: 0, correctAttempts: 0 };
    state.progress[q.id] = {
      attempts: previous.attempts + 1,
      correctAttempts: previous.correctAttempts + (correct ? 1 : 0),
      status: correct ? (mode === "self" ? "known" : "correct") : "wrong",
      updatedAt: new Date().toISOString()
    };
    state.lastLearnId = q.id;
    saveState();
  }

  function progressStats() {
    const entries = Object.values(state.progress);
    const done = entries.length;
    const mastered = entries.filter(x => x.status === "correct" || x.status === "known").length;
    const wrong = entries.filter(x => x.status === "wrong").length;
    const attempts = entries.reduce((sum, x) => sum + (x.attempts || 0), 0);
    const correctAttempts = entries.reduce((sum, x) => sum + (x.correctAttempts || 0), 0);
    return { done, mastered, wrong, attempts, accuracy: attempts ? Math.round(correctAttempts / attempts * 100) : 0 };
  }

  function setHeader(kicker, heading) {
    eyebrow.textContent = kicker;
    title.textContent = heading;
  }

  function setRoute(route) {
    location.hash = route;
  }

  function currentRoute() {
    return (location.hash.replace(/^#\/?/, "") || "home").split("?")[0];
  }

  function updateNav(route) {
    document.querySelectorAll("[data-route]").forEach(el => el.classList.toggle("active", el.dataset.route === route));
  }

  function daysUntilExam() {
    const now = new Date();
    const exam = new Date("2026-09-26T09:00:00+02:00");
    return Math.max(0, Math.ceil((exam - now) / 86400000));
  }

  function render() {
    const route = currentRoute();
    updateNav(route);
    clearInterval(timerHandle);
    timerHandle = null;
    if (route === "home") return renderHome();
    if (route === "photos") return renderPhotoAudit();
    if (route === "catalog") return renderCatalog();
    if (route === "exam") return renderExam();
    if (route === "mistakes") return renderMistakes();
    if (route === "learn") return renderLearn();
    setRoute("home");
  }

  function renderHome() {
    session = null;
    interaction = null;
    setHeader("DEIN LERNCOCKPIT", "Bereit für die nächste Frage?");
    const stats = progressStats();
    const percent = Math.round(stats.mastered / TOTAL_QUESTIONS * 100);
    const next = BCSM205_DATA.questions.find(q => !state.progress[q.id] || state.progress[q.id].status === "wrong") || BCSM205_DATA.questions[0];
    view.innerHTML = `
      <section class="hero-panel">
        <div class="hero-copy">
          <p class="hero-kicker">BCSM 205 · METHODEN DER PROJEKTDURCHFÜHRUNG</p>
          <h2>${TOTAL_QUESTIONS} Fragen aus beiden Quellen. Gemeinsam lernen.</h2>
          <p>Alle ${ORIGINAL_QUESTIONS} Klausurfragen und ${PHOTO_ONLY_QUESTIONS} zusätzliche, eigenständige Bildfragen – mit direkter Auswertung, Musterlösungen und Skriptseiten.</p>
          <div class="hero-actions">
            <button class="button primary" data-action="start-question" data-id="${next.id}">Mit Frage ${next.id} weiter</button>
            <button class="button secondary" data-route="exam">Prüfungsrunde starten</button>
            <button class="button secondary" data-route="photos">Foto-Abgleich ansehen</button>
          </div>
        </div>
        <div class="hero-progress">
          <div class="progress-ring" style="--p:${percent}" aria-label="${percent} Prozent gemeistert">
            <div><strong>${percent}%</strong><span>${stats.mastered} von ${TOTAL_QUESTIONS} gemeistert</span></div>
          </div>
        </div>
      </section>

      <section class="stats-grid" aria-label="Lernstatistik">
        <div class="stat-card"><span class="stat-label">Bis zur Klausur</span><span class="stat-value">${daysUntilExam()}</span><span class="stat-sub">Tage bis 26.09.</span></div>
        <div class="stat-card"><span class="stat-label">Bearbeitet</span><span class="stat-value">${stats.done}</span><span class="stat-sub">von ${TOTAL_QUESTIONS} Fragen</span></div>
        <div class="stat-card"><span class="stat-label">Trefferquote</span><span class="stat-value good">${stats.accuracy}%</span><span class="stat-sub">über alle Versuche</span></div>
        <div class="stat-card"><span class="stat-label">Offene Fehler</span><span class="stat-value ${stats.wrong ? "bad" : "good"}">${stats.wrong}</span><span class="stat-sub">gezielt wiederholen</span></div>
      </section>

      <div class="section-heading"><div><h2>Themenblöcke</h2><p>Starte direkt mit einem Bereich.</p></div></div>
      <section class="category-grid">
        ${BCSM205_DATA.categories.map((cat, index) => {
          const questions = BCSM205_DATA.questions.filter(q => q.category === cat.id);
          const mastered = questions.filter(q => ["correct","known"].includes(state.progress[q.id]?.status)).length;
          const p = Math.round(mastered / questions.length * 100);
          return `<button class="category-card" data-action="start-category" data-category="${cat.id}">
            <span class="category-number">${index + 1}</span><span><strong>${escapeHtml(cat.title)}</strong><small>Fragen ${cat.range} · ${escapeHtml(cat.subtitle)}</small></span>
            <span class="category-meter" aria-label="${p} Prozent"><span style="width:${p}%"></span></span>
          </button>`;
        }).join("")}
      </section>

      <div class="info-strip"><span class="info-icon">i</span><div><strong>Offizielle Prüfung: 120 Punkte, bestanden ab 61</strong><p>${escapeHtml(BCSM205_DATA.exam.note)}</p></div></div>
    `;
  }

  function renderPhotoAudit() {
    session = null;
    interaction = null;
    const audit = BCSM205_DATA.photoAudit;
    setHeader("ALTKAUSUR-FOTOS", "Was zeigen die 18 Fotos wirklich?");
    view.innerHTML = `
      <section class="audit-intro">
        <span class="audit-badge">Geprüft am ${escapeHtml(audit.checked)}</span>
        <h2>Beide Quellen stecken jetzt in einem gemeinsamen Katalog.</h2>
        <p>${escapeHtml(audit.summary)}</p>
        <div class="audit-facts">
          <div><strong>${ORIGINAL_QUESTIONS}</strong><span>Klausurfragen vollständig erhalten</span></div>
          <div><strong>${PHOTO_ONLY_QUESTIONS}</strong><span>eigenständige Bildfragen ergänzt</span></div>
          <div><strong>${TOTAL_QUESTIONS}</strong><span>Fragen im gemeinsamen Katalog</span></div>
        </div>
      </section>
      <div class="section-heading"><div><h2>Gleiche Fragen richtig zugeordnet</h2><p>Diese Bildfragen sind bereits durch eine vorhandene Klausurfrage abgedeckt und werden deshalb nicht doppelt gezählt.</p></div></div>
      <div class="audit-match-list">${audit.matches.map(item => `<span class="pill source">Bild F${item.photo} = Frage ${item.question}</span>`).join("")}</div>
      <div class="section-heading"><div><h2>Beispiele aus dem Foto-Abgleich</h2><p>Die 20 eigenständigen Bildfragen findest du vollständig als Fragen 47 bis 66 im Lernkatalog.</p></div></div>
      <section class="photo-grid">
        ${audit.variants.map(item => `<article class="photo-card">
          <div class="photo-card__meta"><span>Foto-Frage ${escapeHtml(item.photo)}</span><small>${escapeHtml(item.related)}</small></div>
          <h3>${escapeHtml(item.topic)}</h3>
          <p>${escapeHtml(item.question)}</p>
          ${item.options?.length ? `<div class="photo-options-label">Gedruckte Antwortmöglichkeiten</div><ol class="photo-options">${item.options.map(option => `<li>${escapeHtml(option)}</li>`).join("")}</ol>` : ""}
          <div class="photo-answer"><strong>Richtige Antwort</strong><span>${escapeHtml(item.answer)}</span></div>
        </article>`).join("")}
      </section>
      <div class="info-strip"><span class="info-icon">!</span><div><strong>Wichtig beim Teilen</strong><p>Die App ist ein fachlich geprüfter Lernkatalog. Sie ist keine wortgetreue Abschrift einer bestätigten zukünftigen Klausur. Handschriftliche Kreuze und Randnotizen wurden vollständig ignoriert; die richtigen Antworten stammen aus dem SS26-Skript.</p></div></div>
    `;
  }

  function startSession(ids, mode, startId) {
    const list = [...ids];
    let index = startId ? Math.max(0, list.indexOf(Number(startId))) : 0;
    session = { ids: list, mode, index, results: [], startedAt: Date.now(), durationMinutes: mode === "exam" ? (list.length <= 10 ? 25 : list.length >= 40 ? 100 : 50) : null, finished: false };
    interaction = makeInteraction(getQuestion(list[index]));
  }

  function renderLearn() {
    if (!session || session.mode !== "learn") {
      startSession(BCSM205_DATA.questions.map(q => q.id), "learn", state.lastLearnId);
    }
    renderQuestionSession();
  }

  function renderMistakes() {
    const ids = BCSM205_DATA.questions.filter(q => state.progress[q.id]?.status === "wrong").map(q => q.id);
    if (!ids.length) {
      session = null;
      setHeader("FEHLERTRAINING", "Hier ist gerade nichts offen.");
      view.innerHTML = `<div class="empty-state"><h2>Keine offenen Fehler</h2><p>Sobald du eine Frage falsch beantwortest oder bei einer offenen Aufgabe „Noch üben“ wählst, erscheint sie hier.</p><button class="button primary" data-route="learn">Alle Fragen lernen</button></div>`;
      return;
    }
    if (!session || session.mode !== "mistakes" || session.ids.some(id => !ids.includes(id))) startSession(ids, "mistakes");
    renderQuestionSession();
  }

  function renderExam() {
    if (session?.mode === "exam") {
      if (session.finished) return renderExamResult();
      return renderQuestionSession();
    }
    setHeader("PRÜFUNGSMODUS", "Trainiere ohne eingeblendete Lösungen.");
    const autoCount = BCSM205_DATA.questions.filter(q => AUTO_TYPES.has(q.type)).length;
    view.innerHTML = `
      <section class="exam-setup">
        <div class="setup-card">
          <h2>Deine Prüfungsrunde</h2>
          <p>Antworten werden erst am Ende ausgewertet. Offene Aufgaben übst du im Lernmodus mit Selbstkontrolle.</p>
          <div class="choice-grid">
            <button class="choice-tile ${examSize===10?"selected":""}" data-action="exam-size" data-size="10"><span><strong>Kurzrunde</strong><small>10 zufällige Fragen</small></span><strong>25 Min.</strong></button>
            <button class="choice-tile ${examSize===20?"selected":""}" data-action="exam-size" data-size="20"><span><strong>Standardrunde</strong><small>20 zufällige Fragen</small></span><strong>50 Min.</strong></button>
            <button class="choice-tile ${examSize===autoCount?"selected":""}" data-action="exam-size" data-size="${autoCount}"><span><strong>Komplette Auswahlrunde</strong><small>Alle ${autoCount} automatisch bewertbaren Fragen</small></span><strong>100 Min.</strong></button>
          </div>
          <button class="button primary" style="margin-top:18px;width:100%" data-action="start-exam">Prüfung starten</button>
        </div>
        <div class="setup-card">
          <h2>So funktioniert es</h2>
          <ul class="exam-notes">
            <li><span>1</span><div>Die Reihenfolge und Antwortoptionen werden gemischt.</div></li>
            <li><span>2</span><div>Du erhältst während der Runde keine Hinweise oder Lösungen.</div></li>
            <li><span>3</span><div>Am Ende siehst du Punkte, Trefferquote und alle Fehler.</div></li>
            <li><span>4</span><div>Falsche Antworten landen automatisch im Fehlertraining.</div></li>
          </ul>
        </div>
      </section>`;
  }

  function startExam() {
    const pool = BCSM205_DATA.questions.filter(q => AUTO_TYPES.has(q.type)).map(q => q.id);
    startSession(shuffle(pool).slice(0, examSize), "exam");
    render();
  }

  function renderQuestionSession() {
    const q = getQuestion(session.ids[session.index]);
    const modeName = session.mode === "exam" ? "PRÜFUNGSMODUS" : session.mode === "mistakes" ? "FEHLERTRAINING" : "LERNMODUS";
    setHeader(modeName, session.mode === "exam" ? "Konzentriert bleiben." : `Frage ${q.id} von ${TOTAL_QUESTIONS}`);
    const percent = Math.round((session.index + (interaction?.checked ? 1 : 0)) / session.ids.length * 100);
    view.innerHTML = `
      <div class="session-bar">
        <span class="session-count">${session.index + 1} / ${session.ids.length}</span>
        <div class="linear-progress" aria-label="Fortschritt ${percent} Prozent"><span style="width:${percent}%"></span></div>
        <div class="session-actions">
          ${session.mode === "exam" ? `<span class="pill" id="exam-timer">${formatTime(remainingExamSeconds())}</span>` : ""}
          <button class="small-button" data-action="open-catalog" aria-label="Fragenübersicht" title="Fragenübersicht">▦</button>
        </div>
      </div>
      <article class="question-card">
        <div class="question-meta">
          <span class="pill accent">FRAGE ${q.id}</span>
          <span class="pill">${TYPE_LABELS[q.type]}</span>
          <span class="pill">${q.points} ${q.points === 1 ? "Punkt" : "Punkte"}</span>
          <span class="pill source">${escapeHtml(q.source)}</span>
          ${q.id <= ORIGINAL_QUESTIONS && auditPhotoForQuestion(q.id) ? `<span class="pill source">auch Bild F${auditPhotoForQuestion(q.id)}</span>` : ""}
        </div>
        <h2>${escapeHtml(q.prompt)}</h2>
        ${q.instruction ? `<p class="question-instruction">${escapeHtml(q.instruction)}</p>` : ""}
        ${renderInteraction(q)}
        ${renderFeedback(q)}
        <footer class="question-footer">
          <button class="button ghost" data-action="previous" ${session.index===0||session.mode==="exam"?"disabled":""}>← Zurück</button>
          <div class="question-footer__right">
            ${renderPrimaryActions(q)}
          </div>
        </footer>
      </article>`;
    bindInputState(q);
    if (session.mode === "exam") startTimer();
  }

  function makeInteraction(q) {
    if (!q) return null;
    const base = { checked: false, correct: null, locked: false };
    if (["single","multiple"].includes(q.type)) return { ...base, selected: new Set(), optionOrder: shuffle(q.options.map((_,i)=>i)) };
    if (q.type === "matching") return { ...base, selected: Array(q.pairs.length).fill(""), choices: shuffle(q.pairs.map(p=>p[1])) };
    if (q.type === "order") {
      let order = shuffle(q.steps);
      if (order.every((x,i)=>x===q.steps[i])) order = [...order.slice(1), order[0]];
      return { ...base, order };
    }
    if (q.type === "network") return { ...base, cells: {}, criticalPath: "", duration: "" };
    if (q.type === "histogram") return { ...base, values: Array(q.values.length).fill("") };
    if (q.type === "open") return { ...base, draft: "", revealed: false };
    return base;
  }

  function renderInteraction(q) {
    if (["single","multiple"].includes(q.type)) {
      return `<div class="options">${interaction.optionOrder.map(index => {
        const option = q.options[index];
        const selected = interaction.selected.has(index);
        let classes = selected ? " selected" : "";
        if (interaction.checked && option[1]) classes += selected ? " correct" : " missed";
        if (interaction.checked && selected && !option[1]) classes += " incorrect";
        const mark = interaction.checked ? (option[1] ? "✓" : selected ? "×" : "") : selected ? "✓" : "";
        return `<button class="option${classes}${interaction.locked?" locked":""}" data-option="${index}" data-kind="${q.type}" ${interaction.locked?"disabled":""}><span class="choice-mark">${mark}</span><span class="option-text">${escapeHtml(option[0])}</span></button>`;
      }).join("")}</div>`;
    }
    if (q.type === "matching") {
      return `<div class="match-list">${q.pairs.map((pair,i) => {
        const resultClass = interaction.checked ? (interaction.selected[i]===pair[1]?" correct":" incorrect") : "";
        return `<div class="match-row${resultClass}"><label for="match-${i}">${escapeHtml(pair[0])}</label><select id="match-${i}" data-match="${i}" ${interaction.locked?"disabled":""}><option value="">Bitte auswählen …</option>${interaction.choices.map(choice=>`<option value="${escapeHtml(choice)}" ${interaction.selected[i]===choice?"selected":""}>${escapeHtml(choice)}</option>`).join("")}</select></div>`;
      }).join("")}</div>`;
    }
    if (q.type === "order") {
      return `<div class="order-list">${interaction.order.map((step,i)=>`<div class="order-item"><span class="order-number">${i+1}</span><span>${escapeHtml(step)}</span><span class="order-controls"><button data-move="up" data-index="${i}" ${i===0||interaction.locked?"disabled":""} aria-label="Nach oben">↑</button><button data-move="down" data-index="${i}" ${i===interaction.order.length-1||interaction.locked?"disabled":""} aria-label="Nach unten">↓</button></span></div>`).join("")}</div>`;
    }
    if (q.type === "network") {
      return `<div class="calc-table-wrap"><table class="calc-table"><thead><tr><th>AP</th><th>FA</th><th>FE</th><th>SA</th><th>SE</th><th>GP</th></tr></thead><tbody>${q.rows.map((row,r)=>`<tr><th>${row.ap}</th>${row.values.map((_,c)=>`<td><input inputmode="numeric" data-cell="${r}-${c}" aria-label="AP ${row.ap} ${["FA","FE","SA","SE","GP"][c]}" value="${escapeHtml(interaction.cells[`${r}-${c}`]||"")}" ${interaction.locked?"disabled":""}></td>`).join("")}</tr>`).join("")}</tbody></table></div><div class="inline-fields"><label class="inline-field">Kritischer Pfad<input data-field="criticalPath" placeholder="z. B. A-B-C" value="${escapeHtml(interaction.criticalPath)}" ${interaction.locked?"disabled":""}></label><label class="inline-field">Projektdauer<input data-field="duration" inputmode="numeric" value="${escapeHtml(interaction.duration)}" ${interaction.locked?"disabled":""}></label></div>`;
    }
    if (q.type === "histogram") {
      return `<div class="hist-inputs">${q.values.map((_,i)=>`<label>W${i+1}<input inputmode="numeric" data-hist="${i}" value="${escapeHtml(interaction.values[i])}" ${interaction.locked?"disabled":""}></label>`).join("")}</div>`;
    }
    return `<div class="answer-area"><div class="paper-prompt"><span aria-hidden="true">✎</span><div><strong>Erst selbst lösen</strong><p>Schreibe oder zeichne deine Antwort auf dein Blatt. Du kannst zusätzlich hier Stichpunkte festhalten.</p></div></div><textarea data-field="draft" placeholder="Deine Stichpunkte …" ${interaction.locked?"disabled":""}>${escapeHtml(interaction.draft)}</textarea></div>`;
  }

  function renderFeedback(q) {
    if (session.mode === "exam" || !interaction.checked) return "";
    if (q.type === "open") {
      return `<div class="feedback neutral"><h3>Musterlösung</h3><p>${escapeHtml(q.explanation)}</p>${q.solutionHtml||""}${q.criteria ? `<ul>${q.criteria.map(c=>`<li>${escapeHtml(c)}</li>`).join("")}</ul>`:""}<div class="self-grade"><button class="button primary" data-action="self-grade" data-correct="true">Konnte ich ✓</button><button class="button secondary" data-action="self-grade" data-correct="false">Noch üben</button></div></div>`;
    }
    return `<div class="feedback ${interaction.correct?"good":"bad"}"><h3>${interaction.correct?"Richtig beantwortet":"Noch nicht richtig"}</h3><p>${interaction.correct?"Stark – die Auswahl stimmt vollständig.":"Vergleiche die markierten Antworten und präge dir die Begründung ein."}</p><p class="explanation">${escapeHtml(q.explanation)}</p>${q.note?`<p class="explanation"><strong>Kontrollhinweis:</strong> ${escapeHtml(q.note)}</p>`:""}${q.solutionHtml||""}${q.type==="histogram"?renderHistogram(q):""}</div>`;
  }

  function renderPrimaryActions(q) {
    if (session.mode === "exam") return `<button class="button primary" data-action="submit-exam">${session.index===session.ids.length-1?"Prüfung abgeben":"Antwort speichern & weiter"}</button>`;
    if (q.type === "open" && !interaction.checked) return `<button class="button primary" data-action="check">Musterlösung zeigen</button>`;
    if (q.type === "open" && interaction.checked && !interaction.locked) return "";
    if (!interaction.checked) return `<button class="button primary" data-action="check">Antwort prüfen</button>`;
    return `<button class="button primary" data-action="next">${session.index===session.ids.length-1?"Runde abschließen":"Nächste Frage →"}</button>`;
  }

  function bindInputState(q) {
    view.querySelectorAll("[data-match]").forEach(el => el.addEventListener("change", e => interaction.selected[Number(e.target.dataset.match)] = e.target.value));
    view.querySelectorAll("[data-cell]").forEach(el => el.addEventListener("input", e => interaction.cells[e.target.dataset.cell] = e.target.value));
    view.querySelectorAll("[data-hist]").forEach(el => el.addEventListener("input", e => interaction.values[Number(e.target.dataset.hist)] = e.target.value));
    view.querySelectorAll("[data-field]").forEach(el => el.addEventListener("input", e => interaction[e.target.dataset.field] = e.target.value));
  }

  function isComplete(q) {
    if (["single","multiple"].includes(q.type)) return interaction.selected.size > 0;
    if (q.type === "matching") return interaction.selected.every(Boolean);
    if (q.type === "order") return true;
    if (q.type === "network") return q.rows.every((r,ri)=>r.values.every((_,ci)=>String(interaction.cells[`${ri}-${ci}`]??"").trim()!=="")) && interaction.criticalPath.trim() && String(interaction.duration).trim();
    if (q.type === "histogram") return interaction.values.every(v=>String(v).trim()!=="");
    return true;
  }

  function evaluate(q) {
    if (["single","multiple"].includes(q.type)) {
      const expected = q.options.map((o,i)=>o[1]?i:null).filter(i=>i!==null);
      return expected.length === interaction.selected.size && expected.every(i=>interaction.selected.has(i));
    }
    if (q.type === "matching") return q.pairs.every((pair,i)=>interaction.selected[i]===pair[1]);
    if (q.type === "order") return q.steps.every((step,i)=>interaction.order[i]===step);
    if (q.type === "network") {
      const cells = q.rows.every((row,r)=>row.values.every((v,c)=>Number(interaction.cells[`${r}-${c}`])===v));
      const path = interaction.criticalPath.toUpperCase().replace(/[^A-Z]/g, "");
      return cells && path === q.criticalPath.replace(/[^A-Z]/g, "") && Number(interaction.duration) === q.duration;
    }
    if (q.type === "histogram") return q.values.every((v,i)=>Number(interaction.values[i])===v);
    return false;
  }

  function checkCurrent() {
    const q = getQuestion(session.ids[session.index]);
    if (!isComplete(q)) return showToast("Bitte fülle zuerst alle Felder aus.");
    if (q.type === "open") {
      interaction.checked = true;
      renderQuestionSession();
      return;
    }
    interaction.correct = evaluate(q);
    interaction.checked = true;
    interaction.locked = true;
    recordResult(q, interaction.correct);
    renderQuestionSession();
  }

  function selfGrade(correct) {
    const q = getQuestion(session.ids[session.index]);
    interaction.correct = correct;
    interaction.locked = true;
    recordResult(q, correct, "self");
    showToast(correct ? "Als gemeistert gespeichert." : "Für das Fehlertraining gespeichert.");
    renderQuestionSession();
  }

  function submitExamAnswer() {
    const q = getQuestion(session.ids[session.index]);
    if (!isComplete(q)) return showToast("Bitte beantworte die Aufgabe vollständig.");
    const correct = evaluate(q);
    session.results.push({ id:q.id, correct, points: correct ? q.points : 0, max:q.points });
    recordResult(q, correct);
    if (session.index >= session.ids.length - 1) {
      session.finished = true;
      renderExamResult();
    } else {
      session.index += 1;
      interaction = makeInteraction(getQuestion(session.ids[session.index]));
      renderQuestionSession();
      window.scrollTo({top:0,behavior:"smooth"});
    }
  }

  function nextQuestion() {
    if (session.index >= session.ids.length - 1) {
      showToast("Runde abgeschlossen.");
      setRoute("home");
      return;
    }
    session.index += 1;
    interaction = makeInteraction(getQuestion(session.ids[session.index]));
    renderQuestionSession();
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function previousQuestion() {
    if (session.index <= 0) return;
    session.index -= 1;
    interaction = makeInteraction(getQuestion(session.ids[session.index]));
    renderQuestionSession();
  }

  function formatTime(seconds) {
    const value = Math.max(0, seconds);
    return `${String(Math.floor(value/60)).padStart(2,"0")}:${String(value%60).padStart(2,"0")}`;
  }

  function remainingExamSeconds() {
    if (!session?.durationMinutes) return 0;
    return Math.max(0, session.durationMinutes * 60 - Math.floor((Date.now() - session.startedAt)/1000));
  }

  function startTimer() {
    clearInterval(timerHandle);
    timerHandle = setInterval(() => {
      const el = document.querySelector("#exam-timer");
      const remaining = remainingExamSeconds();
      if (el) el.textContent = formatTime(remaining);
      if (remaining <= 0) {
        clearInterval(timerHandle);
        session.finished = true;
        renderExamResult();
      }
    }, 1000);
  }

  function renderExamResult() {
    clearInterval(timerHandle);
    const max = session.results.reduce((s,r)=>s+r.max,0);
    const points = session.results.reduce((s,r)=>s+r.points,0);
    const percent = max ? Math.round(points/max*100) : 0;
    const wrong = session.results.filter(r=>!r.correct);
    setHeader("ERGEBNIS", percent >= 85 ? "Sehr prüfungssicher." : percent >= 60 ? "Gute Basis – Fehler jetzt schließen." : "Jetzt gezielt nacharbeiten.");
    view.innerHTML = `
      <section class="result-banner"><h2>${percent}% richtig</h2><p>${session.results.filter(r=>r.correct).length} von ${session.results.length} Aufgaben vollständig richtig.</p><span class="result-score">${points} / ${max} Trainingspunkte</span></section>
      <div class="section-heading"><div><h2>${wrong.length ? "Diese Fragen wiederholen" : "Fehlerfreie Runde"}</h2><p>${wrong.length ? "Sie sind bereits im Fehlertraining gespeichert.":"Du hast jede Aufgabe richtig beantwortet."}</p></div></div>
      ${wrong.length ? `<div class="question-grid">${wrong.map(r=>questionTile(getQuestion(r.id))).join("")}</div>` : ""}
      <div class="hero-actions" style="margin-top:18px"><button class="button primary" data-route="mistakes" ${wrong.length?"":"disabled"}>Fehler trainieren</button><button class="button secondary" data-action="restart-exam">Neue Runde</button></div>`;
  }

  function renderCatalog() {
    session = null;
    interaction = null;
    setHeader("FRAGENÜBERSICHT", `Alle ${TOTAL_QUESTIONS} Fragen auf einen Blick.`);
    const filtered = BCSM205_DATA.questions.filter(q => {
      const categoryMatch = catalogFilter.category === "all" || q.category === catalogFilter.category;
      const haystack = `${q.id} ${q.prompt} ${q.source}`.toLowerCase();
      const searchMatch = haystack.includes(catalogFilter.query.toLowerCase());
      const status = state.progress[q.id]?.status || "new";
      const stateMatch = catalogFilter.state === "all" || (catalogFilter.state === "mastered" ? ["correct","known"].includes(status) : catalogFilter.state === status);
      return categoryMatch && searchMatch && stateMatch;
    });
    view.innerHTML = `
      <div class="catalog-tools">
        <input class="search-field" id="catalog-search" value="${escapeHtml(catalogFilter.query)}" placeholder="Frage oder Thema suchen …" aria-label="Fragen durchsuchen">
        <select class="filter-select" id="category-filter" aria-label="Thema filtern"><option value="all">Alle Themen</option>${BCSM205_DATA.categories.map(c=>`<option value="${c.id}" ${catalogFilter.category===c.id?"selected":""}>${escapeHtml(c.title)}</option>`).join("")}</select>
        <select class="filter-select" id="state-filter" aria-label="Lernstand filtern"><option value="all">Jeder Lernstand</option><option value="new" ${catalogFilter.state==="new"?"selected":""}>Noch offen</option><option value="mastered" ${catalogFilter.state==="mastered"?"selected":""}>Gemeistert</option><option value="wrong" ${catalogFilter.state==="wrong"?"selected":""}>Fehler</option></select>
      </div>
      <div class="question-grid">${filtered.map(questionTile).join("")}</div>
      ${!filtered.length?`<div class="empty-state"><h2>Keine Frage gefunden</h2><p>Ändere den Suchbegriff oder den Filter.</p></div>`:""}
      <div class="question-footer" style="margin-top:25px"><span class="question-instruction">${filtered.length} Fragen angezeigt</span><button class="button danger" data-action="reset-progress">Fortschritt zurücksetzen</button></div>`;
    document.querySelector("#catalog-search")?.addEventListener("input", e => { catalogFilter.query=e.target.value; renderCatalog(); document.querySelector("#catalog-search")?.focus(); });
    document.querySelector("#category-filter")?.addEventListener("change", e => { catalogFilter.category=e.target.value; renderCatalog(); });
    document.querySelector("#state-filter")?.addEventListener("change", e => { catalogFilter.state=e.target.value; renderCatalog(); });
  }

  function questionTile(q) {
    const status = state.progress[q.id]?.status || "new";
    return `<button class="question-tile" data-action="start-question" data-id="${q.id}"><span class="question-tile__number">${q.id}</span><span><strong>${escapeHtml(q.prompt)}</strong><small>${TYPE_LABELS[q.type]} · ${escapeHtml(q.source)}</small></span><span class="state-dot ${status}" aria-label="${status}"></span></button>`;
  }

  function renderHistogram(q) {
    const labels = q.chartSegments.labels;
    const series = q.chartSegments.series;
    const max = 16;
    const chartX = 45, chartY = 20, chartH = 210, barW = 42, gap = 15;
    const bars = labels.map((label,i) => {
      let y = chartY + chartH;
      const segments = series.map(s => {
        const h = s.values[i] / max * chartH;
        y -= h;
        return h ? `<rect x="${chartX+i*(barW+gap)}" y="${y}" width="${barW}" height="${h}" rx="3" fill="${s.color}"><title>${s.name}: ${s.values[i]} PT</title></rect>` : "";
      }).join("");
      return `${segments}<text x="${chartX+i*(barW+gap)+barW/2}" y="252" text-anchor="middle" fill="currentColor" font-size="12">${label}</text><text x="${chartX+i*(barW+gap)+barW/2}" y="${Math.max(13,y-5)}" text-anchor="middle" fill="currentColor" font-size="11" font-weight="700">${q.values[i]}</text>`;
    }).join("");
    const legend = series.map((s,i)=>`<rect x="${45+i*105}" y="270" width="12" height="12" rx="3" fill="${s.color}"/><text x="${62+i*105}" y="280" fill="currentColor" font-size="11">AP ${s.name}</text>`).join("");
    const capY = chartY + chartH - (4/max*chartH);
    return `<div class="solution-visual"><h4>Korrektes gestapeltes Ressourcenhistogramm</h4><svg class="mini-chart" viewBox="0 0 580 295" role="img" aria-label="Gestapeltes Ressourcenhistogramm mit Kapazitätslinie bei vier Personentagen"><line x1="35" y1="${chartY+chartH}" x2="565" y2="${chartY+chartH}" stroke="currentColor"/><line x1="35" y1="${capY}" x2="565" y2="${capY}" stroke="#a8473f" stroke-width="3" stroke-dasharray="8 6"/><text x="558" y="${capY-6}" text-anchor="end" fill="#a8473f" font-size="11">Kapazität 4 PT</text>${bars}${legend}</svg></div>`;
  }

  function openSpecificQuestion(id) {
    startSession(BCSM205_DATA.questions.map(q=>q.id), "learn", id);
    if (currentRoute() !== "learn") setRoute("learn"); else renderQuestionSession();
  }

  function resetProgress() {
    if (!confirm("Möchtest du wirklich den gesamten Lernfortschritt löschen?")) return;
    state.progress = {};
    state.lastLearnId = 1;
    saveState();
    showToast("Fortschritt wurde zurückgesetzt.");
    renderCatalog();
  }

  document.addEventListener("click", event => {
    const routeEl = event.target.closest("[data-route]");
    if (routeEl) { setRoute(routeEl.dataset.route); return; }
    const option = event.target.closest("[data-option]");
    if (option && !interaction.locked) {
      const q = getQuestion(session.ids[session.index]);
      const index = Number(option.dataset.option);
      if (q.type === "single") interaction.selected = new Set([index]);
      else interaction.selected.has(index) ? interaction.selected.delete(index) : interaction.selected.add(index);
      renderQuestionSession();
      return;
    }
    const move = event.target.closest("[data-move]");
    if (move && !interaction.locked) {
      const i = Number(move.dataset.index);
      const j = move.dataset.move === "up" ? i-1 : i+1;
      [interaction.order[i],interaction.order[j]]=[interaction.order[j],interaction.order[i]];
      renderQuestionSession();
      return;
    }
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (!action) return;
    const el = event.target.closest("[data-action]");
    if (action === "check") checkCurrent();
    if (action === "self-grade") selfGrade(el.dataset.correct === "true");
    if (action === "next") nextQuestion();
    if (action === "previous") previousQuestion();
    if (action === "submit-exam") submitExamAnswer();
    if (action === "exam-size") { examSize=Number(el.dataset.size); renderExam(); }
    if (action === "start-exam") startExam();
    if (action === "restart-exam") { session=null; renderExam(); }
    if (action === "open-catalog") setRoute("catalog");
    if (action === "start-question") openSpecificQuestion(Number(el.dataset.id));
    if (action === "start-category") {
      const ids = BCSM205_DATA.questions.filter(q=>q.category===el.dataset.category).map(q=>q.id);
      startSession(ids,"learn"); setRoute("learn");
    }
    if (action === "reset-progress") resetProgress();
  });

  document.querySelector("#theme-toggle").addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = state.theme;
    saveState();
  });

  window.addEventListener("hashchange", render);

  function registerWebMCP() {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const register = tool => {
      try { Promise.resolve(context.registerTool(tool)).catch(()=>{}); } catch {}
    };
    register({
      name:"get_learning_progress", title:"Lernfortschritt lesen",
      description:"Gibt den aktuellen BCSM-205-Lernfortschritt mit gemeisterten und offenen Fragen zurück.",
      inputSchema:{type:"object",properties:{},additionalProperties:false},
      annotations:{readOnlyHint:true,untrustedContentHint:false},
      execute:()=>({total:TOTAL_QUESTIONS,...progressStats(),wrongQuestionIds:BCSM205_DATA.questions.filter(q=>state.progress[q.id]?.status==="wrong").map(q=>q.id)})
    });
    register({
      name:"open_learning_question", title:"Lernfrage öffnen",
      description:`Öffnet eine bestimmte Frage von 1 bis ${TOTAL_QUESTIONS} sichtbar im Lernmodus.`,
      inputSchema:{type:"object",properties:{questionId:{type:"integer",minimum:1,maximum:TOTAL_QUESTIONS}},required:["questionId"],additionalProperties:false},
      annotations:{readOnlyHint:true,untrustedContentHint:false},
      execute:({questionId})=>{ if(!getQuestion(questionId)) throw new Error("Unbekannte Frage"); openSpecificQuestion(questionId); return {opened:true,questionId}; }
    });
    register({
      name:"submit_choice_answer", title:"Auswahlantwort abgeben",
      description:"Öffnet eine Single- oder Multiple-Choice-Frage, wählt Antwortnummern aus und wertet sie sichtbar aus.",
      inputSchema:{type:"object",properties:{questionId:{type:"integer",minimum:1,maximum:TOTAL_QUESTIONS},selectedOptions:{type:"array",items:{type:"integer",minimum:1},minItems:1,uniqueItems:true}},required:["questionId","selectedOptions"],additionalProperties:false},
      annotations:{readOnlyHint:false,untrustedContentHint:false},
      execute:({questionId,selectedOptions})=>{
        const q=getQuestion(questionId);
        if(!q||!["single","multiple"].includes(q.type)) throw new Error("Die Frage ist keine Auswahlfrage.");
        if(selectedOptions.some(n=>n>q.options.length)) throw new Error("Ungültige Antwortnummer.");
        startSession(BCSM205_DATA.questions.map(x=>x.id),"learn",questionId);
        interaction.selected=new Set(selectedOptions.map(n=>n-1));
        interaction.correct=evaluate(q); interaction.checked=true; interaction.locked=true;
        recordResult(q,interaction.correct); location.hash="learn"; renderQuestionSession();
        return {questionId,correct:interaction.correct,correctOptions:q.options.map((o,i)=>o[1]?i+1:null).filter(Boolean)};
      }
    });
  }

  render();
  registerWebMCP();
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(()=>{}));
  }
})();

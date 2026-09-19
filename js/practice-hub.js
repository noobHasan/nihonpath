/* One final owner for Practice.  Earlier quiz, writing, and assessment
   renderers remain available through their explicit functions. */
var practiceMode = 'hub';
function openPracticeMode(mode) { practiceMode = mode || 'hub'; quiz = null; if (mode === 'assessment') assessmentSession = null; go('practice'); }
function startPracticeQuiz(quizObject) { quiz = quizObject; practiceMode = 'quiz'; go('practice'); }
function renderQuizPracticePage() {
  if (!quiz) quiz = buildMixed(10);
  var q = quiz.qs[quiz.i];
  if (!q) return qResult();
  document.getElementById('practice').innerHTML = `<div class="eyebrow">Quick Practice</div><h1 class="title">Practice</h1><p class="lead">Immediate feedback is saved locally and feeds Review.</p><div class="practiceModes"><button class="btn btnPrimary" onclick="openPracticeMode('quiz')">Quick Practice</button><button class="btn2 btnSecondary" onclick="openPracticeMode('writing')">Writing Lab</button><button class="btn2 btnSecondary" onclick="openPracticeMode('assessment')">Assessment</button></div><div class="card quiz"><div class="meta">${E(q.type)} • Question ${quiz.i+1}/${quiz.qs.length}</div><div class="track"><div class="fill" style="width:${P(quiz.i,quiz.qs.length)}%"></div></div><div class="q">${E(q.prompt)}</div><div class="options" id="opts">${q.options.map(function(o){return `<button class="option" onclick="answerQ(this,${JSON.stringify(o)})">${E(o)}</button>`;}).join('')}</div><div class="feedback" id="qfb"></div><div class="rowActions" style="justify-content:space-between;margin-top:14px"><button class="btn2 btnSecondary" onclick="startPracticeQuiz(buildMixed(10))">New mixed set</button><button class="btn btnPrimary" id="next" style="display:none" onclick="quiz.i++;quiz.answered=false;renderQuizPracticePage()">Next →</button></div></div>`;
}
function renderWritingPracticePage() {
  renderWritingPage();
  var root = document.getElementById('practice');
  if (root) root.innerHTML = `<div class="practiceModes"><button class="btn2 btnSecondary" onclick="startPracticeQuiz(buildMixed(10))">Quick Practice</button><button class="btn btnPrimary" onclick="openPracticeMode('writing')">Writing Lab</button><button class="btn2 btnSecondary" onclick="openPracticeMode('assessment')">Assessment</button></div>` + root.innerHTML;
}
function practiceHub() {
  document.getElementById('practice').innerHTML = `<div class="eyebrow">Practice hub</div><h1 class="title">Practice</h1><p class="lead">Choose a short recall set, produce Japanese in Writing Lab, or take a diagnostic.</p><div class="practiceModes"><button class="btn btnPrimary" onclick="startPracticeQuiz(buildMixed(10))">Quick Practice</button><button class="btn2 btnSecondary" onclick="openPracticeMode('writing')">Writing Lab</button><button class="btn2 btnSecondary" onclick="openPracticeMode('assessment')">Assessment</button></div><div class="grid three"><div class="card"><h3>Mixed practice</h3><p class="muted">Vocabulary, kanji, and grammar.</p><button class="tiny" onclick="startPracticeQuiz(buildMixed(10))">Start</button></div><div class="card"><h3>Recognition sets</h3><p class="muted">Choose a library area.</p><div class="rowActions"><button class="tiny" onclick="startPracticeQuiz(buildFocusedKanaQuiz(kana[0].id))">Kana</button><button class="tiny" onclick="startPracticeQuiz(buildFocusedVocabularyQuiz(vocab[0].id))">Vocabulary</button><button class="tiny" onclick="startPracticeQuiz(buildFocusedKanjiQuiz(kanji[0].id))">Kanji</button><button class="tiny" onclick="startPracticeQuiz(buildFocusedGrammarQuiz(grammar[0].id))">Grammar</button></div></div><div class="card"><h3>Assessment</h3><p class="muted">Three registered diagnostics.</p><button class="tiny" onclick="openPracticeMode('assessment')">Open assessments</button></div></div>`;
}
function practicePage() {
  if (assessmentSession) return renderAssessment();
  if (practiceMode === 'quiz' || (quiz && quiz.qs && practiceMode !== 'writing' && practiceMode !== 'assessment')) return renderQuizPracticePage();
  if (practiceMode === 'writing') return renderWritingPracticePage();
  if (practiceMode === 'assessment') return renderAssessmentHub();
  return practiceHub();
}
function renderAssessmentHub() {
  var cards = (assessmentsV2 || []).map(function(a) {
    var h=(state.assessmentHistory&&state.assessmentHistory[a.id])||[], best=h.length?Math.max.apply(null,h.map(function(x){return x.percentage;})):null;
    return `<div class="card"><h3>${E(a.title)}</h3><p class="muted">${E(a.description||'Internal diagnostic')}</p><div class="meta">Attempts: ${h.length} · Best: ${best===null?'—':best+'%'}</div><button class="tiny" onclick="assessmentStart('${E(a.id)}')">${h.length?'Retake':'Start'}</button></div>`;
  }).join('');
  document.getElementById('practice').innerHTML=`<div class="eyebrow">Assessment</div><h1 class="title">Assessment Lab</h1><p class="lead">Internal diagnostics help identify what to review; they are not official JLPT scores.</p><div class="practiceModes"><button class="btn2 btnSecondary" onclick="startPracticeQuiz(buildMixed(10))">Quick Practice</button><button class="btn2 btnSecondary" onclick="openPracticeMode('writing')">Writing Lab</button><button class="btn btnPrimary" onclick="openPracticeMode('assessment')">Assessment</button></div><div class="grid three">${cards}</div>`;
}

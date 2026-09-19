/* Gate 14 learning-surface enrichment.  This file runs after every data and
   retrofit file so all helpers operate on the final registries. */
var libraryAudioBaseline = (audioTargets || []).length;
var libraryAudioAdded = 0;
var libraryAudioReused = 0;

function ensureLibraryAudioTarget(id, text, reading, extra) {
  if (!id || !text) return null;
  var target = getAudioTarget(id);
  if (!target) {
    target = (audioTargets || []).find(function (x) { return x.text === text && (!reading || !x.reading || x.reading === reading); });
    if (target) libraryAudioReused++;
  }
  if (!target) {
    target = { id:id, text:text, reading:reading || '', lang:'ja-JP', asset:null, ttsFallback:true, slowRate:.75, naturalRate:1, transcript:text, transcriptPolicy:'visible' };
    audioTargets.push(target); libraryAudioAdded++;
  }
  if (target.asset == null) target.ttsFallback = true;
  if (!target.lang) target.lang = 'ja-JP';
  if (target.text !== text) target.text = text;
  if (reading && !target.reading) target.reading = reading;
  if (target.slowRate == null) target.slowRate = .75;
  if (target.naturalRate == null) target.naturalRate = 1;
  if (!target.transcript) target.transcript = text;
  return target.id;
}

function libraryAudioFor(kind, item) {
  if (!item) return null;
  if (kind === 'kana') return ensureLibraryAudioTarget('audio-library-kana-'+item.id, item.char, item.char, {kind:kind});
  if (kind === 'vocabulary') return ensureLibraryAudioTarget('audio-library-vocab-'+item.id, item.japanese, item.reading, {kind:kind});
  if (kind === 'kanji') return ensureLibraryAudioTarget('audio-library-kanji-'+item.id, item.word, item.wordReading, {kind:kind});
  if (kind === 'grammar') return ensureLibraryAudioTarget('audio-library-grammar-'+item.id, item.example, '', {kind:kind});
  if (kind === 'life') return ensureLibraryAudioTarget('audio-library-life-'+item.moduleId+'-'+item.index, item.phrase[0], '', {kind:kind});
  if (kind === 'reading') return ensureLibraryAudioTarget('audio-library-reading-'+item.id, item.jp, '', {kind:kind});
  return null;
}

(kana || []).forEach(function (x) { x.libraryAudioId = libraryAudioFor('kana', x); });
(vocab || []).forEach(function (x) { x.libraryAudioId = libraryAudioFor('vocabulary', x); });
(kanji || []).forEach(function (x) { x.libraryAudioId = libraryAudioFor('kanji', x); });
(grammar || []).forEach(function (x) { x.libraryAudioId = libraryAudioFor('grammar', x); });
(life || []).forEach(function (m, mi) { (m.phrases || []).forEach(function (p, pi) { p.libraryAudioId = libraryAudioFor('life', {moduleId:mi, index:pi, phrase:p}); }); });
(readings || []).forEach(function (x) { x.libraryAudioId = libraryAudioFor('reading', x); });

function focusedOptions(answer, pool, count) {
  var values = [answer].concat((pool || []).filter(function (x) { return x && x !== answer; }).slice(0, count || 3));
  return Array.from(new Set(values));
}
function focusedQuiz(key, type, prompt, answer, options, why, targets) {
  return {key:key, type:type, prompt:prompt, options:focusedOptions(answer, options, 3), answer:answer, why:why || '', reviewTargets:targets || []};
}
function focusedResult(qs) { return {qs:qs, i:0, score:0, answered:false}; }

function buildFocusedKanaQuiz(id) {
  var k = (kana || []).find(function (x) { return x.id === id; });
  if (!k) return focusedResult([]);
  var same = kana.filter(function (x) { return x.script === k.script && x.id !== k.id; });
  return focusedResult([focusedQuiz(k.id, 'Kana', 'Which reading matches 「'+k.char+'」?', k.romaji, same.map(function (x) { return x.romaji; }), k.char+' is read '+k.romaji+'.', [{type:'kana', id:k.id}])]);
}
function buildFocusedVocabularyQuiz(id) {
  var v = (vocab || []).find(function (x) { return x.id === id; });
  if (!v) return focusedResult([]);
  var others = vocab.filter(function (x) { return x.id !== v.id; });
  return focusedResult([
    focusedQuiz(v.id, 'Vocabulary', 'What does 「'+v.japanese+'」 mean?', v.meaning, others.map(function (x) { return x.meaning; }), v.japanese+' means “'+v.meaning+'”.', [{type:'vocabulary', id:v.id}]),
    focusedQuiz(v.id, 'Vocabulary', 'Which reading matches 「'+v.japanese+'」?', v.reading, others.map(function (x) { return x.reading; }), v.japanese+' is read '+v.reading+'.', [{type:'vocabulary', id:v.id}])
  ]);
}
function buildFocusedKanjiQuiz(id) {
  var k = (kanji || []).find(function (x) { return x.id === id; });
  if (!k) return focusedResult([]);
  var others = kanji.filter(function (x) { return x.id !== k.id; });
  return focusedResult([
    focusedQuiz(k.id, 'Kanji', 'What is the core meaning of 「'+k.kanji+'」?', k.meaning, others.map(function (x) { return x.meaning; }), k.kanji+' means “'+k.meaning+'”. Learn its reading through '+k.word+' ('+k.wordReading+').', [{type:'kanji', id:k.id}]),
    focusedQuiz(k.id, 'Kanji', 'What is the reading of the example word 「'+k.word+'」?', k.wordReading, others.map(function (x) { return x.wordReading; }), k.word+' is the example word for '+k.kanji+'.', [{type:'kanji', id:k.id}])
  ]);
}
function buildFocusedGrammarQuiz(id) {
  var g = (grammar || []).find(function (x) { return x.id === id; });
  if (!g) return focusedResult([]);
  var others = grammar.filter(function (x) { return x.id !== g.id; });
  return focusedResult([
    focusedQuiz(g.id, 'Grammar', 'Which meaning best matches 「'+g.pattern+'」?', g.meaning, others.map(function (x) { return x.meaning; }), g.pattern+': '+g.explanation, [{type:'grammar', id:g.id}]),
    focusedQuiz(g.id, 'Grammar', 'Which example belongs to 「'+g.pattern+'」?', g.example, others.map(function (x) { return x.example; }), g.example+' — '+g.english, [{type:'grammar', id:g.id}])
  ]);
}

function getKanjiAnalysisExamples(kanjiId) {
  return (japaneseAnalyses || []).filter(function (a) { return (a.characters || []).some(function (c) { return c.kanjiId === kanjiId; }); }).slice(0, 2);
}

function normalizePracticeQuiz(q) {
  if (!q || !Array.isArray(q.qs)) return q;
  q.qs = q.qs.map(function (item) {
    item.options = Array.from(new Set([item.answer].concat(item.options || []).filter(function (x) { return x != null && String(x).trim(); })));
    item.options = shuffle(item.options);
    return item;
  });
  return q;
}
var _buildKanaQuiz = buildKanaQuiz, _buildKanjiQuiz = buildKanjiQuiz, _buildGrammarQuiz = buildGrammarQuiz, _buildQuiz = buildQuiz, _buildMixed = buildMixed, _buildLessonQuiz = buildLessonQuiz;
buildKanaQuiz = function (n) { return normalizePracticeQuiz(_buildKanaQuiz(n)); };
buildKanjiQuiz = function (n) { return normalizePracticeQuiz(_buildKanjiQuiz(n)); };
buildGrammarQuiz = function (n) { return normalizePracticeQuiz(_buildGrammarQuiz(n)); };
buildQuiz = function (n, d) { return normalizePracticeQuiz(_buildQuiz(n, d)); };
buildMixed = function (n) { return normalizePracticeQuiz(_buildMixed(n)); };
buildLessonQuiz = function (day) { return normalizePracticeQuiz(_buildLessonQuiz(day)); };

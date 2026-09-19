// Source-composed learning-surface audit. This is not browser QA.
const fs = require('fs');
const vm = require('vm');
const assert = require('node:assert/strict');
const root = require('path').resolve(__dirname, '..');
process.chdir(root);
const nodes = {};
const node = () => ({dataset:{},innerHTML:'',style:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},appendChild(){},insertAdjacentHTML(){},querySelectorAll(){return[]},querySelector(){return null},getContext(){return {scale(){},clearRect(){},save(){},restore(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},fillText(){}}},getBoundingClientRect(){return {width:320,height:240}},addEventListener(){},hasPointerCapture(){return false},setPointerCapture(){},releasePointerCapture(){}});
const ctx = vm.createContext({console:{info(){},log(){},warn(){},error(){}},URLSearchParams,location:{protocol:'https:',search:''},window:{scrollTo(){}},navigator:{},sessionStorage:{getItem(){return null},setItem(){},removeItem(){}},localStorage:{getItem(){return null},setItem(){}},getComputedStyle(){return {getPropertyValue(){return '#222';}}},setTimeout(){},clearTimeout(){},scrollTo(){},document:{getElementById(id){return nodes[id]??=node()},querySelectorAll(){return[]},querySelector(){return null},createElement(){return node()},documentElement:node(),body:node(),addEventListener(){}}});
for (const [, file] of fs.readFileSync('index.html','utf8').matchAll(/<script src="([^"]+)"/g)) vm.runInContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});
const run = code => vm.runInContext(code,ctx);
const result = run(`(function(){
  function unique(xs){return new Set(xs).size===xs.length;}
  function target(id){return id&&getAudioTarget(id);}
  function stats(items, audioField){var withAudio=items.filter(function(x){return target(x[audioField||'libraryAudioId']);});return {total:items.length,withAudio:withAudio.length,missingAudio:items.length-withAudio.length};}
  var lifePhrases=life.flatMap(function(m,mi){return (m.phrases||[]).map(function(p,pi){return {p:p,m:m,mi:mi,pi:pi};});});
  var kanaAudio=stats(kana), vocabAudio=stats(vocab), grammarAudio=stats(grammar);
  var kanjiAudio=kanji.map(function(k){return {libraryAudioId:k.libraryAudioId};});
  var kanjiContext=kanji.filter(function(k){return getKanjiAnalysisExamples(k.id).length;});
  var focused={kana:kana.filter(function(k){return buildFocusedKanaQuiz(k.id).qs.length;}).length,vocabulary:vocab.filter(function(v){return buildFocusedVocabularyQuiz(v.id).qs.length;}).length,kanji:kanji.filter(function(k){return buildFocusedKanjiQuiz(k.id).qs.length;}).length,grammar:grammar.filter(function(g){return buildFocusedGrammarQuiz(g.id).qs.length;}).length};
  var practiceChecks=[['kana recognition',buildKanaQuiz(10)],['kanji recognition',buildKanjiQuiz(10)],['grammar quiz',buildGrammarQuiz(10)],['lesson quiz',buildLessonQuiz(1)],['mixed practice',buildMixed(10)],['focused kana',buildFocusedKanaQuiz(kana[0].id)],['focused vocabulary',buildFocusedVocabularyQuiz(vocab[0].id)],['focused kanji',buildFocusedKanjiQuiz(kanji[0].id)],['focused grammar',buildFocusedGrammarQuiz(grammar[0].id)]];
  var allQs=practiceChecks.flatMap(function(x){return x[1].qs||[];});
  var questionIntegrity=allQs.every(function(q){return q.options.length>=2&&new Set(q.options).size===q.options.length&&q.options.filter(function(x){return x===q.answer;}).length===1&&q.key;});
  return {inventory:{kana:kana.length,vocabulary:vocab.length,kanji:kanji.length,grammar:grammar.length,lifePhrases:lifePhrases.length,readingPassages:readings.length},audio:{kana:kanaAudio,vocabulary:vocabAudio,kanji:{total:kanji.length,withExampleAudio:kanjiAudio.filter(function(x){return target(x.libraryAudioId);}).length,missingExampleAudio:kanjiAudio.filter(function(x){return !target(x.libraryAudioId);}).length},grammar:grammarAudio,life:{phraseTotal:lifePhrases.length,withAudio:lifePhrases.filter(function(x){return target(x.p.libraryAudioId);}).length,missingAudio:lifePhrases.filter(function(x){return !target(x.p.libraryAudioId);}).length},reading:{passageTotal:readings.length,withAudio:readings.filter(function(x){return target(x.libraryAudioId);}).length,missingAudio:readings.filter(function(x){return !target(x.libraryAudioId);}).length}},focused:focused,details:{kana:kana.length,vocabulary:vocab.length,kanji:kanji.filter(function(k){return typeof kanjiDetails==='function'&&kanjiDetails(k).includes('Kanji details');}).length,grammar:grammar.length},practiceGaps:{kana:{withFocusedPractice:focused.kana,withoutFocusedPractice:kana.length-focused.kana,withDetails:kana.length,withoutDetails:0},vocabulary:{withFocusedPractice:focused.vocabulary,withoutFocusedPractice:vocab.length-focused.vocabulary,withDetails:vocab.length,withoutDetails:0},kanji:{withFocusedPractice:focused.kanji,withoutFocusedPractice:kanji.length-focused.kanji,withDetails:kanji.length,withoutDetails:0},grammar:{withFocusedPractice:focused.grammar,withoutFocusedPractice:grammar.length-focused.grammar,withDetails:grammar.length,withoutDetails:0}},kanji:{cards:kanji.length,cardsWithDetails:kanji.filter(function(k){return typeof kanjiDetails==='function'&&kanjiDetails(k).includes('Kanji details');}).length,cardsWithExampleWordAudio:kanji.filter(function(k){var a=target(k.libraryAudioId);return a&&a.text===k.word;}).length,authoredContextKanji:kanjiContext.length,analysesReused:kanjiContext.reduce(function(n,k){return n+getKanjiAnalysisExamples(k.id).length;},0)},audioRegistry:{before:libraryAudioBaseline,added:libraryAudioAdded,reused:libraryAudioReused,after:audioTargets.length,duplicateIds:audioTargets.length-new Set(audioTargets.map(function(x){return x.id;})).size,brokenTargets:audioTargets.filter(function(x){return !x.id||!x.text||!x.lang||(!x.asset&&!x.ttsFallback);}).length},practice:{builders:{kana:focused.kana,vocabulary:focused.vocabulary,kanji:focused.kanji,grammar:focused.grammar},questionIntegrity:questionIntegrity,entryPoints:['Kana recognition → quiz','Kanji recognition → quiz','Grammar quiz → quiz','Lesson quiz → quiz','Mixed practice → quiz','Final mixed → quiz','Dashboard Writing Lab → writing','Dashboard Diagnostic → assessment','Kana Writing Lab → writing','Kanji Writing Lab → writing']}};
})()`);
assert.equal(result.audio.kana.missingAudio,0);assert.equal(result.audio.vocabulary.missingAudio,0);assert.equal(result.audio.kanji.missingExampleAudio,0);assert.equal(result.audio.grammar.missingAudio,0);assert.equal(result.audio.life.missingAudio,0);assert.equal(result.audio.reading.missingAudio,0);assert.equal(result.audioRegistry.duplicateIds,0);assert.equal(result.audioRegistry.brokenTargets,0);assert.equal(result.kanji.cardsWithDetails,result.kanji.cards);assert.equal(result.kanji.cardsWithExampleWordAudio,result.kanji.cards);assert.equal(result.focused.kana,result.inventory.kana);assert.equal(result.focused.vocabulary,result.inventory.vocabulary);assert.equal(result.focused.kanji,result.inventory.kanji);assert.equal(result.focused.grammar,result.inventory.grammar);assert.equal(result.practice.questionIntegrity,true);
run("practiceMode='hub';quiz=null;assessmentSession=null;practicePage()");
assert.ok(nodes.practice.innerHTML.includes('Quick Practice') && nodes.practice.innerHTML.includes('Writing Lab') && nodes.practice.innerHTML.includes('Assessment'));
run("startPracticeQuiz(buildFocusedKanaQuiz(kana[0].id))");
assert.ok(nodes.practice.innerHTML.includes('Question 1/') && nodes.practice.innerHTML.includes('class=\"options\"'));
run("openPracticeMode('writing')");
assert.ok(nodes.practice.innerHTML.includes('Writing Lab'));
run("openPracticeMode('assessment')");
assert.ok(nodes.practice.innerHTML.includes('Assessment Lab') && nodes.practice.innerHTML.includes('Start'));
for (const page of ['kanaPage','vocabPage','kanjiPage','grammarPage','lifePage','readingPage']) {
  run(page+'()');
  const id = page === 'vocabPage' ? 'vocabulary' : page.replace('Page','');
  assert.ok(nodes[id] && nodes[id].innerHTML && nodes[id].innerHTML.length > 100, page+' did not render');
}
const beforeState = JSON.stringify(run('state'));
let lessonsOpened = 0, lessonFailures = [];
for (let day=1; day<=90; day++) {
  try { run(`window.NIHON_PATH.dev.openLesson(${day})`); if (!nodes.lesson.innerHTML || !nodes.lesson.innerHTML.includes('DAY')) lessonFailures.push(day); else lessonsOpened++; }
  catch (e) { lessonFailures.push(day); }
}
assert.equal(lessonsOpened,90);assert.deepEqual(lessonFailures,[]);assert.equal(JSON.stringify(run('state')),beforeState);
console.log(JSON.stringify(result,null,2));

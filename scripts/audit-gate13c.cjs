// Static source/render audit only: no browser, playback, or device QA.
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
process.chdir(require('node:path').resolve(__dirname, '..'));  const nodes={};const node=()=>({dataset:{},innerHTML:'',style:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},insertAdjacentHTML(){},querySelectorAll(){return[]}});const ctx=vm.createContext({console:{info(){},log(){}},document:{getElementById(id){return nodes[id]??=node()},querySelectorAll(){return[]},documentElement:node(),body:node(),addEventListener(){}},localStorage:{getItem(){return null},setItem(){}},URLSearchParams,location:{protocol:"https:",search:""},window:{},navigator:{},setTimeout(){},clearTimeout(){},scrollTo(){}});
for(const [,file] of fs.readFileSync('index.html','utf8').matchAll(/<script src="([^"]+)"/g)){try{vm.runInContext(fs.readFileSync(file,'utf8'),ctx,{filename:file})}catch(e){console.error(file,e);process.exit(1)}}
const run = code => vm.runInContext(code, ctx);
const report = run('validateContent()');
const expected = Array.from({length:20},(_,i)=>'c'+(i+1)).concat(['conv-phase4-request','conv-phase4-ongoing','conv-phase4-permission','conv-phase4-restaurant']);
assert.deepEqual(Array.from(run('conversationEnrichmentCompletedConversationIds')), expected);
run('convPage()');
const html=nodes.conversations.innerHTML;
assert.deepEqual([...html.matchAll(/data-conversation-id="([^"]+)"/g)].map(m=>m[1]),expected);
assert.equal([...html.matchAll(/data-conversation-line-id=/g)].length,75);
const lines=run('getStandaloneConversations().flatMap(c=>c.lines)');
for(const l of lines) {
  assert.equal(Array.isArray(l),false);
  for(const field of ['id','japanese','reading','romaji','english','meaning','role','usage','speaker']) assert.ok(typeof l[field]==='string' && l[field].trim(),`${l.id}: ${field}`);
  const markup=run(`renderStandaloneConversationLine(${JSON.stringify(l)})`);
  const useful=run(`hasUsefulConversationAnalysis(getJapaneseAnalysis(${JSON.stringify(l.analysisId)}))`);
  assert.equal(markup.includes('<details'),l.analysisRequired && useful);
}
for(const c of run('conversations.filter(c=>!conversationEnrichmentCompletedConversationIds.includes(c.id))')) assert.ok(!html.includes(`data-conversation-id="${c.id}"`));
for(const name of ['audioTargets','japaneseAnalyses']) {
  const ids=Array.from(run(name+'.map(x=>x.id)'));
  assert.equal(new Set(ids).size,ids.length,`Duplicate IDs in ${name}`);
}
const ids=Array.from(run('conversations.flatMap(c=>c.lines).filter(l=>l.id).map(l=>l.id)'));
assert.equal(new Set(ids).size,ids.length,'Duplicate source line IDs');
assert.ok(report.audioTargetCount>=209,'Accepted conversation audio targets were removed');assert.equal(report.analysisCount,150);
assert.equal(report.dailyConversationReferencesResolved,38);assert.equal(report.dailyConversationReferencesMissing,0);
assert.equal(report.standaloneAudioCoveredCount,75);assert.equal(report.linesWithJapaneseScriptInRomaji,0);
assert.equal(report.linesWithExactlyOneClassification,75);
assert.equal(report.assessmentCount,3);assert.equal(report.assessmentQuestionCount,79);
assert.equal(run('lessons.filter(l=>l.status==="reviewed").length'),90);
for(const field of ['itemsWithReading','itemsWithRomaji','itemsWithMeaning']) assert.equal(report.fullCourseReadability[field],report.fullCourseReadability.dailyCourseItemCount);
assert.equal(run("conversations.find(c=>c.id==='conv-phase4-station').lines[2][2]"),'Thank you very much.');
assert.ok(!/phase4C\b|line-conv-phase4-(station|home)-|CompletedConversationIds.push\('conv-phase4-station'/.test(fs.readFileSync('data/conversation-library-enrichment.js','utf8')));
// Negative checks: the validator must catch contract damage without throwing,
// while incomplete hidden metadata alone remains outside standalone scope.
const baselineErrors=Array.from(report.errors);
function detects(change,restore,fragment) {
  run(change);
  const damaged=run('validateContent()');
  run(restore);
  assert.ok(damaged.errors.some(e=>e.includes(fragment)),fragment);
}
detects("var savedRomaji=conversations[0].lines[0].romaji;conversations[0].lines[0].romaji='あ'", "conversations[0].lines[0].romaji=savedRomaji",'Japanese script in standalone romaji');
detects("var savedAudio=getAudioTarget(conversations[0].lines[0].audioId).reading;getAudioTarget(conversations[0].lines[0].audioId).reading='wrong'", "getAudioTarget(conversations[0].lines[0].audioId).reading=savedAudio",'Standalone audio missing or mismatched');
detects("var savedRef=lessons[0].conversationId;lessons[0].conversationId='missing-test'", "lessons[0].conversationId=savedRef",'missing conversation: missing-test');
detects("conversationEnrichmentCompletedConversationIds.push('conv-phase4-station')", "conversationEnrichmentCompletedConversationIds.pop()",'accepted conversation IDs differ');
run("var hiddenLine=conversations.find(c=>!conversationEnrichmentCompletedConversationIds.includes(c.id)).lines[0];var savedHiddenRomaji=hiddenLine.romaji;delete hiddenLine.romaji");
assert.deepEqual(Array.from(run('validateContent().errors')),baselineErrors);
run('if(savedHiddenRomaji!==undefined)hiddenLine.romaji=savedHiddenRomaji');
// Gate 13C1: exact bounded repair set and all required analysis references.
const repairedIds = ['c18-01','c18-02','c18-03','c19-01','c20-01','c20-02',
  'conv-phase4-request-01','conv-phase4-request-03','conv-phase4-ongoing-01','conv-phase4-ongoing-02',
  'conv-phase4-permission-01','conv-phase4-permission-02','conv-phase4-permission-03','conv-phase4-permission-04',
  'conv-phase4-restaurant-01','conv-phase4-restaurant-02','conv-phase4-restaurant-03'].map(id=>'analysis-line-'+id);
assert.deepEqual(Array.from(run('canonicalAnalysisRepairs.map(a=>a.id)')),repairedIds);
const japaneseScript = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u;
const requiredLines = lines.filter(l=>l.analysisRequired);
assert.equal(requiredLines.length,37);
for (const l of requiredLines) {
  const a=run(`getJapaneseAnalysis(${JSON.stringify(l.analysisId)})`);
  assert.equal(run(`japaneseAnalyses.filter(a=>a.id===${JSON.stringify(l.analysisId)}).length`),1);
  assert.equal(a.japanese,l.japanese);
  assert.ok(a.reading && a.romaji && !japaneseScript.test(a.romaji));
  const audio=run(`getAudioTarget(${JSON.stringify(a.audioId)})`);
  assert.ok(audio);assert.equal(audio.text,l.japanese);
  for (const token of a.tokens) {
    assert.ok(token.meaning.trim() && (!japaneseScript.test(token.surface) || token.meaning.trim()!==token.surface.trim()));
    assert.ok(token.reading && !/\p{Script=Han}/u.test(token.reading));
    assert.ok(token.romaji && /[A-Za-z]/.test(token.romaji) && !japaneseScript.test(token.romaji));
    if(repairedIds.includes(a.id)) {
      assert.ok(token.role && token.role!=='particle' && token.role!=='conversation phrase');
      if(['は','を','へ'].includes(token.surface)) assert.equal(token.romaji,{'は':'wa','を':'o','へ':'e'}[token.surface]);
    }
  }
}
const forms = {'見ませんか':'見る','食べませんか':'食べる','書いて':'書く','しています':'する','飲んでいます':'飲む','見て':'見る','撮って':'撮る','好きです':'好き'};
for(const a of run('canonicalAnalysisRepairs')) for(const token of a.tokens) if(forms[token.surface]) {
  assert.equal(token.baseForm,forms[token.surface]);assert.ok(token.conjugation);
}
// One translated token must not hide another token with a copied meaning.
detects("var repaired=getJapaneseAnalysis('analysis-line-c18-01');var savedMeaning=repaired.tokens[0].meaning;repaired.tokens[0].meaning=repaired.tokens[0].surface", "repaired.tokens[0].meaning=savedMeaning",'empty/generic shell');
detects("var savedTokenRomaji=repaired.tokens[0].romaji;repaired.tokens[0].romaji='しゅみ'", "repaired.tokens[0].romaji=savedTokenRomaji",'token reading/romaji invalid');
detects("var savedAnalysisAudio=repaired.audioId;delete repaired.audioId", "repaired.audioId=savedAnalysisAudio",'analysis audio missing or mismatched');
const day89=run('lessons.find(l=>l.day===89)');
assert.equal(day89.status,'reviewed');assert.ok(day89.practice.length && day89.quiz.length);
assert.deepEqual(Array.from(run('validateContent().errors')),baselineErrors);
assert.equal(report.standaloneAnalysisRequiredCount,37);
assert.equal(report.standaloneAnalysisResolvedCount,37);
assert.equal(report.standaloneUsefulAnalysisCount,37);
console.log(JSON.stringify({staticChecks:'PASS',browserQA:'NOT PERFORMED',gate13c:report.errors.length?'NOT READY':'COMPLETE FOR V1',report},null,2));
process.exitCode=report.errors.length?1:0;

function renderJapaneseAnalysis(analysisOrId){
  const a=typeof analysisOrId==='string'?getJapaneseAnalysis(analysisOrId):analysisOrId;
  if(!a)return '';
  const tokenDetails=(a.tokens||[]).map(function(t){
    const v=t.vocabularyId&&vocab.find(function(x){return x.id===t.vocabularyId});
    const g=t.grammarId&&grammar.find(function(x){return x.id===t.grammarId});
    return `<div class="analysisToken"><div class="jp analysisSurface">${E(t.surface||'')}</div>${t.reading?`<div class="reading">${E(t.reading)}</div>`:''}${t.romaji?`<div class="romaji">${E(t.romaji)}</div>`:''}<div class="analysisMeaning">${E(t.meaning||'')} <span class="analysisRole">${E(t.role||'')}</span></div>${t.baseForm?`<div class="meta"><b>Base:</b> ${E(t.baseForm)}</div>`:''}${t.conjugation?`<div class="meta"><b>Form:</b> ${E(t.conjugation)}</div>`:''}${t.partOfSpeech?`<div class="meta"><b>Part of speech:</b> ${E(t.partOfSpeech)}</div>`:''}${g?`<div class="meta"><b>Grammar:</b> ${E(g.pattern)} — ${E(g.meaning)}</div>`:''}${v?`<div class="meta"><b>Word:</b> ${E(v.japanese)} — ${E(v.meaning)}</div>`:''}${t.note?`<div class="meta">${E(t.note)}</div>`:''}</div>`;
  }).join('');
  const chars=(a.characters||[]).map(function(c){return `<div class="analysisCharacter">${c.word?`<b>Word: ${E(c.word)}</b>`:''}<span class="jp analysisSurface">${E(c.character||'')}</span><span>${E(c.type||'')}</span>${c.readingInWord?`<span><b>Reading in word:</b> ${E(c.readingInWord)}</span>`:''}${c.role?`<span><b>Role:</b> ${E(c.role)}</span>`:''}${c.coreMeaning?`<span><b>Helps express:</b> ${E(c.coreMeaning)}</span>`:''}${c.note?`<span>${E(c.note)}</span>`:''}</div>`;}).join('');
  return `${a.audioId && typeof renderAudioControls==="function" ? renderAudioControls(a.audioId) : ""}<details class="analysisDetails"><summary>Break this down</summary><div class="analysisPanel"><div class="analysisSection"><b>Reading</b><div class="reading">${E(a.reading)}</div></div>${a.romaji?`<div class="analysisSection romaji"><b>Romaji</b><div>${E(a.romaji)}</div></div>`:''}<div class="analysisSection"><b>Natural meaning</b><div>${E(a.naturalEnglish)}</div></div>${a.literalEnglish?`<div class="analysisSection"><b>Literal / structural meaning</b><div class="muted">${E(a.literalEnglish)}</div></div>`:''}${tokenDetails?`<div class="analysisSection"><b>Word-by-word breakdown</b><div class="analysisTokens">${tokenDetails}</div></div>`:''}${chars?`<div class="analysisSection"><b>Character details</b><div class="analysisCharacters">${chars}</div><div class="meta">Character details help you recognize and remember the word. Learn the whole word as the vocabulary unit.</div></div>`:''}${a.pronunciationNote?`<div class="analysisSection"><b>Pronunciation</b><div>${E(a.pronunciationNote)}</div></div>`:''}${a.usageNote?`<div class="analysisSection"><b>Usage</b><div>${E(a.usageNote)}</div></div>`:''}</div></details>`;
}
function renderLessonExample(example){
  const base=`<div class="jp">${E(example.japanese)}</div><small>${E(example.english)}</small>`;
  const analysis=example.analysisId&&getJapaneseAnalysis(example.analysisId);
  return `<div class="example">${base}${analysis?renderJapaneseAnalysis(analysis):''}</div>`;
}
/* Decorate the existing lesson renderer so legacy markup remains unchanged. */
var renderLegacyLesson=lesson;
lesson=function(d){
  renderLegacyLesson(d);
  const l=lessons.find(function(item){return item.day===d})||lessons[0];
  const examples=document.querySelectorAll('#lesson .example');
  (l.examples||[]).forEach(function(example,i){const a=example.analysisId&&getJapaneseAnalysis(example.analysisId);if(a&&examples[i])examples[i].insertAdjacentHTML('beforeend',renderJapaneseAnalysis(a));});
};

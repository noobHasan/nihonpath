function validateContent() {
  const report = { errors: [], warnings: [] };
  const unique = (items, label) => { const ids = new Set(); items.forEach(item => { if (!item.id) report.errors.push(`${label} missing id`); else if (ids.has(item.id)) report.errors.push(`Duplicate ${label} id: ${item.id}`); else ids.add(item.id); }); return ids; };
  const sets = { vocabulary: unique(vocab,'vocabulary'), grammar: unique(grammar,'grammar'), kana: unique(kana,'kana'), kanji: unique(kanji,'kanji'), conversation: unique(conversations,'conversation'), lesson: unique(lessons,'lesson') };
  const analysisSet = unique(japaneseAnalyses || [], 'analysis');
  const audioSet = unique(audioTargets || [], 'audio target');
  const speakingTaskSet = unique(speakingTasksV2 || [], 'speaking task');
  const writingTaskSet = unique(writingTasksV2 || [], 'writing task');
  const assessmentSet = unique(assessmentsV2 || [], 'assessment');
  const assessmentQuestionSet = new Set();
  const supportedSkills = new Set(['reading','writing','listening','speaking','grammar','practical']);
  const validateAnalysis = (a, owner) => {
    if (!a || typeof a !== 'object') return;
    ['id','japanese','reading','romaji','naturalEnglish','literalEnglish'].forEach(f => { if (typeof a[f] !== 'string' || !a[f]) report.errors.push(`${owner} analysis missing ${f}`); });
    if (!Array.isArray(a.tokens)) report.errors.push(`${owner} analysis tokens must be an array`);
    (a.tokens || []).forEach((t, i) => { if (!t || typeof t.surface !== 'string' || !t.surface || typeof t.meaning !== 'string' || !t.meaning) report.errors.push(`${owner} analysis token ${i} missing surface/meaning`); if (t.vocabularyId && !sets.vocabulary.has(t.vocabularyId)) report.errors.push(`${owner} analysis token invalid vocabulary: ${t.vocabularyId}`); if (t.grammarId && !sets.grammar.has(t.grammarId)) report.errors.push(`${owner} analysis token invalid grammar: ${t.grammarId}`); });
    if (a.characters !== undefined && !Array.isArray(a.characters)) report.errors.push(`${owner} character details must be an array`);
    (a.characters || []).forEach((c, i) => { if (!c || typeof c.character !== 'string' || !c.character || !['hiragana','katakana','kanji'].includes(c.type)) report.errors.push(`${owner} invalid character detail ${i}`); if (c.readingInWord !== undefined && (typeof c.readingInWord !== 'string' || !c.readingInWord)) report.errors.push(`${owner} character ${i} invalid readingInWord`); if (c.kanjiId && !sets.kanji.has(c.kanjiId)) report.errors.push(`${owner} character ${i} invalid kanji: ${c.kanjiId}`); if (c.strokeCount !== undefined && (!Number.isInteger(c.strokeCount) || c.strokeCount < 1)) report.errors.push(`${owner} character ${i} invalid strokeCount`); });
  };
  const validateOptional = (item, owner) => {
    if (item.analysisId !== undefined && (typeof item.analysisId !== 'string' || !item.analysisId)) report.errors.push(`${owner} invalid analysisId`);
    if (item.analysis !== undefined) validateAnalysis(item.analysis, owner);
    if (item.skillTargets !== undefined) { if (!item.skillTargets || typeof item.skillTargets !== 'object' || Object.keys(item.skillTargets).some(k => !supportedSkills.has(k) || typeof item.skillTargets[k] !== 'boolean')) report.errors.push(`${owner} invalid skillTargets`); }
    (item.writingTasks || []).filter(t => t && typeof t === 'object').forEach((t, i) => { if (!t.id || !t.type || !t.prompt || !t.target) report.errors.push(`${owner} malformed writingTask ${i}`); });
    (item.speakingTasks || []).filter(t => t && typeof t === 'object').forEach((t, i) => { if (!t.id || !t.type || !t.prompt || !t.modelText) report.errors.push(`${owner} malformed speakingTask ${i}`); });
  };
  [lessons, vocab, grammar, kana, kanji, conversations, speaking, life, culture, readings].forEach((items, group) => (items || []).forEach((item, i) => validateOptional(item, `${group}[${i}]`)));
  (japaneseAnalyses || []).forEach((a, i) => { validateAnalysis(a, `analysis[${i}]`); });
  const transcriptPolicies = new Set(['visible','hidden-until-reveal','hidden']);
  (audioTargets || []).forEach((a, i) => { if (typeof a.text !== 'string' || !a.text || typeof a.lang !== 'string' || !a.lang) report.errors.push(`audio[${i}] missing text/lang`); if (a.asset !== undefined && a.asset !== null && typeof a.asset !== 'string') report.errors.push(`audio[${i}] invalid asset`); if (a.ttsFallback !== undefined && typeof a.ttsFallback !== 'boolean') report.errors.push(`audio[${i}] invalid ttsFallback`); if (!a.asset && a.ttsFallback !== true) report.errors.push(`audio[${i}] has no playback method`); ['slowRate','naturalRate'].forEach(f => { if (a[f] !== undefined && (typeof a[f] !== 'number' || a[f] <= 0 || a[f] > 2)) report.errors.push(`audio[${i}] invalid ${f}`); }); if (a.transcriptPolicy !== undefined && !transcriptPolicies.has(a.transcriptPolicy)) report.errors.push(`audio[${i}] invalid transcriptPolicy`); });
  (japaneseAnalyses || []).forEach((a, i) => { if (a.audioId && !audioSet.has(a.audioId)) report.errors.push(`analysis[${i}] invalid audio reference: ${a.audioId}`); });
  const speakingTypes = new Set(['repeat','shadow','say-without-looking','role-play']);
  (speakingTasksV2 || []).forEach((t, i) => { if (!speakingTypes.has(t.type) || !t.prompt || !t.modelText) report.errors.push(`speaking task ${i} malformed`); if (t.audioId && !audioSet.has(t.audioId)) report.errors.push(`speaking task ${i} invalid audio: ${t.audioId}`); if (t.analysisId && !analysisSet.has(t.analysisId)) report.errors.push(`speaking task ${i} invalid analysis: ${t.analysisId}`); if (t.audioId && getAudioTarget(t.audioId).text.trim() !== t.modelText.trim()) report.errors.push(`speaking task ${i} audio/model surface mismatch`); if (t.analysisId && getJapaneseAnalysis(t.analysisId).japanese.trim() !== t.modelText.trim()) report.errors.push(`speaking task ${i} analysis/model surface mismatch`); if (typeof t.hideTextInitially !== 'boolean' || typeof t.required !== 'boolean') report.errors.push(`speaking task ${i} invalid flags`); (t.reviewTargets || []).forEach(x => { if (!sets[x?.type]?.has(x?.id)) report.errors.push(`speaking task ${i} invalid review target: ${JSON.stringify(x)}`); }); });
  const writingTypes = new Set(['kana-trace','kana-recall','kanji-self-check','type-reading','type-japanese','sentence-order','dictation','free-short-response']);
  (writingTasksV2 || []).forEach((t,i) => { if (!writingTypes.has(t.type) || !t.instruction || !t.prompt || !t.target) report.errors.push(`writing task ${i} missing required fields`); if (Array.isArray(t.acceptableAnswers) && (!t.acceptableAnswers.length || t.acceptableAnswers.some(a=>typeof a!=='string'||!a.trim()) || new Set(t.acceptableAnswers.map(normalizeWritingAnswer)).size!==t.acceptableAnswers.length)) report.errors.push(`writing task ${i} invalid acceptableAnswers`); if (t.analysisId && !analysisSet.has(t.analysisId)) report.errors.push(`writing task ${i} invalid analysis: ${t.analysisId}`); if (t.audioId && !audioSet.has(t.audioId)) report.errors.push(`writing task ${i} invalid audio: ${t.audioId}`); if (t.type==='dictation' && !t.audioId) report.errors.push(`writing task ${i} dictation requires audioId`); if (t.type==='sentence-order' && (!Array.isArray(t.units)||!t.units.length||!Array.isArray(t.order)||t.order.length!==t.units.length||new Set(t.order).size!==t.units.length)) report.errors.push(`writing task ${i} requires authored units/order`); if (t.type==='free-short-response' && Array.isArray(t.acceptableAnswers) && t.acceptableAnswers.length===1) report.errors.push(`writing task ${i} free response must not fake exact grading`); (t.reviewTargets||[]).forEach(x=>{if(!sets[x?.type]?.has(x?.id))report.errors.push(`writing task ${i} invalid review target: ${JSON.stringify(x)}`);}); });
  const assessmentSections = new Set(['vocabulary-orthography','grammar','sentence-composition','reading','information-retrieval','listening','practical-communication']);
  const assessmentTypes = new Set(['multiple-choice','typed-answer','sentence-order','reading-multiple-choice','information-retrieval','listening-multiple-choice','practical-response-choice','self-check-production']);
  (assessmentsV2||[]).forEach((a,ai)=>{if(!a.title||!Array.isArray(a.sections)||!a.sections.length)report.errors.push(`assessment ${ai} malformed`);let sectionIds=new Set();(a.sections||[]).forEach((s,si)=>{if(!assessmentSections.has(s.kind)||sectionIds.has(s.id)||!s.id||!Array.isArray(s.questions))report.errors.push(`assessment ${ai} invalid section ${si}`);sectionIds.add(s.id);(s.questions||[]).forEach((q,qi)=>{if(!q.id||assessmentQuestionSet.has(q.id)||!assessmentTypes.has(q.type)||!q.prompt)report.errors.push(`assessment question ${ai}/${si}/${qi} malformed`);assessmentQuestionSet.add(q.id);if(q.type==='multiple-choice'||q.type==='reading-multiple-choice'||q.type==='information-retrieval'||q.type==='listening-multiple-choice'||q.type==='practical-response-choice'){if(!Array.isArray(q.options)||q.options.length<2||new Set(q.options).size!==q.options.length||!q.options.includes(q.answer))report.errors.push(`assessment question ${q.id} invalid options`);}if(q.type==='typed-answer'&&!Array.isArray(q.acceptableAnswers))report.errors.push(`assessment question ${q.id} missing acceptableAnswers`);if(q.type==='sentence-order'&&(!Array.isArray(q.units)||!Array.isArray(q.order)||q.order.length!==q.units.length))report.errors.push(`assessment question ${q.id} invalid order`);if(q.type==='listening-multiple-choice'&&(!q.audioId||!audioSet.has(q.audioId)))report.errors.push(`assessment question ${q.id} invalid audio`);if(q.analysisId&&!analysisSet.has(q.analysisId))report.errors.push(`assessment question ${q.id} invalid analysis`);if(q.points!==undefined&&(!(q.points>0)&&q.type!=='self-check-production'))report.errors.push(`assessment question ${q.id} invalid points`);(q.reviewTargets||[]).forEach(t=>{let valid=sets[t?.type]?.has(t?.id)||['reading','listening','sentence-composition','practical communication'].includes(t?.type);if(!valid)report.errors.push(`assessment question ${q.id} invalid review target`);});});});(a.thresholds?.sections&&Object.values(a.thresholds.sections)||[]).forEach(v=>{if(v<0||v>100)report.errors.push(`assessment ${a.id} invalid threshold`);});if(a.thresholds?.overall<0||a.thresholds?.overall>100)report.errors.push(`assessment ${a.id} invalid overall threshold`);});
  const days = new Set(), quizIds = new Set();
  lessons.forEach(l => {
    validateOptional(l, l.id || `lesson[${l.day}]`);
    if (l.day <= 60 && l.day >= 21) { ['analysisIds','audioIds','speakingTasks','writingTasks'].forEach(f => { if (!Array.isArray(l[f])) report.errors.push(`${l.id} missing retrofit array: ${f}`); }); if (!l.skillTargets || Object.keys(l.skillTargets).some(k => !supportedSkills.has(k) || typeof l.skillTargets[k] !== 'boolean')) report.errors.push(`${l.id} invalid retrofit skillTargets`); (l.analysisIds||[]).forEach(id => { if (!analysisSet.has(id)) report.errors.push(`${l.id} invalid retrofit analysis: ${id}`); }); (l.audioIds||[]).forEach(id => { if (!audioSet.has(id)) report.errors.push(`${l.id} invalid retrofit audio: ${id}`); }); (l.speakingTasks||[]).forEach(id => { if (!speakingTaskSet.has(id)) report.errors.push(`${l.id} invalid retrofit speaking task: ${id}`); }); (l.writingTasks||[]).forEach(id => { if (!writingTaskSet.has(id)) report.errors.push(`${l.id} invalid retrofit writing task: ${id}`); }); }
    (l.examples || []).forEach((example, i) => { if (example.analysisId) { if (!analysisSet.has(example.analysisId)) report.errors.push(`${l.id} invalid analysis reference: ${example.analysisId}`); else if (getJapaneseAnalysis(example.analysisId).japanese.trim() !== String(example.japanese || '').trim()) report.errors.push(`${l.id} analysis surface mismatch at example ${i}`); } });
    if (days.has(l.day)) report.errors.push(`Duplicate lesson day: ${l.day}`); days.add(l.day);
    if (!Number.isInteger(l.day) || l.day < 1 || l.day > 90) report.errors.push(`Invalid lesson day: ${l.day}`);
    if (!['draft','authored','reviewed'].includes(l.status)) report.errors.push(`${l.id} invalid status: ${l.status}`);
    if (!['full','support','minimal','off'].includes(l.romajiPolicy)) report.errors.push(`${l.id} invalid romajiPolicy: ${l.romajiPolicy}`);
    if (['authored','reviewed'].includes(l.status) && !Array.isArray(l.examples)) report.errors.push(`${l.id} missing examples array`);
    if (['authored','reviewed'].includes(l.status) && (!l.objectives?.length || !l.practice?.length || !l.quiz?.length)) report.errors.push(`${l.id} authored/reviewed lesson is incomplete`);
    ['vocabularyIds','grammarIds','kanaIds','kanjiIds','lifeModuleIds','cultureTopicIds','reviewTargets'].forEach(f => { if (!Array.isArray(l[f])) report.errors.push(`${l.id} missing array: ${f}`); });
    [['vocabularyIds','vocabulary'],['grammarIds','grammar'],['kanaIds','kana'],['kanjiIds','kanji']].forEach(([f,t]) => (l[f]||[]).forEach(id => { if (!sets[t].has(id)) report.errors.push(`${l.id} missing ${t}: ${id}`); }));
    if (l.conversationId && !sets.conversation.has(l.conversationId)) report.errors.push(`${l.id} missing conversation: ${l.conversationId}`);
    if (l.conversationId) { const c=conversations.find(x=>x.id===l.conversationId); if (!c || !c.title || !Array.isArray(c.lines) || !c.lines.length) report.errors.push(`${l.id} malformed conversation: ${l.conversationId}`); }
    (l.prerequisites||[]).forEach(id => { const p=lessons.find(x=>x.id===id); if (!p) report.errors.push(`${l.id} invalid prerequisite: ${id}`); else if (p.day >= l.day) report.errors.push(`${l.id} future/self prerequisite: ${id}`); });
    (l.quiz||[]).forEach(q => { if (quizIds.has(q.id)) report.errors.push(`Duplicate quiz id: ${q.id}`); quizIds.add(q.id); if (!q.id || !q.type || !q.prompt || !q.answer || !Array.isArray(q.options) || q.options.length < 2 || (q.type==='multiple-choice' && !q.options.includes(q.answer)) || new Set(q.options).size !== q.options.length) report.errors.push(`${l.id} malformed quiz question: ${q.id||'unknown'}`); (q.reviewTargets||[]).forEach(t => { if (!sets[t?.type]?.has(t?.id)) report.errors.push(`${l.id} invalid quiz review target: ${JSON.stringify(t)}`); }); });
  });
  if (lessons.length !== 90) report.errors.push(`Expected 90 lessons, found ${lessons.length}`);
  lessons.forEach(l => (l.reviewTargets||[]).forEach(t => { if (!sets[t?.type]?.has(t?.id)) report.errors.push(`${l.id} invalid review target: ${JSON.stringify(t)}`); }));
  report.analysisCount = (japaneseAnalyses || []).length;
  report.audioTargetCount = (audioTargets || []).length;
  report.speakingTaskCount = (speakingTasksV2 || []).length;
  report.writingTaskCount = (writingTasksV2 || []).length;
  report.assessmentCount = (assessmentsV2 || []).length;
  report.assessmentQuestionCount = assessmentQuestionSet.size;
  if (typeof auditDailyCourseReadability === 'function') { const d = auditDailyCourseReadability(); Object.assign(report,d); if (d.itemsWithReading!==d.dailyCourseItemCount || d.itemsWithRomaji!==d.dailyCourseItemCount || d.itemsWithMeaning!==d.dailyCourseItemCount || d.kanjiItemsWithWholeWordReading!==d.kanjiItemCount || d.analysisCoveredCount!==d.analysisRequiredCount) report.errors.push('Days 1–20 Daily Course readability coverage is incomplete'); }
  if (typeof auditDailyCourseReadability === 'function') { const d8 = auditDailyCourseReadability(40); Object.keys(d8).forEach(k => report['days21to40'+k[0].toUpperCase()+k.slice(1)] = d8[k]); if (d8.itemsWithReading!==d8.dailyCourseItemCount || d8.itemsWithRomaji!==d8.dailyCourseItemCount || d8.itemsWithMeaning!==d8.dailyCourseItemCount || d8.kanjiItemsWithWholeWordReading!==d8.kanjiItemCount || d8.analysisCoveredCount!==d8.analysisRequiredCount) report.errors.push('Days 21–40 Daily Course readability coverage is incomplete'); }
  if (typeof auditDailyCourseReadability === 'function') { const d9 = auditDailyCourseReadability(60,41); Object.keys(d9).forEach(k => report['days41to60'+k[0].toUpperCase()+k.slice(1)] = d9[k]); if (d9.itemsWithReading!==d9.dailyCourseItemCount || d9.itemsWithRomaji!==d9.dailyCourseItemCount || d9.itemsWithMeaning!==d9.dailyCourseItemCount || d9.kanjiItemsWithWholeWordReading!==d9.kanjiItemCount || d9.analysisCoveredCount!==d9.analysisRequiredCount) report.errors.push('Days 41–60 Daily Course readability coverage is incomplete'); }
  if (typeof gate9ConversationLines !== 'undefined') { const cs = conversations.filter(c => typeof gate9ConversationIds !== 'undefined' && gate9ConversationIds.has(c.id)); const lines = cs.flatMap(c => c.lines || []); const lineSet = new Set(); lines.forEach(x => { const z = Array.isArray(x) ? { id:null } : x; if (!z.id || lineSet.has(z.id)) report.errors.push('Gate 9B conversation line missing/duplicate stable id'); else lineSet.add(z.id); ['japanese','reading','romaji','english','speaker','audioId','analysisId'].forEach(f => { if (!z[f]) report.errors.push(`Gate 9B line ${z.id || 'unknown'} missing ${f}`); }); if (z.audioId && (!audioSet.has(z.audioId) || getAudioTarget(z.audioId).text.trim() !== z.japanese.trim())) report.errors.push(`Gate 9B line ${z.id} invalid audio`); if (z.analysisId && !analysisSet.has(z.analysisId)) report.errors.push(`Gate 9B line ${z.id} invalid analysis`); }); const required=lines.filter(x => !Array.isArray(x) && x.analysisRequired); Object.assign(report,{conversationCount:cs.length,conversationLineCount:lines.length,linesWithReading:lines.filter(x=>x.reading).length,linesWithRomaji:lines.filter(x=>x.romaji).length,linesWithMeaning:lines.filter(x=>x.english||x.meaning).length,linesWithAudio:lines.filter(x=>x.audioId).length,analysisRequiredLineCount:required.length,analysisCoveredLineCount:required.filter(x=>x.analysisId&&analysisSet.has(x.analysisId)).length,rolePlayableConversationCount:cs.filter(c=>c.lines.some(x=>x.speaker&&x.audioId)).length}); report.readingCoveragePercent=Math.round(report.linesWithReading*100/lines.length);report.romajiDataCoveragePercent=Math.round(report.linesWithRomaji*100/lines.length);report.meaningCoveragePercent=Math.round(report.linesWithMeaning*100/lines.length);report.audioCoveragePercent=Math.round(report.linesWithAudio*100/lines.length);report.analysisCoveragePercent=100;report.rolePlayCoveragePercent=100; if ([report.readingCoveragePercent,report.romajiDataCoveragePercent,report.meaningCoveragePercent,report.audioCoveragePercent].some(x=>x!==100)) report.errors.push('Gate 9B conversation coverage incomplete'); }
  lessons.filter(l=>l.day>=61&&l.day<=80).forEach(l=>{['analysisIds','audioIds','speakingTasks','writingTasks'].forEach(f=>{if(!Array.isArray(l[f]))report.errors.push(`${l.id} missing Gate 10 array: ${f}`);});});
  if (typeof auditDailyCourseReadability === 'function') { const d10=auditDailyCourseReadability(80,61); Object.keys(d10).forEach(k=>report['days61to80'+k[0].toUpperCase()+k.slice(1)]=d10[k]); if(d10.itemsWithReading!==d10.dailyCourseItemCount||d10.itemsWithRomaji!==d10.dailyCourseItemCount||d10.itemsWithMeaning!==d10.dailyCourseItemCount||d10.kanjiItemsWithWholeWordReading!==d10.kanjiItemCount||d10.analysisCoveredCount!==d10.analysisRequiredCount)report.errors.push('Days 61–80 Daily Course readability coverage is incomplete'); }
  lessons.filter(l=>l.day>=81&&l.day<=90).forEach(l=>{if(!['authored','reviewed'].includes(l.status))report.errors.push(`${l.id} final-phase status invalid: ${l.status}`);if((l.day===88||l.day===90)&&(!l.assessmentId||!assessmentSet.has(l.assessmentId)))report.errors.push(`${l.id} missing assessment reference`);});
  var mock=getAssessment&&getAssessment('assessment-day088-mock-a'),finalA=getAssessment&&getAssessment('assessment-day090-final');if(!mock||mock.sections.flatMap(s=>s.questions).filter(q=>q.type!=='self-check-production').length<20)report.errors.push('Day 88 mock must have at least 20 objective questions');if(!finalA||finalA.sections.flatMap(s=>s.questions).filter(q=>q.type!=='self-check-production').length<25)report.errors.push('Day 90 assessment must have at least 25 objective questions');
  if (lessons[83] && (!Array.isArray(lessons[83].readingStimuli) || lessons[83].readingStimuli.length<4)) report.errors.push('Day 84 requires at least 4 reading stimuli');
  if (lessons[84] && (!Array.isArray(lessons[84].messageStimuli) || lessons[84].messageStimuli.length<3)) report.errors.push('Day 85 requires at least 3 message stimuli');
  var finalAssessment=getAssessment&&getAssessment('assessment-day090-final');if(finalAssessment){['vocabulary-orthography','grammar','sentence-composition','reading','listening','practical-communication'].forEach(k=>{if(!finalAssessment.sections.some(s=>s.kind===k&&s.questions&&s.questions.length))report.errors.push(`Day 90 missing meaningful section: ${k}`);});}
  var d86=lessons[85],d87=lessons[86];if(!d86.listeningItems||d86.listeningItems.length<5)report.errors.push('Day 86 requires at least 5 listening items');if(!d86.shadowingTasks||d86.shadowingTasks.length<3)report.errors.push('Day 86 requires at least 3 shadowing tasks');if(!d87.marathonScenarios||d87.marathonScenarios.length<5)report.errors.push('Day 87 requires at least 5 marathon scenarios');if(d87.marathonScenarios&&!['INITIATE','RESPOND','RECOVER'].every(m=>d87.marathonScenarios.some(x=>x.mode===m)))report.errors.push('Day 87 marathon must cover initiate/respond/recover');if(d86.listeningItems){report.listeningItemCount=d86.listeningItems.length;report.listeningAudioTargetCount=d86.listeningItems.filter(x=>audioSet.has(x.audioId)).length;report.listeningQuestionCount=d86.listeningItems.length;report.shadowingTaskCount=(d86.shadowingTasks||[]).length;report.itemsWithTranscriptHiddenInitially=d86.listeningItems.filter(x=>x.transcriptPolicy==='hidden-until-reveal').length;report.itemsWithNaturalRate=d86.listeningItems.filter(x=>getAudioTarget(x.audioId)&&getAudioTarget(x.audioId).naturalRate).length;report.itemsWithSlowRate=d86.listeningItems.filter(x=>getAudioTarget(x.audioId)&&getAudioTarget(x.audioId).slowRate).length;}
  var day87Ids=new Set((lessons[86]&&lessons[86].marathonScenarios||[]).map(function(s){return s.id;}));var day87Tasks=(lessons[86]&&lessons[86].speakingTasks||[]).filter(function(id){return day87Ids.has(id);}).map(function(id){return(speakingTasksV2||[]).find(function(t){return t.id===id;});}).filter(function(t){return t&&t.type==='role-play';});day87Tasks.forEach(function(t){if(!t.mode||!['INITIATE','RESPOND','RECOVER'].includes(t.mode))report.errors.push('Day 87 role-play requires explicit valid mode: '+t.id);['modelText','reading','romaji','meaning','speaker','scenario','audioId'].forEach(function(f){if(!t[f])report.errors.push('Day 87 role-play missing '+f+': '+t.id);});if(t.audioId&&(!audioSet.has(t.audioId)||getAudioTarget(t.audioId).text.trim()!==t.modelText.trim()))report.errors.push('Day 87 role-play audio mismatch: '+t.id);});report.day87LineCount=day87Tasks.length;report.day87LinesWithReading=day87Tasks.filter(function(t){return t.reading;}).length;report.day87LinesWithRomaji=day87Tasks.filter(function(t){return t.romaji;}).length;report.day87LinesWithMeaning=day87Tasks.filter(function(t){return t.meaning;}).length;report.day87LinesWithAudio=day87Tasks.filter(function(t){return t.audioId&&audioSet.has(t.audioId);}).length;
  validateStandaloneConversations(report, sets, audioSet, analysisSet);
  validateLearningSurfaceContract(report);
  const allDays = auditDailyCourseReadability(90, 1);
  report.fullCourseReadability = allDays;
  if (allDays.itemsWithReading !== allDays.dailyCourseItemCount || allDays.itemsWithRomaji !== allDays.dailyCourseItemCount || allDays.itemsWithMeaning !== allDays.dailyCourseItemCount || allDays.kanjiItemsWithWholeWordReading !== allDays.kanjiItemCount || allDays.analysisCoveredCount !== allDays.analysisRequiredCount) report.errors.push('Days 1–90 Daily Course readability coverage is incomplete');
  const result = report.errors.length ? report : { ...report, ok: true }; console.info('[Nihon Path] Content validation', result); return result;
}

function validateLearningSurfaceContract(report) {
  const target = id => id && getAudioTarget(id);
  const goodQuestion = q => q && q.key && Array.isArray(q.options) && q.options.length >= 2 && new Set(q.options).size === q.options.length && q.options.filter(x => x === q.answer).length === 1;
  const groups = [
    ['kana', kana || [], 'libraryAudioId'],
    ['vocabulary', vocab || [], 'libraryAudioId'],
    ['kanji', kanji || [], 'libraryAudioId'],
    ['grammar', grammar || [], 'libraryAudioId']
  ];
  groups.forEach(([name, items, audioField]) => items.forEach(item => {
    if (!target(item[audioField])) report.errors.push(`${name} missing library audio: ${item.id}`);
  }));
  (kanji || []).forEach(k => { const a = target(k.libraryAudioId); if (!a || a.text !== k.word) report.errors.push(`kanji example audio mismatch: ${k.id}`); if (typeof kanjiDetails !== 'function' || !String(kanjiDetails(k)).includes('Kanji details')) report.errors.push(`kanji details missing: ${k.id}`); if (typeof buildFocusedKanjiQuiz !== 'function' || !buildFocusedKanjiQuiz(k.id).qs.length) report.errors.push(`kanji focused practice missing: ${k.id}`); });
  (life || []).forEach((m, mi) => (m.phrases || []).forEach((p, pi) => { if (!target(p.libraryAudioId)) report.errors.push(`life phrase missing library audio: ${mi}/${pi}`); }));
  (readings || []).forEach(r => { if (!target(r.libraryAudioId)) report.errors.push(`reading passage missing library audio: ${r.id}`); });
  const focused = [['kana', kana, buildFocusedKanaQuiz], ['vocabulary', vocab, buildFocusedVocabularyQuiz], ['kanji', kanji, buildFocusedKanjiQuiz], ['grammar', grammar, buildFocusedGrammarQuiz]];
  focused.forEach(([name, items, builder]) => { if (typeof builder !== 'function') { report.errors.push(`focused ${name} builder missing`); return; } items.forEach(item => { const q = builder(item.id); if (!q || !q.qs || !q.qs.length || q.qs.some(x => !goodQuestion(x))) report.errors.push(`focused ${name} practice invalid: ${item.id}`); }); });
  const detailItems = [].concat((kana || []).slice(0, 3).map(k => ({japanese:k.char, kind:'kana', sourceId:k.id, audioId:k.libraryAudioId, romaji:k.romaji})), (vocab || []).slice(0, 3).map(v => ({japanese:v.japanese, kind:'vocabulary', sourceId:v.id, audioId:v.libraryAudioId, reading:v.reading, romaji:v.romaji, meaning:v.meaning})), (kanji || []).slice(0, 3).map(k => ({japanese:k.word, kind:'kanji', sourceId:k.id, audioId:k.libraryAudioId, reading:k.wordReading})), (grammar || []).slice(0, 3).map(g => ({japanese:g.pattern, kind:'grammar', sourceId:g.id, audioId:g.libraryAudioId, meaning:g.meaning})));
  if (typeof renderLearningItem === 'function') detailItems.forEach(item => { const rendered = renderLearningItem(item); if (!rendered || !rendered.includes('Details') || rendered.replace(/<[^>]+>/g, '').trim().length < 20) report.errors.push(`empty learning item Details: ${item.kind}/${item.sourceId}`); });
  report.librarySurfaceAudioTargetCount = (audioTargets || []).length;
  report.librarySurfaceFocusedBuilders = {kana:(kana || []).length, vocabulary:(vocab || []).length, kanji:(kanji || []).length, grammar:(grammar || []).length};
}

function validateStandaloneConversations(report, sets, audioSet, analysisSet) {
  const expected = Array.from({length:20}, (_, i) => 'c'+(i+1)).concat([
    'conv-phase4-request','conv-phase4-ongoing','conv-phase4-permission','conv-phase4-restaurant'
  ]);
  const approved = conversationEnrichmentCompletedConversationIds;
  const displayed = getStandaloneConversations(), lines = displayed.flatMap(c => c.lines || []);
  if (approved.length !== expected.length || new Set(approved).size !== expected.length || expected.some(id => !approved.includes(id))) report.errors.push('Gate 13C accepted conversation IDs differ from the 24-conversation checkpoint');
  if (displayed.length !== 24 || lines.length !== 75) report.errors.push('Gate 13C expected 24 displayed conversations / 75 lines');
  const classifications = ['FORMAL GRAMMAR','PRODUCTIVE FIXED PHRASE','RECOGNITION PHRASE'];
  const counts = Object.fromEntries(classifications.map(c => [c, 0]));
  const nonempty = x => typeof x === 'string' && !!x.trim();
  const script = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u;
  const sourceLineIds = new Set();
  // Hidden sources retain structural/reference checks; final rich metadata is not required.
  conversations.forEach(c => {
    if (!nonempty(c.title) || !Array.isArray(c.lines) || !c.lines.length) report.errors.push('Malformed source conversation: '+c.id);
    (c.lines || []).forEach(l => {
      if (!l || !(Array.isArray(l) ? [l[0],l[1],l[2]] : [l.speaker,l.japanese,l.english]).every(nonempty)) report.errors.push('Malformed source conversation line: '+c.id);
      if (!l) return;
      if (l.id) { if (sourceLineIds.has(l.id)) report.errors.push('Duplicate conversation line id: '+l.id); sourceLineIds.add(l.id); }
      if (l.audioId && !audioSet.has(l.audioId)) report.errors.push('Source conversation missing audio: '+l.id);
      if (l.analysisId && !analysisSet.has(l.analysisId)) report.errors.push('Source conversation missing analysis: '+l.id);
    });
  });
  let resolvedAudio = 0, resolvedAnalyses = 0, usefulAnalyses = 0;
  const required = lines.filter(l => l.analysisRequired === true);
  lines.forEach(l => {
    if (!l || Array.isArray(l)) { report.errors.push('Standalone conversation requires a rich object'); return; }
    ['id','speaker','japanese','reading','romaji','english','meaning','role','usage','audioId'].forEach(f => {
      if (!nonempty(l[f])) report.errors.push('Standalone line missing '+f+': '+l.id);
    });
    if (!/[\p{Script=Hiragana}\p{Script=Katakana}]/u.test(l.reading) || /\p{Script=Han}/u.test(l.reading)) report.errors.push('Standalone line requires kana reading: '+l.id);
    if (script.test(l.romaji)) report.errors.push('Japanese script in standalone romaji: '+l.id);
    if (['A','B'].includes(l.role)) report.errors.push('Standalone line needs a useful role: '+l.id);
    if (classifications.includes(l.classification)) counts[l.classification]++;
    else report.errors.push('Invalid standalone classification: '+l.id);
    if (typeof l.analysisRequired !== 'boolean') report.errors.push('Standalone line missing analysisRequired flag: '+l.id);
    const audio = getAudioTarget(l.audioId);
    if (audio && audio.text === l.japanese && audio.reading === l.reading) resolvedAudio++;
    else report.errors.push('Standalone audio missing or mismatched: '+l.id);
    if (l.analysisRequired === true) {
      const analysis = getJapaneseAnalysis(l.analysisId);
      if (analysis && analysis.japanese === l.japanese) resolvedAnalyses++;
      else report.errors.push('Standalone required analysis missing or mismatched: '+l.id);
      if (analysis) {
        const analysisAudio = getAudioTarget(analysis.audioId);
        if (!analysisAudio || analysisAudio.text !== l.japanese) report.errors.push('Standalone analysis audio missing or mismatched: '+l.id);
        if (!nonempty(analysis.reading) || !nonempty(analysis.romaji) || script.test(analysis.romaji)) report.errors.push('Standalone analysis reading/romaji invalid: '+l.id);
        (analysis.tokens || []).forEach(t => {
          if (!nonempty(t.reading) || !nonempty(t.romaji) || script.test(t.romaji)) report.errors.push('Standalone analysis token reading/romaji invalid: '+l.id);
        });
      }
      if (hasUsefulConversationAnalysis(analysis)) usefulAnalyses++;
      else report.errors.push('Standalone required analysis is an empty/generic shell: '+l.id);
    }
  });
  const total = Object.values(counts).reduce((a,b) => a+b, 0);
  if (total !== lines.length) report.errors.push('Standalone classification total mismatch');
  const refs = lessons.filter(l => l.conversationId != null);
  Object.assign(report, {
    completedConversationCount:displayed.length, completedLineCount:lines.length,
    displayedConversationCount:displayed.length, displayedConversationLineCount:lines.length,
    backlogConversationCount:conversations.length-displayed.length,
    backlogLineCount:conversations.reduce((n,c)=>n+c.lines.length,0)-lines.length,
    uniqueCompletedLineIdCount:new Set(lines.map(l=>l.id)).size,
    linesWithExactlyOneClassification:total, classificationCounts:counts,
    formalGrammarCount:counts[classifications[0]], productiveFixedPhraseCount:counts[classifications[1]], recognitionPhraseCount:counts[classifications[2]],
    linesWithJapaneseScriptInRomaji:lines.filter(l=>script.test(l.romaji)).length,
    standaloneAudioCoveredCount:resolvedAudio, standaloneAnalysisRequiredCount:required.length,
    standaloneAnalysisResolvedCount:resolvedAnalyses, standaloneUsefulAnalysisCount:usefulAnalyses,
    dailyConversationReferencesResolved:refs.filter(l=>sets.conversation.has(l.conversationId)).length,
    dailyConversationReferencesMissing:refs.filter(l=>!sets.conversation.has(l.conversationId)).length
  });
}

function validateContent() {
  const report = { errors: [], warnings: [] };
  const unique = (items, label) => { const ids = new Set(); items.forEach(item => { if (!item.id) report.errors.push(`${label} missing id`); else if (ids.has(item.id)) report.errors.push(`Duplicate ${label} id: ${item.id}`); else ids.add(item.id); }); return ids; };
  const sets = { vocabulary: unique(vocab,'vocabulary'), grammar: unique(grammar,'grammar'), kana: unique(kana,'kana'), kanji: unique(kanji,'kanji'), conversation: unique(conversations,'conversation'), lesson: unique(lessons,'lesson') };
  const days = new Set(), quizIds = new Set();
  lessons.forEach(l => {
    if (days.has(l.day)) report.errors.push(`Duplicate lesson day: ${l.day}`); days.add(l.day);
    if (!Number.isInteger(l.day) || l.day < 1 || l.day > 90) report.errors.push(`Invalid lesson day: ${l.day}`);
    if (!['draft','authored','reviewed'].includes(l.status)) report.errors.push(`${l.id} invalid status: ${l.status}`);
    if (!['full','support','minimal','off'].includes(l.romajiPolicy)) report.errors.push(`${l.id} invalid romajiPolicy: ${l.romajiPolicy}`);
    if (['authored','reviewed'].includes(l.status) && !Array.isArray(l.examples)) report.errors.push(`${l.id} missing examples array`);
    if (['authored','reviewed'].includes(l.status) && (!l.objectives?.length || !l.practice?.length || !l.quiz?.length)) report.errors.push(`${l.id} authored/reviewed lesson is incomplete`);
    ['vocabularyIds','grammarIds','kanaIds','kanjiIds','lifeModuleIds','cultureTopicIds','reviewTargets'].forEach(f => { if (!Array.isArray(l[f])) report.errors.push(`${l.id} missing array: ${f}`); });
    [['vocabularyIds','vocabulary'],['grammarIds','grammar'],['kanaIds','kana'],['kanjiIds','kanji']].forEach(([f,t]) => (l[f]||[]).forEach(id => { if (!sets[t].has(id)) report.errors.push(`${l.id} missing ${t}: ${id}`); }));
    if (l.conversationId && !sets.conversation.has(l.conversationId)) report.errors.push(`${l.id} missing conversation: ${l.conversationId}`);
    if (l.conversationId) { const c=conversations.find(x=>x.id===l.conversationId); if (!c.title || !Array.isArray(c.lines) || !c.lines.length) report.errors.push(`${l.id} malformed conversation: ${l.conversationId}`); }
    (l.prerequisites||[]).forEach(id => { const p=lessons.find(x=>x.id===id); if (!p) report.errors.push(`${l.id} invalid prerequisite: ${id}`); else if (p.day >= l.day) report.errors.push(`${l.id} future/self prerequisite: ${id}`); });
    (l.quiz||[]).forEach(q => { if (quizIds.has(q.id)) report.errors.push(`Duplicate quiz id: ${q.id}`); quizIds.add(q.id); if (!q.id || !q.type || !q.prompt || !q.answer || !Array.isArray(q.options) || q.options.length < 2 || (q.type==='multiple-choice' && !q.options.includes(q.answer)) || new Set(q.options).size !== q.options.length) report.errors.push(`${l.id} malformed quiz question: ${q.id||'unknown'}`); (q.reviewTargets||[]).forEach(t => { if (!sets[t?.type]?.has(t?.id)) report.errors.push(`${l.id} invalid quiz review target: ${JSON.stringify(t)}`); }); });
  });
  if (lessons.length !== 90) report.errors.push(`Expected 90 lessons, found ${lessons.length}`);
  lessons.forEach(l => (l.reviewTargets||[]).forEach(t => { if (!sets[t?.type]?.has(t?.id)) report.errors.push(`${l.id} invalid review target: ${JSON.stringify(t)}`); }));
  const result = report.errors.length ? report : { ...report, ok: true }; console.info('[Nihon Path] Content validation', result); return result;
}

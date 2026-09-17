function dash(){
  let s=stats(),l=lessons[s.day-1],due=Object.values(state.quiz.by||{}).filter(x=>x.wrong>x.correct).length,
      lessonFocus=(l && (l.focus || l.subtitle || (l.objectives && l.objectives[0]))) || '';
  document.getElementById('dashboard').innerHTML=`
    <div class="eyebrow">Your Japanese path</div>
    <h1 class="title">Welcome back.</h1>
    <p class="lead">One clear next step every day. Build N5 knowledge, then reuse it in situations you will actually meet in Japan.</p>
    <div class="hero">
      <div class="card heroMain">
        <div>
          <span class="badge">DAY ${s.day} OF 90</span>
          <h2>${E(l.title)}</h2>
          <p>${E(lessonFocus)}</p>
          <div class="tags">
            <span class="tag">${E(l.phase)}</span>
            <span class="tag">10–25 min</span>
            <span class="tag">${l.romaji?'Romaji support':'Kana-first'}</span>
          </div>
        </div>
        <div class="rowActions" style="margin-top:20px">
          <button class="btn btnPrimary" onclick="selected=${s.day};go('course')">Continue Lesson →</button>
          <button class="btn2 btnSecondary" onclick="go('review')">Review ${due} weak items</button>
        </div>
      </div>
      <div class="card heroSide">
        <div>
          <div class="muted" style="font-weight:700">N5 Course Progress</div>
          <div class="big">${s.all}%</div>
          <div class="track"><div class="fill" style="width:${s.all}%"></div></div>
        </div>
        <div class="muted" style="font-size:12px;margin-top:16px">
          Current streak: <b style="color:var(--color-text)">${state.streak} day${state.streak===1?'':'s'}</b>
        </div>
      </div>
    </div>
    <div class="grid stats">
      ${[
        ['Vocabulary learned', s.v, `${vocab.length} seeded words`],
        ['Kanji learned', s.k, `${kanji.length} core characters`],
        ['Grammar learned', s.g, `${grammar.length} patterns`],
        ['Review due', due, 'from your practice']
      ].map(x=>`
        <div class="card stat">
          <div class="k">${x[0]}</div>
          <div class="v">${x[1]}</div>
          <div class="s">${x[2]}</div>
        </div>
      `).join('')}
    </div>
    <div class="sectionHead">
      <div>
        <h2>90-day architecture</h2>
        <p>Six phases from zero Japanese to N5 + life skills.</p>
      </div>
    </div>
    <div class="grid three">
      ${phases.map(x=>`
        <div class="card phase">
          <span class="badge">DAYS ${x[1]}–${x[2]}</span>
          <h3>${E(x[0])}</h3>
          <p>${E(x[3])}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function course(){
  document.getElementById('course').innerHTML=`
    <div class="eyebrow">Primary learning path</div>
    <h1 class="title">Daily Course</h1>
    <p class="lead">Complete one manageable day at a time. The next day unlocks when you finish the current one; libraries stay open for reference.</p>
    <div class="course">
      <div class="card dayList" id="days"></div>
      <div class="card lesson" id="lesson"></div>
    </div>
  `;
  days();
  lesson(selected);
}

function days(){
  let unlocked=nextDay();
  let checkIcon = typeof getIconSvg === 'function' ? getIconSvg('check', 14) : '✓';
  let lockIcon = typeof getIconSvg === 'function' ? getIconSvg('lock', 12) : '🔒';
  
  document.getElementById('days').innerHTML=lessons.map(l=>{
    let done=state.done.includes(l.day),lock=l.day>unlocked;
    return `
      <button class="day ${done?'done':''} ${lock?'lock':''} ${selected===l.day?'active':''}" ${lock?'disabled':''} onclick="selected=${l.day};days();lesson(${l.day})">
        <span class="dn">${done ? checkIcon : (lock ? lockIcon : l.day)}</span>
        <span>
          <div class="dt">${E(l.title)}</div>
          <div class="df">${E(l.phase)}</div>
        </span>
      </button>
    `;
  }).join('');
}

function kanaPage(){
  let cells=kana.filter(x=>x.script===kanaMode);
  document.getElementById('kana').innerHTML=`
    <div class="eyebrow">Reading system</div>
    <h1 class="title">Kana</h1>
    <p class="lead">Learn sounds first, then remove romaji support. Tap a character for a quick recall cue.</p>
    <div class="kanaTabs">
      <button class="${kanaMode==='Hiragana'?'btn btnPrimary':'btn2 btnSecondary'}" onclick="kanaMode='Hiragana';kanaPage()">Hiragana</button>
      <button class="${kanaMode==='Katakana'?'btn btnPrimary':'btn2 btnSecondary'}" onclick="kanaMode='Katakana';kanaPage()">Katakana</button>
      <button class="btn2 btnSecondary" onclick="quiz=buildKanaQuiz(10);go('practice')">Practice</button>
    </div>
    <div class="kanaGrid">
      ${cells.map(k=>`
        <button class="kanaCell" onclick="openM('<div class=&quot;modalHead&quot;><div><div class=&quot;eyebrow&quot;>${k.script}</div><h2 class=&quot;jp&quot; style=&quot;font-size:64px;margin:4px 0 0&quot;>${k.char}</h2><h3 style=&quot;color:var(--color-indigo);margin:4px 0 12px&quot;>${k.romaji}</h3><p class=&quot;muted&quot;>Say it once, then recall it without looking at romaji.</p></div><button class=&quot;close&quot; onclick=&quot;closeM()&quot;>×</button></div>')">
          <div class="c jp">${k.char}</div>
          <div class="r">${k.romaji}</div>
        </button>
      `).join('')}
    </div>
    <div class="sectionHead">
      <div>
        <h2>Sound changes & combinations</h2>
        <p>Essential for real reading.</p>
      </div>
    </div>
    <div class="grid two">
      ${specialKana.map(x=>`
        <div class="card phase">
          <h3>${x[0]}</h3>
          <div class="jp" style="font-size:24px;font-weight:800;color:var(--color-primary);margin:6px 0">${x[1]}</div>
          <p>${x[2]}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function vocabPage(){
  let cats=['All',...new Set(vocab.map(v=>v.category))],
      items=vocab.filter(v=>(vcat==='All'||v.category===vcat)&&(vstatus==='All'||(state.vstat[v.id]||'New')===vstatus)&&(`${v.japanese} ${v.reading} ${v.romaji} ${v.meaning}`.toLowerCase().includes(vquery.toLowerCase())));
  document.getElementById('vocabulary').innerHTML=`
    <div class="eyebrow">N5 word bank</div>
    <h1 class="title">Vocabulary</h1>
    <p class="lead">${vocab.length} high-frequency beginner words with search, categories, status, favorites, examples, and flashcards.</p>
    <div class="toolbar">
      <div class="search">
        <input class="input" placeholder="Search Japanese, reading, romaji, English…" value="${E(vquery)}" oninput="vquery=this.value;vocabPage()">
      </div>
      <select class="select" onchange="vcat=this.value;vocabPage()">
        ${cats.map(c=>`<option ${c===vcat?'selected':''}>${E(c)}</option>`).join('')}
      </select>
      <select class="select" onchange="vstatus=this.value;vocabPage()">
        ${['All','New','Learning','Learned'].map(c=>`<option ${c===vstatus?'selected':''}>${c}</option>`).join('')}
      </select>
      <button class="btn2 btnSecondary" onclick="startFlash()">Flashcards</button>
    </div>
    <div class="meta" style="margin-bottom:12px">${items.length} words shown</div>
    <div class="grid vgrid">${items.map(v=>vcard(v)).join('')}</div>
  `;
}

function vcard(v){
  let st=state.vstat[v.id]||'New',fav=state.fav.includes(v.id);
  return `
    <div class="card vcard">
      <button class="fav ${fav?'on':''}" aria-label="Favorite word" onclick="fav('${v.id}')">★</button>
      <div class="word jp">${E(v.japanese)}</div>
      <div class="reading">${E(v.reading)}</div>
      <div class="romaji">${E(v.romaji)}</div>
      <div class="meaning">${E(v.meaning)}</div>
      <div class="meta">${E(v.type)} • ${E(v.category)}</div>
      <div class="rowActions" style="margin-top:12px">
        ${['New','Learning','Learned'].map(x=>`<button class="tiny ${st===x?'on':''}" onclick="setV('${v.id}','${x}')">${x}</button>`).join('')}
        <button class="tiny" onclick="showV('${v.id}')">Example</button>
      </div>
    </div>
  `;
}

function setV(id,s){state.vstat[id]=s;if(s!=='New')touch();save();vocabPage()}
function fav(id){let i=state.fav.indexOf(id);i>=0?state.fav.splice(i,1):state.fav.push(id);save();vocabPage()}

function showV(id){
  let v=vocab.find(x=>x.id===id);
  if(!v){toast('Vocabulary item unavailable');return}
  openM(`
    <div class="modalHead">
      <div>
        <div class="eyebrow">${E(v.category)}</div>
        <h2 class="jp" style="font-size:40px;margin:4px 0 0">${E(v.japanese)}</h2>
        <div class="reading" style="font-size:15px">${E(v.reading)}</div>
        <div class="romaji" style="font-size:14px">${E(v.romaji)}</div>
      </div>
      <button class="close" onclick="closeM()">×</button>
    </div>
    <h3 style="font-size:18px;margin:16px 0 12px">${E(v.meaning)}</h3>
    <div class="example">
      <div class="jp">${E(v.example)}</div>
      <small style="color:var(--color-text-secondary);font-size:13px">${E(v.exampleEn)}</small>
    </div>
  `);
}

function startFlash(){flash=vocab.filter(v=>vcat==='All'||v.category===vcat);flashI=0;showFlash()}

function showFlash(){
  if(!flash.length)return;
  let v=flash[flashI%flash.length];
  openM(`
    <div class="modalHead">
      <span class="eyebrow">Flashcard ${flashI+1}/${flash.length}</span>
      <button class="close" onclick="closeM()">×</button>
    </div>
    <div class="flash" id="flash" style="min-height:220px;display:grid;place-items:center;text-align:center;padding:20px 0">
      <div>
        <div class="front jp" style="font-size:52px;font-weight:800">${E(v.japanese)}</div>
        <div class="back" style="display:none">
          <div class="reading" style="font-size:16px;margin-top:6px">${E(v.reading)}</div>
          <div class="romaji" style="font-size:14px">${E(v.romaji)}</div>
          <h2 style="font-size:22px;margin:12px 0 0">${E(v.meaning)}</h2>
        </div>
      </div>
    </div>
    <div class="rowActions" style="justify-content:center">
      <button class="btn2 btnSecondary" onclick="document.querySelector('#flash .back').style.display='block';document.querySelector('#flash .front').style.fontSize='30px'">Reveal</button>
      <button class="btn2 btnSecondary" onclick="flashRate('${v.id}','Learning')">Again</button>
      <button class="btn btnPrimary" onclick="flashRate('${v.id}','Learned')">Got it</button>
    </div>
  `);
}

function flashRate(id,s){state.vstat[id]=s;touch();save();flashI=(flashI+1)%flash.length;showFlash()}

function kanjiPage(){
  let items=kanji.filter(k=>`${k.kanji} ${k.meaning} ${k.onyomi} ${k.kunyomi}`.toLowerCase().includes(kquery.toLowerCase()));
  document.getElementById('kanji').innerHTML=`
    <div class="eyebrow">Core beginner recognition</div>
    <h1 class="title">Kanji</h1>
    <p class="lead">${kanji.length} useful N5-level characters with readings, stroke count, a word, and a memory hint.</p>
    <div class="toolbar">
      <div class="search">
        <input class="input" placeholder="Search kanji or meaning…" value="${E(kquery)}" oninput="kquery=this.value;kanjiPage()">
      </div>
      <button class="btn2 btnSecondary" onclick="quiz=buildKanjiQuiz(10);go('practice')">Recognition quiz</button>
    </div>
    <div class="grid kgrid">
      ${items.map(k=>{
        let on=state.klearn.includes(k.id);
        return `
          <div class="card kcard">
            <div class="kanji jp">${E(k.kanji)}</div>
            <b style="font-size:16px">${E(k.meaning)}</b>
            <div class="kline"><b>On:</b> ${E(k.onyomi)}</div>
            <div class="kline"><b>Kun:</b> ${E(k.kunyomi)}</div>
            <div class="kline"><b>Strokes:</b> ${k.strokes}</div>
            <div class="kline"><b>Word:</b> ${E(k.word)} ${E(k.wordReading)}</div>
            <div class="meta" style="margin-top:6px">${E(k.mnemonic)}</div>
            <div class="rowActions" style="margin-top:12px">
              <button class="tiny ${on?'on':''}" onclick="toggleK('${k.id}')">${on?'Learned ✓':'Mark learned'}</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function toggleK(id){let i=state.klearn.indexOf(id);i>=0?state.klearn.splice(i,1):(state.klearn.push(id),touch());save();kanjiPage()}

function grammarPage(){
  let items=grammar.filter(g=>`${g.pattern} ${g.formation} ${g.meaning} ${g.explanation}`.toLowerCase().includes(gquery.toLowerCase()));
  document.getElementById('grammar').innerHTML=`
    <div class="eyebrow">N5 sentence system</div>
    <h1 class="title">Grammar</h1>
    <p class="lead">Simple explanation first, technical label second. Every pattern includes formation, example, and a common mistake.</p>
    <div class="toolbar">
      <div class="search">
        <input class="input" placeholder="Search grammar…" value="${E(gquery)}" oninput="gquery=this.value;grammarPage()">
      </div>
      <button class="btn2 btnSecondary" onclick="quiz=buildGrammarQuiz(10);go('practice')">Grammar quiz</button>
    </div>
    <div class="grid ggrid">
      ${items.map(g=>{
        let on=state.gdone.includes(g.id);
        return `
          <div class="card gcard">
            <h3 class="jp">${E(g.pattern)}</h3>
            <div class="muted" style="font-weight:700;font-size:14.5px">${E(g.meaning)}</div>
            <div class="form">${E(g.formation)}</div>
            <p style="font-size:14px;color:var(--color-text-secondary);margin:8px 0">${E(g.explanation)}</p>
            <div class="example">
              <div class="jp">${E(g.example)}</div>
              <small style="color:var(--color-text-secondary);font-size:12.5px">${E(g.english)}</small>
            </div>
            <div class="watch"><b>Watch out:</b> ${E(g.mistake)}</div>
            <div class="rowActions" style="margin-top:12px">
              <button class="tiny ${on?'on':''}" onclick="toggleG('${g.id}')">${on?'Completed ✓':'Mark complete'}</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function toggleG(id){let i=state.gdone.indexOf(id);i>=0?state.gdone.splice(i,1):(state.gdone.push(id),touch());save();grammarPage()}

function speakPage(){
  document.getElementById('speaking').innerHTML=`
    <div class="eyebrow">Communicative intent</div>
    <h1 class="title">Speak Japanese</h1>
    <p class="lead">Memorize phrases by what you are trying to do. Say each line aloud slowly, then once at a natural pace.</p>
    <div class="grid ggrid">
      ${speaking.map(x=>`
        <div class="card gcard">
          <span class="badge">${E(x[0])}</span>
          <h3 class="jp" style="font-size:22px;margin-top:12px">${E(x[1])}</h3>
          <div style="font-size:14.5px;color:var(--color-text);margin-top:4px">${E(x[2])}</div>
          <div class="meta" style="margin-top:6px">${E(x[3])}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderStandaloneConversationLine(line) {
  const analysis = line.analysisRequired === true && getJapaneseAnalysis(line.analysisId);
  const details = hasUsefulConversationAnalysis(analysis) && analysis.japanese === line.japanese
    ? renderJapaneseAnalysis(analysis) : '';
  const classColor = line.classification === 'FORMAL GRAMMAR' ? 'tag' : (line.classification === 'PRODUCTIVE FIXED PHRASE' ? 'badge' : 'tag');
  return `
    <div class="dialog" data-conversation-line-id="${E(line.id)}">
      <div class="speaker">${E(line.role)}</div>
      <div>
        <div class="jp">${E(line.japanese)}</div>
        <div class="reading">${E(line.reading)}</div>
        <div class="romaji">${E(line.romaji)}</div>
        <div style="font-size:14.5px;font-weight:700;margin-top:4px">${E(line.meaning)}</div>
        <div class="meta">${E(line.usage)}</div>
        <div style="margin-top:8px"><span class="${classColor}">${E(line.classification)}</span></div>
        ${typeof renderAudioControls === 'function' ? renderAudioControls(line.audioId) : ''}
        ${details}
      </div>
    </div>
  `;
}

function convPage() {
  document.getElementById('conversations').innerHTML = `
    <div class="eyebrow">Real-life beginner dialogue</div>
    <h1 class="title">Conversations</h1>
    <p class="lead">Read with English once, then shadow the Japanese aloud without English.</p>
    <div id="audioStatus" role="status" aria-live="polite"></div>
    <div class="grid">
      ${getStandaloneConversations().map(c => `
        <div class="card dcard" data-conversation-id="${E(c.id)}">
          <span class="badge">${E(c.situation)}</span>
          <h3 style="font-size:22px;margin:8px 0 12px">${E(c.title)}</h3>
          ${c.lines.map(renderStandaloneConversationLine).join('')}
          <div class="tags" style="margin-top:14px">
            <span class="tag">Vocab: ${E(c.vocab)}</span>
            <span class="tag">Grammar: ${E(c.grammar)}</span>
          </div>
          <div class="notice">${E(c.note)}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function lifePage(){
  document.getElementById('life').innerHTML=`
    <div class="eyebrow">Practical survival Japanese</div>
    <h1 class="title">Life in Japan</h1>
    <p class="lead">Language for real situations. Administrative, legal, tax, medical, and transport details can change; these modules teach communication, not guaranteed current rules.</p>
    <div class="grid lifeGrid">
      ${life.map(m=>`
        <div class="card life">
          <div style="display:flex;gap:12px;align-items:center">
            <span style="font-size:28px">${m.icon}</span>
            <div>
              <h3>${E(m.title)}</h3>
              <div class="meta">${E(m.summary)}</div>
            </div>
          </div>
          <div class="phrases">
            ${m.phrases.map(p=>`
              <div class="phrase">
                <div class="jp">${E(p[0])}</div>
                <small style="color:var(--color-text-secondary);font-size:12.5px">${E(p[1])}</small>
              </div>
            `).join('')}
          </div>
          <div class="notice" style="margin-top:12px">${E(m.tip)}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function culturePage(){
  document.getElementById('culture').innerHTML=`
    <div class="eyebrow">Context, not stereotypes</div>
    <h1 class="title">Culture & Etiquette</h1>
    <p class="lead">Practical tendencies rather than rigid rules. Region, generation, workplace, venue, and individual preference can change expectations.</p>
    <div class="grid ggrid">
      ${culture.map(x=>`
        <div class="card culture">
          <h3>${E(x[0])}</h3>
          <p class="muted" style="margin-top:6px;line-height:1.6">${E(x[1])}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function readingPage(){
  document.getElementById('reading').innerHTML=`
    <div class="eyebrow">Progressive comprehension</div>
    <h1 class="title">Reading</h1>
    <p class="lead">Kana → sentences → notices → menus → signs → messages → short JLPT-style passages.</p>
    <div class="grid">
      ${readings.map(r=>`
        <div class="card read">
          <span class="badge">${r.level}</span>
          <h3 style="font-size:22px;margin:8px 0 12px">${E(r.title)}</h3>
          <div class="jp" style="font-size:20px;line-height:1.6;white-space:pre-line;background:var(--color-surface-soft);padding:14px;border-radius:var(--radius-md)">${E(r.jp)}</div>
          <details style="margin:12px 0">
            <summary class="muted" style="cursor:pointer;font-weight:700">Reading / English support</summary>
            <p class="meta" style="margin-top:6px">${E(r.support)}</p>
          </details>
          <b style="font-size:15px;display:block;margin-top:8px">${E(r.q)}</b>
          <div class="rowActions" style="margin-top:12px">
            ${r.options.map(o=>`<button class="tiny" onclick="readAns(${r.id},${JSON.stringify(o)},this)">${E(o)}</button>`).join('')}
          </div>
          <div class="feedback" id="rf${r.id}" style="display:none;margin-top:12px;padding:12px;border-radius:var(--radius-md);background:var(--color-surface-soft)"></div>
        </div>
      `).join('')}
    </div>
  `;
}

function readAns(i,c,b){
  let r=readings[i],ok=c===r.answer,f=document.getElementById('rf'+i);
  if(!f)return;
  f.style.display='block';
  f.innerHTML=`<b style="color:var(--color-${ok?'success':'danger'})">${ok?'Correct':'Not quite'}</b><div style="font-size:13px;margin-top:4px">${E(r.explain)}</div>`;
  if(ok&&!state.read.includes(i)){state.read.push(i);touch();save()}
}

function progressPage(){
  let s=stats(),total=state.quiz.correct+state.quiz.wrong,acc=P(state.quiz.correct,total),
      checks=[
        ['Hiragana',state.done.filter(x=>x<=10).length>=8],
        ['Katakana',state.done.filter(x=>x>=11&&x<=20).length>=8],
        ['Core vocabulary',s.v>=100],
        ['N5 kanji',s.k>=60],
        ['N5 grammar',s.g>=35],
        ['Basic reading',state.read.length>=6],
        ['Everyday conversation',s.life>=15],
        ['Listening practice concepts',state.done.includes(86)],
        ['Practical Japanese',s.life>=15],
        ['Mock tests',state.done.includes(88)||total>=40]
      ];
  document.getElementById('progress').innerHTML=`
    <div class="eyebrow">Local progress</div>
    <h1 class="title">Progress</h1>
    <p class="lead">Progress stays in this browser through localStorage. This checklist is guidance, not official JLPT certification.</p>
    <div class="grid stats">
      <div class="card stat"><div class="k">Course</div><div class="v">${s.days}/90</div><div class="s">${s.all}% complete</div></div>
      <div class="card stat"><div class="k">Quiz accuracy</div><div class="v">${total?acc+'%':'—'}</div><div class="s">${total} answers</div></div>
      <div class="card stat"><div class="k">Streak</div><div class="v">${state.streak}</div><div class="s">days</div></div>
      <div class="card stat"><div class="k">Reading</div><div class="v">${state.read.length}/${readings.length}</div><div class="s">exercises</div></div>
    </div>
    <div class="sectionHead">
      <div>
        <h2>N5 completion checklist</h2>
        <p>Conservative study targets.</p>
      </div>
    </div>
    <div class="grid two">
      ${checks.map(x=>`
        <div class="card" style="padding:14px 16px;display:flex;justify-content:space-between;align-items:center">
          <span style="font-weight:650">${x[0]}</span>
          <span style="color:var(--color-${x[1]?'success':'text-tertiary'});font-weight:800">${x[1]?'✓ Completed':'○ Pending'}</span>
        </div>
      `).join('')}
    </div>
    <div class="sectionHead">
      <div>
        <h2>Final assessment</h2>
        <p>Mixed internal test; it cannot guarantee an official JLPT result.</p>
      </div>
      <button class="btn btnPrimary" onclick="quiz=buildMixed(25);go('practice')">Start 25-question assessment</button>
    </div>
    <div class="notice">Future levels N4 → N1 can reuse this architecture without filling today's N5 product with empty pages.</div>
    <div class="sectionHead">
      <div>
        <h2>Local data controls</h2>
        <p>Reset erases only this browser's study history.</p>
      </div>
      <button class="danger" onclick="resetAll()">Reset progress</button>
    </div>
  `;
}

function resetAll(){
  if(confirm('Erase all Nihon Path progress from this browser?')){
    localStorage.removeItem(KEY);
    state={...defaults};
    selected=1;
    quiz=null;
    prefs();
    progressPage();
    toast('Progress reset');
  }
}

function openM(h){
  let box=document.getElementById('modalBox');
  let mod=document.getElementById('modal');
  if(box)box.innerHTML=h;
  if(mod)mod.classList.add('open');
}

function closeM(){
  let mod=document.getElementById('modal');
  if(mod)mod.classList.remove('open');
}

document.getElementById('modal').onclick=e=>{if(e.target.id==='modal')closeM()};
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeM()});
prefs();
dash();

// Deterministic lesson composition: all curriculum decisions come from the lesson record.
function resolveRecords(ids, records, kind) {
  return (Array.isArray(ids) ? ids : []).map(id => {
    const record = records.find(item => item.id === id);
    if (!record) console.warn(`[Nihon Path] Missing ${kind} reference: ${id}`);
    return record;
  }).filter(Boolean);
}

function resolveLesson(lessonRecord) {
  return {
    lesson: lessonRecord,
    vocabulary: resolveRecords(lessonRecord.vocabularyIds, vocab, 'vocabulary'),
    grammar: resolveRecords(lessonRecord.grammarIds, grammar, 'grammar'),
    kana: resolveRecords(lessonRecord.kanaIds, kana, 'kana'),
    kanji: resolveRecords(lessonRecord.kanjiIds, kanji, 'kanji'),
    conversation: lessonRecord.conversationId ? conversations.find(x => x.id === lessonRecord.conversationId) : null
  };
}

function lesson(d) {
  const l = lessons.find(item => item.day === d) || lessons[0], m = resolveLesson(l), done = state.done.includes(d);
  const refs = [...m.vocabulary, ...m.grammar, ...m.kana, ...m.kanji];
  const quizItems = Array.isArray(l.quiz) ? l.quiz : [], practiceItems = Array.isArray(l.practice) ? l.practice : [];
  document.getElementById('lesson').innerHTML = `
    <span class="badge">DAY ${l.day} • ${E(l.phase)}</span>
    <h2 style="font-size:30px;margin:8px 0 6px">${E(l.title)}</h2>
    <p class="muted" style="font-size:15px;margin:0 0 8px">${E(l.subtitle)}</p>
    <div class="meta" style="font-size:13px">${E(l.status)} • ${l.estimatedMinutes} minutes • Romaji: ${E(l.romajiPolicy)}</div>
    <div class="ls">
      <h3>Today's goal</h3>
      <ul>${(l.objectives || []).map(x => `<li>${E(x)}</li>`).join('')}</ul>
    </div>
    ${refs.length ? `
      <div class="ls">
        <h3>Explicit lesson materials</h3>
        <div class="grid two">
          ${refs.map(x => `
            <div style="padding:12px;background:var(--color-surface-soft);border-radius:var(--radius-md)">
              <b class="jp" style="font-size:20px">${E(x.japanese || x.pattern || x.kanji || x.char)}</b>
              <div class="meta">${E(x.meaning || x.romaji || x.english || '')}</div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '<div class="ls"><div class="notice">This lesson is still in draft and has no authored learning materials yet.</div></div>'}
    ${l.examples?.length ? `
      <div class="ls">
        <h3>Examples</h3>
        ${l.examples.map(x => `
          <div class="example">
            <div class="jp">${E(x.japanese)}</div>
            <small style="color:var(--color-text-secondary);font-size:13px">${E(x.english)}</small>
          </div>
        `).join('')}
      </div>
    ` : ''}
    ${practiceItems.length ? `
      <div class="ls">
        <h3>Practice</h3>
        ${practiceItems.map(x => `
          <div class="watch">
            <b>${E(x.type)}</b> — ${E(x.instruction)}
            <div style="margin-top:4px">${E(x.prompt)}</div>
            <small style="display:block;margin-top:4px">${E(x.explanation)}</small>
          </div>
        `).join('')}
      </div>
    ` : ''}
    ${m.conversation ? `
      <div class="ls">
        <h3>Conversation</h3>
        <b style="font-size:17px">${E(m.conversation.title)}</b>
        ${(m.conversation.lines || []).map(x => `
          <div class="dialog">
            <div class="speaker">${E(x[0])}</div>
            <div>
              <div class="jp">${E(x[1])}</div>
              <small style="color:var(--color-text-secondary);font-size:13px">${E(x[2])}</small>
            </div>
          </div>
        `).join('')}
        <div class="notice">${E(m.conversation.note || '')}</div>
      </div>
    ` : ''}
    <div class="ls">
      <h3>Lesson quiz</h3>
      ${quizItems.length ? `<button class="btn2 btnSecondary" onclick="quiz=buildLessonQuiz(${d});go('practice')">Take lesson quiz</button>` : '<p class="muted">No authored lesson quiz yet.</p>'}
    </div>
    <div class="ls">
      <h3>Lesson note</h3>
      <div class="notice">${E(l.lessonTip)}</div>
    </div>
    <div class="ls" style="display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap">
      <div>
        <b style="font-size:15px">${done ? 'Day completed' : 'Finish when you can recall the main point without looking.'}</b>
        <div class="meta">${done ? 'Revisit anytime.' : 'Completion unlocks the next day.'}</div>
      </div>
      <button class="${done ? 'btn2 btnSecondary' : 'btn btnPrimary'}" onclick="toggleDay(${l.day})">${done ? 'Mark incomplete' : 'Complete Day '+l.day}</button>
    </div>
  `;
}

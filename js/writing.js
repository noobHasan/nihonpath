var writingCanvases={},writingOrder={};

function writingMeta(id,key,value){
  state.writingPractice=state.writingPractice||{};
  var m=state.writingPractice[id]||{attempts:0,correct:0,incorrect:0,selfRating:null,completed:false,lastPracticed:null};
  if(key==='attempts')m.attempts++;
  else m[key]=value;
  m.lastPracticed=new Date().toISOString();
  state.writingPractice[id]=m;
  save();
  return m;
}

function normalizeWritingAnswer(v){
  return String(v||'').normalize('NFKC').replace(/[ \u3000]+/g,' ').trim();
}

function writingAnswers(task){
  return (task.acceptableAnswers||[task.target]).map(normalizeWritingAnswer);
}

function writingCanvas(taskId,target,blank){
  return `
    <div class="writingCanvasWrap">
      <p class="writingCanvasInstruction" style="font-size:13px;color:var(--color-text-secondary);margin-bottom:8px">${blank?'Write in the blank area.':'Trace the character shown beneath your writing.'}</p>
      <canvas id="writing-canvas-${taskId}" class="writingCanvas" width="320" height="240" role="img" aria-label="Writing canvas for ${E(target)}"></canvas>
      <div class="rowActions" style="margin-top:10px">
        <button class="btn2 btnSecondary" style="min-height:36px;padding:6px 12px;font-size:12.5px" type="button" onclick="clearWritingCanvas('${taskId}')">Clear</button>
        <button class="btn2 btnSecondary" style="min-height:36px;padding:6px 12px;font-size:12.5px" type="button" onclick="resetWritingTask('${taskId}')">Start again</button>
      </div>
    </div>
  `;
}

function initWritingCanvas(id,target,trace){
  var c=document.getElementById('writing-canvas-'+id);
  if(!c)return;
  var ctx=c.getContext('2d'),
      ratio=Math.max(1,window.devicePixelRatio||1),
      rect=c.getBoundingClientRect(),
      w=rect.width||320,
      h=rect.height||240;
  c.width=w*ratio;
  c.height=h*ratio;
  ctx.scale(ratio,ratio);
  ctx.lineWidth=4;
  ctx.lineCap='round';
  ctx.lineJoin='round';
  ctx.strokeStyle=getComputedStyle(document.body).getPropertyValue('--color-text')||'#222';
  if(trace){
    ctx.save();
    ctx.globalAlpha=.16;
    ctx.font='180px serif';
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    ctx.fillText(target,w/2,h/2);
    ctx.restore();
  }
  var drawing=false;
  function point(e){
    var r=c.getBoundingClientRect();
    return{x:e.clientX-r.left,y:e.clientY-r.top};
  }
  function down(e){
    e.preventDefault();
    drawing=true;
    c.setPointerCapture(e.pointerId);
    var p=point(e);
    ctx.beginPath();
    ctx.moveTo(p.x,p.y);
  }
  function move(e){
    if(!drawing)return;
    e.preventDefault();
    var p=point(e);
    ctx.lineTo(p.x,p.y);
    ctx.stroke();
  }
  function up(e){
    drawing=false;
    if(c.hasPointerCapture(e.pointerId))c.releasePointerCapture(e.pointerId);
  }
  c.addEventListener('pointerdown',down);
  c.addEventListener('pointermove',move);
  c.addEventListener('pointerup',up);
  c.addEventListener('pointercancel',up);
  c.style.touchAction='none';
  writingCanvases[id]={canvas:c,ctx:ctx,target:target,trace:trace};
}

function clearWritingCanvas(id){
  var x=writingCanvases[id];
  if(!x)return;
  var c=x.canvas,
      r=c.getBoundingClientRect(),
      ratio=c.width/(r.width||320);
  x.ctx.clearRect(0,0,c.width/ratio,c.height/ratio);
  if(x.trace){
    x.ctx.save();
    x.ctx.globalAlpha=.16;
    x.ctx.font='180px serif';
    x.ctx.textAlign='center';
    x.ctx.textBaseline='middle';
    x.ctx.fillText(x.target,(r.width||320)/2,(r.height||240)/2);
    x.ctx.restore();
  }
}

function resetWritingTask(id){
  writingCanvases[id]=null;
  renderWritingPage();
}

function checkTypedWriting(id){
  var t=getWritingTask(id),
      input=document.getElementById('writing-input-'+id),
      answer=normalizeWritingAnswer(input.value),
      ok=writingAnswers(t).includes(answer),
      out=document.getElementById('writing-result-'+id);
  writingMeta(id,'attempts');
  writingMeta(id,ok?'correct':'incorrect',((state.writingPractice[id]||{})[ok?'correct':'incorrect']||0)+1);
  writingMeta(id,'completed',true);
  out.innerHTML=`
    <b class="${ok?'writingCorrect':'writingIncorrect'}" style="font-size:15px">${ok?'Correct':'Not quite'}</b>
    <div style="font-size:13px;margin-top:4px">${ok?'Good production.':'Review the accepted answer, then try again.'}</div>
    <button class="tiny" style="margin-top:6px" type="button" onclick="revealWriting('${id}')">Reveal answer</button>
  `;
}

function revealWriting(id){
  var t=getWritingTask(id),
      e=document.getElementById('writing-reveal-'+id);
  if(e)e.hidden=false;
  var out=document.getElementById('writing-result-'+id);
  out.innerHTML=`
    <div class="writingReveal jp" style="font-size:24px;font-weight:800;color:var(--color-primary);margin:8px 0">${E(t.target)}</div>
    ${t.analysisId?`<button class="tiny" type="button" onclick="toggleWritingAnalysis('${id}')">Break this down</button>`:''}
  `;
  writingMeta(id,'completed',true);
}

function toggleWritingAnalysis(id){
  var t=getWritingTask(id),
      a=t.analysisId&&getJapaneseAnalysis(t.analysisId),
      e=document.getElementById('writing-analysis-'+id);
  if(e)e.innerHTML=a?renderJapaneseAnalysis(a):'';
}

function rateWriting(id,r){
  writingMeta(id,'selfRating',r);
  writingMeta(id,'completed',true);
  var e=document.getElementById('writing-status-'+id);
  if(e)e.textContent='Saved self-rating: '+r+'.';
}

function chooseWritingUnit(id,i){
  var t=getWritingTask(id),a=writingOrder[id]||[];
  if(a.includes(i))return;
  writingOrder[id]=a.concat(i);
  renderWritingOrder(id);
}

function undoWritingUnit(id){
  var a=writingOrder[id]||[];
  a.pop();
  writingOrder[id]=a;
  renderWritingOrder(id);
}

function renderWritingOrder(id){
  var t=getWritingTask(id),
      chosen=writingOrder[id]||[],
      used=new Set(chosen),
      built=chosen.map(i=>t.units[i]).join(''),
      box=document.getElementById('writing-built-'+id);
  if(box)box.innerHTML=`<span class="jp">${E(built||'…')}</span>`;
  t.units.forEach((u,i)=>{
    var b=document.getElementById('writing-unit-'+id+'-'+i);
    if(b)b.disabled=used.has(i);
  });
}

function checkWritingOrder(id){
  var t=getWritingTask(id),
      built=(writingOrder[id]||[]).map(i=>t.units[i]).join(''),
      ok=normalizeWritingAnswer(built)===normalizeWritingAnswer(t.target);
  writingMeta(id,'attempts');
  writingMeta(id,ok?'correct':'incorrect',((state.writingPractice[id]||{})[ok?'correct':'incorrect']||0)+1);
  writingMeta(id,'completed',true);
  document.getElementById('writing-result-'+id).innerHTML=`<b class="${ok?'writingCorrect':'writingIncorrect'}" style="font-size:15px">${ok?'Correct':'Not quite'}</b>`;
}

function renderWritingTask(t){
  var m=state.writingPractice&&state.writingPractice[t.id]||{},body='';
  if(t.type==='kana-trace')
    body=writingCanvas(t.id,t.target,false);
  else if(t.type==='kana-recall')
    body=writingCanvas(t.id,t.target,true)+`<button class="tiny" style="margin-top:6px" type="button" onclick="document.getElementById('writing-reference-${t.id}').hidden=false">Show reference</button><div id="writing-reference-${t.id}" class="writingReference jp" style="font-size:52px;color:var(--color-primary);margin-top:8px" hidden>${E(t.target)}</div>`;
  else if(t.type==='kanji-self-check')
    body=writingCanvas(t.id,t.target,true)+`<button class="tiny" style="margin-top:6px" type="button" onclick="revealWriting('${t.id}')">Reveal model</button>`;
  else if(t.type==='sentence-order')
    body=`
      <div class="writingBuilt" id="writing-built-${t.id}">…</div>
      <div class="writingUnits">${t.units.map((u,i)=>`<button class="chip" id="writing-unit-${t.id}-${i}" type="button" onclick="chooseWritingUnit('${t.id}',${i})">${E(u)}</button>`).join('')}</div>
      <div class="rowActions" style="margin-top:10px">
        <button class="btn2 btnSecondary" style="min-height:36px;padding:6px 12px;font-size:12.5px" type="button" onclick="undoWritingUnit('${t.id}')">Undo last</button>
        <button class="btn2 btnSecondary" style="min-height:36px;padding:6px 12px;font-size:12.5px" type="button" onclick="writingOrder['${t.id}']=[];renderWritingOrder('${t.id}')">Reset</button>
        <button class="btn btnPrimary" style="min-height:36px;padding:6px 14px;font-size:12.5px" type="button" onclick="checkWritingOrder('${t.id}')">Check</button>
      </div>
    `;
  else if(t.type==='free-short-response')
    body=`
      <label for="writing-input-${t.id}" style="display:block;font-size:13px;color:var(--color-text-secondary);margin-bottom:6px">${E(t.instruction)}</label>
      <textarea class="input writingInput" id="writing-input-${t.id}" rows="3" placeholder="Write your sentence"></textarea>
      <div class="rowActions" style="margin-top:10px">
        <button class="btn2 btnSecondary" style="min-height:36px;padding:6px 12px;font-size:12.5px" type="button" onclick="revealWriting('${t.id}')">Reveal model</button>
      </div>
    `;
  else {
    body=`
      ${typeof renderAudioControls === 'function' ? renderAudioControls(t.audioId) : ''}
      <label for="writing-input-${t.id}" style="display:block;font-size:13px;color:var(--color-text-secondary);margin:10px 0 6px">${E(t.instruction)}</label>
      <input class="input writingInput" id="writing-input-${t.id}" autocomplete="off" placeholder="Type your answer">
      <div class="rowActions" style="margin-top:10px">
        <button class="btn btnPrimary" style="min-height:36px;padding:6px 14px;font-size:12.5px" type="button" onclick="checkTypedWriting('${t.id}')">Check answer</button>
        <button class="btn2 btnSecondary" style="min-height:36px;padding:6px 12px;font-size:12.5px" type="button" onclick="revealWriting('${t.id}')">Reveal answer</button>
      </div>
    `;
  }
  return `
    <article class="card writingTask">
      <div class="meta" style="font-weight:700">${E(t.type)} • ${m.completed?'Practiced':'New'}</div>
      <h3 style="font-size:18px;margin:6px 0 10px">${E(t.prompt)}</h3>
      ${t.type==='kana-trace'?`<div class="writingTraceTarget jp" aria-hidden="true">${E(t.target)}</div>`:''}
      ${body}
      <div id="writing-result-${t.id}" class="writingResult" aria-live="polite"></div>
      <div id="writing-analysis-${t.id}" class="writingBreakdown"></div>
      ${t.hint?`<p class="writingHint" style="font-size:12.5px;color:var(--color-text-secondary);margin-top:8px">${E(t.hint)}</p>`:''}
      ${['kana-trace','kana-recall','kanji-self-check','free-short-response'].includes(t.type)?`
        <div class="writingRatings" style="margin-top:12px;border-top:1px solid var(--color-border);padding-top:10px">
          <span class="meta" style="margin:0">Self-rate:</span>
          ${['Again','Okay','Comfortable'].map(r=>`<button class="tiny" type="button" onclick="rateWriting('${t.id}','${r}')">${r}</button>`).join('')}
        </div>
      `:''}
      <div id="writing-status-${t.id}" class="writingStatus" aria-live="polite" style="font-size:12px;color:var(--color-text-tertiary);margin-top:6px">${m.selfRating?'Self-rated '+E(m.selfRating)+'.':'Ready.'}</div>
    </article>
  `;
}

function renderWritingPage(){
  document.getElementById('practice').innerHTML=`
    <div class="eyebrow">Learner production</div>
    <h1 class="title">Practice</h1>
    <p class="lead">Mixed Practice checks recall. Writing Lab asks you to produce Japanese by hand, by typing, ordering, or dictation.</p>
    <div class="sectionHead">
      <div>
        <h2>Writing Lab</h2>
        <p>Handwriting is self-checked; typed and ordered answers use authored accepted answers.</p>
      </div>
    </div>
    <div class="grid writingGrid">${writingTasksV2.map(renderWritingTask).join('')}</div>
  `;
  writingTasksV2.forEach(t=>{
    if(['kana-trace','kana-recall','kanji-self-check'].includes(t.type))initWritingCanvas(t.id,t.target,t.type==='kana-trace');
    if(t.type==='sentence-order')renderWritingOrder(t.id);
  });
}

var legacyPracticePage=typeof practicePage==='function'?practicePage:null;
practicePage=function(){renderWritingPage();};

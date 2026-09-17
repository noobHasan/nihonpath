var assessmentSession=null;

function getAssessmentQuestion(a,s,q){return a.sections[s].questions[q];}

function assessmentNorm(v){return String(v||'').normalize('NFKC').replace(/[ \u3000]+/g,' ').trim();}

function assessmentStart(id){
  var a=getAssessment(id);
  if(!a)return;
  assessmentSession={assessmentId:id,startedAt:new Date().toISOString(),section:0,question:0,answers:{},production:{}};
  renderAssessment();
}

function assessmentAnswer(v){
  var q=getAssessmentQuestion(getAssessment(assessmentSession.assessmentId),assessmentSession.section,assessmentSession.question);
  assessmentSession.answers[q.id]=v;
  document.querySelectorAll('[data-assessment-option]').forEach(function(b){
    b.classList.toggle('selected',b.dataset.assessmentOption===v);
    b.setAttribute('aria-pressed',b.dataset.assessmentOption===v?'true':'false');
  });
}

function assessmentNext(){
  var a=getAssessment(assessmentSession.assessmentId),s=a.sections[assessmentSession.section];
  if(assessmentSession.question<s.questions.length-1)assessmentSession.question++;
  else if(assessmentSession.section<a.sections.length-1){
    assessmentSession.section++;
    assessmentSession.question=0;
  }else assessmentFinish();
  renderAssessment();
}

function assessmentPrevious(){
  if(assessmentSession.question>0)assessmentSession.question--;
  else if(assessmentSession.section>0){
    assessmentSession.section--;
    assessmentSession.question=getAssessment(assessmentSession.assessmentId).sections[assessmentSession.section].questions.length-1;
  }
  renderAssessment();
}

function assessmentSubmitProduction(){
  var a=getAssessment(assessmentSession.assessmentId),q=getAssessmentQuestion(a,assessmentSession.section,assessmentSession.question);
  assessmentSession.production[q.id]={completed:true,selfRating:null};
  assessmentFinish();
}

function assessmentFinish(){
  var a=getAssessment(assessmentSession.assessmentId),sections={},total=0,possible=0,weakDomains={},targets=[];
  a.sections.forEach(function(s){
    var score=0,max=0;
    s.questions.forEach(function(q){
      if(q.type==='self-check-production')return;
      var pts=q.points||1;
      max+=pts;
      possible+=pts;
      var ans=assessmentSession.answers[q.id],
          ok=q.type==='sentence-order'?assessmentNorm(ans)===assessmentNorm(q.answer):((q.acceptableAnswers||[q.answer]).map(assessmentNorm).includes(assessmentNorm(ans)));
      if(ok)score+=pts;
      else{
        weakDomains[q.skill||s.kind]=true;
        (q.reviewTargets||[]).forEach(function(t){targets.push(t);});
      }
    });
    total+=score;
    sections[s.id]={score:score,possible:max,percentage:max?Math.round(score/max*100):null};
  });
  var production=Object.values(assessmentSession.production);
  var rec={
    attemptId:'attempt-'+Date.now(),
    startedAt:assessmentSession.startedAt,
    completedAt:new Date().toISOString(),
    totalScore:total,
    totalPossible:possible,
    percentage:possible?Math.round(total/possible*100):0,
    sections:sections,
    weakDomains:Object.keys(weakDomains),
    reviewTargets:targets,
    productionCompletion:production
  };
  state.assessmentHistory=state.assessmentHistory||{};
  (state.assessmentHistory[a.id]||(state.assessmentHistory[a.id]=[])).push(rec);
  save();
  assessmentSession.result=rec;
  renderAssessmentResult();
}

function renderAssessment(){
  var a=getAssessment(assessmentSession.assessmentId),
      s=a.sections[assessmentSession.section],
      q=s.questions[assessmentSession.question],
      ans=assessmentSession.answers[q.id]||'',
      body='';
  if(s.passage)body+=`<div class="assessmentPassage"><h3 style="margin-top:0">${E(s.passage.title||'Reading')}</h3><div class="jp" style="font-size:18px;line-height:1.6">${E(s.passage.japanese)}</div></div>`;
  if(s.stimulus)body+=`<div class="assessmentPassage"><h3 style="margin-top:0">${E(s.stimulus.title||'Notice')}</h3><div class="jp" style="font-size:18px">${E(s.stimulus.japanese)}</div></div>`;
  if(q.audioId)body+=renderAudioControls(q.audioId);
  if(q.type==='typed-answer')
    body+=`<label for="assessment-answer" style="display:block;margin:12px 0 6px;font-size:13px;color:var(--color-text-secondary)">${E(q.prompt)}</label><input class="input" id="assessment-answer" value="${E(ans)}" oninput="assessmentAnswer(this.value)">`;
  else if(q.type==='sentence-order'){
    assessmentSession.order=assessmentSession.order||[];
    body+=`<div class="writingBuilt jp">${E((assessmentSession.order||[]).map(i=>q.units[i]).join('')||'…')}</div><div class="writingUnits">${q.units.map((u,i)=>`<button class="chip" type="button" onclick="assessmentSession.order=assessmentSession.order||[];if(!assessmentSession.order.includes(${i})){assessmentSession.order.push(${i});assessmentAnswer(assessmentSession.order.map(j=>q.units[j]).join(''))}">${E(u)}</button>`).join('')}</div>`;
  }
  else if(q.type==='self-check-production')
    body+=`<p class="muted">Production is not part of the objective score.</p><button class="btn2 btnSecondary" type="button" onclick="assessmentSubmitProduction()">Complete self-check</button>`;
  else
    body+=`<div class="options">${(q.options||[]).map(o=>`<button class="option ${ans===o?'selected':''}" data-assessment-option="${E(o)}" aria-pressed="${ans===o?'true':'false'}" type="button" onclick="assessmentAnswer(${JSON.stringify(o)})">${E(o)}</button>`).join('')}</div>`;

  document.getElementById('practice').innerHTML=`
    <div class="eyebrow">Internal diagnostic</div>
    <h1 class="title">${E(a.title)}</h1>
    <p class="lead">${E(a.description)}</p>
    <div class="assessmentProgress" style="font-weight:700;font-size:13px;color:var(--color-primary);margin-bottom:12px">Section ${assessmentSession.section+1}/${a.sections.length} · Question ${assessmentSession.question+1}/${s.questions.length}</div>
    <div class="card assessmentCard">
      <h2 style="font-size:22px;margin:0 0 6px">${E(s.title)}</h2>
      <p class="muted" style="margin:0 0 12px">${E(s.instructions)}</p>
      <div class="meta" style="margin-bottom:12px">${E(q.type)}</div>
      <h3 style="font-size:18px;margin:0 0 14px">${E(q.prompt)}</h3>
      ${body}
      <div class="rowActions" style="margin-top:20px;justify-content:space-between">
        <button class="btn2 btnSecondary" type="button" onclick="assessmentPrevious()" ${assessmentSession.section===0&&assessmentSession.question===0?'disabled':''}>Previous</button>
        <button class="btn btnPrimary" type="button" onclick="assessmentNext()">${assessmentSession.section===a.sections.length-1&&assessmentSession.question===s.questions.length-1?'Finish assessment':'Next'}</button>
      </div>
    </div>
  `;
}

function renderAssessmentResult(){
  var a=getAssessment(assessmentSession.assessmentId),
      r=assessmentSession.result,
      h=state.assessmentHistory[a.id]||[];
  document.getElementById('practice').innerHTML=`
    <div class="eyebrow">Internal diagnostic result</div>
    <h1 class="title">${r.percentage}% objective score</h1>
    <p class="lead">This is internal Nihon Path evidence, not an official JLPT score or certification.</p>
    <div class="grid two" style="margin-bottom:16px">
      <div class="card" style="padding:20px">
        <h3 style="font-size:15px;margin:0">Objective score</h3>
        <div class="big">${r.totalScore}/${r.totalPossible}</div>
      </div>
      <div class="card" style="padding:20px">
        <h3 style="font-size:15px;margin:0">Production completion</h3>
        <div class="big">${r.productionCompletion.length}</div>
        <p class="muted" style="margin:0">Self-check task completed</p>
      </div>
    </div>
    <div class="card" style="padding:20px;margin-bottom:16px">
      <h2 style="font-size:18px;margin:0 0 12px">Section breakdown</h2>
      ${Object.entries(r.sections).map(([id,x])=>`
        <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--color-border)">
          <b>${E(a.sections.find(s=>s.id===id).title)}</b>
          <span style="font-weight:700">${x.score}/${x.possible} (${x.percentage}%)</span>
        </div>
      `).join('')}
    </div>
    <div class="card" style="padding:20px;margin-bottom:16px">
      <h2 style="font-size:18px;margin:0 0 8px">Weak domains</h2>
      <p style="margin:0 0 12px">${r.weakDomains.length?r.weakDomains.map(E).join(', '):'No weak domains recorded.'}</p>
      <h3 style="font-size:15px;margin:0 0 6px">Recommended review targets</h3>
      <p style="margin:0">${r.reviewTargets.length?r.reviewTargets.map(t=>E(t.type+': '+t.id)).join(', '):'None recorded.'}</p>
    </div>
    <div class="rowActions">
      <button class="btn btnPrimary" type="button" onclick="assessmentStart('${a.id}')">Retake</button>
      <button class="btn2 btnSecondary" type="button" onclick="renderAssessmentHistory('${a.id}')">Review history (${h.length})</button>
    </div>
  `;
}

function renderAssessmentHistory(id){
  var a=getAssessment(id),h=state.assessmentHistory&&state.assessmentHistory[id]||[];
  document.getElementById('practice').innerHTML=`
    <div class="eyebrow">Assessment history</div>
    <h1 class="title">${E(a.title)}</h1>
    <div class="grid" style="margin:20px 0">
      ${h.map((r,i)=>`
        <div class="card" style="padding:16px 20px">
          <h3 style="font-size:16px;margin:0 0 4px">Attempt ${i+1}</h3>
          <p style="margin:0;font-size:14px;color:var(--color-text-secondary)">${r.percentage}% objective score · ${E(r.completedAt)}</p>
          <p style="margin:4px 0 0;font-size:13px;color:var(--color-text-tertiary)">Weak domains: ${E(r.weakDomains.join(', ')||'none')}</p>
        </div>
      `).join('')||'<div class="card" style="padding:24px;text-align:center;color:var(--color-text-tertiary)">No completed attempts yet.</div>'}
    </div>
    <button class="btn btnPrimary" type="button" onclick="assessmentStart('${id}')">Start diagnostic</button>
  `;
}

function assessmentLab(){
  var a=assessmentsV2[0],
      h=state.assessmentHistory&&state.assessmentHistory[a.id]||[],
      best=h.length?Math.max.apply(null,h.map(x=>x.percentage)):null;
  return `
    <div class="sectionHead">
      <div>
        <h2>Assessment Lab</h2>
        <p>Small internal diagnostic. Results are not official JLPT scores.</p>
      </div>
      <button class="btn btnPrimary" type="button" onclick="assessmentStart('${a.id}')">Start diagnostic</button>
    </div>
    <div class="notice" style="margin-bottom:20px">Attempts: ${h.length} · Latest: ${h.length?h[h.length-1].percentage+'%':'—'} · Best: ${best===null?'—':best+'%'}</div>
  `;
}

var oldAssessmentPractice=practicePage;
practicePage=function(){
  if(typeof renderWritingPage==='function')renderWritingPage();
  document.getElementById('practice').insertAdjacentHTML('afterbegin',assessmentLab());
};

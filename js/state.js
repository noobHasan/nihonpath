function load(){
  try{
    let saved=JSON.parse(localStorage.getItem(KEY)||'{}');
    return{
      ...defaults,
      ...saved,
      done:Array.isArray(saved.done)?saved.done:[],
      vstat:{...defaults.vstat,...(saved.vstat||{})},
      fav:Array.isArray(saved.fav)?saved.fav:[],
      klearn:Array.isArray(saved.klearn)?saved.klearn:[],
      gdone:Array.isArray(saved.gdone)?saved.gdone:[],
      quiz:{...defaults.quiz,...(saved.quiz||{}),by:{...defaults.quiz.by,...((saved.quiz&&saved.quiz.by)||{})}},
      read:Array.isArray(saved.read)?saved.read:[],
      speakingPractice:saved.speakingPractice&&typeof saved.speakingPractice==='object'&&!Array.isArray(saved.speakingPractice)?saved.speakingPractice:{},
      writingPractice:saved.writingPractice&&typeof saved.writingPractice==='object'&&!Array.isArray(saved.writingPractice)?saved.writingPractice:{},
      assessmentHistory:saved.assessmentHistory&&typeof saved.assessmentHistory==='object'&&!Array.isArray(saved.assessmentHistory)?saved.assessmentHistory:{}
    };
  }catch(e){
    return{...defaults,vstat:{},quiz:{...defaults.quiz,by:{}},speakingPractice:{},writingPractice:{},assessmentHistory:{}};
  }
}

function save(){localStorage.setItem(KEY,JSON.stringify(state))}

function E(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}

function P(n,d){return d?Math.round(n/d*100):0}

function touch(){
  let d=new Date().toISOString().slice(0,10);
  if(state.last===d)return;
  if(state.last){
    let diff=Math.round((new Date(d)-new Date(state.last))/86400000);
    state.streak=diff===1?state.streak+1:1;
  }else state.streak=1;
  state.last=d;
  save();
}

function toast(t){
  let e=document.getElementById('toast');
  if(!e)return;
  e.textContent=t;
  e.classList.add('show');
  setTimeout(()=>e.classList.remove('show'),2000);
}

function devAvailable(){
  return new URLSearchParams(location.search).has('dev');
}

function devUnlocked(){
  try{return sessionStorage.getItem('nihonPathDevPreview_v1')==='all'}catch(e){return false}
}

function devSetUnlocked(value){
  try{
    if(value)sessionStorage.setItem('nihonPathDevPreview_v1','all');
    else sessionStorage.removeItem('nihonPathDevPreview_v1');
  }catch(e){}
  prefs();
  if(typeof days==='function'&&document.getElementById('days'))days();
  if(typeof lesson==='function'&&document.getElementById('lesson'))lesson(selected);
}

function nextDay(){
  if(devUnlocked())return 90;
  for(let i=1;i<=90;i++)if(!state.done.includes(i))return i;
  return 90;
}

function prefs(){
  document.documentElement.dataset.theme=state.theme==='dark'?'dark':'light';
  document.documentElement.classList.toggle('hideRomaji',state.romaji==='off');
  let r=document.getElementById('romaji'),t=document.getElementById('theme');
  if(r)r.textContent=`Romaji: ${state.romaji[0].toUpperCase()+state.romaji.slice(1)}`;
  if(t){
    t.setAttribute('aria-label',state.theme==='dark'?'Switch to light mode':'Switch to dark mode');
    if(typeof getIconSvg==='function'){
      t.innerHTML=getIconSvg(state.theme==='dark'?'sun':'moon',18);
    }
  }
  let d=document.getElementById('devToggle');
  if(devAvailable()){
    if(!d){
      d=document.createElement('button');
      d.id='devToggle';
      d.className='btn2 devControl';
      d.type='button';
      let actionsNode=document.querySelector('.actions');
      if(actionsNode)actionsNode.appendChild(d);
      d.onclick=()=>devSetUnlocked(!devUnlocked());
    }
    if(d){
      d.hidden=false;
      d.textContent=devUnlocked()?'Dev Preview: Locked':'Dev Preview: Unlock All';
      d.setAttribute('aria-pressed',String(devUnlocked()));
    }
  }else if(d){
    d.hidden=true;
  }
  if(typeof renderIcons==='function')renderIcons();
}

var state=load(),selected=Math.min(90,nextDay()),kanaMode='Hiragana',vcat='All',vquery='',vstatus='All',kquery='',gquery='',quiz=null,flash=[],flashI=0;

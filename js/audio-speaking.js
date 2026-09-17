var activeModelAudio=null,activeSpeech=false,activeRecordingAudio=null,recordings={};

function audioStatus(message){
  var node=document.getElementById('audioStatus');
  if(node)node.textContent=message;
}

function stopAudio(){
  if(activeModelAudio){
    activeModelAudio.pause();
    activeModelAudio.currentTime=0;
    activeModelAudio=null;
  }
  if(activeSpeech&&typeof speechSynthesis!=='undefined')speechSynthesis.cancel();
  activeSpeech=false;
  audioStatus('Stopped.');
}

function chooseJapaneseVoice(){
  if(typeof speechSynthesis==='undefined')return null;
  var voices=speechSynthesis.getVoices()||[];
  return voices.find(function(v){return /^ja(?:-|$)/i.test(v.lang)})||null;
}

function playAudioTarget(id,mode){
  var target=getAudioTarget(id);
  if(!target){audioStatus('Audio is not available for this phrase.');return}
  stopAudio();
  stopRecordingAudio();
  var rate=mode==='slow'?(target.slowRate||0.75):(target.naturalRate||1);
  if(target.asset&&typeof Audio!=='undefined'){
    activeModelAudio=new Audio(target.asset);
    activeModelAudio.playbackRate=rate;
    activeModelAudio.onended=function(){activeModelAudio=null;audioStatus('Playback complete.')};
    activeModelAudio.onerror=function(){activeModelAudio=null;audioStatus('This audio asset could not be played.')};
    audioStatus(mode==='slow'?'Playing slowly…':'Playing natural audio…');
    var promise=activeModelAudio.play();
    if(promise&&promise.catch)promise.catch(function(){audioStatus('Audio playback was unavailable.');activeModelAudio=null});
    return;
  }
  if(target.ttsFallback&&typeof speechSynthesis!=='undefined'&&typeof SpeechSynthesisUtterance!=='undefined'){
    var utterance=new SpeechSynthesisUtterance(target.text);
    utterance.lang=target.lang||'ja-JP';
    utterance.rate=rate;
    var voice=chooseJapaneseVoice();
    if(voice)utterance.voice=voice;
    utterance.onend=function(){activeSpeech=false;audioStatus('Playback complete.')};
    utterance.onerror=function(){activeSpeech=false;audioStatus('Speech playback was unavailable.')};
    activeSpeech=true;
    audioStatus(mode==='slow'?'Playing slowly…':'Playing natural audio…');
    speechSynthesis.speak(utterance);
    return;
  }
  audioStatus('Audio playback is not available in this browser.');
}

function stopRecordingAudio(){
  if(activeRecordingAudio){
    activeRecordingAudio.pause();
    activeRecordingAudio.currentTime=0;
    activeRecordingAudio=null;
  }
}

function speakingRecord(taskId){
  var task=speakingTasksV2.find(function(t){return t.id===taskId});
  if(!task)return;
  stopAudio();
  stopRecordingAudio();
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia||typeof MediaRecorder==='undefined'){
    speakingStatus(taskId,'Recording is not available in this browser or context.');
    return;
  }
  var previous=recordings[taskId];
  if(previous&&previous.stream)previous.stream.getTracks().forEach(function(track){track.stop()});
  if(previous&&previous.url)URL.revokeObjectURL(previous.url);
  navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
    var recorder;
    try{recorder=new MediaRecorder(stream)}catch(e){
      stream.getTracks().forEach(function(track){track.stop()});
      speakingStatus(taskId,'Recording is not available in this browser.');
      return;
    }
    var item={stream:stream,recorder:recorder,chunks:[],url:null,audio:null};
    recordings[taskId]=item;
    recorder.ondataavailable=function(e){if(e.data&&e.data.size)item.chunks.push(e.data)};
    recorder.onstop=function(){
      stream.getTracks().forEach(function(track){track.stop()});
      if(item.url)URL.revokeObjectURL(item.url);
      item.url=URL.createObjectURL(new Blob(item.chunks,{type:recorder.mimeType||'audio/webm'}));
      speakingStatus(taskId,'Recording complete.');
      renderSpeakingRecording(taskId);
    };
    recorder.start();
    item.startedAt=Date.now();
    speakingMeta(taskId,'attempts',1);
    speakingStatus(taskId,'Recording…');
  }).catch(function(){
    speakingStatus(taskId,'Microphone permission denied.');
  });
}

function stopSpeakingRecord(taskId){
  var item=recordings[taskId];
  if(item&&item.recorder&&item.recorder.state==='recording'){
    item.recorder.stop();
    speakingStatus(taskId,'Finishing recording…');
  }
}

function playSpeakingRecord(taskId){
  var item=recordings[taskId];
  if(!item||!item.url){
    speakingStatus(taskId,'Record yourself first.');
    return;
  }
  stopRecordingAudio();
  activeRecordingAudio=new Audio(item.url);
  activeRecordingAudio.onended=function(){
    activeRecordingAudio=null;
    speakingStatus(taskId,'Your recording finished.');
  };
  activeRecordingAudio.play().catch(function(){
    speakingStatus(taskId,'Your recording could not be played.');
  });
  speakingStatus(taskId,'Playing your recording…');
}

function deleteSpeakingRecord(taskId){
  var item=recordings[taskId];
  if(!item)return;
  stopRecordingAudio();
  if(item.stream)item.stream.getTracks().forEach(function(track){track.stop()});
  if(item.url)URL.revokeObjectURL(item.url);
  delete recordings[taskId];
  speakingStatus(taskId,'Recording deleted.');
  renderSpeakingRecording(taskId);
}

function speakingStatus(taskId,message){
  var node=document.getElementById('speaking-status-'+taskId);
  if(node)node.textContent=message;
}

function speakingMeta(taskId,key,increment){
  if(!state.speakingPractice)state.speakingPractice={};
  var meta=state.speakingPractice[taskId]||{attempts:0,selfRating:null,completed:false,lastPracticed:null};
  if(key==='attempts')meta.attempts+=(increment||1);
  else meta[key]=increment;
  meta.lastPracticed=new Date().toISOString();
  state.speakingPractice[taskId]=meta;
  save();
}

function rateSpeaking(taskId,rating){
  speakingMeta(taskId,'selfRating',rating);
  speakingMeta(taskId,'completed',true);
  speakingStatus(taskId,'Self-rating saved: '+rating+'.');
}

function revealSpeaking(taskId){
  var node=document.getElementById('speaking-text-'+taskId);
  if(node){
    node.hidden=false;
    var button=document.getElementById('speaking-reveal-'+taskId);
    if(button)button.hidden=true;
  }
}

function renderSpeakingRecording(taskId){
  var item=recordings[taskId],node=document.getElementById('speaking-recording-'+taskId);
  if(!node)return;
  node.innerHTML=item&&item.url?'<button class="tiny" type="button" onclick="playSpeakingRecord(\''+taskId+'\')">Play my recording</button><button class="tiny" type="button" onclick="deleteSpeakingRecord(\''+taskId+'\')">Delete</button>':'';
}

function renderAudioControls(audioId){
  var playIcon = typeof getIconSvg === 'function' ? getIconSvg('play', 12) + ' ' : '';
  var slowIcon = typeof getIconSvg === 'function' ? getIconSvg('turtle', 14) + ' ' : '';
  var stopIcon = typeof getIconSvg === 'function' ? getIconSvg('square', 10) + ' ' : '';
  return `<div class="audioControls" role="group" aria-label="Audio controls">
    <button class="btn2 btnSecondary" style="min-height:36px;padding:6px 12px;font-size:12.5px" type="button" onclick="playAudioTarget('${audioId}','natural')">${playIcon}Listen</button>
    <button class="btn2 btnSecondary" style="min-height:36px;padding:6px 12px;font-size:12.5px" type="button" onclick="playAudioTarget('${audioId}','slow')">${slowIcon}Slow</button>
    <button class="btn2 btnSecondary" style="min-height:36px;padding:6px 12px;font-size:12.5px" type="button" onclick="stopAudio()">${stopIcon}Stop</button>
  </div>`;
}

function renderSpeakingTask(task){
  var analysis=task.analysisId&&getJapaneseAnalysis(task.analysisId),
      meta=state.speakingPractice&&state.speakingPractice[task.id],
      hidden=task.hideTextInitially&&!meta?.completed;
  return `<article class="card speakingTask">
    <div class="meta" style="font-weight:700">${E(task.type)}</div>
    <h3 style="font-size:18px;margin:6px 0 10px">${E(task.prompt)}</h3>
    <div id="speaking-text-${task.id}" class="speakingModel jp" ${hidden?'hidden':''}>${E(task.modelText)}</div>
    ${hidden?`<button id="speaking-reveal-${task.id}" class="tiny" type="button" onclick="revealSpeaking('${task.id}')">Reveal Japanese</button>`:''}
    ${renderAudioControls(task.audioId)}
    ${analysis?`<div class="speakingBreakdown">${renderJapaneseAnalysis(analysis)}</div>`:''}
    <div class="speakingActions" style="margin-top:14px">
      <button class="btn btnPrimary" style="min-height:38px;padding:8px 14px;font-size:13px" type="button" onclick="speakingRecord('${task.id}')">Start recording</button>
      <button class="btn2 btnSecondary" style="min-height:38px;padding:8px 14px;font-size:13px" type="button" onclick="stopSpeakingRecord('${task.id}')">Stop recording</button>
    </div>
    <div id="speaking-recording-${task.id}" class="rowActions" style="margin-top:8px"></div>
    <div class="speakingPrivacy" style="font-size:11px;color:var(--color-text-tertiary);margin-top:8px">Your recording stays in this browser session and is not uploaded.</div>
    <div id="speaking-status-${task.id}" class="speakingStatus" aria-live="polite">Ready for practice.</div>
    <div class="speakingRatings" role="group" aria-label="Self-rate this practice" style="margin-top:12px;border-top:1px solid var(--color-border);padding-top:10px">
      <span class="meta" style="margin:0">Self-rate:</span>
      ${['Again','Okay','Comfortable'].map(function(r){
        return `<button class="tiny" type="button" onclick="rateSpeaking('${task.id}','${r}')">${r}</button>`;
      }).join('')}
    </div>
  </article>`;
}

var legacySpeakPage=speakPage;
speakPage=function(){
  document.getElementById('speaking').innerHTML=`
    <div class="eyebrow">Communicative intent</div>
    <h1 class="title">Speak Japanese</h1>
    <p class="lead">Listen, shadow, record yourself, and self-rate. Model audio uses browser Japanese speech until curated assets are available.</p>
    <div class="sectionHead">
      <div>
        <h2>Speaking Practice</h2>
        <p>Your recordings stay in memory for this browser session.</p>
      </div>
    </div>
    <div class="grid speakingGrid">${speakingTasksV2.map(renderSpeakingTask).join('')}</div>
    <div id="audioStatus" class="audioStatus" aria-live="polite" style="margin-top:16px">Ready.</div>
    <div class="sectionHead">
      <div>
        <h2>Phrase bank</h2>
        <p>Reference phrases by communicative intent.</p>
      </div>
    </div>
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
  speakingTasksV2.forEach(function(t){renderSpeakingRecording(t.id)});
};

var legacyGo=go;
go=function(page){
  stopAudio();
  stopRecordingAudio();
  return legacyGo(page);
};

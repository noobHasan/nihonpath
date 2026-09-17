/* Gate 3 — authored audio targets. Assets are intentionally absent until curated audio is available. */
var audioTargets=[
  {id:'audio-day025-seven-oclock',text:'七時に起きます。',reading:'しちじに おきます。',lang:'ja-JP',asset:null,ttsFallback:true,slowRate:0.75,naturalRate:1,speaker:'default',transcript:'七時に起きます。',transcriptPolicy:'visible'},
  {id:'audio-day044-fitting-permission',text:'試着してもいいですか。',reading:'しちゃくしても いいですか。',lang:'ja-JP',asset:null,ttsFallback:true,slowRate:0.75,naturalRate:1,speaker:'default',transcript:'試着してもいいですか。',transcriptPolicy:'visible'},
  {id:'audio-day064-repeat-request',text:'もう一度言ってください。',reading:'もういちど いってください。',lang:'ja-JP',asset:null,ttsFallback:true,slowRate:0.75,naturalRate:1,speaker:'default',transcript:'もう一度言ってください。',transcriptPolicy:'visible'},
  {id:'audio-day051-internet-problem',text:'インターネットがつながりません。',reading:'インターネットが つながりません。',lang:'ja-JP',asset:null,ttsFallback:true,slowRate:0.75,naturalRate:1,speaker:'default',transcript:'インターネットがつながりません。',transcriptPolicy:'visible'},
  {id:'audio-day070-coffee-like',text:'コーヒーが好きです。',reading:'コーヒーが すきです。',lang:'ja-JP',asset:null,ttsFallback:true,slowRate:0.75,naturalRate:1,speaker:'default',transcript:'コーヒーが好きです。',transcriptPolicy:'hidden-until-reveal'},
  {id:'audio-day080-checkpoint-passage',text:'朝、七時に起きます。朝ご飯を食べます。それから、学校へ行きます。学校で日本語を勉強します。でも、漢字は少し難しいです。',reading:'あさ、しちじに おきます。あさごはんを たべます。それから、がっこうへ いきます。がっこうで にほんごを べんきょうします。でも、かんじは すこし むずかしいです。',lang:'ja-JP',asset:null,ttsFallback:true,slowRate:0.75,naturalRate:1,speaker:'default',transcript:'朝、七時に起きます。朝ご飯を食べます。それから、学校へ行きます。学校で日本語を勉強します。でも、漢字は少し難しいです。',transcriptPolicy:'hidden-until-reveal'}
];
function getAudioTarget(id){if(!id)return null;return audioTargets.find(function(target){return target.id===id})||null;}

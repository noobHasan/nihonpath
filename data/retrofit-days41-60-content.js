/* Gate 9 authored support. Practical sentences are deliberately short and language-only. */
var gate9Seeds=[
 [41,'おにぎりと水をください。','おにぎりとみずをください。','onigiri to mizu o kudasai','A rice ball and water, please.'],
 [42,'メニューをお願いします。','メニューをおねがいします。','menyuu o onegaishimasu','The menu, please.'],
 [43,'ホットコーヒーをお願いします。','ホットコーヒーをおねがいします。','hotto koohii o onegaishimasu','A hot coffee, please.'],
 [44,'試着してもいいですか。','しちゃくしてもいいですか。','shichaku shite mo ii desu ka','May I try this on?'],
 [45,'二千五百円です。','にせんごひゃくえんです。','nisen gohyaku en desu','It is 2,500 yen.'],
 [46,'改札はどこですか。','かいさつはどこですか。','kaisatsu wa doko desu ka','Where is the ticket gate?'],
 [47,'もう一度お願いします。','もういちどおねがいします。','mou ichido onegaishimasu','One more time, please.'],
 [48,'ここまでお願いします。','ここまでおねがいします。','koko made onegaishimasu','To here, please.'],
 [49,'部屋にベッドがあります。','へやにベッドがあります。','heya ni beddo ga arimasu','There is a bed in the room.'],
 [50,'すみません。水が出ません。','すみません。みずがでません。','sumimasen. mizu ga demasen.','Excuse me. There is no running water.'],
 [51,'インターネットがつながりません。','インターネットがつながりません。','intaanetto ga tsunagarimasen','The internet is not connecting.'],
 [52,'ごみはどこに出しますか。','ごみはどこにだしますか。','gomi wa doko ni dashimasu ka','Where do I put out the garbage?'],
 [53,'おはようございます。','おはようございます。','ohayou gozaimasu','Good morning.'],
 [54,'教室はどこですか。','きょうしつはどこですか。','kyoushitsu wa doko desu ka','Where is the classroom?'],
 [55,'病気ですから、休みます。','びょうきですから、やすみます。','byouki desu kara yasumimasu','Because I am sick, I will be absent.'],
 [56,'予約したいです。','よやくしたいです。','yoyaku shitai desu','I want to make an appointment.'],
 [57,'受付はどこですか。','うけつけはどこですか。','uketsuke wa doko desu ka','Where is reception?'],
 [58,'頭が痛いです。','あたまがいたいです。','atama ga itai desu','My head hurts.'],
 [59,'薬局はどこですか。','やっきょくはどこですか。','yakkyoku wa doko desu ka','Where is the pharmacy?'],
 [60,'予約したいです。','よやくしたいです。','yoyaku shitai desu','I want to make an appointment.']
];
gate9Seeds.forEach(function(x){var d=x[0],id='analysis-day'+String(d).padStart(3,'0')+'-practical';if(!getJapaneseAnalysis(id))addRetrofitAnalysis(id,x[1],x[2],x[3],x[4],'A practical beginner sentence.',[{surface:x[1],reading:x[2],romaji:x[3],meaning:x[4],role:'practical sentence'}],'Use this short phrase in the situation shown by the lesson.');var a='audio-day'+String(d).padStart(3,'0')+'-practical';if(!getAudioTarget(a))audioTargets.push({id:a,text:x[1],reading:x[2],lang:'ja-JP',asset:null,ttsFallback:true,slowRate:.75,naturalRate:1,speaker:'default',transcript:x[1],transcriptPolicy:'hidden-until-reveal'});var l=lessons.find(function(y){return y.day===d;});(l.examples||[]).forEach(function(e){if(e.japanese===x[1])e.analysisId=id;});});
gate9Seeds.forEach(function(x){var d=x[0],id='speaking-day'+String(d).padStart(3,'0')+'-practical';speakingTasksV2.push({id:id,type:'role-play',prompt:'Hear the situation, then say the practical response.',modelText:x[1],role:d%2?'learner':'customer',audioId:'audio-day'+String(d).padStart(3,'0')+'-practical',analysisId:'analysis-day'+String(d).padStart(3,'0')+'-practical',hideTextInitially:true,required:false,reviewTargets:[]});var w='writing-day'+String(d).padStart(3,'0')+'-practical';writingTasksV2.push({id:w,type:d===45||d===60?'dictation':'type-japanese',instruction:'Type the practical Japanese response.',prompt:x[4],target:x[1],acceptableAnswers:[x[1]],audioId:d===45||d===60?'audio-day'+String(d).padStart(3,'0')+'-practical':undefined,analysisId:'analysis-day'+String(d).padStart(3,'0')+'-practical',required:false,reviewTargets:[]});});
/* Stable line objects for only the conversations directly used by Days 41–60. */
var gate9ConversationIds=new Set(lessons.filter(function(l){return l.day>=41&&l.day<=60&&l.conversationId;}).map(function(l){return l.conversationId;}));
var gate9ConversationLines=[];
function conversationLineFor(x){return Array.isArray(x)?{speaker:x[0],japanese:x[1],english:x[2]}:x;}
conversations.filter(function(c){return gate9ConversationIds.has(c.id);}).forEach(function(c){c.lines=(c.lines||[]).map(function(x,i){var speaker=x[0],jp=x[1],en=x[2],slug=c.id.replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,''),lineId='line-'+slug+'-'+String(i+1).padStart(2,'0'),seed=gate9Seeds.find(function(s){return s[1]===jp;}),reading=seed?seed[2]:'',romaji=seed?seed[3]:'';if(!reading){var l=lessons.find(function(q){return(q.examples||[]).some(function(e){return e.japanese===jp;});}),e=l&&(l.examples||[]).find(function(q){return q.japanese===jp;});reading=e&&e.reading||jp;romaji=e&&e.romaji||jp;}var audioId='audio-'+lineId,analysisId='analysis-'+lineId;if(!getAudioTarget(audioId))audioTargets.push({id:audioId,text:jp,reading:reading,lang:'ja-JP',asset:null,ttsFallback:true,slowRate:.75,naturalRate:1,speaker:speaker,transcript:jp,transcriptPolicy:'hidden-until-reveal'});if(!getJapaneseAnalysis(analysisId))addRetrofitAnalysis(analysisId,jp,reading,romaji,en,'A directly used conversation line.',[{surface:jp,reading:reading,romaji:romaji,meaning:en,role:speaker}],'Use this line in the stated conversation context.');var z={id:lineId,speaker:speaker,role:speaker,japanese:jp,reading:reading,romaji:romaji,english:en,meaning:en,audioId:audioId,analysisId:analysisId,analysisRequired:true,classification:jp.indexOf('？')>=0?'PRODUCTIVE FIXED PHRASE':'RECOGNITION PHRASE',usage:c.situation||c.title};z[0]=speaker;z[1]=jp;z[2]=en;gate9ConversationLines.push(z);return z;});});
function gate9RenderLine(z){return '<div class="dialog"><div class="speaker">'+E(z.speaker)+'</div><div><div class="jp">'+E(z.japanese)+'</div><div class="learningReading">'+E(z.reading)+'</div><div class="learningRomaji romaji">'+E(z.romaji)+'</div><small>'+E(z.english)+'</small>'+renderAudioControls(z.audioId)+'<details class="learningDetails"><summary>Details</summary>'+renderJapaneseAnalysis(getJapaneseAnalysis(z.analysisId))+'</details></div></div>';}
// Gate 13C: standalone rendering is owned by convPage in js/ui.js; course helpers remain independent.

/* Gate 9: bounded practical-Japan retrofit for Days 41–60. */
var day41to60Retrofit={};
for(var gate9Day=41;gate9Day<=60;gate9Day++)day41to60Retrofit[gate9Day]={a:['analysis-day'+String(gate9Day).padStart(3,'0')+'-practical'],au:['audio-day'+String(gate9Day).padStart(3,'0')+'-practical'],s:['speaking-day'+String(gate9Day).padStart(3,'0')+'-practical'],w:['writing-day'+String(gate9Day).padStart(3,'0')+'-practical'],t:{reading:true,writing:true,listening:true,speaking:true,grammar:true,practical:true}};
Object.keys(day41to60Retrofit).forEach(function(day){var l=lessons.find(function(x){return x.day===Number(day);}),r=day41to60Retrofit[day];if(l){l.analysisIds=r.a;l.audioIds=r.au;l.speakingTasks=r.s;l.writingTasks=r.w;l.skillTargets=r.t;}});

/* Gate 10: bounded retrofit metadata for the reviewed N5 core block. */
var day61to80Retrofit={};
for(var gate10Day=61;gate10Day<=80;gate10Day++)day61to80Retrofit[gate10Day]={a:['analysis-day'+String(gate10Day).padStart(3,'0')+'-core'],au:['audio-day'+String(gate10Day).padStart(3,'0')+'-core'],s:['speaking-day'+String(gate10Day).padStart(3,'0')+'-core'],w:['writing-day'+String(gate10Day).padStart(3,'0')+'-core'],t:{reading:true,writing:true,listening:true,speaking:true,grammar:true,practical:gate10Day>=68}};
Object.keys(day61to80Retrofit).forEach(function(day){var l=lessons.find(function(x){return x.day===Number(day);}),r=day61to80Retrofit[day];if(l){l.analysisIds=r.a;l.audioIds=r.au;l.speakingTasks=r.s;l.writingTasks=r.w;l.skillTargets=r.t;}});
lessons[86].speakingTasks=(lessons[86].speakingTasks||[]).concat(['speaking-day087-scenario-1','speaking-day087-scenario-2','speaking-day087-scenario-3']);
lessons[85].audioIds=(lessons[85].audioIds||[]).concat(day86ListeningSet.map(function(x){return x[0];}));lessons[85].speakingTasks=(lessons[85].speakingTasks||[]).concat(lessons[85].shadowingTasks||[]);
lessons[86].speakingTasks=(lessons[86].speakingTasks||[]).concat(day87Marathon.map(function(x){return x[0];}));lessons[86].audioIds=(lessons[86].audioIds||[]).concat(day87Marathon.map(function(x){return x[0].replace('speaking-','audio-');}));

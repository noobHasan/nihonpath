if (typeof validateContent === "function") validateContent(); prefs();dash();
window.NIHON_PATH=window.NIHON_PATH||{};window.NIHON_PATH.dev={openLesson:function(day){let n=Number(day),l=lessons.find(x=>x.day===n);if(!l){console.warn('[Nihon Path] Unknown lesson:',day);return}selected=n;go('course');}};

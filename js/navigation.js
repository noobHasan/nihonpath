function pageName(p){
  return ({
    dashboard: 'Dashboard',
    course: 'Daily Course',
    kana: 'Kana',
    vocabulary: 'Vocabulary',
    kanji: 'Kanji',
    grammar: 'Grammar',
    speaking: 'Speak Japanese',
    conversations: 'Conversations',
    life: 'Life in Japan',
    culture: 'Culture & Etiquette',
    reading: 'Reading',
    practice: 'Practice & Lab',
    review: 'Review',
    progress: 'Progress'
  })[p] || p;
}

function renderIcons() {
  if (typeof getIconSvg !== 'function') return;
  document.querySelectorAll('[data-icon]').forEach(function(el) {
    var name = el.dataset.icon;
    if (name) {
      var size = el.classList.contains('mnavIcon') ? 20 : 18;
      el.innerHTML = getIconSvg(name, size);
    }
  });
}

function closeMobileDrawer() {
  var sb = document.getElementById('sidebar');
  var ov = document.getElementById('sidebarOverlay');
  if (sb) sb.classList.remove('open');
  if (ov) ov.classList.remove('show');
}

function toggleMobileDrawer() {
  var sb = document.getElementById('sidebar');
  var ov = document.getElementById('sidebarOverlay');
  if (sb && ov) {
    var isOpen = sb.classList.toggle('open');
    ov.classList.toggle('show', isOpen);
  }
}

function go(p) {
  closeMobileDrawer();
  document.querySelectorAll('.page').forEach(function(x) {
    x.classList.toggle('active', x.id === p);
  });
  document.querySelectorAll('[data-page]').forEach(function(x) {
    x.classList.toggle('active', x.dataset.page === p);
  });
  var crumbEl = document.getElementById('crumb');
  if (crumbEl) crumbEl.textContent = pageName(p);
  if (typeof render === 'function') render(p);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', function(e) {
  var n = e.target.closest('[data-page]');
  if (n && n.dataset.page) {
    go(n.dataset.page);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  renderIcons();
  var menuBtn = document.getElementById('menuToggle');
  var moreBtn = document.getElementById('mobileMoreBtn');
  var overlay = document.getElementById('sidebarOverlay');
  if (menuBtn) menuBtn.onclick = toggleMobileDrawer;
  if (moreBtn) moreBtn.onclick = toggleMobileDrawer;
  if (overlay) overlay.onclick = closeMobileDrawer;
});

document.getElementById('theme').onclick = function() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  save();
  prefs();
};

document.getElementById('romaji').onclick = function() {
  state.romaji = state.romaji === 'auto' ? 'on' : state.romaji === 'on' ? 'off' : 'auto';
  save();
  prefs();
};
